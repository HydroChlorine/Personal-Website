"""Read-only model, label, and shipped-asset checks for CS story figures."""
from pathlib import Path
import importlib.util
import hashlib
import json
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageSequence, ImageFont

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('stories',ROOT/'scripts/draw-cs-stories.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
checks=a.verify();out=a.c.OUT;count=0
manifest=json.loads((out/'manifest.json').read_text())['figures']
assert set(manifest)==set(a.RECIPES)
for name in a.RECIPES:
    for mobile in [False,True]:
        suffix='-mobile' if mobile else '';root=ET.parse(out/f'{name}{suffix}.svg').getroot()
        size=(int(root.attrib['width']),int(root.attrib['height']))
        assert manifest[name]['mobile' if mobile else 'wide']['size']==list(size)
        for el in root.iter('{http://www.w3.org/2000/svg}text'):
            fs=float(el.attrib['font-size']);x=float(el.attrib['x']);text=el.text or '';anchor=el.attrib['text-anchor']
            for pixel in [False,True]:
                font=ImageFont.truetype(str(a.c.art.FONT),max(8,round(fs*.5)) if pixel else round(fs))
                width=font.getlength(text)*(2 if pixel else 1)
                left=x-width if anchor=='end' else x-width/2 if anchor=='middle' else x
                assert left>=-2 and left+width<=size[0]+2,(name,suffix,text,pixel,'horizontal clipping')
            assert 0<float(el.attrib['y'])<size[1],(name,suffix,text,'vertical clipping')
        with Image.open(out/f'{name}-pixel{suffix}.png') as im:assert im.size==size
        for style in ['pixel','crisp']:
            with Image.open(out/f'{name}-{style}{suffix}.gif') as gif:
                assert gif.size==(size if style=='pixel' else (size[0]*2,size[1]*2))
                assert gif.info['loop']==0
                ms=0;hashes=set()
                for j,frame in enumerate(ImageSequence.Iterator(gif)):
                    ms+=frame.info['duration'];arr=np.asarray(frame.convert('RGB'));hashes.add(hashlib.sha256(arr.tobytes()).digest())
                    if style=='pixel' and j%5==0:assert np.array_equal(arr,np.repeat(np.repeat(arr[::2,::2],2,0),2,1)),name
                    if style=='crisp' and j==0:
                        patch=arr[:512,:512]
                        assert not np.array_equal(patch,np.repeat(np.repeat(patch[::4,::4],4,0),4,1)),name
                assert ms==5760 and len(hashes)>1,(name,style,suffix,ms)
        count+=1
print(json.dumps({'verified':f'{count} complete wide/mobile sets; pixel/crisp motion, pause stills, labels, and models',**checks},indent=2))
