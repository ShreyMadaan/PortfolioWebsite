import Navbar from "./components/Navbar/Navbar";
import Footer from "./components/Footer/Footer";

import Home from "./features/home/Home";
import About from "./features/about/About";
import Skills from "./features/skills/Skills";
import Projects from "./features/projects/Projects";
import Experience from "./features/experience/Experience";
import Education from "./features/education/Education";
import Certifications from "./features/certifications/Certifications";
import BeyondCode from "./features/beyondCode/BeyondCode";
import Contact from "./features/contact/Contact";


function App() {
  return (
    <>
      <Navbar />

      <main>
        <Home />
        <About />
        <Skills />
        <Projects />
        <Experience />
        <Education />
        <Certifications />
        <BeyondCode />
        <Contact />
      </main>

      <Footer />
    </>
  );
}

export default App;