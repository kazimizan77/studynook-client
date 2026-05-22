import Link from "next/link";
import Image from "next/image";

async function getRooms() {
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_SERVER_URL}/api/rooms?limit=6`,
      {
        cache: "no-store",
      },
    );
    if (!res.ok) return [];
    return await res.json();
  } catch {
    return [];
  }
}

function RoomCard({ room }) {
  return (
    <div className="bg-white dark:bg-[#0d2137] border border-[#E9E4D8] dark:border-[#1B3A4B] rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 group">
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
        <h3 className="font-(family-name:--font-cormorant) text-xl font-semibold text-[#1B3A4B] dark:text-white mb-1">
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

export default async function LatestRooms() {
  const rooms = await getRooms();

  return (
    <section className="py-20 bg-white dark:bg-[#0a1929]">
      <div className="max-w-7xl mx-auto px-6">
        <div className="flex justify-between items-end mb-10">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#2D6A4F] block mb-2">
              Newly Added
            </span>
            <h2 className="font-(family-name:--font-cormorant) text-4xl font-semibold text-[#1B3A4B] dark:text-white">
              Latest Study Rooms
            </h2>
          </div>
          <Link
            href="/rooms"
            className="text-sm text-[#2D6A4F] hover:underline hidden md:block font-medium"
          >
            View all rooms →
          </Link>
        </div>

        {rooms.length === 0 ? (
          <div className="text-center py-20 border-2 border-dashed border-[#E9E4D8] dark:border-[#1B3A4B] rounded-2xl">
            <p className="text-4xl mb-4">📚</p>
            <p className="text-[#1B3A4B] dark:text-white font-medium mb-2">
              No rooms available yet
            </p>
            <p className="text-[#7a9aaa] text-sm mb-4">
              Be the first to list a study room!
            </p>
            <Link
              href="/add-room"
              className="inline-block bg-[#2D6A4F] text-white text-sm font-medium px-6 py-2.5 rounded-xl hover:bg-[#2D6A4F]/90 transition-colors"
            >
              Add a Room
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {rooms.map((room) => (
              <RoomCard key={room._id} room={room} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
