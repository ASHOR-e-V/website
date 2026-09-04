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

// Tints the browser chrome on mobile to match each palette.
export const viewport = {
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#EFE7D6" },
    { media: "(prefers-color-scheme: dark)", color: "#07090E" },
  ],
  colorScheme: "light dark",
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
        {/* Applies the saved theme before the first paint. Without this, a
            visitor who chose dark mode gets a flash of the light palette on
            every navigation, because the attribute below is baked into the
            static HTML and React only corrects it after hydration. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem("ashor-theme");if(t==="dark"||t==="light"){document.documentElement.setAttribute("data-theme",t)}}catch(e){}})();`,
          }}
        />
        {/* Fonts are self-hosted (see globals.css). Preloading the three
            faces used above the fold removes the swap flash on first paint. */}
        <link rel="preload" href="/fonts/cinzel-latin-700-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/lora-latin-400-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <link rel="preload" href="/fonts/jost-latin-500-normal.woff2" as="font" type="font/woff2" crossOrigin="anonymous" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <ThemeProvider>
          <a href="#inhalt" className="skip-link">Zum Inhalt springen</a>
          <Navbar />
          <main id="inhalt">{children}</main>
          <Footer />
        </ThemeProvider>
      </body>
    </html>
  );
}
