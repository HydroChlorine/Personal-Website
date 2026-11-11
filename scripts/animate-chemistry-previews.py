"""Original midnight laboratory teaser scenes, not experimental recordings.

384x216 logical pixels, 2x nearest-neighbor export. All 15 loops use bespoke
physical scenes rather than shrinking the article diagrams. No external art.
Run independently of draw-chemistry-experiences.py (which owns body figures).
"""
from pathlib import Path
import math,json,hashlib
import numpy as np
from PIL import Image,ImageDraw,ImageFont,ImageSequence
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/media/chemistry/experiences'
SOURCE=ROOT/'assets/art-source/chemistry/experiences'
W,H,N,MS=384,216,120,100
INK='#080f1c';WALL='#101b2c';DEEP='#0b1422';PANEL='#16283a';GRID='#213c4d';EDGE='#426477';MUTED='#6e919f';CYAN='#8cd6df';GOLD='#e8be80';WHITE='#d6e8e8';GREEN='#83ba9b';BLUE='#72aaf3';PINK='#c59ab7';CORAL='#d38d7b'
FONT=ImageFont.truetype('/System/Library/Fonts/Menlo.ttc',8)
SMALL=ImageFont.truetype('/System/Library/Fonts/Menlo.ttc',7)

def mix(a,b,t):
 return tuple(round(x*(1-t)+y*t) for x,y in zip(rgb(a),rgb(b)))
def rgb(c):return tuple(bytes.fromhex(c[1:])) if isinstance(c,str) else c
def rect(d,b,c,outline=None,width=1):d.rectangle(tuple(round(x) for x in b),fill=c,outline=outline,width=width)
def line(d,pts,c=CYAN,w=1):d.line([(round(x),round(y)) for x,y in pts],fill=c,width=w)
def ellipse(d,b,c,outline=None,width=1):d.ellipse(tuple(round(x) for x in b),fill=c,outline=outline,width=width)
def text(d,x,y,s,c=MUTED,small=False):
 d.fontmode='1';d.text((round(x),round(y)),s,font=SMALL if small else FONT,fill=c)
def dot(d,x,y,c=WHITE,r=1):rect(d,(x-r,y-r,x+r,y+r),c)
def poly(d,p,c,outline=None):
 p=[(round(x),round(y)) for x,y in p];d.polygon(p,fill=c)
 if outline:line(d,p+[p[0]],outline)
def glow(im,cx,cy,rx,ry,col,strength=1):
 # Concentric low-intensity pixel bands, kept at the scene's native resolution.
 overlay=Image.new('RGBA',im.size);dd=ImageDraw.Draw(overlay)
 for k in range(8,0,-1):
  f=k/8;ellipse(dd,(cx-rx*f,cy-ry*f,cx+rx*f,cy+ry*f),(*rgb(col),round((1-f*.7)*5*strength)))
 im.paste(Image.alpha_composite(im.convert('RGBA'),overlay).convert('RGB'))
def sphere(d,x,y,r=6,col=CYAN):
 ellipse(d,(x-r,y-r,x+r,y+r),mix(col,INK,.4));ellipse(d,(x-r+1,y-r,x+r-1,y+r-2),col);rect(d,(x-r+2,y-r+2,x-r+4,y-r+3),mix(col,WHITE,.6))
def hardware(d,b):
 x,y,x1,y1=b;rect(d,b,PANEL,EDGE);line(d,[(x+2,y+2),(x1-2,y+2)],MUTED);line(d,[(x1-1,y+2),(x1-1,y1-1)],INK,2)
 for xx in [x+4,x1-4]:
  for yy in [y+5,y1-5]:dot(d,xx,yy,GRID,1)
def screen(d,b):
 hardware(d,(b[0]-5,b[1]-5,b[2]+5,b[3]+5));rect(d,b,INK,GRID)
 for xx in range(int(b[0]+12),int(b[2]),24):line(d,[(xx,b[1]+2),(xx,b[3]-2)],'#142537')
 for yy in range(int(b[1]+12),int(b[3]),20):line(d,[(b[0]+2,yy),(b[2]-2,yy)],'#142537')
