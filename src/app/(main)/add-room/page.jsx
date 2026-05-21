"use client";
import { useState } from "react";
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

export default function AddRoomPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [selectedAmenities, setSelectedAmenities] = useState([]);

  const { data: session } = authClient.useSession();

  const toggleAmenity = (amenity) => {
    setSelectedAmenities((prev) =>
      prev.includes(amenity)
        ? prev.filter((a) => a !== amenity)
        : [...prev, amenity],
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!session) {
      toast.error("Please login first!");
      router.push("/login");
      return;
    }

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

      const res = await fetch("http://localhost:5000/api/rooms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      const data = await res.json();

      if (!res.ok) {
        toast.error(data.message || "Failed to add room!");
        setLoading(false);
        return;
      }

      toast.success("Room added successfully!");
      router.push("/rooms");
    } catch (error) {
      toast.error("Something went wrong!");
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE] dark:bg-[#0d2137] py-12 px-4">
      <div className="max-w-2xl mx-auto">
        <div className="mb-8">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#2D6A4F]">
            List your space
          </span>
          <h1 className="font-[family-name:var(--font-cormorant)] text-3xl font-semibold text-[#1B3A4B] dark:text-white mt-1">
            Add a Study Room
          </h1>
          <p className="text-sm text-[#7a9aaa] mt-1">
            Fill in the details below to list your study room
          </p>
        </div>

        <div className="bg-white dark:bg-[#152a3a] border border-[#E9E4D8] dark:border-[#1B3A4B] rounded-2xl p-8 shadow-sm">
          <form onSubmit={handleSubmit} className="flex flex-col gap-5">
            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Room Name
              </label>
              <input
                name="name"
                type="text"
                required
                placeholder="e.g. Quiet Reading Bay"
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                  Floor
                </label>
                <input
                  name="floor"
                  type="text"
                  required
                  placeholder="e.g. Floor 2"
                  className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                  Library Name
                </label>
                <input
                  name="library"
                  type="text"
                  required
                  placeholder="e.g. Central Library"
                  className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                  Capacity (people)
                </label>
                <input
                  name="capacity"
                  type="number"
                  required
                  min="1"
                  placeholder="e.g. 4"
                  className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                />
              </div>
              <div>
                <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                  Price per Hour ($)
                </label>
                <input
                  name="pricePerHour"
                  type="number"
                  required
                  min="0"
                  step="0.01"
                  placeholder="e.g. 5.00"
                  className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
                />
              </div>
            </div>

            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Image URL
              </label>
              <input
                name="image"
                type="url"
                required
                placeholder="https://..."
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-1.5">
                Description
              </label>
              <textarea
                name="description"
                required
                rows={3}
                placeholder="Describe your study room..."
                className="w-full px-4 py-3 rounded-xl border border-[#E9E4D8] dark:border-[#1B3A4B] bg-[#F8F5EE] dark:bg-[#0d2137] text-[#1B3A4B] dark:text-white placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors resize-none"
              />
            </div>

            <div>
              <label className="text-xs font-medium text-[#4a6375] dark:text-[#95b4c8] block mb-2">
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
                        : "bg-transparent text-[#4a6375] dark:text-[#95b4c8] border-[#E9E4D8] dark:border-[#1B3A4B] hover:border-[#2D6A4F]"
                    }`}
                  >
                    {amenity}
                  </button>
                ))}
              </div>
            </div>

            <Button
              type="submit"
              isLoading={loading}
              className="w-full bg-[#2D6A4F] text-white font-medium h-11 mt-1"
            >
              Add Room
            </Button>
          </form>
        </div>
      </div>
    </div>
  );
}
