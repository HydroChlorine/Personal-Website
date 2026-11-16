"""Original project-card animations. The publication uses an unmodified TOC bitmap
and a separate transparent GIF overlay. No chemical structure is redrawn.
"""
from pathlib import Path
import importlib.util, math, json, hashlib
from functools import lru_cache
from html import escape
from PIL import Image,ImageDraw,ImageFont
ROOT=Path(__file__).resolve().parents[1]
sp=importlib.util.spec_from_file_location('art',ROOT/'scripts/draw-catalyst-figures.py');a=importlib.util.module_from_spec(sp);sp.loader.exec_module(a)
OUT=ROOT/'public/media/project-previews';OUT.mkdir(parents=True,exist_ok=True)
BG='#0c1521';INK='#dae8ee';DIM='#8ca5b9';CYAN='#98d5df';PINK='#ef9acb';BLUE='#8dbbe3';GOLD='#e7c38b';LINE='#355166'
@lru_cache(None)
def font(size):return ImageFont.truetype(str(ROOT/'public/fonts/ChakraPetch-Medium.ttf'),size)
class Draw(a.Drawing):
 def text(self,x,y,t,size=24,color=INK,anchor='middle'):
  self.svg.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(t)}</text>')
  self.d.text((round(x*a.SCALE),round(y*a.SCALE)),t,font=font(max(8,round(size*a.SCALE))),fill=color,anchor={'start':'ls','middle':'ms','end':'rs'}[anchor])

def text(d,x,y,t,size=24,col=INK):d.text(x,y,t,size,col)
def circle(d,x,y,r,col):
 d.svg.append(f'<circle cx="{x:.3f}" cy="{y:.3f}" r="{r:.3f}" fill="{col}"/>');s=a.SCALE;d.d.ellipse(tuple(round(v*s) for v in [x-r,y-r,x+r,y+r]),fill=col)
def bond(d,A,B,col=INK,order=1,width=3):
 dx=B[0]-A[0];dy=B[1]-A[1];l=math.hypot(dx,dy);o=(-dy/l*3.6,dx/l*3.6)
 for j in range(order):
  f=j-(order-1)/2;d.path([(A[0]+o[0]*f,A[1]+o[1]*f),(B[0]+o[0]*f,B[1]+o[1]*f)],col,width)
def ring(d,cx,cy,r=45,n=6,col=INK,aromatic=False,rotation=math.pi/6):
 p=[(cx+r*math.cos(rotation+j*math.tau/n),cy+r*math.sin(rotation+j*math.tau/n)) for j in range(n)]
 for j in range(n):
  bond(d,p[j],p[(j+1)%n],col)
  if aromatic and j%2==0:bond(d,(cx+.78*(p[j][0]-cx),cy+.78*(p[j][1]-cy)),(cx+.78*(p[(j+1)%n][0]-cx),cy+.78*(p[(j+1)%n][1]-cy)),col,width=2)
 return p

def label(d,p,t,col=INK,size=26):
 # Mask line endpoints at heteroatom letters, as in a chemical drawing.
 w=font(round(size)).getlength(t)+8;d.rect(p[0]-w/2,p[1]-size*.7,w,size,BG,BG);text(d,p[0],p[1]+size*.28,t,size,col)
def tag(d,p,col):circle(d,*p,15,col);circle(d,p[0]-3,p[1]-4,9,BG);circle(d,*p,11,col)
def glow(d,p,t,col=CYAN):
 for r,c in [(10,LINE),(5,col)]:circle(d,*p,r,c)
