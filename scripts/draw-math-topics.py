"""Original paired vector / animated pixel figures for the three math stories.

Offline NumPy + Pillow. Reuses this repository's original Drawing primitives;
all datasets are synthetic, all algorithm panels use their computed models.
No downloaded figures, external plot implementations, or chemistry edits.
"""
from pathlib import Path
import importlib.util
import math
import json
import textwrap
import hashlib
import numpy as np
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('drawing',ROOT/'scripts/draw-catalyst-figures.py')
art=importlib.util.module_from_spec(spec);spec.loader.exec_module(art)
OUT=ROOT/'public/media/mathematics/topics';art.OUT=OUT;art.SCALE=.5
class Drawing(art.Drawing):
    def __init__(self,w,h):
        super().__init__(w,h)
        if art.SCALE>.5:self.d.fontmode='L'
BG,PANEL,LINE,CYAN,AMBER,MINT,TEXT,MUTED=art.BG,art.PANEL,art.LINE,art.CYAN,art.AMBER,art.MINT,art.TEXT,art.MUTED
CORAL='#ce8c86'

def polygon(d,pts,col):
    d.svg.append('<polygon points="'+' '.join(f'{x:.2f},{y:.2f}' for x,y in pts)+f'" fill="{col}"/>')
    d.d.polygon([(round(x*art.SCALE),round(y*art.SCALE)) for x,y in pts],fill=col)

def setup(mobile,title,subtitle,count=2,mh=800,wh=520):
    d=Drawing(450 if mobile else 900,mh if mobile else wh)
    d.text(25,34,title,14 if mobile else 18,CYAN)
    for j,line in enumerate(textwrap.wrap(subtitle,38 if mobile else 100)):
        d.text(25,62+j*16,line,12 if mobile else 13,MUTED)
    if mobile:
        h=(mh-150)/count
        boxes=[(25,94+i*(h+12),400,h) for i in range(count)]
    else:
        w=(840-(count-1)*18)/count
        boxes=[(30+i*(w+18),100,w,wh-160) for i in range(count)]
    for x,y,w,h in boxes:d.rect(x,y,w,h)
    return d,boxes

def label(d,b,title):
    x,y,w,h=b;d.text(x+14,y+26,title,16,TEXT)

def plotbox(b):
    x,y,w,h=b;return (x+34,y+57,x+w-16,y+h-47)

def axes(d,b,xlim=(-1,1),ylim=(-1,1),xlabel='x',ylabel='response'):
    x0,y0,x1,y1=b
    for u in np.linspace(x0,x1,5):d.path([(u,y0),(u,y1)],LINE,1)
    for v in np.linspace(y0,y1,5):d.path([(x0,v),(x1,v)],LINE,1)
    d.text(x0,y1+20,f'{xlim[0]:g}',11,MUTED);d.text(x1,y1+20,f'{xlim[1]:g}',11,MUTED,'end')
    d.text(x0-6,y0+5,f'{ylim[1]:g}',10,MUTED,'end');d.text(x0-6,y1,f'{ylim[0]:g}',10,MUTED,'end')
    d.text((x0+x1)/2,y1+36,xlabel,12,MUTED,'middle');d.text(x0,y0-12,ylabel,11,MUTED)

def mapped(xx,yy,b,xlim=(-1,1),ylim=(-1,1)):
    x0,y0,x1,y1=b
    return [(x0+(x-xlim[0])/(xlim[1]-xlim[0])*(x1-x0),y1-(y-ylim[0])/(ylim[1]-ylim[0])*(y1-y0)) for x,y in zip(xx,yy)]

def curve(d,xx,yy,b,col=CYAN,xlim=(-1,1),ylim=(-1,1),part=1,dashed=False):
    pts=mapped(xx,yy,b,xlim,ylim)
    d.path(pts[:max(2,int(len(pts)*part))],col,2,dashed=dashed)

def dots(d,xx,yy,b,col=AMBER,xlim=(-1,1),ylim=(-1,1)):
    for x,y in mapped(xx,yy,b,xlim,ylim):d.dot(x,y,col,6)

def interp(nodes,values,x):
    weights=np.array([1/np.prod(n-np.delete(nodes,j)) for j,n in enumerate(nodes)])
    result=[]
    for q in np.asarray(x):
        hit=np.flatnonzero(abs(q-nodes)<1e-12)
        if len(hit):result.append(values[hit[0]])
        else:
            terms=weights/(q-nodes);result.append(np.dot(terms,values)/sum(terms))
    return np.array(result)

def runge(x):return 1/(1+25*x*x)
X=np.linspace(-1,1,301); EQ=np.linspace(-1,1,11);CHEB=-np.cos(np.arange(11)*np.pi/10)
NOISE_NODES=np.linspace(-1,1,11)
def cubic(x):return .45+.3*x-.2*x*x+.1*x*x*x
OBS=cubic(NOISE_NODES)+np.random.default_rng(42).normal(0,.045,11)
REG=np.polynomial.polynomial.polyfit(NOISE_NODES,OBS,3)

