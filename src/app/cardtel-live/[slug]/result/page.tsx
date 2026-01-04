"use client";

import { useParams } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import {
  doc,
  onSnapshot,
  collection,
  addDoc,
  Timestamp,
  updateDoc,
  getDoc,
} from "firebase/firestore";

import { db } from "@/app/cardtel-live/firebase";
import { motion, AnimatePresence } from "framer-motion";

// ดึง books เฉพาะที่ assign แล้ว เก็บ cache ใน localStorage
const fetchBooksAssigned = async (bookIds: string[], setBooks: (books: Book[]) => void) => {
  const cachedJson = localStorage.getItem("chidahp_books_cache");
  const cachedBooks = cachedJson ? JSON.parse(cachedJson) as Book[] : [];

  const fromCache = cachedBooks.filter((b) => bookIds.includes(b.id));
  setBooks(fromCache);

  try {
    const docRefs = bookIds.slice(0, 10).map((id) => doc(db, "books", id));
    const docsSnap = await Promise.all(docRefs.map(getDoc));
    const freshBooks = docsSnap
      .filter((snap) => snap.exists())
      .map((snap) => ({ id: snap.id, ...snap.data() } as Book));

    setBooks(freshBooks);

    const all = [...cachedBooks, ...freshBooks];
    const map = new Map<string, Book>();
    all.forEach((b) => map.set(b.id, b));
    const deduped = Array.from(map.values());
    localStorage.setItem("chidahp_books_cache", JSON.stringify(deduped));
  } catch (err) {
    console.error("❌ Error fetching assigned books", err);
  }
};

// 🧠 Card / Room / Book Types
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
  hasGivenFeedback: boolean;
}
interface Book {
  id: string;
  title: string;
  shopeeUrl: string;
  '365Url': string;
  isPreOrder: boolean;
}


