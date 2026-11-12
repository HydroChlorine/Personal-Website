"""Code-native Nyan Cat rendition from Lichen's reference; character by Chris Torres.
No third-party sprite sheet, animation, music, or implementation is bundled.
"""
from pathlib import Path
import random
from PIL import Image, ImageDraw
OUT=Path(__file__).resolve().parents[1]/'public/art/widgets'
OUT.mkdir(parents=True,exist_ok=True)
im=Image.new('RGB',(90,40),'#102743'); d=ImageDraw.Draw(im); shapes=[]
def box(x,y,w,h,c):
 d.rectangle((x,y,x+w-1,y+h-1),fill=c)
 shapes.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{c}"/>')
def poly(p,c):
 d.polygon(p,fill=c);shapes.append('<polygon points="'+' '.join(f'{x},{y}' for x,y in p)+f'" fill="{c}"/>')
# Stars and six broad, stepped stripes.
for x,y in [(13,6),(29,32),(72,5),(81,30),(6,25)]:
 box(x-1,y,3,1,'#c3e9eb');box(x,y-1,1,3,'#c3e9eb')
for i,c in enumerate(['#f75a58','#ffb746','#f6eb68','#73d77c','#71cdec','#a78ae5']):
 y=13+i*3;poly([(0,y),(13,y),(13,y-1),(27,y-1),(27,y),(44,y),(44,y+2),(27,y+2),(27,y+1),(13,y+1),(13,y+2),(0,y+2)],c)
ink='#141322'; gray='#aab2bf'
# Tail, feet, pastry crust, pink icing, and sprinkles.
poly([(43,23),(39,23),(36,20),(34,20),(34,24),(38,27),(44,27)],ink)
poly([(42,24),(39,24),(36,22),(36,24),(39,26),(43,26)],gray)
for x,y in [(45,29),(51,30),(62,30),(69,29)]:
 box(x,y,5,4,ink);box(x+1,y,3,2,gray)
poly([(44,10),(63,10),(66,13),(66,28),(63,31),(44,31),(41,28),(41,13)],ink)
poly([(44,12),(62,12),(64,14),(64,27),(62,29),(44,29),(43,27),(43,14)],'#f4cf9c')
poly([(46,13),(61,13),(63,15),(63,26),(61,28),(46,28),(44,26),(44,15)],'#f6a1d6')
for x,y in [(47,15),(55,14),(60,18),(50,21),(46,25),(57,25),(54,18)]: box(x,y,1,2,'#db629f')
# Gray cat face with upright ears, cheeks and smiling mouth.
poly([(59,20),(59,16),(61,16),(65,20),(70,20),(74,16),(76,16),(76,22),(78,24),(78,29),(75,32),(61,32),(58,29),(58,23)],ink)
poly([(61,22),(61,19),(64,22),(71,22),(74,19),(74,23),(76,25),(76,28),(74,30),(62,30),(60,28),(60,24)],gray)
box(63,24,2,2,ink);box(72,24,2,2,ink)
box(61,27,2,1,'#ed9eaf');box(74,27,2,1,'#ed9eaf')
box(67,27,1,2,ink);box(70,27,1,2,ink);box(68,29,2,1,ink)
svg='<svg xmlns="http://www.w3.org/2000/svg" width="180" height="80" viewBox="0 0 90 40" shape-rendering="crispEdges"><title>Nyan Cat — character by Christopher Torres</title><rect width="90" height="40" fill="#102743"/>'+''.join(shapes)+'</svg>\n'
(OUT/'nyan.svg').write_text(svg)
for name,size in [('fine',(180,80)),('pixel',(90,40)),('soft',(45,20)),('hazy',(18,8))]:
 im.resize(size,Image.Resampling.NEAREST if name=='fine' else Image.Resampling.BOX).save(OUT/f'nyan-{name}.png',optimize=True)
chaos=im.resize((18,8),Image.Resampling.BOX);pixels=list(chaos.get_flattened_data());random.Random(91).shuffle(pixels);chaos.putdata(pixels);chaos.save(OUT/'nyan-chaos.png')
(OUT/'README.md').write_text('Nyan Cat character: Christopher Torres (prguitarman). This code-native rendition follows the classic reference supplied by Lichen; it does not claim ownership of the character. SVG and resolution/chaos companions generated with scripts/draw-feelings-nyan.py. No original GIF, audio, or third-party implementation is bundled. Character credit also appears on /credits. Legacy moon-moth files are unused earlier artwork.\n')
