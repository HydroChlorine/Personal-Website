"""Original CS night-desk banners. Python + NumPy + Pillow, offline authoring.

Reuses this site's original math desk/palette; all six monitor animations are
new drawings. No borrowed art, screenshots, logos, or third-party source code.
"""
from pathlib import Path
import importlib.util
import json
import math
import numpy as np
from PIL import Image, ImageDraw

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('night_desk',ROOT/'scripts/animate-mathematics.py')
desk=importlib.util.module_from_spec(spec);spec.loader.exec_module(desk)
OUT=ROOT/'public/art/computer-science/v1'
SOURCE=ROOT/'assets/art-source/computer-science/v1'
INK,WALL,GRID,EDGE,MUTED,CYAN,MINT,AMBER,CORAL=desk.INK,desk.WALL,desk.GRID,desk.EDGE,desk.MUTED,desk.CYAN,desk.MINT,desk.AMBER,desk.CORAL
text=desk.text
NAMES=['objects','logic','architecture','web','graphics','proof']
COUNT,MS=160,100
HEADERS=['01 / OBJECTS WITH A JOB','02 / LOGIC AT THE FOUNDATION','03 / REGISTERS & MEMORY','04 / A REQUEST MAKES THE ROUNDS','05 / FROM VERTICES TO PIXELS','06 / LOGIC MADE CHECKABLE']
STILLS=[110,110,105,105,60,152]

def txt(d,x,y,value,col=MUTED):
    assert x>=0 and x+desk.FONT.getlength(value)<=194,(x,value,'label overflow')
    assert 0<=y<=87,(y,value)
    text(d,(x,y),value,col)

def card(d,box,col=EDGE):d.rectangle(box,fill=WALL,outline=col)
def arrow(d,a,b,col=EDGE):
    d.line((*a,*b),fill=col)
    dx,dy=b[0]-a[0],b[1]-a[1]
    if abs(dx)>=abs(dy):
        s=1 if dx>0 else -1;d.line((b[0]-3*s,b[1]-2,*b,b[0]-3*s,b[1]+2),fill=col)
    else:
        s=1 if dy>0 else -1;d.line((b[0]-2,b[1]-3*s,*b,b[0]+2,b[1]-3*s),fill=col)
def packet(d,a,b,u,col=AMBER):
    x=round(a[0]+(b[0]-a[0])*u);y=round(a[1]+(b[1]-a[1])*u)
    d.rectangle((x-2,y-1,x+2,y+1),fill=col)

def objects(d,t):
    if t<.38:
        lines=['interface Shape {','  void draw();','}', 'Shape s = make("circle");','s.draw();']
        n=min(5,int(t/.055)+1)
        for j,line in enumerate(lines[:n]):
            limit=max(0,min(len(line),int((t-j*.055)*180)))
            txt(d,10,20+j*11,line[:limit],CYAN if j<3 else MINT)
        txt(d,10,82,'JAVA / A SHARED CONTRACT',AMBER)
    else:
        square=t>=.69
        txt(d,9,18,'make("square")' if square else 'make("circle")',CYAN)
        card(d,(10,36,75,69));txt(d,16,40,'Shape',MINT);txt(d,16,54,'draw()',MUTED)
        arrow(d,(78,52),(112,52));packet(d,(78,52),(112,52),((t-.38)/.31)%1)
        if square:d.rectangle((132,36,163,67),outline=MINT,width=2)
        else:d.ellipse((132,36,163,67),outline=CYAN,width=2)
        txt(d,9,82,'SAME CALL / DIFFERENT OBJECT',AMBER)

def logic(d,t):
    row=min(3,int(t*4));p,q=divmod(row,2);result=p&q
    txt(d,9,18,'P Q  P&Q Q&P',MUTED)
    for j in range(4):
        a,b=divmod(j,2);y=30+j*11
        if j==row:d.rectangle((7,y-1,88,y+9),fill=GRID)
        txt(d,10,y,f'{a} {b}   {a&b}   {b&a}',CYAN if j==row else MUTED)
    for y,a,b in [(31,p,q),(58,q,p)]:
        col=MINT if result else EDGE
        txt(d,99,y-4,str(a),AMBER if a else MUTED);txt(d,99,y+5,str(b),AMBER if b else MUTED)
        d.line((107,y,118,y,118,y+4),fill=EDGE);d.line((107,y+8,118,y+8,118,y+4),fill=EDGE)
        card(d,(119,y-1,145,y+11),col);txt(d,123,y,'AND',col)
        arrow(d,(146,y+4),(162,y+4),col);txt(d,168,y,str(result),MINT if result else MUTED)
    txt(d,9,82,'SWAP THE INPUTS / SAME RESULT',AMBER)

