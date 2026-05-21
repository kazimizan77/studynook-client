"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";

const sliderImages = [
  "https://images.unsplash.com/photo-1541339907198-e08756dedf3f?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1568667256549-094345857637?q=80&w=1920&auto=format&fit=crop",
  "https://images.unsplash.com/photo-1497366216548-37526070297c?q=80&w=1920&auto=format&fit=crop",
];

export default function Banner() {
  const [currentImage, setCurrentImage] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentImage((prev) =>
        prev === sliderImages.length - 1 ? 0 : prev + 1,
      );
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative w-full bg-[#0d2137] overflow-hidden">
      {sliderImages.map((src, index) => (
        <div
          key={index}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            index === currentImage ? "opacity-100 z-0" : "opacity-0 z-0"
          }`}
        >
          <Image
            src={src}
            alt={`Study Room Background ${index + 1}`}
            fill
            priority={index === 0}
            className={`object-cover transition-transform duration-[10000ms] ease-linear ${
              index === currentImage ? "scale-105" : "scale-100"
            }`}
          />
        </div>
      ))}

      <div className="absolute inset-0 bg-[#0d2137]/85 backdrop-blur-[2px] z-10" />

      <div className="relative z-20 max-w-7xl w-full mx-auto px-6 py-20 flex flex-col md:flex-row items-center justify-between gap-12">
        {/* Left Side: Text Content */}
        <div className="flex flex-col gap-5">
          <span className="text-[10px] uppercase tracking-widest text-[#74C69D] font-bold">
            University Library Network • Est. 2026
          </span>

          <h1 className="text-4xl md:text-5xl lg:text-6xl font-semibold text-white leading-tight">
            Find Your{" "}
            <span className="text-[#74C69D] italic font-serif">Perfect</span>{" "}
            <br />
            Study Room
          </h1>

          <p className="text-sm md:text-base text-[#95b4c8] max-w-xl leading-relaxed">
            Browse and book quiet, distraction-free study rooms across your
            campus library. Own a space? List it and connect with learners.
          </p>

          <div className="flex flex-wrap items-center gap-4 mt-4">
            <Link
              href="/rooms"
              className="px-6 py-3 bg-[#2D6A4F] hover:bg-[#1f4a37] text-white text-sm font-medium rounded-full transition-colors"
            >
              Explore Rooms
            </Link>
            <Link
              href="#how-it-works"
              className="px-6 py-3 bg-transparent hover:bg-white/5 text-white border border-white/20 text-sm font-medium rounded-full transition-colors"
            >
              How it works
            </Link>
          </div>
        </div>

        <div className="flex flex-col gap-4 items-end shrink-0">
          <div className="w-[280px] bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-semibold text-[#74C69D]">300+</h3>
            <p className="text-xs text-[#95b4c8] uppercase tracking-wider mt-1">
              Rooms Listed
            </p>
          </div>

          <div className="w-[280px] bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-semibold text-[#74C69D]">1.2k</h3>
            <p className="text-xs text-[#95b4c8] uppercase tracking-wider mt-1">
              Happy Students
            </p>
          </div>

          <div className="w-[280px] bg-white/5 border border-white/10 backdrop-blur-md p-5 rounded-2xl flex flex-col items-center justify-center transform transition-transform hover:-translate-y-1">
            <h3 className="text-3xl font-semibold text-[#74C69D]">98%</h3>
            <p className="text-xs text-[#95b4c8] uppercase tracking-wider mt-1">
              On-time Bookings
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
