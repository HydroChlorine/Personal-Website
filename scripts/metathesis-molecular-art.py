"""Original topology-led molecular art. Coordinates are illustrative, not computed trajectories.
Heavy atoms only; [2.2.2] cage paths and bond-exchange endpoints are checked below.
"""
import math,textwrap
import numpy as np
from PIL import ImageColor

def configure(base):
 globals().update({k:base[k] for k in ['c','BG','PANEL','LINE','CYAN','AMBER','MINT','TEXT','MUTED','CORAL','text','line','note','frame','fused_heterocycle']})

COL={'C':'#aebfc9','N':'#8598ec','O':'#e28e91','F':'#8dc5a5','Cl':'#9bcf9d','Br':'#c99070','S':'#e1c477','P':'#d4ad80','Ru':'#e4ba7d','H':'#e8edf0'}
RAD={'C':.16,'N':.17,'O':.17,'F':.15,'Cl':.21,'Br':.22,'S':.22,'P':.23,'Ru':.32,'H':.1}
class Mol:
 def __init__(self):self.a={};self.b={}
 def atom(self,k,p,e='C'):self.a[k]=(np.array(p,dtype=float),e);return k
 def bond(self,a,b,o=1):self.b[tuple(sorted((a,b)))]=o
 def remove(self,a,b):self.b.pop(tuple(sorted((a,b))),None)
 def move(self,keys,delta):
  for k in keys:
   p,e=self.a[k];self.a[k]=(p+np.array(delta),e)
 def copy(self):
  q=Mol();q.a={k:(p.copy(),e) for k,(p,e) in self.a.items()};q.b=self.b.copy();return q
 def check(self):
  for (a,b),o in self.b.items():assert a in self.a and b in self.a and a!=b and o in [1,2,3]
  for k,(p,e) in self.a.items():
   v=sum(o for edge,o in self.b.items() if k in edge)
   assert v <= {'C':4,'N':4,'O':2,'F':1,'Cl':1,'Br':1,'S':6,'P':5,'Ru':8,'H':1}[e],(k,e,v)

def cycle(q,prefix,center=(0,0,0),r=1,rotation=0,fluoro=False):
 keys=[];cx,cy,cz=center
 for i in range(6):
  a=rotation+i*math.tau/6;k=f'{prefix}{i}';keys.append(k)
  q.atom(k,(cx+r*math.cos(a),cy+r*math.sin(a),cz))
 for i in range(6):q.bond(keys[i],keys[(i+1)%6],2 if i%2==0 else 1)
 if fluoro:
  # Vertex 3 attaches to the iminium carbon; all other ring positions carry F.
  for i in [0,1,2,4,5]:
   p=q.a[keys[i]][0];u=(p-np.array(center))/r;f=f'{prefix}F{i}';q.atom(f,p+.55*u,'F');q.bond(keys[i],f)
 return keys

def cage(q,p='h',offset=(0,0,0),flat=False):
 # Three disjoint, two-atom bridges between carbon bridgeheads u and v.
 pts={'u':(-1,-.8,0),'v':(1,-.8,0),'na':(-.55,.30,0),'nb':(.55,.30,0),'a':(-.55,-1.8,.45),'b':(.55,-1.8,.45),'c':(-.55,-.95,-.9),'d':(.55,-.95,-.9)}
 if flat:pts.update({'c':(-.4,-1.15,0),'d':(.4,-.45,0)})
 for k,pt in pts.items():q.atom(p+k,np.array(pt)+np.array(offset),'N' if k in ['na','nb'] else 'C')
 for path in [['u','na','nb','v'],['u','a','b','v'],['u','c','d','v']]:
  for a,b in zip(path,path[1:]):q.bond(p+a,p+b)
 return p+'na',p+'nb'

def ellipse(d,x,y,r,color):
 d.svg.append(f'<circle cx="{x:.3f}" cy="{y:.3f}" r="{r:.3f}" fill="{color}"/>')
 s=c.art.SCALE;d.d.ellipse(tuple(round(v*s) for v in [x-r,y-r,x+r,y+r]),fill=color)
def mix(a,b,f):
 aa=ImageColor.getrgb(a);bb=ImageColor.getrgb(b);return '#'+''.join(f'{round(x+(y-x)*f):02x}' for x,y in zip(aa,bb))
def sphere(d,x,y,r,e):
 col=COL[e];ellipse(d,x,y,r+1,'#243340');ellipse(d,x,y,r,mix(col,'#172131',.35))
 for f in [.82,.60,.38]:ellipse(d,x-r*(1-f)*.33,y-r*(1-f)*.4,r*f,mix(col,'#f3f7fa',(1-f)*.65))
 ellipse(d,x-r*.32,y-r*.38,max(.7,r*.13),'#edf4f7')

