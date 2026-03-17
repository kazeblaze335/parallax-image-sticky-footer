import localFont from "next/font/local";
import InfiniteVerticalLoop from "@/components/InfiniteVerticalLoop";
import NavBar from "@/components/NavBar";

// Using your Circular Std setup
const circular = localFont({
  src: "../../../public/fonts/NBInternational.woff2", // Ensure this path matches your file!
  variable: "--font-circular",
});

export default function AboutPage() {
  return (
    <main className={`${circular.variable} font-sans`}>
      <NavBar />
      <InfiniteVerticalLoop />
    </main>
  );
}
