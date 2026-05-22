import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600"],
  style: ["normal", "italic"],
  variable: "--font-cormorant",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-dm-sans",
});

export const metadata = {
  title: "StudyNook — Find Your Perfect Study Room",
  description: "Browse and book quiet study rooms in your campus library.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${cormorant.variable} ${dmSans.variable}`}>
      <body className="bg-[#F8F5EE] font-[family-name:var(--font-dm-sans)]">
        <Toaster
          position="top-right"
          toastOptions={{
            duration: 3000,
            style: {
              background: "#1B3A4B",
              color: "#fff",
              fontSize: "14px",
              borderRadius: "12px",
            },
            success: {
              iconTheme: {
                primary: "#74C69D",
                secondary: "#fff",
              },
            },
            error: {
              iconTheme: {
                primary: "#B5451B",
                secondary: "#fff",
              },
            },
          }}
        />
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
