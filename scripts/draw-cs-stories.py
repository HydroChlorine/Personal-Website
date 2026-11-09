"""Original paired illustrations for five CS projects and a verification topic.

Synthetic teaching examples, never copied course diagrams or measured results.
Uses the site's existing command-identical pixel/crisp rendering pipeline.
"""
from pathlib import Path
import importlib.util
import itertools
import math
import textwrap
import numpy as np

ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('paired',ROOT/'scripts/draw-math-topics.py')
c=importlib.util.module_from_spec(spec);spec.loader.exec_module(c)
c.OUT=ROOT/'public/media/computer-science/stories';c.art.OUT=c.OUT
SOURCE=ROOT/'assets/art-source/computer-science/stories'
BG,PANEL,LINE,CYAN,MINT,AMBER,CORAL,TEXT,MUTED=c.BG,c.PANEL,c.LINE,c.CYAN,c.MINT,c.AMBER,c.CORAL,c.TEXT,c.MUTED

def setup(m,title,subtitle,n=2,mh=1000,wh=600):return c.setup(m,title,subtitle,n,mh,wh)
def label(d,b,s):c.label(d,b,s)
def note(d,b,s,col=AMBER):
    width=int((b[2]-28)/(c.art.font(8).getlength('M')*2))
    ls=textwrap.wrap(s,max(1,width));assert len(ls)<=2,(s,width)
    for i,line in enumerate(ls):d.text(b[0]+14,b[1]+b[3]-(26 if len(ls)==2 else 18)+16*i,line,12,col)
def words(d,b,items,top=76,size=18,gap=32,col=TEXT):
    width=int((b[2]-34)/(c.art.font(max(8,round(size*.5))).getlength('M')*2))
    y=b[1]+top
    for value in items:
        for line in textwrap.wrap(value,max(1,width)):
            d.text(b[0]+17,y,line,size,col);y+=gap
def node(d,x,y,s,col=CYAN,w=90,h=36):
    d.rect(x-w/2,y-h/2,w,h,PANEL,col,2);d.text(x,y+6,s,17,TEXT,'middle')
def link(d,a,b,col=LINE):d.arrow(a,b,col)
def dot(d,x,y,col=AMBER,size=8):d.dot(x,y,col,size)
def outline(d,x,y,w,h,col,width=2):d.path([(x,y),(x+w,y),(x+w,y+h),(x,y+h)],col,width,closed=True)
def pbox(b):x,y,w,h=b;return x+43,y+65,x+w-20,y+h-100
def hexagon(d,x,y,r,fill=BG):
    pts=[(x+r*math.cos(math.pi/3*k),y+r*math.sin(math.pi/3*k)) for k in range(6)]
    c.polygon(d,pts,fill);d.path(pts,LINE,1,closed=True)

def critter_world(m,t):
    d,bs=setup(m,'PROGRAMS WITH A PLACE TO LIVE','An original schematic of an artificial world')
    b=bs[0];label(d,b,'A hexagonal neighborhood');x,y,w,h=b
    positions={}
    for q in range(-3,4):
        for r in range(-3,4):
            if abs(q+r)>3:continue
            xx=x+w/2+q*28;yy=y+h*.46+(r+q/2)*32
            positions[q,r]=(xx,yy);hexagon(d,xx,yy,18)
    for q,r in [(-2,1),(2,-2),(1,1)]:
        xx,yy=positions[q,r];dot(d,xx,yy,MINT,11)
    for q,r in [(0,-2),(2,0),(-1,3)]:
        xx,yy=positions[q,r];d.rect(xx-9,yy-9,18,18,LINE,LINE)
    route=[(-2,0),(-1,0),(0,0),(1,0),(1,-1),(2,-1)];k=min(5,int(t*6))
    for j,(q,r) in enumerate([route[k],(-1,1),(0,2)]):
        xx,yy=positions[q,r];c.polygon(d,[(xx,yy-9),(xx-8,yy+7),(xx+8,yy+7)],[AMBER,CYAN,CORAL][j])
        dot(d,xx-2,yy, BG,2);dot(d,xx+3,yy,BG,2)
    note(d,b,'different programs / shared world')
    b=bs[1];label(d,b,'One inhabitant, one program')
    words(d,b,['Sense nearby hexes','Read memory','Choose an action','Change the world'],top=85,gap=48)
    dot(d,b[0]+b[2]-30,b[1]+80+48*(k%4),AMBER,9)
    note(d,b,'illustration / not a recorded run')
    return d