def machine_state(instruction,executed):
    # Deliberately tiny illustrative ISA, not x86/ARM/RISC-V syntax.
    r0=0 if instruction==0 and not executed else 5
    if instruction>=2 or (instruction==1 and executed):r0=6
    return r0,6 if instruction==2 and executed else 0

def architecture(d,t):
    phase=min(2,int(t*3));u=(t*3)%1;executed=u>=.58
    r0,dest=machine_state(phase,executed)
    inst=['LD R0,[0x10]','ADD R0,1','ST [0x11],R0'][phase]
    txt(d,9,18,inst,CYAN);txt(d,148,18,f'PC={phase}',AMBER)
    card(d,(8,34,103,72),EDGE);txt(d,13,37,'R0',MINT)
    bits=f'{r0:08b}'
    for j,bit in enumerate(bits):
        x=13+j*10;d.rectangle((x,51,x+7,62),fill=GRID,outline=MINT if bit=='1' else EDGE)
        txt(d,x+1,52,bit,MINT if bit=='1' else MUTED)
    card(d,(121,34,185,72),EDGE);txt(d,125,37,'MEMORY',MUTED)
    txt(d,125,49,'10: 05',AMBER);txt(d,125,61,f'11: {dest:02d}',MINT)
    if phase!=1:
        a,b=((121,69),(103,69)) if phase==0 else ((103,69),(121,69))
        arrow(d,a,b);packet(d,a,b,min(1,u/.58),CYAN)
    txt(d,9,82,'8-BIT TOY / '+('COMMIT' if executed else 'READ & EXECUTE'),AMBER)

def web(d,t):
    phase=min(3,int(t*4));u=(t*4)%1
    txt(d,9,18,['GET /notes','SELECT title FROM notes','ROW -> SERVER','200 OK / JSON'][phase],CYAN)
    for x,w,title in [(9,44,'CLIENT'),(77,43,'SERVER')]:
        card(d,(x,35,x+w,73));txt(d,x+3,38,title,MUTED)
    d.line((10,49,52,49),fill=EDGE)
    if phase==3 and u>.65:
        d.rectangle((15,55,46,58),fill=MINT);d.rectangle((15,63,38,65),fill=CYAN)
    else:
        d.rectangle((15,55,43,58),fill=GRID);d.rectangle((15,63,33,65),fill=GRID)
    for y in [54,61,68]:
        d.rectangle((82,y,114,y+2),fill=GRID);d.point((112,y+1),fill=MINT if phase in [1,2] else MUTED)
    d.rectangle((147,41,184,68),fill=WALL,outline=EDGE)
    d.ellipse((147,35,184,46),fill=WALL,outline=EDGE);d.arc((147,61,184,73),0,180,fill=EDGE)
    txt(d,155,49,'DB',MINT)
    a,b=[((54,58),(76,58)),((121,58),(146,58)),((146,63),(121,63)),((76,63),(54,63))][phase]
    arrow(d,a,b);packet(d,a,b,u,AMBER if phase<2 else MINT)
    txt(d,9,82,['REQUEST','QUERY','RESULT','RESPONSE'][phase]+' / ONE SMALL ROUND TRIP',AMBER)

VERTS=np.array([[-1,-1,-1],[1,-1,-1],[1,1,-1],[-1,1,-1],[-1,-1,1],[1,-1,1],[1,1,1],[-1,1,1]],float)
FACES=[(0,1,2,3),(4,7,6,5),(0,4,5,1),(3,2,6,7),(0,3,7,4),(1,5,6,2)]
EDGES=sorted({tuple(sorted((f[j],f[(j+1)%4]))) for f in FACES for j in range(4)})
def projected(t,cx,cy,size):
    a=t*math.tau;ca,sa=math.cos(a),math.sin(a)
    ry=np.array([[ca,0,sa],[0,1,0],[-sa,0,ca]])
    b=.35;rx=np.array([[1,0,0],[0,math.cos(b),-math.sin(b)],[0,math.sin(b),math.cos(b)]])
    points=VERTS@(rx@ry).T
    screen=[(round(cx+size*p[0]/(4+p[2])),round(cy-size*p[1]/(4+p[2]))) for p in points]
    return points,screen
