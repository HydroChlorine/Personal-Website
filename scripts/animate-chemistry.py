"""Finish original image_gen laboratory masters on the site's 384x128 pixel grid.

Pillow/NumPy only, offline. Apparatus stays fixed; local sprites illustrate motion.
The drawings are artistic vignettes, not protocols or measured instrument traces.
Run with Python 3 + Pillow + NumPy. No campus artwork is changed.
"""
from pathlib import Path
import json
import math
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/art-source/chemistry/v1'
OUT = ROOT / 'public/art/chemistry/v1'
W, H, SCALE, MS = 384, 128, 3, 100
COLORS = ['#07141e','#0a1923','#102630','#16333c','#214550','#315967','#4c7783','#749ca5','#9bc8ca','#c3e5dd',
          '#102732','#1c3341','#304959','#49616e','#647e88','#8da6ab','#b5c7c5','#d6ded0',
          '#133b3a','#21554f','#35766b','#55a08c','#89c3a6','#463a2e','#705133','#997039','#c08e44','#e1b767',
          '#503c42','#86574c','#b37560','#ce9c80']
PALETTE = Image.new('P',(1,1))
PALETTE.putpalette([v for c in COLORS for v in tuple(bytes.fromhex(c[1:]))] + [0]*(768-len(COLORS)*3))
DURATIONS = {'reflux': 72, 'cold-reaction':80, 'screening':80, 'workup-column':160, 'hplc-ms':100, 'nmr':120}

def small_master(name):
    return Image.open(SOURCE/f'{name}.png').convert('RGB').resize((W,H),Image.Resampling.NEAREST).quantize(palette=PALETTE,dither=Image.Dither.NONE).convert('RGB')

def moved_sprite(base, box, dx, dy, clip_bottom=None, mask_polygon=None):
    """Move a narrow isolated apparatus sprite, clearing its quiet wall backdrop."""
    im=base.copy(); crop=base.crop(box).convert('RGBA')
    mask=Image.new('L',crop.size,255)
    if mask_polygon:
        mask=Image.new('L',crop.size,0)
        ImageDraw.Draw(mask).polygon([(x-box[0],y-box[1]) for x,y in mask_polygon],fill=255)
    # Color sampled beside each source row avoids a conspicuous rectangular patch.
    fill=Image.new('RGB',crop.size)
    fd=ImageDraw.Draw(fill)
    for y in range(crop.height):
        fd.line((0,y,crop.width,y),fill=base.getpixel((box[0]-2,box[1]+y)))
    im.paste(fill,box[:2],mask)
    if clip_bottom is not None:
        md=ImageDraw.Draw(mask)
        cutoff=max(0,clip_bottom-box[1]-dy)
        if cutoff<crop.height: md.rectangle((0,cutoff,crop.width,crop.height),fill=0)
    im.paste(crop,(box[0]+dx,box[1]+dy),mask)
    return im

# A row-based axisymmetric vessel approximation. Liquid volume is proportional
# to radius squared, so both interfaces respond to the same drained volume.
FUNNEL_ROWS = [(y, min(13, max(1, round((65-y)*.7)))) for y in range(41,65)]
def capacity_below(level):
    return sum(radius**2 * max(0, min(1, y+1-level)) for y,radius in FUNNEL_ROWS)
def level_for_volume(volume):
    remaining=max(0,volume)
    for y,radius in reversed(FUNNEL_ROWS):
        weight=radius**2
        if remaining<=weight:return y+1-remaining/weight
        remaining-=weight
    return FUNNEL_ROWS[0][0]
def extraction_levels(progress):
    fraction=max(0,min(1,progress))
    lower_initial=capacity_below(51)
    upper_volume=capacity_below(41)-lower_initial
    lower_remaining=lower_initial*(1-fraction)
    return level_for_volume(upper_volume+lower_remaining),level_for_volume(lower_remaining)

