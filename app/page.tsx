import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { SmoothScroll } from "@/components/shared/SmoothScroll";
import { StoryText } from "@/components/shared/StoryText";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Reviews } from "@/components/sections/Reviews";
import { Program } from "@/components/sections/Program";
import { Locations } from "@/components/sections/Locations";
import { Gallery } from "@/components/sections/Gallery";
import { RouteFeature } from "@/components/sections/RouteFeature";
import { MapSection } from "@/components/sections/MapSection";
import { Schedule } from "@/components/sections/Schedule";
import { Pricing } from "@/components/sections/Pricing";
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
        <Gallery />
        <Program />
        <RouteFeature />
        <Locations />
        <MapSection />
        <Schedule />
        <Pricing />
        <div className="wrap travel-notes">
          <Info />
          <FAQ />
        </div>
        <Reviews />
        {process.env.NEXT_PUBLIC_GITHUB_PAGES === "true" ? (
          <section
            id="contact"
            className="section"
            aria-labelledby="contact-title"
          >
            <div className="wrap">
              <p id="contact-title" className="intro">
                Оставьте номер в форме записи на маршрут. Организаторы свяжутся
                с вами.
              </p>
              <div className="actions">
                <a
                  className="button"
                  href="https://site-16.lemnity.ru/erchov#b1chl0yy"
                >
                  Открыть форму записи
                </a>
              </div>
            </div>
          </section>
        ) : (
          <Contact />
        )}
        <section
          id="ershov-story"
          className="section story"
          aria-label="О Петре Ершове"
        >
          <div className="wrap">
            <StoryText
              revealEnd="end 0.76"
              paragraphs={[
                "Пётр Ершов написал «Конька-горбунка» в 19 лет, будучи студентом Императорского Санкт-Петербургского университета.",
                "Но душа его всегда оставалась в Сибири, в Тобольске, где он провел детство, учился, работал и умер. Именно здесь, среди белокаменных стен Кремля и бескрайних сибирских просторов, зародилась величайшая русская сказка.",
              ]}
            />
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
