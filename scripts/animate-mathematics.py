"""Original, numerically drawn night-study banners. Offline: Python + NumPy + Pillow.

384x128 logical pixels, nearest-neighbor 3x; portrait companions keep diagrams
visible below the copy on phones. No third-party artwork or plotting code.
See docs/MATHEMATICS.md for models, interpretation, and reference links.
"""
from pathlib import Path
import json
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
OUT = ROOT / 'public/art/mathematics/v1'
SOURCE = ROOT / 'assets/art-source/mathematics/v1'
INK, WALL, SHADOW = '#080f1c', '#101c2c', '#060b14'
GRID, EDGE, MUTED = '#1c3445', '#355668', '#6f929f'
CYAN, MINT, AMBER, CORAL = '#83ced3', '#91cbb0', '#e2b875', '#c77e79'
COLORS = [INK,WALL,SHADOW,GRID,EDGE,MUTED,CYAN,MINT,AMBER,CORAL,
          '#162638','#243e50','#446776','#a8d9d8','#c9e3d6','#57463c',
          '#947045','#b48c58','#263b40','#47665a','#243343','#344354',
          '#5c7584','#1b2538','#324c62','#51768e','#738caa','#b1b9ce',
          '#312d3b','#61434a','#8a5960','#b68280']
PALETTE = Image.new('P',(1,1))
PALETTE.putpalette([v for c in COLORS for v in bytes.fromhex(c[1:])] + [0]*(768-3*len(COLORS)))
FONT = ImageFont.truetype('/System/Library/Fonts/Menlo.ttc', 8)
NAMES = ['interpolation','legendre','matrices','algebra','lorenz','fourier']
COUNT, MS = 160, 100

def text(d, xy, value, color=MUTED):
    # Monochrome glyphs keep the same pixel size as the artwork.
    d.fontmode='1'
    d.text(xy,value,font=FONT,fill=color)

def runge(x): return 1/(1+25*x*x)

def interpolate(nodes, values, x):
    weights=np.array([1/np.prod(n-np.delete(nodes,j)) for j,n in enumerate(nodes)])
    result=[]
    for q in np.asarray(x):
        hit=np.flatnonzero(np.abs(q-nodes)<1e-13)
        if hit.size: result.append(values[hit[0]])
        else:
            terms=weights/(q-nodes)
            result.append(np.dot(terms,values)/sum(terms))
    return np.array(result)

def legendre(n,x):
    a=np.ones_like(x);b=x.copy()
    if n==0:return a
    for k in range(1,n):a,b=b,((2*k+1)*x*b-k*a)/(k+1)
    return b

def lorenz_rhs(p):
    x,y,z=p
    return np.array([10*(y-x),x*(28-z)-y,x*y-8*z/3])

def integrate_lorenz(dt=.005, count=18000):
    p=np.array([1.,1.,1.]); path=[]
    for i in range(count+2000):
        a=lorenz_rhs(p);b=lorenz_rhs(p+dt*a/2)
        c=lorenz_rhs(p+dt*b/2);e=lorenz_rhs(p+dt*c)
        p=p+dt*(a+2*b+2*c+e)/6
        if i>=2000:path.append(p.copy())
    return np.array(path)

# A nonsymmetric matrix with distinct real eigenvalues, chosen for a readable
# real triangular Schur example. General real Schur forms may have 2x2 blocks.
Z0,_=np.linalg.qr(np.array([[1.,2,3],[3,1,2],[2,3,1]]))
T0=np.array([[5.,1.2,-.5],[0,2.,.8],[0,0,.7]])
A=Z0@T0@Z0.T
Q,R=np.linalg.qr(A)
QR_STATES=[A.copy()]; SCHUR_Z=np.eye(3)
for _ in range(48):
    q,r=np.linalg.qr(QR_STATES[-1]);QR_STATES.append(r@q);SCHUR_Z=SCHUR_Z@q
