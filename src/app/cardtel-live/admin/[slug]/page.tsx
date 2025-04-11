"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import { doc, getDoc } from "firebase/firestore";
import { db, CardtelRoom, Card } from "../../firebase";

export default function AdminRoomPage() {
  const params = useParams();
  const slug = params?.slug as string;
  const [room, setRoom] = useState<CardtelRoom | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!slug) return;

    const fetchRoom = async () => {
      try {
        const roomRef = doc(db, "cardtel-room", slug);
        const docSnap = await getDoc(roomRef);
        if (docSnap.exists()) {
          setRoom({ id: docSnap.id, ...docSnap.data() } as CardtelRoom);
        } else {
          console.warn("Room not found!");
        }
      } catch (error) {
        console.error("Error fetching room:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRoom();
  }, [slug]);

  if (loading) return <p className="p-4">🔄 กำลังโหลดห้อง...</p>;
  if (!room) return <p className="p-4">❌ ไม่พบห้องที่ต้องการ</p>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">🧙‍♂️ ห้อง: {room.title || slug}</h1>
      <p className="text-gray-500 mb-6">✏️ ข้อความ: {room.message || "—"}</p>

      <div className="grid grid-cols-2 gap-4">
        {room.cardChoose.length === 0 ? (
          <p className="text-sm text-gray-400 col-span-2">ยังไม่มีใครเลือกการ์ดในห้องนี้</p>
        ) : (
          room.cardChoose.map((card: Card) => (
            <div key={card.id} className="p-4 bg-white rounded shadow">
              <h3 className="font-semibold">{card.title}</h3>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
