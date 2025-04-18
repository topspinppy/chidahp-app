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
  handleLogout as handleLogoutFirebase,
} from "../firebase";
import { useCardtelRooms } from "./hooks/useCardtelRooms";
import { useAuthRedirect } from "./hooks/useAuthRedirect";

export default function CardtelAdminPage() {
  const { authChecked, isAuthenticated } = useAuthRedirect();

  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [slug, setSlug] = useState("");
  const [title, setTitle] = useState("");
  const [rooms, setRooms] = useState<CardtelRoom[]>([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<
    "all" | "latest" | "unwatched" | "submitted"
  >("all");
  const [visibleCount, setVisibleCount] = useState(10);
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
      bookAssigned: [],
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
      // ✅ 1. คำนวณ shouldShowBadge
      const aHasNewCard = a.hasSubmitted && a.cardChoose.length > 0 && !a.watch;
      const bHasNewCard = b.hasSubmitted && b.cardChoose.length > 0 && !b.watch;

      // ✅ 2. ห้องที่มีการ์ดใหม่ → ขึ้นก่อน
      if (aHasNewCard !== bHasNewCard) {
        return Number(bHasNewCard) - Number(aHasNewCard); // true มาก่อน
      }

      // ✅ 3. ยังไม่ได้ดู → ขึ้นก่อน
      if (a.watch !== b.watch) {
        return Number(a.watch) - Number(b.watch); // false มาก่อน
      }

      // ✅ 4. ยังไม่ได้ส่ง → ขึ้นก่อน
      if (a.hasSubmitted !== b.hasSubmitted) {
        return Number(a.hasSubmitted) - Number(b.hasSubmitted);
      }

      // ✅ 5. อัปเดตล่าสุดอยู่บน (หรือใช้ createdAt ถ้าไม่มี updatedAt)
      return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
    });

  // 🛡 ถ้ายังเช็ก auth ไม่เสร็จ → แสดงแค่ loading
  if (!authChecked) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-gray-500">กำลังโหลด...</p>
      </div>
    );
  }

  // 🛑 ถ้า authChecked แล้วแต่ไม่ได้ login → ไม่ต้องแสดงอะไร
  if (!isAuthenticated) return null;

  const handleLogout = async () => {
    await handleLogoutFirebase();
    router.replace("/cardtel-live/admin/login")
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="flex justify-end mb-4">
        <button
          onClick={handleLogout}
          className="text-sm bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          🚪 ออกจากระบบ
        </button>
      </div>
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
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            onChange={(e) => setFilter(e.target.value as unknown as any)}
            className="px-3 py-2 border rounded"
          >
            <option value="all">📋 แสดงทั้งหมด</option>
            <option value="submitted">✅ ส่งการ์ดแล้ว</option>
            <option value="unwatched">👀 ยังไม่ดู</option>
          </select>
        </div>

        <div className="mt-8 space-y-4">
          {filteredRooms.slice(0, visibleCount).map((room, index) => {
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
                {/* ฝั่งซ้าย */}
                <div className="flex-1 min-w-0">
                  <h2 className="text-lg font-semibold break-words">
                    {room?.title || "— ไม่มีชื่อห้อง —"}
                  </h2>

                  {shouldShowBadge && (
                    <p className="text-xs text-red-500 mt-1 font-medium animate-pulse">
                      มีการ์ดใหม่!
                    </p>
                  )}

                  <p className="text-sm text-gray-500 break-all">
                    Room id: <code>{room.id}</code>
                  </p>
                  <p className="text-sm text-gray-400">
                    Created: {new Date(room.createdAt).toLocaleString()}
                  </p>
                  <p className="text-sm text-gray-600">
                    การ์ดที่เลือก: {room.cardChoose.length} ใบ
                  </p>

                  {room.bookAssigned?.length > 0 && (
                    <p className="text-sm text-violet-700 mt-1 break-words">
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
                    className="block text-xs text-gray-400 hover:underline m-1"
                  >
                    👁 ดูหน้า public
                  </a>
                </div>

                {/* ฝั่งขวา */}
                <div className="flex flex-col md:items-end items-start gap-2 mt-4 md:mt-0 md:ml-4 shrink-0">

                  {room.hasSubmitted && (
                    <div className="flex flex-wrap gap-2 items-center">
                      <button
                        onClick={() => openAssignModal(room.id ?? "")}
                        className="text-sm font-medium px-3 py-1.5 rounded border border-gray-300 bg-white hover:bg-gray-100"
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
                        🔍 ดูผลลัพธ์
                      </button>

                      <button
                        onClick={() => {
                          const resultUrl = `${window.location.origin}/cardtel-live/${room.id}/result`;
                          navigator.clipboard.writeText(resultUrl);
                          alert("คัดลอกลิงก์ผลลัพธ์เรียบร้อยค้าบ!");
                        }}
                        className="text-sm text-blue-600 hover:underline"
                      >
                        📎 คัดลอกผลลัพธ์
                      </button>
                    </div>
                  )}

                  <button
                    onClick={async () => {
                      if (room.hasSubmitted && !room.watch) {
                        await markRoomAsWatched(room.id ?? "");
                      }
                      router.push(`/cardtel-live/admin/${room.id}`);
                    }}
                    className="text-sm font-semibold text-blue-600 hover:text-blue-700"
                  >
                    ➤ View Responses
                  </button>
                </div>

              </div>
            );
          })}
        </div>
      </div>

      {filteredRooms.length > visibleCount && (
        <div className="flex justify-center mt-6">
          <button
            onClick={() => setVisibleCount((prev) => prev + 10)}
            className="px-4 py-2 bg-gray-200 hover:bg-gray-300 text-gray-800 text-sm rounded"
          >
            🔄 แสดงห้องเพิ่มเติม
          </button>
        </div>
      )}
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
                <label
                  key={book.id}
                  className="flex items-center gap-2 text-sm"
                >
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
                className={`px-4 py-2 rounded text-white ${selectedBooks.length > 0
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