def molecular(d,q,box,t=0,labels=None,flat=False,ghost=(),focus=(),scale=None,camera=None):
 """Depth-sorted, orthographic ball-and-stick, same commands in both resolutions."""
 x,y,w,h=box;theta=.38+.20*math.sin(t*math.tau);phi=.18 if flat else .35+.13*math.cos(t*math.tau)
 rot=np.array([[math.cos(theta),0,math.sin(theta)],[math.sin(phi)*math.sin(theta),math.cos(phi),-math.sin(phi)*math.cos(theta)],[-math.cos(phi)*math.sin(theta),math.sin(phi),math.cos(phi)*math.cos(theta)]])
 pp={k:rot@p for k,(p,e) in q.a.items()};v=np.array(list(pp.values()));lo=v[:,:2].min(axis=0);hi=v[:,:2].max(axis=0)
 s=min((w-30)/max(hi[0]-lo[0]+.6,.6),(h-24)/max(hi[1]-lo[1]+.6,.6)) if scale is None else scale
 center=(lo+hi)/2 if camera is None else (rot@np.array([camera[0],camera[1],0]))[:2];xy={k:np.array([x+w/2+(p[0]-center[0])*s,y+h/2+(p[1]-center[1])*s]) for k,p in pp.items()}
 def stick(a,b,o,col=None,dashed=False):
  A=xy[a];B=xy[b];dif=B-A;rr=max(.1,np.linalg.norm(dif));norm=np.array([-dif[1],dif[0]])/rr
  A=A+dif/rr*RAD[q.a[a][1]]*s*.83;B=B-dif/rr*RAD[q.a[b][1]]*s*.83
  thick=max(2,min(6,s*.10));base=col or '#536a7b'
  for j in range(o):
   off=(j-(o-1)/2)*max(3,s*.12)*norm
   d.path([A+off,B+off],base,thick,dashed=dashed)
   if not dashed:d.path([A+off+np.array([-.55,-.55]),B+off+np.array([-.55,-.55])],mix(base,'#cedce4',.35),max(1,thick*.32))
 events=[((pp[a][2]+pp[b][2])/2,0,(a,b,o)) for (a,b),o in q.b.items()]+[(p[2],1,k) for k,p in pp.items()]
 for z,kind,obj in sorted(events,key=lambda u:(u[0],u[1])):
  if kind==0:stick(*obj,col=CYAN if tuple(sorted(obj[:2])) in focus else None)
  else:
   e=q.a[obj][1];sphere(d,*xy[obj],max(3,RAD[e]*s),e)
 for a,b in ghost:stick(a,b,1,AMBER,True)
 for k,txt in (labels or {}).items():
  p=xy[k];text(d,p[0]+max(8,s*.22),p[1]-max(7,s*.19),txt,12,CYAN if txt=='+' else TEXT,'start')
 return xy

def key(d,x,y,metal=False):
 for i,e in enumerate(['C','N','O']+(['Ru'] if metal else [])):
  sphere(d,x+i*67,y,5 if e!='Ru' else 8,e);text(d,x+10+i*67,y+4,e,11,MUTED,'start')


def lerp(a,b,u):return np.array(a)*(1-u)+np.array(b)*u
def ease(u):return max(0,min(1,u))**2*(3-2*max(0,min(1,u)))

def metal_rcm(stage,u):
 q=Mol();initial={'M':(-3,0,0),'e':(-3,-1,0),'a':(-.8,-1,0),'b':(-.8,0,0),'t1':(-1.3,1,.3),'t2':(-.7,2,-.2),'t3':(.7,2,.3),'t4':(1.3,1,-.2),'c':(.8,0,0),'d':(.8,-1,0)}
 joined={**initial,'M':(-2,0,0),'e':(-2,-1,0)}
 handoff={**initial,'M':(-.8,-1,0),'e':(-3,-1,0),'a':(-3,0,0)}
 closed={**handoff,'d':(.8,-1,0)}
 released={**closed,'M':(2.3,-1,0),'d':(3.3,-1,0),'b':(-.7,0,0),'c':(.7,0,0)}
 if stage==0:pos={k:lerp(initial[k],joined[k],ease(u)) for k in initial}
 elif stage==1:pos=joined
 elif stage==2:pos={k:lerp(joined[k],handoff[k],ease(u)) for k in initial}
 elif stage in [3,4]:pos=closed
 else:pos={k:lerp(closed[k],released[k],ease(u)) for k in initial}
 for k,p in pos.items():q.atom(k,p,'Ru' if k=='M' else 'C')
 for a,b in zip(['b','t1','t2','t3','t4','c'],['t1','t2','t3','t4','c','d']):q.bond(a,b)
 # Explicit stages retain atom identity through both metallacyclobutanes.
 if stage==0:
  q.bond('M','e',2);q.bond('a','b',2);q.bond('c','d',2)
 elif stage==1:
  for a,b in [('M','e'),('e','a'),('a','b'),('b','M')]:q.bond(a,b)
  q.bond('c','d',2)
 elif stage in [2,3]:
  q.bond('e','a',2);q.bond('M','b',2);q.bond('c','d',2)
 elif stage==4:
  q.bond('e','a',2)
  for a,b in [('M','b'),('b','c'),('c','d'),('d','M')]:q.bond(a,b)
 else:q.bond('e','a',2);q.bond('b','c',2);q.bond('M','d',2);q.remove('c','d')
 q.check();return q

