import RoomDetailsClient from "@/components/rooms/RoomDetailsClient";

export default async function RoomDetailsPage({ params }) {
  const { id } = await params;
  return <RoomDetailsClient id={id} />;
}