import { useEffect, useState } from "react";
import { ROLES } from "../data";

export default function Typing() {
  const [t, setT] = useState(""), [i, setI] = useState(0), [del, setDel] = useState(false);
  useEffect(() => {
    const w = ROLES[i];
    const full = !del && t === w;
    const id = setTimeout(() => {
      if (full) return setDel(true);
      if (del && t === "") { setDel(false); return setI((i + 1) % ROLES.length); }
      setT(del ? w.slice(0, t.length - 1) : w.slice(0, t.length + 1));
    }, full ? 1300 : del ? 40 : 90);
    return () => clearTimeout(id);
  }, [t, del, i]);
  return (
    <p className="role" aria-label={ROLES.join(", ")}>
      {t}<span className="caret" />
    </p>
  );
}
