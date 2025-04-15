"use client";

import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import {
  doc,
  onSnapshot,
  collection,
} from "firebase/firestore";
import { db } from "@/app/cardtel-live/firebase";

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
  shopeeUrl: string;
  '365Url': string;
  isPreOrder: boolean;
}

export default function CardtelResultPage() {
  const { slug: roomId } = useParams();
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showBooks, setShowBooks] = useState(false);

  useEffect(() => {
    if (!roomId) return;

    const unsubRoom = onSnapshot(doc(db, "cardtel-room", roomId as string), (docSnap) => {
      if (docSnap.exists()) {
        setRoomData(docSnap.data() as RoomData);
      }
    });

    const unsubBooks = onSnapshot(collection(db, "books"), (snap) => {
      const allBooks = snap.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Book[];
      setBooks(allBooks);
    });

    return () => {
      unsubRoom();
      unsubBooks();
    };
  }, [roomId]);

  useEffect(() => {
    if (roomData?.bookAssigned?.length && books.length > 0) {
      setCountdown(3);
      setShowBooks(false);

      const interval = setInterval(() => {
        setCountdown((prev) => {
          if (prev === 1) {
            clearInterval(interval);
            setShowBooks(true);
            return null;
          }
          return (prev ?? 0) - 1;
        });
      }, 1000);

      return () => clearInterval(interval);
    }
  }, [roomData?.bookAssigned, books]);

  const shareUrl = `${typeof window !== "undefined" ? window.location.origin : ""}/cardtel-live/${roomId}/result`;

  if (!roomData) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-500">
        📡 กำลังโหลดข้อมูลห้อง...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-3xl mx-auto font-sans">
      {/* HEAD */}
      <h1 className="text-4xl font-black text-center text-violet-800 mb-6 leading-snug">
        🎯 คำทำนายจากไพ่ พร้อมหนังสือที่ใช่สำหรับคุณ!
      </h1>

      {/* RESULT ZONE */}
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

      {/* SHARE ZONE */}
      <div className="mb-8">
        <h3 className="text-md font-semibold text-gray-800 mb-2">📤 แชร์ผลลัพธ์นี้ให้เพื่อนดู!</h3>
        <div className="flex flex-wrap gap-2">
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              alert("คัดลอกลิงก์เรียบร้อยค้าบ!");
            }}
            className="px-3 py-1 text-sm bg-violet-100 hover:bg-violet-200 text-violet-800 rounded-full transition"
          >
            📎 คัดลอกลิงก์
          </button>

          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-sm bg-blue-100 hover:bg-blue-200 text-blue-700 rounded-full transition"
          >
            🟦 แชร์ผ่าน Facebook
          </a>

          <a
            href={`https://social-plugins.line.me/lineit/share?url=${encodeURIComponent(shareUrl)}`}
            target="_blank"
            rel="noopener noreferrer"
            className="px-3 py-1 text-sm bg-green-100 hover:bg-green-200 text-green-700 rounded-full transition"
          >
            🟨 แชร์ผ่าน LINE
          </a>
        </div>
      </div>

      {/* BOOK RECOMMEND */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">
          📚 หนังสือที่ชี้ดาบจับคู่ให้คุณ
        </h2>

        <p className="text-sm text-yellow-700 mb-4">
          คลิกเพื่อสั่งซื้อได้ที่ Shopee หรือ Page365 ด้านล่างนี้เลยค้าบ!
        </p>

        {roomData.bookAssigned ? (
          roomData.bookAssigned.length > 0 ? (
            <>
              {!showBooks ? (
                <div className="text-center py-10 text-yellow-700 animate-pulse text-lg font-semibold">
                  {countdown !== null ? (
                    <>
                      ⏳ ชี้ดาบกำลังจับคู่หนังสือให้คุณ...
                      <br />
                      <span className="text-4xl mt-2 block">{countdown}</span>
                    </>
                  ) : (
                    <>✨ พร้อมจะซื้อหรือยัง... รอสักครู่ค้าบโผ้ม!</>
                  )}
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 gap-4 mt-4">
                  {books
                    .filter((book) => roomData.bookAssigned?.includes(book.id))
                    .map((book) => (
                      <div
                        key={book.id}
                        className="bg-white border border-yellow-200 rounded-xl p-4 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <h3 className="text-md font-bold text-yellow-800 mb-1">{book.title}</h3>

                        {book.isPreOrder && (
                          <span className="inline-block text-xs text-pink-600 bg-pink-100 px-2 py-1 rounded-full mb-2">
                            🚀 Pre-order ได้แล้ววันนี้!
                          </span>
                        )}

                        <div className="flex gap-2 mt-auto flex-wrap">
                          {book.shopeeUrl ? (
                            <a
                              href={book.shopeeUrl}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition"
                            >
                              🛒 Shopee
                            </a>
                          ) : (
                            <button
                              disabled
                              className="text-xs px-3 py-1 bg-gray-300 text-gray-600 rounded-full cursor-not-allowed"
                              title="ยังไม่มีลิงก์ Shopee"
                            >
                              🛒 Shopee
                            </button>
                          )}

                          {book["365Url"] ? (
                            <a
                              href={book["365Url"]}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
                            >
                              📦 Page365
                            </a>
                          ) : (
                            <button
                              disabled
                              className="text-xs px-3 py-1 bg-gray-300 text-gray-600 rounded-full cursor-not-allowed"
                              title="ยังไม่มีลิงก์ Page365"
                            >
                              📦 Page365
                            </button>
                          )}
                        </div>
                      </div>
                    ))}
                </div>
              )}
            </>
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