def language_pipeline(m,t):
    d,bs=setup(m,'FROM A RULE TO A TREE','A natural-language sketch, not source code')
    b=bs[0];label(d,b,'A behavior we can describe')
    words(d,b,['IF food is ahead','THEN eat'],top=100,gap=55,col=CYAN)
    x,y,w,h=b;node(d,x+w/2,y+h-100,'tokens',AMBER,120)
    note(d,b,'assigned grammar / our implementation')
    b=bs[1];label(d,b,'Structure makes meaning');x,y,w,h=b
    root=(x+w/2,y+100);left=(x+w*.28,y+200);right=(x+w*.72,y+200)
    for end in [left,right]:link(d,(root[0],root[1]+18),(end[0],end[1]-18),CYAN if t>.3 else LINE)
    node(d,*root,'Rule',CYAN);node(d,*left,'Condition',MINT,110);node(d,*right,'Action',AMBER)
    for pos,txt,col in [(left,'food ahead',MINT),(right,'eat',AMBER)]:
        end=(pos[0],y+290);link(d,(pos[0],pos[1]+18),(end[0],end[1]-18));node(d,*end,txt,col,115)
    u=t*2
    a,z=((root[0],root[1]+18),(right[0],right[1]-18)) if u<1 else ((right[0],right[1]+18),(right[0],y+272))
    v=u%1;dot(d,a[0]+(z[0]-a[0])*v,a[1]+(z[1]-a[1])*v,AMBER,7)
    note(d,b,'parse / evaluate / act')
    return d

def critter_turn(m,t):
    d,bs=setup(m,'ONE TURN / CONNECTED DECISIONS','The same made-up example across three views',3,1300)
    stage=min(2,int(t*3))
    for j,(b,title,items) in enumerate(zip(bs,['Sense','Evaluate','Act'],[['Food ahead: yes','Energy: 200'],['Condition: true','Select: eat'],['Energy: 240','Food left: 40']])):
        label(d,b,title);words(d,b,items,top=95,gap=42,col=CYAN if stage>=j else MUTED)
        x,y,w,h=b;hexagon(d,x+w/2,y+h-115,31,MINT if stage>=j else BG)
        dot(d,x+w/2,y+h-115,AMBER,12)
        note(d,b,['read state','choose a rule','update state'][j])
    return d

def mutation(m,t):
    d,bs=setup(m,'A CHANGED BRANCH / A NEW POSSIBILITY','A conceptual replacement mutation, not a fitness claim')
    for j,b in enumerate(bs):
        label(d,b,'Parent program' if j==0 else 'Child program');x,y,w,h=b
        root=(x+w/2,y+100);left=(x+w*.28,y+225);right=(x+w*.72,y+225)
        for end in [left,right]:link(d,(root[0],root[1]+18),(end[0],end[1]-18))
        node(d,*root,'Rule');node(d,*left,'Condition',MINT,110)
        changed=j==1 and t>.3;node(d,*right,'Move' if changed else 'Turn',AMBER if changed else CYAN)
        if changed:outline(d,right[0]-52,right[1]-26,104,52,AMBER,2)
        note(d,b,'one subtree changes' if j else 'copy the structured program')
    return d

def simulation_timeline(m,t):
    d,bs=setup(m,'COORDINATION / NOT A CROWD OF THREADS','Simulation hands events to the animation side',1,850)
    b=bs[0];x,y,w,h=b;k=min(5,int(t*6));start=x+(125 if m else 160);span=w-(150 if m else 190)
    for row,name in enumerate(['Simulation','Events','JavaFX']):
        yy=y+95+row*(h-170)/3;d.text(x+12,yy+6,name,15,CYAN)
        d.path([(start,yy),(start+span,yy)],LINE,2)
        for step in range(6):
            xx=start+(step+.5)*span/6;active=(row==0 and step%2==0) or (row==2 and step%2==1) or row==1
            d.rect(xx-10,yy-10,20,20,(AMBER if step==k else CYAN) if active else BG,LINE)
            if row<2 and step==k:link(d,(xx,yy+12),(xx,yy+(h-170)/3-12),AMBER)
    note(d,b,'ordered turns / locks and conditions')
    return d

