import BannerSection from "@/components/home/BannerSection";
import LatestRooms from "@/components/home/LatestRooms";
import HowItWorks from "@/components/home/HowItWorks";
import CallToAction from "@/components/home/CallToAction";

export const metadata = {
  title: "StudyNook — Find Your Perfect Study Room",
};

export default function HomePage() {
  return (
    <main>
      <BannerSection />
      <LatestRooms />
      <HowItWorks />
      <CallToAction />
    </main>
  );
}
