import Link from "next/link";

export default function Logo({ size = "default" }) {
  const textSize = size === "large" ? "text-3xl" : "text-2xl";

  return (
    <Link
      href="/"
      className={`font-heading ${textSize} font-semibold tracking-tight`}
    >
      <span className="text-ocean dark:text-white">Study</span>
      <span className="text-forest">Nook</span>
    </Link>
  );
}