def net_exchange(m,t):
 d,bs=frame(m,'HOW RING-CLOSING METATHESIS WORKS','The conventional metal cycle: two additions, two fragment exchanges, one new ring.',1,mh=760)
 b=bs[0];x,y,w,h=b;stage=min(5,int(t*6));u=t*6-stage
 names=['Bring an alkene to M=CH2','First metallacyclobutane','Release ethylene; carry the tether','Reach the second alkene','Second metallacyclobutane','Release the ring; regenerate M=CH2']
 for j,row in enumerate(textwrap.wrap(names[stage],37 if m else 75)):text(d,x+w/2,y+33+j*21,row,16,CYAN)
 q=metal_rcm(stage,u)
 area=(x+18,y+100,w-36,h-225);xy=molecular(d,q,area,t,labels={'M':'M'},ghost=([('e','a'),('M','b')] if stage==0 and u>.4 else [('b','c'),('M','d')] if stage==3 else []))
 if stage>=2:text(d,xy['e'][0],xy['e'][1]-24,'ethylene',12,AMBER)
 text(d,x+w/2,y+h-117,f'{stage+1:02} / 06',13,AMBER)
 key(d,x+25,y+h-87,True)
 note(d,b,'M denotes a metal alkylidene site; ancillary ligands omitted. Molecular motion is illustrative.')
 return d

def cyclo_model(hydra,stage,u):
 q=Mol()
 if hydra:
  a,b=cage(q);q.atom('h',(1.1,1.4,0));q.bond(b,'h',2 if stage==0 else 1)
  cycle(q,'ph',(2.8,1.4,0),.8);q.bond('h','ph3')
  start=[(-1,3.8,0),(.3,3.8,0)];end=[(-1,2.2,.05),(.3,2.2,.05)]
  for k,s,e in zip(['x','y'],start,end):q.atom(k,lerp(s,e,ease(u)) if stage==0 else e)
  q.bond('x','y',2 if stage==0 else 1)
  if stage:q.bond(a,'x');q.bond('y','h')
  labels={a:'NH' + ('+' if stage else ''),b:'N' + ('' if stage else '+')}
  ghost=[(a,'x'),('y','h')] if stage==0 and u>.35 else []
 else:
  for k,p,e in [('M',(-1,0,0),'Ru'),('h',(1,0,0),'C'),('x',(-1,3,0),'C'),('y',(1,3,0),'C')]:q.atom(k,p,e)
  q.bond('M','h',2 if stage==0 else 1);q.bond('x','y',2 if stage==0 else 1)
  q.a['x']=(np.array([-1,3-ease(u)*1.2 if stage==0 else 1.8,0]),'C');q.a['y']=(np.array([1,3-ease(u)*1.2 if stage==0 else 1.8,0]),'C')
  if stage:q.bond('M','x');q.bond('h','y')
  labels={'M':'M'};ghost=[('M','x'),('h','y')] if stage==0 and u>.35 else []
 q.check();return q,labels,ghost

def platforms(m,t):
 d,bs=frame(m,'TWO WAYS TO CAPTURE AN ALKENE','Watch the new bonds close a four-membered or five-membered intermediate.',mh=1150)
 stage=0 if t<.45 or t>.94 else 1;u=min(1,t/.45)
 for i,b in enumerate(bs):
  x,y,w,h=b;cx=x+w/2;text(d,cx,y+30,['Metal alkylidene / [2+2]','Hydrazonium / [3+2]'][i],15)
  q,labels,ghost=cyclo_model(bool(i),stage,u);molecular(d,q,(x+25,y+65,w-50,h-180),t,labels,ghost=ghost)
  text(d,cx,y+h-83,['metallacyclobutane','pyrazolidinium'][i] if stage else 'alkene approaches',15,AMBER)
  note(d,b,['M is the metal site; ligands omitted.','The N-N bridge is part of the full [2.2.2] cage. BF4- counterion omitted.'][i])
 return d