def runge_figure(m,t):
    d,bs=setup(m,'PINS ARE NOT THE WHOLE CURVE','Uniform samples / increasing global degree')
    for b,n in zip(bs,[7,11]):
        label(d,b,f'{n} points / degree {n-1}');p=plotbox(b);nodes=np.linspace(-1,1,n)
        axes(d,p,ylim=(-.8,2.2));curve(d,X,runge(X),p,MUTED,ylim=(-.8,2.2))
        curve(d,X,interp(nodes,runge(nodes),X),p,AMBER,ylim=(-.8,2.2),part=min(1,t*1.4+.1));dots(d,nodes,runge(nodes),p,CYAN,ylim=(-.8,2.2))
    return d

def remedies(m,t):
    d,bs=setup(m,'SAME BUDGET / DIFFERENT CHOICES','11 samples in each panel',3,1000)
    for b,kind,nodes in zip(bs,['Uniform polynomial','Chebyshev polynomial','Local straight pieces'],[EQ,CHEB,EQ]):
        label(d,b,kind);p=plotbox(b);yp=np.interp(X,nodes,runge(nodes)) if kind.startswith('Local') else interp(nodes,runge(nodes),X)
        axes(d,p,ylim=(-.5,2.1));curve(d,X,runge(X),p,MUTED,ylim=(-.5,2.1));curve(d,X,yp,p,MINT if kind!='Uniform polynomial' else AMBER,ylim=(-.5,2.1),part=min(1,t*1.5+.1))
        dots(d,nodes,runge(nodes),p,CYAN,ylim=(-.5,2.1))
        d.text(b[0]+14,b[1]+b[3]-10,f'max error: {max(abs(yp-runge(X))):.3f}',12,AMBER)
    return d

def noise_fit(m,t):
    d,bs=setup(m,'MATCH THE DOTS / OR LEARN THE TREND?','Identical observations with seeded synthetic noise')
    for b,kind,yy in zip(bs,['Exact interpolation','Cubic least squares'],[interp(NOISE_NODES,OBS,X),np.polynomial.polynomial.polyval(X,REG)]):
        label(d,b,kind);p=plotbox(b);axes(d,p,ylim=(-.5,1))
        curve(d,X,cubic(X),p,MUTED,ylim=(-.5,1),dashed=True);curve(d,X,yy,p,AMBER if kind.startswith('Exact') else MINT,ylim=(-.5,1),part=min(1,t*1.4+.2))
        dots(d,NOISE_NODES,OBS,p,CYAN,ylim=(-.5,1))
    return d

def surface(x,y):return .12+.65*np.exp(-((x-.7)/.09)**2)*(.35+.65*y)+.10*x*y
UNI=np.linspace(0,1,7);REF=np.array([0,.48,.6,.66,.72,.8,1])
def triangular(xn,yn,x,y):
    i=np.clip(np.searchsorted(xn,x,side='right')-1,0,len(xn)-2);j=np.clip(np.searchsorted(yn,y,side='right')-1,0,len(yn)-2)
    a=(x-xn[i])/(xn[i+1]-xn[i]);b=(y-yn[j])/(yn[j+1]-yn[j])
    z00=surface(xn[i],yn[j]);z10=surface(xn[i+1],yn[j]);z01=surface(xn[i],yn[j+1]);z11=surface(xn[i+1],yn[j+1])
    return np.where(a+b<=1,z00+a*(z10-z00)+b*(z01-z00),z11+(1-a)*(z01-z11)+(1-b)*(z10-z11))
XX,YY=np.meshgrid(np.linspace(0,1,101),np.linspace(0,1,101))
MESH_ERRORS=[float(np.sqrt(np.mean((triangular(xn,UNI,XX,YY)-surface(XX,YY))**2))) for xn in [UNI,REF]]

def projected(b,x,y,z):
    bx,by,w,h=b
    return (bx+w/2+(x-y)*w*.36,by+h*.69+(x+y-1)*h*.16-z*h*.45)

def wire_surface(d,b,xn,yn,fn=surface,highlight=None):
    for y in yn:
        pts=[projected(b,x,y,fn(x,y)) for x in xn];d.path(pts,CYAN,1)
    for x in xn:
        pts=[projected(b,x,y,fn(x,y)) for y in yn];d.path(pts,MINT,1)
    if len(xn)<=7:
        for i in range(len(xn)-1):
            for j in range(len(yn)-1):
                d.path([projected(b,xn[i+1],yn[j],fn(xn[i+1],yn[j])),projected(b,xn[i],yn[j+1],fn(xn[i],yn[j+1]))],LINE,1)
    if highlight is not None:
        x,y=highlight;d.dot(*projected(b,x,y,fn(x,y)),AMBER,9)
    d.text(b[0]+12,b[1]+b[3]-16,'input 1 / input 2',11,MUTED)