def room(title,status,t):
 im=Image.new('RGB',(W,H),INK);d=ImageDraw.Draw(im)
 # Moonlit tiles, overhead task light, distant reagent bottles and steel worktop.
 for y in range(31,177):line(d,[(0,y),(383,y)],mix(WALL,INK,(y-31)/200))
 for y in [54,94,134,174]:line(d,[(10,y),(374,y)],'#182b3a')
 for y in [54,134]:
  for x in [31,121,211,301]:line(d,[(x,y-39),(x,y)],'#142635')
 for x in [76,166,256,346]:line(d,[(x,95),(x,133)],'#142635')
 rect(d,(15,40,50,83),INK,GRID);rect(d,(18,43,47,80),'#152a40');ellipse(d,(29,47,39,57),'#516c86');ellipse(d,(32,45,42,55),'#152a40');line(d,[(33,43),(33,81)],GRID);line(d,[(18,63),(48,63)],GRID)
 rect(d,(293,37,368,39),GRID);line(d,[(296,40),(366,40)],EDGE)
 for j,col in enumerate([GOLD,GREEN,BLUE]):
  x=310+j*17;rect(d,(x,24,x+8,35),PANEL,EDGE);rect(d,(x+2,28,x+6,33),mix(col,INK,.55));rect(d,(x+1,22,x+7,24),MUTED)
 rect(d,(131,31,252,34),GRID);line(d,[(146,35),(238,35)],GOLD)
 rect(d,(8,180,376,187),PANEL,EDGE);line(d,[(12,181),(373,181)],'#76919b');rect(d,(8,188,376,212),DEEP)
 for x in range(20,370,60):line(d,[(x,189),(x-12,211)],'#172a39')
 line(d,[(13,202),(370,202)],'#172a39')
 for j in range(3):rect(d,(18+j*4,192,19+j*4,193),GOLD if j==int(t*3)%3 else GRID)
 text(d,14,10,title,CYAN);text(d,39,190,status,GOLD,True)
 line(d,[(14,25),(369,25)],GRID);rect(d,(362,12,367,17),GREEN)
 glow(im,190,55,120,60,GOLD,.65)
 return im,ImageDraw.Draw(im)

def glass(d,x,y,w,h,color=None,level=.73,cap=False):
 # Equal liquid volume is preserved when concentration/fluorescence changes.
 floor=y+h-5;top=round(floor-(h-10)*level)
 poly(d,[(x+2,y+4),(x+w-2,y+4),(x+w-2,y+h-5),(x+w-7,y+h),(x+7,y+h),(x+2,y+h-5)],'#132534',EDGE)
 if color:
  rect(d,(x+4,top,x+w-4,floor),color);ellipse(d,(x+4,top-2,x+w-4,top+3),mix(color,WHITE,.18))
  line(d,[(x+5,floor),(x+w-5,floor)],mix(color,WHITE,.2))
 line(d,[(x+3,y+7),(x+3,y+h-8)],MUTED);line(d,[(x+6,y+10),(x+6,y+h-12)],'#6c9ca9');line(d,[(x+w-4,y+9),(x+w-4,y+h-10)],'#2e5262')
 ellipse(d,(x,y-2,x+w,y+5),PANEL,CYAN)
 if cap:
  rect(d,(x-2,y-7,x+w+2,y+2),'#151a25',MUTED)
  for xx in range(x+1,x+w,4):line(d,[(xx,y-5),(xx,y)],EDGE)
 ellipse(d,(x-6,y+h+3,x+w+6,y+h+8),'#060d17')
def bottle(d,x,y):
 pts=[(x+20,y),(x+40,y),(x+40,y+22),(x+54,y+39),(x+58,y+107),(x+51,y+116),(x+9,y+116),(x+2,y+107),(x+6,y+39),(x+20,y+22)]
 poly(d,pts,'#1a3743',MUTED);line(d,[(x+11,y+42),(x+9,y+102)],'#70999e',2);line(d,[(x+47,y+42),(x+51,y+104)],'#2c5361',2)
 rect(d,(x+6,y+61,x+54,y+89),GOLD);text(d,x+12,y+66,'TONIC',INK);text(d,x+11,y+77,'QUININE',INK,True)
 rect(d,(x+18,y-4,x+42,y+4),EDGE);line(d,[(x+20,y-3),(x+39,y-3)],WHITE)
 ellipse(d,(x,y+118,x+61,y+123),INK)
def beam(d,start,end,t,col=GOLD,width=1):
 line(d,[start,end],mix(col,INK,.65),width)
 for j in range(5):
  u=(t*2+j/5)%1;dot(d,start[0]+u*(end[0]-start[0]),start[1]+u*(end[1]-start[1]),col,1)