# A concrete O-linked aryl diene, matching the general chromene relay in Figure 2.
def relay_model(stage):
 q=Mol();na,nb=cage(q,offset=(0,-.3,0),flat=True)
 # Keep each five-membered intermediate planar and free of crossed bonds.
 # Atom labels are persistent across every exchange; the N carrying C=N switches.
 q.atom('h',(1,1.05,0));cycle(q,'ar',(2.8,1.05,0),.8,fluoro=True);q.bond('h','ar3')
 coords={'A':(-2,1.65,0),'B':(-2,2.85,0),'C':(-3.04,3.45,0),'D':(-4.08,2.85,0),'E':(-4.08,1.65,0),'F':(-3.04,1.05,0),'b':(-1,1.05,0),'c':(0,1.7,0),'X':(-.95,3.45,0),'s':(.1,2.85,0),'d':(0,1.7,0),'e':(1,1.05,0),'Me':(2,1.05,0)}
 if stage in [0,1,2]:
  coords.update({'d':(.6,3.7,0),'e':(1.8,3.7,0),'Me':(2.4,2.7,0)})
 if stage==0:
  coords['b']=(-1,1.8,0);coords['c']=(0,2.4,0)
 for k,p in coords.items():q.atom(k,p,'O' if k=='X' else 'C')
 for j,(a,b) in enumerate(zip('ABCDEF','BCDEFA')):q.bond(a,b,2 if j%2==0 else 1)
 for a,b in [('A','b'),('B','X'),('X','s'),('s','d'),('e','Me')]:q.bond(a,b)
 if stage==0:q.bond(nb,'h',2);q.bond('b','c',2);q.bond('d','e',2);labels={nb:'N+',na:'NH'}
 elif stage==1:
  for a,b in [(nb,'h'),('h','c'),('c','b'),('b',na)]:q.bond(a,b)
  q.bond('d','e',2);labels={na:'NH+',nb:'N'}
 elif stage==2:
  q.bond(na,'b',2);q.bond('h','c',2);q.bond('d','e',2);labels={na:'N+',nb:'NH'}
  q.move(['h','c']+[k for k in q.a if k.startswith('ar')],(2.4,-1.1,0))
 elif stage==3:
  for a,b in [(na,'b'),('b','d'),('d','e'),('e',nb)]:q.bond(a,b)
  q.bond('h','c',2);labels={na:'N',nb:'NH+'}
  q.move(['h','c']+[k for k in q.a if k.startswith('ar')],(2.4,-1.1,0))
 elif stage==4:
  q.bond('b','d',2);q.bond(nb,'e',2);q.bond('h','c',2);labels={na:'NH',nb:'N+'}
  q.move(['h','c']+[k for k in q.a if k.startswith('ar')],(2.4,-1.1,0));q.move(['e','Me'],(.2,0,0))
  q.move(['A','B','C','D','E','F','b','X','s','d'],(.5,1.4,0))
 else:
  q=Mol();na,nb=cage(q,flat=True);q.atom('h',(2,1,0));q.atom('ox',(2,2,0),'O');q.bond('h','ox',2);cycle(q,'ar',(3.6,1,0),.8,fluoro=True);q.bond('h','ar3')
  q.atom('ald',(-2,1,0));q.atom('o2',(-2,2,0),'O');q.atom('me',(-3,1,0));q.bond('ald','o2',2);q.bond('ald','me');labels={na:'NH',nb:'NH'}
 q.check();return q,labels

def skeleton(d,q,box,labels=None,highlight=False):
 x,y,w,h=box;v=np.array([p[:2] for p,e in q.a.values()]);lo=v.min(0);hi=v.max(0);s=min((w-20)/(hi[0]-lo[0]+.4),(h-20)/(hi[1]-lo[1]+.4));mid=(lo+hi)/2
 xy={k:np.array([x+w/2,y+h/2])+(p[:2]-mid)*s for k,(p,e) in q.a.items()}
 for (a,b),o in q.b.items():
  A=xy[a];B=xy[b];dif=B-A;norm=np.array([-dif[1],dif[0]])/max(1,np.linalg.norm(dif));col=CYAN if highlight and a in ['b','d','e','c','h'] and b in ['b','d','e','c','h'] else '#a4b9c8'
  for j in range(o):line(d,[A+(j-(o-1)/2)*4*norm,B+(j-(o-1)/2)*4*norm],col,1.8)
 for k,(p,e) in q.a.items():
  label=(labels or {}).get(k,e if e!='C' else '')
  if label:
   A=xy[k];size=12 if len(label)<3 else 11;ww=len(label)*size*.7+4
   d.rect(A[0]-ww/2,A[1]-9,ww,16,PANEL,PANEL);text(d,A[0],A[1]+4,label,size,COL.get(e,CYAN))
 return xy

