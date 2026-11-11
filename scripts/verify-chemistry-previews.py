"""Read-only checks of the shipped teaser animations and story-specific behavior."""
from pathlib import Path
import importlib.util,json,hashlib
import numpy as np
from PIL import Image,ImageSequence
ROOT=Path(__file__).resolve().parents[1]
spec=importlib.util.spec_from_file_location('previews',ROOT/'scripts/animate-chemistry-previews.py')
a=importlib.util.module_from_spec(spec);spec.loader.exec_module(a)
manifest=json.loads((a.OUT/'previews-manifest.json').read_text());assert set(manifest)==set(a.SCENES)
for slug,entry in manifest.items():
 with Image.open(a.OUT/entry['still']) as still:assert still.size==(768,432)
 hashes=set();duration=0
 with Image.open(a.OUT/entry['gif']) as gif:
  assert gif.size==(768,432) and gif.info['loop']==0
  for i,frame in enumerate(ImageSequence.Iterator(gif)):
   duration+=frame.info['duration'];arr=np.array(frame.convert('RGB'));hashes.add(hashlib.sha256(arr.tobytes()).digest())
   if i%15==0:assert np.array_equal(arr,np.repeat(np.repeat(arr[::2,::2],2,0),2,1)),slug
 assert duration==12000 and len(hashes)>5,(slug,duration,len(hashes))
# Inspect rendered behavior rather than only trusting metadata.
def avg(fn,t,box,channel):return np.array(fn(t))[box[1]:box[3],box[0]:box[2],channel].mean()
assert avg(a.tonic,.05,(250,95,282,160),2)>avg(a.tonic,.9,(250,95,282,160),2)+60,'fluorescence must fade'
for x in [83,177,271]:assert avg(a.reactions,.02,(x+8,115,x+25,145),0)>avg(a.reactions,.98,(x+8,115,x+25,145),0)+80,'all three reactions must become clear'
# Three detector lights must register the three arrivals before a flight cycle resets.
flight=np.array(a.tof(.49));
for j in range(3):assert tuple(flight[107+j*15,339])==a.rgb([a.CYAN,a.GOLD,a.PINK][j]),('missing ion arrival',j)
# Both thermometers rise, but the connected-unit illustration rises less.
heat=np.array(a.combustion(.9));coral=np.array(a.rgb(a.CORAL))
left=np.all(heat[70:158,160]==coral,axis=1).sum();right=np.all(heat[70:158,325]==coral,axis=1).sum()
assert left>right>10,('thermometer rises',left,right)
# Synthetic spectral stack completes; its final silhouette remains visible.
assert not np.array_equal(np.array(a.dyes(.1)),np.array(a.dyes(.9)))
print(json.dumps({'previews':15,'dimensions':[768,432],'loopMs':12000,'checks':'moving frames, native pixel grid, pause stills, fluorescence fade, three clear vials, three ion arrivals, unequal temperature rises'},indent=2))
