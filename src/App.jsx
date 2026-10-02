import Nav from "./components/Nav";
import Scene from "./components/Scene";
import Orb from "./components/Orb";
import Tilt from "./components/Tilt";
import Typing from "./components/Typing";
import Reveal from "./components/Reveal";
import { GITHUB, EMAIL,  base: "/Portfolio/", PHONE, SKILLS, PROJECTS } from "./data";

export default function App() {
  return (
    <>
      <div className="bg" aria-hidden="true"><i /><i /><i /><i /></div>
      <Scene />
      <Nav />

      <header className="hero" id="top">
        <div className="hero-text">
          <h1>Hi, I'm Dhani</h1>
          <Typing />
          <a className="btn" href="#projects">View my work</a>
          <a className="btn ghost" href="#contact">Get in touch</a>
        </div>
      </header>

      <section className="s" id="about">
        <Reveal>
          <h2>About me</h2>
          <p className="about">
            I'm a frontend developer who likes turning ideas into responsive, interactive web apps. I write in Python, C,
            Java and JavaScript, build interfaces with HTML, CSS and React, and use NumPy, Pandas and Matplotlib when a
            project needs data.
          </p>
        </Reveal>
      </section>

      <section className="s" id="skills">
        <Reveal>
          <h2>Skills</h2>
          <Orb />
          <div className="groups">
            {SKILLS.map(([group, list]) => (
              <div className="group" key={group}>
                <h3>{group}</h3>
                <div className="chips">
                  {list.map(s => <span className="chip" key={s}>{s}</span>)}
                </div>
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="s" id="projects">
        <Reveal>
          <h2>Projects</h2>
          <div className="grid">
            {PROJECTS.map(p => (
              <Tilt key={p.n}>
                <h3>{p.n}</h3>
                <p>{p.d}</p>
                <div className="chips">
                  {p.t.map(t => <span className="chip" key={t}>{t}</span>)}
                </div>
                <div className="links">
                  {p.live && <a href={p.live} target="_blank" rel="noopener noreferrer">Live demo</a>}
                  {p.code && <a href={p.code} target="_blank" rel="noopener noreferrer">Source code</a>}
                </div>
              </Tilt>
            ))}
          </div>
        </Reveal>
      </section>

      <section className="s contact" id="contact">
        <Reveal>
          <h2>Contact</h2>
          <p>Have a project or an idea? Email or call me.</p>
          <a className="btn" href={"mailto:" + EMAIL}>{EMAIL}</a>
          <a className="btn ghost" href={"tel:+91" + PHONE}>{PHONE}</a>
          <a className="btn ghost" href={GITHUB} target="_blank" rel="noopener noreferrer">GitHub</a>
        </Reveal>
      </section>

      <footer>&copy; 2026 Dhani</footer>
    </>
  );
}