# One animation per experience. No body-figure assets are overwritten.
def tonic(t):
 im,d=room('QUININE / A GLOW THAT TELLS A STORY','SALT ADDED / FLUORESCENCE FADES',t)
 bottle(d,53,60);tube=(244,63,46,108);glass(d,*tube,color='#182c3d',level=.73)
 # Three distinct spoonfuls; each has a hold, pour and subsequent drop in glow.
 q=np.clip((t-.14)/.22,0,3);stage=min(2,int(q));local=q-stage
 intensity=[1,.52,.18,.012][min(3,int(q))]
 if q<3 and local>.45:intensity=(1-(local-.45)/.55)*intensity+((local-.45)/.55)*[.52,.18,.012][stage]
 glow(im,267,125,57,68,BLUE,intensity*4);d=ImageDraw.Draw(im)
 liquid=mix('#172b3b','#4c9cf0',float(intensity)*.9)
 glass(d,*tube,color=liquid,level=.73)
 for j in range(16):
  if intensity>.07:
   px=249+(j*11)%36;py=80+(j*17+int(t*45))%78
   if j/18<intensity:dot(d,px,py,mix(BLUE,WHITE,.3),1)
 hardware(d,(151,126,184,151));text(d,157,133,'UV',BLUE)
 beam(d,(184,135),(244,135),t,'#7c87cf')
 if .14<t<.82:
  tilt=max(0,math.sin(local*math.pi));sx=267;sy=46-round(3*math.sin(local*math.pi))
  ellipse(d,(sx-10,sy-4,sx+10,sy+4),'#b1bec8',WHITE);line(d,[(sx+8,sy),(sx+42,sy-12+tilt*13)],MUTED,4);line(d,[(sx+10,sy-1),(sx+41,sy-13+tilt*13)],WHITE)
  if local<.55:ellipse(d,(sx-6,sy-4,sx+5,sy),WHITE)
  if .23<local<.8:
   for j in range(8):
    u=(local*2+j*.11)%1;dot(d,sx-5+(j*7)%11,sy+6+u*39,WHITE,1)
 for j in range(3):rect(d,(220+j*17,175,229+j*17,177),GOLD if q>j+.5 else GRID)
 return im

def nmr(t):
 im,d=room('MOLECULAR MOTION / WATCH THE PEAKS','WARMER SAMPLE / FASTER EXCHANGE',t)
 screen(d,(88,54,338,164));rect(d,(166,171,249,177),PANEL,EDGE)
 heat=min(1,max(0,(t-.08)/.75));k=3*(100**heat);freq=np.linspace(-125,125,251);r=math.pi*3;delta=math.pi*73.4;w=2*math.pi*freq
 a=r+k+1j*(w-delta);b=r+k+1j*(w+delta);z=np.real((a+b+2*k)/(2*(a*b-k*k)));z/=z.max()
 pts=[(100+i*226/250,151-v*75) for i,v in enumerate(z)]
 line(d,pts,mix(CYAN,INK,.7),3);line(d,pts,CYAN);line(d,[(101,153),(326,153)],EDGE)
 for x in range(112,325,30):line(d,[(x,153),(x,156)],MUTED)
 text(d,99,59,'NMR',MUTED,True)
 ellipse(d,(49,151,67,169),PANEL,EDGE);rect(d,(55,61,61,158),PANEL,MUTED);fill=round(150-heat*78);rect(d,(57,fill,59,159),CORAL);ellipse(d,(52,154,64,166),CORAL)
 for y in range(70,147,12):line(d,[(65,y),(70,y)],EDGE)
 glow(im,58,161,23,24,CORAL,heat)
 return im

def leaf(d,cx,cy,phase):
 sx=1+.035*math.sin(phase);sy=1+.04*math.sin(phase+1);cy+=2*math.sin(phase)
 pts=[(0,35),(-17,25),(-29,9),(-34,-7),(-24,-23),(-6,-36),(13,-33),(29,-19),(32,1),(20,20),(0,35)]
 poly(d,[(cx+x*sx,cy+y*sy) for x,y in pts],'#3c7358',GREEN)
 poly(d,[(cx,cy+30),(cx-5,cy-30),(cx+23,cy-16),(cx+25,cy+2)],'#5b9971')
 line(d,[(cx-4,cy+48),(cx+1,cy-29)],'#a4c68b',2)
 for sign in [-1,1]:
  for j in range(3):line(d,[(cx,cy+19-j*15),(cx+sign*(19+j*3),cy+8-j*15)],'#7eb184')
def spinach(t):
 im,d=room('SPINACH / FOLLOW THE LIGHT','MORE PIGMENT / LESS PENETRATION',t)
 leaf(d,94,106,t*math.tau)
 # A small packed column in the back recalls the actual celite/sugar separation.
 rect(d,(160,63,172,148),DEEP,EDGE)
 for j in range(34):dot(d,163+(j*3)%7,73+(j*11)%59,'#b8c4a9' if j%2 else '#789b8d',0)
 line(d,[(166,148),(166,162)],CYAN)
 c=min(1,max(0,(t-.08)/.76));col=mix('#78ba89','#183d33',c);glass(d,239,63,79,107,col,.8)
 for y in [109,113,117]:
  for x in range(204,359):
   depth=min(70,max(0,x-244));atten=math.exp(-(0.008+c*.13)*depth);line(d,[(x,y),(x+1,y)],mix(INK,GOLD,atten*.85))
 for j in range(8):
  u=(t*2+j/8)%1;distance=u*68;strength=math.exp(-(0.008+c*.13)*distance)
  if strength>.17:dot(d,244+distance,113,mix(INK,GOLD,strength),1)
 text(d,239,49,'CHLOROPHYLL',GREEN,True)
 return im

