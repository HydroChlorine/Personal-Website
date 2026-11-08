"""Encode generated campus art as small, reproducible looping GIFs.

Creative artwork is made with image_gen, not by filtering a photograph.
This finishing pass resamples to a shared pixel grid, gently displaces only
corner tree regions, and composites deterministic weather/ambient sprites.
Run with Python 3, Pillow, and NumPy; no network calls or paid API calls.
"""
from pathlib import Path
import math
import json
import random
import numpy as np
from PIL import Image, ImageDraw, ImageFont

ROOT = Path(__file__).resolve().parents[1]
SOURCE = ROOT / 'assets/art-source/baker-psb/v2'
OUTPUT = ROOT / 'public/art/baker-psb/v2'
WIDTH, HEIGHT = 384, 128
EXPORT_SCALE = 3
FRAME_COUNT, FRAME_MS = 48, 100
# One deliberately shared 32-color art palette across every seasonal variant.
ART_PALETTE = [
    '#091921', '#10262f', '#16343c', '#23464e', '#2f5b62', '#4d8186',
    '#91d2cf', '#c2e9cb', '#303f46', '#4d555b', '#68716e', '#91988a',
    '#adaf9f', '#c4c6aa', '#113b31', '#1a4c39', '#286044', '#3d7150',
    '#a7814e', '#d1a464', '#e2bf78', '#f4d592', '#50373b', '#744136',
    '#9c5836', '#bd773c', '#3d5669', '#63879c', '#87b0bd', '#2c2d42',
    '#454359', '#71637a',
]
VARIANTS = {
    'spring-night': {'title': 'Spring moonlight', 'wind': 1.7, 'effect': 'fireflies'},
    'summer-dawn': {'title': 'Before sunrise', 'wind': 1.5, 'effect': 'fireflies'},
    'autumn-wind': {'title': 'Autumn moonlight', 'wind': 2.6, 'effect': 'leaves'},
    'summer-rain': {'title': 'Summer night rain', 'wind': 1.8, 'effect': 'rain'},
    'autumn-rain': {'title': 'Autumn night rain', 'wind': 2.5, 'effect': 'autumn-rain'},
    'winter-snow': {'title': 'Winter moonlight', 'wind': 1.0, 'effect': 'snow'},
}


