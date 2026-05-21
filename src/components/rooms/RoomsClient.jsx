"use client";
import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";

const amenitiesList = [
  "Wi-Fi",
  "A/C",
  "Whiteboard",
  "Projector",
  "TV",
  "Quiet Zone",
  "Natural Light",
  "Power Outlets",
];

function RoomCard({ room }) {
  return (
    <div className="bg-white border border-[#E9E4D8] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
      <div className="relative h-48 overflow-hidden">
        <Image
          src={room.image}
          alt={room.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500"
        />
        <div className="absolute top-3 right-3 bg-[#2D6A4F] text-white text-xs font-medium px-3 py-1 rounded-full">
          Available
        </div>
      </div>
      <div className="p-5">
        <h3 className="font-(family-name:--font-cormorant) text-xl font-semibold text-[#1B3A4B] mb-1">
          {room.name}
        </h3>
        <p className="text-xs text-[#7a9aaa] mb-3">
          {room.floor} · {room.library}
        </p>
        <div className="flex justify-between items-center mb-3">
          <span className="text-lg font-semibold text-[#2D6A4F]">
            ${room.pricePerHour}
            <span className="text-xs font-normal text-[#7a9aaa]"> /hr</span>
          </span>
          <span className="text-xs text-[#7a9aaa]">
            👥 {room.capacity} people
          </span>
        </div>
        <div className="flex gap-2 flex-wrap mb-4">
          {room.amenities?.slice(0, 3).map((a) => (
            <span
              key={a}
              className="text-xs px-2 py-1 rounded-full bg-[#2D6A4F]/10 text-[#2D6A4F] border border-[#2D6A4F]/20"
            >
              {a}
            </span>
          ))}
        </div>
        <Link
          href={`/rooms/${room._id}`}
          className="block w-full text-center bg-[#2D6A4F] hover:bg-[#2D6A4F]/90 text-white text-sm font-medium py-2.5 rounded-xl transition-colors"
        >
          View Details
        </Link>
      </div>
    </div>
  );
}

export default function RoomsClient() {
  const [rooms, setRooms] = useState([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [selectedAmenity, setSelectedAmenity] = useState("");

  const fetchRooms = async () => {
    setLoading(true);
    try {
      const params = new URLSearchParams();
      if (search) params.append("search", search);
      if (selectedAmenity) params.append("amenity", selectedAmenity);

      const res = await fetch(
        `http://localhost:5000/api/rooms?${params.toString()}`,
      );
      const data = await res.json();
      setRooms(data);
    } catch {
      setRooms([]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRooms();
  }, [search, selectedAmenity]);

  return (
    <div className="min-h-[calc(100vh-64px)] bg-[#F8F5EE]">
      <div className="bg-[#0d2137] py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <span className="text-xs font-semibold uppercase tracking-widest text-[#74C69D] block mb-2">
            Explore
          </span>
          <h1 className="font-(family-name:--font-cormorant) text-4xl font-semibold text-white">
            All Study Rooms
          </h1>
          <p className="text-[#95b4c8] text-sm mt-2">
            Browse and book from available study spaces
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 py-10">
        <div className="bg-white border border-[#E9E4D8] rounded-2xl p-5 mb-8 flex flex-col md:flex-row gap-4">
          <div className="flex-1 relative">
            <svg
              className="absolute left-3 top-1/2 -translate-y-1/2 text-[#7a9aaa] w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-4.35-4.35M17 11A6 6 0 1 1 5 11a6 6 0 0 1 12 0z"
              />
            </svg>
            <input
              type="text"
              placeholder="Search by room name..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-9 pr-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#1B3A4B] placeholder:text-[#7a9aaa] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
            />
          </div>

          <select
            value={selectedAmenity}
            onChange={(e) => setSelectedAmenity(e.target.value)}
            className="px-4 py-2.5 rounded-xl border border-[#E9E4D8] bg-[#F8F5EE] text-[#4a6375] text-sm focus:outline-none focus:border-[#2D6A4F] transition-colors"
          >
            <option value="">All Amenities</option>
            {amenitiesList.map((a) => (
              <option key={a} value={a}>
                {a}
              </option>
            ))}
          </select>

          {(search || selectedAmenity) && (
            <button
              onClick={() => {
                setSearch("");
                setSelectedAmenity("");
              }}
              className="px-4 py-2.5 rounded-xl border border-[#E9E4D8] text-[#4a6375] text-sm hover:border-[#2D6A4F] hover:text-[#2D6A4F] transition-colors"
            >
              Clear filters
            </button>
          )}
        </div>

        <p className="text-sm text-[#7a9aaa] mb-6">
          Showing{" "}
          <span className="font-medium text-[#1B3A4B]">{rooms.length}</span>{" "}
          rooms
        </p>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div
                key={i}
                className="bg-white border border-[#E9E4D8] rounded-2xl overflow-hidden animate-pulse"
              >
                <div className="h-48 bg-[#E9E4D8]" />
                <div className="p-5 space-y-3">
                  <div className="h-5 bg-[#E9E4D8] rounded w-3/4" />
                  <div className="h-3 bg-[#E9E4D8] rounded w-1/2" />
                  <div className="h-8 bg-[#E9E4D8] rounded" />
                </div>
              </div>
            ))}
          </div>
        ) : rooms.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-[#E9E4D8] rounded-2xl">
            <p className="text-4xl mb-4">🔍</p>
            <p className="text-[#1B3A4B] font-medium mb-2">No rooms found</p>
            <p className="text-[#7a9aaa] text-sm">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