def meshes(m,t):
    d,bs=setup(m,'A SURFACE IS MADE OF SMALL PATCHES','Same 49 vertices / different placement',3,1000)
    for i,b in enumerate(bs):
        label(d,b,['Known target','Uniform mesh','Feature-aware mesh'][i])
        ns=np.linspace(0,1,24) if i==0 else UNI if i==1 else REF
        fn=surface if i==0 else lambda x,y: triangular(ns,UNI,x,y)
        wire_surface(d,b,ns,np.linspace(0,1,24) if i==0 else UNI,fn=fn,highlight=(.7,(t*1.3)%1))
        if i:d.text(b[0]+12,b[1]+b[3]-34,f'RMSE {MESH_ERRORS[i-1]:.3f}',12,AMBER)
    return d

def conditions(m,t):
    d,bs=setup(m,'ONE SETTING / ONE OBSERVATION','A protocol defines what a coordinate means')
    a,b=bs;label(d,a,'Choose a coordinate');label(d,b,'Repeat and observe')
    xx=.25+.5*(.5+.5*math.sin(t*math.tau));yy=.6;wire_surface(d,a,np.linspace(0,1,14),np.linspace(0,1,14),highlight=(xx,yy))
    x,y,w,h=b;mu=float(surface(xx,yy));d.text(x+20,y+65,'temperature / time',14,CYAN)
    d.text(x+20,y+95,'normalized toy inputs',12,MUTED)
    baseline=y+h*.66;center=x+25+mu*(w-45)
    d.path([(x+25,baseline),(x+w-20,baseline)],LINE)
    for j,e in enumerate([-.05,.01,.035,-.02,.015]):d.dot(center+e*(w-45),baseline-16-j*13,CYAN,7)
    d.text(x+25,baseline+17,'0',11,MUTED);d.text(x+w-20,baseline+17,'1',11,MUTED,'end')
    d.text(x+w/2,y+h-30,f'expected response {mu:.2f}',14,AMBER,'middle')
    d.text(x+w/2,y+h-10,'replicates have a spread',12,MUTED,'middle')
    return d

def shade(z):
    colors=['#142331','#203b4b','#31586a','#4b7a88','#75a5aa','#afcbb6']
    return colors[int(np.clip(z,0,.999)*len(colors))]

def interactions(m,t):
    d,bs=setup(m,'WHAT IF THE VARIABLES ACT TOGETHER?','Hidden toy response: 0.15 + 0.70 x y')
    layouts=[[(0,0),(.5,0),(1,0),(0,.5),(0,1)],[(0,0),(1,0),(0,1),(1,1),(.5,.5)]]
    for b,name,pts in zip(bs,['5 runs / along two edges','5 runs / corners + center'],layouts):
        label(d,b,name);p=plotbox(b);x0,y0,x1,y1=p
        for i in range(16):
            for j in range(16):d.rect(x0+i/16*(x1-x0),y0+j/16*(y1-y0),(x1-x0)/16+1,(y1-y0)/16+1,shade(.15+.70*(i+.5)/16*(1-(j+.5)/16)),BG,0)
        axes(d,p,(0,1),(0,1),'input 1','input 2')
        for x,y in pts[:min(5,1+int(t*6))]:dots(d,[x],[y],p,AMBER,(0,1),(0,1))
    return d

def dimensions(m,t):
    d,bs=setup(m,'A SMALL RESOLUTION / A LARGE GRID','5 settings per axis',3,1000)
    for dims,b in enumerate(bs,1):
        label(d,b,f'{dims} dimension'+('' if dims==1 else 's'));x,y,w,h=b;cx=x+w/2;cy=y+h/2
        for i in range(5):
            for j in range(5 if dims>1 else 1):
                for k in range(5 if dims>2 else 1):
                    px=cx+(i-2)*w*.13+(k-2)*w*.035;py=cy+(j-2)*h*.12-(k-2)*h*.04
                    d.dot(px,py,CYAN if i/5<=t else LINE,5)
        d.text(cx,y+h-25,f'5^{dims} = {5**dims} settings',17,AMBER,'middle')
    return d

def hidden(x):return .45+.24*np.sin(7*x)+.15*np.cos(15*x)
GP_GRID=np.linspace(0,1,181)
def kernel(a,b):return np.exp(-((a[:,None]-b[None,:])/.18)**2/2)*.12
def posterior(xs,ys):
    k=kernel(xs,xs)+(.035**2+1e-10)*np.eye(len(xs));cross=kernel(xs,GP_GRID)
    L=np.linalg.cholesky(k);alpha=np.linalg.solve(L.T,np.linalg.solve(L,ys-.45))
    mu=.45+cross.T@alpha;v=np.linalg.solve(L,cross)
    sd=np.sqrt(np.maximum(0,.12-np.sum(v*v,axis=0)))
    return mu,sd
