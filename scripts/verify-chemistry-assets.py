"""Offline asset/animation checks; run with Python 3, Pillow and NumPy."""
from pathlib import Path
import importlib.util
import json
import xml.etree.ElementTree as ET
from PIL import Image, ImageSequence
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('chemistry_motion',ROOT/'scripts/animate-chemistry.py')
motion=importlib.util.module_from_spec(spec);spec.loader.exec_module(motion)
manifest=json.loads((ROOT/'public/art/chemistry/v1/manifest.json').read_text())
for name,meta in manifest.items():
    with Image.open(ROOT/f'public/art/chemistry/v1/{name}.gif') as im:
        assert im.size==tuple(meta['size']) and im.info['loop']==0
        frames=[f.copy().convert('RGB') for f in ImageSequence.Iterator(im)]
        assert len({f.tobytes() for f in frames})>3,name
        assert sum(f.info.get('duration',0) for f in ImageSequence.Iterator(im))==meta['durationMs']
    with Image.open(ROOT/f'public/art/chemistry/v1/{name}.png') as still:assert still.size==tuple(meta['size'])
last_surface,last_interface=41,51
initial_upper=motion.capacity_below(41)-motion.capacity_below(51)
for step in range(101):
    surface,interface=motion.extraction_levels(step/100)
    assert surface>=last_surface and interface>=last_interface
    upper=motion.capacity_below(surface)-motion.capacity_below(interface)
    assert abs(upper-initial_upper)<1e-6
    last_surface,last_interface=surface,interface
assert last_surface>43 and last_interface==65
base=motion.small_master('workup-column')
frames=[motion.render(base,'workup-column',i,160).convert('RGB') for i in (10,60)]
def first_liquid(frame,rows,color):
    return next(y for y in rows if frame.getpixel((253*3+1,y*3+1))==color)
assert first_liquid(frames[1],range(41,65),(85,160,140))>first_liquid(frames[0],range(41,65),(85,160,140))
assert first_liquid(frames[1],range(96,106),(192,142,68))<first_liquid(frames[0],range(96,106),(192,142,68))
for name in ['workflow','generator','attachments','geometry','one-feature','shortlist','landscape']:
    for suffix in ['', '-mobile']:
        root=ET.parse(ROOT/f'public/media/catalyst-discovery/{name}{suffix}.svg').getroot()
        assert float(root.attrib['width'])>0
        with Image.open(ROOT/f'public/media/catalyst-discovery/{name}-pixel{suffix}.gif') as im:
            assert im.info['loop']==0 and im.n_frames>1,(name,suffix)
        with Image.open(ROOT/f'public/media/catalyst-discovery/{name}-pixel{suffix}.png') as im:assert im.width>=600
print('Verified 6 laboratory GIFs/stills, 7 paired desktop/mobile figures, and extraction volume/level movement.')