def catalyst(t):
 d=Draw(1000,600);text(d,500,50,'Generate. Predict. Explore.',34,CYAN)
 for x,w,title in [(25,285,'Make candidates'),(352,280,'Model properties'),(675,300,'Choose the next')]:
  d.rect(x,96,w,378,BG,LINE);text(d,x+w/2,134,title,25,CYAN)
 # Shared chemical scaffold with visibly different fragment choices.
 text(d,164,208,'N-N+=C-Ar',26,INK)
 d.path([(147,221),(147,259)],CYAN,3)
 choices=[(90,322,5,CYAN),(220,322,6,GOLD),(155,413,6,PINK)]
 for i,(cx,cy,n,col) in enumerate(choices):
  ring(d,cx,cy+3*math.sin(t*math.tau+i),34,n,col,i==2)
  if int(t*3)%3==i:circle(d,cx,cy-47,5,col)
 d.path([(147,259),(90,275)],LINE,2,dashed=True);d.path([(147,259),(220,275)],LINE,2,dashed=True);d.path([(147,259),(147,364),(155,375)],LINE,2,dashed=True)
 # A compact predictor represented by a circuit, not a fabricated fitted result.
 d.rect(398,202,184,155,'#162638',CYAN,2);text(d,490,264,'PROPERTY',25,INK);text(d,490,307,'MODEL',28,INK)
 for yy in [225,257,289,321]:
  bond(d,(377,yy),(398,yy),CYAN);bond(d,(582,yy),(605,yy),CYAN)
 for xx in [427,459,491,523,555]:bond(d,(xx,182),(xx,202),CYAN);bond(d,(xx,357),(xx,378),CYAN)
 # Relative ranks are illustrative; no numerical prediction is asserted.
 for i,(letter,col,w) in enumerate([('A',CYAN,118),('B',GOLD,183),('C',PINK,86)]):
  yy=215+i*80;text(d,711,yy+5,letter,25,col);d.rect(740,yy-17,205,22,'#152331',LINE);d.rect(740,yy-17,w,22,col,col)
  if int(t*3)%3==i:d.path([(954,yy-10),(964,yy),(954,yy+10)],col,3)
 d.arrow((313,285),(346,285),DIM);d.arrow((637,285),(670,285),DIM)
 # The return path makes the search a loop rather than a one-way pipeline.
 d.path([(828,479),(828,524),(169,524),(169,479)],CYAN,2);d.arrow((169,499),(169,479),CYAN)
 u=t%1;glow(d,(828-659*u,524),t,CYAN)
 text(d,500,572,'A scaffold, a search space, and a feedback loop',24,INK)
 return d

def toc_overlay():
 # This creates only a new moving-dot layer, never edits or rasterizes the TOC.
 source=ROOT/'assets/art-source/project-previews/toc-original.png'
 public=OUT/'metal-free-rcm-source.png'
 assert source.read_bytes()==public.read_bytes(), 'The supplied TOC must remain byte-identical.'
 with Image.open(source) as im:size=im.size
 assert size==(1898,700)
 palette=[0,0,0, 72,111,138, 136,215,235, 239,250,255]+[0,0,0]*252
 frames=[]
 for i in range(60):
  im=Image.new('P',size,0);im.putpalette(palette);pen=ImageDraw.Draw(im)
  phase=i/30;u=phase%1;x=(420+280*u) if phase<1 else (1190+280*u);y=297
  for r,col in [(23,1),(14,2),(6,3)]:pen.ellipse((x-r,y-r,x+r,y+r),fill=col)
  frames.append(im)
 dest=OUT/'metal-free-rcm-dot-overlay.gif'
 frames[0].save(dest,save_all=True,append_images=frames[1:],duration=120,loop=0,transparency=0,disposal=2,optimize=False)
 with Image.open(dest) as im:
  assert im.n_frames==60 and im.size==size
  duration=0
  for i in range(im.n_frames):im.seek(i);duration+=im.info['duration']
  assert duration==7200
 return {'size':list(size),'durationMs':7200,'frames':60,'rendering':'Original PNG plus CSS color treatment and transparent GIF overlay','originalSha256':hashlib.sha256(source.read_bytes()).hexdigest(),'overlaySha256':hashlib.sha256(dest.read_bytes()).hexdigest()}

if __name__=='__main__':
 manifest=json.loads((OUT/'manifest.json').read_text()) if (OUT/'manifest.json').exists() else {}
 if '--overlay-only' not in __import__('sys').argv:
  a.SCALE=.5
  still=catalyst(.72);still.raster().save(OUT/'catalyst-discovery.png',optimize=True)
  old=a.OUT;a.OUT=OUT;still.save_svg('catalyst-discovery');a.OUT=old
  frames=[catalyst(i/48).raster().quantize(colors=96,dither=Image.Dither.NONE) for i in range(48)]
  frames[0].save(OUT/'catalyst-discovery.gif',save_all=True,append_images=frames[1:],duration=150,loop=0,optimize=True,disposal=1)
  manifest['catalyst-discovery']={'size':[1000,600],'durationMs':7200,'pixelated':True,'frames':48,'sha256':hashlib.sha256((OUT/'catalyst-discovery.gif').read_bytes()).hexdigest()}
 manifest['metal-free-rcm']=toc_overlay()
 (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 print('Original TOC preserved; transparent arrow-dot GIF generated.')
