import About from "@/components/sections/About";
import Contact from "@/components/sections/Contact";
import Education from "@/components/sections/Education";
import Footer from "@/components/layout/Footer";
import Hero from "@/components/sections/Hero";
import Navbar from "@/components/layout/Navbar";
import Projects from "@/components/sections/Projects";
import Services from "@/components/sections/Services";
import Skills from "@/components/sections/Skills";
import Background from "@/components/ui/Background";
import MotionProvider from "@/components/ui/MotionProvider";

/** Page order: reorder or remove sections here. */
export default function Home() {
  return (
    <MotionProvider>
      <Background />
      <Navbar />
      <main id="main">
        <Hero />
        <About />
        <Services />
        <Skills />
        <Education />
        <Projects />
        <Contact />
      </main>
      <Footer />
    </MotionProvider>
  );
}