def relay(m,t):
 d,bs=frame(m,'THE HYDRAZONIUM RELAY','A chromene-forming example, redrawn from the connectivity in manuscript Figure 2.',1,h=720,mh=850)
 b=bs[0];x,y,w,h=b;stage=int(t*6)%6
 titles=['01 / Initiating aryl hydrazonium','02 / First pyrazolidinium','03 / Substrate-bound hydrazonium','04 / Intramolecular pyrazolidinium','05 / Chromene + coproduct hydrazonium','06 / Proposed carrier regeneration']
 subtitles=['Condensation with pentafluorobenzaldehyde','[3+2] capture of the aryl-substituted alkene','Cycloreversion releases the initiator-derived styrene','The tether brings the second alkene into reach','Cycloreversion closes the six-membered O-ring','Hydrolysis / recondensation or carbonyl exchange']
 for j,row in enumerate(textwrap.wrap(titles[stage],36 if m else 80)):text(d,x+w/2,y+33+20*j,row,15,CYAN)
 q,labels=relay_model(stage);skeleton(d,q,(x+20,y+90,w-40,h-275),labels,True)
 for j,row in enumerate(textwrap.wrap(subtitles[stage],38 if m else 95)):text(d,x+w/2,y+h-153+19*j,row,12,AMBER)
 for j in range(6):
  xx=x+20+j*(w-40)/6;d.rect(xx,y+h-92,(w-60)/6,5,CYAN if j==stage else LINE,LINE)
 note(d,b,'BF4- / C-H omitted. Proposed relay; illustrative geometry.')
 return d

def diene(me=False):
 q=Mol();cycle(q,'ph',(-1.6,0,0));q.atom('N',(0,1,0),'N');q.bond('ph0','N');q.atom('s',(1.2,1.6,.1));q.atom('b',(2.2,.8,0));q.atom('e',(3.4,1.2,0));q.bond('N','s');q.bond('s','b');q.bond('b','e',2)
 q.atom('vin',(-.5,-1.4,0));q.atom('end',(-.7,-2.6,0));q.bond('ph5','vin');q.bond('vin','end',2)
 q.atom('S',(0,2.1,.2),'S');q.atom('o1',(-.7,2.8,.4),'O');q.atom('o2',(.7,2.8,-.3),'O');q.bond('N','S');q.bond('S','o1',2);q.bond('S','o2',2)
 cycle(q,'tos',(0,4.1,.2),.8,math.pi/2);q.bond('S','tos4');q.atom('tme',(0,5.7,.2));q.bond('tos1','tme')
 if me:q.atom('Me',(4.1,.3,.4));q.bond('e','Me')
 q.check();return q

DEVELOP=[('Standard / iPrOH',77),('No hydrazine',0),('No aldehyde',0),('EtOH instead',8),('NMP instead',66),('0.2 equiv hydrazine',48)]
def fixedbar(d,x,y,w,val,col):
 d.rect(x,y,w,10,BG,LINE)
 if val:d.rect(x,y,w*val/100,10,col,col)
 text(d,x+w+10,y+11,f'{val}%',13,col,'start')

def development(m,t):
 d,bs=frame(m,'A SUBSTITUENT CAN CHANGE THE OUTCOME','Real molecular changes; fixed reported NMR yields.',2,h=720,mh=1300)
 a,b=bs;x,y,w,h=a;text(d,x+w/2,y+30,'Same N-tosyl framework',15)
 for j,(me,val) in enumerate([(False,44),(True,77)]):
  yy=y+55+j*(h-140)/2;q=diene(me);molecular(d,q,(x+18,yy,w-36,(h-140)/2-45),t+j*.13,labels={'Me':'Me'} if me else None,focus=[tuple(sorted(('e','Me')))] if me else [])
  text(d,x+20,yy+(h-140)/2-24,'H / H' if not me else 'Me / H',12,AMBER,'start');fixedbar(d,x+90,yy+(h-140)/2-35,w-165,val,CYAN)
 note(d,a,'The terminal carbon gains a methyl group. Optimized parent: 81% isolated yield.')
 x,y,w,h=b;text(d,x+w/2,y+30,'The conditions matter too',15)
 q=Mol();cage(q);molecular(d,q,(x+22,y+50,120,105),t)
 text(d,x+158,y+99,'+ C6F5CHO',12,CYAN,'start');text(d,x+158,y+126,'140 C / 20 h',11,MUTED,'start')
 pitch=(h-245)/6
 for j,(label,val) in enumerate(DEVELOP):
  yy=y+195+j*pitch;text(d,x+18,yy,label,12,TEXT,'start');fixedbar(d,x+18,yy+14,w-90,val,CYAN)
 note(d,b,'Reaction development: hydrazine, aldehyde and solvent work together.')
 return d

