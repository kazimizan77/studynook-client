"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

function BookingCard({ booking, onCancel }) {
  const isConfirmed = booking.status === "confirmed";

  const formatDate = (dateStr) => {
    return new Date(dateStr).toLocaleDateString("en-US", {
      weekday: "short",
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  const formatTime = (dateStr) => {
    return new Date(dateStr).toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div
      className={`bg-white border rounded-2xl overflow-hidden transition-all ${
        isConfirmed ? "border-[#E9E4D8]" : "border-[#E9E4D8] opacity-70"
      }`}
    >
      <div className="flex flex-col sm:flex-row">
        <div className="relative w-full sm:w-48 h-40 sm:h-auto flex-shrink-0">
          {booking.roomImage ? (
            <Image
              src={booking.roomImage}
              alt={booking.roomName}
              fill
              className="object-cover"
            />
          ) : (
            <div className="w-full h-full bg-[#E9E4D8] flex items-center justify-center">
              <span className="text-3xl">📚</span>
            </div>
          )}
          <div
            className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-medium ${
              isConfirmed
                ? "bg-[#2D6A4F]/90 text-white"
                : "bg-[#B5451B]/90 text-white"
            }`}
          >
            {isConfirmed ? "Confirmed" : "Cancelled"}
          </div>
        </div>

        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <h3 className="font-(family-name:--font-cormorant) text-xl font-semibold text-[#1B3A4B] mb-2">
              {booking.roomName}
            </h3>
            <div className="flex flex-wrap gap-4 text-sm text-[#4a6375]">
              <div className="flex items-center gap-1.5">
                <span className="text-[#2D6A4F]">📅</span>
                {formatDate(booking.startTime)}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#2D6A4F]">🕐</span>
                {formatTime(booking.startTime)} — {formatTime(booking.endTime)}
              </div>
              <div className="flex items-center gap-1.5">
                <span className="text-[#2D6A4F]">💰</span>
                <span className="font-semibold text-[#2D6A4F]">
                  ${booking.totalPrice}
                </span>
              </div>
            </div>
          </div>

          {isConfirmed && (
            <div className="mt-4 flex gap-3">
              <Button
                size="sm"
                className="bg-[#B5451B]/10 text-[#B5451B] border border-[#B5451B]/20 hover:bg-[#B5451B]/20"
                onPress={() => onCancel(booking._id)}
              >
                Cancel Booking
              </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default function MyBookingsClient() {
  const router = useRouter();
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    if (!session) return;
    fetchBookings();
  }, [session]);

  const fetchBookings = async () => {
    try {
      const tokenRes = await fetch("/api/token");
      const { token } = await tokenRes.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/my`,
        {
          headers: { Authorization: `Bearer ${token}` },
        },
      );
      const data = await res.json();
      setBookings(data);
    } catch {
      toast.error("Failed to load bookings!");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = async (bookingId) => {
    if (!confirm("Are you sure you want to cancel this booking?")) return;

    try {
      const tokenRes = await fetch("/api/token");
      const { token } = await tokenRes.json();

      const res = await fetch(
        `${process.env.NEXT_PUBLIC_SERVER_URL}/api/bookings/${bookingId}`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        },
      );

      if (!res.ok) {
        toast.error("Failed to cancel booking!");
        return;
      }

      toast.success("Booking cancelled!");
      fetchBookings();
    } catch {
      toast.error("Something went wrong!");
    }
  };

  if (!session) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] flex items-center justify-center">
        <div className="text-center">
          <p className="text-5xl mb-4">🔒</p>
          <p className="font-[family-name:var(--font-cormorant)] text-2xl text-[#1B3A4B] mb-2">
            Please login first
          </p>
          <Button
            className="bg-[#2D6A4F] text-white mt-4"
            onPress={() => router.push("/login")}
          >
            Go to Login
          </Button>
        </div>
      </div>
    );
  }

  const confirmed = bookings.filter((b) => b.status === "confirmed");
  const cancelled = bookings.filter((b) => b.status === "cancelled");

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE]">
      <div className="bg-[#0d2137] py-12 px-6">
        <div className="max-w-4xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#74C69D] block mb-2">
            Dashboard
          </span>
          <h1 className="font-[family-name:var(--font-cormorant)] text-4xl font-semibold text-white">
            My Bookings
          </h1>
          <p className="text-[#95b4c8] text-sm mt-1">
            Manage all your study room reservations
          </p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-10">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {[
            { label: "Total", value: bookings.length, color: "text-[#1B3A4B]" },
            {
              label: "Confirmed",
              value: confirmed.length,
              color: "text-[#2D6A4F]",
            },
            {
              label: "Cancelled",
              value: cancelled.length,
              color: "text-[#B5451B]",
            },
          ].map((stat) => (
            <div
              key={stat.label}
              className="bg-white border border-[#E9E4D8] rounded-2xl p-5 text-center"
            >
              <p
                className={`font-[family-name:var(--font-cormorant)] text-4xl font-semibold ${stat.color}`}
              >
                {stat.value}
              </p>
              <p className="text-xs text-[#7a9aaa] uppercase tracking-widest mt-1">
                {stat.label}
              </p>
            </div>
          ))}
        </div>

        {loading ? (
          <div className="space-y-4">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="h-36 bg-white border border-[#E9E4D8] rounded-2xl animate-pulse"
              />
            ))}
          </div>
        ) : bookings.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-[#E9E4D8] rounded-2xl">
            <p className="text-5xl mb-4">📭</p>
            <p className="font-[family-name:var(--font-cormorant)] text-2xl text-[#1B3A4B] mb-2">
              No bookings yet
            </p>
            <p className="text-sm text-[#7a9aaa] mb-6">
              Book a study room to get started
            </p>
            <Button
              className="bg-[#2D6A4F] text-white"
              onPress={() => router.push("/rooms")}
            >
              Browse Rooms
            </Button>
          </div>
        ) : (
          <div className="space-y-4">
            {bookings.map((booking) => (
              <BookingCard
                key={booking._id}
                booking={booking}
                onCancel={handleCancel}
              />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
