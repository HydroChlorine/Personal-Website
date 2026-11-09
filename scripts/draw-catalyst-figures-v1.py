"""Original explanatory figures reconstructed from Catalyst Discovery's source.

No calculated energies, model metrics, experimental data, or copied source artwork.
SVG diagrams stay crisp; the optional GIF offers the same workflow on a pixel grid.
"""
from pathlib import Path
from html import escape
import math
from PIL import Image, ImageDraw, ImageFont
ROOT=Path(__file__).resolve().parents[1]
OUT=ROOT/'public/media/catalyst-discovery'
BG='#0c1521'; PANEL='#132331'; LINE='#3c5667'; CYAN='#9dd1da'; AMBER='#e0b582'; TEXT='#dce7ed'; MUTED='#9bacbb'

def text(x,y,value,size=18,fill=TEXT,anchor='start'):
    return f'<text x="{x}" y="{y}" font-size="{size}" fill="{fill}" text-anchor="{anchor}">{escape(value)}</text>'
def line(x1,y1,x2,y2,arrow=True,color=LINE):
    return f'<path d="M{x1} {y1} L{x2} {y2}" fill="none" stroke="{color}" stroke-width="2"'+(' marker-end="url(#arrow)"' if arrow else '')+'/>'
def box(x,y,w,h,color=LINE):
    return f'<rect x="{x}" y="{y}" width="{w}" height="{h}" rx="3" fill="{PANEL}" stroke="{color}"/>'
def save(name,title,parts,width=900,height=480):
    svg=f'<svg xmlns="http://www.w3.org/2000/svg" width="{width}" height="{height}" viewBox="0 0 {width} {height}" role="img" aria-label="{escape(title)}"><defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="7" refY="4" orient="auto"><path d="M0 1 L7 4 L0 7" fill="none" stroke="{CYAN}" stroke-width="1.5"/></marker></defs><rect width="{width}" height="{height}" fill="{BG}"/><g font-family="ui-monospace, monospace">'+''.join(parts)+'</g></svg>'
    (OUT/f'{name}.svg').write_text(svg+'\n')

STEPS=[(45,100,'01','Propose','SMILES + fragments'),(330,100,'02','Prepare','3D starting guesses'),(615,100,'03','Calculate + check','Human handoff'),(615,295,'04','Record','SQLite / six energies'),(330,295,'05','Fit a predictor','MolWt → E1…E6'),(45,295,'06','Shortlist','Filter + rank')]
PATHS=[[(285,156),(330,156)],[(570,156),(615,156)],[(735,212),(735,295)],[(615,351),(570,351)],[(330,351),(285,351)],[(165,295),(165,212)]]

def workflow():
    parts=[text(45,44,'A QUESTION, TURNED INTO A WORKFLOW',15,CYAN),text(45,73,'Propose → prepare → learn → look again',21)]
    for x,y,num,title,sub in STEPS:
        c=AMBER if num=='03' else LINE
        parts += [box(x,y,240,112,c),text(x+17,y+28,num,14,AMBER if num=='03' else CYAN),text(x+17,y+58,title,19),text(x+17,y+85,sub,13,MUTED)]
    for path in PATHS: parts.append(line(*path[0],*path[1]))
    parts += [text(45,452,'Conceptual loop · not a completed autonomous run',13,MUTED)]
    save('workflow','Intended catalyst exploration workflow',parts)

def graph(cx,cy,r=27,color=CYAN):
    vertices=[(cx+r*math.cos(math.tau*i/6),cy+r*math.sin(math.tau*i/6)) for i in range(6)]
    return '<polygon points="'+' '.join(f'{x:.1f},{y:.1f}' for x,y in vertices)+f'" fill="none" stroke="{color}" stroke-width="2"/>'

def generator():
    parts=[text(45,44,'GROW A FAMILY, THEN CHECK THE GRAPH',15,CYAN),text(45,73,'The fragment library defines the search space.',19),box(45,125,230,240)]
    parts += [graph(160,220,42),line(118,220,89,194,False,CYAN),line(202,220,231,194,False,CYAN),text(78,185,'*',29,AMBER),text(226,185,'*',29,AMBER),text(160,302,'Shared scaffold',17,TEXT,'middle'),text(160,330,'* = attachment site',12,MUTED,'middle')]
    parts += [line(277,230,340,230)]
    for i,(cy,color) in enumerate([(145,CYAN),(245,AMBER),(345,'#afcbb6')]):
        parts += [box(355,cy-35,190,75),graph(405,cy,19,color),line(424,cy,445,cy-14,False,color),text(459,cy+5,chr(65+i),18,color),text(355,cy+57,'',12)]
    parts += [text(450,425,'Abstract candidates',13,MUTED,'middle'),line(545,245,600,245),box(625,145,230,200),text(645,184,'Graph checks',19),text(645,220,'Parse + sanitize',14,CYAN),text(645,252,'Canonical SMILES',14,CYAN),text(645,284,'Remove duplicates',14,CYAN),text(645,320,'Candidate pool',15,AMBER)]
    parts += [text(45,456,'Schematic only · graph validity does not establish chemical feasibility',12,MUTED)]
    save('generator','Scaffold-based molecular generation and validation',parts)

