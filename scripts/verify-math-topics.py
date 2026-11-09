"""Check the mathematical examples and shipped diagram variants, without writing."""
from pathlib import Path
import importlib.util
import json
import hashlib
import xml.etree.ElementTree as ET
import numpy as np
from PIL import Image, ImageSequence, ImageFont
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('figures',ROOT/'scripts/draw-math-topics.py')
art=importlib.util.module_from_spec(spec);spec.loader.exec_module(art)
spec2=importlib.util.spec_from_file_location('connections',ROOT/'scripts/draw-math-connections.py')
connections=importlib.util.module_from_spec(spec2);spec2.loader.exec_module(connections)
checks={**art.verify(),**connections.verify()};count=0
for name in {**art.RECIPES,**connections.RECIPES}:
    for mobile in [False,True]:
        suffix='-mobile' if mobile else ''
        root=ET.parse(art.OUT/f'{name}{suffix}.svg').getroot()
        size=(int(root.attrib['width']),int(root.attrib['height']))
        for el in root.iter('{http://www.w3.org/2000/svg}text'):
            fs=float(el.attrib['font-size']);label=el.text or '';font=ImageFont.truetype(str(art.art.FONT),round(fs))
            width=font.getlength(label);x=float(el.attrib['x']);anchor=el.attrib['text-anchor']
            left=x-width if anchor=='end' else x-width/2 if anchor=='middle' else x
            assert left>=-2 and left+width<=size[0]+2,(name,suffix,label,'horizontal clipping')
            raster_font=ImageFont.truetype(str(art.art.FONT),max(8,round(fs*.5)))
            raster_width=raster_font.getlength(label)*2
            raster_left=x-raster_width if anchor=='end' else x-raster_width/2 if anchor=='middle' else x
            assert raster_left>=-2 and raster_left+raster_width<=size[0]+2,(name,suffix,label,'pixel-label clipping')
            assert 0<=float(el.attrib['y'])<=size[1],(name,suffix,label,'vertical clipping')
        if name=='sequential':
            labels=[el for el in root.iter('{http://www.w3.org/2000/svg}text') if el.text=='setting']
            footers=[el for el in root.iter('{http://www.w3.org/2000/svg}text') if 'observations / next' in (el.text or '')]
            assert len(labels)==len(footers)==2
            for axis,status in zip(labels,footers):
                for pixel in [False,True]:
                    def bounds(el):
                        fs=float(el.attrib['font-size'])
                        font_size=max(8,round(fs*.5)) if pixel else round(fs)
                        font=ImageFont.truetype(str(art.art.FONT),font_size)
                        bbox=font.getbbox(el.text,anchor='ls');scale=2 if pixel else 1
                        return float(el.attrib['y'])+bbox[1]*scale,float(el.attrib['y'])+bbox[3]*scale
                    assert bounds(status)[0]-bounds(axis)[1]>=20,(name,suffix,'footer overlap')
        with Image.open(art.OUT/f'{name}-pixel{suffix}.png') as still:assert still.size==size
        with Image.open(art.OUT/f'{name}-pixel{suffix}.gif') as gif:
            assert gif.size==size and gif.info['loop']==0
            ms=0;hashes=set()
            for j,frame in enumerate(ImageSequence.Iterator(gif)):
                ms+=frame.info['duration']
                hashes.add(hashlib.sha256(frame.convert('RGB').tobytes()).digest())
                if j%5==0:
                    arr=np.array(frame.convert('RGB'))
                    assert np.array_equal(arr,np.repeat(np.repeat(arr[::2,::2],2,0),2,1)),name
            # GIF timing uses exact centiseconds, including merged hold frames.
            assert ms==5760 and len(hashes)>1,(name,suffix,ms,len(hashes))
        with Image.open(art.OUT/f'{name}-crisp{suffix}.gif') as gif:
            assert gif.size==(size[0]*2,size[1]*2) and gif.info['loop']==0
            ms=0;hashes=set()
            for j,frame in enumerate(ImageSequence.Iterator(gif)):
                ms+=frame.info['duration']
                hashes.add(hashlib.sha256(frame.convert('RGB').tobytes()).digest())
                if j==0:
                    # Sharper rasterization must contain detail within what
                    # would have been a 4x-upscaled pixel block.
                    sample=np.array(frame.convert('RGB'))[:512,:512]
                    assert not np.array_equal(sample,np.repeat(np.repeat(sample[::4,::4],4,0),4,1)),name
            assert ms==5760 and len(hashes)>1,(name,suffix,'crisp timing/motion')
        count+=1
print(json.dumps({'verified':f'{count} complete wide/mobile figure sets',**checks},indent=2))