def ftir(t):
 stage=min(2,int(t*3));im,d=room('FTIR / A SAMPLE BECOMES TRANSPARENT','GRIND  >  PRESS  >  TRANSMIT',t)
 # Mortar/pestle with cubic KBr fragments and grinding powder.
 ellipse(d,(38,135,116,157),'#263c4c',MUTED);poly(d,[(40,141),(49,166),(102,166),(115,141)],'#294252',EDGE);ellipse(d,(42,134,112,148),'#0e1c2a',MUTED)
 for j in range(17):
  x=53+(j*17)%45;y=139+(j*7)%8;size=2 if stage==0 and t<.14 else 1;rect(d,(x,y,x+size,y+size),WHITE if j%3 else GOLD)
 phase=t*math.tau*6;xx=76+5*math.sin(phase) if stage==0 else 76
 line(d,[(xx,141),(xx+18,99)],'#9bb0b9',9);line(d,[(xx-2,139),(xx+15,99)],WHITE,2);text(d,49,174,'KBr',CYAN,True)
 # Machined mini-press, bolt, socket and a moving wrench.
 hardware(d,(158,127,214,165));ellipse(d,(165,121,207,132),'#6a8291',WHITE);rect(d,(174,92,199,127),'#4c6778',MUTED)
 for y in range(98,124,4):line(d,[(175,y),(198,y)],DEEP)
 ellipse(d,(174,85,200,96),'#7994a2',WHITE)
 ang=-.75+(math.sin(t*math.tau*3)*.35 if stage==1 else 0);end=(187+55*math.cos(ang),91+55*math.sin(ang));line(d,[(187,91),end],MUTED,6);line(d,[(187,90),(end[0],end[1]-1)],WHITE,2);ellipse(d,(181,85,193,97),EDGE,WHITE)
 # Thin pressed disc in a holder, IR beam selectively attenuated.
 hardware(d,(285,145,324,169));ellipse(d,(288,91,321,146),'#1b3645',MUTED);ellipse(d,(292,96,317,140),mix('#9cbab3',DEEP,.7 if stage<2 else .35),CYAN)
 for j,col in enumerate([GOLD,CYAN,CORAL]):
  yy=110+j*7;beam(d,(248,yy),(291,yy),t,col)
  if stage==2:beam(d,(318,yy),(360,yy),t,mix(col,INK,.7 if j==1 else .12))
 for j,x in enumerate([77,188,305]):dot(d,x,53,GOLD if stage==j else GRID,2);text(d,x-3,59,str(j+1),GOLD if stage==j else MUTED,True)
 return im

def dyes(t):
 im,d=room('FIVE DYES / ONE SHARED SPECTRUM','BUILD THE COLORS / FOLLOW THEIR SUM',t);screen(d,(57,48,340,173))
 x=np.linspace(0,1,250)
 # Stylized stacked decomposition inspired by the author's supplied figure.
 ys=[.30*np.exp(-((x-.68)/.135)**2)+.035*np.exp(-x*9),.43*np.exp(-((x-.59)/.16)**2)+.04*np.exp(-((x-.19)/.2)**2),.24*np.exp(-((x-.2)/.20)**2),.16*np.exp(-x*3)+.035*np.exp(-((x-.3)/.09)**2),.22*np.exp(-((x-.49)/.12)**2)]
 ys=np.array(ys);ys/=np.max(ys.sum(axis=0));visible=min(5,int(t*7));colors=['#747cae','#72aa87','#cfad6e','#c47d7b','#ad8fba'];base=np.zeros_like(x)
 for j in range(visible):
  top=base+ys[j];pts=[(64+u*267,162-z*100) for u,z in zip(x,top)]+[(64+u*267,162-z*100) for u,z in zip(x[::-1],base[::-1])];poly(d,pts,colors[j]);line(d,[(64+u*267,162-z*100) for u,z in zip(x,top)],mix(colors[j],WHITE,.25));base=top
 if visible==5:
  line(d,[(64+u*267,162-z*100) for u,z in zip(x,base)],GOLD,2)
  for j in range(0,len(x),13):dot(d,64+x[j]*267,162-base[j]*100,WHITE,0)
 for j,col in enumerate(colors):rect(d,(67+j*15,54,75+j*15,56),col if j<visible else GRID)
 text(d,260,54,'SUM',GOLD,True)
 return im

