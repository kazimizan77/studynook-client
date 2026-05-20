"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Button, Input } from "@heroui/react";
import toast from "react-hot-toast";
import { FcGoogle } from "react-icons/fc";

export default function RegisterPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleRegister = async (e) => {
    e.preventDefault();
    setLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const password = e.target.password.value;

    toast.success("Account created successfully!");
    router.push("/");
    setLoading(false);
  };

  const handleGoogle = async () => {
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] dark:bg-[#0d2137] flex items-center justify-center px-4 py-12">
      <div className="w-full max-w-md">
        <div className="flex justify-center mb-8">
          <Link
            href="/"
            className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold tracking-tight"
          >
            <span className="text-[#1B3A4B] dark:text-white">Study</span>
            <span className="text-[#2D6A4F]">Nook</span>
          </Link>
        </div>

        <div className="bg-white dark:bg-[#152a3a] border border-[#E9E4D8] dark:border-[#1B3A4B] rounded-2xl p-8 shadow-sm">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2D6A4F]">
            Get started
          </span>
          <h1 className="font-[family-name:var(--font-cormorant)] text-2xl font-semibold text-[#1B3A4B] dark:text-white mt-1 mb-1">
            Create your account
          </h1>
          <p className="text-sm text-[#7a9aaa] mb-7">
            Join StudyNook and start booking study rooms
          </p>

          <form onSubmit={handleRegister} className="flex flex-col gap-4">
            <Input
              name="name"
              type="text"
              label="Full Name"
              placeholder="Your Name"
              variant="bordered"
              isRequired
              classNames={{
                input: "text-[#1B3A4B] dark:text-white",
                inputWrapper:
                  "border-[#E9E4D8] dark:border-[#1B3A4B] hover:border-[#2D6A4F] dark:hover:border-[#74C69D]",
              }}
            />
            <Input
              name="email"
              type="email"
              label="Email Address"
              placeholder="your@email.com"
              variant="bordered"
              isRequired
              classNames={{
                input: "text-[#1B3A4B] dark:text-white",
                inputWrapper:
                  "border-[#E9E4D8] dark:border-[#1B3A4B] hover:border-[#2D6A4F] dark:hover:border-[#74C69D]",
              }}
            />
            <Input
              name="image"
              type="url"
              label="Photo URL"
              placeholder="https://..."
              variant="bordered"
              classNames={{
                input: "text-[#1B3A4B] dark:text-white",
                inputWrapper:
                  "border-[#E9E4D8] dark:border-[#1B3A4B] hover:border-[#2D6A4F] dark:hover:border-[#74C69D]",
              }}
            />
            <Input
              name="password"
              type="password"
              label="Password"
              placeholder="Min. 6 characters"
              variant="bordered"
              isRequired
              classNames={{
                input: "text-[#1B3A4B] dark:text-white",
                inputWrapper:
                  "border-[#E9E4D8] dark:border-[#1B3A4B] hover:border-[#2D6A4F] dark:hover:border-[#74C69D]",
              }}
            />

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
