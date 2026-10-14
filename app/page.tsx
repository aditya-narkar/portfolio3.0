import Preloader from "@/components/Preloader";
import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import Work from "@/components/Work";
import Experience from "@/components/Experience";
import Skills from "@/components/Skills";
import About from "@/components/About";
import Contact from "@/components/Contact";

export default function Home() {
  return (
    <>
      <Preloader />
      <Nav />
      <main>
        <Hero />
        <Marquee />
        <Work />
        <Experience />
        <Skills />
        <About />
        <Contact />
      </main>
    </>
  );
}