def tof(t):
 im,d=room('TIME OF FLIGHT / LIGHT STARTS THE CLOCK','SAME PUSH / DIFFERENT ARRIVAL TIMES',t)
 hardware(d,(43,94,339,152));rect(d,(59,101,319,145),INK,EDGE)
 for xx in [83,99]:rect(d,(xx,100,xx+2,146),MUTED)
 for xx in [119,137]:line(d,[(xx,101),(xx,145)],GRID)
 hardware(d,(321,78,347,167));rect(d,(325,98,330,147),CYAN)
 hardware(d,(72,44,109,66));text(d,75,48,'LASER',CORAL,True)
 u=t*2%1;launch=max(0,(u-.12)/.67)
 if .03<u<.13:
  line(d,[(90,67),(90,126)],CORAL,3);glow(im,90,124,30,24,CORAL,3);d=ImageDraw.Draw(im)
 for j,(mass,col) in enumerate(zip([1,2,4],[CYAN,GOLD,PINK])):
  distance=launch*400/math.sqrt(mass);x=90+distance;yy=110+j*14
  if u>.12 and x<323:
   line(d,[(max(92,x-12),yy),(x,yy)],mix(col,INK,.5),2);sphere(d,x,yy,3+j,col)
  if x>=323:rect(d,(337,105+j*15,341,110+j*15),col)
 return im

def reactions(t):
 im,d=room('REACTION CLOCKS / WATCH THE YELLOW','THREE CONDITIONS / THREE RATES',t)
 hardware(d,(50,162,339,178))
 for j,(x,finish) in enumerate(zip([83,177,271],[.32,.57,.83])):
  fraction=max(0,1-max(0,t-.06)/finish);color=mix('#162d3e','#d3b04e',fraction)
  glow(im,x+16,125,34,45,GOLD,fraction*.8);d=ImageDraw.Draw(im);glass(d,x,71,34,86,color,.76,True)
  theta=t*math.tau*(5-j);line(d,[(x+17-6*math.cos(theta),149-2*math.sin(theta)),(x+17+6*math.cos(theta),149+2*math.sin(theta))],WHITE,2)
  text(d,x+12,55,str(j+1),GOLD,True);ellipse(d,(x+7,167,x+25,174),GRID,MUTED);dot(d,x+16,170,GREEN,1)
 return im

def thermometer(d,x,level):
 rect(d,(x,69,x+7,155),DEEP,MUTED);ellipse(d,(x-4,148,x+11,164),PANEL,MUTED);rect(d,(x+2,150-level*70,x+5,156),CORAL);ellipse(d,(x-1,151,x+8,161),CORAL)
 for yy in range(77,146,11):line(d,[(x+9,yy),(x+12,yy)],EDGE)
def combustion(t):
 im,d=room('TWO ROUTES / TWO TEMPERATURE RISES','ILLUSTRATIVE COMBUSTION COMPARISON',t)
 rise=min(1,max(0,(t-.22)/.45))
 for j,cx in enumerate([109,274]):
  ellipse(d,(cx-49,166,cx+47,176),INK);hardware(d,(cx-43,88,cx+40,165));ellipse(d,(cx-43,78,cx+40,98),'#3b5969',MUTED);ellipse(d,(cx-39,80,cx+35,92),PANEL,EDGE)
  rect(d,(cx-31,104,cx+28,152),'#102331',EDGE);ellipse(d,(cx-22,111,cx+20,151),'#283b47',MUTED)
  line(d,[(cx-6,70),(cx-6,110),(cx+5,117)],GOLD);line(d,[(cx+8,72),(cx+8,108)],MUTED)
  if j:line(d,[(cx-11,132),(cx+10,132)],WHITE,3)
  for center,col,sign in [(cx-11,CYAN,-1),(cx+10,GOLD,1)]:
   for ox,oy in [(sign*6,-8),(sign*6,7)]:
    line(d,[(center,132),(center+ox,132+oy)],MUTED,2);sphere(d,center+ox,132+oy,2,WHITE)
   sphere(d,center,132,5,col)
  if .2<t<.63:
   heat=math.sin((t-.2)/.43*math.pi);glow(im,cx,132,26,28,GOLD,heat*2);d=ImageDraw.Draw(im)
   for k in range(4):
    yy=130-(t*52+k*7)%21;poly(d,[(cx-5+k*4,yy+7),(cx-3+k*4,yy-2),(cx+k*4,yy+7)],GOLD if k%2 else CORAL)
  thermometer(d,cx+49,rise*(.82 if j==0 else .47));text(d,cx-39,52,'SEPARATE' if j==0 else 'CONNECTED',CYAN,True)
 return im

