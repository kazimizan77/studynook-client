const steps = [
  {
    number: "01",
    title: "Browse Rooms",
    description:
      "Search and filter available study rooms by capacity, amenities, price, and availability across your campus library.",
    icon: "🔍",
  },
  {
    number: "02",
    title: "Book a Slot",
    description:
      "Select your preferred date and time. Our system automatically prevents double-bookings so your slot is always secure.",
    icon: "📅",
  },
  {
    number: "03",
    title: "Study & Succeed",
    description:
      "Walk in at your booked time and enjoy a distraction-free environment. Cancel anytime before your session starts.",
    icon: "🎓",
  },
];

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20 bg-[#F8F5EE] dark:bg-[#0d2137]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-14">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2D6A4F] block mb-2">
            Simple Process
          </span>
          <h2 className="font-(family-name:--font-cormorant) text-4xl font-semibold text-[#1B3A4B] dark:text-white">
            How StudyNook Works
          </h2>
        </div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          {steps.map((step, index) => (
            <>
              <div
                key={step.number}
                className="flex-1 bg-white dark:bg-[#152a3a] border border-[#E9E4D8] dark:border-[#1B3A4B] rounded-2xl p-8 text-center hover:shadow-md transition-shadow"
              >
                <div className="text-4xl mb-4">{step.icon}</div>

                <div className="font-(family-name:--font-cormorant) text-5xl font-semibold text-[#2D6A4F]/30 mb-3 leading-none">
                  {step.number}
                </div>

                <h3 className="font-(family-name:--font-cormorant) text-xl font-semibold text-[#1B3A4B] dark:text-white mb-3">
                  {step.title}
                </h3>
                <p className="text-sm text-[#4a6375] dark:text-[#95b4c8] leading-relaxed">
                  {step.description}
                </p>
              </div>

              {index < steps.length - 1 && (
                <div className="hidden md:flex items-center justify-center flex-shrink-0">
                  <div className="flex items-center gap-1 text-[#2D6A4F]">
                    <div className="w-8 h-px bg-[#2D6A4F]"></div>
                    <svg width="10" height="16" viewBox="0 0 10 16" fill="none">
                      <path
                        d="M1 1L9 8L1 15"
                        stroke="#2D6A4F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}

              {index < steps.length - 1 && (
                <div className="md:hidden flex items-center justify-center">
                  <div className="flex flex-col items-center gap-1 text-[#2D6A4F]">
                    <div className="w-px h-8 bg-[#2D6A4F]"></div>
                    <svg width="16" height="10" viewBox="0 0 16 10" fill="none">
                      <path
                        d="M1 1L8 9L15 1"
                        stroke="#2D6A4F"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              )}
            </>
          ))}
        </div>
      </div>
    </section>
  );
}