GP=[];xs=np.array([.08,.45,.9]);rng=np.random.default_rng(23);ys=hidden(xs)+rng.normal(0,.035,3)
for _ in range(6):
    mu,sd=posterior(xs,ys);score=mu+1.5*sd;allowed=np.min(abs(GP_GRID[:,None]-xs[None,:]),axis=1)>.025
    idx=np.argmax(np.where(allowed,score,-np.inf));GP.append((xs.copy(),ys.copy(),mu,sd,score,idx))
    xs=np.append(xs,GP_GRID[idx]);ys=np.append(ys,hidden(GP_GRID[idx])+rng.normal(0,.035))

def sequential(m,t):
    d,bs=setup(m,'SPEND THE NEXT OBSERVATION WITH A PURPOSE','A computed Gaussian-process / UCB toy loop',mh=960,wh=600)
    xs,ys,mu,sd,score,idx=GP[min(5,int(t*6))]
    for i,b in enumerate(bs):
        label(d,b,'Response + uncertainty' if i==0 else 'Next-point score');p=plotbox(b)
        # A dedicated footer band separates ticks, the x label, and status text.
        p=(p[0],p[1],p[2],b[1]+b[3]-100)
        axes(d,p,(0,1),(-.3,1.4),'setting','response' if i==0 else 'mean + 1.5 sd')
        if i==0:
            band=mapped(GP_GRID,mu+1.96*sd,p,(0,1),(-.3,1.4))+list(reversed(mapped(GP_GRID,mu-1.96*sd,p,(0,1),(-.3,1.4))))
            polygon(d,band,'#203b4b');curve(d,GP_GRID,hidden(GP_GRID),p,MUTED,(0,1),(-.3,1.4),dashed=True)
            curve(d,GP_GRID,mu,p,CYAN,(0,1),(-.3,1.4));dots(d,xs,ys,p,AMBER,(0,1),(-.3,1.4))
        else:
            curve(d,GP_GRID,score,p,MINT,(0,1),(-.3,1.4));dots(d,[GP_GRID[idx]],[score[idx]],p,AMBER,(0,1),(-.3,1.4))
        d.text(b[0]+14,b[1]+b[3]-18,f'{len(xs)} observations / next x={GP_GRID[idx]:.2f}',11,AMBER)
    return d

def leg(n,x):
    return np.polynomial.legendre.legval(x,[0]*n+[1])
GX,GW=np.polynomial.legendre.leggauss(48)
COEF=np.array([(2*n+1)/2*np.dot(GW,np.exp(GX)*leg(n,GX)) for n in range(8)])

def family(m,t):
    d,bs=setup(m,'ONE RECURRENCE / MANY SHAPES','P0 through P5 on the same interval')
    b=bs[0];label(d,b,'Reveal the family');p=plotbox(b);axes(d,p,ylim=(-1.1,1.1))
    colors=[CYAN,AMBER,MINT,CORAL,'#a4add2',TEXT]
    for n,col in enumerate(colors):
        if t>=n/8:curve(d,X,leg(n,X),p,col,ylim=(-1.1,1.1),part=min(1,(t-n/8)*4))
    b=bs[1];label(d,b,'The first few formulas');x,y,w,h=b
    for j,txt in enumerate(['P0 = 1','P1 = x','P2 = (3x^2-1)/2','P3 = (5x^3-3x)/2']):d.text(x+18,y+72+j*(h-95)/4,txt,15,colors[j])
    return d

def orthogonality(m,t):
    d,bs=setup(m,'OVERLAP CAN CANCEL','Positive and negative signed area / normalized Gram matrix')
    b=bs[0];label(d,b,'P1(x) * P3(x)');p=plotbox(b);axes(d,p,ylim=(-.35,1.05));prod=leg(1,X)*leg(3,X)
    for xx,yy in zip(X,prod):
        px,py=mapped([xx],[yy],p,ylim=(-.35,1.05))[0];zero=mapped([xx],[0],p,ylim=(-.35,1.05))[0][1]
        d.path([(px,zero),(px,py)],MINT if yy>=0 else CORAL,1)
    curve(d,X,prod,p,CYAN,ylim=(-.35,1.05),part=min(1,t*1.6+.1))
    b=bs[1];label(d,b,'<normalized Pm, Pn>');x,y,w,h=b;side=min(w-70,h-85)/6
    for i in range(6):
        for j in range(6):d.rect(x+32+j*side,y+52+i*side,side-3,side-3,MINT if i==j else BG,LINE)
    d.text(x+18,y+h-17,'diagonal 1 / off-diagonal 0',12,AMBER)
    return d

