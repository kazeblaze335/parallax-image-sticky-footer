"use client";

import localFont from "next/font/local";

// Using your established Circular Std setup
const circular = localFont({
  src: "../../public/fonts/CircularStd-Medium.woff",
  variable: "--font-circular",
});

const experimentNumber = "Experiment 503";
const vimeoCredits = "Video credits Codegrid";

const footerData = [
  { title: "LinkedIn", href: "#" },
  { title: "Vimeo", href: "#" },
  { title: "Instagram", href: "#" },
  { title: "Twitter", href: "#" },
  { title: "Contact Us", href: "#" },
  { title: "NØRD Objects © 2023", href: null },
  { title: "Privacy Policy", href: "#" },
];

export default function Footer() {
  return (
    // Changed height to full screen (h-screen) which is 100vh.
    // Removed overflow-hidden so the massive typography can breathe without clipping.
    <footer
      className={`relative w-full h-screen bg-zinc-100 p-10 pb-6 text-zinc-900 border-t border-zinc-200 ${circular.className}`}
    >
      {/* =======================================================
          1. THE MASSIVE NEON TYPOGRAPHY (SOJU®)
          Absolutely centered and rotated.
          ======================================================= */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none origin-center -rotate-90">
        <h2 className="text-[18vh] md:text-[28vh] font-black uppercase tracking-tighter text-[#ccff00] leading-none whitespace-nowrap drop-shadow-sm">
          SOJU®
        </h2>
      </div>

      {/* =======================================================
          2. THE BOTTOM ROW (Existing content)
          Positioned relative and z-10 to ensure it sits above the giant text.
          ======================================================= */}
      <div className="relative z-10 flex h-full items-end justify-between uppercase text-xs font-bold tracking-[0.2em] text-zinc-400">
        {/* Left Column: Vertical Links List */}
        <div className="w-[30%]">
          <ul className="space-y-2 pointer-events-auto">
            {footerData.map((link, index) => (
              <li key={index}>
                {link.href ? (
                  <a
                    href={link.href}
                    className="text-zinc-900 hover:text-zinc-500 transition-colors"
                  >
                    {link.title}
                  </a>
                ) : (
                  // This catches the non-link items (copyright)
                  <span className="text-zinc-500 font-medium">
                    {link.title}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </div>

        {/* Right Column: Metadata & Credits */}
        <div className="w-[30%] text-right text-zinc-900">
          <p className="font-bold tracking-[0.2em]">{experimentNumber}</p>
          <p className="font-bold tracking-[0.2em]">{vimeoCredits}</p>
        </div>
      </div>
    </footer>
  );
}
