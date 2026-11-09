"""Validate shipped GIFs/stills and the numerical models without rewriting assets."""
import importlib.util
import json
import hashlib
from pathlib import Path
import numpy as np
from PIL import Image, ImageSequence

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('math_art',ROOT/'scripts/animate-mathematics.py')
art=importlib.util.module_from_spec(spec)
spec.loader.exec_module(art)
checks=art.verify()
for name in art.NAMES:
    for mobile in [False,True]:
        suffix='-mobile' if mobile else ''
        size=(768,672) if mobile else (1152,384)
        with Image.open(art.OUT/f'{name}{suffix}.gif') as gif:
            assert gif.size==size and gif.info['loop']==0
            duration=0;count=0;changed=set()
            for frame in ImageSequence.Iterator(gif):
                duration+=frame.info.get('duration',0);count+=1
                changed.add(hashlib.sha256(frame.convert('RGB').tobytes()).digest())
                if count%10==0:
                    rgb=np.array(frame.convert('RGB'))
                    assert np.array_equal(rgb,np.repeat(np.repeat(rgb[::3,::3],3,0),3,1)),name
            assert duration==16000 and count>30 and len(changed)>4,(name,count,duration)
        with Image.open(art.OUT/f'{name}{suffix}.png') as still:assert still.size==size
    with Image.open(art.OUT/f'{name}-study.png') as study:assert study.size==(582,288)
print(json.dumps({'verified':'12 GIFs, 12 pause stills, 6 study diagrams; exact pixel grid and loop durations',**checks},indent=2))