def feature():
    parts=[text(45,44,'WHAT INFORMATION REACHES THE MODEL?',15,CYAN),text(45,73,'Different structures can become the same input.',19)]
    for cy,label,color in [(175,'Structure A',CYAN),(340,'Structure B',AMBER)]:
        motif=graph(104,cy,28,color) if label.endswith('A') else f'<path d="M75 {cy+6} L91 {cy-9} L107 {cy+6} L123 {cy-9} L140 {cy+6} M107 {cy+6} V{cy+24}" fill="none" stroke="{color}" stroke-width="2"/>'
        parts += [box(45,cy-58,220,122),motif,line(129,cy-14,151,cy-27,False,color),text(165,cy-23,'R',16,color),text(154,cy+50,label,13,TEXT,'middle'),line(266,cy,357,257)]
    parts += [box(363,210,160,96),text(443,245,'MolWt',23,CYAN,'middle'),text(443,280,'same value',13,MUTED,'middle'),line(524,257,576,257),box(585,168,265,178),text(718,209,'Random forests',20,TEXT,'middle'),text(718,243,'one input feature',14,AMBER,'middle'),text(718,282,'Ê1  Ê2  Ê3',18,CYAN,'middle'),text(718,313,'Ê4  Ê5  Ê6',18,CYAN,'middle'),text(45,421,'Same feature → same prediction, regardless of hidden structural differences.',13,MUTED),text(45,453,'Abstract structures · equal mass assumed · no numerical energy predictions',12,MUTED)]
    save('one-feature','Molecular-weight-only representation bottleneck',parts)

def pixel_workflow():
    font=ImageFont.load_default()
    frames=[]
    for i in range(72):
        im=Image.new('RGB',(450,240),BG);d=ImageDraw.Draw(im)
        d.text((22,16),'A QUESTION -> A WORKFLOW',fill=CYAN,font=font)
        active=i//12
        for j,(x,y,num,title,sub) in enumerate(STEPS):
            x=int(x/2);y=int(y/2)
            color=AMBER if j==2 else CYAN
            d.rectangle((x+2,y+2,x+122,y+58),fill='#07101b')
            d.rectangle((x,y,x+120,y+56),fill=PANEL,outline=color if j==active else LINE,width=1)
            d.text((x+7,y+5),num,fill=color,font=font)
            title=title.replace('Calculate + check','Calculate/check')
            sub=sub.replace('MolWt → E1…E6','MolWt -> E1-E6')
            d.text((x+7,y+21),title,fill=TEXT,font=font)
            d.text((x+7,y+39),sub,fill=MUTED,font=font)
        for j,path in enumerate(PATHS):
            a,b=[(round(x/2),round(y/2)) for x,y in path]
            d.line([a,b],fill=LINE,width=1)
            if j==active:
                t=(i%12)/12
                x=round(a[0]+(b[0]-a[0])*t);y=round(a[1]+(b[1]-a[1])*t)
                d.rectangle((x-1,y-1,x+1,y+1),fill=AMBER)
        d.text((22,222),'Conceptual loop / not an autonomous run',fill=MUTED,font=font)
        frames.append(im.resize((900,480),Image.Resampling.NEAREST))
    frames[0].save(OUT/'workflow-pixel.png',optimize=True)
    frames[0].save(OUT/'workflow-pixel.gif',save_all=True,append_images=frames[1:],duration=125,loop=0,optimize=True)

