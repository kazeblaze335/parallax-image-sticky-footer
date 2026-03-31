import type { Metadata } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { ViewTransitions } from "next-view-transitions";

import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import Preloader from "@/components/ui/Preloader";
import GlobalCanvas from "@/components/webgl/GlobalCanvas";

const circularStd = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff",
  variable: "--font-circular",
  display: "swap",
});

const neueMontreal = localFont({
  src: "../../public/fonts/PPNeueMontreal-Bold.otf",
  variable: "--font-neue",
  display: "swap",
});

const nbInternational = localFont({
  src: "../../public/fonts/NBInternational-Regular.woff2",
  variable: "--font-nb",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Creative Development Folio",
  description:
    "Awwwards-winning interactive portfolio featuring WebGL, Framer Motion, and Next.js",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="bg-zinc-950 text-zinc-100">
        <body
          className={`${circularStd.variable} ${neueMontreal.variable} ${nbInternational.variable} font-sans antialiased bg-zinc-100 dark:bg-zinc-950 transition-colors duration-500`}
        >
          {/* THE FIX: Fixed elements must live OUTSIDE the smooth scroll transform! */}
          <Preloader />
          <GlobalCanvas />

          <SmoothScrollProvider>{children}</SmoothScrollProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
