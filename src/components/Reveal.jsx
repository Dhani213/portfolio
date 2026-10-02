import { useEffect, useRef } from "react";

export default function Reveal({ children, cls = "" }) {
  const ref = useRef();
  useEffect(() => {
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { ref.current.classList.add("in"); io.disconnect(); } }, { threshold: .15 });
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);
  return <div ref={ref} className={"rv " + cls}>{children}</div>;
}
