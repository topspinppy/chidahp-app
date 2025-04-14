"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  collection,
  getDocs,
} from "firebase/firestore";
import { db } from "@/app/cardtel-live/firebase"; // 🔥 แก้ path ตามของคุณ

interface Card {
  id: string;
  title: string;
}

interface RoomData {
  title: string;
  cardChoose: Card[];
  message: string;
  hasSubmitted: boolean;
  bookAssigned?: string[];
}

interface Book {
  id: string;
  title: string;
}

export default function CardtelResultPage() {
  const { slug: roomId } = useParams();
  console.log(roomId);
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    if (!roomId) return;

    // Listen to realtime update
    const unsub = onSnapshot(doc(db, "cardtel-room", roomId as string), (docSnap) => {
      if (docSnap.exists()) {
        setRoomData(docSnap.data() as RoomData);
      }
    });

    // Load books
    const fetchBooks = async () => {
      const snap = await getDocs(collection(db, "books"));
      const allBooks = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(allBooks);
    };
    fetchBooks();

    return () => unsub();
  }, [roomId]);

  if (!roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        📡 กำลังโหลดข้อมูลห้อง...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-3xl mx-auto font-sans">
      <h1 className="text-3xl font-bold text-violet-700 mb-6 text-center">
        🎴 ผลลัพธ์ จากการเลือกหนังสือของชี้ดาบ
      </h1>

      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-violet-800 mb-2">
          🏷 ชื่อห้อง: {roomData.title || "(ไม่มีชื่อห้อง)"}
        </h2>

        <div className="mb-4">
          <p className="font-semibold text-gray-700 mb-1">🧾 ไพ่ที่คุณเลือก:</p>
          <ul className="list-disc list-inside text-gray-800 space-y-1">
            {roomData.cardChoose.map((card) => (
              <li key={card.id}>{card.title}</li>
            ))}
          </ul>
        </div>

        <div>
          <p className="font-semibold text-gray-700 mb-1">💬 ข้อความที่คุณฝากไว้:</p>
          <div className="bg-white rounded p-3 border border-gray-200 text-gray-700">
            {roomData.message || "—"}
          </div>
        </div>
      </div>

      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">
          📚 หนังสือที่แนะนำโดยชี้ดาบ
        </h2>

        {roomData.bookAssigned ? (
          roomData.bookAssigned.length > 0 ? (
            <ul className="list-disc list-inside text-gray-800 space-y-1">
              {books.length === 0 ? (
                // 🔄 Loading books
                Array(2).fill(null).map((_, idx) => (
                  <li key={idx}>
                    <div className="h-4 w-40 bg-gray-200 rounded animate-pulse" />
                  </li>
                ))
              ) : (
                books
                  .filter((book) => roomData.bookAssigned?.includes(book.id))
                  .map((book) => (
                    <li key={book.id} className="font-medium">
                      {book.title}
                    </li>
                  ))
              )}
            </ul>
          ) : (
            <p className="text-sm text-gray-500 italic">
              ยังไม่มีการแนะนำหนังสือจากชี้ดาบ ณ ตอนนี้ค้าบ...
            </p>
          )
        ) : (
          <div className="space-y-2">
            <div className="h-4 w-40 bg-yellow-200 rounded animate-pulse" />
            <div className="h-4 w-32 bg-yellow-100 rounded animate-pulse" />
          </div>
        )}

      </div>
    </div>
  );
}
