import Link from "next/link";
import { Button } from "@heroui/react";

export default function CallToAction() {
  return (
    <section className="py-20 bg-white dark:bg-[#0a1929]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="bg-gradient-to-br from-[#0d2137] to-[#1B3A4B] rounded-3xl px-8 md:px-16 py-14 flex flex-col md:flex-row justify-between items-center gap-8 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-72 h-72 bg-[#2D6A4F]/20 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-20 w-48 h-48 bg-[#74C69D]/10 rounded-full blur-2xl pointer-events-none" />

          <div className="relative z-10 text-center md:text-left">
            <span className="text-xs font-semibold uppercase tracking-widest text-[#74C69D] block mb-3">
              Own a space?
            </span>
            <h2 className="font-(family-name:--font-cormorant) text-3xl md:text-4xl font-semibold text-white mb-4">
              List Your Study Room
            </h2>
            <p className="text-[#95b4c8] text-sm leading-relaxed max-w-md">
              Have a quiet room or study space? List it on StudyNook and earn by
              connecting with students who need it most.
            </p>
          </div>

          <div className="relative z-10 flex-shrink-0 flex flex-col sm:flex-row gap-3">
            <Link href="/add-room">
              <Button className="bg-[#2D6A4F] text-white font-medium px-8 h-12 text-sm">
                List a Room →
              </Button>
            </Link>
            <Link href="/rooms">
              <Button
                variant="bordered"
                className="border-[#4a7a8a] text-[#95b4c8] hover:border-[#74C69D] hover:text-[#74C69D] px-8 h-12 text-sm"
              >
                Browse Rooms
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
