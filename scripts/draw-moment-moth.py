"""Original moon-moth artwork and attention-resolution variants. No external art."""
from pathlib import Path
import json,random
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1];OUT=ROOT/'public/art/widgets';OUT.mkdir(parents=True,exist_ok=True)
W,H=180,80
BG='#0b1424';LINE='#253b55';CYAN='#abd3db';GOLD='#e0bb86';INK='#142339';WHITE='#e0e8ed'
commands=[]
def polygon(points,color):commands.append(('polygon',points,color))
def ellipse(box,color):commands.append(('ellipse',box,color))
def rect(box,color):commands.append(('rect',box,color))
rect([0,0,179,79],BG)
for x,y,r in [(23,20,1),(39,56,1),(63,15,1),(156,20,1),(161,61,1),(143,51,1)]:
 rect([x-r,y,x+r,y],LINE);rect([x,y-r,x,y+r],LINE)
# A quiet, stepped rainbow trail. The passenger is an original moth, not a cat.
for i,col in enumerate(['#b47c91','#c7947d','#c5af7c','#83ad9c','#7fa6bd','#8d91bd']):
 y=35+i*3;polygon([(15+i*2,y),(39,y),(39,y-2),(59,y-2),(59,y),(86,y),(86,y+2),(58,y+2),(58,y),(38,y),(38,y+2),(15+i*2,y+2)],col)
# Four wings, with layered moon-like markings.
polygon([(106,37),(94,21),(84,20),(77,28),(82,41),(100,48)],'#597c9c')
polygon([(115,37),(128,21),(139,21),(146,28),(140,42),(123,48)],'#668d9c')
polygon([(103,45),(87,47),(87,57),(98,61),(108,51)],'#a28eaa')
polygon([(118,45),(136,47),(134,57),(123,61),(114,51)],'#a194af')
polygon([(103,37),(94,26),(85,25),(82,29),(87,38),(100,43)],CYAN)
polygon([(118,37),(130,26),(137,26),(141,30),(136,39),(122,43)],'#b4d2c4')
ellipse([88,28,97,37],GOLD);ellipse([91,26,99,35],CYAN)
ellipse([129,29,138,38],GOLD);ellipse([132,27,141,36],'#b4d2c4')
rect([107,33,115,52],INK);rect([109,35,113,51],GOLD)
rect([105,30,117,38],CYAN);rect([107,33,108,34],INK);rect([114,33,115,34],INK)
polygon([(107,31),(101,25),(102,24),(109,30)],GOLD);polygon([(114,31),(119,24),(121,24),(116,32)],GOLD)
rect([104,23,106,25],WHITE);rect([119,22,121,24],WHITE)
svg=[f'<svg xmlns="http://www.w3.org/2000/svg" width="180" height="80" viewBox="0 0 180 80"><title>Moon moth with a rainbow trail</title>']
im=Image.new('RGB',(W,H),BG);d=ImageDraw.Draw(im)
for kind,p,col in commands:
 if kind=='polygon':
  d.polygon(p,fill=col);svg.append('<polygon points="'+' '.join(f'{x},{y}' for x,y in p)+f'" fill="{col}"/>')
 elif kind=='ellipse':
  d.ellipse(p,fill=col);x,y,x1,y1=p;svg.append(f'<ellipse cx="{(x+x1)/2}" cy="{(y+y1)/2}" rx="{(x1-x)/2}" ry="{(y1-y)/2}" fill="{col}"/>')
 else:
  d.rectangle(p,fill=col);x,y,x1,y1=p;svg.append(f'<rect x="{x}" y="{y}" width="{x1-x+1}" height="{y1-y+1}" fill="{col}"/>')
svg.append('</svg>');(OUT/'moth.svg').write_text(''.join(svg)+'\n')
for name,size in [('fine',(180,80)),('pixel',(90,40)),('soft',(45,20)),('hazy',(18,8))]:
 im.resize(size,Image.Resampling.BOX).save(OUT/f'moth-{name}.png',optimize=True)
chaos=im.resize((18,8),Image.Resampling.BOX);pixels=list(chaos.get_flattened_data());random.Random(91).shuffle(pixels);chaos.putdata(pixels);chaos.save(OUT/'moth-chaos.png')
(OUT/'README.md').write_text('Original moon-moth and rainbow artwork, created for this website with AI-assisted Python/Pillow code. No Nyan Cat image, animation, audio, or code is used. Reproduce with scripts/draw-moment-moth.py.\n')
print('Created original SVG and five resolution/chaos companions.')
