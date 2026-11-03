import type { Metadata, Viewport } from "next";
import { Manrope, Plus_Jakarta_Sans } from "next/font/google";
import { BRAND_ASSETS, SITE_URL } from "@/data/site";
import { Providers } from "@/components/Providers";
import "./globals.css";

const body = Plus_Jakarta_Sans({ subsets: ["latin"], variable: "--font-body", display: "swap" });
const heading = Manrope({ subsets: ["latin"], variable: "--font-heading", display: "swap", weight: ["600", "700", "800"] });

const title = "Lincoln Online | Online Degrees from Lincoln University College";
const description =
  "Study fully online with Lincoln Online at Lincoln University College, Malaysia. Explore 30 Lincoln Online programmes from Foundation to PhD and apply online.";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: { default: title, template: "%s | Lincoln Online" },
  description,
  applicationName: "Lincoln Online",
  keywords: [
    "Lincoln University College",
    "open and distance learning",
    "Lincoln Online Malaysia",
    "online degree Malaysia",
    "online MBA",
    "online PhD",
    "online bachelor degree",
    "distance learning diploma",
  ],
  authors: [{ name: "Lincoln University College" }],
  alternates: { canonical: "/" },
  icons: { icon: BRAND_ASSETS.favicon, apple: BRAND_ASSETS.favicon },
  openGraph: {
    type: "website",
    locale: "en_MY",
    url: "/",
    siteName: "Lincoln Online — Lincoln University College",
    title,
    description,
  },
  twitter: { card: "summary_large_image", title, description },
  robots: { index: true, follow: true },
};

export const viewport: Viewport = {
  themeColor: "#df1b22",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${body.variable} ${heading.variable}`}>
      <body>
        <a
          href="#main"
          className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:rounded-full focus:bg-brand-secondary focus:px-5 focus:py-3 focus:font-semibold focus:text-white"
        >
          Skip to main content
        </a>
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
