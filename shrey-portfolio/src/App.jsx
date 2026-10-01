import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";
import SkillsMarquee from "./components/SkillsMarquee/SkillsMarquee";

import Home from "./features/home/Home";
import About from "./features/about/About";
import Skills from "./features/skills/Skills";
import Projects from "./features/projects/Projects";
import Experience from "./features/experience/Experience";
import Education from "./features/education/Education";
import Certifications from "./features/certifications/Certifications";
import BeyondCode from "./features/beyondCode/BeyondCode";
import Contact from "./features/contact/Contact";

import AmbientBackground from "./components/AmbientBackground/AmbientBackground";

import { useEffect, useState } from "react";

function App() {
  const [scrollDirection, setScrollDirection] = useState("down");

  useEffect(() => {
    let previousScrollY = window.scrollY;

    const handleScroll = () => {
      const currentScrollY = window.scrollY;

      if (currentScrollY > previousScrollY) {
        setScrollDirection("down");
      } else if (currentScrollY < previousScrollY) {
        setScrollDirection("up");
      }

      previousScrollY = currentScrollY;
    };

    window.addEventListener("scroll", handleScroll, {
      passive: true,
    });

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <>
      <Navbar />

      <AmbientBackground />

      <main>
        <Home />
        <SkillsMarquee direction={scrollDirection} />

        <About />
        <SkillsMarquee direction={scrollDirection} />

        <Skills />

        <Projects />
        <SkillsMarquee direction={scrollDirection} />

        <Experience />
        <SkillsMarquee direction={scrollDirection} />

        <Education />
        <SkillsMarquee direction={scrollDirection} />

        <Certifications />
        <SkillsMarquee direction={scrollDirection} />

        <BeyondCode />
        <SkillsMarquee direction={scrollDirection} />

        <Contact />
        <SkillsMarquee direction={scrollDirection} />
      </main>

      <Footer />
    </>
  );
}

export default App;