def methane(t):
 im,d=room('CH4 / A MOLECULE NEVER HOLDS STILL','STRETCH / ASYMMETRIC STRETCH / BEND',t)
 vectors=np.array([[1,1,1],[-1,-1,1],[-1,1,-1],[1,-1,-1]],float)/math.sqrt(3)
 angle=.45;rot=np.array([[math.cos(angle),0,math.sin(angle)],[0,1,0],[-math.sin(angle),0,math.cos(angle)]])
 for mode,cx in enumerate([76,192,308]):
  phase=t*math.tau*3;v=vectors.copy()
  if mode==0:v*=1+.16*math.sin(phase)
  elif mode==1:v*=np.array([1+.25*math.sin(phase)]+[1-.0833*math.sin(phase)]*3)[:,None]
  else:
   for j in range(4):
    a=.22*math.sin(phase)*(1 if j%2 else -1);xx,yy,zz=v[j];v[j]=[xx*math.cos(a)-yy*math.sin(a),xx*math.sin(a)+yy*math.cos(a),zz]
  v=v@rot.T;points=[(cx+p[0]*35,111+p[1]*35,p[2]) for p in v]
  for x,y,z in sorted(points,key=lambda p:p[2]):line(d,[(cx,111),(x,y)],EDGE,5);line(d,[(cx-1,110),(x-1,y-1)],MUTED,2)
  sphere(d,cx,111,10,CYAN)
  for x,y,z in sorted(points,key=lambda p:p[2]):sphere(d,x,y,6,WHITE if z>0 else '#7999ab')
  text(d,cx-18,160,['SYMM.','ASYMM.','BEND'][mode],GOLD,True)
 return im

def interferogram(t):
 im,d=room('AN EMPTY CELL / A HIDDEN ECHO','CENTERBURST > GHOST > DISTANCE',t)
 screen(d,(57,47,340,173));x=np.linspace(-1,1,550)
 signal=np.cos(110*x)*np.exp(-(x/.06)**2)+.18*np.cos(110*(x-.6))*np.exp(-((x-.6)/.06)**2)+.18*np.cos(110*(x+.6))*np.exp(-((x+.6)/.06)**2)
 zoom=t>.36;by=84 if zoom else 112;scale=25 if zoom else 42
 line(d,[(65,by),(332,by)],EDGE)
 line(d,[(65+(u+1)*133,by-z*scale) for u,z in zip(x,signal)],CYAN)
 origin=198;ghost=278
 if t>.17:
  extent=min(1,(t-.17)/.18);line(d,[(origin,by+29),(origin+(ghost-origin)*extent,by+29)],GOLD);line(d,[(origin,by+25),(origin,by+33)],GOLD);line(d,[(ghost,by+25),(ghost,by+33)],GOLD);text(d,222,by+16,'dx',GOLD,True)
 if zoom:
  rect(d,(266,69,291,98),None,GOLD);line(d,[(266,99),(77,123)],GRID);line(d,[(291,99),(323,123)],GRID)
  zz=np.linspace(.43,.77,250);yy=np.cos(110*(zz-.6))*np.exp(-((zz-.6)/.06)**2)
  line(d,[(69,149),(332,149)],EDGE);line(d,[(69+(u-.43)/.34*263,149-v*20) for u,v in zip(zz,yy)],CYAN)
  text(d,271,126,'GHOST',GOLD,True)
 return im

def cv(t):
 im,d=room('CYCLIC VOLTAMMETRY / THE DUCK PLOT','SWEEP FORWARD / SWEEP BACK',t);screen(d,(61,47,339,173))
 u=np.linspace(0,1,200);v=np.r_[u,u[::-1]];cur=np.r_[.95*np.exp(-((u-.64)/.115)**2),-.72*np.exp(-((u[::-1]-.38)/.12)**2)]
 # The growing trace follows a complete forward/reverse potential cycle.
 end=min(len(v),max(2,int(t/.82*len(v))));points=[(75+a*249,111-b*42) for a,b in zip(v,cur)]
 line(d,[(74,111),(326,111)],EDGE);line(d,[(75,61),(75,160)],EDGE)
 if end>2:line(d,points[:end],mix(CYAN,INK,.65),3);line(d,points[:end],CYAN)
 x,y=points[end-1];dot(d,x,y,GOLD,2);text(d,321,114,'E',MUTED,True);text(d,65,53,'I',MUTED,True)
 for j,col in enumerate([CYAN,GOLD,GREEN]):line(d,[(44+j*4,114),(44+j*4,153)],col)
 return im

