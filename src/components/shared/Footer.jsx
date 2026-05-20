import Link from "next/link";

const footerLinks = {
  Platform: [
    { name: "Browse Rooms", href: "/rooms" },
    { name: "Add a Room", href: "/add-room" },
    { name: "My Bookings", href: "/my-bookings" },
  ],
  Company: [
    { name: "About Us", href: "/about" },
    { name: "Contact", href: "/contact" },
    { name: "Blog", href: "/blog" },
  ],
  Legal: [
    { name: "Privacy Policy", href: "/privacy" },
    { name: "Terms of Service", href: "/terms" },
  ],
};

export default function Footer() {
  return (
    <footer className="bg-[#0d2137] text-[#95b4c8]">
      <div className="max-w-7xl mx-auto px-6 pt-14 pb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-12">
          <div className="md:col-span-1">
            <Link
              href="/"
              className="font-(family-name:--font-cormorant) text-2xl font-semibold tracking-tight"
            >
              <span className="text-white">Study</span>
              <span className="text-[#74C69D]">Nook</span>
            </Link>
            <p className="mt-4 text-sm text-[#6a8fa0] leading-relaxed">
              The smart way to book quiet study rooms across your campus
              library. Find your focus, book your space.
            </p>
          </div>

          {Object.entries(footerLinks).map(([title, links]) => (
            <div key={title}>
              <h4 className="text-xs font-medium uppercase tracking-widest text-white mb-4">
                {title}
              </h4>
              <ul className="flex flex-col gap-3">
                {links.map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-sm text-[#6a8fa0] hover:text-[#74C69D] transition-colors duration-200"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        <div className="border-t border-white/10 pt-6 flex flex-col sm:flex-row justify-between items-center gap-3">
          <p className="text-xs text-[#6a8fa0]">
            &copy; {new Date().getFullYear()} StudyNook. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
