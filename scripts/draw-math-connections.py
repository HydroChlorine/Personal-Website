"""Original symmetry, dynamics, and Fourier illustrations; all data are synthetic.

Uses the existing paired pixel/crisp pipeline. No third-party art or code copied.
Run after draw-math-topics.py; the shared manifest retains both sets of recipes.
"""
from pathlib import Path
import importlib.util
import math
import textwrap
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('math_topics',ROOT/'scripts/draw-math-topics.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
CYAN,MINT,AMBER,CORAL,LINE,BG,MUTED,TEXT=c.CYAN,c.MINT,c.AMBER,c.CORAL,c.LINE,c.BG,c.MUTED,c.TEXT
curve,dots,axes,label=c.curve,c.dots,c.axes,c.label

def setup(m,title,subtitle,n=2,mh=1000,wh=600):return c.setup(m,title,subtitle,n,mh,wh)
def pb(b,footer=True):
    x,y,w,h=b;return x+43,y+64,x+w-18,y+h-(100 if footer else 55)
def status(d,b,text,col=AMBER):
    # Reserve a separate footer band, sized for the larger pixel glyphs too.
    width=max(1,int((b[2]-28)/(c.art.font(8).getlength('M')*2)))
    lines=textwrap.wrap(text,width)
    assert len(lines)<=2,(text,width)
    for i,line in enumerate(lines):d.text(b[0]+14,b[1]+b[3]-(26 if len(lines)==2 else 18)+i*16,line,12,col)
def dot3(d,b,p,col=CYAN,size=9):
    x,y,w,h=b;xx,yy,zz=p
    pt=(x+w/2+(xx+.4*zz)*w*.16,y+h*.45+(-yy+.25*zz)*h*.15)
    d.dot(*pt,col,size);return pt
def line3(d,b,a,z,col=LINE):
    x,y,w,h=b
    def pr(p):return x+w/2+(p[0]+.4*p[2])*w*.16,y+h*.45+(-p[1]+.25*p[2])*h*.15
    d.path([pr(a),pr(z)],col,2)

R=np.array([[0,-1],[1,0]],dtype=int);M=np.diag([1,-1])
OPS=[np.linalg.matrix_power(R,k) for k in range(4)]+[M@np.linalg.matrix_power(R,k) for k in range(4)]
CAYLEY=np.array([[next(k for k,q in enumerate(OPS) if np.array_equal(a@b,q)) for b in OPS] for a in OPS])
SQUARE=np.array([[-1,-1],[1,-1],[1,1],[-1,1]])
TETRA=np.array([[1,1,1],[1,-1,-1],[-1,1,-1],[-1,-1,1]],dtype=float)
def orientation(v):return np.linalg.det(np.stack([v[i]-v[3] for i in range(3)],axis=1))
def tetra(d,b,verts):
    for i in range(4):
        for j in range(i):line3(d,b,verts[i],verts[j])
    for i,p in enumerate(verts):
        x,y=dot3(d,b,p,[CYAN,AMBER,MINT,CORAL][i]);d.text(x+9,y-8,chr(65+i),14,TEXT)

def d4_actions(m,t):
    d,bs=setup(m,'LET THE MOVES BECOME THE OBJECTS','D4 composition / a marker tracks one vertex')
    k=min(7,int(t*8));b=bs[0];label(d,b,'A move of the square');x,y,w,h=b
    transformed=SQUARE@OPS[k].T;pts=[(x+w/2+p[0]*w*.24,y+h*.43+p[1]*h*.22) for p in transformed]
    d.path(pts+[pts[0]],CYAN,3)
    for j,p in enumerate(pts):d.dot(*p,AMBER if j==0 else MINT,10)
    status(d,b,f'move {k}: '+(['I','R','R^2','R^3','M','MR','MR^2','MR^3'][k]))
    b=bs[1];label(d,b,'Composition table');x,y,w,h=b;side=min(w-80,h-105)/8
    for i in range(8):
        d.text(x+33+i*side+side/2,y+53,str(i),11,MUTED,'middle')
        for j in range(8):
            xx=x+33+j*side;yy=y+63+i*side
            d.rect(xx,yy,side-2,side-2,AMBER if i==k and j==1 else c.shade(CAYLEY[i,j]/8),LINE)
    status(d,b,f'{k} after R = move {CAYLEY[k,1]}')
    return d

def symmetry_elements(m,t):
    d,bs=setup(m,'AXIS / PLANE / CENTER','Elements locate the corresponding operations',3,1300)
    p=np.array([.65,.4,.6]);u=min(1,t*1.5)
    for j,b in enumerate(bs):
        label(d,b,['C2 about z','sigma: xy mirror','i: inversion'][j])
        for v in np.eye(3)*1.3:line3(d,b,-v,v,LINE)
        if j==0:
            line3(d,b,[0,0,-1.3],[0,0,1.3],MINT)
            a=math.pi*u;q=np.array([p[0]*math.cos(a)-p[1]*math.sin(a),p[0]*math.sin(a)+p[1]*math.cos(a),p[2]])
        elif j==1:
            corners=[[-1,-1,0],[1,-1,0],[1,1,0],[-1,1,0]]
            for k in range(4):line3(d,b,corners[k],corners[(k+1)%4],MINT)
            q=p*np.array([1,1,1-2*u])
        else:
            dot3(d,b,[0,0,0],AMBER,7);q=p*(1-2*u)
        dot3(d,b,p,LINE,7);line3(d,b,p,q,AMBER);dot3(d,b,q,CYAN)
        status(d,b,['(-x, -y, z)','(x, y, -z)','(-x, -y, -z)'][j],MINT)
    return d

def crystal_tiles(m,t):
    d,bs=setup(m,'A CRYSTAL ADDS TRANSLATIONS','A toy square lattice and an affine operation')
    b=bs[0];label(d,b,'Repeat the motif');x,y,w,h=b;k=min(8,int(t*9))
    for i in range(3):
        for j in range(3):
            xx=x+38+i*(w-60)/3;yy=y+68+j*(h-135)/3;col=AMBER if i+3*j==k else CYAN
            d.rect(xx,yy,36,26,BG,LINE);d.dot(xx+9,yy+9,col,7);d.dot(xx+26,yy+18,MINT,5)
    status(d,b,'same motif / shifted cell')
    b=bs[1];label(d,b,'x\u2032 = R x + translation');p=pb(b);axes(d,p,(-1,2),(-1,2),'x','y')
    a=np.array([.2,.3]);z=R@a+np.array([1.,0]);u=min(1,t*1.5);q=a*(1-u)+z*u
    dots(d,[a[0]],[a[1]],p,LINE,(-1,2),(-1,2));dots(d,[q[0]],[q[1]],p,AMBER,(-1,2),(-1,2))
    status(d,b,'R: quarter turn / t=(1,0)')
    return d

def polynomial_invariants(m,t):
    d,bs=setup(m,'THE POINT MOVES / THE RULE STAYS','Invariant polynomials under square symmetries')
    k=min(7,int(t*8));p=OPS[k]@np.array([.8,.3]);b=bs[0];label(d,b,'A symmetry orbit');box=pb(b);axes(d,box,(-1,1),(-1,1),'x','y')
    for q in OPS:
        z=q@np.array([.8,.3]);dots(d,[z[0]],[z[1]],box,LINE)
    dots(d,[p[0]],[p[1]],box,AMBER);status(d,b,f'x={p[0]: .2f}, y={p[1]: .2f}')
    b=bs[1];label(d,b,'Two unchanged values');x,y,w,h=b
    for i,(txt,val) in enumerate([('x^2+y^2',sum(p*p)),('x^2 y^2',np.prod(p*p))]):
        yy=y+90+i*110;d.text(x+24,yy,txt,18,CYAN);d.rect(x+24,yy+20,(w-55)*val,22,MINT,LINE);d.text(x+24,yy+68,f'{val:.4f}',16,TEXT)
    return d

def orientation_figure(m,t):
    d,bs=setup(m,'A TURN DOES NOT CHANGE HANDEDNESS','Four distinct labels / a signed tetrahedral volume')
    a=t*math.tau;rot=np.array([[math.cos(a),-math.sin(a),0],[math.sin(a),math.cos(a),0],[0,0,1]])
    for j,b in enumerate(bs):
        q=TETRA@rot.T
        if j:q=q@np.diag([-1,1,1])
        label(d,b,'Proper rotation' if j==0 else 'Mirror image');tetra(d,b,q)
        status(d,b,f'orientation sign: {int(np.sign(orientation(q))):+d}',MINT if j==0 else CORAL)
    return d

def sn2_inversion(m,t):
    d,bs=setup(m,'AN INVERSION IS NOT JUST A TURN','A geometric cartoon / not a reaction-path calculation')
    u=min(1,t*1.5);q=math.cos(math.pi*u);b=bs[0];label(d,b,'The umbrella reverses');x,y,w,h=b;cx=x+w/2;cy=y+h*.44
    d.dot(cx,cy,CYAN,13);d.text(cx-5,cy-16,'C',16,TEXT)
    for j in range(3):
        a=j*math.tau/3;dx=math.cos(a)*w*.25;dy=math.sin(a)*h*.14+q*25
        d.path([(cx,cy),(cx+dx,cy+dy)],MINT,3);d.dot(cx+dx,cy+dy,MINT,9)
    # The umbrella height reverses vertically: attack must share that axis.
    # Nu approaches from below; LG departs above the three spectator bonds.
    nu_y=cy+118-u*45;lg_y=cy-65-u*38
    d.dot(cx,nu_y,AMBER,10);d.text(cx+14,nu_y+5,'Nu',18,AMBER)
    d.dot(cx,lg_y,CORAL,10);d.text(cx+14,lg_y+5,'LG',18,CORAL)
    d.path([(cx,nu_y-8),(cx,cy+12)],AMBER,2,dashed=u<.67)
    d.path([(cx,cy-12),(cx,lg_y+8)],CORAL,2,dashed=u>.33)
    status(d,b,'bond formation + bond breaking')
    b=bs[1];label(d,b,'An orientation coordinate');box=pb(b);axes(d,box,(0,1),(-1.1,1.1),'reaction cartoon','umbrella height')
    uu=np.linspace(0,1,151);curve(d,uu,np.cos(np.pi*uu),box,CYAN,(0,1),(-1.1,1.1));dots(d,[u],[q],box,AMBER,(0,1),(-1.1,1.1));status(d,b,'R/S must be reassigned')
    return d

def nonlinear_ee(m,t):
    d,bs=setup(m,'A SMALL BIAS / A NONLINEAR RESPONSE','One toy active-pair model, not measured data')
    ee=.8*math.sin(t*math.tau);out=2*ee/(1+ee*ee);b=bs[0];label(d,b,'Which pairs are active?');x,y,w,h=b
    for j,(txt,cols) in enumerate([('++ active',[CYAN,CYAN]),('-- active',[CORAL,CORAL]),('+- inactive',[CYAN,CORAL])]):
        yy=y+85+j*85
        for k,col in enumerate(cols):d.dot(x+42+k*27,yy,col,18)
        d.text(x+100,yy+6,txt,16,TEXT)
    status(d,b,'plus/minus = placeholder hands')
    b=bs[1];label(d,b,'Input ee -> output ee');box=pb(b);axes(d,box,(-1,1),(-1,1),'input excess','product excess');z=np.linspace(-1,1,201)
    curve(d,z,z,box,LINE);curve(d,z,2*z/(1+z*z),box,CYAN);dots(d,[ee],[out],box,AMBER);status(d,b,f'{ee:+.2f} -> {out:+.2f}')
    return d

def rk4(rhs,p0,dt,duration):
    out=np.empty((round(duration/dt)+1,len(p0)));out[0]=p0
    for i in range(len(out)-1):
        p=out[i];a=rhs(p);b=rhs(p+dt*a/2);z=rhs(p+dt*b/2);q=rhs(p+dt*z)
        out[i+1]=p+dt*(a+2*b+2*z+q)/6
    return out
def lorenz(p):
    x,y,z=p;return np.array([10*(y-x),x*(28-z)-y,x*y-8*z/3])
L0=rk4(lorenz,[1,1,1],.005,40);L1=rk4(lorenz,[1.000001,1,1],.005,40)
LT=np.linspace(0,40,len(L0));SEP=np.linalg.norm(L0-L1,axis=1)
REFERENCE=rk4(lorenz,[1,1,1],.0025,40)[::8]
STEPS=[.02,.01,.005]
ERRORS=[np.linalg.norm(rk4(lorenz,[1,1,1],dt,40)[::round(.02/dt)]-REFERENCE,axis=1) for dt in STEPS]
ET=np.linspace(0,40,len(REFERENCE))
PARTICLES=np.random.default_rng(21).random((36,2));VELOCITY=np.random.default_rng(22).uniform(-.1,.1,(36,2))
def chiral_rhs(p):
    l,d=p;return np.array([l*(1-l-3*d),d*(1-d-3*l)])
CHIRAL=rk4(chiral_rhs,[.501,.499],.01,30);CT=np.linspace(0,30,len(CHIRAL));CQ=(CHIRAL[:,0]-CHIRAL[:,1])/CHIRAL.sum(axis=1)

def falling_apple(m,t):
    d,bs=setup(m,'ONE RULE / AN APPLE FALLS','Constant gravity, no drag, stop at impact')
    end=math.sqrt(20/9.81);now=min(1,t*1.2)*end;hh=max(0,10-9.81*now*now/2)
    b=bs[0];label(d,b,'Height h / velocity v');x,y,w,h=b;floor=y+h-80
    d.path([(x+30,floor),(x+w-30,floor)],LINE,3);cx=x+w/2;cy=floor-hh/10*(h-140)
    d.rect(cx-12,cy-10,24,20,CORAL,CORAL);d.path([(cx,cy-10),(cx+2,cy-20),(cx+12,cy-22)],MINT,3)
    status(d,b,f'h={hh:.2f} m / v={-9.81*now:.2f}')
    b=bs[1];label(d,b,'The same computed fall');p=pb(b);axes(d,p,(0,1.5),(0,11),'seconds','height / m');xx=np.linspace(0,end,151)
    curve(d,xx,10-9.81*xx*xx/2,p,CYAN,(0,1.5),(0,11),part=now/end);dots(d,[now],[hh],p,AMBER,(0,1.5),(0,11));status(d,b,'no prediction past impact')
    return d

def logistic_orbits(m,t):
    d,bs=setup(m,'ONE STATE / DIFFERENT LONG-TERM RULES','A discrete map: x_next = r x (1-x)',3,1300)
    for b,r,title in zip(bs,[2.7,3.3,3.9],['A fixed point','A two-cycle','An irregular orbit']):
        label(d,b,title);z=.23
        for _ in range(400):z=r*z*(1-z)
        vals=[]
        for _ in range(61):vals.append(z);z=r*z*(1-z)
        p=pb(b);axes(d,p,(0,60),(0,1),'update','state x');curve(d,np.arange(61),vals,p,CYAN,(0,60),(0,1),part=min(1,t*1.5+.05));status(d,b,f'r={r:.1f}')
    return d

def lorenz_neighbors(m,t):
    d,bs=setup(m,'CLOSE AT FIRST / FARTHER APART LATER','Two trajectories / an initial x difference of 1e-6')
    n=max(30,int(t*(len(L0)-1)));b=bs[0];label(d,b,'Two evolving trajectories');p=pb(b);axes(d,p,(-25,25),(0,55),'x','z')
    for vals,col in [(L0,CYAN),(L1,CORAL)]:
        curve(d,vals[:n:6,0],vals[:n:6,2],p,col,(-25,25),(0,55));dots(d,[vals[n,0]],[vals[n,2]],p,col,(-25,25),(0,55))
    status(d,b,f't={LT[n]:.1f} / accelerated clock')
    b=bs[1];label(d,b,'Separation on a log scale');p=pb(b);axes(d,p,(0,40),(-7,2),'time','log10 separation')
    curve(d,LT[::16],np.log10(np.maximum(SEP[::16],1e-7)),p,AMBER,(0,40),(-7,2),part=t);status(d,b,'bounded paths / finite horizon')
    return d

def numerical_horizon(m,t):
    d,bs=setup(m,'REFINE THE STEP / CHECK THE HORIZON','RK4 compared with a finer numerical reference')
    for j,b in enumerate(bs):
        label(d,b,'Early-time convergence' if j==0 else 'Long-time separation');p=pb(b);end=2 if j==0 else 40;axes(d,p,(0,end),(-13,2),'time','log10 error norm')
        for err,col in zip(ERRORS,[CORAL,AMBER,CYAN]):
            sel=ET<=end;curve(d,ET[sel][::2],np.log10(np.maximum(err[sel][::2],1e-13)),p,col,(0,end),(-13,2),part=min(1,t*1.5+.03))
        status(d,b,'dt: .02 coral / .01 gold / .005 cyan')
    return d

def solver_stability(m,t):
    d,bs=setup(m,'A STABLE SYSTEM / AN UNSTABLE SOLVER','Exact equation y\u2032=-y / explicit Euler')
    for b,step in zip(bs,[.5,2.2]):
        label(d,b,f'Euler step h={step}');xx=np.arange(0,22.01,step);yy=(1-step)**np.arange(len(xx));p=pb(b);lim=(0,1.2) if step<2 else (-7,7)
        axes(d,p,(0,22),lim,'time','amplitude');dense=np.linspace(0,22,151);curve(d,dense,np.exp(-dense),p,MUTED,(0,22),lim)
        curve(d,xx,yy,p,CYAN if step<2 else CORAL,(0,22),lim,part=min(1,t*1.5+.04));status(d,b,'|1-h|<1: decay' if step<2 else '|1-h|>1: false growth')
    return d

def scale_bridge(m,t):
    d,bs=setup(m,'THE SAME PARTICLES / LESS DETAIL','A free-particle toy, not a derivation of fluid equations',3,1300)
    pos=(PARTICLES+VELOCITY*t*20)%1;hist,_,_=np.histogram2d(pos[:,0],pos[:,1],bins=6,range=[[0,1],[0,1]])
    for j,b in enumerate(bs):
        label(d,b,['Individual positions','Cell occupancy','A coarse profile'][j]);p=pb(b)
        if j==0:
            axes(d,p,(0,1),(0,1),'x','y');dots(d,pos[:,0],pos[:,1],p,CYAN,(0,1),(0,1))
        elif j==1:
            x0,y0,x1,y1=p
            for i in range(6):
                for k in range(6):d.rect(x0+i*(x1-x0)/6,y0+(5-k)*(y1-y0)/6,(x1-x0)/6-2,(y1-y0)/6-2,c.shade(hist[i,k]/6),LINE)
        else:
            axes(d,p,(0,1),(0,15),'x bin','particle count');curve(d,(np.arange(6)+.5)/6,hist.sum(axis=1),p,MINT,(0,1),(0,15))
        status(d,b,'36 particles / periodic box')
    return d

def hydrogen_family(m,t):
    d,bs=setup(m,'HYDROGEN IS THREE DIFFERENT QUESTIONS','Electronic models / distinct reference processes',3,1300)
    for j,b in enumerate(bs):
        x,y,w,h=b;label(d,b,['H+ / no electron','H / one electron','H- / two electrons'][j])
        if j==0:
            d.dot(x+w/2,y+h*.40,AMBER,16);d.text(x+w/2,y+h*.40-23,'proton',16,TEXT,'middle');d.text(x+w/2,y+h*.65,'no bound electron',13,MUTED,'middle')
        elif j==1:
            p=pb(b);axes(d,p,(0,6),(0,.65),'r / a0','radial probability');rr=np.linspace(0,6,151);curve(d,rr,4*rr*rr*np.exp(-2*rr),p,CYAN,(0,6),(0,.65),part=min(1,t*1.5+.02))
        else:
            cx=x+w/2;cy=y+h*.43
            for off,col in [(-25,CYAN),(25,CORAL)]:
                th=np.linspace(0,math.tau,100);d.path([(cx+off+65*math.cos(a),cy+80*math.sin(a)) for a in th],col,1)
            d.dot(cx,cy,AMBER,12);d.text(cx,cy+110,'coupling: +1/r12',14,TEXT,'middle')
        status(d,b,['electronic sector empty','ionize: about 13.6 eV','detach: about 0.754 eV'][j])
    return d

def chiral_bistability(m,t):
    d,bs=setup(m,'A TINY BIAS CAN CHOOSE A BRANCH','q\u2032 = 0.8 q - q^3 / a symmetry-breaking toy',3,1300)
    mu=.8;times=np.linspace(0,16,241);eps=.02;branch=np.sqrt(mu/(1+(mu/eps**2-1)*np.exp(-2*mu*times)))
    b=bs[0];label(d,b,'A symmetric potential');p=pb(b);axes(d,p,(-1.3,1.3),(-.2,.15),'imbalance q','toy potential');q=np.linspace(-1.3,1.3,201);curve(d,q,q**4/4-mu*q*q/2,p,CYAN,(-1.3,1.3),(-.2,.15));dots(d,[-math.sqrt(mu),0,math.sqrt(mu)],[-mu*mu/4,0,-mu*mu/4],p,AMBER,(-1.3,1.3),(-.2,.15));status(d,b,'two mirror-related wells')
    b=bs[1];label(d,b,'Opposite small biases');p=pb(b);axes(d,p,(0,16),(-1.1,1.1),'time','imbalance q')
    for sign,col in [(1,MINT),(-1,CORAL)]:curve(d,times,sign*branch,p,col,(0,16),(-1.1,1.1),part=min(1,t*1.5+.03))
    status(d,b,'q=0 stays exact if unperturbed')
    b=bs[2];label(d,b,'Equilibria vs parameter');p=pb(b);axes(d,p,(-.6,1),(-1.1,1.1),'parameter mu','equilibria q');u=np.linspace(0,1,100)
    curve(d,u,np.sqrt(u),p,MINT,(-.6,1),(-1.1,1.1));curve(d,u,-np.sqrt(u),p,CORAL,(-.6,1),(-1.1,1.1));curve(d,[-.6,0],[0,0],p,CYAN,(-.6,1),(-1.1,1.1));curve(d,[0,1],[0,0],p,AMBER,(-.6,1),(-1.1,1.1),dashed=True);status(d,b,'solid stable / dashed unstable')
    return d

def chiral_network(m,t):
    d,bs=setup(m,'FEEDBACK CAN AMPLIFY A PREFERENCE','Effective open competition / not a Soai mechanism')
    b=bs[0];label(d,b,'Competing populations');p=pb(b);axes(d,p,(0,30),(0,1.1),'time','population')
    for j,col in enumerate([CYAN,CORAL]):curve(d,CT[::8],CHIRAL[::8,j],p,col,(0,30),(0,1.1),part=min(1,t*1.5+.02))
    status(d,b,'L gain; D gain; cross-inhibition')
    b=bs[1];label(d,b,'Mirror initial conditions');p=pb(b);axes(d,p,(0,30),(-1.1,1.1),'time','population excess')
    for sign,col in [(1,CYAN),(-1,CORAL)]:curve(d,CT[::8],sign*CQ[::8],p,col,(0,30),(-1.1,1.1),part=min(1,t*1.5+.02))
    status(d,b,'same rules / opposite outcomes')
    return d

def fft_stages(values):
    n=len(values);bits=round(math.log2(n));rev=[int(f'{i:0{bits}b}'[::-1],2) for i in range(n)];a=np.array(values,dtype=complex)[rev];states=[a.copy()]
    size=2
    while size<=n:
        for start in range(0,n,size):
            for k in range(size//2):
                q=a[start+k];z=np.exp(-2j*np.pi*k/size)*a[start+k+size//2]
                a[start+k]=q+z;a[start+k+size//2]=q-z
        states.append(a.copy());size*=2
    return states
F8=np.cos(2*np.pi*2*np.arange(8)/8)+.5*np.cos(2*np.pi*np.arange(8)/8);FSTAGES=fft_stages(F8)
NT=np.arange(512)/512
COMPONENTS=np.array([a*np.exp(-NT/tau)*np.exp(1j*(2*np.pi*f*NT+phase)) for a,tau,f,phase in [(1,.35,12,0),(.65,.5,28,.2),(.4,.25,47,-.3)]])
FID=COMPONENTS.sum(axis=0);FREQ=np.fft.fftfreq(512,1/512);SPEC=abs(np.fft.fft(FID));SPEC/=SPEC.max()
NOISE=(np.random.default_rng(40).normal(size=(16,512))+1j*np.random.default_rng(41).normal(size=(16,512)))*(.6/math.sqrt(2))
IRK=np.arange(129);IRREF=np.exp(-((IRK-40)/45)**2)+.15;IRABS=.5*np.exp(-((IRK-28)/4)**2)+.32*np.exp(-((IRK-58)/5)**2);IRSAMPLE=IRREF*10**(-IRABS)
IR0=np.fft.irfft(IRREF,n=256);IR1=np.fft.irfft(IRSAMPLE,n=256)

def heat_modes(m,t):
    d,bs=setup(m,'BEFORE SPECTRA / THERE WAS HEAT','A finite Fourier-mode solution of the heat equation')
    x=np.linspace(0,2*np.pi,241);time=t*10;ks=np.array([1,3,7]);amps=np.array([1,.45,.25])*np.exp(-.08*ks*ks*time)
    b=bs[0];label(d,b,'A temperature variation');p=pb(b);axes(d,p,(0,2*np.pi),(-1.8,1.8),'position','relative temperature');yy=sum(a*np.sin(k*x) for a,k in zip(amps,ks));curve(d,x,yy,p,CYAN,(0,2*np.pi),(-1.8,1.8));status(d,b,f't={time:.1f} / kappa=.08')
    b=bs[1];label(d,b,'Mode amplitudes');xx,y,w,h=b
    for j,(k,a) in enumerate(zip(ks,amps)):
        base=y+h-90;hh=a*(h-160);cx=xx+50+j*(w-70)/3;d.rect(cx,base-hh,40,hh,[CYAN,AMBER,CORAL][j],LINE);d.text(cx+20,base+25,f'k={k}',14,MUTED,'middle')
    status(d,b,'fine patterns decay faster')
    return d

def roots_unity(m,t):
    d,bs=setup(m,'ROOTS OF UNITY / ROTATING QUESTIONS','Eight samples / weighted complex contributions')
    n=np.arange(8);vals=np.cos(2*np.pi*2*n/8);k=1 if t<.5 else 2;weights=vals*np.exp(-2j*np.pi*k*n/8);sums=np.r_[0,np.cumsum(weights)];j=min(8,max(1,int((t%.5)*2*11)))
    def square_plot(b):
        x0,y0,x1,y1=pb(b);side=min(x1-x0,y1-y0);cx=(x0+x1)/2;cy=(y0+y1)/2
        return cx-side/2,cy-side/2,cx+side/2,cy+side/2
    b=bs[0];label(d,b,'Eight symmetric phases');p=square_plot(b);axes(d,p,(-1.4,1.4),(-1.4,1.4),'real','imaginary');th=np.linspace(0,math.tau,151);curve(d,np.cos(th),np.sin(th),p,LINE,(-1.4,1.4),(-1.4,1.4))
    roots=np.exp(-2j*np.pi*n/8);dots(d,roots.real,roots.imag,p,CYAN,(-1.4,1.4),(-1.4,1.4));dots(d,[roots[j%8].real],[roots[j%8].imag],p,AMBER,(-1.4,1.4),(-1.4,1.4));status(d,b,f'Fourier bin k={k}')
    b=bs[1];label(d,b,'Add the weighted vectors');p=square_plot(b);axes(d,p,(-4.5,4.5),(-4.5,4.5),'real sum','imaginary sum');curve(d,sums[:j+1].real,sums[:j+1].imag,p,MINT,(-4.5,4.5),(-4.5,4.5));dots(d,[sums[j].real],[sums[j].imag],p,AMBER,(-4.5,4.5),(-4.5,4.5));status(d,b,f'{j}/8 added; |sum|={abs(sums[j]):.2f}')
    return d

def fft_butterfly(m,t):
    d,bs=setup(m,'THE SAME TRANSFORM / REUSED WORK','A computed eight-point radix-two FFT')
    b=bs[0];label(d,b,'Three butterfly stages');x,y,w,h=b;xs=np.linspace(x+38,x+w-35,4);ys=np.linspace(y+68,y+h-100,8);stage=min(2,int(t*3))
    for col in range(3):
        for i in range(8):
            for j in [i,i^(1<<col)]:d.path([(xs[col],ys[i]),(xs[col+1],ys[j])],CYAN if col==stage else LINE,1)
    for col in range(4):
        for i in range(8):d.dot(xs[col],ys[i],AMBER if col==stage+1 else MINT,6)
    status(d,b,'split / small transforms / combine')
    b=bs[1];label(d,b,'The computed output');x,y,w,h=b;out=abs(FSTAGES[-1])
    for j,a in enumerate(out):
        hh=a/4*(h-160);xx=x+30+j*(w-50)/8;d.rect(xx,y+h-85-hh,(w-50)/8-5,hh,CYAN,LINE);d.text(xx+10,y+h-60,str(j),12,MUTED,'middle')
    status(d,b,'same answer as the direct DFT')
    return d

def nmr_transform(m,t):
    d,bs=setup(m,'THE FID HIDES SEVERAL RHYTHMS','Synthetic complex receiver signal / its actual FFT',3,1300)
    for j,b in enumerate(bs):
        label(d,b,['Real receiver channel','The component signals','Frequency spectrum'][j]);p=pb(b)
        if j<2:
            axes(d,p,(0,1),(-2.1,2.1),'seconds','amplitude')
            if j==0:curve(d,NT,FID.real,p,CYAN,(0,1),(-2.1,2.1),part=min(1,t*1.5+.03))
            else:
                for vals,col in zip(COMPONENTS,[CYAN,AMBER,CORAL]):curve(d,NT,vals.real,p,col,(0,1),(-2.1,2.1),part=min(1,t*1.5+.03))
        else:
            axes(d,p,(0,80),(0,1.1),'frequency / Hz','FFT magnitude');sel=(FREQ>=0)&(FREQ<=80);curve(d,FREQ[sel],SPEC[sel],p,MINT,(0,80),(0,1.1),part=min(1,t*1.5+.03))
        status(d,b,['real part shown','three damped oscillations','complex data transformed'][j])
    return d

def ftir_transform(m,t):
    d,bs=setup(m,'PATH DIFFERENCE BECOMES A SPECTRUM','Synthetic FTIR / sample and background reference',3,1300)
    for j,b in enumerate(bs):
        label(d,b,['Two interferograms','Recovered intensities','Absorbance'][j]);p=pb(b)
        if j==0:
            delta=(np.arange(256)-128)/256;sel=abs(delta)<=.12;norm=max(abs(IR0).max(),abs(IR1).max());axes(d,p,(-.12,.12),(-.4,1.1),'normalized OPD','intensity')
            for sig,col in [(IR0,MUTED),(IR1,CYAN)]:curve(d,delta[sel],np.fft.fftshift(sig)[sel]/norm,p,col,(-.12,.12),(-.4,1.1),part=min(1,t*1.5+.05))
        elif j==1:
            axes(d,p,(8,84),(0,1.2),'wavenumber bin','intensity')
            for vals,col in [(np.fft.rfft(IR0).real,MUTED),(np.fft.rfft(IR1).real,CYAN)]:curve(d,IRK[8:85],vals[8:85],p,col,(8,84),(0,1.2),part=min(1,t*1.5+.05))
        else:
            absorb=-np.log10(abs(np.fft.rfft(IR1))/abs(np.fft.rfft(IR0)));axes(d,p,(8,84),(0,.6),'wavenumber bin','absorbance');curve(d,IRK[8:85],absorb[8:85],p,MINT,(8,84),(0,.6),part=min(1,t*1.5+.05))
        status(d,b,['path, not acquisition time','both records transformed','-log10(sample / reference)'][j])
    return d

def scans_noise(m,t):
    d,bs=setup(m,'MORE SCANS / LESS RANDOM NOISE','Fixed acquisition time / independent noisy repeats',3,1600,700)
    for b,n in zip(bs,[1,4,16]):
        label(d,b,f'Average {n} scan'+('' if n==1 else 's'));x,y,w,h=b;sig=FID+NOISE[:n].mean(axis=0);p=(x+43,y+64,x+w-18,y+154);axes(d,p,(0,.25),(-3,3),'seconds','real FID');sel=NT<=.25;curve(d,NT[sel],sig.real[sel],p,CYAN,(0,.25),(-3,3),part=min(1,t*1.5+.04))
        p=(x+43,y+220,x+w-18,y+h-100);axes(d,p,(0,80),(0,1.2),'frequency / Hz','FFT magnitude');out=abs(np.fft.fft(sig))/abs(np.fft.fft(FID)).max();sel=(FREQ>=0)&(FREQ<=80);curve(d,FREQ[sel],out[sel],p,MINT,(0,80),(0,1.2),part=min(1,t*1.5+.04));status(d,b,f'expected noise: {1/math.sqrt(n):.2f}x')
    return d

RT=1/256
def resonance(n):
    tt=np.arange(n)*RT;return np.exp(-tt/.6)*(np.exp(2j*np.pi*40*tt)+.8*np.exp(2j*np.pi*44*tt))
def resolution_padding(m,t):
    d,bs=setup(m,'MORE OBSERVATIONS / NOT JUST MORE PIXELS','Two resonances: 40 and 44 Hz',3,1300)
    for b,n,nfft,title in zip(bs,[32,32,256],[32,4096,4096],['Short record','Same record + zeros','Longer record']):
        label(d,b,title);p=pb(b);axes(d,p,(32,52),(0,1.1),'frequency / Hz','normalized magnitude');freq=np.fft.fftfreq(nfft,RT);out=abs(np.fft.fft(resonance(n),nfft));out/=out.max();sel=(freq>=32)&(freq<=52);curve(d,freq[sel],out[sel],p,CYAN,(32,52),(0,1.1),part=min(1,t*1.5+.05))
        if nfft==32:dots(d,freq[sel],out[sel],p,AMBER,(32,52),(0,1.1))
        status(d,b,f'T={n*RT:.3f}s; measured {n} points')
    return d

WT=np.arange(512)/512;TAU=.15
WN=(np.random.default_rng(51).normal(size=512)+1j*np.random.default_rng(52).normal(size=512))*.2/math.sqrt(2)
WS=np.exp(-WT/TAU)*np.exp(2j*np.pi*32*WT)+WN;WINDOW=np.exp(-WT/TAU)
def window_tradeoff(m,t):
    d,bs=setup(m,'A WINDOW CHANGES THE BARGAIN','The same noisy FID / exponential weighting')
    b=bs[0];label(d,b,'Suppress late-time data');p=pb(b);axes(d,p,(0,1),(-1.8,1.8),'seconds','real signal')
    for sig,col in [(WS,MUTED),(WS*WINDOW,CYAN)]:curve(d,WT,sig.real,p,col,(0,1),(-1.8,1.8),part=min(1,t*1.5+.04))
    status(d,b,'same data / declared weighting')
    b=bs[1];label(d,b,'A broader peak');p=pb(b);axes(d,p,(18,46),(0,1.1),'frequency / Hz','normalized magnitude');ff=np.fft.fftfreq(4096,1/512);sel=(ff>=18)&(ff<=46)
    for sig,col in [(WS,MUTED),(WS*WINDOW,CYAN)]:
        out=abs(np.fft.fft(sig,4096));out/=out.max();curve(d,ff[sel],out[sel],p,col,(18,46),(0,1.1),part=min(1,t*1.5+.04))
    status(d,b,'normalize peaks to compare shapes')
    return d

def sampling_alias(m,t):
    d,bs=setup(m,'DIFFERENT WAVES / IDENTICAL SAMPLES','8 Hz and 40 Hz, sampled at 32 Hz')
    tt=np.linspace(0,.5,801);samples=np.arange(17)/32
    b=bs[0];label(d,b,'Continuous possibilities');p=pb(b);axes(d,p,(0,.5),(-1.2,1.2),'seconds','cosine')
    for f,col in [(8,CYAN),(40,CORAL)]:curve(d,tt,np.cos(2*np.pi*f*tt),p,col,(0,.5),(-1.2,1.2),part=min(1,t*1.5+.04))
    dots(d,samples,np.cos(2*np.pi*8*samples),p,AMBER,(0,.5),(-1.2,1.2));status(d,b,'gold marks the acquired samples')
    b=bs[1];label(d,b,'Difference between waves');p=pb(b);axes(d,p,(0,.5),(-2.1,2.1),'seconds','8 Hz minus 40 Hz')
    diff=np.cos(2*np.pi*8*tt)-np.cos(2*np.pi*40*tt)
    curve(d,tt,diff,p,MINT,(0,.5),(-2.1,2.1),part=min(1,t*1.5+.04))
    sampled_diff=np.cos(2*np.pi*8*samples)-np.cos(2*np.pi*40*samples)
    dots(d,samples,sampled_diff,p,AMBER,(0,.5),(-2.1,2.1));status(d,b,'zero difference at gold samples')
    return d

RECIPES={'d4-actions':d4_actions,'symmetry-elements':symmetry_elements,'crystal-tiles':crystal_tiles,'polynomial-invariants':polynomial_invariants,'orientation':orientation_figure,'sn2-inversion':sn2_inversion,'nonlinear-ee':nonlinear_ee,'falling-apple':falling_apple,'logistic-orbits':logistic_orbits,'lorenz-neighbors':lorenz_neighbors,'numerical-horizon':numerical_horizon,'solver-stability':solver_stability,'scale-bridge':scale_bridge,'hydrogen-family':hydrogen_family,'chiral-bistability':chiral_bistability,'chiral-network':chiral_network,'heat-modes':heat_modes,'roots-unity':roots_unity,'fft-butterfly':fft_butterfly,'nmr-transform':nmr_transform,'ftir-transform':ftir_transform,'scans-and-noise':scans_noise,'resolution-padding':resolution_padding,'window-tradeoff':window_tradeoff,'sampling-alias':sampling_alias}

def verify():
    assert len(OPS)==8 and len({tuple(q.ravel()) for q in OPS})==8
    assert np.array_equal(M@R@M,np.linalg.matrix_power(R,3))
    assert np.all(np.sort(CAYLEY,axis=0)==np.arange(8)[:,None])
    v=orientation(TETRA)
    for q in OPS:
        p=q@np.array([.8,.3]);assert abs(sum(p*p)-.73)<1e-12 and abs(np.prod(p*p)-.0576)<1e-12
    assert abs(orientation(TETRA@np.diag([-1,1,1]))+v)<1e-12
    assert np.isfinite(L0).all() and np.isfinite(L1).all() and SEP[0]<1.01e-6 and max(SEP)>1
    assert ERRORS[0][50]>ERRORS[1][50]>ERRORS[2][50]>0
    assert np.min(CHIRAL)>=0 and CQ[-1]>.99
    for state in [[1,0],[0,1],[.25,.25]]:assert np.linalg.norm(chiral_rhs(np.array(state)))<1e-12
    direct=np.exp(-2j*np.pi*np.arange(8)[:,None]*np.arange(8)[None,:]/8)@F8
    assert np.max(abs(FSTAGES[-1]-direct))<1e-12
    assert np.max(abs(FSTAGES[-1]-np.fft.fft(F8)))<1e-12
    assert np.max(abs(np.fft.ifft(np.fft.fft(FID))-FID))<1e-12
    assert np.max(abs(-np.log10(abs(np.fft.rfft(IR1))/abs(np.fft.rfft(IR0)))-IRABS))<1e-12
    samples=np.arange(17)/32;assert np.max(abs(np.cos(2*np.pi*8*samples)-np.cos(2*np.pi*40*samples)))<1e-12
    return {'squareGroupSize':8,'earlyRK4Errors':[float(e[50]) for e in ERRORS],'lorenzFinalSeparation':float(SEP[-1]),'chiralFinalExcess':float(CQ[-1]),'fftDirectResidual':float(max(abs(FSTAGES[-1]-direct))),'newFigures':len(RECIPES)}

if __name__=='__main__':
    checks=verify();print(checks,flush=True)
    c.main(recipes=RECIPES,sheet_name='connections-contact-sheet.png',extra_checks=checks)