def projection(m,t):
    d,bs=setup(m,'CURVES BECOME COORDINATES','Orthogonal projection of exp(x) / no interpolation nodes')
    n=min(5,int(t*6));b=bs[0];label(d,b,f'Keep degrees 0 through {n}');p=plotbox(b);axes(d,p,ylim=(0,3))
    curve(d,X,np.exp(X),p,MUTED,ylim=(0,3),dashed=True);curve(d,X,np.polynomial.legendre.legval(X,COEF[:n+1]),p,CYAN,ylim=(0,3))
    b=bs[1];label(d,b,'Projection coefficients');x,y,w,h=b
    for j,c in enumerate(COEF[:6]):
        xx=x+32+j*(w-55)/6;hh=c/1.2*(h-110);d.rect(xx,y+h-42-hh,(w-55)/6-7,hh,CYAN if j<=n else LINE,LINE)
        d.text(xx+8,y+h-20,str(j),12,MUTED,'middle')
    return d

def boundary_modes(m,t):
    d,bs=setup(m,'BOUNDARIES CHOOSE THE PATTERNS','A classical string analogy / not a quantum derivation',3,1000)
    u=np.linspace(0,1,181)
    for n,b in enumerate(bs,1):
        label(d,b,f'Mode {n} / fixed ends');p=plotbox(b);axes(d,p,(0,1),(-1.2,1.2),'position','displacement')
        curve(d,u,np.sin(n*np.pi*u)*np.cos(t*math.tau*n),p,CYAN,(0,1),(-1.2,1.2));dots(d,[0,1],[0,0],p,AMBER,(0,1),(-1.2,1.2))
    return d

def angular_modes(m,t):
    d,bs=setup(m,'AMPLITUDE IS NOT PROBABILITY','m=0 angular factors / 2D polar sketches',3,1300,650)
    theta=np.linspace(0,math.tau,181)
    for n,b in enumerate(bs):
        label(d,b,f'l={n}, m=0');x,y,w,h=b;r=min(w*.32,(h-95)*.23);p=leg(n,np.cos(theta))
        for row in range(2):
            cy=y+65+r+row*(h-75)/2;cx=x+w/2;vals=abs(p) if row==0 else p*p
            pts=[(cx+r*v*np.sin(th),cy-r*v*np.cos(th)) for th,v in zip(theta,vals)]
            for j in range(min(len(pts)-1,max(2,int(t*1.5*(len(pts)-1))))):
                d.path(pts[j:j+2],MINT if row or p[j]>=0 else CORAL,2)
            d.text(cx,cy+r+23,'signed amplitude' if row==0 else 'squared magnitude',12,MUTED,'middle')
    return d

def born(m,t):
    d,bs=setup(m,'A RULE CONNECTING STATES TO OUTCOMES','A normalized two-state example')
    angle=.2+(1-np.cos(t*math.tau))*.55;c=[math.cos(angle),math.sin(angle)];b=bs[0];label(d,b,'Prepared amplitudes');x,y,w,h=b
    for j,a in enumerate(c):
        yy=y+95+j*90;d.arrow((x+40,yy),(x+40+a*(w-80),yy),CYAN if j==0 else AMBER);d.text(x+30,yy-20,f'c{j}={a:.2f}',15,TEXT)
    b=bs[1];label(d,b,'Outcome probabilities');x,y,w,h=b
    for j,a in enumerate(c):
        yy=y+85+j*90;d.rect(x+25,yy,(w-50)*a*a,24,CYAN if j==0 else AMBER,LINE);d.text(x+25,yy+48,f'p{j}=|c{j}|^2={a*a:.2f}',14,TEXT)
    d.text(x+25,y+h-18,'p0 + p1 = 1',15,MINT)
    return d

def flow(m,t,title,subtitle,items,mh=1100):
    d,bs=setup(m,title,subtitle,len(items),mh)
    for i,(b,(heading,lines)) in enumerate(zip(bs,items)):
        label(d,b,heading);x,y,w,h=b
        for j,line in enumerate(lines):d.text(x+15,y+67+j*30,line,13,CYAN if j==0 else MUTED)
        if i==int(t*len(items))%len(items):d.rect(x+7,y+h-15,w-14,4,AMBER,AMBER)
    return d

def quantum_layers(m,t):
    return flow(m,t,'WHICH LAYER DOES THE QUESTION BELONG TO?','Different assumptions / different kinds of error',[
        ('Framework',['States + operators','Born probabilities','Unitary evolution']),('Physical model',['System + environment','Nonrelativistic?','Central potential?']),('Representation',['Finite basis','Discretization','Truncated expansion']),('Numerical solve',['Roundoff','Iteration tolerance','Check convergence'])])

