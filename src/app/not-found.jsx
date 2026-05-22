import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] flex items-center justify-center px-6">
      <div className="text-center max-w-lg">
        <div className="font-[--font-cormorant] text-[180px] font-semibold leading-none text-[#E9E4D8] select-none">
          404
        </div>

        <div className="-mt-8">
          <h1 className="font-[--font-cormorant] text-4xl font-semibold text-[#1B3A4B] mb-3">
            Page Not Found
          </h1>
          <p className="text-sm text-[#7a9aaa] leading-relaxed mb-8">
            Oops! The page you're looking for doesn't exist or has been moved.
            Let's get you back on track.
          </p>

          <div className="flex gap-4 justify-center flex-wrap">
            <Link
              href="/"
              className="bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Back to Home
            </Link>
            <Link
              href="/rooms"
              className="border border-[#E9E4D8] hover:border-[#2D6A4F] text-[#4a6375] hover:text-[#2D6A4F] text-sm font-medium px-6 py-2.5 rounded-xl transition-colors"
            >
              Browse Rooms
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
