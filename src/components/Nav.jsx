import { useState } from "react";
import { NAV } from "../data";

export default function Nav() {
  const [open, setOpen] = useState(false);
  return (
    <nav>
      <a className="logo" href="#top">Dhani</a>
      <button className="burger" aria-label="Toggle menu" aria-expanded={open} onClick={() => setOpen(!open)}>
        &#9776;
      </button>
      <ul className={open ? "open" : ""}>
        {NAV.map(([label, id]) => (
          <li key={id}><a href={"#" + id} onClick={() => setOpen(false)}>{label}</a></li>
        ))}
      </ul>
    </nav>
  );
}