def tree_weights():
    """Corner canopies only. Building facades and columns remain fixed."""
    mask = Image.new('L', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(mask)
    draw.polygon([(133, 60), (169, 60), (177, 70), (176, 90), (141, 96)], fill=255)
    draw.polygon([(337, 0), (383, 0), (383, 51), (367, 48), (360, 25), (340, 18)], fill=255)
    yy, xx = np.mgrid[:HEIGHT, :WIDTH]
    # Each canopy leans periodically; fixed architecture is outside these masks.
    return np.clip((110 - yy) / 70, 0, 1) * (np.asarray(mask) / 255)



WEIGHTS = tree_weights()
YY, XX = np.mgrid[:HEIGHT, :WIDTH]


def render(base, spec, frame_index):
    t = frame_index / FRAME_COUNT
    phase = t * math.tau
    # A single periodic cycle means the loop closes without a jump.
    dx = np.rint(spec['wind'] * WEIGHTS * np.sin(phase + YY / 25)).astype(int)
    dy = np.rint(0.8 * WEIGHTS * np.sin(phase + XX / 30)).astype(int)
    array = np.asarray(base)
    shifted = array[np.clip(YY + dy, 0, HEIGHT - 1), np.clip(XX + dx, 0, WIDTH - 1)]
    image = Image.fromarray(shifted)
    overlay = Image.new('RGBA', image.size)
    draw = ImageDraw.Draw(overlay)
    rng = random.Random(2706)
    effect = spec['effect']
    if effect in ('rain', 'autumn-rain'):
        for _ in range(65):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            y = int((y0 + t * HEIGHT * 3) % HEIGHT)
            x = int((x0 - (y - y0) * 0.2) % WIDTH)
            length = rng.randrange(3, 7)
            draw.line((x, y, x - 2, y + length), fill=(124, 185, 191, 110), width=1)
        # Small ripples confined to the walkways near the bottom edge.
        for x0, y0 in [(231, 117), (251, 122), (276, 119)]:
            age = (t * 3 + x0 / WIDTH) % 1
            radius = int(age * 4)
            if radius:
                draw.ellipse((x0-radius, y0-radius//3, x0+radius, y0+radius//3), outline=(205, 219, 217, int((1-age)*90)))
    if effect == 'snow':
        for _ in range(65):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            x = int((x0 + 8 * math.sin(phase + y0)) % WIDTH)
            y = int((y0 + t * HEIGHT) % HEIGHT)
            size = rng.choice([1, 2, 2])
            draw.rectangle((x, y, x+size-1, y+size-1), fill=(238, 243, 247, rng.randrange(120, 230)))
    if effect in ('leaves', 'autumn-rain'):
        for _ in range(12 if effect == 'leaves' else 8):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            x = int((x0 + t * WIDTH + 8 * math.sin(phase + y0)) % WIDTH)
            y = int((y0 + t * HEIGHT) % HEIGHT)
            color = rng.choice([(192, 107, 41, 210), (218, 156, 59, 220), (162, 78, 39, 220)])
            draw.line((x, y, x + (2 if frame_index % 12 < 6 else 1), y+1), fill=color, width=1)
    if effect == 'fireflies':
        for _ in range(10):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            x = int((x0 + 6 * math.sin(phase + y0)) % WIDTH)
            y = int((y0 + 5 * math.sin(phase + x0)) % HEIGHT)
            draw.rectangle((x, y, x+1, y+1), fill=(167, 211, 137, int(100 + 80*math.sin(phase+y0))))
    if effect not in ('rain', 'autumn-rain'):
        for j, (x, y) in enumerate([(201, 20), (292, 14), (327, 31)]):
            if math.sin(phase + j*2) > 0.3:
                draw.line((x-1,y,x+1,y), fill=(124,203,207,150))
                draw.line((x,y-1,x,y+1), fill=(124,203,207,150))
    return Image.alpha_composite(image.convert('RGBA'), overlay).convert('RGB')


def build():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = []
    sheet = Image.new('RGB', (1152, 3 * (192 + 26)), '#101c22')
    labels = ImageDraw.Draw(sheet)
    for index, (slug, spec) in enumerate(VARIANTS.items()):
        source = SOURCE / f'{slug}.png'
        if not source.exists():
            raise FileNotFoundError(f'Generate and save {source} before encoding.')
        base = Image.open(source).convert('RGB').resize((WIDTH, HEIGHT), Image.Resampling.NEAREST)
        # Shared palette per scene avoids palette flicker across frames.
        palette = Image.new('P', (1, 1))
        colors = [tuple(bytes.fromhex(color[1:])) for color in ART_PALETTE]
        palette.putpalette([channel for color in colors for channel in color] + list(colors[0]) * (256-len(colors)))
        frames = [render(base, spec, i).quantize(palette=palette, dither=Image.Dither.NONE) for i in range(FRAME_COUNT)]
        destination = OUTPUT / f'{slug}.gif'
        frames = [frame.resize((WIDTH*EXPORT_SCALE, HEIGHT*EXPORT_SCALE), Image.Resampling.NEAREST) for frame in frames]
        frames[0].save(destination, save_all=True, append_images=frames[1:], duration=FRAME_MS, loop=0, optimize=True, disposal=1)
        frames[0].convert('RGB').save(OUTPUT / f'{slug}.png', optimize=True)
        with Image.open(destination) as check:
            assert check.n_frames == FRAME_COUNT, (slug, check.n_frames)
            assert check.info.get('loop') == 0
            assert check.size == (WIDTH*EXPORT_SCALE, HEIGHT*EXPORT_SCALE)
            total_ms = sum((check.seek(i) or check.info['duration']) for i in range(check.n_frames))
        report.append({'id': slug, 'frames': FRAME_COUNT, 'loopMs': total_ms, 'width': WIDTH*EXPORT_SCALE, 'height': HEIGHT*EXPORT_SCALE, 'nativeWidth': WIDTH, 'nativeHeight': HEIGHT, 'paletteColors': 32, 'bytes': destination.stat().st_size})
        row, col = divmod(index, 2)
        thumb = frames[0].convert('RGB').resize((576, 192), Image.Resampling.NEAREST)
        sheet.paste(thumb, (col*576, row*218+26))
        labels.text((col*576+10, row*218+7), spec['title'], fill='#e1d8ba')
        print(f'{slug}: {destination.stat().st_size / 1024:.0f} KiB, {FRAME_COUNT} frames, {total_ms} ms')
    sheet.save(SOURCE / 'contact-sheet.png')
    (OUTPUT / 'manifest.json').write_text(json.dumps(report, indent=2)+'\n')


if __name__ == '__main__':
    build()