def component_map(m,t):
    d,bs=setup(m,'ONE APPLICATION / SEVERAL CONTRACTS','The systems meet through explicit responsibilities',3,1300)
    groups=[('Language',['tokens','AST','mutations']),('World',['sensors','actions','turn order']),('Interface',['events','animations','inspection'])]
    for j,(b,(title,parts)) in enumerate(zip(bs,groups)):
        label(d,b,title);x,y,w,h=b
        for i,s in enumerate(parts):
            yy=y+100+i*100;node(d,x+w/2,yy,s,AMBER if int(t*9)==j*3+i else CYAN,min(170,w-30))
            if i<2:link(d,(x+w/2,yy+20),(x+w/2,yy+80))
        note(d,b,['parse and represent','interpret and update','show and interact'][j])
    return d

RNG=np.random.default_rng(2112);ANGLES=RNG.uniform(0,math.tau,100);RADII=np.sqrt(RNG.random(100))
SPARK_COLORS=[CYAN,AMBER,CORAL,MINT]
def wheel(d,b,new=False):
    x,y,w,h=b;cx=x+w/2;cy=y+h*.48;scale=min(w*.31,(h-150)*.36)
    for r in [0,.35,.7,1]:
        n=1 if r==0 else round(18*r)
        for j in range(n):
            a=j*math.tau/n;col=SPARK_COLORS[int((a/math.tau)*4)%4] if not new else MINT
            dot(d,cx+scale*r*math.cos(a),cy+scale*r*math.sin(a),col,12)
def burst(d,b,t,wind=0,trails=True):
    x,y,w,h=b;age=.1+2.2*t;scale=min(w*.28,(h-140)*.35);cx=x+w/2;cy=y+h*.40
    for a,r in zip(ANGLES,RADII):
        col=SPARK_COLORS[int(a/math.tau*4)%4]
        def point(s):return cx+math.cos(a)*r*scale*s/(1+.35*s)+wind*s*s,cy+math.sin(a)*r*scale*s/(1+.35*s)+8*s*s
        end=point(age)
        if trails:d.path([point(max(0,age-.25)),end],col,1)
        dot(d,*end,col,4)

def painted_burst(m,t):
    d,bs=setup(m,'PAINT A PATTERN / WATCH IT OPEN','An original particle illustration inspired by the project')
    label(d,bs[0],'The design wheel');wheel(d,bs[0]);note(d,bs[0],'regions describe color and style')
    label(d,bs[1],'The resulting burst');burst(d,bs[1],t);note(d,bs[1],'keep the larger pattern visible')
    return d
def frozen_design(m,t):
    d,bs=setup(m,'A LAUNCH TAKES ITS OWN COPY','Changing the editor does not rewrite a flying shell')
    label(d,bs[0],'Edit the next design');wheel(d,bs[0],t>.35);note(d,bs[0],'the editor can change')
    label(d,bs[1],'The earlier launch');burst(d,bs[1],t);note(d,bs[1],'its original colors stay attached')
    return d
def wind_trails(m,t):
    d,bs=setup(m,'SAME PATTERN / A DIFFERENT FEEL','One synthetic direction set, three rendering choices',3,1300)
    for b,title,wind,trails in zip(bs,['A clear burst','A little wind','Without trails'],[0,9,9],[True,True,False]):
        label(d,b,title);burst(d,b,t,wind,trails);note(d,b,'compare motion and persistence')
    return d

V4=np.array(list(itertools.product([-1.,1.],repeat=4)))
def rotated4():
    rot=np.eye(4);a=.6;rot[0,0]=rot[3,3]=math.cos(a);rot[0,3]=-math.sin(a);rot[3,0]=math.sin(a)
    return V4@rot.T
V4R=rotated4();E4=[(i,j) for i in range(16) for j in range(i) if np.sum(V4[i]!=V4[j])==1]
F4=[]
for free in itertools.combinations(range(4),2):
    fixed=[k for k in range(4) if k not in free]
    for signs in itertools.product([-1,1],repeat=2):
        ids=[i for i,v in enumerate(V4) if all(v[k]==s for k,s in zip(fixed,signs))]
        F4.append(ids)
