import About from "@/components/About";
import Contact from "@/components/Contact";
import Education from "@/components/Education";
import Footer from "@/components/Footer";
import Hero from "@/components/Hero";
import Navbar from "@/components/Navbar";
import Projects from "@/components/Projects";
import Services from "@/components/Services";
import Skills from "@/components/Skills";
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
