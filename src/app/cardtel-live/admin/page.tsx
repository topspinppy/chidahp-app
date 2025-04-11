"use client";

import { useState, useEffect } from "react";
import {
  CardtelRoom,
  getAllCardtelRooms,
  createCardtelRoom,
} from "../firebase";
import { useCardtelRooms } from "./hooks/useCardtelRooms";

const DEFAULT_CARD_LIST = [
  "หมดไฟ",
  "กลัวอนาคต",
  "คิดถึงใครบางคน",
  "อยากเริ่มใหม่",
  "ล้มเหลว",
  "โดดเดี่ยว",
  "หลงทาง",
  "ไม่อยากเป็นตัวเอง",
];

export default function CardtelAdminPage() {
  const [showModal, setShowModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState<CardtelRoom[]>([]);
  const { rooms: cardtelRooms, loading } = useCardtelRooms(); // จาก hook realtime

  // เรียกแค่ครั้งแรก
  useEffect(() => {
    const fetchInitialRooms = async () => {
      const cardtelRoomLists = await getAllCardtelRooms();
      setRooms(cardtelRoomLists);
    };
    fetchInitialRooms();
  }, []);

  // ถ้า cardtelRooms มีการอัปเดต → อัปเดต state ของเรา
  useEffect(() => {
    if (!loading && cardtelRooms.length > 0) {
      setRooms(cardtelRooms);
    }
  }, [cardtelRooms, loading]);

  const createRoom = async () => {
    const room: CardtelRoom = {
      slug,
      title,
      cardChoose: [],
      message: "",
      hasSubmitted: false,
      createdAt: new Date().toISOString(),
    };
    await createCardtelRoom(room);
    setShowModal(false);
    setSlug("");
    setTitle("");
  };

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🧙‍♂️ Cardtel Live: Admin
        </h1>

        <button
          onClick={() => setShowModal(true)}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          + New Cardtel Room
        </button>

        {/* Room List */}
        <div className="mt-8 space-y-4">
          {rooms.map((room, index) => {
            const hasNewCard = room.hasSubmitted && room.cardChoose.length > 0;

            return (
              <div
                key={index}
                className="p-4 bg-white rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center"
              >
                <div className="mb-2 md:mb-0">
                  <h2 className="text-lg font-semibold">
                    {room.title || "— ไม่มีชื่อห้อง —"}
                  </h2>

                  {hasNewCard && (
                    <p className="text-xs text-red-500 mt-1 font-medium animate-pulse">
                      มีการ์ดใหม่!
                    </p>
                  )}

                  <p className="text-sm text-gray-500">
                    Room id: <code>{room.id}</code>
                  </p>
                  <p className="text-sm text-gray-400">
                    Created: {new Date(room.createdAt).toLocaleString()}
                  </p>

                  <div className="mt-3">
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/cardtel-live/${room.id}`;
                        navigator.clipboard.writeText(url);
                        alert("คัดลอกลิงก์เรียบร้อยแล้วค้าบ!");
                      }}
                      className="text-sm text-blue-500 hover:underline"
                    >
                      🔗 คัดลอกลิงก์ห้อง
                    </button>
                  </div>
                </div>

                <div className="flex flex-col items-end md:items-start mt-2 md:mt-0 md:ml-4 relative">
                  <a
                    href={`/cardtel-live/admin/${room.id}`}
                    className={`relative text-sm font-semibold px-3 py-2 rounded transition-all duration-150
                        text-blue-600 hover:text-blue-700
                    `}
                  >
                    View Responses →
                  </a>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-30 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded shadow-lg w-full max-w-lg">
            <h2 className="text-xl font-semibold mb-4">
              🎴 สร้าง Cardtel Room ใหม่
            </h2>

            <input
              type="text"
              placeholder="Slug (เช่น slug123)"
              className="w-full border rounded px-3 py-2 mb-3"
              value={slug}
              onChange={(e) => setSlug(e.target.value)}
            />

            <input
              type="text"
              placeholder="ชื่อห้อง (optional)"
              className="w-full border rounded px-3 py-2 mb-4"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />

            <p className="text-sm text-gray-500 mb-4">
              ห้องจะใช้การ์ดทั้งหมด {DEFAULT_CARD_LIST.length} ใบ โดยอัตโนมัติ
            </p>

            <div className="flex justify-end space-x-3">
              <button
                onClick={() => setShowModal(false)}
                className="px-4 py-2 text-gray-600 hover:underline"
              >
                ยกเลิก
              </button>
              <button
                onClick={createRoom}
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                disabled={!slug}
              >
                สร้างห้อง
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
