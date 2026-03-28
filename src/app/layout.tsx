import type { Metadata } from "next";
import { ViewTransitions } from "next-view-transitions";
import SmoothScrollProvider from "@/providers/SmoothScrollProvider";
import GlobalCanvas from "@/components/webgl/GlobalCanvas";
import Preloader from "@/components/ui/Preloader"; // <-- Import the Preloader
import "./globals.css";

export const metadata: Metadata = {
  title: "unitPLUS | Creative Development",
  description: "Boutique digital experiences.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ViewTransitions>
      <html lang="en" className="dark">
        <body className="bg-zinc-100 dark:bg-zinc-950 text-zinc-900 dark:text-zinc-100 transition-colors duration-500">
          <SmoothScrollProvider>
            {/* 1. THE GATEKEEPER */}
            <Preloader />

            {/* 2. The WebGL Context */}
            <GlobalCanvas />

            {/* 3. The React DOM */}
            {children}
          </SmoothScrollProvider>
        </body>
      </html>
    </ViewTransitions>
  );
}
