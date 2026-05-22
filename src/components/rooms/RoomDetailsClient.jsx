"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { Button } from "@heroui/react";
import toast from "react-hot-toast";
import { authClient } from "@/lib/auth-client";

const amenitiesList = [
  "Wi-Fi",
  "A/C",
  "Whiteboard",
  "Projector",
  "TV",
  "Quiet Zone",
  "Natural Light",
  "Power Outlets",
  "Locker",
  "Ergonomic Chairs",
];

const inputClass =
  "w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors";

function EditRoomForm({ room, onSuccess, onClose }) {
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState(
    room.amenities || [],
  );

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const formData = {
      name: e.target.name.value,
      floor: e.target.floor.value,
      library: e.target.library.value,
      capacity: parseInt(e.target.capacity.value),
      pricePerHour: parseFloat(e.target.pricePerHour.value),
      image: e.target.image.value,
      description: e.target.description.value,
      amenities: selectedAmenities,
    };

    try {
      const tokenRes = await fetch("/api/token");
      const { token } = await tokenRes.json();

      const res = await fetch(`http://localhost:5000/api/rooms/${room._id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (!res.ok) {
        toast.error(data.message || "Update failed!");
        setLoading(false);
        return;
      }
      onSuccess(data);
    } catch {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-4">
      <div>
        <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
          Room Name
        </label>
        <input
          name="name"
          type="text"
          required
          defaultValue={room.name}
          className={inputClass}
        />
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
            Floor
          </label>
          <input
            name="floor"
            type="text"
            required
            defaultValue={room.floor}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
            Library Name
          </label>
          <input
            name="library"
            type="text"
            required
            defaultValue={room.library}
            className={inputClass}
          />
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
            Capacity
          </label>
          <input
            name="capacity"
            type="number"
            required
            defaultValue={room.capacity}
            className={inputClass}
          />
        </div>
        <div>
          <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
            Price/Hour ($)
          </label>
          <input
            name="pricePerHour"
            type="number"
            required
            defaultValue={room.pricePerHour}
            className={inputClass}
          />
        </div>
      </div>
      <div>
        <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
          Image URL
        </label>
        <input
          name="image"
          type="url"
          required
          defaultValue={room.image}
          className={inputClass}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
          Description
        </label>
        <textarea
          name="description"
          required
          rows={3}
          defaultValue={room.description}
          className={`${inputClass} resize-none`}
        />
      </div>
      <div>
        <label className="text-xs font-medium text-[#4a6375] block mb-2">
          Amenities
        </label>
        <div className="flex flex-wrap gap-2">
          {amenitiesList.map((amenity) => (
            <button
              key={amenity}
              type="button"
              onClick={() => toggleAmenity(amenity)}
              className={`px-3 py-1.5 rounded-full text-xs font-medium border transition-all ${
                selectedAmenities.includes(amenity)
                  ? "bg-[#2D6A4F] text-white border-[#2D6A4F]"
                  : "bg-transparent text-[#4a6375] border-[#E9E4D8] hover:border-[#2D6A4F]"
              }`}
            >
              {amenity}
            </button>
          ))}
        </div>
      </div>
      <div className="flex gap-3 mt-2">
        <Button
          type="button"
          variant="bordered"
          className="flex-1 border-[#E9E4D8] text-[#4a6375] h-11"
          onPress={onClose}
        >
          Cancel
        </Button>
        <Button
          type="submit"
          isLoading={loading}
          className="flex-1 bg-[#2D6A4F] text-white font-medium h-11"
        >
          Save Changes
        </Button>
      </div>
    </form>
  );
}

export default function RoomDetailsClient({ id }) {
  const router = useRouter();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [booking, setBooking] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [totalPrice, setTotalPrice] = useState(0);

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

  const calculatePrice = (start, end) => {
    if (!start || !end || !room) return;
    const [sh, sm] = start.split(":").map(Number);
    const [eh, em] = end.split(":").map(Number);
    const hours = (eh * 60 + em - (sh * 60 + sm)) / 60;
    if (hours > 0) setTotalPrice((hours * room.pricePerHour).toFixed(2));
    else setTotalPrice(0);
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this room?")) return;
    setDeleting(true);
    try {
      const tokenRes = await fetch("/api/token");
      const { token } = await tokenRes.json();
      const res = await fetch(`http://localhost:5000/api/rooms/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) {
        toast.error("Failed to delete room!");
        setDeleting(false);
        return;
      }
      toast.success("Room deleted successfully!");
      router.push("/rooms");
    } catch {
      toast.error("Something went wrong!");
      setDeleting(false);
    }
  };

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

            {session?.user?.id === room.owner?.id && (
              <div className="bg-white border border-[#E9E4D8] rounded-2xl p-6">
                <h2 className="font-[family-name:var(--font-cormorant)] text-xl font-semibold text-[#1B3A4B] mb-4">
                  Manage Room
                </h2>
                <div className="flex gap-3">
                  <Button
                    className="flex-1 bg-[#1B3A4B] text-white font-medium h-10"
                    onPress={() => setShowEditModal(true)}
                  >
                    ✏️ Edit Room
                  </Button>
                  <Button
                    isLoading={deleting}
                    className="flex-1 bg-[#B5451B]/10 text-[#B5451B] border border-[#B5451B]/20 font-medium h-10"
                    onPress={handleDelete}
                  >
                    🗑️ Delete Room
                  </Button>
                </div>
              </div>
            )}
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
                    Select Date
                  </label>
                  <input
                    name="date"
                    type="date"
                    required
                    min={new Date().toISOString().split("T")[0]}
                    className={`w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors`}
                    onChange={(e) => {
                      const start =
                        document.querySelector('[name="startTime"]')?.value;
                      const end =
                        document.querySelector('[name="endTime"]')?.value;
                      calculatePrice(start, end);
                    }}
                  />
                </div>

                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
                      Start Time
                    </label>
                    <select
                      name="startTime"
                      required
                      defaultValue=""
                      onChange={(e) => {
                        const end =
                          document.querySelector('[name="endTime"]')?.value;
                        calculatePrice(e.target.value, end);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {Array.from({ length: 15 }, (_, i) => i + 7).map(
                        (hour) => (
                          <option
                            key={hour}
                            value={`${String(hour).padStart(2, "0")}:00`}
                          >
                            {String(hour).padStart(2, "0")}:00
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                  <div>
                    <label className="text-xs font-medium text-[#4a6375] block mb-1.5">
                      End Time
                    </label>
                    <select
                      name="endTime"
                      required
                      defaultValue=""
                      onChange={(e) => {
                        const start =
                          document.querySelector('[name="startTime"]')?.value;
                        calculatePrice(start, e.target.value);
                      }}
                      className="w-full px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                    >
                      <option value="" disabled>
                        Select
                      </option>
                      {Array.from({ length: 15 }, (_, i) => i + 8).map(
                        (hour) => (
                          <option
                            key={hour}
                            value={`${String(hour).padStart(2, "0")}:00`}
                          >
                            {String(hour).padStart(2, "0")}:00
                          </option>
                        ),
                      )}
                    </select>
                  </div>
                </div>

                {totalPrice > 0 && (
                  <div className="bg-[#F8F5EE] border border-[#E9E4D8] rounded-xl p-4">
                    <div className="flex justify-between text-sm text-[#4a6375] mb-1">
                      <span>Estimated total</span>
                      <span className="font-semibold text-[#2D6A4F] text-base">
                        ${totalPrice}
                      </span>
                    </div>
                    <p className="text-xs text-[#7a9aaa]">
                      Based on selected time slot
                    </p>
                  </div>
                )}

                <Button
                  type="submit"
                  isLoading={booking}
                  className="w-full bg-[#2D6A4F] text-white font-medium h-11 mt-1"
                >
                  Confirm Booking
                </Button>

                {!session && (
                  <p className="text-xs text-center text-[#7a9aaa]">
                    Please{" "}
                    <button
                      type="button"
                      onClick={() => router.push("/login")}
                      className="text-[#2D6A4F] hover:underline"
                    >
                      login
                    </button>{" "}
                    to book this room
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
      {showEditModal && (
        <div className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center px-4">
          <div className="bg-white rounded-2xl p-8 w-full max-w-lg max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-6">
              <h2 className="font-(family-name:--font-cormorant) text-2xl font-semibold text-[#1B3A4B]">
                Edit Room
              </h2>
              <button
                onClick={() => setShowEditModal(false)}
                className="text-[#7a9aaa] hover:text-[#1B3A4B] text-xl"
              >
                ✕
              </button>
            </div>
            <EditRoomForm
              room={room}
              onSuccess={(updatedRoom) => {
                setRoom(updatedRoom);
                setShowEditModal(false);
                toast.success("Room updated successfully!");
              }}
              onClose={() => setShowEditModal(false)}
            />
          </div>
        </div>
      )}
    </div>
  );
}