def render(base,name,i,count):
    t=i/count; phase=t*math.tau; sec=i*MS/1000
    im=base.copy()
    if name=='screening':
        # Clear only the original tiny stir-bar sprites inside the visible liquid.
        bd=ImageDraw.Draw(im)
        for x,y in [(237,59),(248,55),(259,51),(269,46),(280,70),(293,66),(305,64),(315,59)]:
            bd.rectangle((x-2,y-1,x+2,y+1),fill=base.getpixel((x,y-3)))
    if name=='reflux':
        # Balloon adapter stays still; only the soft outer lobe breathes by one pixel.
        arr=np.asarray(base).copy()
        for y in range(3,26):
            shift=round(math.sin(phase)*max(0,1-abs(y-14)/12))
            arr[y,289:322]=np.asarray(base)[max(0,y+shift),289:322]
        im=Image.fromarray(arr)
    if name=='nmr':
        # Down into the bore, hold for acquisition, then stylized sample ejection.
        progress=0 if t<.12 else min(1,(t-.12)/.3) if t<.42 else 1 if t<.76 else max(0,1-(t-.76)/.24)
        im=moved_sprite(base,(275,5,281,42),0,round(39*progress),clip_bottom=44)
    if name=='hplc-ms':
        advance=0 if t<.1 else min(1,(t-.1)/.18) if t<.28 else 1 if t<.48 else max(0,1-(t-.48)/.18)
        im=moved_sprite(base,(244,47,272,82),-round(5*advance),round(6*advance),mask_polygon=[(244,77),(247,81),(273,52),(268,47)])
    overlay=Image.new('RGBA',(W,H)); d=ImageDraw.Draw(overlay)
    if name=='reflux':
        for n in range(5):
            y=26+int((n*9+sec*8)%34)
            d.rectangle((270,y,271,y+1),fill=(169,221,216,190))
        for n in range(4):
            a=(t*3+n*.24)%1; x=264+(n*5)%13; y=96-int(a*8)
            d.rectangle((x,y,x+1,y+1),outline=(170,220,205,int(150*(1-a))))
        span=round(3*math.cos(phase*3));d.line((270-span,97,270+span,97),fill=(203,229,213,210))
        d.rectangle((258,112,260,113),fill=(225,183,103,round(170+70*math.sin(phase))))
    elif name=='cold-reaction':
        for n in range(13):
            a=(t+n/13)%1
            side=-1 if n%2 else 1
            x=270+side*(28+int(a*17))+round(math.sin(phase+n)*3)
            y=76+int(a*38)
            alpha=int(70*math.sin(math.pi*a))
            d.polygon([(x-5,y),(x-2,y),(x-2,y-2),(x+3,y-2),(x+3,y),(x+6,y),(x+6,y+2),(x+2,y+2),(x+2,y+4),(x-5,y+4)],fill=(155,200,203,alpha))
        for x,y in [(239,71),(248,75),(285,74),(295,71)]:
            d.rectangle((x,y,x+2,y+1),fill=(195,229,221,round(100+45*math.sin(phase+x))))
    elif name=='screening':
        for n,(x,y) in enumerate([(237,59),(248,55),(259,51),(269,46),(280,70),(293,66),(305,64),(315,59)]):
            angle=phase*4+n*.6
            dx=round(2*math.cos(angle));dy=round(math.sin(angle))
            d.line((x-dx,y-dy,x+dx,y+dy),fill=(195,229,221,230))
        d.rectangle((231,102,232,103),fill=(225,183,103,round(185+30*math.sin(phase))))
    elif name=='workup-column':
        drain=min(1,max(0,(sec-2)/4))
        surface,interface=extraction_levels(drain)
        # Clear the complete old liquid interior, then redraw both phases from
        # conserved upper volume and the decreasing lower-phase volume.
        d.rectangle((240,39,266,40),fill=(16,38,48,255))
        for y,half in FUNNEL_ROWS:
            fill=(16,38,48,255) if y+.5<surface else (85,160,140,255) if y+.5<interface else (192,142,68,255)
            d.line((253-half,y,253+half,y),fill=fill)
        # Surface / phase boundary move down together; the receiving level rises.
        for level,color in [(surface,(137,195,166,240)),(interface,(225,183,103,220))]:
            if level<64:
                yy=round(level);half=min(13,max(1,round((65-yy)*.7)))
                d.line((253-half,yy,253+half,yy),fill=color)
        for yy in range(96,106):
            half=max(1,round((yy-81)*.48))
            fill=(192,142,68,255) if yy>=101-round(4*drain) else (16,38,48,255)
            d.line((253-half,yy,253+half,yy),fill=fill)
        if 2<sec<6:
            y=74+int((sec*15)%16);d.rectangle((253,y,254,y+2),fill=(225,183,103,220))
        # Thin colored bands travel through pale silica, never backwards.
        d.rectangle((312,32,320,68),fill=(181,199,197,255))
        travel=min(1,max(0,(sec-7)/7))
        for start,offset,color in [(38,0,(85,160,140,255)),(48,1,(225,183,103,255))]:
            y=start+int(30*travel)
            if y<69: d.rectangle((312,y,320,min(68,y+2)),fill=color)
        if 10<sec<14:
            y=82+int((sec*13)%12);d.rectangle((316,y,317,y+2),fill=(85,160,140,230))
            d.rectangle((312,100,318,102),fill=(85,160,140,220))
        # Deliberate lights-down transition hides the sample reset at the loop seam.
        shade=max(0,1-sec/.7,1-(count*MS/1000-sec)/.7)
        if shade>0: d.rectangle((0,0,W,H),fill=(7,20,30,int(shade*245)))
    elif name=='hplc-ms':
        # Recess the syringe plunger after insertion; the needle remains in the port.
        if .28<t<.48:
            d.line((262,58,259,62),fill=(195,229,221,240),width=1)
        # A scanning readout is decorative, not an experimental chromatogram.
        d.rectangle((188,83,222,94),fill=(16,38,48,255))
        pts=[]
        for x in range(188,223):
            q=x-188
            peak=sum(a*math.exp(-((q-c)/s)**2) for c,a,s in [(7,3,1),(16,8,1.3),(25,4,1.1)])
            pts.append((x,93-round(peak)))
        limit=min(35,max(2,int((t-.48)/.46*35)))
        if t>.48: d.line(pts[:max(2,limit)],fill=(137,195,166,255),width=1)
        d.rectangle((244+int(t*31)%31,86,245+int(t*31)%31,86),fill=(195,229,221,210))
    elif name=='nmr':
        if .42<t<.78:
            for n in range(4):
                h=3+round(abs(math.sin(phase*3+n))*9)
                d.line((342+n*3,87,342+n*3,87-h),fill=(137,195,166,220))
    return Image.alpha_composite(im.convert('RGBA'),overlay).convert('RGB').quantize(palette=PALETTE,dither=Image.Dither.NONE).resize((W*SCALE,H*SCALE),Image.Resampling.NEAREST)

