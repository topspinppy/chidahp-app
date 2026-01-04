/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useRef, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import MoodLoading from "../components/MoodLoading";
import Image from "next/image";
import * as htmlToImage from "html-to-image"; // ด้านบนสุด

const MoodPage = () => {
  const [mood, setMood] = useState<any>(null);
  const [book, setBook] = useState<any>(null);
  const [copied, setCopied] = useState(false);
  const [loading, setLoading] = useState(true);
  const [showIntroQuote, setShowIntroQuote] = useState(true);
  const [matchedSubs, setMatchedSubs] = useState<string[]>([]);
  const [typedQuote, setTypedQuote] = useState("");
  const [showShareModal, setShowShareModal] = useState(false);
  const [capturedImage, setCapturedImage] = useState<string | null>(null);
  const [typedLineTwo, setTypedLineTwo] = useState("");
  const storyCaptureRef = useRef<HTMLDivElement>(null);

  const router = useRouter();
  const params = useParams();
  const slug = params.slug;

  useEffect(() => {
    if (slug) fetchMood();
  }, [slug]);

  const fetchMood = async () => {
    try {
      setLoading(true);
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moods`,
        { cache: "no-store" }
      );
      if (!res.ok) throw new Error("Failed to fetch moods");

      const moods = await res.json();
      const moodData = moods.find(
        (m: any) => m.mood === decodeURIComponent(slug as string)
      );
      if (!moodData) return router.push("/404");

      const stored = sessionStorage.getItem("subfeelings");
      if (!stored) return router.push("/mood/pre-question");

      let parsedSubs: string[] = [];
      try {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed)) parsedSubs = parsed;
      } catch {
        return router.push("/mood/pre-question");
      }

      const scoredBooks = moodData.books
        .map((b: any) => {
          const matched =
            b.matchSubfeelings?.filter((s: string) => parsedSubs.includes(s)) ||
            [];
          return { ...b, matchCount: matched.length, matchedSubs: matched };
        })
        .filter((b: any) => b.matchCount > 0)
        .sort((a: { matchCount: number; }, b: { matchCount: number; }) => b.matchCount - a.matchCount);

      const bestBook =
        scoredBooks[0] ||
        moodData.books[Math.floor(Math.random() * moodData.books.length)];
      setMood(moodData);
      setBook(bestBook);
      setMatchedSubs(bestBook.matchedSubs || []);
      setLoading(false);
    } catch (err) {
      console.error("Error fetching mood:", err);
      setLoading(false);
    }
  };

  useEffect(() => {
    if (!loading && mood?.quote && mood?.quoteLineTwo) {
      let quoteIndex = 0;
      let lineTwoIndex = 0;

      const quoteInterval = setInterval(() => {
        setTypedQuote(mood.quote.slice(0, quoteIndex + 1));
        quoteIndex++;
        if (quoteIndex >= mood.quote.length) {
          clearInterval(quoteInterval);
          setTimeout(() => {
            const lineTwoInterval = setInterval(() => {
              setTypedLineTwo(mood.quoteLineTwo.slice(0, lineTwoIndex + 1));
              lineTwoIndex++;
              if (lineTwoIndex >= mood.quoteLineTwo.length) {
                clearInterval(lineTwoInterval);
              }
            }, 30);
          }, 400);
        }
      }, 30);
    }
  }, [loading, mood]);

  useEffect(() => {
    if (!loading && mood && book) {
      const timer = setTimeout(() => {
        setShowIntroQuote(false);
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [loading, mood, book]);

  const shareUrl = `https://app.chidahp.com/mood/${mood?.mood}`;

  const handleCopy = () => {
    navigator.clipboard.writeText(shareUrl).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    });
  };

  const handleNativeShare = async () => {
    if (!navigator.share) return alert("เบราว์เซอร์ไม่รองรับการแชร์นี้");
    try {
      await navigator.share({
        title: `อารมณ์ "${mood.mood}"`,
        text: `เล่มนี้เหมาะกับฉันมาก! ลองดูเลย 👉`,
        url: shareUrl,
      });
    } catch (err) {
      console.log("แชร์ล้มเหลว", err);
    }
  };

  const handleCaptureStory = async () => {
    setShowShareModal(true);
    const el = storyCaptureRef.current;
    if (!el) return;

    el.style.opacity = "1";
    el.style.display = "flex";
    el.style.zIndex = "9999";
    el.style.pointerEvents = "auto";

    const imgs = el.querySelectorAll("img");
    await Promise.all(
      Array.from(imgs).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((resolve) => {
            img.onload = resolve;
            img.onerror = resolve;
          })
      )
    );

    try {
      const dataUrl = await htmlToImage.toPng(el, {
        cacheBust: true,
        backgroundColor: "#ffffff",
      });
      setCapturedImage(dataUrl);

      const link = document.createElement("a");
      link.href = dataUrl;
      link.download = `chidahp-story-${book.title}.png`;
      link.click();
    } catch (err) {
      console.error("แคปภาพไม่สำเร็จ:", err);
    }

    el.style.opacity = "0"; // 👈 ปิดแบบไม่มีแว้บ
    el.style.display = "none";
    el.style.zIndex = "-1";
    el.style.pointerEvents = "none";
  };


  if (loading || !mood || !book) return <MoodLoading />;

  if (showIntroQuote) {
    return (
      <div
        className={`min-h-screen flex items-center justify-center px-4 py-12 ${mood.gradient}`}
      >
        <motion.div
          className="max-w-xl text-center text-white"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1 }}
        >
          <h1 className="text-2xl md:text-4xl font-semibold mb-0 min-h-[2.5rem] leading-tight">
            {typedQuote || <span className="opacity-0">...</span>}
          </h1>
          <p className="text-base md:text-lg text-white text-opacity-80 min-h-[1.8rem] leading-snug">
            {typedLineTwo || <span className="opacity-0">...</span>}
          </p>
        </motion.div>
      </div>
    );
  }

  return (
    <div
      className={`min-h-screen flex items-center justify-center px-4 py-12 ${mood.gradient}`}
    >
      <AnimatePresence>
        <motion.div
          className="max-w-xl w-full text-center text-white"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <motion.div
            className="text-7xl"
            initial={{ y: -10, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.1, type: "spring", stiffness: 120 }}
          >
            {mood.emoji}
          </motion.div>

          <motion.h1 className="text-3xl md:text-5xl font-bold mt-4">
            {mood.mood}
          </motion.h1>
          <p className="mt-2 text-white text-opacity-80">
            เล่มนี้น่าจะพูดแทนใจคุณได้ดีที่สุด
          </p>

          {/* 🌈 กล่องโชว์จริง */}
          <motion.div
            key={book.title}
            className="bg-white text-black rounded-xl shadow-2xl p-6 mt-10 flex items-center flex-col max-w-md mx-auto"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.6 }}
          >
            {book.cover && (
              <Image
                src={book.cover}
                alt={book.title}
                width={300}
                height={400}
                className="rounded-lg shadow mb-6"
              />
            )}

            <h2 className="text-xl font-bold text-center mb-1">{book.title}</h2>
            <p className="text-sm text-gray-600 text-center">
              {book.description}
            </p>
            <p className="text-xs text-gray-400 mt-2">โดย {book.author}</p>

            {matchedSubs.length > 0 && (
              <div className="mt-4 text-xs text-gray-500 text-left w-full">
                <div className="mb-1 font-semibold">
                  📌 เพราะคุณรู้สึกว่า...
                </div>
                <ul className="list-disc list-inside">
                  {matchedSubs.map((s) => (
                    <li key={s}>{s}</li>
                  ))}
                </ul>
              </div>
            )}

            <a
              href={book.link}
              target="_blank"
              className="inline-block mt-5 text-sm bg-yellow-400 hover:bg-yellow-500 text-black px-4 py-2 rounded-full shadow hover:scale-105 transition-all"
            >
              📚 อ่านเล่มนี้เลย
            </a>

            <div className="text-[10px] text-gray-400 mt-5">
              📘 แนะนำโดย Chidahp – อารมณ์ {mood.mood}
            </div>
          </motion.div>

          {/* 🖼 สำหรับแคปภาพแชร์ (ยังไม่ทำการซ่อน) */}
          <div
            ref={storyCaptureRef}
            style={{
              opacity: 0,
              position: "absolute",
              width: "720px",
              height: "1280px",
              background: "linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)",
              padding: "80px",
              boxSizing: "border-box",
              fontFamily: "'Noto Sans Thai', sans-serif",
              color: "#000",
              display: "none",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "flex-start",
              // visibility: "hidden", // 👈 ซ่อนแบบที่ยังโหลดรูป
              // position: "fixed",
              top: "0",
              left: "0",
              pointerEvents: "none",
            }}
          >
            {/* 🪄 Header */}
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                width: "100%",
                alignItems: "center",
                marginBottom: "24px",
              }}
            >
              <div
                style={{
                  fontSize: "28px",
                  fontWeight: "600",
                  display: "flex",
                  alignItems: "center",
                  gap: "10px",
                }}
              >
                {mood.emoji} {mood.mood}
              </div>
              <img src="/logo/chidahp-logo.png" alt="logo" width={50} />
            </div>

            {/* 📚 Book Cover */}
            <img
              src={book.cover}
              alt={book.title}
              width="360"
              height="480"
              style={{
                borderRadius: "16px",
                boxShadow: "0 4px 16px rgba(0,0,0,0.1)",
                marginBottom: "24px",
              }}
            />

            {/* 📖 Book Info */}
            <h2
              style={{
                fontSize: "26px",
                fontWeight: "bold",
                textAlign: "center",
                marginBottom: "4px",
              }}
            >
              {book.title}
            </h2>
            <p style={{ fontSize: "16px", color: "#555", textAlign: "center" }}>
              {book.description}
            </p>
            <p
              style={{
                fontSize: "14px",
                color: "#888",
                marginTop: "4px",
                marginBottom: "20px",
              }}
            >
              โดย {book.author}
            </p>

            {/* 🧠 Feeling section */}
            {matchedSubs.length > 0 && (
              <div
                style={{
                  marginTop: "48px",
                  textAlign: "center",
                  maxWidth: "640px",
                  padding: "0 32px",
                }}
              >
                <div
                  style={{
                    fontSize: "32px", // ใหญ่ขึ้นชัดๆ
                    fontWeight: "700",
                    marginBottom: "24px",
                    color: "#111",
                  }}
                >
                  📌 เพราะคุณรู้สึกว่า...
                </div>

                <ul
                  style={{
                    listStyle: "none",
                    padding: 0,
                    margin: 0,
                    fontSize: "50px", // ข้อความความรู้สึกก็ใหญ่
                    lineHeight: "1.6",
                    color: "#222",
                  }}
                >
                  {matchedSubs.map((s) => (
                    <li key={s} style={{ marginBottom: "12px" }}>
                      “{s}”
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* 🏷️ Footer */}
            <div
              style={{
                fontSize: "16px",
                color: "#999",
                fontWeight: 500,
                marginTop: "auto",
                textAlign: "center",
              }}
            >
              #ชี้ดาบเลือกให้
            </div>
          </div>

          {/* 🧩 ปุ่ม */}
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={handleCaptureStory}
              className="bg-pink-300 hover:bg-pink-400 text-black px-4 py-2 rounded-full text-sm transition"
            >
              📷 แคปเป็นรูป Story IG
            </button>
            {/* <button
              onClick={() => router.push('/mood/choose-mood')}
              className="bg-white bg-opacity-20 hover:bg-opacity-30 text-black px-4 py-2 rounded-full text-sm transition"
            >
              🎲 เปลี่ยนใจ ขออีกเล่ม!
            </button> */}
            <button
              onClick={handleCopy}
              className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm hover:bg-opacity-30 transition"
            >
              🔗 คัดลอกลิงก์แชร์
            </button>
            <button
              onClick={handleNativeShare}
              className="bg-white text-black bg-opacity-20 px-4 py-2 rounded-full text-sm hover:bg-opacity-30 transition"
            >
              📤 แชร์ให้เพื่อน (มือถือ)
            </button>
          </div>

          {copied && (
            <motion.div
              className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-black text-white text-sm px-4 py-2 rounded-full shadow-lg"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
            >
              ✅ คัดลอกลิงก์แล้ว!
            </motion.div>
          )}

          {/* ✅ Modal Preview */}
          {showShareModal && capturedImage && (
            <div className="fixed inset-0 z-[10000] bg-black bg-opacity-60 flex items-center justify-center px-4">
              <div
                className="bg-white text-black rounded-xl p-5 w-full max-w-md text-center shadow-xl"
                style={{
                  maxHeight: "90vh",
                  overflowY: "auto",
                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <h2 className="text-lg font-semibold mb-4">
                  📸 ดาวน์โหลดภาพเรียบร้อยแล้ว!
                </h2>

                <div className="text-sm text-gray-700 space-y-4 mb-4 text-left">
                  <p>
                    <strong>📱 iOS:</strong> กดค้างที่ภาพด้านล่าง แล้วเลือก{" "}
                    <strong>{'บันทึกรูปภาพ'}</strong> เพื่อเก็บไว้ในเครื่อง
                  </p>

                  <p>
                    <strong>🤖 Android / คอมพิวเตอร์:</strong> ระบบจะดาวน์โหลดให้อัตโนมัติ หรือแตะภาพเพื่อบันทึกได้เช่นกัน
                  </p>

                  <p>
                    จากนั้นสามารถแชร์ภาพลง IG Story ได้เลย 💫<br />
                    อย่าลืมแท็ก <strong>@chidahp</strong> และใช้แฮชแท็ก{" "}
                    <strong>#ชี้ดาบแนะนำ</strong> ด้วยน้า 💛
                  </p>
                </div>

                <img
                  src={capturedImage}
                  alt="preview"
                  className="rounded-lg mb-5 shadow cursor-pointer max-w-full h-auto mx-auto"
                  onClick={() => {
                    const a = document.createElement("a");
                    a.href = capturedImage;
                    a.download = `chidahp-story-${book.title}.png`;
                    a.click();
                  }}
                />

                <button
                  onClick={() => setShowShareModal(false)}
                  className="bg-black text-white px-4 py-2 rounded-full text-sm self-center"
                >
                  ปิดหน้าต่าง
                </button>

                {/* ปุ่มแชร์ไป IG Story */}
                <button
                  onClick={() => {
                    if (navigator.userAgent.match(/(iPhone|iPod|Android|Windows Phone)/i)) {
                      window.location.href = "instagram://";
                    } else {
                      alert("กรุณาเปิด Instagram app บนมือถือเพื่อใช้งาน");
                    }
                  }}
                  className="bg-blue-400 hover:bg-blue-500 text-white px-4 py-2 rounded-full text-sm mt-4"
                >
                  🚀 กดเพื่อไปยัง IG Story
                </button>
              </div>
            </div>
          )}


        </motion.div>
      </AnimatePresence>
    </div>
  );
};

export default MoodPage;