Z,_=np.linalg.qr(np.array([[1.,2,3],[3,1,2],[2,3,1]]));T=np.array([[5.,1.2,-.5],[0,2.,.8],[0,0,.7]]);A=Z@T@Z.T;Q,R=np.linalg.qr(A)
STATES=[A];ACC=np.eye(3)
for _ in range(35):
    q,r=np.linalg.qr(STATES[-1]);STATES.append(r@q);ACC=ACC@q
ROW=np.linspace(0,1,24);COL=np.linspace(0,1,32)
DATA=np.outer(np.sin(2*np.pi*ROW),np.cos(2*np.pi*COL))+.6*np.outer(np.cos(4*np.pi*ROW),np.sin(3*np.pi*COL))+.25*np.outer(ROW-.5,(COL-.5)**2)+np.random.default_rng(5).normal(0,.025,(24,32))
U,S,VT=np.linalg.svd(DATA,full_matrices=False)
OMEGA=np.random.default_rng(6).normal(size=(32,8));Y=DATA@OMEGA;SQ,_=np.linalg.qr(Y);B=SQ.T@DATA;BU,BS,BV=np.linalg.svd(B,full_matrices=False);SKETCH=SQ@((BU[:,:4]*BS[:4])@BV[:4])

def heat(d,mat,b,scale=None):
    x,y,w,h=b;rows,cols=mat.shape;scale=max(abs(mat).max(),1e-9) if scale is None else scale
    for i in range(rows):
        for j in range(cols):
            v=mat[i,j]/scale;col=shade(abs(v)*.92) if v>=0 else ['#312a35','#60454c','#97676b','#ce8c86'][min(3,int(abs(v)*4))]
            d.rect(x+j*w/cols,y+i*h/rows,w/cols+.2,h/rows+.2,col,col,0)

def matrix_cost(m,t):
    d,bs=setup(m,'DOUBLE THE SIZE / WHAT GROWS?','Dense matrices: storage ~ n^2 / factor work ~ n^3',3,1000)
    for j,b in enumerate(bs):
        x,y,w,h=b;label(d,b,['n','2n','4n'][j]);n=4*2**j
        for a in range(n):
            for c in range(n):d.rect(x+30+c*(w-60)/n,y+48+a*(h-135)/n,(w-60)/n-1,(h-135)/n-1,CYAN if a/n<t else LINE,LINE)
        d.text(x+16,y+h-53,f'storage: {4**j}x',15,MINT);d.text(x+16,y+h-24,f'work: {8**j}x',15,AMBER)
    return d

def factor_once(m,t):
    d,bs=setup(m,'PAY FOR THE FACTORIZATION ONCE','Actual QR / new right-hand sides / same matrix')
    b=bs[0];x,y,w,h=b;label(d,b,'A = Q R');heat(d,Q,(x+20,y+70,(w-60)/2,h*.35));heat(d,R,(x+w/2+10,y+70,(w-60)/2,h*.35));d.text(x+25,y+h-35,'orthogonal / triangular',13,MINT)
    b=bs[1];x,y,w,h=b;label(d,b,'R x = Q^T b');rhs=np.eye(3)[:,int(t*3)%3];sol=np.linalg.solve(R,Q.T@rhs)
    for j,(v,z) in enumerate(zip(rhs,sol)):d.text(x+20,y+77+j*45,f'b{j}={v:.0f}  x{j}={z: .3f}',15,CYAN)
    d.text(x+20,y+h-30,f'residual {np.linalg.norm(A@sol-rhs):.1e}',13,MINT)
    return d

def schur_steps(m,t):
    d,bs=setup(m,'CHANGE COORDINATES / PRESERVE EIGENVALUES','An unshifted QR iteration for a small real example')
    k=min(35,int(t*36));b=bs[0];x,y,w,h=b;label(d,b,f'A_{k}');heat(d,STATES[k],(x+45,y+60,w-90,h-120));d.text(x+15,y+h-18,'eigenvalues: 5, 2, 0.7',13,MINT)
    b=bs[1];label(d,b,'Lower triangle fades');p=plotbox(b);err=np.array([np.linalg.norm(np.tril(a,-1)) for a in STATES]);axes(d,p,(0,35),(-15,1),'QR step','log10 lower norm')
    curve(d,np.arange(36),np.log10(np.maximum(err,1e-15)),p,CYAN,(0,35),(-15,1),part=max(.02,k/35));dots(d,[k],[np.log10(max(err[k],1e-15))],p,AMBER,(0,35),(-15,1))
    return d

