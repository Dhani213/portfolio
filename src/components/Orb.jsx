import { useEffect, useRef } from "react";
import { SKILLS } from "../data";

// 3D rotating sphere of skill tags. Move the mouse over it to steer it.
export default function Orb() {
  const ref = useRef();
  useEffect(() => {
    const box = ref.current, els = [...box.children], n = els.length;
    const pts = els.map((_, i) => { const y = 1 - 2 * (i + .5) / n, rr = Math.sqrt(1 - y * y), a = i * 2.4; return [Math.cos(a) * rr, y, Math.sin(a) * rr]; });
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let rx = 0, ry = 0, sx = .003, sy = .007, tx = 0, ty = 0, raf;
    const mv = e => { const b = box.getBoundingClientRect(); ty = ((e.clientX - b.left) / b.width - .5) * .04; tx = ((e.clientY - b.top) / b.height - .5) * -.04; };
    const lv = () => { tx = 0; ty = 0; };
    box.addEventListener("mousemove", mv); box.addEventListener("mouseleave", lv);
    const loop = () => {
      sx += ((tx || .003) - sx) * .05; sy += ((ty || .007) - sy) * .05;
      if (!calm) { rx += sx; ry += sy; }
      const R = Math.min(box.clientWidth * .34, 160), XR = Math.min(R * 1.6, box.clientWidth / 2 - 55);
      const cx = Math.cos(rx), sX = Math.sin(rx), cy = Math.cos(ry), sY = Math.sin(ry);
      pts.forEach((q, i) => {
        const y1 = q[1] * cx - q[2] * sX, z1 = q[1] * sX + q[2] * cx;
        const x2 = q[0] * cy + z1 * sY, z2 = -q[0] * sY + z1 * cy;
        const d = (z2 + 1) / 2, e = els[i].style;
        e.transform = `translate(-50%,-50%) translate3d(${x2 * XR}px,${y1 * R}px,${z2 * R}px) scale(${.7 + .5 * d})`;
        e.opacity = .3 + .7 * d; e.zIndex = Math.round(d * 10);
      });
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => { cancelAnimationFrame(raf); box.removeEventListener("mousemove", mv); box.removeEventListener("mouseleave", lv); };
  }, []);
  return (
    <div className="orb" ref={ref} aria-hidden="true">
      {SKILLS.flatMap(g => g[1]).map(s => <span key={s}>{s}</span>)}
    </div>
  );
}
