"""Original paired SVG / animated pixel explanations for the Catalyst story.

One drawing recipe feeds both styles and phone layouts. Pixel labels use a
higher logical resolution and monochrome glyph rasterization, never blur filters.
Molecular drawings are attachment examples, not computed candidates or results.
"""
from pathlib import Path
from html import escape
from functools import lru_cache
import math
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/media/catalyst-discovery'
BG='#0c1521'; PANEL='#132331'; LINE='#3c5667'; CYAN='#9dd1da'; AMBER='#e0b582'; MINT='#afcbb6'; TEXT='#dce7ed'; MUTED='#9bacbb'
SCALE=2/3
FONT=Path('/System/Library/Fonts/Menlo.ttc')
@lru_cache(None)
def font(size):
    return ImageFont.truetype(str(FONT),size) if FONT.exists() else ImageFont.load_default(size=size)
class Drawing:
    def __init__(self,w,h):
        self.w=w;self.h=h;self.svg=[]
        self.im=Image.new('RGB',(round(w*SCALE),round(h*SCALE)),BG)
        self.d=ImageDraw.Draw(self.im);self.d.fontmode='1'
    def text(self,x,y,t,size=20,color=TEXT,anchor='start'):
        self.svg.append(f'<text x="{x}" y="{y}" font-size="{size}" fill="{color}" text-anchor="{anchor}">{escape(t)}</text>')
        self.d.text((round(x*SCALE),round(y*SCALE)),t,font=font(max(8,round(size*SCALE))),fill=color,anchor={'start':'ls','middle':'ms','end':'rs'}[anchor])
    def rect(self,x,y,w,h,fill=PANEL,stroke=LINE,thick=1):
        self.svg.append(f'<rect x="{x}" y="{y}" width="{w}" height="{h}" fill="{fill}" stroke="{stroke}" stroke-width="{thick}"/>')
        self.d.rectangle(tuple(round(v*SCALE) for v in (x,y,x+w,y+h)),fill=fill,outline=stroke,width=max(1,round(thick*SCALE)))
    def path(self,points,color=CYAN,width=2,closed=False,dashed=False):
        pts=list(points)+(list(points[:1]) if closed else [])
        self.svg.append('<polyline points="'+' '.join(f'{x:.2f},{y:.2f}' for x,y in pts)+f'" fill="none" stroke="{color}" stroke-width="{width}"'+(' stroke-dasharray="5 5"' if dashed else '')+'/>')
        if dashed:
            for a,b in zip(pts,pts[1:]):
                n=max(1,math.ceil(math.dist(a,b)/5))
                for k in range(0,n,2):
                    p=tuple(round((a[j]+(b[j]-a[j])*k/n)*SCALE) for j in (0,1));q=tuple(round((a[j]+(b[j]-a[j])*min(1,(k+1)/n))*SCALE) for j in (0,1))
                    self.d.line([p,q],fill=color,width=max(1,round(width*SCALE)))
        else:self.d.line([(round(x*SCALE),round(y*SCALE)) for x,y in pts],fill=color,width=max(1,round(width*SCALE)))
    def arrow(self,a,b,color=CYAN):
        self.path([a,b],color)
        angle=math.atan2(b[1]-a[1],b[0]-a[0])
        self.path([(b[0]-10*math.cos(angle-.45),b[1]-10*math.sin(angle-.45)),b,(b[0]-10*math.cos(angle+.45),b[1]-10*math.sin(angle+.45))],color)
    def dot(self,x,y,color=AMBER,size=4): self.rect(x-size/2,y-size/2,size,size,color,color)
    def save_svg(self,name):
        (OUT/f'{name}.svg').write_text(f'<svg xmlns="http://www.w3.org/2000/svg" width="{self.w}" height="{self.h}" viewBox="0 0 {self.w} {self.h}"><rect width="100%" height="100%" fill="{BG}"/><g font-family="ui-monospace, monospace">'+''.join(self.svg)+'</g></svg>\n')
    def raster(self): return self.im.resize((self.im.width*2,self.im.height*2),Image.Resampling.NEAREST)