def low_rank(m,t):
    d,bs=setup(m,'A SMALLER MATRIX STORY','Synthetic data / computed SVD / singular values',3,1000)
    k=[1,2,4,8][min(3,int(t*4))];approx=(U[:,:k]*S[:k])@VT[:k]
    for j,b in enumerate(bs):
        x,y,w,h=b;label(d,b,['Original 24 x 32',f'Rank {k} approximation','Singular values'][j])
        if j<2:heat(d,DATA if j==0 else approx,(x+15,y+50,w-30,h-110),float(abs(DATA).max()))
        else:
            for a,v in enumerate(S[:12]):
                hh=v/S[0]*(h-125);d.rect(x+20+a*(w-35)/12,y+h-65-hh,(w-35)/12-3,hh,AMBER if a<k else LINE,LINE)
        if j==1:d.text(x+14,y+h-27,f'rel error {np.linalg.norm(DATA-approx)/np.linalg.norm(DATA):.3f}',12,AMBER)
        if j==2:d.text(x+14,y+h-27,'amber = retained',12,AMBER)
    return d

def random_sketch(m,t):
    return flow(m,t,'BUILD A SMALLER PROBLEM FIRST','Fixed random seed / actual matrix products',[
        ('1 / Sketch',['A: 24 x 32','Omega: 32 x 8','Y = A Omega']),('2 / Basis',['Y: 24 x 8','QR(Y) -> Q','Q: 24 x 8']),('3 / Compress',['B = Q^T A','B: 8 x 32','SVD on B']),('4 / Lift',['Q U_small', 'keep rank 4',f'rel err {np.linalg.norm(DATA-SKETCH)/np.linalg.norm(DATA):.3f}'])])

def energy(x,y,target=False):return (x-(.12 if target else -.22))**2+(1.8 if target else .6)*(y-(-.2 if target else .12))**2
def descend(p,target,count):
    result=[np.array(p,dtype=float)]
    for _ in range(count):
        x,y=result[-1];gradient=np.array([2*(x-(.12 if target else -.22)),2*(1.8 if target else .6)*(y-(-.2 if target else .12))])
        result.append(result[-1]-.16*gradient)
    return np.array(result)
COARSE=descend([-.8,.8],False,16);FINE=descend(COARSE[-1],True,16)

def preopt(m,t):
    d,bs=setup(m,'A CHEAPER START / A CAREFUL FINISH','Two analytic toy surfaces / not a DFT simulation',3,1000)
    for j,b in enumerate(bs):
        label(d,b,['Cheap model','Handoff','Target model'][j]);p=plotbox(b);axes(d,p,(-1,1),(-1,1),'coordinate 1','coordinate 2')
        cx,cy=(-.22,.12) if j==0 else (.12,-.2)
        for r in [.15,.35,.55,.8]:
            th=np.linspace(0,math.tau,100);xx=cx+r*np.cos(th);yy=cy+r*np.sin(th)/math.sqrt(.6 if j==0 else 1.8)
            # Keep contours within the illustrated domain rather than clip labels.
            if max(abs(xx))<=1 and max(abs(yy))<=1:curve(d,xx,yy,p,LINE,ylim=(-1,1))
        path=COARSE if j==0 else FINE
        curve(d,path[:,0],path[:,1],p,AMBER if j==0 else MINT,part=min(1,t*1.5+.12))
        dots(d,[cx],[cy],p,CYAN)
        if j==1:
            dots(d,[COARSE[-1,0]],[COARSE[-1,1]],p,AMBER);d.text(b[0]+12,b[1]+b[3]-10,'a guess, not the final answer',10,MUTED)
    return d

RECIPES={'runge':runge_figure,'remedies':remedies,'noise-fit':noise_fit,'meshes':meshes,'conditions':conditions,'interactions':interactions,'dimensions':dimensions,'sequential':sequential,'legendre-family':family,'orthogonality':orthogonality,'projection':projection,'boundary-modes':boundary_modes,'angular-modes':angular_modes,'born':born,'quantum-layers':quantum_layers,'matrix-cost':matrix_cost,'factor-once':factor_once,'schur-steps':schur_steps,'low-rank':low_rank,'random-sketch':random_sketch,'preopt':preopt}