def main():
    OUT.mkdir(parents=True,exist_ok=True)
    manifest={}
    for name,count in DURATIONS.items():
        base=small_master(name)
        frames=[render(base,name,i,count) for i in range(count)]
        # Pause still is a readable apparatus view, not the dark seam frame.
        frames[10].convert('RGB').save(OUT/f'{name}.png',optimize=True)
        frames[0].save(OUT/f'{name}.gif',save_all=True,append_images=frames[1:],duration=MS,loop=0,optimize=True,disposal=1)
        manifest[name]={'size':[W*SCALE,H*SCALE],'logicalSize':[W,H],'frames':count,'durationMs':count*MS,'gifBytes':(OUT/f'{name}.gif').stat().st_size}
    (OUT/'manifest.json').write_text(json.dumps(manifest,indent=2)+'\n')
    sheet=Image.new('RGB',(768,3*150),'#07141e');sd=ImageDraw.Draw(sheet)
    for i,name in enumerate(DURATIONS):
        x=i%2*384;y=i//2*150
        sheet.paste(Image.open(OUT/f'{name}.png').resize((384,128),Image.Resampling.NEAREST),(x,y+20))
        sd.text((x+8,y+3),name,fill='#9bc8ca')
    sheet.save(SOURCE/'animated-stills.png')
    print(json.dumps(manifest,indent=2))
if __name__=='__main__': main()