def cube(d,t,cx,cy,size,filled):
    verts,screen=projected(t,cx,cy,size)
    if filled:
        # Painter's order; a convex cube needs no intersections or z buffer.
        for k in sorted(range(6),key=lambda k:np.mean(verts[list(FACES[k]),2]),reverse=True):
            face=FACES[k];a,b,c=verts[list(face[:3])]
            normal=np.cross(b-a,c-a);normal/=np.linalg.norm(normal)
            light=abs(np.dot(normal,np.array([.3,.5,-.8124])))
            col=[GRID,EDGE,MUTED,CYAN][min(3,int(light*4))]
            d.polygon([screen[j] for j in face],fill=col,outline=MINT)
    else:
        for a,b in EDGES:d.line((*screen[a],*screen[b]),fill=CYAN)
        for x,y in screen:d.point((x,y),fill=AMBER)

def graphics(d,t):
    if t<.6:
        txt(d,10,18,'MODEL',MUTED);txt(d,111,18,'PIXELS',MINT)
        for box in [(8,30,91,76),(104,30,185,76)]:card(d,box,GRID)
        cube(d,t,49,54,48,False);cube(d,t,145,54,48,True)
        txt(d,9,82,'TRANSFORM / PROJECT / RASTERIZE',AMBER)
    else:
        card(d,(8,20,112,77));d.line((9,30,111,30),fill=EDGE)
        for x,col in [(14,CORAL),(20,AMBER),(26,MINT)]:d.point((x,25),fill=col)
        cube(d,t,60,54,49,True)
        txt(d,122,26,'Scene',CYAN);d.line((125,37,125,66),fill=EDGE)
        txt(d,130,42,'Mesh',MINT);txt(d,130,56,'Material',AMBER)
        txt(d,9,82,'SCENE OBJECTS / A VISIBLE RESULT',AMBER)

def proof_token(d,x,y,kind,col):
    # A circle, diamond, and square make the three types distinguishable
    # without requiring either source code or color discrimination.
    if kind==0:d.ellipse((x-3,y-3,x+3,y+3),fill=INK,outline=col)
    elif kind==1:d.polygon([(x,y-4),(x+4,y),(x,y+4),(x-4,y)],fill=INK,outline=col)
    else:d.rectangle((x-3,y-3,x+3,y+3),fill=INK,outline=col)

def proof_function(d,x,y,a,b,col):
    card(d,(x,y,x+51,y+33),col)
    txt(d,x+11,y+5,f'{chr(65+a)} -> {chr(65+b)}',col)
    d.line((x+11,y+24,x+39,y+24),fill=EDGE)
    d.rectangle((x+22,y+21,x+27,y+27),outline=col)
    proof_token(d,x,y+24,a,[AMBER,CYAN,MINT][a])
    proof_token(d,x+51,y+24,b,[AMBER,CYAN,MINT][b])

def proof(d,t):
    if t<.20:
        txt(d,9,18,'A PROPOSITION',CYAN)
        # One structured claim, with the same three type shapes that will
        # reappear as the ports of its functional proof components.
        pulse=round(2*math.sin(t*math.tau*5))
        d.polygon([(97,31-pulse),(130+pulse,52),(97,73+pulse),(64-pulse,52)],outline=EDGE)
        d.line((76,53,97,40,118,53,97,65,76,53),fill=CYAN)
        for x,y,k,col in [(76,53,0,AMBER),(97,40,1,CYAN),(118,53,2,MINT)]:proof_token(d,x,y,k,col)
        txt(d,9,82,'PROPOSITIONS AS TYPES',AMBER)
    elif t<.43:
        txt(d,9,18,'UNFOLD THE PROOF OBJECT',CYAN)
        u=min(1,(t-.20)/.15)
        for x,a,b in [(round(69-40*u),0,1),(round(74+36*u),1,2)]:
            proof_function(d,x,36,a,b,CYAN if a==0 else MINT)
        txt(d,9,82,'IMPLICATIONS BECOME FUNCTIONS',AMBER)
    else:
        checking=t>=.72
        u=min(1,max(0,(t-.72)/.18)) if checking else 0
        checked=u>=1
        txt(d,9,18,'ONE COMPOSED PROOF' if checking else 'MATCH THE TYPES',MINT if checked else CYAN)
        if checking:
            d.rectangle((8,31,186,75),outline=MINT if checked else EDGE)
            txt(d,133,18,'A -> C',MINT)
        proof_function(d,29,36,0,1,MINT if checking and u>.36 else CYAN)
        proof_function(d,110,36,1,2,MINT if checking and u>.8 else CYAN)
        for a,b in [((15,60),(29,60)),((80,60),(110,60)),((161,60),(180,60))]:
            d.line((*a,*b),fill=MINT if checked else EDGE)
        proof_token(d,15,60,0,AMBER);proof_token(d,180,60,2,MINT)
        if not checking:
            v=min(1,(t-.43)/.25);x=round(15+v*165)
            kind=0 if x<55 else 1 if x<136 else 2
            proof_token(d,x,60,kind,[AMBER,CYAN,MINT][kind])
        elif not checked:
            sx=round(12+170*u);d.line((sx,33,sx,73),fill=MINT)
        else:
            d.line((174,21,178,25,185,17),fill=MINT,width=2)
        txt(d,9,82,'KERNEL / TYPE CHECKED' if checked else 'KERNEL / CHECK THE CONSTRUCTION' if checking else 'PROOFS COMPOSE LIKE PROGRAMS',AMBER)