def mobile_figures():
    parts=[text(25,35,'THE EXPLORATION LOOP',16,CYAN),text(25,64,'An intended workflow',20)]
    for i,(_,_,num,title,sub) in enumerate(STEPS):
        y=92+i*112
        parts += [box(25,y,400,88,AMBER if i==2 else LINE),text(42,y+29,num,15,CYAN),text(88,y+32,title,20),text(88,y+62,sub,15,MUTED)]
        if i<5: parts.append(line(225,y+89,225,y+111))
    parts += [text(25,790,'Shortlist feeds the next batch.',16,CYAN),text(25,822,'Conceptual, with human calculation checks.',13,MUTED)]
    save('workflow-mobile','Intended workflow in reading order',parts,450,850)
    parts=[text(25,35,'GROW A FAMILY OF STRUCTURES',16,CYAN),box(25,70,400,150),graph(100,142,31),line(70,142,53,119,False,CYAN),text(41,112,'*',24,AMBER),text(157,130,'Shared scaffold',20),text(157,164,'* = attachment site',14,MUTED),line(225,223,225,270)]
    for i,(x,col) in enumerate([(82,CYAN),(225,AMBER),(368,'#afcbb6')]):
        parts += [graph(x,316,23,col),line(x+21,316,x+33,301,False,col),text(x,370,chr(65+i),18,col,'middle')]
    parts += [text(225,411,'Abstract candidate branches',14,MUTED,'middle'),line(225,430,225,468),box(25,485,400,147),text(45,521,'Parse + sanitize',19),text(45,558,'Canonicalize + deduplicate',19,CYAN),text(45,601,'Candidate pool',19,AMBER),text(25,686,'Graph checks do not establish',16,MUTED),text(25,714,'chemical feasibility.',16,MUTED)]
    save('generator-mobile','Scaffold, variation, graph checks',parts,450,750)
    parts=[text(25,35,'THE ONE-FEATURE BOTTLENECK',16,CYAN),text(25,70,'Two abstract structures',20)]
    parts += [box(25,100,185,145),graph(110,155,26,CYAN),text(118,222,'Structure A',15,TEXT,'middle'),box(240,100,185,145),f'<path d="M270 160 L289 143 L308 160 L327 143 L347 160 M308 160 V184" fill="none" stroke="{AMBER}" stroke-width="2"/>',text(333,222,'Structure B',15,TEXT,'middle'),line(118,248,225,300),line(333,248,225,300),text(225,289,'equal mass assumed',13,MUTED,'middle'),box(100,323,250,90),text(225,359,'MolWt',24,CYAN,'middle'),text(225,389,'same single-number input',14,MUTED,'middle'),line(225,414,225,454),box(55,472,340,159),text(225,511,'Random forests',21,TEXT,'middle'),text(225,551,'Ê1  Ê2  Ê3',22,CYAN,'middle'),text(225,587,'Ê4  Ê5  Ê6',22,CYAN,'middle'),text(25,681,'Same input → same prediction.',17,AMBER),text(25,715,'No numerical energy predictions shown.',13,MUTED)]
    save('one-feature-mobile','Same molecular weight loses structural differences',parts,450,750)
    # The same active-stage pixel comparison, stacked for phone reading.
    frames=[]; font=ImageFont.load_default()
    for i in range(72):
        im=Image.new('RGB',(225,425),BG);d=ImageDraw.Draw(im)
        d.text((12,13),'THE EXPLORATION LOOP',fill=CYAN,font=font)
        for j,(_,_,num,title,sub) in enumerate(STEPS):
            y=46+j*56
            d.rectangle((12,y,212,y+44),fill=PANEL,outline=AMBER if j==2 else CYAN if i//12==j else LINE)
            d.text((20,y+6),num+' / '+title.replace('Calculate + check','Calculate/check'),fill=TEXT,font=font)
            d.text((20,y+25),sub.replace('MolWt → E1…E6','MolWt -> E1-E6'),fill=MUTED,font=font)
            if j<5:
                d.line((112,y+45,112,y+56),fill=LINE)
                if i//12==j:
                    dy=int(i%12/12*11)
                    d.rectangle((111,y+45+dy,113,y+47+dy),fill=AMBER)
        d.text((12,394),'Shortlist -> next batch',fill=CYAN,font=font)
        d.text((12,410),'Conceptual / human checks',fill=MUTED,font=font)
        frames.append(im.resize((450,850),Image.Resampling.NEAREST))
    frames[0].save(OUT/'workflow-pixel-mobile.png',optimize=True)
    frames[0].save(OUT/'workflow-pixel-mobile.gif',save_all=True,append_images=frames[1:],duration=120,loop=0,optimize=True)

if __name__=='__main__':
    OUT.mkdir(parents=True,exist_ok=True)
    workflow();generator();feature();pixel_workflow();mobile_figures()
    print('Saved three diagram concepts, desktop/mobile SVGs, and desktop/mobile pixel workflow GIFs/stills.')
