import { useRef } from "react";

// Card that tilts in 3D toward the cursor.
export default function Tilt({ children }) {
  const ref = useRef();
  const mv = e => {
    const b = ref.current.getBoundingClientRect();
    const x = (e.clientX - b.left) / b.width - .5, y = (e.clientY - b.top) / b.height - .5;
    ref.current.style.transform = `rotateY(${x * 16}deg) rotateX(${-y * 16}deg) scale(1.03)`;
    ref.current.style.setProperty("--mx", (x + .5) * 100 + "%");
    ref.current.style.setProperty("--my", (y + .5) * 100 + "%");
  };
  return (
    <div ref={ref} className="tilt" onMouseMove={mv} onMouseLeave={() => { ref.current.style.transform = ""; }}>
      {children}
    </div>
  );
}
