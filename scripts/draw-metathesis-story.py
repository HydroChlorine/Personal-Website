"""Original paired explanatory art for the hydrazine-mediated RCM project.
Reported numbers are transcribed from the supplied manuscript, Figures 3–6.
Cartoon motions explain net exchange / a proposed relay, not measured kinetics.
"""
from pathlib import Path
import importlib.util,math,textwrap,json,sys
from PIL import Image
import numpy as np
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('paired',ROOT/'scripts/draw-math-topics.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
OUT=ROOT/'public/media/metathesis'; c.OUT=OUT;c.art.OUT=OUT
BG,PANEL,LINE,CYAN,AMBER,MINT,TEXT,MUTED,CORAL=c.BG,c.PANEL,c.LINE,c.CYAN,c.AMBER,c.MINT,c.TEXT,c.MUTED,c.CORAL

def text(d,x,y,s,size=16,col=TEXT,anchor='middle'):d.text(x,y,s,size,col,anchor)
def line(d,p,col=CYAN,w=2):d.path(p,col,w)
def note(d,b,s,col=MUTED):
 rows=textwrap.wrap(s,max(18,int((b[2]-28)/9.7)))
 for i,row in enumerate(rows):text(d,b[0]+b[2]/2,b[1]+b[3]-20-(len(rows)-i-1)*17,row,12,col)
def frame(m,title,subtitle,n=2,h=620,mh=1000):
 d=c.Drawing(450 if m else 900,mh if m else h)
 text(d,25,33,title,16,CYAN,'start')
 rows=textwrap.wrap(subtitle,42 if m else 102)
 for i,row in enumerate(rows):text(d,25,60+i*17,row,12,MUTED,'start')
 top=100+max(0,len(rows)-1)*17
 if m:
  hh=(mh-top-32-16*(n-1))/n;bs=[(25,top+i*(hh+16),400,hh) for i in range(n)]
 else:
  ww=(840-18*(n-1))/n;bs=[(30+i*(ww+18),top,ww,h-top-38) for i in range(n)]
 for b in bs:d.rect(*b)
 return d,bs

def atom(d,x,y,s,col=CYAN):
 d.rect(x-12,y-13,24,25,BG,BG);text(d,x,y+6,s,18,col)
def bond(d,a,b,col=CYAN,double=False,w=2):
 line(d,[a,b],col,w)
 if double:
  dx=b[0]-a[0];dy=b[1]-a[1];r=max(1,math.hypot(dx,dy));o=(-dy/r*5,dx/r*5)
  line(d,[(a[0]+o[0],a[1]+o[1]),(b[0]+o[0],b[1]+o[1])],col,w)
def ring(d,cx,cy,r=40,n=6,col=CYAN,aromatic=False,rotation=-math.pi/2):
 pts=[(cx+r*math.cos(rotation+i*2*math.pi/n),cy+r*math.sin(rotation+i*2*math.pi/n)) for i in range(n)]
 line(d,pts+[pts[0]],col)
 if aromatic:
  for i in [0,2,4]:
   a,b=pts[i],pts[(i+1)%n]
   line(d,[(cx+.78*(a[0]-cx),cy+.78*(a[1]-cy)),(cx+.78*(b[0]-cx),cy+.78*(b[1]-cy))],col)
 return pts

def fused_heterocycle(d,cx,cy,r,X,col):
 left=ring(d,cx-r*.866,cy,r,6,col,True,math.pi/6)
 right=ring(d,cx+r*.866,cy,r,6,col,False,math.pi/6)
 # C3=C4 on the non-fused upper-right edge of the partially saturated ring.
 a,b=right[4],right[5];line(d,[(cx+r*.866+.8*(a[0]-cx-r*.866),cy+.8*(a[1]-cy)),(cx+r*.866+.8*(b[0]-cx-r*.866),cy+.8*(b[1]-cy))],col)
 atom(d,*right[1],X,col)
 if X=='N':line(d,[(right[1][0],right[1][1]+15),(right[1][0],right[1][1]+31)],col);text(d,right[1][0],right[1][1]+48,'Ts',13,col)

# Molecular rebuild: shared primitives, independently authored graphs and renderer.
mspec=importlib.util.spec_from_file_location('molecular',ROOT/'scripts/metathesis-molecular-art.py')
ma=importlib.util.module_from_spec(mspec);mspec.loader.exec_module(ma);ma.configure(globals())
RECIPES=ma.RECIPES
if __name__=='__main__':
 selected={name:RECIPES[name] for name in sys.argv[1:]} if len(sys.argv)>1 else RECIPES
 c.main(recipes=selected,sheet_name='contact-sheet.png' if len(selected)==8 else 'subset-review.png',source_dir=ROOT/'assets/art-source/metathesis',checks={**ma.verify(),'reportedNMRSubstitution':[44,77],'catalyticLoadingMolPercent':20,'catalyticIsolatedYieldPercent':78,'concepts':len(RECIPES)})

 # Inspect encoded output as well as matching drawing commands. GIF encoders
 # may merge repeated frames; a scene must still have real motion and timing.
 manifest=json.loads((OUT/'manifest.json').read_text())
 for name,entry in manifest['figures'].items():
  for mode,suffix in [('wide',''),('mobile','-mobile')]:
   for style in ['pixel','crisp']:
    with Image.open(OUT/f'{name}-{style}{suffix}.gif') as im:
     assert list(im.size)==entry[mode]['size' if style=='pixel' else 'crispSize']
     assert im.n_frames>1,(name,mode,style,'not animated')
     duration=0
     for i in range(im.n_frames):im.seek(i);duration+=im.info['duration']
     assert duration==5760,(name,mode,style,duration)
     entry[mode][style+'Frames']=im.n_frames
 (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