// 💬 คำพูดกวนๆ จากชี้ดาบ
const chidahpQuotes = [
  "ชี้ดาบก็เคยเลือกไพ่แบบนี้เหมือนกันนะ!",
  "อย่าปล่อยให้โชคชะตาเป็นฝ่ายตัดสิน... เลือกหนังสือเถอะค้าบ!",
  "ความรู้สึกของคุณ มีค่ากับชี้ดาบเสมอ 🥹",
  "ดูเหมือนคุณจะเป็นคนชอบเรื่องราวลึกลับนะค้าบ",
  "บางทีโลกใบนี้อาจจะจับคู่เรา กับหนังสือบางเล่มไว้แล้วก็ได้นะ",
  "คุณมีพลังบางอย่างที่หนังสือจะเข้าใจ",
  "ถ้าใจมันเรียกร้อง ก็ต้องอ่านค้าบ!",
  "ความบังเอิญไม่เคยมีอยู่จริง โดยเฉพาะกับไพ่!",
  "หนังสือดี เหมือนคนดีๆ ที่ชี้ดาบเลือกให้",
  "ไพ่ที่คุณเลือก มันสะท้อนอะไรในใจลึกๆ แน่ๆ",
  "บางทีคุณแค่อยากหยุดพัก แล้วเปิดหนังสือ",
  "มีเรื่องเล่าอยู่ในใจคุณเสมอ และชี้ดาบก็รู้",
  "ไม่ต้องรีบไปไหนหรอก อ่านก่อนค้าบ",
  "คุณมีรสนิยมในการเลือกไพ่ที่เท่ไม่เบา",
  "เชื่อมั้ย? ไพ่ใบนี้เคยทำนายอนาคตได้ตรงเป๊ะ!",
  "ทุกไพ่คือบทสนทนากับตัวเองค้าบ",
  "บางครั้ง... ไพ่ก็อยากให้คุณรู้จักตัวเองมากขึ้น",
  "จงฟังเสียงหัวใจตัวเอง แล้วหยิบหนังสือซะ!",
  "ไม่รู้จะไปไหน... ก็ไปกับหนังสือที่ชี้ดาบแนะนำไง!",
  "คุณอาจจะเป็นคนที่ชี้ดาบตามหามานานก็ได้นะ",
  "ถ้าโลกนี้ไม่มีหนังสือ... เราจะอยู่ยังไงค้าบ",
  "ความบังเอิญไม่มีอยู่จริง คำตอบอยู่ในหน้าแรก",
  "คุณมี vibe นักสำรวจชัดๆ ไปอ่านเลยค้าบ!",
  "จงเชื่อในสิ่งที่ไพ่สะกิดใจ",
  "เปิดไพ่แล้วเหมือนกระจกสะท้อนใจ",
  "คุณคือคนที่เข้าใจไพ่มากที่สุดในจักรวาล!",
  "จะไพ่ จะหนังสือ หรือจะชี้ดาบ... ก็เท่หมดแหละ!",
  "หนังสือบางเล่มกำลังคิดถึงคุณอยู่ค้าบ",
  "คุณเลือกไพ่เหมือนคนเคยผ่านอะไรมาเยอะ",
  "ความเงียบในหน้าหนังสือ บางทีก็ดังกว่าคำพูด",
  "การ์ดไม่โกหก หนังสือก็เช่นกัน",
  "คุณน่าจะเขียนหนังสือของตัวเองได้เลยนะเนี่ย",
  "สัญญาณจากจักรวาล... ส่งตรงมาที่ชี้ดาบค้าบ!",
  "อ่านก่อน แล้วค่อยเชื่อ ไม่ต้องรีบค้าบ",
  "ไพ่ของคุณมีพลังพิเศษบางอย่างแน่นอน",
  "โลกต้องการความคิดของคุณผ่านหนังสือเล่มนี้",
  "ถึงคุณจะยังไม่พร้อม... หนังสือก็รอได้",
  "แววตาคุณบอกว่า อยากอ่านต่อ 😏",
  "ชี้ดาบว่า... คุณกำลังจะเจอแรงบันดาลใจใหญ่!",
  "เลือกไพ่แบบนี้ ต้องไม่ธรรมดาแน่นอนค้าบ",
  "คุณนี่มัน... นักอ่านสายมู!",
  "พลังไพ่ของคุณแรงจนชี้ดาบสะเทือนเลยค้าบ!",
  "อยากรู้อนาคต? อ่านซะก่อนค้าบ",
  "แค่เห็นชื่อไพ่ ชี้ดาบก็รู้ว่าคุณลึกซึ้ง",
  "ถ้าโลกนี้ไม่มีหนังสือ... คุณก็ต้องเขียนเองละค้าบ",
  "คุณไม่ใช่คนธรรมดา... ชี้ดาบสัมผัสได้",
  "แรงดึงดูดของไพ่กับหนังสือ มันไม่เคยโกหก",
  "ชี้ดาบชอบสไตล์การเลือกของคุณนะค้าบ",
  "คุณเป็นตัวละครหลักของจักรวาลนี้ค้าบ!",
  "อย่าปล่อยให้เรื่องราวนี้จบลงแค่หน้าเว็บ",
  "บันทึกวันนี้... อาจกลายเป็นตำนานพรุ่งนี้",
  "ความหมายของไพ่อยู่ที่คนอ่านค้าบ",
  "คุณกับหนังสือเล่มนี้... เหมือนเป็นพรหมลิขิต",
  "ถึงจะไม่ได้เชื่อไพ่ แต่ชี้ดาบเชื่อใจคุณค้าบ",
  "ขอให้ไพ่ใบนี้พาไปเจออะไรดีๆ นะค้าบ",
  "เราทุกคนมีเส้นทางของตัวเอง... ชี้ดาบก็เช่นกัน",
  "คุณนี่มัน... เจ้าชะตาสุดชิค",
  "การอ่านหนังสือ คือการเดินทางในที่เดิม แต่เห็นใหม่ทุกครั้ง",
  "บางทีคุณก็แค่อยากได้ใครสักคน... หรือหนังสือสักเล่ม",
  "ไพ่ของคุณให้ vibe แบบนักคิดเลยค้าบ",
  "มีอะไรบางอย่างที่หนังสืออยากบอกคุณ",
  "คุณมาถูกทางแล้ว... ทางแห่งตัวตน",
  "ไม่ต้องรีบร้อน ทุกอย่างจะเข้าที่",
  "ไพ่บอกว่า คุณเป็นคนพิเศษ (จริงๆ นะ)",
  "แสงจากไพ่สะท้อนใจของคุณออกมาเลยค้าบ",
  "พลังบางอย่างกำลังเปลี่ยนแปลงคุณอยู่",
  "คุณเป็นเหมือนแสงในวันฝนตกค้าบ",
  "ใครๆ ก็มีเรื่องที่อยากเล่า คุณก็เช่นกัน",
  "คุณมีพลังที่จะเปลี่ยนโลกนี้ด้วยความคิด",
  "จงเชื่อในเส้นทางของตัวเอง",
  "อย่ากลัวที่จะลองเล่มใหม่",
  "หนังสือก็เหมือนเพื่อนดีๆ ที่ไม่ตัดสินคุณ",
  "แค่เปิดใจ โลกก็เปิดกว้าง",
  "ไพ่ของคุณเหมือนอ้อมกอดในวันหนาว",
  "อย่าให้ความกลัวมาขวางทางการอ่าน!",
  "การเลือกของคุณ = ความกล้าครั้งหนึ่ง",
  "แม้แต่เงียบๆ อย่างคุณ... ไพ่ก็ยังได้ยิน",
  "นี่แหละ คือจังหวะของจักรวาล",
  "บางครั้งการอยู่เฉยๆ ก็เป็นการเดินทางที่ลึกที่สุด",
  "คุณเป็นเหมือนความเงียบที่พูดได้",
  "สิ่งดีๆ กำลังเริ่มต้นจากตรงนี้แหละค้าบ",
  "คุณมีเสน่ห์แบบ... เข้าใจยาก แต่น่าค้นหา",
  "อย่าหยุดค้นหา เพราะชี้ดาบก็ยังไม่หยุด",
  "หนังสือไม่ได้เปลี่ยนคุณ แต่คุณต่างหากเปลี่ยนทุกหน้า",
  "ขอบคุณที่มาเล่นกับชี้ดาบค้าบ!",
  "คุณกับหนังสือเล่มนี้เหมือนโดนคัดเลือก",
  "ดูจากชื่อไพ่แล้ว... คุณน่าจะเป็นสายลุย!",
  "การ์ดไม่หลอกใคร โดยเฉพาะคุณ",
  "โลกนี้หมุนเพราะคนชอบอ่านแบบคุณ",
  "คุณคือแรงบันดาลใจให้ใครอีกหลายคนแน่ๆ",
  "ความกล้าที่จะเลือก คือพลังที่แท้จริง",
  "ถ้าไพ่พูดได้ มันคงบอกว่า 'ยินดีที่ได้รู้จัก'",
  "จงเดินไปกับเรื่องราวที่คุณเลือก",
  "คุณมีดวงนักเล่าเรื่องแน่ๆ ค้าบ",
  "เรื่องราวที่ดี เริ่มต้นจากคนที่กล้าเลือก",
  "บางทีคุณอาจเขียนจดหมายถึงตัวเองอยู่ก็ได้นะ",
  "ขอให้ไพ่นี้พาคุณไปเจอความเข้าใจใหม่ๆ",
  "ชี้ดาบเห็นแววคุณตั้งแต่เลือกใบแรก",
  "คุณนี่มัน... คู่หูของจักรวาล"
];