def gc(t):
 im,d=room('CHROMATOGRAPHY / A TRACE ON PAPER','PAPER FEEDS / THE NEEDLE FOLLOWS',t)
 hardware(d,(49,45,340,178));rect(d,(67,58,320,173),INK,EDGE)
 # Paper moves upward through a fixed writing row. Time increases down the strip.
 rect(d,(104,58,299,172),'#bcc9bf');line(d,[(111,60),(111,172)],'#7c9b95')
 for j in range(9):
  yy=59+(j*16-t*112)%112;line(d,[(105,yy),(298,yy)],'#9db0a6')
 for xx in range(132,295,27):line(d,[(xx,59),(xx,171)],'#a6b8ae')
 xx=np.linspace(0,t,300);s=.04+sum(a*np.exp(-((xx-mu)/sig)**2) for a,mu,sig in [(.74,.15,.025),(.94,.39,.04),(.58,.62,.035),(.45,.82,.04)])
 for i in range(1,len(xx)):
  col=[BLUE,GREEN,GOLD,CORAL][min(3,int(xx[i]*4))];line(d,[(132+s[i-1]*130,169-(t-xx[i-1])*108),(132+s[i]*130,169-(t-xx[i])*108)],col,2)
 needle=132+float(s[-1])*130;line(d,[(75,168),(309,168)],EDGE,3);rect(d,(needle-5,161,needle+5,170),'#3a5362',WHITE);dot(d,needle,169,'#c47e63',1)
 for yy in [54,175]:rect(d,(99,yy,305,yy+3),'#486171');line(d,[(102,yy),(300,yy)],MUTED)
 for j in range(5):rect(d,(77,70+j*17,89,73+j*17),GOLD if j==int(t*5)%5 else GRID)
 text(d,308,140,'t',MUTED,True);line(d,[(313,151),(313,163)],MUTED);poly(d,[(310,160),(316,160),(313,165)],MUTED)
 return im

def tea(t):
 im,d=room('WHEN AN ESTIMATE SLIPS BELOW ZERO','SIMILAR SIGNALS / A SENSITIVE ANSWER',t)
 # A ceramic tea cup beside a spectral display.
 ellipse(d,(39,164,118,175),PANEL,EDGE);ellipse(d,(102,125,124,148),None,GOLD,3);poly(d,[(47,123),(53,159),(98,159),(106,123)],'#64564d',GOLD);ellipse(d,(47,118,106,129),'#a88560',GOLD);ellipse(d,(51,121,102,127),'#3c302b');line(d,[(81,124),(88,144)],WHITE);rect(d,(83,142,94,153),GOLD)
 for j in range(3):
  pts=[(67+j*9+2*math.sin(z*.3+t*math.tau),112-z) for z in range(24)];line(d,pts,GRID)
 screen(d,(148,54,337,165));x=np.linspace(0,1,140);wave=math.sin(t*math.tau)
 a=np.exp(-((x-(.46+.025*wave))/.15)**2);b=.93*np.exp(-((x-(.5-.025*wave))/.15)**2)
 line(d,[(155+u*174,113-v*42) for u,v in zip(x,a)],CYAN);line(d,[(155+u*174,113-v*42) for u,v in zip(x,b)],GOLD)
 line(d,[(157,141),(328,141)],MUTED);text(d,151,135,'0',MUTED,True)
 residual=(a-b)*23;line(d,[(157+u*168,141-z) for u,z in zip(x,residual)],CORAL,2)
 dot(d,292,141+wave*13,PINK,2);text(d,306,147 if wave>0 else 122,'-' if wave>0 else '+',CORAL,True)
 return im

def trefoil(d,cx,cy,r=19):
 ellipse(d,(cx-r-3,cy-r-3,cx+r+3,cy+r+3),GOLD)
 for angle in [-90,30,150]:d.pieslice((cx-r,cy-r,cx+r,cy+r),angle-30,angle+30,fill=INK)
 ellipse(d,(cx-8,cy-8,cx+8,cy+8),GOLD);ellipse(d,(cx-4,cy-4,cx+4,cy+4),INK)
def radiation(t):
 im,d=room('NUCLEAR CHEMISTRY / COUNT THE CLICKS','A SAMPLE / A DETECTOR / RANDOM EVENTS',t)
 trefoil(d,82,75,19);screen(d,(43,113,139,161))
 for j in range(24):
  x=48+j*3;phase=(t*4+j*.139)%1;y=153-(18 if (j*7)%9<2 else 4)*math.exp(-phase*9);line(d,[(x,154),(x,y)],CYAN)
 hardware(d,(327,39,342,177));rect(d,(213,39,335,48),EDGE);line(d,[(215,40),(334,40)],MUTED)
 # Large cylindrical detector hangs above a source plate.
 rect(d,(193,60,268,123),'#344e62');ellipse(d,(193,51,268,69),'#5d7d91',MUTED);ellipse(d,(193,115,268,132),'#1f3448',MUTED);ellipse(d,(201,119,261,129),DEEP,EDGE)
 line(d,[(199,70),(199,113)],'#6a8b9b',3);line(d,[(264,69),(264,115)],'#1d3548',3)
 ellipse(d,(194,164,270,177),'#365060',MUTED);ellipse(d,(201,162,263,171),PANEL,EDGE);ellipse(d,(218,157,245,165),GOLD)
 for j in range(7):
  u=(t*2+j*.173)%1;x=232+(j%3-1)*u*24;y=158-u*31
  dot(d,x,y,CYAN if j%2 else GOLD,1)
  if u>.91:line(d,[(x-3,127),(x+3,127)],WHITE)
 return im