LORENZ=integrate_lorenz()
X=np.linspace(-1,1,181)
EQ=np.linspace(-1,1,11);CHEB=-np.cos(np.arange(11)*np.pi/10)
UNIFORM=interpolate(EQ,runge(EQ),X);CLUSTERED=interpolate(CHEB,runge(CHEB),X)
TIME=np.arange(512)/512
FID=sum(a*np.exp(-3*TIME)*np.cos(2*np.pi*f*TIME) for a,f in [(1,12),(.65,28),(.4,47)])
FFT=np.abs(np.fft.rfft(FID));FFT=FFT/FFT.max()
RECONSTRUCTED=np.fft.irfft(np.fft.rfft(FID),n=len(FID))

def axes(d,box,ylim=(-1.1,1.1)):
    x0,y0,x1,y1=box
    for x in np.linspace(x0,x1,9):d.line((int(x),y0,int(x),y1),fill=GRID)
    for y in np.linspace(y0,y1,5):d.line((x0,int(y),x1,int(y)),fill=GRID)
    zero=y1-(0-ylim[0])/(ylim[1]-ylim[0])*(y1-y0)
    d.line((x0,round(zero),x1,round(zero)),fill=EDGE)
    d.line(((x0+x1)//2,y0,(x0+x1)//2,y1),fill=EDGE)

def points(x,y,box,ylim=(-1.1,1.1)):
    x0,y0,x1,y1=box
    return [(round(x0+(u+1)/2*(x1-x0)),round(y1-(v-ylim[0])/(ylim[1]-ylim[0])*(y1-y0))) for u,v in zip(x,y)]

def curve(d,x,y,box,color,portion=1,ylim=(-1.1,1.1)):
    p=points(x,y,box,ylim)
    if len(p)>1:d.line(p[:max(2,round(len(p)*portion))],fill=color,width=1)

def matrix(d,mat,x,y,label):
    text(d,(x+7,y-12),label,CYAN)
    for i in range(3):
        for j in range(3):
            v=mat[i,j]; shade=min(4,int(abs(v)/5*4+.5))
            col=([GRID,EDGE,MUTED,CYAN,'#c9e3d6'] if v>=0 else [GRID,'#61434a','#8a5960',CORAL,'#b68280'])[shade]
            d.rectangle((x+j*11,y+i*11,x+j*11+8,y+i*11+8),fill=col)
            if abs(v)<1e-6:d.point((x+j*11+4,y+i*11+4),fill=MUTED)
    d.line((x-3,y-2,x-5,y-2,x-5,y+32,x-3,y+32),fill=EDGE)
    d.line((x+32,y-2,x+34,y-2,x+34,y+32,x+32,y+32),fill=EDGE)

def diagram(name,i):
    im=Image.new('RGB',(194,96),INK);d=ImageDraw.Draw(im);t=i/COUNT
    d.rectangle((0,0,193,95),outline=EDGE)
    d.line((1,13,192,13),fill=GRID)
    text(d,(7,2),{'interpolation':'01 / MIND THE EDGES','legendre':'02 / A FAMILY OF CURVES','matrices':'03 / CHANGE OF COORDINATES','algebra':'04 / PATTERNS INTO RULES','lorenz':'05 / LORENZ, 1963','fourier':'06 / LISTEN TO THE SIGNAL'}[name],CYAN)
    box=(10,23,183,76)
    if name=='interpolation':
        cheb=t>=.5;nodes=CHEB if cheb else EQ; y=CLUSTERED if cheb else UNIFORM
        axes(d,box,(-.5,2.1));curve(d,X,runge(X),box,MUTED,ylim=(-.5,2.1))
        curve(d,X,y,box,MINT if cheb else AMBER,min(1,(t%.5)/.25),(-.5,2.1))
        for x,y in points(nodes,runge(nodes),box,(-.5,2.1)):d.rectangle((x-1,y-1,x+1,y+1),fill=CYAN)
        text(d,(9,82),'CHEBYSHEV NODES' if cheb else 'EQUAL SPACING / DEGREE 10',MINT if cheb else AMBER)
    elif name=='legendre':
        if t<.55:
            axes(d,box)
            for n,col in enumerate([CYAN,AMBER,MINT,CORAL,'#738caa','#c9e3d6']):
                start=n*.065
                if t>=start:curve(d,X,legendre(n,X),box,col,min(1,(t-start)/.15))
            text(d,(9,82),'P0  P1  P2  P3  P4  P5',MINT)
        elif t<.79:
            axes(d,box,(-.45,.45));prod=legendre(2,X)*legendre(3,X)
            p=points(X,prod,box,(-.45,.45));zero=round((23+76)/2)
            for (x,y),v in zip(p,prod):d.line((x,zero,x,y),fill='#47665a' if v>=0 else '#61434a')
            curve(d,X,prod,box,CYAN,ylim=(-.45,.45))
            text(d,(9,82),'INTEGRAL P2 * P3 = 0',AMBER)
        else:
            theta=np.linspace(0,math.tau,240);p=legendre(2,np.cos(theta));r=abs(p)*29
            for n in range(len(theta)-1):
                a=(round(95+r[n]*math.sin(theta[n])),round(49-r[n]*math.cos(theta[n])))
                b=(round(95+r[n+1]*math.sin(theta[n+1])),round(49-r[n+1]*math.cos(theta[n+1])))
                d.line((*a,*b),fill=MINT if p[n]>=0 else CORAL)
            text(d,(9,82),'QUANTUM ANGULAR MODE / m=0',AMBER)
    elif name=='matrices':
        if t<.43:
            matrix(d,A,14,37,'A');text(d,(52,47),'=',AMBER)
            matrix(d,Q,73,37,'Q');matrix(d,R,137,37,'R')
            text(d,(117,47),'*',AMBER);text(d,(8,82),'A = Q R / Q^T Q = I',MINT)
        else:
            step=min(48,int((t-.43)/.48*48));cur=QR_STATES[step]
            matrix(d,cur,25,35,'T_k');matrix(d,QR_STATES[-1],131,35,'T')
            text(d,(75,46),'-->',AMBER);text(d,(78,59),f'k={step}',MUTED)
            text(d,(8,82),'QR STEPS / A = Z T Z^T',MINT)
    elif name=='algebra':
        if t<.43:
            turns=t/.1075
            angle=(math.floor(turns)+min(1,(turns%1)/.65))*math.pi/2
            for xx in [-1,1]:
                for yy in [-1,1]:
                    cx=97+xx*23;cy=48+yy*23
                    d.rectangle((cx-2,cy-2,cx+2,cy+2),fill=GRID)
            verts=[]
            for n in range(4):
                a=math.pi/4+math.pi*n/2+angle
                verts.append((97+round(32*math.cos(a)),48+round(32*math.sin(a))))
            d.line(verts+[verts[0]],fill=CYAN,width=1)
            for n,(x,y) in enumerate(verts):d.rectangle((x-2,y-2,x+2,y+2),fill=AMBER if n==0 else MINT)
            text(d,(9,82),'SQUARE SYMMETRY / D4',AMBER)
        else:
            axes(d,(20,21,80,81))
            d.ellipse((26,27,74,75),outline=CYAN)
            d.line((22,79,78,23),fill=AMBER)
            for sign in [-1,1]:
                x=round(50+sign*24/math.sqrt(2));y=round(51-sign*24/math.sqrt(2))
                d.rectangle((x-1,y-1,x+1,y+1),fill=MINT)
            text(d,(97,27),'Q[x,y]',CYAN)
            if t<.68:
                text(d,(97,43),'x^2+y^2-1',MINT);text(d,(97,56),'x-y',AMBER)
                text(d,(9,82),'POLYNOMIAL IDEAL / SAME ZEROS',MINT)
            else:
                text(d,(97,40),'x-y',AMBER);text(d,(97,53),'y^2-1/2',MINT)
                text(d,(97,67),'lex x > y',MUTED)
                text(d,(9,82),'GROEBNER BASIS / ELIMINATE x',MINT)
    elif name=='lorenz':
        # x-z projection of actual RK4 samples; growing history + a moving head.
        pts=[(round(97+p[0]*4),round(79-p[2]*1.25)) for p in LORENZ]
        end=min(len(pts)-1,400+int(t*(len(pts)-401)))
        d.line(pts[:end:3],fill=GRID)
        start=max(0,end-900)
        d.line(pts[start:end],fill=CYAN)
        d.line(pts[max(start,end-80):end+1],fill=AMBER)
        x,y=pts[end];d.rectangle((x-1,y-1,x+1,y+1),fill='#c9e3d6')
        eq=math.sqrt(8/3*27)
        for xx in [-eq,eq]:
            x=round(97+xx*4);y=round(79-27*1.25)
            d.line((x-2,y,x+2,y),fill=CORAL);d.line((x,y-2,x,y+2),fill=CORAL)
        text(d,(9,82),'THREE ODEs / TWO WINGS',MINT)
    elif name=='fourier':
        if t<.35:
            axes(d,box,(-2.1,2.1))
            curve(d,np.linspace(-1,1,512),FID,box,CYAN,min(1,t/.24),(-2.1,2.1))
            text(d,(9,82),'SYNTHETIC NMR FID / TIME',MINT)
        elif t<.65:
            axes(d,box,(0,1.1))
            curve(d,np.linspace(-1,1,81),FFT[:81],box,AMBER,min(1,(t-.35)/.2),(0,1.1))
            text(d,(9,82),'FFT / FREQUENCY PEAKS',MINT)
        elif t<.87:
            # Exact inverse reconstruction from the complex FFT, with components.
            xx=np.linspace(-1,1,181);tt=(xx+1)/2
            for row,(a,f,col) in enumerate([(1,12,CYAN),(.65,28,MINT),(.4,47,AMBER)]):
                yy=a*np.exp(-3*tt)*np.cos(2*np.pi*f*tt)
                curve(d,xx,yy,(12,22+row*19,181,37+row*19),col)
            text(d,(9,82),'SINES ADD UP / INVERSE VIEW',MINT)
        else:
            axes(d,box,(-2.1,2.1))
            curve(d,np.linspace(-1,1,512),RECONSTRUCTED,box,MINT,ylim=(-2.1,2.1))
            text(d,(9,82),'iFFT / BACK TO THE SIGNAL',AMBER)
    return im

def room(display,i,mobile=False):
    w,h=(256,224) if mobile else (384,128)
    im=Image.new('RGB',(w,h),INK);d=ImageDraw.Draw(im)
    # Quiet midnight wall, a little moonlit window, and an amber reading lamp.
    floor=211 if mobile else 113
    d.rectangle((0,floor,w,h),fill=WALL);d.line((0,floor,w,floor),fill=EDGE)
    wx=219 if mobile else 348
    d.rectangle((wx,0,wx+30,47),fill=WALL,outline=GRID)
    d.rectangle((wx+3,3,wx+27,42),fill='#162638')
    d.ellipse((wx+16,8,wx+24,16),fill=MUTED);d.ellipse((wx+19,6,wx+26,14),fill='#162638')
    for x,y in [(5,17),(14,29),(25,32)]:d.point((wx+x,y),fill=EDGE)
    if mobile:
        im.paste(display,(31,105));lx=12;ly=176
    else:
        im.paste(display,(181,10));lx=159;ly=77
    d.line((lx,ly+31,lx+5,ly+31,lx+5,ly+4,lx+11,ly-3),fill=EDGE,width=2)
    d.polygon([(lx+7,ly-4),(lx+17,ly-4),(lx+22,ly+4),(lx+3,ly+4)],fill='#947045')
    d.line((lx+5,ly+4,lx+19,ly+4),fill=AMBER)
    d.rectangle((lx-3,ly+33,lx+13,ly+35),fill=GRID)
    # Books and a pencil stay on the desk; no texture finer than one logical pixel.
    bx=228 if mobile else 331
    for j,col in enumerate([EDGE,'#57463c',GRID]):
        d.rectangle((bx,floor-4-j*3,bx+22-j*2,floor-2-j*3),fill=col)
    d.line((bx-19,floor-1,bx-5,floor-4),fill=AMBER)
    if not mobile:
        d.rectangle((240,108,315,110),fill=GRID);d.line((247,109,307,109),fill=EDGE)
    return im.quantize(palette=PALETTE,dither=Image.Dither.NONE).resize((w*3,h*3),Image.Resampling.NEAREST)

def verify():
    dense=np.linspace(-1,1,2001)
    a=max(abs(interpolate(EQ,runge(EQ),dense)-runge(dense)))
    b=max(abs(interpolate(CHEB,runge(CHEB),dense)-runge(dense)))
    assert b<a/5
    xx,ww=np.polynomial.legendre.leggauss(16)
    gram=np.array([[sum(ww*legendre(m,xx)*legendre(n,xx)) for n in range(6)] for m in range(6)])
    assert np.max(abs(gram-np.diag([2/(2*n+1) for n in range(6)])))<1e-12
    assert np.linalg.norm(A-Q@R)<1e-12 and np.linalg.norm(Q.T@Q-np.eye(3))<1e-12
    assert np.linalg.norm(A-SCHUR_Z@QR_STATES[-1]@SCHUR_Z.T)<1e-11
    assert np.linalg.norm(np.tril(QR_STATES[-1],-1))<1e-11
    assert np.isfinite(LORENZ).all() and abs(LORENZ).max()<60
    eq=math.sqrt(72)
    for p in [(0,0,0),(eq,eq,27),(-eq,-eq,27)]:assert np.linalg.norm(lorenz_rhs(p))<1e-12
    assert np.max(abs(np.fft.irfft(np.fft.rfft(FID),n=len(FID))-FID))<1e-12
    assert all(FFT[k]>FFT[k-1] and FFT[k]>FFT[k+1] for k in [12,28,47])
    # Ideal equality: f=x²+y²-1=(x+y)(x-y)+2(y²-1/2).
    # The two monic leading terms x and y² are coprime: a Groebner basis (lex x>y).
    for x,y in [(.3,.7),(-1.2,2),(0,0)]:
        assert abs(x*x+y*y-1-((x+y)*(x-y)+2*(y*y-.5)))<1e-12
    return {'rungeMaxError':a,'chebyshevMaxError':b,'legendreGramError':float(np.max(abs(gram-np.diag([2/(2*n+1) for n in range(6)])))), 'schurResidual':float(np.linalg.norm(A-SCHUR_Z@QR_STATES[-1]@SCHUR_Z.T))}

def main():
    OUT.mkdir(parents=True,exist_ok=True);SOURCE.mkdir(parents=True,exist_ok=True)
    manifest={'numericalChecks':verify(),'scenes':{}}
    sheet=Image.new('RGB',(768,450),INK);sd=ImageDraw.Draw(sheet)
    for n,name in enumerate(NAMES):
        displays=[diagram(name,i) for i in range(COUNT)]
        still_index={'interpolation':64,'legendre':80,'matrices':140,'algebra':130,'lorenz':100,'fourier':96}[name]
        displays[still_index].resize((582,288),Image.Resampling.NEAREST).save(OUT/f'{name}-study.png',optimize=True)
        # The trajectory is not periodic: fade the display at the reset rather
        # than joining unrelated endpoints and implying a closed orbit.
        if name=='lorenz':
            displays=[Image.blend(Image.new('RGB',im.size,INK),im,min(1,i/4,(COUNT-1-i)/4)) for i,im in enumerate(displays)]
        for mobile in [False,True]:
            suffix='-mobile' if mobile else ''
            frames=[room(display,i,mobile) for i,display in enumerate(displays)]
            frames[still_index].convert('RGB').save(OUT/f'{name}{suffix}.png',optimize=True)
            frames[0].save(OUT/f'{name}{suffix}.gif',save_all=True,append_images=frames[1:],duration=MS,loop=0,optimize=True,disposal=1)
        manifest['scenes'][name]={'logicalSize':[384,128],'mobileLogicalSize':[256,224],'durationMs':COUNT*MS,'frames':COUNT,'gifBytes':(OUT/f'{name}.gif').stat().st_size}
        x=n%2*384;y=n//2*150
        text(sd,(x+8,y+2),name,CYAN)
        sheet.paste(Image.open(OUT/f'{name}.png').resize((384,128),Image.Resampling.NEAREST),(x,y+18))
    sheet.save(SOURCE/'contact-sheet.png')
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps(manifest,indent=2))

if __name__=='__main__':main()