def ring(d,cx,cy,r=24,n=6,color=CYAN,phenyl=False,open_end=False):
    pts=[(cx+r*math.cos(math.pi/2+i*math.tau/n),cy+r*math.sin(math.pi/2+i*math.tau/n)) for i in range(n)]
    d.path(pts,color,2,closed=not open_end)
    if phenyl and n==6:
        for i in (0,2,4):
            a,b=pts[i],pts[(i+1)%6]
            d.path([(cx+(a[0]-cx)*.72,cy+(a[1]-cy)*.72),(cx+(b[0]-cx)*.72,cy+(b[1]-cy)*.72)],color,2)
    return pts

def scaffold(d,cx,cy,kind,col):
    # Schematic N–N+=C–phenyl core from the project's default scaffold.
    d.text(cx-49,cy+7,'N',21,CYAN,'middle');d.text(cx+3,cy+7,'N⁺',21,CYAN,'middle');d.text(cx+54,cy+7,'C',21,CYAN,'middle')
    d.path([(cx-36,cy),(cx-14,cy)],CYAN);d.path([(cx+19,cy-3),(cx+40,cy-3)],CYAN);d.path([(cx+19,cy+3),(cx+40,cy+3)],CYAN)
    d.path([(cx+65,cy),(cx+78,cy)],CYAN);ring(d,cx+97,cy,20,6,CYAN,phenyl=True)
    d.path([(cx-49,cy+13),(cx-49,cy+33)],CYAN);d.text(cx-49,cy+53,'*',25,AMBER,'middle')
    d.path([(cx,cy-15),(cx,cy-42)],col)
    ring(d,cx,cy-65,23,5 if kind=='A' else 6,col,phenyl=kind=='C')

def heading(d,kicker,title,mobile):
    d.text(25 if mobile else 35,34,kicker,14,CYAN)
    # Titles intentionally short enough for narrow frames.
    d.text(25 if mobile else 35,67,title,21 if mobile else 27)

def cards(d,mobile,titles,phase=0):
    boxes=[]
    for i,title in enumerate(titles):
        x,y,w,h=(25,92+i*278,400,248) if mobile else (30+i*295,108,250,310)
        d.rect(x,y,w,h);d.text(x+16,y+29,title,18,CYAN)
        boxes.append((x,y,w,h))
        if i<2:
            a,b=((x+w/2,y+h+3),(x+w/2,y+h+27)) if mobile else ((x+w+5,y+h/2),(x+w+40,y+h/2))
            d.arrow(a,b,LINE)
            if i==int(phase*2)%2:
                u=phase*2%1;d.dot(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u)
    return boxes

def workflow(mobile,t):
    d=Drawing(450 if mobile else 900,850 if mobile else 520)
    heading(d,'A QUESTION, TURNED INTO A WORKFLOW','Keep the loop moving.',mobile)
    titles=['Make a guess','Give it shape','Calculate + check','Keep a record','Learn patterns','Choose next']
    subs=['Scaffold + fragments','A starting 3D pose','Human + calculation','Structures + energies','A small predictor','A new batch to explore']
    pos=[(35,110),(325,110),(615,110),(615,315),(325,315),(35,315)]
    points=[];stage=int(t*6)%6
    for i in range(6):
        x,y=(25,93+i*111) if mobile else pos[i];w,h=(400,88) if mobile else (250,120)
        color=AMBER if i==2 else CYAN
        d.rect(x,y,w,h,stroke=color if i==stage else LINE,thick=2)
        d.text(x+14,y+24,f'{i+1:02}',14,color);d.text(x+(60 if mobile else 14),y+(30 if mobile else 57),titles[i],20)
        d.text(x+(60 if mobile else 14),y+(61 if mobile else 90),subs[i],14,MUTED)
        points.append((x,y,w,h))
    for i,(x,y,w,h) in enumerate(points):
        nx,ny,nw,nh=points[(i+1)%6]
        if mobile:
            if i==5: continue
            a,b=(x+w/2,y+h+2),(nx+nw/2,ny-2)
        elif i in (0,1):a,b=(x+w+3,y+h/2),(nx-3,ny+nh/2)
        elif i in (3,4):a,b=(x-3,y+h/2),(nx+nw+3,ny+nh/2)
        elif i==2:a,b=(x+w/2,y+h+3),(nx+nw/2,ny-3)
        else:a,b=(x+w/2,y-3),(nx+nw/2,ny+nh+3)
        d.arrow(a,b,LINE)
        if i==stage:
            u=t*6%1;d.dot(a[0]+(b[0]-a[0])*u,a[1]+(b[1]-a[1])*u)
    d.text(25 if mobile else 35,819 if mobile else 494,'The next question starts with the last answer.',13,MUTED)
    return d

