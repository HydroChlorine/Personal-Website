"""Read-only checks for the six original CS banners and their toy models."""
from pathlib import Path
import importlib.util
import hashlib
import json
import numpy as np
from PIL import Image, ImageSequence

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('cs_art',ROOT/'scripts/animate-computer-science.py')
art=importlib.util.module_from_spec(spec);spec.loader.exec_module(art)
checks=art.verify()
manifest=json.loads((art.OUT/'manifest.json').read_text())
assert set(manifest['scenes'])==set(art.NAMES)
for name in art.NAMES:
    # Rebuild only the small display in memory: all authored labels must fit
    # through every phase, not merely in the PNG selected for the pause state.
    for i in range(art.COUNT):assert art.diagram(name,i).size==(194,96)
    for mobile in [False,True]:
        suffix='-mobile' if mobile else '';size=(768,672) if mobile else (1152,384)
        with Image.open(art.OUT/f'{name}{suffix}.gif') as gif:
            assert gif.size==size and gif.info['loop']==0
            duration=0;changed=set();count=0
            for count,frame in enumerate(ImageSequence.Iterator(gif),1):
                duration+=frame.info['duration']
                rgb=np.asarray(frame.convert('RGB'))
                changed.add(hashlib.sha256(rgb.tobytes()).digest())
                if count%5==0:
                    assert np.array_equal(rgb,np.repeat(np.repeat(rgb[::3,::3],3,0),3,1)),name
            assert duration==16000 and len(changed)>4 and count>=8,(name,suffix,count,duration)
        with Image.open(art.OUT/f'{name}{suffix}.png') as still:assert still.size==size
    with Image.open(art.OUT/f'{name}-study.png') as study:assert study.size==(582,288)
print(json.dumps({'verified':'12 GIFs, 12 pause stills, 6 monitor studies; 16s loops, motion, pixel grid, labels, and toy models',**checks},indent=2))
