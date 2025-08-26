import { Button } from "@/components/ui/button";
import Image from "next/image";
import Header from "./_components/Header";
import Hero from "./_components/Hero";
import Features from "./_components/Features";
import AboutUs from "./_components/AboutUs";
import Testimonials from "./_components/Testimonials";
import FAQ from "./_components/FAQ";
import Footer from "./_components/Footer";

export default function Home() {
  return (
    <div>
     {/*Header*/}
     <Header/>
     {/*Hero section*/}
     <Hero/>
     <Features/>
     <AboutUs/>
     <Testimonials/>
     <FAQ/>
     <Footer/>
    </div>
  );
}