def generator(mobile,t):
    d=Drawing(450 if mobile else 900,1030 if mobile else 620)
    heading(d,'SAME CORE / DIFFERENT ADDITIONS','A small pool of possibilities.',mobile)
    for i,(kind,n,col,label) in enumerate([('A',5,CYAN,'Five-membered'),('B',6,AMBER,'Six-membered'),('C',6,MINT,'Phenyl')]):
        x,y,w,h=(25,95+i*290,400,265) if mobile else (25+i*298,105,255,418)
        d.rect(x,y,w,h,stroke=col if int(t*3)%3==i else LINE)
        d.text(x+16,y+30,f'{kind} / {label}',17,col)
        if mobile:
            ring(d,x+72,y+104,29,n,col,phenyl=kind=='C');d.text(x+72,y+165,'fragment',14,MUTED,'middle')
            d.arrow((x+113,y+109),(x+166,y+109),LINE)
            scaffold(d,x+238,y+150,kind,col);d.text(x+w/2,y+238,'shared core + new group',14,MUTED,'middle')
            d.dot(x+117+(t*3%1)*44,y+109,col)
        else:
            ring(d,x+w/2,y+105,34,n,col,phenyl=kind=='C');d.text(x+w/2,y+164,'choose a fragment',14,MUTED,'middle')
            d.arrow((x+w/2,y+182),(x+w/2,y+220),LINE)
            scaffold(d,x+106,y+318,kind,col);d.text(x+w/2,y+396,'core + attachment',14,MUTED,'middle')
            d.dot(x+w/2,y+184+(t*3%1)*32,col)
    d.text(25 if mobile else 35,1007 if mobile else 582,'* = a reserved attachment site',15,AMBER)
    if not mobile:d.text(35,608,'Colored rings are added groups; cyan atoms keep the shared core.',13,MUTED)
    return d

def attachments(mobile,t):
    d=Drawing(450 if mobile else 900,950 if mobile else 520)
    heading(d,'ROOM TO KEEP GROWING','One socket can lead to more.',mobile)
    bs=cards(d,mobile,['Extend a branch','Leave more outlets','Let the ends meet'],phase=t)
    for i,(x,y,w,h) in enumerate(bs):
        cx=x+w/2;cy=y+125
        if i==0:
            for off,label in [(-65,'C'),(0,'C'),(65,'*')]:d.text(cx+off,cy+6,label,27,AMBER if label=='*' else CYAN,'middle')
            d.path([(cx-48,cy),(cx-17,cy)],CYAN);d.path([(cx+17,cy),(cx+48,cy)],CYAN)
            d.text(cx,y+h-43,'a linker carries',14,MUTED,'middle');d.text(cx,y+h-22,'the next open site',14,MUTED,'middle')
        elif i==1:
            d.text(cx,cy+8,'C',27,CYAN,'middle')
            for dx,dy in [(-55,-40),(55,-40),(0,52)]:
                d.path([(cx+dx*.25,cy+dy*.25),(cx+dx*.75,cy+dy*.75)],CYAN)
                d.text(cx+dx,cy+dy+8,'*' if dy<0 else 'C',25,AMBER if dy<0 else CYAN,'middle')
            d.text(cx,y+h-23,'more ways to branch',14,MUTED,'middle')
        else:
            closed=t>.35
            pts=ring(d,cx,cy,48,5,CYAN,open_end=not closed)
            if not closed:
                d.path([pts[-1],pts[0]],AMBER,dashed=True)
                for px,py in (pts[0],pts[-1]):d.text(px+12,py+4,'*',22,AMBER)
            else:d.path([pts[-1],pts[0]],AMBER,3)
            d.text(cx,y+h-43,'nearby open ends',14,MUTED,'middle');d.text(cx,y+h-22,'can close a ring',14,MUTED,'middle')
    d.text(25 if mobile else 35,925 if mobile else 489,'* marks a place to attach another group.',13,AMBER)
    return d