DRAWERS=dict(zip(NAMES,[objects,logic,architecture,web,graphics,proof]))
def diagram(name,i):
    im=Image.new('RGB',(194,96),INK);d=ImageDraw.Draw(im)
    d.fontmode='1';d.rectangle((0,0,193,95),outline=EDGE);d.line((1,13,192,13),fill=GRID)
    txt(d,7,2,HEADERS[NAMES.index(name)],CYAN)
    DRAWERS[name](d,i/COUNT)
    return im

def room(display,i,mobile=False):
    # The same original desk keeps CS in the site's visual world. A board and
    # status lights distinguish this workspace without shrinking its pixels.
    im=desk.room(display,i,mobile).convert('RGB').resize((256,224) if mobile else (384,128),Image.Resampling.NEAREST)
    d=ImageDraw.Draw(im);bx,by=(12,203) if mobile else (165,113)
    d.rectangle((bx,by,bx+23,by+7),fill=GRID,outline=EDGE)
    for j in range(3):d.point((bx+5+j*6,by+3),fill=MINT if (i//12)%3==j else MUTED)
    # An original short cable and port: still exactly the same logical grid.
    d.line((bx+23,by+4,bx+29,by+4,bx+29,by+8,bx+34,by+8),fill=EDGE)
    w,h=im.size
    return im.quantize(palette=desk.PALETTE,dither=Image.Dither.NONE).resize((w*3,h*3),Image.Resampling.NEAREST)

def verify():
    rows=[(p,q,p&q,q&p) for p in range(2) for q in range(2)]
    assert all(a==b for _,_,a,b in rows)
    assert [machine_state(k,True) for k in range(3)]==[(5,0),(6,0),(6,6)]
    assert machine_state(0,False)==(0,0)
    assert len(EDGES)==12
    for t in np.linspace(0,1,21):
        v,p=projected(t,49,54,48)
        assert np.all(np.isfinite(v)) and all(8<x<91 and 30<y<76 for x,y in p)
    return {'truthTableRows':rows,'toyMachineFinal':{'R0':6,'memory0x10':5,'memory0x11':6},'cubeEdges':len(EDGES),'proof':'conceptual Curry-Howard correspondence; typed function composition, not a live kernel session'}

def main(names=None):
    OUT.mkdir(parents=True,exist_ok=True);SOURCE.mkdir(parents=True,exist_ok=True)
    manifest=json.loads((OUT/'manifest.json').read_text()) if (OUT/'manifest.json').exists() else {'scenes':{}}
    manifest['checks']=verify()
    sheet=Image.new('RGB',(768,450),INK);sd=ImageDraw.Draw(sheet)
    for name in NAMES if names is None else names:
        n=NAMES.index(name)
        displays=[diagram(name,i) for i in range(COUNT)]
        displays[STILLS[n]].resize((582,288),Image.Resampling.NEAREST).save(OUT/f'{name}-study.png',optimize=True)
        for mobile in [False,True]:
            suffix='-mobile' if mobile else '';frames=[room(display,i,mobile) for i,display in enumerate(displays)]
            frames[STILLS[n]].convert('RGB').save(OUT/f'{name}{suffix}.png',optimize=True)
            frames[0].save(OUT/f'{name}{suffix}.gif',save_all=True,append_images=frames[1:],duration=MS,loop=0,optimize=True,disposal=1)
        manifest['scenes'][name]={'logicalSize':[384,128],'mobileLogicalSize':[256,224],'durationMs':COUNT*MS,'frames':COUNT,'gifBytes':(OUT/f'{name}.gif').stat().st_size}
        print(name,flush=True)
    for n,name in enumerate(NAMES):
        x=n%2*384;y=n//2*150;text(sd,(x+8,y+2),name,CYAN)
        sheet.paste(Image.open(OUT/f'{name}.png').resize((384,128),Image.Resampling.NEAREST),(x,y+18))
    sheet.save(SOURCE/'contact-sheet.png');(OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    print(json.dumps(manifest['checks'],indent=2))

if __name__=='__main__':main()
