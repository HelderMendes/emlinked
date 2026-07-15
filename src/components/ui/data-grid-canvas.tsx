'use client';

import { useEffect, useRef } from 'react';

/**
 * Animated data-grid: a field of grid nodes where pulses travel along
 * horizontal/vertical lines, evoking connected real-estate data.
 * Rendered on navy background with amber accent pulses.
 */
export function DataGridCanvas({ className }: { className?: string }) {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;
        const ctx = canvas.getContext('2d');
        if (!ctx) return;

        const prefersReduced = window.matchMedia(
            '(prefers-reduced-motion: reduce)',
        ).matches;

        let width = 0;
        let height = 0;
        let dpr = Math.min(window.devicePixelRatio || 1, 2);
        const spacing = 56;

        type Pulse = {
            col: number;
            row: number;
            dir: 'h' | 'v';
            pos: number;
            speed: number;
            len: number;
        };
        let pulses: Pulse[] = [];
        let cols = 0;
        let rows = 0;

        function resize() {
            if (!canvas || !ctx) return;
            const parent = canvas.parentElement;
            if (!parent) return;
            width = parent.clientWidth;
            height = parent.clientHeight;
            dpr = Math.min(window.devicePixelRatio || 1, 2);
            canvas.width = width * dpr;
            canvas.height = height * dpr;
            canvas.style.width = width + 'px';
            canvas.style.height = height + 'px';
            ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
            cols = Math.ceil(width / spacing) + 1;
            rows = Math.ceil(height / spacing) + 1;
            seedPulses();
        }

        function seedPulses() {
            const count = prefersReduced
                ? 0
                : Math.max(6, Math.floor((cols + rows) / 3));
            pulses = Array.from({ length: count }, () => makePulse());
        }

        function makePulse(): Pulse {
            const dir = Math.random() > 0.5 ? 'h' : 'v';
            return {
                col: Math.floor(Math.random() * cols),
                row: Math.floor(Math.random() * rows),
                dir,
                pos: Math.random() * (dir === 'h' ? width : height),
                speed: 0.4 + Math.random() * 0.9,
                len: 40 + Math.random() * 90,
            };
        }

        function draw() {
            if (!ctx) return;
            ctx.clearRect(0, 0, width, height);

            // grid dots
            ctx.fillStyle = 'rgba(255,255,255,0.10)';
            for (let c = 0; c < cols; c++) {
                for (let r = 0; r < rows; r++) {
                    ctx.beginPath();
                    ctx.arc(c * spacing, r * spacing, 1, 0, Math.PI * 2);
                    ctx.fill();
                }
            }

            // pulses
            for (const p of pulses) {
                if (p.dir === 'h') {
                    const y = p.row * spacing;
                    const x = p.pos;
                    const grad = ctx.createLinearGradient(x - p.len, y, x, y);
                    grad.addColorStop(0, 'rgba(255,148,0,0)');
                    grad.addColorStop(1, 'rgba(255,148,0,0.85)');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(x - p.len, y);
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    ctx.fillStyle = 'rgba(255,148,0,1)';
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();

                    p.pos += p.speed;
                    if (p.pos - p.len > width) {
                        p.pos = -p.len;
                        p.row = Math.floor(Math.random() * rows);
                    }
                } else {
                    const x = p.col * spacing;
                    const y = p.pos;
                    const grad = ctx.createLinearGradient(x, y - p.len, x, y);
                    grad.addColorStop(0, 'rgba(255,148,0,0)');
                    grad.addColorStop(1, 'rgba(255,148,0,0.7)');
                    ctx.strokeStyle = grad;
                    ctx.lineWidth = 1.5;
                    ctx.beginPath();
                    ctx.moveTo(x, y - p.len);
                    ctx.lineTo(x, y);
                    ctx.stroke();

                    ctx.fillStyle = 'rgba(255,148,0,1)';
                    ctx.beginPath();
                    ctx.arc(x, y, 2, 0, Math.PI * 2);
                    ctx.fill();

                    p.pos += p.speed;
                    if (p.pos - p.len > height) {
                        p.pos = -p.len;
                        p.col = Math.floor(Math.random() * cols);
                    }
                }
            }
        }

        let raf = 0;
        function loop() {
            draw();
            raf = requestAnimationFrame(loop);
        }

        resize();
        if (prefersReduced) {
            draw();
        } else {
            loop();
        }

        window.addEventListener('resize', resize);
        return () => {
            window.removeEventListener('resize', resize);
            cancelAnimationFrame(raf);
        };
    }, []);

    return <canvas ref={canvasRef} aria-hidden className={className} />;
}
