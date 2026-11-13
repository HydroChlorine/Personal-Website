"""Original code-native, deterministic fine-pixel frost, snow and runoff textures.
No external images or libraries. Run from any directory with Python 3.
"""
from pathlib import Path
import math, random
OUT=Path(__file__).resolve().parents[1]/'public/art/weather'
OUT.mkdir(parents=True,exist_ok=True)
def noise(t,seed):
 i=math.floor(t); f=t-i; f=f*f*(3-2*f)
 return random.Random(i*92821+seed*137).random()*(1-f)+random.Random((i+1)*92821+seed*137).random()*f
def svg(name,w,h,groups):
 paths=[]
 for (color,alpha),bits in groups.items():
  paths.append(f'<path fill="{color}" opacity="{alpha}" d="'+''.join(bits)+'"/>')
 (OUT/name).write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{w}" height="{h}" viewBox="0 0 {w} {h}" preserveAspectRatio="none">'+''.join(paths)+'</svg>\n')
def pixel(groups,x,y,c,a=1,size=2):
 groups.setdefault((c,round(a,2)),[]).append(f'M{x} {y}h{size}v{size}h-{size}z')
for seed in [11,47,83]:
 # Connected, translucent frozen rim with branching ice growing inward.
 rng=random.Random(seed); cells={};length=2048
 for y in range(0,length,2):
  depth=8+15*noise(y/113,seed)+10*noise(y/37,seed+4)
  for x in range(0,36,2):
   grain=noise(y/9+x*.63,seed+int(x/4))
   reach=depth+5*(grain-.5)
   if x<reach:
    strength=(1-x/max(reach,1))**1.6
    cells[x,y]=('#c3dce7' if grain>.4 else '#90b4c9', .04+.34*strength)
 # Dendrites remain attached to the rim, rather than isolated periodic strokes.
 for start in sorted(rng.sample(range(10,length-90,2),31)):
  y=start;depth=rng.randrange(12,35,2)
  for x in range(0,depth,2):
   y+=rng.choice([-2,0,2]); a=.3*(1-x/42)
   cells[x,y]=('#d9edf2',a)
   if x>6 and rng.random()<.45:
    for j in range(1,rng.randint(2,4)):
     cells[x-2*j,y-2*j]=('#b5d5e3',a*.7)
 for horizontal in [False,True]:
  groups={}
  for (x,y),(c,a) in cells.items():pixel(groups,y if horizontal else x,x if horizontal else y,c,a)
  svg(f'frost-{seed}-{ "horizontal" if horizontal else "vertical"}.svg',length if horizontal else 36,36 if horizontal else length,groups)
  mirrored={}
  for (x,y),(c,a) in cells.items():pixel(mirrored,y if horizontal else 34-x,34-x if horizontal else y,c,a)
  svg(f'frost-{seed}-{ "bottom" if horizontal else "right"}.svg',length if horizontal else 36,36 if horizontal else length,mirrored)
 # A low, continuous blanket. Fine steps change by one pixel, never long blocks.
 groups={}
 for x in range(1536):
  top=round(5+3*noise(x/91,seed)+2*noise(x/23,seed+2)+noise(x/6,seed+7))
  for y in range(top,24):
   depth=y-top
   c=('#e4f0f3' if depth<2 else '#cbdfe7' if depth<6 else '#abc5d4' if depth<11 else '#7f9eb6' if depth<15 else '#59758f')
   if depth<5 and noise(x/3+y,seed)>.88:c='#eaf3f5'
   pixel(groups,x,y,c,1,1)
 svg(f'snow-cap-{seed}.svg',1536,24,groups)
 # Gravity joins beads into long, uneven tracks; weak interior condensation.
 rng=random.Random(seed+90);groups={}
 for track in range(8):
  x=rng.randrange(2,25);start=rng.randrange(0,1900);end=min(length,start+rng.randrange(180,700))
  for y in range(start,end,2):
   px=round(x+2*noise(y/57,seed+track))
   alpha=(.18+.22*noise(y/81,seed+track+2))*(.5+.5*math.sin(math.pi*(y-start)/max(1,end-start)))
   groups.setdefault(('#a5d8e5',round(alpha,2)),[]).append(f'M{px} {y}h1v2h-1z')
   if noise(y/39,seed+track)>.5:groups.setdefault(('#547e9b',round(alpha*.65,2)),[]).append(f'M{px+1} {y}h1v2h-1z')
  pixel(groups,x+1,end,'#c4e7ed',.4,2)
 for _ in range(90):
  x=rng.randrange(2,29);y=rng.randrange(length)
  pixel(groups,x,y,'#c5e5ec',rng.choice([.08,.12,.18]),rng.choice([1,1,2]))
 svg(f'rain-glass-{seed}.svg',36,length,groups)
 # Reflect each path about the right edge without changing its pixel scale.
 source=(OUT/f'rain-glass-{seed}.svg').read_text()
 source=source.replace('><path','><g transform="translate(36 0) scale(-1 1)"><path',1).replace('</svg>','</g></svg>')
 (OUT/f'rain-glass-{seed}-right.svg').write_text(source)
print('Created 21 original fine-pixel surface textures.')