def geometry(mobile,t):
    d=Drawing(450 if mobile else 900,950 if mobile else 520)
    heading(d,'FROM CONNECTIONS TO COORDINATES','Give the drawing some shape.',mobile)
    bs=cards(d,mobile,['A flat drawing','A starting 3D pose','An input to calculate'],phase=t)
    for i,(x,y,w,h) in enumerate(bs):
        cx=x+w/2;cy=y+130
        if i==0:
            ring(d,cx-22,cy,36,6,CYAN,phenyl=True);d.path([(cx+9,cy-18),(cx+38,cy-32),(cx+65,cy-10)],CYAN)
        elif i==1:
            angle=math.sin(t*math.tau)*.35
            coords=[(-55,-10),(-18,-40),(23,-24),(57,12),(18,41),(-22,25),(0,0)]
            pts=[(cx+px*math.cos(angle)+py*.25,cy+py) for px,py in coords]
            for a,b in [(0,1),(1,2),(2,3),(3,4),(4,5),(5,0),(1,6),(4,6)]:d.path([pts[a],pts[b]],LINE,3)
            for j,(px,py) in enumerate(pts):d.rect(px-5,py-5,10,10,AMBER if j==6 else CYAN,CYAN)
        else:
            d.rect(cx-62,cy-55,124,111,BG,LINE)
            for j,label in enumerate(['atoms','x / y / z','settings']):d.text(cx-47,cy-23+j*29,label,16,CYAN if j<2 else AMBER)
            d.dot(cx+45,cy-38+(t*3%1)*80)
        label=[('which atoms','are connected?'),('where might','they sit?'),('hand it over','to Gaussian')][i]
        d.text(cx,y+h-43,label[0],14,MUTED,'middle');d.text(cx,y+h-22,label[1],14,MUTED,'middle')
    d.text(25 if mobile else 35,925 if mobile else 489,'Shape first. Then calculate and check.' if mobile else 'Starting guesses are checked and refined through calculations.',12,MUTED)
    return d

def representation(mobile,t):
    d=Drawing(450 if mobile else 900,1000 if mobile else 560)
    heading(d,'FINDING A LANGUAGE FOR THE MODEL','A changing drawing, a consistent input?',mobile)
    # Shorter title on phones leaves the question to the surrounding prose.
    if mobile:
        d=Drawing(450,1000);heading(d,'FINDING A LANGUAGE FOR THE MODEL','What should the model see?',True)
    bs=cards(d,mobile,['Changing structures','A first stand-in','A richer language'],phase=t)
    for i,(x,y,w,h) in enumerate(bs):
        cx=x+w/2;cy=y+125
        if i==0:
            for j,(label,n) in enumerate([('CCC',0),('C1CCCC1',5),('c1ccccc1',6)]):
                yy=y+76+j*58
                if n:ring(d,x+45,yy-4,16,n,CYAN,phenyl=n==6)
                else:d.path([(x+24,yy),(x+42,yy-12),(x+62,yy)],CYAN)
                d.text(x+85,yy+2,label,16)
        elif i==1:
            d.text(cx,cy,'MolWt',31,AMBER,'middle');d.text(cx,cy+36,'one usable number',15,MUTED,'middle')
        else:
            ring(d,cx-25,cy-15,29,5,MINT);d.path([(cx+2,cy-15),(cx+37,cy-40),(cx+63,cy-19)],MINT)
            d.text(cx,cy+64,'connections + context',15,MINT,'middle')
        d.text(cx,y+h-22,['branches + new rings','first placeholder','a future direction'][i],14,MUTED,'middle')
    d.text(25 if mobile else 35,975 if mobile else 517,'A first input, with more to explore.' if mobile else 'Keep the workflow moving; keep exploring the representation.',12,MUTED)
    return d

