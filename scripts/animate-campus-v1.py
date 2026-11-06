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
SOURCE = ROOT / 'assets/art-source/baker-psb/v1'
OUTPUT = ROOT / 'public/art/baker-psb/v1'
WIDTH, HEIGHT = 1086, 362
FRAME_COUNT, FRAME_MS = 48, 100
VARIANTS = {
    'spring-morning': {'title': 'Spring morning', 'wind': 1.2, 'effect': 'pollen'},
    'summer-dawn': {'title': 'Summer dawn', 'wind': 1.0, 'effect': 'motes'},
    'autumn-wind': {'title': 'Autumn breeze', 'wind': 3.0, 'effect': 'leaves'},
    'summer-rain': {'title': 'Summer rain', 'wind': 1.8, 'effect': 'rain'},
    'autumn-rain': {'title': 'Autumn rain', 'wind': 2.5, 'effect': 'autumn-rain'},
    'winter-snow': {'title': 'Winter snow', 'wind': 1.0, 'effect': 'snow'},
}


def tree_weights():
    """Corner canopies only. Building facades and columns remain fixed."""
    mask = Image.new('L', (WIDTH, HEIGHT))
    draw = ImageDraw.Draw(mask)
    draw.polygon([(0, 0), (260, 0), (230, 35), (110, 110), (30, 190), (0, 240)], fill=255)
    draw.polygon([(910, 0), (1085, 0), (1085, 361), (1070, 315), (1067, 105), (1040, 60), (990, 35)], fill=255)
    yy, xx = np.mgrid[:HEIGHT, :WIDTH]
    # Taper motion toward fixed trunks and lower branches.
    left = np.clip((250 - yy) / 220, 0, 1)
    right = np.clip((340 - yy) / 260, 0, 1)
    return np.where(xx < WIDTH / 2, left, right) * (np.asarray(mask) / 255)


WEIGHTS = tree_weights()
YY, XX = np.mgrid[:HEIGHT, :WIDTH]


def render(base, spec, frame_index):
    t = frame_index / FRAME_COUNT
    phase = t * math.tau
    # A single periodic cycle means the loop closes without a jump.
    dx = np.rint(spec['wind'] * WEIGHTS * np.sin(phase + YY / 70)).astype(int)
    dy = np.rint(0.6 * WEIGHTS * np.sin(phase + XX / 85)).astype(int)
    array = np.asarray(base)
    shifted = array[np.clip(YY + dy, 0, HEIGHT - 1), np.clip(XX + dx, 0, WIDTH - 1)]
    image = Image.fromarray(shifted)
    overlay = Image.new('RGBA', image.size)
    draw = ImageDraw.Draw(overlay)
    rng = random.Random(2706)
    effect = spec['effect']
    if effect in ('rain', 'autumn-rain'):
        for _ in range(100):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            y = int((y0 + t * HEIGHT * 3) % HEIGHT)
            x = int((x0 - (y - y0) * 0.2) % WIDTH)
            length = rng.randrange(4, 10)
            draw.line((x, y, x - 2, y + length), fill=(194, 215, 220, 82), width=1)
        # Small ripples confined to the walkways near the bottom edge.
        for x0, y0 in [(285, 322), (345, 345), (942, 334), (1002, 350)]:
            age = (t * 3 + x0 / WIDTH) % 1
            radius = int(age * 6)
            if radius:
                draw.ellipse((x0-radius, y0-radius//3, x0+radius, y0+radius//3), outline=(205, 219, 217, int((1-age)*90)))
    if effect == 'snow':
        for _ in range(100):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            x = int((x0 + 8 * math.sin(phase + y0)) % WIDTH)
            y = int((y0 + t * HEIGHT) % HEIGHT)
            size = rng.choice([1, 1, 2])
            draw.rectangle((x, y, x+size-1, y+size-1), fill=(238, 243, 247, rng.randrange(120, 230)))
    if effect in ('leaves', 'autumn-rain'):
        for _ in range(17 if effect == 'leaves' else 8):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            x = int((x0 + t * WIDTH + 8 * math.sin(phase + y0)) % WIDTH)
            y = int((y0 + t * HEIGHT) % HEIGHT)
            color = rng.choice([(192, 107, 41, 210), (218, 156, 59, 220), (162, 78, 39, 220)])
            draw.line((x, y, x + (2 if frame_index % 12 < 6 else 1), y+1), fill=color, width=1)
    if effect in ('pollen', 'motes'):
        for _ in range(18):
            x0, y0 = rng.randrange(WIDTH), rng.randrange(HEIGHT)
            x = int((x0 + 6 * math.sin(phase + y0)) % WIDTH)
            y = int((y0 - t * HEIGHT) % HEIGHT)
            draw.point((x, y), fill=(247, 232, 174, 100))
    return Image.alpha_composite(image.convert('RGBA'), overlay).convert('RGB')


def build():
    OUTPUT.mkdir(parents=True, exist_ok=True)
    report = []
    sheet = Image.new('RGB', (1086, 3 * (181 + 26)), '#152321')
    labels = ImageDraw.Draw(sheet)
    for index, (slug, spec) in enumerate(VARIANTS.items()):
        source = SOURCE / f'{slug}.png'
        if not source.exists():
            raise FileNotFoundError(f'Generate and save {source} before encoding.')
        base = Image.open(source).convert('RGB').resize((WIDTH, HEIGHT), Image.Resampling.NEAREST)
        # Shared palette per scene avoids palette flicker across frames.
        palette = base.quantize(colors=224, method=Image.Quantize.MEDIANCUT)
        frames = [render(base, spec, i).quantize(palette=palette, dither=Image.Dither.NONE) for i in range(FRAME_COUNT)]
        destination = OUTPUT / f'{slug}.gif'
        frames[0].save(destination, save_all=True, append_images=frames[1:], duration=FRAME_MS, loop=0, optimize=True, disposal=1)
        frames[0].convert('RGB').save(OUTPUT / f'{slug}.png', optimize=True)
        with Image.open(destination) as check:
            assert check.n_frames == FRAME_COUNT, (slug, check.n_frames)
            assert check.info.get('loop') == 0
            assert check.size == (WIDTH, HEIGHT)
            total_ms = sum((check.seek(i) or check.info['duration']) for i in range(check.n_frames))
        report.append({'id': slug, 'frames': FRAME_COUNT, 'loopMs': total_ms, 'width': WIDTH, 'height': HEIGHT, 'bytes': destination.stat().st_size})
        row, col = divmod(index, 2)
        thumb = base.resize((543, 181), Image.Resampling.NEAREST)
        sheet.paste(thumb, (col*543, row*207+26))
        labels.text((col*543+10, row*207+7), spec['title'], fill='#e1d8ba')
        print(f'{slug}: {destination.stat().st_size / 1024:.0f} KiB, {FRAME_COUNT} frames, {total_ms} ms')
    sheet.save(SOURCE / 'contact-sheet.png')
    (OUTPUT / 'manifest.json').write_text(json.dumps(report, indent=2)+'\n')


if __name__ == '__main__':
    build()