function getRandomQuote(quotes: string[], exclude: string | null): string {
  const filtered = exclude ? quotes.filter(q => q !== exclude) : quotes;
  return filtered[Math.floor(Math.random() * filtered.length)];
}

export default function CardtelResultPage() {
  const { slug: roomId } = useParams();
  const [roomData, setRoomData] = useState<RoomData | null>(null);
  const [books, setBooks] = useState<Book[]>([]);
  const [countdown, setCountdown] = useState<number | null>(null);
  const [showBooks, setShowBooks] = useState(false);
  const [quote, setQuote] = useState<string | null>(null);
  const [userFeedback, setUserFeedback] = useState("");
  const [anonymousName, setAnonymousName] = useState("");
  const [isPublic, setIsPublic] = useState(true);
  const [hasAgreedToPrivacy, setHasAgreedToPrivacy] = useState(false);
  const [userAgentInfo, setUserAgentInfo] = useState("");
  const [userLocation, setUserLocation] = useState<{ city: string; country: string } | null>(null);
  const [initialBookAssignedShown, setInitialBookAssignedShown] = useState(false);
  const [firstLoad, setFirstLoad] = useState(true);
  const previousBooksRef = useRef<string[] | undefined>(undefined);

  useEffect(() => {
    setUserAgentInfo(navigator.userAgent);
    setQuote(getRandomQuote(chidahpQuotes, null));

    fetch("https://ipapi.co/json")
      .then(res => res.json())
      .then(data => setUserLocation({ city: data.city, country: data.country_name }))
      .catch(console.error);
  }, []);

  useEffect(() => {
    if (!roomId) return;
  
    const unsubRoom = onSnapshot(doc(db, "cardtel-room", roomId as string), (docSnap) => {
      if (!docSnap.exists()) return;
  
      const newData = docSnap.data() as RoomData;
      const newBooks = newData.bookAssigned;
      const hadBooksBefore = previousBooksRef.current?.length ?? 0 > 0;
      const nowHasBooks = newBooks?.length ?? 0 > 0;
  
      const isNewAssignment =
        hadBooksBefore &&
        nowHasBooks &&
        JSON.stringify(previousBooksRef.current) !== JSON.stringify(newBooks);
  
      const isInitialAssign =
        !previousBooksRef.current?.length &&
        nowHasBooks;
  
      const isFirstLoadWithBooks = firstLoad && nowHasBooks && !initialBookAssignedShown;
  
      setRoomData(newData);
      previousBooksRef.current = newBooks;
  
      // ✅ A: โหลดครั้งแรกมีหนังสือ → โชว์ทันที
      if (isFirstLoadWithBooks) {
        setShowBooks(true);
        setInitialBookAssignedShown(true);
        console.log("newBooks", newBooks);
        fetchBooksAssigned(newBooks!, (book) => {
          console.log("book", book);
          setBooks(book);
        }); // <— ตรงนี้!
      }
  
      // ✅ C & ✅ D: Assign ครั้งแรก หรือ assign ใหม่ → แสดง countdown
      if ((isInitialAssign || isNewAssignment) && !isFirstLoadWithBooks) {
        setCountdown(3);
        setShowBooks(false);
        fetchBooksAssigned(newBooks!, (book) => {
          console.log("book", book);
          setBooks(book);
        }); // <— ตรงนี้ด้วย!
  
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
  
      // ✅ B: โหลดครั้งแรก แต่ยังไม่มีหนังสือ → ยังไม่โชว์
      setFirstLoad(false);
    });
  
    return () => unsubRoom();
  }, [roomId, firstLoad, initialBookAssignedShown]);
  
  



  const handleSendFeedback = async () => {
    if (!userFeedback.trim()) {
      alert("📝 เขียนอะไรสักนิดก่อนส่งนะค้าบ~");
      return;
    }

    try {
      await addDoc(collection(db, "cardtel-feedbacks"), {
        roomId,
        bookAssigned: roomData?.bookAssigned || [],
        cardChosen: roomData?.cardChoose.map((c) => c.title) || [],
        messageFromUser: userFeedback,
        anonymousName: anonymousName || "ผู้ใช้ไม่เปิดเผยชื่อ",
        isPublic,
        timestamp: Timestamp.now(),
        userAgent: userAgentInfo,
        location: userLocation,
      });

      await updateDoc(doc(db, "cardtel-room", roomId as string), {
        hasGivenFeedback: true,
      });

      alert("🎉 ส่งข้อความเรียบร้อย ขอบคุณค้าบ!");
      setUserFeedback("");
      setAnonymousName("");
      setIsPublic(true);
    } catch (err) {
      console.error("Error sending feedback", err);
      alert("❌ เกิดข้อผิดพลาดในการส่ง ลองอีกครั้งนะค้าบ");
    }
  };

  if (!roomData) {
    return <div className="min-h-screen flex items-center justify-center text-gray-500">📡 กำลังโหลดข้อมูลห้อง...</div>;
  }

  console.log("books", books);
  return (
    <div className="min-h-screen bg-white px-6 py-10 max-w-3xl mx-auto font-sans">
      <h1 className="text-4xl font-black text-center text-violet-800 mb-6 leading-snug">
        🎯 ผลลัพธ์การเลือกไพ่ของคุณ!
      </h1>

      {/* Result */}
      <div className="bg-violet-50 border border-violet-200 rounded-xl p-5 mb-6 shadow-sm">
        <h2 className="text-xl font-semibold text-violet-800 mb-2">
          🏷 ชื่อห้อง: {roomData.title || "(ไม่มีชื่อห้อง)"}
        </h2>
        <p className="font-semibold text-gray-700 mb-1">🧾 ไพ่ที่คุณเลือก:</p>
        <ul className="list-disc list-inside text-gray-800 space-y-2 mb-4">
          {roomData.cardChoose.map((card, index) => (
            <motion.li
              key={card.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: index * 0.2 }}
            >
              {card.title}
            </motion.li>
          ))}
        </ul>

        <div className="text-center text-sm text-gray-500 italic">📜 {quote}</div>

        <p className="font-semibold text-gray-700 mt-4 mb-1">💬 ข้อความที่คุณฝากไว้:</p>
        <div className="bg-white rounded p-3 border border-gray-200 text-gray-700">
          {roomData.message || "—"}
        </div>
      </div>

      {/* Books */}
      <div className="bg-yellow-50 border border-yellow-300 rounded-xl p-5 shadow">
        <h2 className="text-xl font-semibold text-yellow-800 mb-3">
          📚 หนังสือที่ชี้ดาบจับคู่ให้คุณ
        </h2>
        <p className="text-sm text-yellow-700 mb-4">
          คลิกเพื่อสั่งซื้อได้ที่ Shopee หรือ Page365 ด้านล่างนี้เลยค้าบ!
        </p>
        <AnimatePresence mode="wait">
          {!showBooks ? (
            <motion.div
              key="transition"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="text-center py-10 text-yellow-700 text-lg font-semibold"
            >
              {
                roomData.bookAssigned?.length === 0
                  ? "ยังไม่มีหนังสือที่ชี้ดาบจับคู่ให้คุณ...รอแป๊ปน้า"
                  : "การ์ดกำลังแปรสภาพเป็นหนังสือ..."
              }
              {countdown !== null && (
                <>
                  <div className="text-5xl mt-3 font-bold animate-pulse">{countdown}</div>
                  <div className="mt-6 w-full bg-yellow-100 rounded-full h-3 max-w-sm mx-auto overflow-hidden">
                    <div
                      className="h-full bg-yellow-500 transition-all duration-1000 ease-linear"
                      style={{ width: `${((countdown ?? 3) / 3) * 100}%` }}
                    />
                  </div>
                </>
              )}
            </motion.div>
          ) : (
            <motion.div
              key="book-reveal"
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.8 }}
              className="grid sm:grid-cols-2 gap-4 mt-4"
            >
              {books
                .filter((book) => roomData.bookAssigned?.includes(book.id))
                .map((book) => (
                  <div key={book.id} className="bg-white border p-4 rounded-xl shadow-sm">
                    <h3 className="text-md font-bold text-yellow-800 mb-1">{book.title}</h3>
                    {book.isPreOrder && (
                      <span className="text-xs bg-pink-100 text-pink-600 rounded-full px-2 py-1 inline-block mb-2">
                        🚀 Pre-order ได้แล้ว!
                      </span>
                    )}
                    <div className="flex gap-2 mt-auto flex-wrap">
                      {book.shopeeUrl ? (
                        <a href={book.shopeeUrl} target="_blank" rel="noreferrer"
                          className="text-xs px-3 py-1 bg-orange-500 text-white rounded-full hover:bg-orange-600 transition">
                          🛒 Shopee
                        </a>
                      ) : (
                        <button disabled className="text-xs px-3 py-1 bg-gray-300 text-gray-600 rounded-full">
                          🛒 Shopee
                        </button>
                      )}
                      {book["365Url"] ? (
                        <a href={book["365Url"]} target="_blank" rel="noreferrer"
                          className="text-xs px-3 py-1 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition">
                          📦 Page365
                        </a>
                      ) : (
                        <button disabled className="text-xs px-3 py-1 bg-gray-300 text-gray-600 rounded-full">
                          📦 Page365
                        </button>
                      )}
                    </div>
                  </div>
                ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Feedback */}
      {!roomData.hasGivenFeedback ? (
        <div className="mt-10 bg-violet-50 border border-violet-200 rounded-xl p-5 shadow-sm">
          <h3 className="text-lg font-semibold text-violet-800 mb-2">
            ✍️ ความรู้สึกของคุณหลังได้หนังสือ
          </h3>
          <textarea
            placeholder="รู้สึกยังไงก็เขียนมาเลยค้าบ!"
            rows={3}
            className="w-full p-3 border rounded mb-3 text-sm"
            value={userFeedback}
            onChange={(e) => setUserFeedback(e.target.value)}
          />
          <input
            type="text"
            placeholder="ชื่อเล่น (ไม่ใส่ก็ได้)"
            className="w-full p-2 border rounded mb-3 text-sm"
            value={anonymousName}
            onChange={(e) => setAnonymousName(e.target.value)}
          />
          <label className="flex items-start gap-2 text-sm text-gray-700 mb-4">
            <input
              type="checkbox"
              checked={hasAgreedToPrivacy}
              onChange={(e) => setHasAgreedToPrivacy(e.target.checked)}
              className="accent-violet-600 mt-1"
            />
            <span>
              ยินยอมให้ใช้ข้อมูลแบบไม่ระบุตัวตน —{" "}
              <a href="/cardtel-live/privacy-policy" className="underline text-violet-700" target="_blank">
                อ่านนโยบายความเป็นส่วนตัว
              </a>
            </span>
          </label>
          <button
            onClick={handleSendFeedback}
            disabled={!hasAgreedToPrivacy}
            className={`px-4 py-2 text-sm rounded-md transition ${hasAgreedToPrivacy
                ? "bg-violet-700 text-white hover:bg-violet-800"
                : "bg-gray-300 text-gray-500 cursor-not-allowed"
              }`}
          >
            📩 ส่งความรู้สึก
          </button>
        </div>
      ) : (
        <div className="mt-10 bg-green-50 border border-green-200 rounded-xl p-5 text-green-700 text-sm">
          ✅ คุณได้ส่งความรู้สึกเรียบร้อยแล้ว ขอบคุณค้าบโผ้ม!
        </div>
      )}

    </div>
  );
}