def slice_edges(offset):
    segments=[]
    for ids in F4:
        pts=[]
        for i,j in E4:
            if i not in ids or j not in ids:continue
            a,b=V4R[i],V4R[j];da,db=a[3]-offset,b[3]-offset
            if da*db<0:pts.append(a+(b-a)*da/(da-db))
        unique=[]
        for p in pts:
            if not any(np.linalg.norm(p-q)<1e-8 for q in unique):unique.append(p)
        if len(unique)==2:segments.append(unique)
    return segments
def spatial(d,b,segments):
    x,y,w,h=b;scale=min(w*.22,(h-130)*.24)
    def pr(v):return x+w/2+scale*(v[0]+.35*v[2]),y+h*.48-scale*(v[1]+.20*v[2])
    for a,z in segments:d.path([pr(a),pr(z)],CYAN,2)
def slice_shadow(m,t):
    d,bs=setup(m,'A SLICE IS NOT A SHADOW','A rotated tesseract, constructed for this explanation')
    label(d,bs[0],'Projection: drop W');spatial(d,bs[0],[(V4R[i],V4R[j]) for i,j in E4]);note(d,bs[0],'all vertices contribute')
    offset=.95*math.sin(t*math.tau)
    label(d,bs[1],'Section: fix W');spatial(d,bs[1],slice_edges(offset));note(d,bs[1],f'only the intersection / W={offset:+.2f}')
    return d
ROUTE=np.array([[-2.,0,0,0],[-2,0,0,3],[1,0,0,3],[5,0,0,3]])
def route_state(t):
    u=min(2.999,t*3);i=int(u);return ROUTE[i]*(1-(u-i))+ROUTE[i+1]*(u-i)
def coordinate_views(m,t):
    d,bs=setup(m,'ONE POSITION / TWO COORDINATE VIEWS','A constructed route; changing a view is not a movement')
    pos=route_state(t)
    for b,axes,inds in zip(bs,[('X','Z'),('Z','W')],[(0,2),(2,3)]):
        label(d,b,'XYZ view' if inds==(0,2) else 'YZW view');p=pbox(b)
        c.axes(d,p,(-3,6),(-1,5),axes[0],axes[1])
        c.curve(d,ROUTE[:,inds[0]],ROUTE[:,inds[1]],p,MUTED,(-3,6),(-1,5))
        c.dots(d,[pos[inds[0]]],[pos[inds[1]]],p,AMBER,(-3,6),(-1,5))
        note(d,b,f'same state: X={pos[0]:.1f}, W={pos[3]:.1f}')
    return d
def key_fit(w):return w-.25>=2 and w+.25<=4.5
def key_aperture(m,t):
    d,bs=setup(m,'THE RIGHT FIT / THROUGH THE WHOLE KEY','A schematic of the current work-in-progress puzzle',3,1300)
    for b,wpos in zip(bs,[0.,2.1,3.]):
        label(d,b,f'Key center W={wpos:g}');x,y,w,h=b;cx=x+w/2;cy=y+145;scale=min(70,(w-40)/2)
        aperture=1.8 if 2<=wpos<=4.5 else .56
        d.rect(x+20,cy-45,w-40,90,LINE,LINE)
        d.rect(cx-aperture*scale/2,cy-42,aperture*scale,84,BG,LINE)
        outline(d,cx-1.2*scale/2,cy-22,1.2*scale,44,MINT if key_fit(wpos) else CORAL,3)
        yy=y+h-150;d.path([(x+30,yy),(x+w-30,yy)],LINE,2)
        def wx(v):return x+30+(w-60)*v/5
        d.path([(wx(2),yy),(wx(4.5),yy)],MINT,6)
        d.path([(wx(wpos-.25),yy-14),(wx(wpos+.25),yy-14)],AMBER,7)
        checking=wpos-.25+.5*t
        dot(d,wx(checking),yy-14,MINT if 2<=checking<=4.5 else CORAL,10)
        d.text(x+20,yy+36,'full W thickness',14,MUTED)
        note(d,b,'fits / release onto plate' if key_fit(wpos) else 'blocked / part still too narrow')
    return d

