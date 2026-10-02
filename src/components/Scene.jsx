import { useEffect, useRef } from "react";
import * as THREE from "three";

// Full-page 3D background: wireframe icosahedron, torus knot, rings, floating shapes and particles.
// The camera moves with the scroll position.
export default function Scene() {
  const ref = useRef();
  useEffect(() => {
    const el = ref.current, T = THREE;
    let r;
    try { r = new T.WebGLRenderer({ alpha: true, antialias: true }); } catch (e) { return; }
    r.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    el.appendChild(r.domElement);
    const scene = new T.Scene(), cam = new T.PerspectiveCamera(60, 1, .1, 100);
    cam.position.z = 6;
    const grp = new T.Group();
    const ico = new T.Mesh(new T.IcosahedronGeometry(2.1, 1), new T.MeshBasicMaterial({ color: 0x8b5cf6, wireframe: true }));
    const knot = new T.Mesh(new T.TorusKnotGeometry(.7, .22, 110, 16), new T.MeshNormalMaterial());
    const ring1 = new T.Mesh(new T.TorusGeometry(2.9, .02, 8, 140), new T.MeshBasicMaterial({ color: 0x22d3ee }));
    const ring2 = new T.Mesh(new T.TorusGeometry(3.4, .02, 8, 140), new T.MeshBasicMaterial({ color: 0xf472b6 }));
    ring1.rotation.x = 1.2; ring2.rotation.y = 1.2;
    grp.add(ico, knot, ring1, ring2);
    const geos = [new T.OctahedronGeometry(.35), new T.TetrahedronGeometry(.4), new T.BoxGeometry(.45, .45, .45), new T.IcosahedronGeometry(.3)];
    const cols = [0x8b5cf6, 0x22d3ee, 0xf472b6, 0xfacc15];
    const floaters = [];
    for (let k = 0; k < 18; k++) {
      const m = new T.Mesh(geos[k % 4], new T.MeshBasicMaterial({ color: cols[k % 4], wireframe: true }));
      m.position.set((Math.random() - .5) * 15, (Math.random() - .5) * 26 - 5, (Math.random() - .5) * 6 - 1);
      m.userData.s = .005 + Math.random() * .01;
      scene.add(m); floaters.push(m);
    }
    const n = 900, p = new Float32Array(n * 3);
    for (let k = 0; k < p.length; k += 3) { p[k] = (Math.random() - .5) * 24; p[k + 1] = (Math.random() - .5) * 50; p[k + 2] = (Math.random() - .5) * 20; }
    const g = new T.BufferGeometry();
    g.setAttribute("position", new T.BufferAttribute(p, 3));
    const pts = new T.Points(g, new T.PointsMaterial({ color: 0x22d3ee, size: .04 }));
    scene.add(grp, pts);
    const mouse = { x: 0, y: 0 };
    let target = 0, sp = 0, wide = true;
    const move = e => { mouse.x = e.clientX / window.innerWidth - .5; mouse.y = e.clientY / window.innerHeight - .5; };
    const scroll = () => { const m = document.documentElement.scrollHeight - window.innerHeight; target = m > 0 ? window.scrollY / m : 0; };
    const size = () => {
      const w = el.clientWidth, hh = el.clientHeight;
      r.setSize(w, hh); cam.aspect = w / hh; cam.updateProjectionMatrix();
      wide = w > 800; scroll();
    };
    size();
    window.addEventListener("resize", size);
    window.addEventListener("mousemove", move);
    window.addEventListener("scroll", scroll, { passive: true });
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let raf;
    const loop = () => {
      sp += (target - sp) * .06;
      const k = Math.min(sp * 10, 1);
      cam.position.y = -sp * 12;
      cam.position.x += (mouse.x * 1.5 - cam.position.x) * .04;
      grp.position.y = cam.position.y;
      grp.position.x = wide ? 2.6 + 1.9 * k : 0;
      grp.scale.setScalar((wide ? 1 : .7) * (1 - .45 * k));
      grp.visible = wide || sp < .03;
      if (!calm) {
        ico.rotation.x += .002; ico.rotation.y += .003;
        knot.rotation.x -= .008; knot.rotation.y += .01;
        ring1.rotation.z += .006; ring2.rotation.x += .004;
        pts.rotation.y += .0005;
        floaters.forEach(f => { f.rotation.x += f.userData.s; f.rotation.y += f.userData.s * 1.4; });
      }
      grp.rotation.y += (mouse.x * 1.2 + sp * 6 - grp.rotation.y) * .04;
      grp.rotation.x += (mouse.y * .8 - grp.rotation.x) * .04;
      r.render(scene, cam);
      raf = requestAnimationFrame(loop);
    };
    loop();
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("resize", size);
      window.removeEventListener("mousemove", move);
      window.removeEventListener("scroll", scroll);
      r.dispose();
      if (r.domElement.parentNode) r.domElement.parentNode.removeChild(r.domElement);
    };
  }, []);
  return <div className="scene" ref={ref} aria-hidden="true" />;
}