def verify():
    assert MESH_ERRORS[1]<MESH_ERRORS[0]
    assert max(abs(interp(EQ,runge(EQ),EQ)-runge(EQ)))<1e-10
    assert max(abs(interp(CHEB,runge(CHEB),X)-runge(X)))<max(abs(interp(EQ,runge(EQ),X)-runge(X)))/5
    for nodes in [UNI,REF]:
        nx,ny=np.meshgrid(nodes,UNI)
        assert np.max(abs(triangular(nodes,UNI,nx,ny)-surface(nx,ny)))<1e-12
    assert np.linalg.norm(np.polynomial.polynomial.polyval(X,REG)-cubic(X))<np.linalg.norm(interp(NOISE_NODES,OBS,X)-cubic(X))
    assert np.linalg.norm(A-Q@R)<1e-12 and np.linalg.norm(A-ACC@STATES[-1]@ACC.T)<1e-11
    assert np.linalg.norm(np.tril(STATES[-1],-1))<1e-10
    gram=np.array([[np.dot(GW,leg(i,GX)*leg(j,GX))*math.sqrt((2*i+1)*(2*j+1))/2 for i in range(6)] for j in range(6)])
    assert np.linalg.norm(gram-np.eye(6))<1e-12
    assert abs(np.dot(GW,leg(1,GX)*leg(3,GX)))<1e-12
    for k in [1,2,4,8]:assert abs(np.linalg.norm(DATA-(U[:,:k]*S[:k])@VT[:k])**2-sum(S[k:]**2))<1e-10
    assert np.linalg.norm(DATA-SKETCH)/np.linalg.norm(DATA)<.1
    for xs,ys,mu,sd,score,idx in GP:
        assert np.isfinite(mu).all() and (sd>=0).all()
        assert np.min(abs(xs-GP_GRID[idx]))>.025
        assert idx==np.argmax(np.where(np.min(abs(GP_GRID[:,None]-xs[None,:]),axis=1)>.025,score,-np.inf))
    assert energy(*FINE[-1],True)<energy(*FINE[0],True)
    return {'uniformMeshRMSE':MESH_ERRORS[0],'featureAwareMeshRMSE':MESH_ERRORS[1],'normalizedGramError':float(np.linalg.norm(gram-np.eye(6))),'randomizedRelativeError':float(np.linalg.norm(DATA-SKETCH)/np.linalg.norm(DATA))}

def main(recipes=None,sheet_name='contact-sheet.png',extra_checks=None):
    recipes=RECIPES if recipes is None else recipes
    OUT.mkdir(parents=True,exist_ok=True);checks=verify()
    previous=json.loads((OUT/'manifest.json').read_text()) if (OUT/'manifest.json').exists() else {}
    manifest=previous.get('figures',{})
    sheet=Image.new('RGB',(900,math.ceil(len(recipes)/3)*190),BG);sd=ImageDraw.Draw(sheet)
    for j,(name,recipe) in enumerate(recipes.items()):
        entry={}
        for mobile in [False,True]:
            art.SCALE=.5
            suffix='-mobile' if mobile else '';still=recipe(mobile,.72);still.save_svg(name+suffix)
            frames=[];commands=[]
            for i in range(48):
                drawing=recipe(mobile,i/48)
                commands.append(drawing.svg)
                frames.append(drawing.raster().quantize(colors=32,dither=Image.Dither.NONE))
            still.raster().save(OUT/f'{name}-pixel{suffix}.png',optimize=True)
            frames[0].save(OUT/f'{name}-pixel{suffix}.gif',save_all=True,append_images=frames[1:],duration=120,loop=0,optimize=True,disposal=1)
            del frames
            # Render the exact same vector commands at 4x, antialias down to 2x.
            # This is a new rasterization of each frame, never a pixel-GIF upscale.
            art.SCALE=4
            reference=recipe(mobile,.72)
            palette=reference.im.resize((reference.w*2,reference.h*2),Image.Resampling.LANCZOS).quantize(colors=256,dither=Image.Dither.NONE)
            del reference
            crisp=[]
            for i in range(48):
                drawing=recipe(mobile,i/48)
                assert drawing.svg==commands[i],(name,mobile,i,'motion mismatch')
                crisp.append(drawing.im.resize((drawing.w*2,drawing.h*2),Image.Resampling.LANCZOS).quantize(palette=palette,dither=Image.Dither.NONE))
            crisp[0].save(OUT/f'{name}-crisp{suffix}.gif',save_all=True,append_images=crisp[1:],duration=120,loop=0,optimize=True,disposal=1)
            entry['mobile' if mobile else 'wide']={'size':[still.w,still.h],'crispSize':[still.w*2,still.h*2],'durationMs':5760,'gifBytes':(OUT/f'{name}-pixel{suffix}.gif').stat().st_size,'crispGifBytes':(OUT/f'{name}-crisp{suffix}.gif').stat().st_size,'frameContentSha256':hashlib.sha256(''.join(''.join(c) for c in commands).encode()).hexdigest()}
            del crisp,commands
        art.SCALE=.5
        manifest[name]=entry
        thumb=recipe(False,.72).raster();thumb.thumbnail((290,165),Image.Resampling.NEAREST)
        xx=j%3*300;yy=j//3*190;sheet.paste(thumb,(xx,yy+19));sd.text((xx+4,yy+3),name,fill=CYAN)
        print(name,flush=True)
    dest=ROOT/'assets/art-source/mathematics/topics';dest.mkdir(parents=True,exist_ok=True);sheet.save(dest/sheet_name)
    previous.update({'numericalChecks':checks,'figures':manifest})
    if extra_checks is not None:previous['connectionChecks']=extra_checks
    (OUT/'manifest.json').write_text(json.dumps(previous,indent=2)+'\n')
    print(json.dumps(checks,indent=2))

if __name__=='__main__':main()
