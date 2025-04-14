"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

import {
  CardtelRoom,
  getAllCardtelRooms,
  createCardtelRoom,
  markRoomAsWatched,
  assignBookToRoom,
  getAllBooks,
} from "../firebase";
import { useCardtelRooms } from "./hooks/useCardtelRooms";

export default function CardtelAdminPage() {
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState<CardtelRoom[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "latest" | "unwatched" | "submitted"
  >("all");

  const { rooms: cardtelRooms, loading } = useCardtelRooms();

  // Assign book state
  const [assignModalOpen, setAssignModalOpen] = useState(false);
  const [assigningRoomId, setAssigningRoomId] = useState<string | null>(null);
  const [books, setBooks] = useState<{ id: string; title: string }[]>([]);
  const [selectedBooks, setSelectedBooks] = useState<string[]>([]);

  useEffect(() => {
    const fetchInitialRooms = async () => {
      const cardtelRoomLists = await getAllCardtelRooms();
      setRooms(cardtelRoomLists);
    };
    fetchInitialRooms();
  }, []);

  useEffect(() => {
    if (!loading && cardtelRooms.length > 0) {
      setRooms(cardtelRooms);
    }
  }, [cardtelRooms, loading]);

  useEffect(() => {
    const fetchBooks = async () => {
      const result = await getAllBooks();
      setBooks(result);
    };
    fetchBooks();
  }, []);

  const createRoom = async () => {
    const room: CardtelRoom = {
      slug,
      title,
      cardChoose: [],
      message: "",
      hasSubmitted: false,
      watch: false,
      createdAt: new Date().toISOString(),
    };
    await createCardtelRoom(room);
    alert("สร้างห้องเรียบร้อย");
    setShowModal(false);
    setSlug("");
    setTitle("");
  };

  const openAssignModal = (roomId: string) => {
    const room = rooms.find((r) => r.id === roomId);
    setAssigningRoomId(roomId);
    setSelectedBooks(room?.bookAssigned || []);
    setAssignModalOpen(true);
  };

  const filteredRooms = rooms
    .filter((room) => {
      if (filter === "submitted") return room.hasSubmitted;
      if (filter === "unwatched") return room.hasSubmitted && !room.watch;
      return true;
    })
    .filter(
      (room) =>
        room.title?.toLowerCase().includes(search.toLowerCase()) ||
        room.slug?.toLowerCase().includes(search.toLowerCase())
    )
    .sort((a, b) => {
      if (a.hasSubmitted !== b.hasSubmitted) {
        return Number(b.hasSubmitted) - Number(a.hasSubmitted);
      }
      if (a.watch !== b.watch) {
        return Number(a.watch) - Number(b.watch);
      }
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          🧙‍♂️ Cardtel Live: Admin
        </h1>

        <div className="flex flex-col md:flex-row md:items-center md:space-x-4 space-y-4 md:space-y-0">
          <button
            onClick={() => setShowModal(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          >
            + New Cardtel Room
          </button>

          <input
            type="text"
            placeholder="🔍 ค้นหาชื่อห้อง / slug"
            className="px-3 py-2 border rounded w-full md:w-64"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />

          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">📋 แสดงทั้งหมด</option>
            <option value="submitted">✅ ส่งการ์ดแล้ว</option>
            <option value="unwatched">👀 ยังไม่ดู</option>
          </select>
        </div>

        <div className="mt-8 space-y-4">
          {filteredRooms.map((room, index) => {
            const hasNewCard = room.hasSubmitted && room.cardChoose.length > 0;
            const hasBeenViewed = room.watch === true;
            const shouldShowBadge = hasNewCard && !hasBeenViewed;

            let bgColor = "bg-white";
            if (hasNewCard && !hasBeenViewed) bgColor = "bg-red-50";
            else if (room.hasSubmitted) bgColor = "bg-green-50";

            return (
              <div
                key={index}
                className={`p-4 rounded shadow flex flex-col md:flex-row justify-between items-start md:items-center border transition-all duration-300 ${bgColor}`}
              >
                <div>
                  <h2 className="text-lg font-semibold">
                    {room.title || "— ไม่มีชื่อห้อง —"}
                  </h2>

                  {shouldShowBadge && (
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
                  <p className="text-sm text-gray-600">
                    การ์ดที่เลือก: {room.cardChoose.length} ใบ
                  </p>

                  {room.bookAssigned?.length > 0 && (
                    <p className="text-sm text-violet-700 mt-1">
                      📚 หนังสือที่จับคู่:{" "}
                      {books
                        .filter((b) => room.bookAssigned?.includes(b.id))
                        .map((b) => b.title)
                        .join(", ")}
                    </p>
                  )}

                  {!room.hasSubmitted && (
                    <button
                      onClick={() => {
                        const url = `${window.location.origin}/cardtel-live/${room.id}`;
                        navigator.clipboard.writeText(url);
                        alert("คัดลอกลิงก์เรียบร้อย");
                      }}
                      className="text-sm text-blue-500 hover:underline mt-2"
                    >
                      🔗 คัดลอกลิงก์ห้อง
                    </button>
                  )}

                  <a
                    href={`/cardtel-live/${room.id}`}
                    target="_blank"
                    className="block text-xs text-gray-400 hover:underline mt-1"
                  >
                    👁 ดูหน้า public
                  </a>
                </div>

                <div className="flex flex-col items-end mt-4 md:mt-0 space-y-2">
                  {room.hasSubmitted && (
                    <>
                      <button
                        onClick={() => openAssignModal(room.id ?? "")}
                        className="text-sm font-medium px-3 py-2 rounded border border-gray-300 bg-white hover:bg-gray-100"
                      >
                        📚 จับคู่กับหนังสือ
                      </button>

                      <button
                        onClick={() => {
                          const resultUrl = `${window.location.origin}/cardtel-live/${room.id}/result`;
                          window.open(resultUrl, "_blank");
                        }}
                        className="text-sm text-violet-700 hover:underline"
                      >
                        🔍 ดูผลลัพธ์ที่ Assign ไป
                      </button>

                      <button
                        onClick={() => {
                          const resultUrl = `${window.location.origin}/cardtel-live/${room.id}/result`;
                          navigator.clipboard.writeText(resultUrl);
                          alert("คัดลอกลิงก์ผลลัพธ์ให้ผู้ใช้เรียบร้อยค้าบ!");
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        📎 คัดลอกลิงก์ผลลัพธ์
                      </button>
                    </>
                  )}

                  <button
                    onClick={async () => {
                      if (room.hasSubmitted && !room.watch) {
                        await markRoomAsWatched(room.id ?? "");
                      }
                      router.push(`/cardtel-live/admin/${room.id}`);
                    }}
                    className="text-sm font-semibold px-3 py-2 rounded text-blue-600 hover:text-blue-700 cursor-pointer"
                  >
                    View Responses →
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Modal: สร้างห้อง */}
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

      {/* Modal: Assign หนังสือ */}
      {assignModalOpen && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-40 flex items-center justify-center">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">📚 จับคู่หนังสือกับห้อง</h2>

            <div className="mb-4 space-y-2 max-h-[250px] overflow-y-auto border rounded p-3">
              {books.map((book) => (
                <label key={book.id} className="flex items-center gap-2 text-sm">
                  <input
                    type="checkbox"
                    value={book.id}
                    checked={selectedBooks.includes(book.id)}
                    onChange={(e) => {
                      const checked = e.target.checked;
                      const value = e.target.value;
                      setSelectedBooks((prev) =>
                        checked
                          ? [...prev, value]
                          : prev.filter((id) => id !== value)
                      );
                    }}
                  />
                  {book.title}
                </label>
              ))}
            </div>

            <div className="flex justify-end gap-3">
              <button
                onClick={() => setAssignModalOpen(false)}
                className="text-gray-500 hover:underline"
              >
                ยกเลิก
              </button>
              <button
                disabled={selectedBooks.length === 0}
                onClick={async () => {
                  if (assigningRoomId && selectedBooks.length > 0) {
                    await assignBookToRoom(assigningRoomId, selectedBooks);
                    setAssignModalOpen(false);
                    alert("จับคู่หนังสือเรียบร้อยค้าบ!");
                  }
                }}
                className={`px-4 py-2 rounded text-white ${
                  selectedBooks.length > 0
                    ? "bg-violet-600 hover:bg-violet-700"
                    : "bg-gray-400 cursor-not-allowed"
                }`}
              >
                บันทึก
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