def shortlist(mobile,t):
    d=Drawing(450 if mobile else 900,950 if mobile else 520)
    heading(d,'CHOOSING WHAT TO EXPLORE NEXT','A useful next batch.',mobile)
    bs=cards(d,mobile,['Many possibilities','Predict + compare','A smaller shortlist'],phase=t)
    for i,(x,y,w,h) in enumerate(bs):
        cx=x+w/2;cy=y+130
        if i==0:
            for n in range(9):ring(d,cx+(n%3-1)*58,cy+(n//3-1)*48,14,5 if n%2 else 6,CYAN if n==int(t*9)%9 else LINE,phenyl=n%3==0)
        elif i==1:
            for j in range(3):
                yy=cy-49+j*44;d.rect(cx-79,yy,158,29,BG,LINE);d.text(cx-64,yy+21,['compare','filter','rank'][j],17)
                d.dot(cx+55,yy+15,AMBER if int(t*3)%3==j else LINE)
        else:
            for j,col in enumerate([CYAN,AMBER,MINT]):
                yy=cy-55+j*47;ring(d,cx-45,yy+8,16,5 if j==0 else 6,col,phenyl=j==2);d.text(cx+7,yy+15,chr(65+j),21,col)
        d.text(cx,y+h-22,['a generated pool','energy suggestions','worth a closer look'][i],14,MUTED,'middle')
    d.text(25 if mobile else 35,925 if mobile else 488,'Check → add records → ask the next question.',14,AMBER)
    return d

def landscape(mobile,t):
    d=Drawing(450 if mobile else 900,1000 if mobile else 540)
    heading(d,'A QUESTION FOR LATER','Could we work backwards?',mobile)
    bs=cards(d,mobile,['A desired landscape','Work backwards?','Possible structures'],phase=t)
    for i,(x,y,w,h) in enumerate(bs):
        cx=x+w/2;cy=y+130
        if i==0:
            for k in range(5):
                pts=[]
                for a in range(49):
                    th=a/48*math.tau;r=20+k*14
                    pts.append((cx+math.cos(th)*r*(1+.12*math.sin(3*th)),cy+math.sin(th)*r*.65))
                d.path(pts,CYAN if k<2 else LINE)
            d.dot(cx,cy,AMBER,6);d.text(cx,cy+88,'a helpful valley?',15,AMBER,'middle')
        elif i==1:
            d.text(cx,cy+10,'?',75,AMBER,'middle');d.text(cx,cy+57,'shapes / interactions',14,MUTED,'middle');d.text(cx,cy+84,'chemical possibilities',14,MUTED,'middle')
        else:
            for j,col in enumerate([CYAN,AMBER,MINT]):
                yy=cy-53+j*49;ring(d,cx-28,yy,18,5 if j==0 else 6,col,phenyl=j==2);d.path([(cx-10,yy),(cx+17,yy-12),(cx+38,yy+2)],col)
            d.dot(cx+62,cy-49+(t*3%1)*100,AMBER)
        d.text(cx,y+h-22,['start with a goal','a question to explore','look for a match'][i],14,MUTED,'middle')
    d.text(25 if mobile else 35,975 if mobile else 509,'A conceptual sketch, not a calculated energy surface.',12,MUTED)
    return d

DRAWINGS={'workflow':workflow,'generator':generator,'attachments':attachments,'geometry':geometry,'one-feature':representation,'shortlist':shortlist,'landscape':landscape}
def main():
    OUT.mkdir(parents=True,exist_ok=True)
    for name,recipe in DRAWINGS.items():
        for mobile in [False,True]:
            suffix='-mobile' if mobile else ''
            recipe(mobile,0).save_svg(name+suffix)
            frames=[recipe(mobile,i/72).raster() for i in range(72)]
            frames[0].save(OUT/f'{name}-pixel{suffix}.png',optimize=True)
            frames[0].save(OUT/f'{name}-pixel{suffix}.gif',save_all=True,append_images=frames[1:],duration=120,loop=0,optimize=True)
        print(name,flush=True)
if __name__=='__main__':main()
