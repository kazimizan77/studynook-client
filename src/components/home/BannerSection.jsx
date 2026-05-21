"use client";
import Link from "next/link";
import { Button } from "@heroui/react";

export default function BannerSection() {
  return (
    <section className="relative bg-[#0d2137] overflow-hidden">
      {/* Background glow */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-[#2D6A4F]/20 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#1B3A4B]/40 rounded-full blur-2xl pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-6 py-24 md:py-32 grid md:grid-cols-2 gap-12 items-center">
        {/* Left */}
        <div>
          <span className="text-xs font-semibold uppercase tracking-widest text-[#74C69D] mb-4 block">
            University Library Network · Est. 2025
          </span>
          <h1 className="font-(family-name:--font-cormorant) text-4xl md:text-6xl font-semibold text-white leading-tight mb-6">
            Find Your <em className="italic text-[#74C69D]">Perfect</em>
            <br />
            Study Room
          </h1>
          <p className="text-[#95b4c8] text-base leading-relaxed mb-8 max-w-md">
            Browse and book quiet, distraction-free study rooms across your
            campus library. Own a space? List it and connect with learners.
          </p>
          <div className="flex gap-4 flex-wrap">
            <Link href="/rooms">
              <Button className="bg-[#2D6A4F] text-white font-medium px-6 h-11">
                Explore Rooms
              </Button>
            </Link>
            <Link href="#how-it-works">
              <Button
                variant="bordered"
                className="border-[#4a7a8a] text-[#95b4c8] hover:border-[#74C69D] hover:text-[#74C69D] px-6 h-11"
              >
                How it works
              </Button>
            </Link>
          </div>
        </div>

        {/* Right — Stats */}
        <div className="flex flex-col gap-4 md:items-end">
          {[
            { num: "300+", label: "Rooms Listed" },
            { num: "1.2k", label: "Happy Students" },
            { num: "98%", label: "On-time Bookings" },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white/5 border border-[#74C69D]/15 rounded-2xl px-8 py-5 text-center w-full md:w-48"
            >
              <div className="font-(family-name:--font-cormorant) text-4xl font-semibold text-[#74C69D]">
                {stat.num}
              </div>
              <div className="text-xs text-[#95b4c8] mt-1">{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
