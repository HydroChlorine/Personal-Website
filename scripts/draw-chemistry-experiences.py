"""Original illustrations for fifteen short laboratory experiences.

Paired pixel/crisp frames share exact drawing commands. Only the explicitly
identified tonic-water and chlorophyll point plots reproduce printed report data;
other curves are pedagogical models, not recovered measurements.
"""
from pathlib import Path
import importlib.util,math,json,textwrap
import numpy as np
from PIL import Image,ImageDraw
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('paired',ROOT/'scripts/draw-math-topics.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
OUT=ROOT/'public/media/chemistry/experiences';SOURCE=ROOT/'assets/art-source/chemistry/experiences'
c.OUT=OUT;c.art.OUT=OUT
BG,PANEL,LINE,CYAN,AMBER,MINT,TEXT,MUTED,CORAL=c.BG,c.PANEL,c.LINE,c.CYAN,c.AMBER,c.MINT,c.TEXT,c.MUTED,c.CORAL
PINK='#d2a0c5';BLUE='#9aade1'
COLORS=[CYAN,AMBER,MINT,PINK,BLUE]

def line(d,points,col=CYAN,width=2):d.path(points,col,width)
def box(d,x,y,w,h,col=CYAN,fill=BG):d.rect(x,y,w,h,fill,col,2)
def text(d,x,y,s,col=TEXT,size=16,anchor='middle'):d.text(x,y,s,size,col,anchor)
def dot(d,x,y,col=AMBER,size=7):d.dot(x,y,col,size)
def poly(d,points,col):c.polygon(d,points,col)
def frame(m,title,sub,n=2):
 d=c.Drawing(450 if m else 900,1000 if m else 600)
 yy=34
 for row in textwrap.wrap(title,37 if m else 80):
  d.text(25,yy,row,14 if m else 18,CYAN);yy+=22
 for row in textwrap.wrap(sub,40 if m else 100):
  d.text(25,yy+7,row,12 if m else 13,MUTED);yy+=18
 top=max(100,yy+24)
 if m:
  h=(1000-top-35-12*(n-1))/n;bs=[(25,top+i*(h+12),400,h) for i in range(n)]
 else:
  w=(840-18*(n-1))/n;bs=[(30+i*(w+18),top,w,600-top-45) for i in range(n)]
 for x,y,w,h in bs:d.rect(x,y,w,h)
 return d,bs
def label(d,b,s):
 rows=textwrap.wrap(s,max(20,int((b[2]-28)/9.7)))
 for j,row in enumerate(rows):text(d,b[0]+14,b[1]+25+j*18,row,TEXT,15,'start')
def note(d,b,s,col=MUTED):
 rows=textwrap.wrap(s,max(22,int((b[2]-28)/9.7)))
 for j,row in enumerate(rows):text(d,b[0]+b[2]/2,b[1]+b[3]-18-(len(rows)-1-j)*18,row,col,12)
def plot(d,b,xlim,ylim,xlabel,ylabel):
 x,y,w,h=b;p=(x+48,y+78,x+w-20,y+h-110)
 for xx in np.linspace(p[0],p[2],5):line(d,[(xx,p[1]),(xx,p[3])],LINE,1)
 for yy in np.linspace(p[1],p[3],5):line(d,[(p[0],yy),(p[2],yy)],LINE,1)
 text(d,p[0],p[1]-13,ylabel,MUTED,11,'start')
 text(d,(p[0]+p[2])/2,p[3]+39,xlabel,MUTED,12)
 for val,xx in [(xlim[0],p[0]),(xlim[1],p[2])]:text(d,xx,p[3]+18,f'{val:g}',MUTED,11)
 for val,yy in [(ylim[0],p[3]),(ylim[1],p[1])]:text(d,p[0]-8,yy+4,f'{val:g}',MUTED,10,'end')
 def xy(a,z):return (p[0]+(a-xlim[0])/(xlim[1]-xlim[0])*(p[2]-p[0]),p[3]-(z-ylim[0])/(ylim[1]-ylim[0])*(p[3]-p[1]))
 return xy,p

def curve(d,xy,x,y,col=CYAN,width=2):line(d,[xy(a,b) for a,b in zip(x,y)],col,width)
def cuvette(d,x,y,w=65,h=115,col=CYAN,level=.65,liquid=LINE):
 poly(d,[(x+4,y+h),(x+w-4,y+h),(x+w-4,y+h*(1-level)),(x+4,y+h*(1-level))],liquid)
 box(d,x,y,w,h,col);line(d,[(x+7,y+8),(x+7,y+h-8)],TEXT,1);line(d,[(x,y+h*(1-level)),(x+w,y+h*(1-level))],col,2)
def bottle(d,x,y,s=1):
 pts=[(x+20*s,y),(x+42*s,y),(x+42*s,y+22*s),(x+58*s,y+45*s),(x+61*s,y+126*s),(x+52*s,y+137*s),(x+10*s,y+137*s),(x+1*s,y+126*s),(x+4*s,y+45*s),(x+20*s,y+22*s)]
 poly(d,pts,LINE);line(d,pts+[pts[0]],MINT,2)
 d.rect(x+17*s,y-7*s,28*s,9*s,AMBER,AMBER);d.rect(x+5*s,y+65*s,52*s,35*s,AMBER,AMBER)
 text(d,x+31*s,y+85*s,'TONIC',BG,max(10,round(9*s)))
def beam(d,a,b,t,col=AMBER):
 line(d,[a,b],LINE,1)
 for k in range(5):u=(t+k/5)%1;dot(d,a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u,col,4)
def flask(d,x,y,w=100,h=130,col=MINT):
 pts=[(x+w*.38,y),(x+w*.62,y),(x+w*.62,y+h*.35),(x+w,y+h),(x,y+h),(x+w*.38,y+h*.35),(x+w*.38,y)]
 poly(d,pts,PANEL);line(d,pts,col,3);poly(d,[(x+9,y+h-5),(x+w-9,y+h-5),(x+w*.73,y+h*.66),(x+w*.27,y+h*.66)],LINE)
 line(d,[(x+w*.27,y+h*.66),(x+w*.73,y+h*.66)],col,2)
def tube(d,x,y,w=28,h=110,col=CYAN):
 box(d,x,y,w,h,col);d.rect(x-3,y-7,w+6,9,LINE,col);d.rect(x+4,y+h*.45,w-8,h*.5,LINE,LINE)
def molecule(d,x,y,r=22,col=CYAN,phase=0):
 for a in [phase,phase+2.1,phase+4.2]:
  ex=x+r*math.cos(a);ey=y+r*math.sin(a);line(d,[(x,y),(ex,ey)],col,3);dot(d,ex,ey,col,9)
 dot(d,x,y,TEXT,12)
def column(d,x,y,h=160):
 box(d,x,y,36,h,CYAN);d.rect(x+4,y+35,28,20,MINT,MINT);d.rect(x+4,y+80,28,15,AMBER,AMBER);d.rect(x+4,y+h-36,28,12,BLUE,BLUE)
 line(d,[(x+18,y+h),(x+18,y+h+20)],CYAN,2)
def gp(x,mu,sigma):return np.exp(-.5*((x-mu)/sigma)**2)

# First figure: physical observation. Second and third give complementary views.
def quench(m,t):
 d,bs=frame(m,'A GLOW HAS MORE THAN ONE CAUSE','Schematic excited-state pathways, not measured trajectories')
 for j,b in enumerate(bs):
  label(d,b,'An emitted photon' if j==0 else 'An encounter opens another path');x,y,w,h=b;cx=x+w/2;cy=y+h*.5
  molecule(d,cx,cy,30,CYAN,t*math.tau)
  line(d,[(cx-70,cy+70),(cx+70,cy+70)],LINE,2);line(d,[(cx-70,cy-65),(cx+70,cy-65)],CYAN,2)
  beam(d,(cx-100,cy+50),(cx,cy),t,AMBER)
  if j==0:beam(d,(cx,cy),(cx+110,cy-100),t,CYAN)
  else:
   qx=cx+90-45*math.sin(math.pi*t)**2;dot(d,qx,cy+15,AMBER,16);line(d,[(cx+20,cy),(qx,cy+15)],LINE,2)
   for k in range(3):line(d,[(cx+35+k*12,cy+55),(cx+40+k*12,cy+65)],AMBER,2)
  note(d,b,'brightness reflects concentration and surroundings')
 return d

def dilution(m,t):
 d,bs=frame(m,'DILUTION IS A TRADEOFF','Illustrative signals and noise; not measured blank replicates')
 for j,b in enumerate(bs):
  label(d,b,'Less quenching' if j==0 else 'Less signal above the background');x,y,w,h=b
  if j==0:
   for i,level in enumerate([.8,.5,.25]):
    xx=x+35+i*(w-90)/3;cuvette(d,xx,y+110,45,145,CYAN,.75)
    for k in range([10,5,2][i]):dot(d,xx+10+(k*13)%27,y+210+(k*11)%35,AMBER,4)
   beam(d,(x+20,y+h-90),(x+w-20,y+h-90),t,CYAN)
  else:
   xx=np.linspace(0,1,130);xy,p=plot(d,b,(0,1),(0,1),'relative dilution','relative signal')
   curve(d,xy,xx,.12+.03*np.sin(91*xx),MUTED)
   curve(d,xy,xx,.12+.78*np.exp(-3*xx),CYAN)
   u=.05+.9*t;dot(d,*xy(u,.12+.78*np.exp(-3*u)),AMBER,8)
  note(d,b,'an illustration of the choice, not an optimum')
 return d

def gain(m,t):
 d,bs=frame(m,'TWO RANGES / ONE STOCK SOLUTION','Calibration inputs transcribed from report PDF page 36')
 for j,b in enumerate(bs):
  label(d,b,['1000-fold dilution','100-fold dilution'][j]);x,y,w,h=b
  cuvette(d,x+w/2-32,y+70,64,125,CYAN if j==0 else MINT)
  text(d,x+w/2,y+225,['0.25 ppm -> 500 fsu','2.5 ppm -> 500 fsu'][j],TEXT,15)
  text(d,x+w/2,y+260,['2000 fsu / ppm','200 fsu / ppm'][j],CYAN,17)
  beam(d,(x+25,y+h-90),(x+w-25,y+h-90),t,CYAN)
  note(d,b,'sensitivity / dilution = 2 in both runs')
 return d

TONIC_X=[0,10,20,30,40];TONIC_Y=[137.1,74.4,61.5,52.4,48.9];TONIC_LOW=[127.4,48.5]
CHL_C=np.array([.909,1.25,1.67,2.5,3.33,5,6.67,7.5]);CHL_F=np.array([168,222,275,366,418,484,500,502])
def tonic_points(m,t):
 d,bs=frame(m,'THE RECORDED SALT-ADDITION SERIES','Printed report measurements; no fitted correction curve is claimed',1)
 b=bs[0];label(d,b,'Same displayed units, different calibration ranges')
 xx=np.array(TONIC_X)*6.14/(5000+np.array(TONIC_X));xy,p=plot(d,b,(0,.05),(0,160),'added chloride / M','fluorescence / fsu')
 for j,(xs,ys,col) in enumerate([(xx,TONIC_Y,CYAN),(xx[:2],TONIC_LOW,AMBER)]):
  for i,(a,z) in enumerate(zip(xs,ys)):dot(d,*xy(a,z),TEXT if int(t*7)==i+5*j else col,9 if int(t*7)==i+5*j else 6)
 text(d,p[2]-5,p[1]+20,'cyan: 1000x',CYAN,12,'end');text(d,p[2]-5,p[1]+39,'gold: 100x',AMBER,12,'end')
 note(d,b,'points are readings; uncertainty needs its own model')
 return d

def exchange(m,t):
 d,bs=frame(m,'TWO ENVIRONMENTS / ONE MOVING MOLECULE','Schematic exchange; no bond is being broken in this drawing')
 for j,b in enumerate(bs):
  label(d,b,'Exchange can be slow' if j==0 else 'Exchange can be fast');x,y,w,h=b
  cx=x+w/2;cy=y+h*.5;phase=int(t*(2 if j==0 else 12))%2
  for k,col in enumerate([CYAN,AMBER]):
   xx=x+w*(.28+.44*k);box(d,xx-35,cy-35,70,70,col);text(d,xx,cy+65,['A','B'][k],col,16)
  u=(math.sin(t*math.tau*(1 if j==0 else 4))+1)/2;molecule(d,x+w*(.28+.44*u),cy,15,TEXT,phase)
  note(d,b,'the instrument observes on a finite timescale')
 return d

def nmr_shape(k):
 xx=np.linspace(-125,125,320);R=math.pi*3;delta=math.pi*73.4;w=2*math.pi*xx
 a=R+k+1j*(w-delta);b=R+k+1j*(w+delta)
 yy=np.real((a+b+2*k)/(2*(a*b-k*k)));return xx,yy/max(yy)
def nmr_lines(m,t):
 d,bs=frame(m,'WATCH THE LINE SHAPE CHANGE','Equal-population two-site model; not a digitized experimental spectrum')
 k=10**(math.log10(3)+(math.log10(500)-math.log10(3))*t)
 for j,b in enumerate(bs):
  rate=[4,k][j];label(d,b,'Slow-exchange reference' if j==0 else 'Increasing the exchange rate')
  x,z=nmr_shape(rate);xy,p=plot(d,b,(-125,125),(0,1.1),'frequency offset / Hz','normalized signal');curve(d,xy,x,z,CYAN if j==0 else AMBER)
  text(d,p[2],p[1]+18,f'k = {rate:.0f} / s',MUTED,12,'end');note(d,b,'illustrative model, fixed frequency separation')
 return d

def lineshapes(m,t):
 d,bs=frame(m,'A FIT ALSO MAKES ASSUMPTIONS','Illustrative equal-width peaks and their different tails')
 xx=np.linspace(-6,6,200);g=np.exp(-math.log(2)*xx**2);l=1/(1+xx**2)
 for j,b in enumerate(bs):
  label(d,b,'Similar near the center' if j==0 else 'Different away from the center');xy,p=plot(d,b,(-6,6),(0,1.1),'relative frequency','normalized signal')
  curve(d,xy,xx,g,CYAN);curve(d,xy,xx,l,AMBER);u=-5+10*t;dot(d,*xy(u,gp(np.array([u]),0,1/math.sqrt(2*math.log(2)))[0]),CYAN,7);dot(d,*xy(u,1/(1+u*u)),AMBER,7)
  note(d,b,'cyan: Gaussian / gold: Lorentzian')
 return d

def spinach(m,t):
 d,bs=frame(m,'FROM A LEAF TO A FRACTION','Illustrated extraction and separation, not a laboratory recording')
 for j,b in enumerate(bs):
  x,y,w,h=b;label(d,b,'Separate the pigments' if j==0 else 'Choose a fraction to investigate')
  if j==0:
   poly(d,[(x+40,y+180),(x+20,y+125),(x+55,y+95),(x+105,y+125),(x+40,y+180)],MINT)
   line(d,[(x+40,y+180),(x+62,y+116)],LINE,2);column(d,x+w*.65,y+70,190)
   dot(d,x+w*.65+18,y+270+(t*35)%35,MINT,7)
  else:
   for k in range(4):tube(d,x+35+k*(w-85)/4,y+130,32,120,[AMBER,MINT,CYAN,MINT][k])
   beam(d,(x+20,y+h-90),(x+w-20,y+h-90),t,CORAL)
  note(d,b,'color is an invitation to measure, not a purity test')
 return d

def light_filter(m,t):
 d,bs=frame(m,'WHERE DOES THE LIGHT GO?','A schematic of optical sampling inside the cuvette')
 for j,b in enumerate(bs):
  label(d,b,'Light reaches farther' if j==0 else 'Light is absorbed near the entrance');x,y,w,h=b
  xx=x+w/2-65;yy=y+100;cuvette(d,xx,yy,130,190,CYAN)
  for k in range(8):
   u=(t+k/8)%1;distance=u*(120 if j==0 else 37);dot(d,xx+distance,yy+90,AMBER,5)
  for k in range(6):
   px=xx+20+(k*23)%(100 if j==0 else 30);py=yy+35+k*23;beam(d,(px,py),(px+30,py-25),t,CORAL)
  note(d,b,'illustrative dilute / concentrated comparison')
 return d

def chl_points(m,t):
 d,bs=frame(m,'MORE PIGMENT / LESS EXTRA SIGNAL','Eight readings transcribed from report PDF page 5',1)
 b=bs[0];label(d,b,'The fluorescence rises, then flattens')
 xy,p=plot(d,b,(0,8),(0,550),'chlorophyll concentration / micromolar','relative fluorescence / fsu')
 for i,(x,z) in enumerate(zip(CHL_C,CHL_F)):dot(d,*xy(x,z),AMBER if int(t*8)==i else CYAN,9 if int(t*8)==i else 6)
 note(d,b,'a plateau is an observation; its cause needs investigation')
 return d

def library(m,t):
 d,bs=frame(m,'SIMILARITY IS A CLUE','Illustrative traces; no proprietary library spectrum is reproduced')
 xx=np.linspace(0,1,180);a=.6*gp(xx,.3,.035)+.8*gp(xx,.68,.06)+.35*gp(xx,.82,.03);b=.55*gp(xx,.31,.035)+.7*gp(xx,.67,.06)+.65*gp(xx,.9,.025)
 for j,bb in enumerate(bs):
  label(d,bb,'A known sample' if j==0 else 'A suggestion to check');xy,p=plot(d,bb,(0,1),(0,1.1),'relative spectral position','illustrative absorbance');curve(d,xy,xx,a,CYAN)
  if j:curve(d,xy,xx,b,AMBER)
  u=.05+.9*t;dot(d,*xy(u,float(np.interp(u,xx,a))),TEXT,7)
  note(d,bb,'matching some features does not establish identity')
 return d

def tablet(m,t):
 d,bs=frame(m,'WHAT DOES THE STRONGEST SIGNAL BELONG TO?','A schematic formulated sample, not a composition measurement')
 for j,b in enumerate(bs):
  label(d,b,'One tablet, several ingredients' if j==0 else 'A smaller contribution can be hidden');x,y,w,h=b
  if j==0:
   box(d,x+w/2-90,y+120,180,90,MUTED,PANEL)
   for k in range(38):dot(d,x+w/2-75+(k*31)%150,y+135+(k*17)%60,CYAN if k%9 else AMBER,5)
  else:
   xx=np.linspace(0,1,180);xy,p=plot(d,b,(0,1),(0,1.2),'relative spectral position','illustrative signal');big=gp(xx,.45,.1);small=.12*gp(xx,.55,.07)
   curve(d,xy,xx,big,CYAN);curve(d,xy,xx,small,AMBER);curve(d,xy,xx,big+small,TEXT);u=.2+.6*t;dot(d,*xy(u,float(np.interp(u,xx,big+small))),TEXT,7)
  note(d,b,'a dominant excipient can dominate a spectral match')
 return d

def sampling(m,t):
 d,bs=frame(m,'THE SAMPLE CHANGES HOW WE LOOK','Schematic transmission and surface-sensitive sampling')
 for j,b in enumerate(bs):
  label(d,b,'Through a prepared sample' if j==0 else 'At a contacted surface');x,y,w,h=b;cy=y+h*.5
  if j==0:box(d,x+w/2-12,cy-70,24,140,CYAN);beam(d,(x+20,cy),(x+w-20,cy),t)
  else:
   poly(d,[(x+25,cy+70),(x+w-25,cy+70),(x+w*.75,cy),(x+w*.25,cy)],LINE);line(d,[(x+w*.25,cy),(x+w*.75,cy)],MINT,5)
   pts=[(x+25,cy+50),(x+w*.38,cy+5),(x+w*.65,cy+50)];line(d,pts,AMBER,2);dot(d,x+w*.38,cy-12+6*math.sin(t*math.tau),CYAN,6)
  note(d,b,'choose a sampling method that suits the material')
 return d

def dye_data():
 xx=np.linspace(380,720,230);ys=np.array([gp(xx,620,27),gp(xx,590,34),gp(xx,465,25),gp(xx,430,30),gp(xx,550,24)]);weights=np.array([.24,.24,.17,.2,.09]);return xx,ys,weights

def dyes(m,t):
 d,bs=frame(m,'FIVE CONTRIBUTIONS / ONE SPECTRUM','Synthetic basis spectra explain addition, not bottle composition')
 xx,ys,weights=dye_data()
 for j,b in enumerate(bs):
  label(d,b,'The separate contributions' if j==0 else 'Build their combined signal');xy,p=plot(d,b,(380,720),(0,.65),'wavelength / nm','illustrative absorbance')
  for i in range(5):
   if not j or i<int(t*5)+1:curve(d,xy,xx,ys[i]*weights[i],COLORS[i],1)
  total=np.sum(ys*weights[:,None],axis=0) if not j else np.sum((ys*weights[:,None])[:int(t*5)+1],axis=0)
  if j:curve(d,xy,xx,total,TEXT,3)
  note(d,b,'each reference supplies a different piece of the shape')
 return d

def invisible(m,t):
 d,bs=frame(m,'WHEN A COMPONENT BECOMES HARD TO SEE','Synthetic visible spectra; the pH changes the useful signal')
 xx,ys,weights=dye_data()
 for j,b in enumerate(bs):
  label(d,b,'A visible reference' if j==0 else 'A nearly colorless reference');xy,p=plot(d,b,(380,720),(0,.4),'wavelength / nm','illustrative absorbance')
  scale=1 if j==0 else .015
  curve(d,xy,xx,ys[4]*.28*scale,PINK,3);curve(d,xy,xx,ys[1]*.24,CYAN)
  dot(d,*xy(550,.28*scale),TEXT,7+round(t*3));note(d,b,'a weak column carries little concentration information')
 return d

def residuals(m,t):
 d,bs=frame(m,'A GOOD TOTAL FIT CAN HIDE A TRADEOFF','Two similar reference shapes can exchange contributions')
 xx=np.linspace(0,1,170);a=gp(xx,.48,.12);b=gp(xx,.51,.12);w=.25+.5*t;total=w*a+(1-w)*b
 for j,bb in enumerate(bs):
  label(d,bb,'Contributions trade places' if j==0 else 'The total changes much less');xy,p=plot(d,bb,(0,1),(0,1.1),'relative spectral position','illustrative signal')
  if j==0:curve(d,xy,xx,w*a,CYAN);curve(d,xy,xx,(1-w)*b,AMBER)
  else:curve(d,xy,xx,.5*a+.5*b,MUTED);curve(d,xy,xx,total,TEXT)
  note(d,bb,'spectral agreement and independent certainty differ')
 return d

def flight(m,t):
 d,bs=frame(m,'MASS BECOMES ARRIVAL TIME','Ideal equal-charge ions accelerated through the same voltage')
 for j,b in enumerate(bs):
  label(d,b,'An ion packet travels' if j==0 else 'Separate by arrival time');x,y,w,h=b
  if j==0:
   box(d,x+20,y+130,w-40,100,LINE);line(d,[(x+w-30,y+120),(x+w-30,y+240)],CYAN,3)
   for k,mass in enumerate([28,53,68]):dot(d,x+30+(w-65)*min(1,t*1.8/math.sqrt(mass/28)),y+155+25*k,COLORS[k],11)
  else:
   xx=np.linspace(0,1,220);xy,p=plot(d,b,(0,1),(0,1.1),'relative flight time','illustrative signal')
   for k,mu in enumerate([.36,.57,.72]):curve(d,xy,xx,gp(xx,mu,.016),COLORS[k]);dot(d,*xy(mu,.95),COLORS[k],5 if t<mu else 8)
  note(d,b,'lighter ions arrive sooner under these assumptions')
 return d

def focusing(m,t):
 d,bs=frame(m,'TUNE THE SOURCE / SHARPEN THE PACKET','Illustrative spatial focusing, not a measured resolving power')
 for j,b in enumerate(bs):
  label(d,b,'A spread of starting positions' if j==0 else 'Timing spread can be reduced');x,y,w,h=b
  for k,col in enumerate([CYAN,AMBER,MINT]):
   yy=y+120+k*65;line(d,[(x+25,yy),(x+w-25,y+220)],LINE,1)
   u=t;dy=(yy+(y+220-yy)*u) if j else yy
   dot(d,x+25+(w-50)*u,dy,col,8)
  note(d,b,'schematic; electric fields and geometry matter')
 return d

def threshold(m,t):
 d,bs=frame(m,'TUNING LIGHT / WATCHING IONS APPEAR','A qualitative threshold illustration, not the measured PIE curve')
 for j,b in enumerate(bs):
  label(d,b,'Change the photon energy' if j==0 else 'Watch a signal emerge');x,y,w,h=b
  if j==0:
   molecule(d,x+w/2,y+190,32,CYAN);beam(d,(x+20,y+100),(x+w/2,y+190),t,AMBER)
   if t>.45:dot(d,x+w/2+100*(t-.45),y+180-100*(t-.45),TEXT,6)
  else:
   xx=np.linspace(0,1,180);z=np.maximum(0,xx-.45)*1.6;xy,p=plot(d,b,(0,1),(0,1),'relative photon energy','illustrative ion yield');curve(d,xy,xx,z,CYAN);dot(d,*xy(t,max(0,t-.45)*1.6),AMBER,9)
  note(d,b,'an apparent threshold still needs calibration')
 return d

def isosbestic(m,t):
 d,bs=frame(m,'A WAVELENGTH THAT SIMPLIFIES THE QUESTION','Synthetic two-species spectra with a shared crossing')
 xx=np.linspace(380,500,200);a=gp(xx,420,27);b=gp(xx,460,27)
 for j,bb in enumerate(bs):
  label(d,bb,'The proportions change' if j==0 else 'The crossing tracks the sum');xy,p=plot(d,bb,(380,500),(0,1.1),'wavelength / nm','illustrative absorbance')
  for u in [0,.25,.5,.75,1]:curve(d,xy,xx,u*a+(1-u)*b,LINE,1)
  curve(d,xy,xx,t*a+(1-t)*b,CYAN);dot(d,*xy(440,float(gp(np.array([440]),420,27)[0])),AMBER,9)
  note(d,bb,'same total, different proportions: one shared value')
 return d

def reaction_time(m,t):
 d,bs=frame(m,'WATCH THE COLOR FADE','A schematic zero-order trace under excess ketone and acid')
 for j,b in enumerate(bs):
  label(d,b,'An optical clock' if j==0 else 'A straight segment can reveal a rate');x,y,w,h=b
  if j==0:
   rgb=lambda h:tuple(int(h[k:k+2],16) for k in (1,3,5))
   color='#'+''.join(f'{round(a*(1-t)+z*t):02x}' for a,z in zip(rgb(AMBER),rgb(LINE)))
   cuvette(d,x+w/2-35,y+100,70,190,AMBER,.8,liquid=color);beam(d,(x+20,y+210),(x+w-20,y+210),t,AMBER)
  else:
   xx=np.linspace(0,1,130);xy,p=plot(d,b,(0,1),(0,1),'relative time','illustrative absorbance');curve(d,xy,xx,1-.85*xx,CYAN);dot(d,*xy(t,1-.85*t),AMBER,8)
  note(d,b,'illustration; concentration changes probe the rate law')
 return d

def isotope_rate(m,t):
 d,bs=frame(m,'CHANGE H TO D / CHANGE THE CLOCK','Illustrative traces, motivated by the reported isotope comparison')
 for j,b in enumerate(bs):
  label(d,b,'A slower step leaves a clue' if j==0 else 'Several observations support a mechanism');xy,p=plot(d,b,(0,1),(0,1),'relative time','remaining signal')
  xx=np.linspace(0,1,150);curve(d,xy,xx,np.maximum(.04,1-1.5*xx),CYAN);curve(d,xy,xx,1-.19*xx,AMBER)
  dot(d,*xy(t,max(.04,1-1.5*t)),CYAN,8);dot(d,*xy(t,1-.19*t),AMBER,8)
  note(d,b,'cyan: H / gold: D; not a raw kinetic dataset')
 return d

def hess(m,t):
 d,bs=frame(m,'TWO ROUTES TO THE SAME PRODUCTS','An energy-cycle illustration, not the reported heat values')
 for j,b in enumerate(bs):
  label(d,b,'Compare the two combustion routes' if j==0 else 'Infer the connecting step');x,y,w,h=b
  a=(x+35,y+100);z=(x+w-35,y+100);bottom=(x+w/2,y+h-90)
  line(d,[a,bottom,z],LINE,2)
  text(d,a[0]+20,a[1]-20,'monomer',CYAN,13,'start');text(d,z[0]-20,z[1]-20,'polymer',AMBER,13,'end');text(d,bottom[0],bottom[1]+30,'common products',MUTED,13)
  if j:beam(d,a,z,t,MINT)
  else:beam(d,a,bottom,t,CYAN);beam(d,z,bottom,t,AMBER)
  note(d,b,'the reaction direction determines the sign')
 return d

def calorimeter(m,t):
 d,bs=frame(m,'THE TEMPERATURE TRACE IS PART OF THE MEASUREMENT','Synthetic drift and a temperature rise for illustration')
 xx=np.linspace(0,1,220);z=.1+.12*xx+.65/(1+np.exp(-60*(xx-.38)))
 for j,b in enumerate(bs):
  label(d,b,'A rise on a drifting baseline' if j==0 else 'Compare extrapolated baselines');xy,p=plot(d,b,(0,1),(0,1),'relative time','relative temperature');curve(d,xy,xx,z,CYAN)
  if j:curve(d,xy,xx,.1+.12*xx,AMBER,1);curve(d,xy,xx,.75+.12*xx,AMBER,1)
  dot(d,*xy(t,float(np.interp(t,xx,z))),TEXT,8);note(d,b,'the small corrections belong to the measurement')
 return d

def difference(m,t):
 d,bs=frame(m,'A SMALL DIFFERENCE BETWEEN LARGE MEASUREMENTS','An illustrative uncertainty comparison, not a numerical result')
 for j,b in enumerate(bs):
  label(d,b,'The desired difference is small' if j==0 else 'Shared calibration moves both');x,y,w,h=b
  offset=10*math.sin(t*math.tau) if j else 0
  for k,(height,col) in enumerate([(180,CYAN),(165,AMBER)]):
   xx=x+50+k*(w-135)/2;d.rect(xx,y+h-80-height-offset,55,height+offset,col,col)
  line(d,[(x+30,y+h-80),(x+w-30,y+h-80)],LINE,2);note(d,b,'common errors need covariance, not duplication')
 return d

def isotopes(m,t):
 d,bs=frame(m,'SAME ELEMENTS / DIFFERENT MASSES','Harmonic reduced-mass illustration for HCl and DCl')
 for j,b in enumerate(bs):
  label(d,b,'A lighter oscillator' if j==0 else 'A heavier oscillator');x,y,w,h=b;cx=x+w/2;cy=y+180;u=math.sin(t*math.tau*(3 if j==0 else 2))
  a=cx-60-15*u;z=cx+60+15*u;line(d,[(a,cy),(z,cy)],LINE,4);dot(d,a,cy,CYAN if j==0 else AMBER,15 if j==0 else 22);dot(d,z,cy,MINT,32)
  text(d,a,cy+50,'H' if j==0 else 'D',TEXT,17);text(d,z,cy+50,'Cl',TEXT,17);note(d,b,'greater reduced mass lowers the ideal frequency')
 return d

def rotational(m,t):
 d,bs=frame(m,'WARMER MOLECULES POPULATE HIGHER LEVELS','Illustrative rigid-rotor populations, B = 10 inverse cm')
 J=np.arange(31)
 for j,b in enumerate(bs):
  T=120 if j==0 else 120+680*t;pop=(2*J+1)*np.exp(-1.438776877*10*J*(J+1)/T);pop/=pop.max()
  label(d,b,f'T = {T:.0f} K');xy,p=plot(d,b,(0,30),(0,1.1),'rotational level J','relative population')
  for a,z in zip(J,pop):line(d,[xy(a,0),xy(a,z)],CYAN if j==0 else AMBER,2)
  note(d,b,'a simulation, not a measured spectrum')
 return d

def line_assign(m,t):
 d,bs=frame(m,'PATTERNS BECOME ASSIGNMENTS','A schematic line comb and a matching level diagram')
 for j,b in enumerate(bs):
  label(d,b,'Find a regular sequence' if j==0 else 'Relate a line to a transition');x,y,w,h=b
  if j==0:
   for k in range(12):xx=x+30+k*(w-60)/11;line(d,[(xx,y+h-95),(xx,y+130+(k%4)*20)],AMBER if k==int(t*12) else CYAN,2)
  else:
   for k in range(5):line(d,[(x+40,y+h-85-k*55),(x+w-40,y+h-85-k*55)],LINE,2)
   k=int(t*4);d.arrow((x+w*.4,y+h-85-k*55),(x+w*.6,y+h-85-(k+1)*55),AMBER)
  note(d,b,'assignments connect observed lines with a model')
 return d

def empty_cell(m,t):
 d,bs=frame(m,'AN EMPTY CELL CAN STILL CHANGE THE LIGHT','Schematic reflections between two parallel surfaces')
 for j,b in enumerate(bs):
  label(d,b,'More than one optical path' if j==0 else 'Paths can reinforce or cancel');x,y,w,h=b
  for k in range(2):box(d,x+w*(.3+.4*k),y+80,8,h-150,CYAN)
  pts=[(x+20,y+130),(x+w*.7,y+130),(x+w*.3,y+220),(x+w*.7,y+280)]
  line(d,pts,AMBER,2);k=int(t*3);u=t*3%1;a,z=pts[k],pts[k+1];dot(d,a[0]+(z[0]-a[0])*u,a[1]+(z[1]-a[1])*u,TEXT,8)
  note(d,b,'the cell itself is part of the optical experiment')
 return d

def fringes(m,t):
 d,bs=frame(m,'COUNT THE FRINGES / INFER AN OPTICAL THICKNESS','Illustrative interference; optical path is not mirror travel')
 xx=np.linspace(0,1,250)
 for j,b in enumerate(bs):
  label(d,b,'Look across a spectral interval' if j==0 else 'More optical thickness, closer fringes');n=5 if j==0 else 5+4*t;z=.5+.3*np.cos(2*math.pi*n*xx);xy,p=plot(d,b,(0,1),(0,1),'relative wavenumber','illustrative signal');curve(d,xy,xx,z,CYAN);dot(d,*xy(t,.5+.3*math.cos(2*math.pi*n*t)),AMBER,7)
  note(d,b,'a counting idea, not a reproduced path-length result')
 return d

def nulling(m,t):
 d,bs=frame(m,'LET THE RESIDUAL GUIDE THE NEXT MIXTURE','Synthetic component spectra and successive trial mixtures')
 xx=np.linspace(0,1,210);bases=np.array([gp(xx,.2,.035),gp(xx,.4,.05),gp(xx,.65,.04),gp(xx,.84,.03)]);truth=np.array([.2,.2,.4,.2]);guess=truth+(.3*(1-t))*np.array([-.3,.6,-.1,-.2]);target=truth@bases;trial=guess@bases
 for j,b in enumerate(bs):
  label(d,b,'Bring the two shapes together' if j==0 else 'The difference shows what is left');xy,p=plot(d,b,(0,1),(-.2,.6) if j else (0,.6),'relative spectral position','illustrative absorbance')
  if not j:curve(d,xy,xx,target,MUTED);curve(d,xy,xx,trial,CYAN)
  else:curve(d,xy,xx,trial-target,AMBER);curve(d,xy,xx,np.zeros_like(xx),LINE,1)
  note(d,b,'shrinking residuals are a guide, not proof of accuracy')
 return d

def voltage(m,t):
 d,bs=frame(m,'SWEEP OUT / SWEEP BACK','A schematic voltammogram, not a measured potential scale')
 u=np.linspace(0,1,160);v=np.r_[u,u[::-1]];i=np.r_[gp(u,.65,.09)*.9,-gp(u[::-1],.4,.09)*.72]
 for j,b in enumerate(bs):
  label(d,b,'An electrode in solution' if j==0 else 'Follow the direction of the scan');x,y,w,h=b
  if not j:
   cuvette(d,x+w/2-75,y+100,150,200,CYAN)
   for k in range(3):line(d,[(x+w/2-45+k*45,y+65),(x+w/2-45+k*45,y+210)],COLORS[k],5)
   beam(d,(x+w/2,y+85),(x+w/2,y+200),t,AMBER)
  else:
   xy,p=plot(d,b,(0,1),(-1,1),'relative potential','relative current');curve(d,xy,v,i,CYAN);k=min(len(v)-1,int(t*len(v)));dot(d,*xy(v[k],i[k]),AMBER,9)
  note(d,b,'the return response adds information')
 return d

def scan_rate(m,t):
 d,bs=frame(m,'CHANGE THE SWEEP / WATCH THE RESPONSE','Illustrative diffusion scaling, not fitted kinetic parameters')
 xx=np.linspace(0,1,180)
 for j,b in enumerate(bs):
  label(d,b,'A changing current peak' if j==0 else 'Current can scale with square-root speed');xy,p=plot(d,b,(0,1),(0,1.2),'relative potential' if j==0 else 'relative scan rate','relative current')
  if j==0:
   for k,v in enumerate([.2,.5,1.]):curve(d,xy,xx,math.sqrt(v)*gp(xx,.6,.08),COLORS[k])
  else:curve(d,xy,xx,np.sqrt(xx),CYAN);dot(d,*xy(t,math.sqrt(t)),AMBER,8)
  note(d,b,'conditions and electrode behavior still matter')
 return d

def ph_cv(m,t):
 d,bs=frame(m,'THE SOLUTION IS PART OF THE REACTION','Schematic pH-dependent forward and return responses')
 xx=np.linspace(0,1,160)
 for j,b in enumerate(bs):
  label(d,b,'A forward oxidation signal' if j==0 else 'What returns can change');xy,p=plot(d,b,(0,1),(-1,1),'relative potential','relative current')
  curve(d,xy,xx,gp(xx,.6,.09)*.8,CYAN);curve(d,xy,xx,-gp(xx,.37,.09)*(.1 if j==0 else .15+.65*t),AMBER)
  note(d,b,'illustration, not a diagnosis from one peak')
 return d

def gc_peaks(m,t):
 d,bs=frame(m,'A MIXTURE BECOMES A CHROMATOGRAM','Synthetic peaks show why nearby components are difficult')
 xx=np.linspace(0,1,230)
 for j,b in enumerate(bs):
  label(d,b,'Signals can overlap' if j==0 else 'Conditions change the separation');xy,p=plot(d,b,(0,1),(0,1.6),'relative retention time','relative detector signal')
  gap=.05 if not j else .05+.13*t;z=gp(xx,.45-gap,.04)+.8*gp(xx,.45+gap,.05)
  curve(d,xy,xx,z,CYAN);note(d,b,'a simplified separation, not a measured chromatogram')
 return d

def mass_balance(m,t):
 d,bs=frame(m,'THE TOTAL IS A CHEMICAL CHECK','Reported component percentages; not a revised composition')
 vals=[26.10,61.92,25.91]
 for j,b in enumerate(bs):
  label(d,b,'The reported estimates add up' if j==0 else 'A physical total asks a question');x,y,w,h=b;xx=x+50;yy=y+h-95;scale=(h-140)/130
  for k,v in enumerate(vals):d.rect(xx,yy-v*scale,90,v*scale,COLORS[k],COLORS[k]);yy-=v*scale
  target=y+h-95-100*scale;line(d,[(x+30,target),(x+w-25,target)],AMBER,2);text(d,x+w-25,target-10,'100%',AMBER,13,'end')
  dot(d,x+160,y+h-95-min(sum(vals),130)*scale+t*20,AMBER,6);note(d,b,'26.10 + 61.92 + 25.91 = 113.93%')
 return d

def ratio(m,t):
 d,bs=frame(m,'NORMALIZATION CAN HELP / ASSUMPTIONS STILL MATTER','Illustrative common injection variation, not a diagnosis of the lab data')
 for j,b in enumerate(bs):
  label(d,b,'Two peaks share an injection' if j==0 else 'A common scale can cancel');x,y,w,h=b;u=.6+.35*math.sin(t*math.tau)
  for k,(v,col) in enumerate([(1,CYAN),(.6,AMBER)]):d.rect(x+45+k*(w-120)/2,y+h-80-v*u*220,55,v*u*220,col,col)
  text(d,x+w/2,y+70,'A / B = constant',TEXT,16) if j else None
  note(d,b,'common dilution alone does not invalidate a ratio')
 return d

def tea(m,t):
 d,bs=frame(m,'TWO ABSORBERS SHARE A MEASUREMENT','Synthetic overlapping signals illustrate the tea analysis')
 xx=np.linspace(240,300,200);a=gp(xx,273,11);b=.8*gp(xx,272,10)
 for j,bb in enumerate(bs):
  label(d,bb,'Similar spectra overlap' if j==0 else 'One total hides two contributions');xy,p=plot(d,bb,(240,300),(0,1.8),'wavelength / nm','illustrative absorbance')
  curve(d,xy,xx,a,CYAN);curve(d,xy,xx,b,AMBER)
  if j:curve(d,xy,xx,a+b,TEXT,3)
  u=240+60*t;dot(d,*xy(u,float(np.interp(u,xx,a+b if j else a))),TEXT,7);note(d,bb,'the useful question is how to separate information')
 return d

def extraction(m,t):
 d,bs=frame(m,'EXTRACTION CHANGES THE CONTRIBUTIONS','A schematic phase transfer, not a recorded extraction')
 for j,b in enumerate(bs):
  label(d,b,'Before separation' if j==0 else 'Different retention supplies another view');x,y,w,h=b;cuvette(d,x+w/2-70,y+85,140,220,CYAN)
  for k in range(25):
   xx=x+w/2-55+(k*19)%110;yy=y+220+(k*13)%60
   if j:yy-=t*100*(.5 if k%2 else .8)
   dot(d,xx,yy,CYAN if k%2 else AMBER,6)
  line(d,[(x+w/2-68,y+210),(x+w/2+68,y+210)],MINT,2);note(d,b,'report aqueous fractions: about 0.58 and 0.68')
 return d

def negative(m,t):
 d,bs=frame(m,'A NEGATIVE ESTIMATE IS A CLUE','Synthetic uncertainty clouds, not reported concentrations')
 for j,b in enumerate(bs):
  label(d,b,'Similar responses amplify noise' if j==0 else 'Inspect the measurement and model');xy,p=plot(d,b,(-1,1),(0,1),'relative inferred concentration','illustrative uncertainty')
  xx=np.linspace(-1,1,180);curve(d,xy,xx,gp(xx,-.08+.1*math.sin(t*math.tau),.32),CYAN);line(d,[xy(0,0),xy(0,1)],AMBER,2);note(d,b,'an estimate below zero is not negative material')
 return d

def counts(m,t):
 d,bs=frame(m,'RANDOM CLICKS / A REPEATABLE DISTRIBUTION','Poisson model distributions, not detector measurements')
 for j,b in enumerate(bs):
  mean=[2,25][j];kk=np.arange(0,9 if j==0 else 47);prob=np.array([math.exp(-mean+k*math.log(mean)-math.lgamma(k+1)) for k in kk]);label(d,b,'Low expected count' if j==0 else 'Higher expected count');xy,p=plot(d,b,(0,9 if j==0 else 47),(0,.3 if j==0 else .09),'counts in one interval','model probability')
  for k,v in zip(kk,prob):line(d,[xy(k,0),xy(k,v)],AMBER if k==kk[int(t*len(kk))] else CYAN,4)
  note(d,b,'individual counts vary; their statistics have structure')
 return d

def decay(m,t):
 d,bs=frame(m,'A DECAY PATTERN EMERGES ABOVE BACKGROUND','Synthetic half-life illustration; the shared class dataset is not reproduced')
 xx=np.linspace(0,5,180);signal=2**(-xx)
 for j,b in enumerate(bs):
  label(d,b,'A fading signal' if j==0 else 'The background remains');xy,p=plot(d,b,(0,5),(0,1.2),'time / half-lives','relative count rate');curve(d,xy,xx,signal+(0 if not j else .1),CYAN)
  if j:curve(d,xy,xx,np.full_like(xx,.1),AMBER,1)
  u=t*5;dot(d,*xy(u,2**(-u)+(0 if not j else .1)),TEXT,8);note(d,b,'late counts need a background-aware interpretation')
 return d

def decay_window(m,t):
 d,bs=frame(m,'CHOOSE A WINDOW WITH A REASON','An illustrative transient followed by exponential behavior')
 xx=np.linspace(0,1,200);z=(1-np.exp(-40*xx))*np.exp(-4*xx)+.04
 for j,b in enumerate(bs):
  label(d,b,'The start can contain a transient' if j==0 else 'Inspect the region being fitted');xy,p=plot(d,b,(0,1),(0,1),'relative time','relative counts');curve(d,xy,xx,z,CYAN)
  start=.08+.15*t if j else .08;line(d,[xy(start,0),xy(start,1)],AMBER,2);note(d,b,'selection is an analytical choice, not a hidden step')
 return d

def unknowns(m,t):
 d,bs=frame(m,'FOUR UNKNOWNS / DIFFERENT KINDS OF EVIDENCE','A schematic of the final practical, not identification results')
 for j,b in enumerate(bs):
  label(d,b,'What kind of question?' if j==0 else 'Choose an appropriate measurement');x,y,w,h=b
  for k in range(4):
   cx=x+w*(.3+.4*(k%2));cy=y+100+(k//2)*130;tube(d,cx-15,cy,30,65,COLORS[k]);text(d,cx,cy+88,['powder','film','colored','glowing'][k],MUTED,12)
   if k==int(t*4):box(d,cx-42,cy-15,84,116,AMBER)
  note(d,b,'different samples need different evidence')
 return d

def wavelengths(m,t):
 d,bs=frame(m,'MORE WAVELENGTHS / A BETTER CHECK','Synthetic spectra; nearby wavelengths are not independent experiments')
 xx=np.linspace(400,700,200);z=gp(xx,495,45)
 for j,b in enumerate(bs):
  label(d,b,'Look beyond a single point' if j==0 else 'Check agreement across the shape');xy,p=plot(d,b,(400,700),(0,1.1),'wavelength / nm','illustrative absorbance');curve(d,xy,xx,z,CYAN)
  for k in range(8):u=450+k*15;dot(d,*xy(u,float(np.interp(u,xx,z))),AMBER if k==int(t*8) else MINT,6)
  note(d,b,'agreement helps; shared calibration still matters')
 return d

def calibration(m,t):
 d,bs=frame(m,'CALIBRATIONS CAN DISAGREE','Illustrative curves, not reconstructed unknown concentrations')
 xx=np.linspace(0,1,180)
 for j,b in enumerate(bs):
  label(d,b,'A different response range' if j==0 else 'Investigate before averaging');xy,p=plot(d,b,(0,1),(0,1.1),'relative concentration','relative signal');curve(d,xy,xx,.9*xx,CYAN);curve(d,xy,xx,.15+.65*xx,AMBER)
  z=.3+.4*t;line(d,[xy(0,z),xy(1,z)],LINE,1);dot(d,*xy(z/.9,z),CYAN,7);dot(d,*xy((z-.15)/.65,z),AMBER,7)
  note(d,b,'small fit errors do not exclude a common bias')
 return d

RECIPES={
 'tonic-quenching':quench,'tonic-dilution':dilution,'tonic-calibration':gain,'tonic-readings':tonic_points,
 'nmr-exchange':exchange,'nmr-coalescence':nmr_lines,'nmr-lineshapes':lineshapes,
 'spinach-separation':spinach,'chlorophyll-light':light_filter,'chlorophyll-readings':chl_points,
 'library-clues':library,'tablet-contributions':tablet,'ftir-sampling':sampling,
 'dye-mixture':dyes,'dye-visibility':invisible,'dye-tradeoffs':residuals,
 'ion-flight':flight,'ion-focusing':focusing,'ion-threshold':threshold,
 'reaction-crossing':isosbestic,'reaction-clock':reaction_time,'reaction-isotopes':isotope_rate,
 'heat-cycle':hess,'heat-trace':calorimeter,'heat-difference':difference,
 'ir-isotopes':isotopes,'ir-populations':rotational,'ir-assignments':line_assign,
 'empty-cell-paths':empty_cell,'empty-cell-fringes':fringes,'mixture-residual':nulling,
 'cv-sweep':voltage,'cv-speed':scan_rate,'cv-solution':ph_cv,
 'gc-separation':gc_peaks,'gc-total':mass_balance,'gc-ratios':ratio,
 'tea-overlap':tea,'tea-extraction':extraction,'tea-estimates':negative,
 'count-distributions':counts,'count-decay':decay,'count-window':decay_window,
 'unknown-samples':unknowns,'unknown-wavelengths':wavelengths,'unknown-calibration':calibration,
}
STUDIES=['tonic-water-fluorescence','two-peaks-become-one','spinach-fluorescence','beyond-the-library-match','five-dyes-one-spectrum','ions-in-flight','a-reaction-in-fading-color','heat-by-a-different-route','isotopes-in-the-infrared','the-empty-cell-spectrum','sweeping-the-voltage','a-mixture-over-one-hundred-percent','tea-and-an-unexpected-answer','a-half-life-in-noisy-counts','four-unknowns']
def study(i):
 d=c.Drawing(384,216)
 for k in range(26):dot(d,12+(k*73)%360,10+(k*37)%165,LINE,2)
 line(d,[(18,190),(366,190)],LINE,3);box(d,10,8,364,196,LINE)
 if i==0:bottle(d,60,45,1);cuvette(d,232,65,58,110,CYAN);beam(d,(130,110),(231,110),.72,AMBER)
 elif i==1:
  tube(d,66,50,22,125,CYAN)
  for k in range(2):line(d,[(154+k*45,160),(154+k*45,75)],CYAN,4)
  d.arrow((225,115),(269,115),AMBER);line(d,[(305,160),(305,85)],AMBER,5)
 elif i==2:
  poly(d,[(65,150),(35,95),(72,50),(123,84),(65,150)],MINT);column(d,180,32,124);cuvette(d,280,95,35,75,CORAL)
 elif i==3:
  box(d,47,55,100,110,CYAN);text(d,97,100,'FTIR',CYAN,17);text(d,97,134,'?',AMBER,23)
  molecule(d,268,110,43,MINT,.3);line(d,[(170,110),(210,110)],AMBER,2)
 elif i==4:
  for k,col in enumerate(COLORS):tube(d,45+k*65,55,27,105,col)
 elif i==5:
  box(d,37,77,305,65,LINE)
  for k,col in enumerate(COLORS[:3]):dot(d,115+k*66,95+k*13,col,9)
  line(d,[(325,60),(325,162)],CYAN,4)
 elif i==6:
  for k in range(3):cuvette(d,50+k*105,62,52,110,AMBER,.8-k*.25)
 elif i==7:
  box(d,125,65,125,105,CYAN);tube(d,182,20,8,120,AMBER);molecule(d,68,85,25,MINT);molecule(d,310,130,25,CORAL)
 elif i==8:
  for j in range(2):
   yy=70+j*80;line(d,[(70,yy),(168,yy)],MUTED,3);dot(d,70,yy,CYAN if j==0 else AMBER,15+j*6);dot(d,168,yy,MINT,27)
   for k in range(8):line(d,[(232+k*14,yy+20),(232+k*14,yy-10-(k%3)*7)],CYAN if j==0 else AMBER,2)
 elif i==9:
  for k in range(2):box(d,125+k*110,45,13,125,CYAN)
  beam(d,(40,90),(240,90),.72,AMBER);line(d,[(240,90),(138,135),(240,160)],AMBER,2)
 elif i==10:
  cuvette(d,70,74,90,100,CYAN)
  for k in range(3):line(d,[(88+k*28,40),(88+k*28,136)],COLORS[k],4)
  xx=np.linspace(210,340,90);z=110-50*gp(xx,285,12)+35*gp(xx,250,12);line(d,list(zip(xx,z)),CYAN,2)
 elif i==11:
  for k,mu in enumerate([95,185,220,290]):
   xx=np.linspace(35,345,150);line(d,list(zip(xx,165-100*gp(xx,mu,12))),COLORS[k],2)
 elif i==12:
  flask(d,45,60,90,110,MINT);cuvette(d,235,45,65,130,CYAN);line(d,[(235,115),(300,115)],AMBER,3)
 elif i==13:
  box(d,45,55,75,110,CYAN)
  for k in range(20):dot(d,160+(k*47)%180,65+(k*23)%90,CYAN if k%4 else AMBER,3)
  xx=np.linspace(155,340,100);line(d,list(zip(xx,165-110*np.exp(-(xx-155)/65))),AMBER,2)
 else:
  for k in range(4):tube(d,55+k*80,55,35,115,COLORS[k])
 return d

def verify():
 assert len(RECIPES)==46 and len(STUDIES)==15
 assert 2000/1000==200/100
 assert abs(sum([26.10,61.92,25.91])-113.93)<1e-10
 assert len(CHL_C)==len(CHL_F)==8
 for k in [1,10,100,500]:
  x,z=nmr_shape(k);assert np.isfinite(z).all() and min(z)>=0
 assert np.argmax(nmr_shape(500)[1]) in [159,160]
 return {'originalConcepts':46,'studyPNGs':15,'tonicPointCount':7,'chlorophyllPointCount':8,'sourceType':'two transcribed point plots; all other animations illustrative'}

def make_studies():
 OUT.mkdir(parents=True,exist_ok=True);c.art.SCALE=.5
 for i,name in enumerate(STUDIES):study(i).raster().save(OUT/f'{name}-study.png',optimize=True)

if __name__=='__main__':
 make_studies();c.main(recipes=RECIPES,source_dir=SOURCE,checks=verify())