ADDITIVES=[('Phenylacetylene',72,0),('Styrene',60,59),('N-methylaniline',69,23),('Primary amine',40,0),('Phenylacetic acid',99,33),('Thioether',88,42),('Thiol',65,0),('Water',68,29)]
def additive(i):
 q=Mol()
 if i==7:
  q.atom('O',(0,0,0),'O');q.atom('H1',(-.8,.6,0),'H');q.atom('H2',(.8,.6,0),'H');q.bond('O','H1');q.bond('O','H2');return q
 cycle(q,'p');tails=[ [('a',(1.9,0,0),'C'),('b',(3.1,0,0),'C')], [('a',(1.9,0,0),'C'),('b',(2.7,.9,0),'C')], [('a',(1.9,0,0),'N'),('b',(2.7,.9,0),'C')], [('a',(1.9,0,0),'C'),('b',(2.7,.8,0),'N')], [('a',(1.9,0,0),'C'),('b',(2.7,.8,0),'C'),('o',(3.7,.8,0),'O'),('oh',(2.7,1.8,0),'O')], [('a',(1.9,0,0),'S'),('b',(2.7,.8,0),'C')], [('a',(1.9,0,0),'S')] ][i]
 for k,p,e in tails:q.atom(k,p,e)
 q.bond('p0','a')
 if i in [0,1,2,3,4,5]:q.bond('a','b',3 if i==0 else 2 if i==1 else 1)
 if i==3:
  q.atom('iso',(-1.9,0,0));q.atom('im1',(-2.7,-.8,0));q.atom('im2',(-2.7,.8,0));q.bond('p3','iso');q.bond('iso','im1');q.bond('iso','im2')
 if i==4:q.bond('b','o',2);q.bond('b','oh')
 if i==5:q.atom('br',(-1.9,0,0),'Br');q.bond('p3','br')
 if i==6:q.atom('me',(.95,1.65,0));q.bond('p1','me')
 q.check();return q

def grubbs():
 q=Mol();q.atom('ru',(0,0,0),'Ru')
 for k,p,e in [('cl1',(-1.2,-.6,0),'Cl'),('cl2',(1.2,.6,0),'Cl'),('p1',(-.6,1.3,.6),'P'),('p2',(.6,-1.3,-.6),'P'),('ch',(1.6,-.8,.2),'C')]:q.atom(k,p,e);q.bond('ru',k,2 if k=='ch' else 1)
 cycle(q,'ph',(3.2,-.8,.2),.8);q.bond('ch','ph3');return q

def compatibility(m,t):
 d=c.Drawing(450 if m else 900,1560 if m else 950)
 text(d,25,32,'A DIFFERENT COMPATIBILITY PROFILE',15,CYAN,'start')
 
 for j,row in enumerate(textwrap.wrap('Organic hydrazine vs first-generation Grubbs',37 if m else 90)):text(d,25,61+j*18,row,12,MUTED,'start')
 ww=195 if m else 380;bx=235 if m else 490
 for x,q,title,col in [(25,relay_model(5)[0],'A / Bicyclic hydrazine',CYAN),(bx,grubbs(),'B / Grubbs I',AMBER)]:
  # Reagent model only: the hydrazine salt, not the regeneration mixture.
  if x==25:q=Mol();cage(q)
  d.rect(x,98 if m else 80,ww,210 if m else 190)
  for j,row in enumerate(textwrap.wrap(title,18 if m else 40)):text(d,x+ww/2,(119 if m else 103)+18*j,row,12 if m else 15,col)
  molecular(d,q,(x+15,148 if m else 112,ww-30,98 if m else 110),t,labels={'p1':'PCy3','p2':'PCy3'} if x==bx else None)
  if m:
   for j,row in enumerate((['1 equiv / iPrOH','140 C / 20 h'] if x==25 else ['5 mol% / CH2Cl2','rt / 20 h / N2'])):text(d,x+ww/2,271+18*j,row,11,MUTED)
  else:text(d,x+ww/2,251,'1 equiv / iPrOH / 140 C' if x==25 else '5 mol% / CH2Cl2 / rt',10,MUTED)
 pitch=133 if m else 76;barx=197 if m else 460;barw=172 if m else 340
 for i,(label,a,b) in enumerate(ADDITIVES):
  yy=(333 if m else 296)+i*pitch
  molecular(d,additive(i),(24,yy,150 if m else 220,pitch-32),t+i*.07)
  text(d,25,yy+pitch-9,label,11 if m else 13,TEXT,'start')
  for j,(v,col,tag) in enumerate([(a,CYAN,'A'),(b,AMBER,'B')]):
   yb=yy+20+j*26;text(d,barx-14,yb+10,tag,11,col);fixedbar(d,barx,yb,barw,v,col)
 note(d,(15,(1560 if m else 950)-55,420 if m else 870,50),'Substrate 27b / additive compatibility. NMR yields: hydrazine (A) and Grubbs I (B).')
 return d

# Fused aromatic graph: shared vertices and edges, with a valid Kekule matching.
def fused_graph(centers,r=1,rotation=math.pi/6):
 q=Mol();keys={};ringkeys=[]
 for n,(cx,cy) in enumerate(centers):
  rr=[]
  for i in range(6):
   angle=rotation+i*math.tau/6;p=(round(cx+r*math.cos(angle),5),round(cy+r*math.sin(angle),5));key=keys.get(p)
   if key is None:key=str(len(keys));keys[p]=key;q.atom(key,(p[0],p[1],.05*math.sin(n)))
   rr.append(key)
  for i in range(6):q.bond(rr[i],rr[(i+1)%6])
  ringkeys.append(rr)
 def match(todo):
  if not todo:return []
  a=min(todo)
  for edge in q.b:
   if a not in edge:continue
   b=edge[0] if edge[1]==a else edge[1]
   if b not in todo:continue
   out=match(todo-{a,b})
   if out is not None:return [edge]+out
  return None
 matching=match(set(q.a));assert matching is not None
 for a,b in matching:q.bond(a,b,2)
 q.check();return q,ringkeys