ROWS=[{'id':1,'team':'amber','status':'open','owner':1},{'id':2,'team':'cyan','status':'open','owner':2},{'id':3,'team':'amber','status':'closed','owner':1},{'id':4,'team':'amber','status':'open','owner':2}]
OWNERS={1:'Ari',2:'Bo'}
RESULT=[(r['id'],OWNERS[r['owner']]) for r in ROWS if r['team']=='amber' and r['status']=='open']
def request_flow(m,t):
    d,bs=setup(m,'A FILTER BECOMES A RESPONSE','A representative flow, not an employer system diagram',3,1300)
    labels=['Request','Application + data','Response DTO']
    values=[['team: amber','status: open'],['validate input','filter + join','shape the result'],['id: 1, owner: Ari','id: 4, owner: Bo']]
    for j,(b,title,ls) in enumerate(zip(bs,labels,values)):
        label(d,b,title);words(d,b,ls,top=100,gap=40,col=CYAN if t*3>=j else MUTED)
        note(d,b,['frontend asks','backend coordinates','frontend can render'][j])
    return d
def relational_filter(m,t):
    d,bs=setup(m,'JOIN THE CONTEXT / KEEP THE MATCHES','All names, entities, and records here are fictional',3,1300)
    label(d,bs[0],'Work items');b=bs[0]
    for j,r in enumerate(ROWS):words(d,b,[f'{r["id"]} {r["team"]}',f'{r["status"]} / owner {r["owner"]}'],top=75+j*65,gap=23,size=16,col=AMBER if j==int(t*4) else MUTED)
    note(d,b,'team=amber AND status=open')
    label(d,bs[1],'Owner lookup');words(d,bs[1],['1 -> Ari','2 -> Bo'],top=100,gap=55,col=MINT);note(d,bs[1],'link by owner ID')
    label(d,bs[2],'Selected response');words(d,bs[2],[f'{i} -> {owner}' for i,owner in RESULT],top=100,gap=55,col=CYAN);note(d,bs[2],'only requested fields leave')
    return d
def site_layers(m,t):
    d,bs=setup(m,'ONE PLACE / SEPARATE RESPONSIBILITIES','The website is the project; the miniature is its invitation',3,1300)
    for j,(b,title,ls) in enumerate(zip(bs,['Content','Presentation','Interaction'],[['project stories','topic articles','references'],['shared layout','pixel artwork','phone views'],['scene rotation','weather + motion','sky fireworks']])):
        label(d,b,title);words(d,b,ls,top=95,gap=50,col=CYAN if t*3>=j else MUTED);note(d,b,'change one without rewriting all')
    return d
def local_atmosphere(m,t):
    d,bs=setup(m,'A SMALL SKY / LOCAL CHOICES','The local calendar supplies a starting atmosphere',3,1300)
    for b,title,ls in zip(bs,['Visitor clock','Starting scene','Visitor control'],[['November','winter scene','snow'],['July','summer scene','rain'],['pause motion','change palette','advance scene']]):
        label(d,b,title);words(d,b,ls,top=100,gap=50,col=CYAN)
        x,y,w,h=b
        for k in range(8):
            xx=x+25+(k*29)%(w-50);yy=y+h-115+(k*13+t*35)%35;dot(d,xx,yy,MINT if title=='Visitor clock' else CYAN,5)
        note(d,b,'no live weather or location lookup')
    return d

# Nodes are (color, key, left, right); empty leaves have black height zero.
def T(k,l=None,r=None,col='B'):return (col,k,l,r)
BEFORE=T(30,T(20,T(10,col='R'),col='R'))
BALANCED=T(20,T(10),T(30),col='R');BLACKENED=T(20,T(10),T(30))
INVARIANT_TREE=T(8,T(4,T(2),T(6),col='R'),T(12,T(10),T(14),col='R'))
HEIGHT_TREE=T(8,T(4,T(2,T(1,col='R')),T(6),col='R'),T(12))
def inorder(tree):return [] if tree is None else inorder(tree[2])+[tree[1]]+inorder(tree[3])
def height(tree):return 0 if tree is None else 1+max(height(tree[2]),height(tree[3]))
def mindepth(tree):return 0 if tree is None else 1+min(mindepth(tree[2]),mindepth(tree[3]))
def paths(tree,path=()):
    if tree is None:return [path]
    p=path+((tree[0],tree[1]),);return paths(tree[2],p)+paths(tree[3],p)
