import os
import time
import base64
from playwright.sync_api import sync_playwright

os.makedirs('public/videos', exist_ok=True)

html_code = """<!DOCTYPE html>
<html>
<head>
<meta charset="utf-8">
<style>
  * { box-sizing: border-box; }
  body {
    margin: 0;
    padding: 0;
    background: #09090b;
    overflow: hidden;
    width: 1280px;
    height: 720px;
  }
  canvas {
    width: 1280px;
    height: 720px;
    display: block;
    filter: blur(72px) saturate(1.15);
  }
</style>
</head>
<body>
<canvas id="c" width="1280" height="720"></canvas>
<script>
  const canvas = document.getElementById('c');
  const ctx = canvas.getContext('2d');
  const w = canvas.width;
  const h = canvas.height;

  // Seamless 24-second visual cycle. All harmonic equations evaluate identically at t=0 and t=DURATION.
  const DURATION = 24.0;
  const TWO_PI = 2 * Math.PI;

  // Carefully calibrated atmospheric colored regions:
  // - Smoky Purple / Violet: ~20%
  // - Midnight Blue / Indigo: ~15%
  // - Deep Burgundy / Crimson: ~12%
  // - Soft diffuse white / light: ~8%
  // - Deep Charcoal / Black base: ~45%
  const atmosphericBlobs = [
    // 1. Smoky Purple (upper-left to center-left diagonal drift)
    {
      color: 'rgba(92, 42, 115, 0.72)',
      radius: 580,
      baseX: 0.28 * w,
      baseY: 0.32 * h,
      rx1: 140, ry1: 90, freq1: 1, phase1: 0.0,
      rx2: 40,  ry2: 50, freq2: 2, phase2: 1.2
    },
    // 2. Deep Violet / Plum (mid-left expansion)
    {
      color: 'rgba(74, 30, 92, 0.65)',
      radius: 640,
      baseX: 0.22 * w,
      baseY: 0.58 * h,
      rx1: 120, ry1: 110, freq1: 1, phase1: 3.14,
      rx2: 50,  ry2: 30,  freq2: 2, phase2: 0.5
    },
    // 3. Deep Burgundy / Crimson (lower-left to bottom-center drift)
    {
      color: 'rgba(122, 32, 48, 0.68)',
      radius: 560,
      baseX: 0.35 * w,
      baseY: 0.78 * h,
      rx1: 160, ry1: 100, freq1: 1, phase1: 1.57,
      rx2: 60,  ry2: 40,  freq2: 2, phase2: 2.8
    },
    // 4. Muted Crimson accent (lower-right to center drift)
    {
      color: 'rgba(108, 28, 42, 0.60)',
      radius: 500,
      baseX: 0.62 * w,
      baseY: 0.72 * h,
      rx1: 130, ry1: 80, freq1: 1, phase1: 4.71,
      rx2: 40,  ry2: 40, freq2: 2, phase2: 1.0
    },
    // 5. Midnight Blue (upper-right to center-right drift)
    {
      color: 'rgba(32, 62, 118, 0.72)',
      radius: 620,
      baseX: 0.75 * w,
      baseY: 0.35 * h,
      rx1: 150, ry1: 100, freq1: 1, phase1: 2.3,
      rx2: 50,  ry2: 60,  freq2: 2, phase2: 3.9
    },
    // 6. Muted Indigo (right quadrant deep atmosphere)
    {
      color: 'rgba(24, 46, 94, 0.68)',
      radius: 660,
      baseX: 0.82 * w,
      baseY: 0.62 * h,
      rx1: 110, ry1: 120, freq1: 1, phase1: 5.1,
      rx2: 40,  ry2: 50,  freq2: 2, phase2: 0.2
    },
    // 7. Soft Diffuse White / Neutral Atmospheric Highlight
    {
      color: 'rgba(235, 240, 252, 0.16)',
      radius: 420,
      baseX: 0.50 * w,
      baseY: 0.42 * h,
      rx1: 90, ry1: 70, freq1: 1, phase1: 0.8,
      rx2: 30, ry2: 30, freq2: 2, phase2: 4.5
    },
    // 8. Secondary Soft Highlight (breathing in upper center)
    {
      color: 'rgba(225, 232, 248, 0.12)',
      radius: 360,
      baseX: 0.42 * w,
      baseY: 0.25 * h,
      rx1: 80, ry1: 50, freq1: 1, phase1: 3.5,
      rx2: 30, ry2: 20, freq2: 3, phase2: 1.8
    }
  ];

  function render(time) {
    // 1. Base deep black / charcoal canvas
    ctx.fillStyle = '#09090b';
    ctx.fillRect(0, 0, w, h);

    // 2. Atmospheric charcoal wash
    const wash = ctx.createLinearGradient(0, 0, w, h);
    wash.addColorStop(0, '#0c0c10');
    wash.addColorStop(0.5, '#09090b');
    wash.addColorStop(1, '#0b0b0e');
    ctx.fillStyle = wash;
    ctx.fillRect(0, 0, w, h);

    // 3. Render organic atmospheric color fields
    for (let i = 0; i < atmosphericBlobs.length; i++) {
      const b = atmosphericBlobs[i];
      const theta1 = (time / DURATION) * TWO_PI * b.freq1 + b.phase1;
      const theta2 = (time / DURATION) * TWO_PI * b.freq2 + b.phase2;

      // Composite multi-frequency harmonic coordinates for unpredictable, organic fluid drift
      const x = b.baseX + Math.cos(theta1) * b.rx1 + Math.sin(theta2) * b.rx2;
      const y = b.baseY + Math.sin(theta1) * b.ry1 + Math.cos(theta2) * b.ry2;

      const grad = ctx.createRadialGradient(x, y, 0, x, y, b.radius);
      grad.addColorStop(0, b.color);
      // Soft mid-point falloff
      grad.addColorStop(0.45, b.color.replace(/[\d\.]+\)$/, '0.25)'));
      // Feather to deep transparent
      grad.addColorStop(1, 'rgba(9, 9, 11, 0)');

      ctx.fillStyle = grad;
      ctx.beginPath();
      ctx.arc(x, y, b.radius, 0, TWO_PI);
      ctx.fill();
    }
  }

  window.recordVideo = async function() {
    const stream = canvas.captureStream(30);
    const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9')
      ? 'video/webm;codecs=vp9'
      : 'video/webm';
    const recorder = new MediaRecorder(stream, {
      mimeType,
      videoBitsPerSecond: 3000000
    });

    const chunks = [];
    recorder.ondataavailable = (e) => {
      if (e.data.size > 0) chunks.push(e.data);
    };

    recorder.start();
    const fps = 30;
    const totalFrames = Math.round(DURATION * fps);

    for (let f = 0; f < totalFrames; f++) {
      render(f / fps);
      await new Promise((r) => setTimeout(r, 1000 / fps));
    }

    recorder.stop();
    await new Promise((resolve) => { recorder.onstop = resolve; });

    const blob = new Blob(chunks, { type: 'video/webm' });
    const reader = new FileReader();
    return new Promise((resolve) => {
      reader.onloadend = () => {
        resolve(reader.result.split(',')[1]);
      };
      reader.readAsDataURL(blob);
    });
  };
</script>
</body>
</html>
"""

def main():
    print("Launching Edge to record upgraded cinematic ambient video...")
    with sync_playwright() as p:
        browser = p.chromium.launch(channel="msedge", headless=True)
        page = browser.new_page(viewport={"width": 1280, "height": 720})
        page.set_content(html_code)
        print("Rendering and capturing 24-second multi-color atmospheric video...")
        b64_data = page.evaluate("window.recordVideo()")
        video_bytes = base64.b64decode(b64_data)
        out_path = os.path.join("public", "videos", "ambient-atmosphere.webm")
        with open(out_path, "wb") as f:
            f.write(video_bytes)
        print(f"Successfully generated upgraded ambient video: {out_path} ({len(video_bytes)} bytes)")
        browser.close()

if __name__ == "__main__":
    main()