def scope(m,t):
 d,bs=frame(m,'RINGS BECOME BUILDING BLOCKS','Heterocycles and an avenue toward larger conjugated frameworks.',3,h=700,mh=1450)
 for i,b in enumerate(bs):
  x,y,w,h=b;cx=x+w/2;cy=y+h*.4;text(d,cx,y+29,['N-containing rings','O-containing rings','Aromatic construction'][i],14)
  if i<2:
   fused_heterocycle(d,cx,cy,35 if m else 31,'N' if i==0 else 'O',CYAN if i==0 else MINT)
   rows=[['Parent NTs: 81%','6-Me NTs: 99%','N-acyl example: 64%'],['Parent chromene: 37%','6-CO2Me: 78%','Phenyloxazole: 22%']][i]
   for j,row in enumerate(rows):text(d,cx,y+h*.69+j*25,row,13,AMBER if j==0 else TEXT)
   note(d,b,'Selected isolated yields. Core structures shown; peripheral substituents omitted.')
  else:
   # Figure 5, compound 70: alternating upper/lower annulation gives a wave.
   n=1+min(4,int(t*5));q,rr=fused_graph(arene_wave_centers()[:n],rotation=0)
   # A fixed camera keeps earlier rings still as another ring appears.
   draw_chain(d,q,(x+20,y+95,w-40,h*.40),t)
   text(d,cx,y+h*.65,'Ring by ring',16,CYAN);text(d,cx,y+h*.65+26,'a conjugated framework',11,MUTED)
   note(d,b,'The scope includes arene oligomer/polymer (70)')
 return d

def arene_wave_centers():
 return [(0,0),(1.5,-math.sqrt(3)/2),(3,0),(4.5,math.sqrt(3)/2),(6,0)]

def draw_chain(d,q,box,t):
 # Fit the finite chain into a fixed camera span without dummy atoms.
 molecular(d,q,box,t,scale=min((box[2]-25)/8.6,(box[3]-20)/4.4),camera=(3,0))

def turnover_model(stage):
 if stage==0:
  q=Mol();cycle(q,'l',(-1.6,0,0));cycle(q,'r',(1.6,0,0));q.bond('l0','r3')
  # Each explicit sp2 substituent follows a trigonal-planar, 120-degree angle.
  def step(p,degrees):
   a=math.radians(degrees);return np.array(p)+1.3*np.array([math.cos(a),math.sin(a),0])
  q.atom('b',step(q.a['l5'][0],-60));q.atom('a',step(q.a['b'][0],-120))
  q.atom('c',step(q.a['r4'][0],-120));q.atom('d',step(q.a['c'][0],-60))
  q.bond('l5','b');q.bond('b','a',2);q.bond('r4','c');q.bond('c','d',2)
  cycle(q,'ph',q.a['d'][0]+np.array([2.1,0,0]),.8);q.bond('d','ph3');q.check();return q
 q=Mol();cage(q);q.atom('h',(1.2,1.4,0));q.bond('h','hnb',2);cycle(q,'p',(2.8,1.4,0),.8,fluoro=stage==2);q.bond('h','p3');q.check();return q

def catalysis(m,t):
 d,bs=frame(m,'DESIGNING THE WAY BACK','The departing group can help the hydrazine return for another ring closure.',2,h=720,mh=1250)
 a,b=bs;x,y,w,h=a;stage=int(t*3)%3
 titles=['A phenyl-substituted coupling alkene','A benzaldehyde-derived carrier','Return to the initiating carrier']
 for j,row in enumerate(textwrap.wrap(titles[stage],32 if m else 35)):text(d,x+w/2,y+29+j*19,row,14,CYAN)
 q=turnover_model(stage);molecular(d,q,(x+20,y+90,w-40,h-230),t,labels={'hnb':'N+','hna':'NH'} if stage else {})
 text(d,x+w/2,y+h-104,['Ph leaves with the carrier','PhCH=N+ : the coproduct','C6F5CH=N+ : the initiator'][stage],12,AMBER)
 note(d,a,'Proposed regeneration: hydrolysis / recondensation or carbonyl exchange.')
 x,y,w,h=b;text(d,x+w/2,y+30,'Phenanthrene',17)
 q,_=fused_graph([(-math.sqrt(3),0),(0,0),(math.sqrt(3)/2,-1.5)])
 molecular(d,q,(x+22,y+55,w-44,h*.40),t)
 for j,(s,col) in enumerate([('20 mol% hydrazine',CYAN),('1 equiv aldehyde',AMBER),('78% isolated yield',MINT)]):text(d,x+w/2,y+h*.62+38*j,s,18,col)
 note(d,b,'Substrate design unlocks catalytic hydrazine turnover.')
 return d

