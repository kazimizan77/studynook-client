"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";
import { authClient } from "@/lib/auth-client";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

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
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] dark:bg-[#0d2137] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="font-(family-name:--font-cormorant) text-3xl font-semibold tracking-tight"
          >
            <span className="text-[#1B3A4B] dark:text-white">Study</span>
            <span className="text-[#2D6A4F]">Nook</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-[#152a3a] border border-[#E9E4D8] dark:border-[#1B3A4B] rounded-2xl p-8 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2D6A4F]">
            Get started
          </span>
          <h1 className="font-(family-name:--font-cormorant) text-2xl font-semibold text-[#1B3A4B] dark:text-white mt-1 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-[#7a9aaa] mb-7">
            Join StudyNook and start booking study rooms
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Full Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="Your Name"
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Email Address
              </label>
              <input
                name="email"
                type="email"
                required
                placeholder="your@email.com"
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Photo URL{" "}
                <span className="text-[#7a9aaa] font-normal">(optional)</span>
              </label>
              <input
                name="image"
                type="url"
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
              />
            </div>
            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Password
              </label>
              <input
                name="password"
                type="password"
                required
                placeholder="Min. 8 characters"
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
              />
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-[#2D6A4F] text-white font-medium h-11 mt-1"
            >
              Create Account
            </Button>
          </form>

          <div className="flex items-center gap-3 my-5">
            <div className="flex-1 h-px bg-[#E9E4D8] dark:bg-[#1B3A4B]" />
            <span className="text-xs text-[#7a9aaa]">or</span>
            <div className="flex-1 h-px bg-[#E9E4D8] dark:bg-[#1B3A4B]" />
          </div>

          <Button
            onPress={handleGoogle}
            variant="bordered"
            className="w-full border-[#E9E4D8] dark:border-[#1B3A4B] text-[#1B3A4B] dark:text-white h-11"
            startContent={<FcGoogle size={18} />}
          >
            Continue with Google
          </Button>

          <p className="text-xs text-center text-[#7a9aaa] mt-6">
            Already have an account?{" "}
            <Link
              href="/login"
              className="text-[#2D6A4F] font-semibold hover:underline"
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
