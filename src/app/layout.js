import { Cormorant_Garamond, DM_Sans } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/shared/Navbar";
import Footer from "@/components/shared/Footer";
import { Toaster } from "react-hot-toast";
import { CheckCircle, XCircle } from "lucide-react";


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
          gutter={12}
          containerStyle={{
            top: 20,
            right: 20,
          }}
          toastOptions={{
            duration: 3500,

            style: {
              background: "rgba(21, 42, 58, 0.85)",
              color: "#fff",
              padding: "14px 16px",
              borderRadius: "14px",
              backdropFilter: "blur(12px)",
              border: "1px solid rgba(255,255,255,0.08)",
              boxShadow:
                "0 10px 30px rgba(0,0,0,0.25), inset 0 1px 0 rgba(255,255,255,0.05)",
              fontSize: "14px",
              display: "flex",
              alignItems: "center",
              gap: "10px",
              animation: "toast-in 0.4s ease",
            },

            success: {
              icon: (
                <CheckCircle
                  size={18}
                  className="text-[#74C69D]"
                />
              ),
            },

            error: {
              icon: (
                <XCircle
                  size={18}
                  className="text-[#ff6b6b]"
                />
              ),
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
