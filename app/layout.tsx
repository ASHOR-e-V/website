import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ThemeProvider } from "@/lib/theme";

const BASE_URL = "https://website-7yd.pages.dev";

export const metadata: Metadata = {
  title: {
    default: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.",
    template: "%s – ASHOR",
  },
  description: "ASHOR ist die offizielle assyrische Hochschulgruppe der JGU Mainz. Akademischer Austausch, kulturelle Identität und Gemeinschaft für assyrische Studierende und Akademiker in der Rhein-Main-Region. Mitgliedschaft kostenlos.",
  keywords: ["ASHOR", "Assyrische Hochschulgruppe", "JGU Mainz", "Johannes Gutenberg Universität", "Assyrisch", "Assyrian", "Rhein-Main", "Frankfurt", "Studierende", "Akademiker", "Hochschulgruppe", "assyrische Kultur"],
  authors: [{ name: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V." }],
  creator: "ASHOR e.V.",
  publisher: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.",
  metadataBase: new URL(BASE_URL),
  alternates: { canonical: "/" },
  openGraph: {
    type: "website",
    locale: "de_DE",
    url: BASE_URL,
    siteName: "ASHOR e.V.",
    title: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.",
    description: "Offizielle assyrische Hochschulgruppe der JGU Mainz. Akademischer Austausch, kulturelle Identität und nachhaltige Vernetzung — kostenlose Mitgliedschaft.",
    images: [{ url: "/logo.png", width: 400, height: 400, alt: "ASHOR Logo" }],
  },
  twitter: {
    card: "summary",
    title: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.",
    description: "Offizielle assyrische Hochschulgruppe der JGU Mainz. Akademischer Austausch, kulturelle Identität, kostenlose Mitgliedschaft.",
    images: ["/logo.png"],
  },
  robots: { index: true, follow: true, googleBot: { index: true, follow: true } },
};

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "ASHOR – Assyrische Hochschulgruppe Rhein-Main e.V.",
  alternateName: "ASHOR e.V.",
  url: BASE_URL,
  logo: `${BASE_URL}/logo.png`,
  description: "Offizielle assyrische Hochschulgruppe der Johannes Gutenberg-Universität Mainz. Akademischer Austausch, kulturelle Identität und Gemeinschaft für assyrische Studierende.",
  foundingDate: "2024",
  address: {
    "@type": "PostalAddress",
    addressLocality: "Mainz",
    addressRegion: "Rheinland-Pfalz",
    addressCountry: "DE",
  },
  sameAs: [
    "https://www.instagram.com/ashor_e.v/",
    "https://www.tiktok.com/@ashor_e.v",
  ],
  memberOf: {
    "@type": "EducationalOrganization",
    name: "Johannes Gutenberg-Universität Mainz",
    url: "https://www.uni-mainz.de",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="de" data-theme="light">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Lora:ital,wght@0,400;0,500;1,400&family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
