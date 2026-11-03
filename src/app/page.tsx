import { Header } from "@/components/Header";
import { Hero } from "@/components/Hero";
import { ProgrammeExplorer } from "@/components/ProgrammeExplorer";
import { CertificationsTeaser } from "@/components/CertificationsTeaser";
import { WhyODL } from "@/components/WhyODL";
import { HowItWorks } from "@/components/HowItWorks";
import { Testimonials } from "@/components/Testimonials";
import { FAQ } from "@/components/FAQ";
import { EnquirySection } from "@/components/EnquirySection";
import { CTABanner } from "@/components/CTABanner";
import { Footer } from "@/components/Footer";
import { FloatingActions } from "@/components/FloatingActions";
import { programmes } from "@/data/programmes";
import { CONTACT, LINKS, SITE_URL } from "@/data/site";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "CollegeOrUniversity",
      "@id": `${LINKS.mainSite}#org`,
      name: "Lincoln University College",
      url: LINKS.mainSite,
      email: CONTACT.email.label,
      telephone: "+60378063478",
      address: {
        "@type": "PostalAddress",
        streetAddress: "No. 12, 14, 16 & 18, Jalan SS 6/12",
        postalCode: "47301",
        addressLocality: "Petaling Jaya",
        addressRegion: "Selangor",
        addressCountry: "MY",
      },
    },
    {
      "@type": "ItemList",
      name: "Lincoln Online programmes",
      url: SITE_URL,
      numberOfItems: programmes.length,
      itemListElement: programmes.map((p, i) => ({
        "@type": "ListItem",
        position: i + 1,
        item: {
          "@type": "Course",
          name: p.title,
          url: `${SITE_URL}/programmes/${p.id}`,
          image: p.image,
          provider: { "@id": `${LINKS.mainSite}#org` },
          hasCourseInstance: { "@type": "CourseInstance", courseMode: "online" },
        },
      })),
    },
  ],
};

export default function Home() {
  return (
    <>
      <Header />
      <main id="main" tabIndex={-1} className="focus:outline-none">
        <Hero />
        <ProgrammeExplorer />
        <CertificationsTeaser />
        <WhyODL />
        <HowItWorks />
        <Testimonials />
        <FAQ />
        <EnquirySection />
        <CTABanner />
      </main>
      <Footer />
      <FloatingActions />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd).replace(/</g, "\\u003c") }}
      />
    </>
  );
}
