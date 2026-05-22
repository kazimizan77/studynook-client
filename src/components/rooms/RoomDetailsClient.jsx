"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

export default function RoomDetailsClient({ id }) {
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);

  const { data: session } = authClient.useSession();

  useEffect(() => {
    const fetchRoom = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/rooms/${id}`);
        const data = await res.json();
        setRoom(data);
      } catch {
        toast.error("Failed to load room!");
      } finally {
        setLoading(false);
      }
    };
    fetchRoom();
  }, [id]);

  const handleBooking = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

    setBooking(true);
    const date = e.target.date.value;
    const startTime = e.target.startTime.value;
    const endTime = e.target.endTime.value;

    const startDateTime = new Date(`${date}T${startTime}`);
    const endDateTime = new Date(`${date}T${endTime}`);

    if (endDateTime <= startDateTime) {
      toast.error("End time must be after start time!");
      setBooking(false);
      return;
    }

    try {
      const tokenRes = await fetch("/api/token");
      const { token } = await tokenRes.json();

      const res = await fetch("http://localhost:5000/api/bookings", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          roomId: id,
          startTime: startDateTime,
          endTime: endDateTime,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Booking failed!");
        setBooking(false);
        return;
      }

      toast.success("Room booked successfully!");
      router.push("/my-bookings");
    } catch {
      toast.error("Something went wrong!");
      setBooking(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] flex items-center justify-center">
        <div className="animate-pulse text-[#2D6A4F] font-(family-name:--font-cormorant) text-2xl">
          Loading...
        </div>
      </div>
    );
  }

  if (!room) {
    return (
      <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] flex items-center justify-center">
        <p className="text-[#1B3A4B]">Room not found.</p>
      </div>
    );
  }

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE]">
      <div className="bg-[#0d2137] py-10 px-6">
        <div className="max-w-7xl mx-auto">
          <p className="text-xs text-[#74C69D] mb-1">
            <span
              onClick={() => router.push("/rooms")}
              className="cursor-pointer hover:underline"
            >
              Rooms
            </span>{" "}
            / {room.name}
          </p>
          <h1 className="font-(family-name:--font-cormorant) text-4xl font-semibold text-white">
            {room.name}
          </h1>
          <p className="text-[#95b4c8] text-sm mt-1">
            {room.floor} · {room.library}
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative h-72 md:h-96 rounded-2xl overflow-hidden">
              <Image
                src={room.image}
                alt={room.name}
                fill
                className="object-cover"
              />
            </div>

            <div className="bg-white border border-[#E9E4D8] rounded-2xl p-6">
              <div className="flex justify-between items-start flex-wrap gap-4 mb-4">
                <div>
                  <h2 className="font-(family-name:--font-cormorant) text-2xl font-semibold text-[#1B3A4B] mb-1">
                    {room.name}
                  </h2>
                  <p className="text-sm text-[#7a9aaa]">
                    {room.floor} · {room.library} · 👥 {room.capacity} people
                  </p>
                </div>
                <div className="text-right">
                  <span className="font-(family-name:--font-cormorant) text-3xl font-semibold text-[#2D6A4F]">
                    ${room.pricePerHour}
                  </span>
                  <span className="text-sm text-[#7a9aaa]"> /hour</span>
                </div>
              </div>

              <p className="text-sm text-[#4a6375] leading-relaxed mb-6">
                {room.description}
              </p>

              <h3 className="font-(family-name:--font-cormorant) text-lg font-semibold text-[#1B3A4B] mb-3">
                Amenities
              </h3>
              <div className="flex flex-wrap gap-2">
                {room.amenities?.map((a) => (
                  <span
                    key={a}
                    className="text-xs px-3 py-1.5 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/20"
                  >
                    {a}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-white border border-[#E9E4D8] rounded-2xl p-6">
              <h3 className="font-(family-name:--font-cormorant) text-lg font-semibold text-[#1B3A4B] mb-4">
                Listed by
              </h3>
              <div className="flex items-center gap-3">
                {room.owner?.image ? (
                  <Image
                    src={room.owner.image}
                    alt={room.owner.name}
                    width={44}
                    height={44}
                    className="rounded-full object-cover"
                  />
                ) : (
                  <div className="w-11 h-11 rounded-full bg-[#2D6A4F] text-white flex items-center justify-center font-semibold">
                    {room.owner?.name?.charAt(0).toUpperCase()}
                  </div>
                )}
                <div>
                  <p className="font-medium text-[#1B3A4B] text-sm">
                    {room.owner?.name}
                  </p>
                  <p className="text-xs text-[#7a9aaa]">{room.owner?.email}</p>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <div className="bg-white border border-[#E9E4D8] rounded-2xl p-6 sticky top-24">
              <div className="mb-5">
                <span className="font-(family-name:--font-cormorant) text-3xl font-semibold text-[#2D6A4F]">
                  ${room.pricePerHour}
                </span>
                <span className="text-sm text-[#7a9aaa]"> / hour</span>
                <p className="text-xs text-[#7a9aaa] mt-1">
                  Free cancellation · No hidden charges
                </p>
              </div>

              <form onSubmit={handleBooking} className="flex flex-col gap-4">
                <div>
                  <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
                    Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className="w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                  />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
                      Start Time
                    </label>
                    <input
                      name="startTime"
                      type="time"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    />
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
                      End Time
                    </label>
                    <input
                      name="endTime"
                      type="time"
                      required
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    />
                  </div>
                </div>

                <Button
                  type="submit"
                  isLoading={booking}
                  className="w-full bg-[#2D6A4F] text-white font-medium h-11"
                >
                  Confirm Booking
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
