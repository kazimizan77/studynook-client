"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { authClient } from "@/lib/auth-client";

import Lottie from "lottie-react";
import animationData from "../../../../public/assets/login-animation.json";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const image = e.target.image.value;
    const password = e.target.password.value;

    const { error } = await authClient.signUp.email({
      name,
      email,
      password,
      image: image || undefined,
    });

    if (error) {
      toast.error(error.message || "Registration failed!");
      setLoading(false);
      return;
    }

    toast.success("Account created successfully!");
    router.push("/");
  };

  const handleGoogle = async () => {
    await authClient.signIn.social({ provider: "google", callbackURL: "/" });
  };

  return (
    <div className="min-h-[calc(100vh-64px)] w-full flex flex-col md:flex-row">
      <div className="hidden md:flex w-1/2 bg-gradient-to-br from-[#d8efe3] to-[#b7dfc7] items-center justify-center p-10">
        <div className="text-center max-w-md">
          <div className="w-72 h-72 mx-auto mb-6 flex items-center justify-center">
            <Lottie animationData={animationData} loop={true} />
          </div>

          <h2 className="text-2xl font-bold text-[#1B3A4B] mb-2">
            Your Quiet Corner Awaits
          </h2>
          <p className="text-sm text-[#4a6375] max-w-sm mx-auto">
            Discover the perfect environment for your next deep-work session.
            Book study rooms instantly and manage your schedule with ease.
          </p>

          <div className="flex justify-center gap-2 mt-5">
            <span className="w-2 h-2 bg-gray-300 rounded-full"></span>
            <span className="w-2 h-2 bg-[#2D6A4F] rounded-full"></span>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 flex-1 flex flex-col items-center justify-center px-6 py-12 bg-[#0d2137]">
        <div className="w-full max-w-md">
          <div className="flex justify-center mb-6">
            <Link href="/" className="text-2xl font-semibold tracking-tight">
              <span className="text-white">Study</span>
              <span className="text-[#74C69D]">Nook</span>
            </Link>
          </div>

          <div className="bg-[#152a3a]/90 backdrop-blur-md border border-[#1B3A4B] rounded-2xl p-8 shadow-xl">
            <span className="text-[10px] uppercase tracking-widest text-[#74C69D] font-semibold">
              Get started
            </span>

            <h1 className="text-2xl font-semibold text-white mt-1 mb-1">
              Create your account
            </h1>

            <p className="text-sm text-[#6a8fa0] mb-6">
              Join StudyNook and start booking study rooms
            </p>

            <form onSubmit={handleRegister} className="flex flex-col gap-4">
              <div>
                <label className="text-xs text-[#95b4c8] block mb-1">
                  Full Name
                </label>
                <input
                  name="name"
                  type="text"
                  required
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-xl border border-[#1B3A4B] bg-[#F8F5EE] text-sm text-[#1B3A4B] focus:outline-none focus:border-[#74C69D]"
                />
              </div>

              <div>
                <label className="text-xs text-[#95b4c8] block mb-1">
                  Email Address
                </label>
                <input
                  name="email"
                  type="email"
                  required
                  placeholder="your@email.com"
                  className="w-full px-4 py-3 rounded-xl border border-[#1B3A4B] bg-[#F8F5EE] text-sm text-[#1B3A4B] focus:outline-none focus:border-[#74C69D]"
                />
              </div>

              <div>
                <label className="text-xs text-[#95b4c8] block mb-1">
                  Photo URL{" "}
                  <span className="text-[#6a8fa0] font-normal">(optional)</span>
                </label>
                <input
                  name="image"
                  type="url"
                  placeholder="https://..."
                  className="w-full px-4 py-3 rounded-xl border border-[#1B3A4B] bg-[#F8F5EE] text-sm text-[#1B3A4B] focus:outline-none focus:border-[#74C69D]"
                />
              </div>

              <div className="relative">
                <label className="text-xs text-[#95b4c8] block mb-1">
                  Password
                </label>
                <input
                  name="password"
                  type={showPassword ? "text" : "password"}
                  required
                  placeholder="Min. 8 characters"
                  className="w-full px-4 py-3 rounded-xl border border-[#1B3A4B] bg-[#F8F5EE] text-sm text-[#1B3A4B] focus:outline-none focus:border-[#74C69D]"
                />

                <span
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-[38px] cursor-pointer text-gray-500 hover:text-[#1B3A4B] transition-colors"
                >
                  {showPassword ? (
                    <FaEyeSlash size={16} />
                  ) : (
                    <FaEye size={16} />
                  )}
                </span>
              </div>

              <Button
                type="submit"
                isLoading={loading}
                className="w-full bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white font-medium h-11 rounded-xl transition-colors mt-2"
              >
                Create Account
              </Button>
            </form>

            <div className="flex items-center gap-3 my-5">
              <div className="flex-1 h-px bg-white/10" />
              <span className="text-xs text-[#6a8fa0]">or</span>
              <div className="flex-1 h-px bg-white/10" />
            </div>

            <Button
              onPress={handleGoogle}
              variant="bordered"
              className="w-full h-11 rounded-xl border-white/10 hover:bg-white/5 text-white font-normal"
              startContent={<FcGoogle size={18} />}
            >
              Continue with Google
            </Button>

            <p className="text-xs text-center text-[#6a8fa0] mt-6">
              Already have an account?{" "}
              <Link
                href="/login"
                className="text-[#74C69D] font-semibold hover:underline"
              >
                Sign in here
              </Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
