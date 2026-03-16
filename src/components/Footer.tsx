export default function Footer() {
  return (
    <footer className="w-full bg-[#222222] text-white flex flex-col justify-between pt-20">
      {/* TOP SECTION: Logo & CTA */}
      <div className="flex flex-col md:flex-row justify-between items-start px-8 md:px-20 gap-10 md:gap-0">
        <h2 className="text-3xl font-bold tracking-tight">B/D®</h2>
        <div className="max-w-xl text-3xl md:text-4xl font-medium leading-tight">
          <p>We collaborate with ambitious brands and people. Let's build.</p>
          <a
            href="mailto:biz@basicagency.com"
            className="underline decoration-1 underline-offset-8 hover:text-neutral-300 transition-colors"
          >
            biz@basicagency.com
          </a>
        </div>
      </div>

      {/* MIDDLE SECTION: Grid Links */}
      <div className="grid grid-cols-1 md:grid-cols-12 gap-12 md:gap-8 px-8 md:px-20 mt-20 mb-16">
        {/* Newsletter Column */}
        <div className="md:col-span-4 pr-0 md:pr-12">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider mb-8 uppercase">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            Stay in the know
          </div>
          <div className="relative border-b border-white pb-3 flex justify-between items-center group">
            <input
              type="email"
              placeholder="Email Address"
              className="bg-transparent text-white placeholder-neutral-400 outline-none w-full"
            />
            {/* Simple SVG Arrow */}
            <svg
              className="w-5 h-5 transform group-hover:translate-x-1 transition-transform cursor-pointer"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M14 5l7 7m0 0l-7 7m7-7H3"
              />
            </svg>
          </div>
        </div>

        {/* Social Column */}
        <div className="md:col-span-2 md:col-start-7">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider mb-8 uppercase">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            Social
          </div>
          <ul className="space-y-2 text-neutral-300">
            <li className="hover:text-white cursor-pointer transition-colors">
              Instagram
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Twitter
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              LinkedIn
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Facebook
            </li>
          </ul>
        </div>

        {/* Initiatives Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider mb-8 uppercase">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            Initiatives
          </div>
          <ul className="space-y-2 text-neutral-300">
            <li className="hover:text-white cursor-pointer transition-colors">
              Applied
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Brandbeats
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Moves
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              B®/Good
            </li>
          </ul>
        </div>

        {/* Offices Column */}
        <div className="md:col-span-2">
          <div className="flex items-center gap-3 text-sm font-semibold tracking-wider mb-8 uppercase">
            <span className="w-2 h-2 rounded-full bg-white"></span>
            Offices
          </div>
          <ul className="space-y-2 text-neutral-300">
            <li className="hover:text-white cursor-pointer transition-colors">
              San Diego – CA
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              New York – NY
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Bay Area – CA
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              St. Louis – MO
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Amsterdam – NL
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              London – EN
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Berlin – GE
            </li>
            <li className="hover:text-white cursor-pointer transition-colors">
              Argentina – AR
            </li>
          </ul>
        </div>
      </div>

      {/* BOTTOM SUB-FOOTER */}
      <div className="bg-[#1a1a1a] flex flex-col md:flex-row justify-between items-center px-8 md:px-20 py-6 text-xs text-neutral-500 font-medium text-center md:text-left gap-4 md:gap-0">
        <div className="flex flex-col md:flex-row items-center gap-4">
          {/* Accessibility Icon Placeholder */}
          <div className="w-8 h-8 rounded-full bg-neutral-800 flex items-center justify-center text-white shrink-0">
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2c1.1 0 2 .9 2 2s-.9 2-2 2-2-.9-2-2 .9-2 2-2zm9 7h-6v13h-2v-6h-2v6H9V9H3V7h18v2z" />
            </svg>
          </div>
          <p>BASIC/DEPT®, INC 10 - 26©</p>
        </div>
        <p>EASY TO UNDERSTAND, IMPOSSIBLE TO IGNORE.™</p>
        <p>TERMS, PRIVACY POLICY</p>
      </div>
    </footer>
  );
}
