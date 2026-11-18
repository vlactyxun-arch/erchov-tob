import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Audience } from "@/components/sections/Audience";
import { Program } from "@/components/sections/Program";
import { Locations } from "@/components/sections/Locations";
import { Gallery } from "@/components/sections/Gallery";
import { MapSection } from "@/components/sections/MapSection";
import { Schedule } from "@/components/sections/Schedule";
import { Pricing } from "@/components/sections/Pricing";
import { Food } from "@/components/sections/Food";
import { Info } from "@/components/sections/Info";
import { FAQ } from "@/components/sections/FAQ";
import { Contact } from "@/components/sections/Contact";

export const revalidate = 3600;

export default function Page() {
  const trip = {
    "@context": "https://schema.org",
    "@type": "TouristTrip",
    name: "Тобольск глазами Ершова",
    touristType: ["Группы", "Индивидуальные путешественники"],
    itinerary: { "@type": "Place", name: "Тобольск" },
  };
  const businessName = process.env.ORGANIZER_NAME;
  const structuredData = businessName
    ? [
        trip,
        {
          "@context": "https://schema.org",
          "@type": "LocalBusiness",
          name: businessName,
          url: process.env.NEXT_PUBLIC_SITE_URL,
        },
      ]
    : trip;
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(structuredData).replace(/</g, "\\u003c"),
        }}
      />
      <SmoothScroll />
      <a className="skip" href="#main">
        К содержанию
      </a>
      <Header />
      <main id="main" tabIndex={-1}>
        <Hero />
        <About />
        <Audience />
        <Program />
        <Locations />
        <Gallery />
        <MapSection />
        <Schedule />
        <Pricing />
        <Food />
        <Info />
        <FAQ />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