def evidence(m,t):
 d,bs=frame(m,'AN ORGANIC PLATFORM. NEW OPTIONS.','An organic activation pathway, complementary compatibility, and designed turnover.',3,h=610,mh=1500)
 titles=['Metal-free ring closure','Useful selectivity','The next designs']
 for i,b in enumerate(bs):
  x,y,w,h=b;cx=x+w/2;text(d,cx,y+33,titles[i],15,[CYAN,AMBER,MINT][i])
  if i==0:
   q=Mol();cage(q);molecular(d,q,(x+20,y+70,w-40,h*.38),t)
   rows=['An organic [3+2] platform','No added metal in this step','Acyclic diene -> cyclic alkene']
  elif i==1:
   molecular(d,additive(6),(x+15,y+65,w-30,h*.32),t)
   rows=['Thiol additive: 65% vs 0%','Hydrazine vs Grubbs I','Complementary chemistry']
  else:
   molecular(d,turnover_model(2),(x+20,y+65,w-40,h*.38),t,labels={'hnb':'N+'})
   rows=['Broader catalytic turnover','New alkene designs','Larger aromatic frameworks']
  for j,row in enumerate(rows):
   for k,s in enumerate(textwrap.wrap(row,30 if m else 22)):text(d,cx,y+h*.59+j*42+k*17,s,12,TEXT)
  note(d,b,['A new route alongside established metal-alkylidene chemistry.','Ring closure in the presence of a thiol additive.','Let structure and regeneration guide the next experiment.'][i])
 return d

RECIPES={'net-exchange':net_exchange,'two-platforms':platforms,'hydrazonium-relay':relay,'reaction-development':development,'additive-compatibility':compatibility,'ring-families':scope,'designed-turnover':catalysis,'evidence-and-next':evidence}

def verify():
 q=Mol();cage(q);q.check();assert len(q.a)==8 and len(q.b)==9
 assert sorted(e for p,e in q.a.values())==['C']*6+['N']*2
 def order(q,a,b):return q.b.get(tuple(sorted((a,b))),0)
 for j in range(6):
  q=metal_rcm(j,.5);q.check();assert set(q.a)==set(metal_rcm(0,0).a)
  if j in [1,4]:
   cyc=['M','e','a','b'] if j==1 else ['M','b','c','d']
   assert all(order(q,a,b)==1 for a,b in zip(cyc,cyc[1:]+cyc[:1]))
  if j>=2:
   assert order(q,'e','a')==2
   assert all(not ({'e','a'} & set(edge)) or set(edge)=={'e','a'} for edge in q.b)
 final=metal_rcm(5,1)
 assert order(final,'b','c')==2 and order(final,'M','d')==2
 assert order(final,'c','d')==0 and order(final,'M','b')==0
 base=set(relay_model(0)[0].a)
 for j in range(6):
  q,labels=relay_model(j);q.check()
  if j<5:assert set(q.a)==base
  if j in [1,3]:
   cyc=['hna','hnb','h','c','b'] if j==1 else ['hna','hnb','e','d','b']
   assert all(order(q,a,b)==1 for a,b in zip(cyc,cyc[1:]+cyc[:1]))
  if j in [2,3,4]:assert order(q,'h','c')==2
  if j==4:
   assert order(q,'b','d')==2 and order(q,'hnb','e')==2
   assert not order(q,'b','hna') and not order(q,'d','e')
 for i in range(8):additive(i).check()
 for j in range(3):turnover_model(j).check()
 for n in range(1,6):
  q,_=fused_graph([(math.sqrt(3)*j,0) for j in range(n)]);assert len(q.a)==4*n+2
 wave,_=fused_graph(arene_wave_centers(),rotation=0);assert len(wave.a)==22
 assert min(y for x,y in arene_wave_centers())<0<max(y for x,y in arene_wave_centers())
 precursor=turnover_model(0);angles=[]
 for a,b,cx in [('l5','b','a'),('r4','c','d'),('c','d','ph3')]:
  u=precursor.a[a][0]-precursor.a[b][0];v=precursor.a[cx][0]-precursor.a[b][0]
  angle=math.degrees(math.acos(np.dot(u,v)/np.linalg.norm(u)/np.linalg.norm(v)))
  assert abs(angle-120)<1e-8;angles.append(round(angle))
 phen,_=fused_graph([(-math.sqrt(3),0),(0,0),(math.sqrt(3)/2,-1.5)]);assert len(phen.a)==14
 return {'cageHeavyAtoms':8,'cageBonds':9,'metalCycleAtomCount':10,'relayStatesChecked':6,'phenanthreneCarbons':14,'areneWaveCarbons':22,'couplingAlkeneAnglesDegrees':angles,'molecularValenceChecks':'passed','exchangeEndpointChecks':'passed','geometry':'Illustrative coordinates; no calculated reaction trajectories','source':'Supplied manuscript Figures 2–6; 222.gif visual reference only'}