def rb_ok(tree):
    if tree is None:return True
    red=tree[0]=='R';children=[tree[2],tree[3]]
    return (not red or all(q is None or q[0]=='B' for q in children)) and len({sum(col=='B' for col,k in p) for p in paths(tree)})==1 and all(rb_ok(q) for q in children)
def tree_picture(d,b,tree,highlight=(),values=None):
    x,y,w,h=b;levels=max(3,height(tree));ys=(h-155)/max(2,levels-1)
    def draw(tr,cx,cy,span):
        if tr is None:return
        col,key,l,r=tr
        for child,sign in [(l,-1),(r,1)]:
            if child: d.path([(cx,cy+18),(cx+sign*span,cy+ys-18)],AMBER if key in highlight and child[1] in highlight else LINE,2)
        for child,sign in [(l,-1),(r,1)]:draw(child,cx+sign*span,cy+ys,span*.5)
        fill=CORAL if col=='R' else BG;stroke=AMBER if key in highlight else MINT
        d.rect(cx-18,cy-18,36,36,fill,stroke,2);d.text(cx,cy+6,str(key),18,BG if col=='R' else TEXT,'middle')
        if values and key in values:d.text(cx,cy+40,values[key],14,CYAN,'middle')
    draw(tree,x+w/2,y+92,w*.23)

def tests_property(m,t):
    d,bs=setup(m,'FROM EXAMPLES TO A STATEMENT','Testing and proof answer complementary questions')
    label(d,bs[0],'Try particular cases');words(d,bs[0],['insert into empty','replace an entry','insert near an edge'],top=100,gap=55)
    b=bs[0];dot(d,b[0]+b[2]-25,b[1]+100+55*int(t*3),MINT)
    label(d,bs[1],'State the general property');words(d,bs[1],['For every valid tree t','insertion preserves','the ordering invariant'],top=100,gap=38,col=CYAN)
    note(d,bs[0],'useful examples and regressions');note(d,bs[1],'proof requires definitions and premises')
    return d
def proof_objects(m,t):
    d,bs=setup(m,'PROPOSITIONS AS TYPES / PROOFS AS TERMS','Function composition is one small constructive example',3,1300)
    for j,(b,title,ls) in enumerate(zip(bs,['Assumptions','Compose','Check the result'],[['a proof of A','a function A -> B','a function B -> C'],['apply A -> B','obtain a proof of B','apply B -> C'],['a term of type C','a composed function','A -> C']])):
        label(d,b,title);words(d,b,ls,top=95,gap=44,col=MINT if t*3>=j else MUTED)
        x,y,w,h=b
        for k,col in enumerate([AMBER,CYAN,MINT]):node(d,x+w*.25+k*w*.25,y+h-100,chr(65+k),col,32)
        note(d,b,['proofs of implications','typed application','relative to the assumptions'][j])
    return d
def rebalance(m,t):
    d,bs=setup(m,'CHANGE THE SHAPE / KEEP THE MEANING','An original three-key instance of the balance idea')
    label(d,bs[0],'A temporary red-red chain');tree_picture(d,bs[0],BEFORE,[30,20,10]);note(d,bs[0],'in-order keys: 10, 20, 30')
    done=t>.65;label(d,bs[1],'Blacken the root' if done else 'Local balance');tree_picture(d,bs[1],BLACKENED if done else BALANCED,[20]);note(d,bs[1],'the same keys, the same order')
    return d
def invariant_paths(m,t):
    d,bs=setup(m,'COLORS CONSTRAIN EVERY PATH','Dark nodes are black; coral nodes are red')
    ps=paths(INVARIANT_TREE);path=ps[int(t*len(ps))%len(ps)]
    label(d,bs[0],'Follow a root-to-empty path');tree_picture(d,bs[0],INVARIANT_TREE,[k for col,k in path]);note(d,bs[0],'empty leaves are implicit')
    label(d,bs[1],'Two constraints together');words(d,bs[1],['No adjacent red nodes','Same black count','on every path',f'Highlighted count: {sum(col=="B" for col,k in path)}'],top=95,gap=40,col=CYAN);note(d,bs[1],'count excludes the empty leaf')
    return d
