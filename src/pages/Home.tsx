import Hero from "./home/Hero";
import Problems from "./home/Problems";
import Services from "./home/Services";
import Process from "./home/Process";
import WhyUs from "./home/WhyUs";
import Industries from "./home/Industries";
import SelectedWork from "./home/SelectedWork";
import Testimonials from "./home/Testimonials";
import ContactSection from "./home/ContactSection";

/**
 * Home carries the whole argument in order: the problem, what we do about it,
 * how we work, why us, who we build for, proof, and then the ask.
 */
export default function Home() {
  return (
    <>
      <Hero />
      <Problems />
      <Services />
      <Process />
      <WhyUs />
      <Industries />
      <SelectedWork />
      <Testimonials />
      <ContactSection />
    </>
  );
}
