import { type NextPage } from "next";
import ContactUs from "../components/ContactUs";
import CTA from "../components/CTA";
import FAQ from "../components/FAQ";
import HeroSection from "../components/HeroSection";
import Stats from "../components/Stats";

const Home: NextPage = () => {
  return (
    <>
      <HeroSection />
      {/* <Stats /> */}
      {/* <CTA /> */}
      <ContactUs />
      <FAQ />
    </>
  );
};

export default Home;