def lookup_meaning(m,t):
    d,bs=setup(m,'THE DICTIONARY HAS A MEANING','Insertion replaces one value and preserves the others')
    tr=T(20,T(10,col='R'),T(30,col='R'));v={10:'a',20:'old',30:'c'}
    for j,b in enumerate(bs):
        label(d,b,'Before inserting (20, new)' if j==0 else 'After insertion')
        tree_picture(d,b,tr,[20 if t<.5 else 10],v if j==0 else {**v,20:'new'})
        note(d,b,'10 -> a / 30 -> c stay the same')
    return d
def proof_dependencies(m,t):
    d,bs=setup(m,'A GUARANTEE IS BUILT FROM SMALLER FACTS','Selected proof chains; not a complete dependency graph',3,1300)
    for j,(b,title,ls) in enumerate(zip(bs,['Ordering','Lookup','Color invariants'],[['balance_BST','ins_BST','insert_BST'],['balance_lookup','lookup_ins_eq','lookup_insert_eq'],['case automation','ins_RB','insert_RB']])):
        label(d,b,title);x,y,w,h=b
        for i,s in enumerate(ls):
            yy=y+100+i*100;node(d,x+w/2,yy,s,AMBER if int(t*3)==i else CYAN,w-30,45)
            if i<2:link(d,(x+w/2,yy+25),(x+w/2,yy+75))
        note(d,b,'local fact / recursion / interface')
    return d
def height_bound(m,t):
    d,bs=setup(m,'A SHAPE BOUND WITH A REASON','The file proves height <= 2 * minimum depth + 1')
    ps=paths(HEIGHT_TREE);p=max(ps,key=len) if t<.5 else min(ps,key=len)
    label(d,bs[0],'Long and short paths');tree_picture(d,bs[0],HEIGHT_TREE,[k for col,k in p]);note(d,bs[0],'height counts nonempty nodes')
    b=bs[1];label(d,b,'Compare the lengths');x,y,w,h=b
    for i,(s,val,col) in enumerate([('height',height(HEIGHT_TREE),CYAN),('minimum depth',mindepth(HEIGHT_TREE),MINT),('2 * min + 1',2*mindepth(HEIGHT_TREE)+1,AMBER)]):
        yy=y+90+i*95;d.text(x+20,yy,s,17,col);d.rect(x+20,yy+18,(w-70)*val/5,20,col,col);d.text(x+w-22,yy+34,str(val),18,col,'end')
    note(d,b,'4 <= 5 in this constructed example')
    return d

RECIPES={'critter-world':critter_world,'language-pipeline':language_pipeline,'critter-turn':critter_turn,'program-mutation':mutation,'simulation-timeline':simulation_timeline,'component-map':component_map,'painted-burst':painted_burst,'frozen-design':frozen_design,'wind-trails':wind_trails,'slice-shadow':slice_shadow,'coordinate-views':coordinate_views,'key-aperture':key_aperture,'request-flow':request_flow,'relational-filter':relational_filter,'site-layers':site_layers,'local-atmosphere':local_atmosphere,'tests-property':tests_property,'proof-objects':proof_objects,'rebalance':rebalance,'invariant-paths':invariant_paths,'lookup-meaning':lookup_meaning,'proof-dependencies':proof_dependencies,'height-bound':height_bound}

def verify():
    assert len(E4)==32 and len(F4)==24
    for offset in np.linspace(-.93,.93,21):
        segs=slice_edges(offset);assert len(segs)>=12
        assert all(abs(p[3]-offset)<1e-10 for seg in segs for p in seg)
    assert not key_fit(0) and not key_fit(2.1) and key_fit(3)
    assert RESULT==[(1,'Ari'),(4,'Bo')]
    assert inorder(BEFORE)==inorder(BALANCED)==inorder(BLACKENED)==[10,20,30]
    assert not rb_ok(BEFORE) and rb_ok(BALANCED) and rb_ok(BLACKENED)
    for tree in [INVARIANT_TREE,HEIGHT_TREE]:
        assert rb_ok(tree) and inorder(tree)==sorted(inorder(tree))
        assert height(tree)<=2*mindepth(tree)+1
    assert (height(HEIGHT_TREE),mindepth(HEIGHT_TREE))==(4,2)
    return {'tesseractEdges':len(E4),'tesseractFaces':len(F4),'filteredIDs':[r[0] for r in RESULT],'heightExample':[4,2,5],'originalFigureConcepts':len(RECIPES)}

if __name__=='__main__':
    c.main(recipes=RECIPES,source_dir=SOURCE,checks=verify())