def unknowns(t):
 im,d=room('FOUR UNKNOWNS / FOUR SMALL MYSTERIES','LOOK CLOSELY / CHOOSE YOUR NEXT QUESTION',t)
 hardware(d,(43,158,343,177))
 for j,x in enumerate([66,141,216,291]):
  glass(d,x,71,29,85,['#243b47','#192e3d','#425d69','#19436a'][j],.65,True)
  text(d,x+9,52,f'0{j+1}',GOLD,True)
  if j==0:
   for k in range(27):dot(d,x+6+(k*7)%18,146-(k*11)%23,WHITE if k%3 else MUTED,1)
  elif j==1:
   pts=[(x+8+2*math.sin(z*.2+t*math.tau),93+z) for z in range(49)];line(d,pts,'#abb9b5',5);line(d,[(px-1,py) for px,py in pts],WHITE)
  elif j==2:
   yy=112+2*math.sin(t*math.tau);rect(d,(x+5,yy,x+24,150),mix('#587b7d',GOLD,.3));line(d,[(x+5,yy),(x+24,yy)],GOLD)
  else:
   glow(im,x+14,128,26,42,BLUE,1+.4*math.sin(t*math.tau));d=ImageDraw.Draw(im)
   line(d,[(x+8,91),(x+8,144)],BLUE,2)
  rect(d,(x+3,163,x+26,167),GRID);dot(d,x+15,165,GREEN,1)
 return im

SCENES={
 'tonic-water-fluorescence':tonic,'two-peaks-become-one':nmr,'spinach-fluorescence':spinach,
 'beyond-the-library-match':ftir,'five-dyes-one-spectrum':dyes,'ions-in-flight':tof,
 'a-reaction-in-fading-color':reactions,'heat-by-a-different-route':combustion,
 'isotopes-in-the-infrared':methane,'the-empty-cell-spectrum':interferogram,
 'sweeping-the-voltage':cv,'a-mixture-over-one-hundred-percent':gc,
 'tea-and-an-unexpected-answer':tea,'a-half-life-in-noisy-counts':radiation,'four-unknowns':unknowns,
}
STILL_PHASES={'tonic-water-fluorescence':.23,'two-peaks-become-one':.48,'spinach-fluorescence':.4,'beyond-the-library-match':.78,'five-dyes-one-spectrum':.85,'ions-in-flight':.28,'a-reaction-in-fading-color':.32,'heat-by-a-different-route':.6,'isotopes-in-the-infrared':.21,'the-empty-cell-spectrum':.75,'sweeping-the-voltage':.85,'a-mixture-over-one-hundred-percent':.95,'tea-and-an-unexpected-answer':.22,'a-half-life-in-noisy-counts':.24,'four-unknowns':.23}

def main():
 OUT.mkdir(parents=True,exist_ok=True);SOURCE.mkdir(parents=True,exist_ok=True);manifest={};sheet=Image.new('RGB',(W*3,H*5),INK)
 for j,(slug,recipe) in enumerate(SCENES.items()):
  raw=[recipe(i/N) for i in range(N)]
  palette_sheet=Image.new('RGB',(384,216*12),INK)
  for k,i in enumerate(range(0,N,10)):palette_sheet.paste(raw[i],(0,k*216))
  palette=palette_sheet.quantize(colors=96,dither=Image.Dither.NONE)
  frames=[im.resize((W*2,H*2),Image.Resampling.NEAREST).quantize(palette=palette,dither=Image.Dither.NONE) for im in raw]
  name=f'{slug}-preview';frames[0].save(OUT/f'{name}.gif',save_all=True,append_images=frames[1:],duration=MS,loop=0,optimize=True,disposal=1)
  still=recipe(STILL_PHASES[slug]);still.resize((W*2,H*2),Image.Resampling.NEAREST).save(OUT/f'{name}.png',optimize=True)
  sheet.paste(still,(j%3*W,j//3*H))
  manifest[slug]={'gif':f'{name}.gif','still':f'{name}.png','logicalSize':[W,H],'size':[W*2,H*2],'frames':N,'durationMs':N*MS,'bytes':(OUT/f'{name}.gif').stat().st_size,'source':'original procedural illustration; not experimental data'}
  print(slug,flush=True)
 sheet.save(SOURCE/'animated-preview-contact-sheet.png')
 (OUT/'previews-manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
 print('Created fifteen animated previews and pause companions.',flush=True)
if __name__=='__main__':main()
