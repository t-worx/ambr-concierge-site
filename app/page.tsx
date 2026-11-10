import Nav from "@/components/Nav";
import Hero from "@/components/Hero";
import DayStory from "@/components/DayStory";
import Questions from "@/components/Questions";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Calculator from "@/components/Calculator";
import Process from "@/components/Process";
import About from "@/components/About";
import Faq from "@/components/Faq";
import Book, { Footer } from "@/components/Book";
import ConciergeWidget from "@/components/ConciergeWidget";
import SmoothScroll from "@/components/SmoothScroll";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <DayStory />
        <Questions />
        <HowItWorks />
        <Benefits />
        <Calculator />
        <Process />
        <About />
        <Faq />
        <Book />
      </main>
      <Footer />
      <ConciergeWidget />
      <SmoothScroll />
    </>
  );
}
