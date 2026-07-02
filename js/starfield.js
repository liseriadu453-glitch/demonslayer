/* ============================================
   STARFIELD — Ultra-lightweight static stars
   Uses a pre-rendered offscreen canvas (painted once)
   and only redraws a few twinkling stars per frame.
   ============================================ */

(function() {
    const canvas = document.getElementById('starfield');
    if (!canvas) return;

    const ctx = canvas.getContext('2d', { alpha: false });
    let width, height;

    const STATIC_STARS = 100;
    const TWINKLE_STARS = 15;

    let staticCanvas, staticCtx;
    let twinklers = [];
    let lastFrame = 0;
    const FRAME_BUDGET = 1000 / 20; // 20 FPS max

    function resize() {
        width = canvas.width = window.innerWidth;
        height = canvas.height = window.innerHeight;
        renderStaticLayer();
    }

    function renderStaticLayer() {
        staticCanvas = document.createElement('canvas');
        staticCanvas.width = width;
        staticCanvas.height = height;
        staticCtx = staticCanvas.getContext('2d');

        staticCtx.fillStyle = '#050510';
        staticCtx.fillRect(0, 0, width, height);

        for (let i = 0; i < STATIC_STARS; i++) {
            const x = Math.random() * width;
            const y = Math.random() * height;
            const size = Math.random() * 1.2 + 0.3;
            const brightness = Math.floor(Math.random() * 80 + 120);
            staticCtx.fillStyle = `rgb(${brightness},${brightness},${brightness + 30})`;
            staticCtx.fillRect(x | 0, y | 0, size, size);
        }

        twinklers = [];
        for (let i = 0; i < TWINKLE_STARS; i++) {
            twinklers.push({
                x: Math.random() * width,
                y: Math.random() * height,
                size: Math.random() * 1.5 + 0.5,
                phase: Math.random() * Math.PI * 2,
                speed: Math.random() * 0.002 + 0.001
            });
        }
    }

    function draw(time) {
        requestAnimationFrame(draw);

        const delta = time - lastFrame;
        if (delta < FRAME_BUDGET) return;
        lastFrame = time;

        ctx.drawImage(staticCanvas, 0, 0);

        for (let i = 0; i < twinklers.length; i++) {
            const t = twinklers[i];
            const alpha = 0.3 + Math.sin(time * t.speed + t.phase) * 0.3;
            ctx.fillStyle = `rgba(255,255,255,${alpha})`;
            ctx.fillRect(t.x | 0, t.y | 0, t.size, t.size);
        }
    }

    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(resize, 300);
    });

    resize();
    draw(0);
})();
