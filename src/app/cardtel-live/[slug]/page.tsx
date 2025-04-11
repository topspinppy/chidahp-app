/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  DropResult,
} from "@hello-pangea/dnd";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import {
  saveCardtel,
  getAllCardtel,
  Card,
  checkCardtelRoomExists,
} from "../firebase";



export default function CardtelUserPage() {
  const params = useParams();
  const roomId = params?.slug as string;
  const router = useRouter();

  const [availableCards, setAvailableCards] = useState<Card[]>([]);
  const [selectedCards, setSelectedCards] = useState<Card[]>([]);
  const [message, setMessage] = useState("");
  const [isSending, setIsSending] = useState(false);
  const [isSent, setIsSent] = useState(false);
  const [isValidating, setIsValidating] = useState(true);
  const [, setIsValidRoom] = useState(false);

  useEffect(() => {
    const validateAndFetch = async () => {
      if (!roomId) return;

      const exists = await checkCardtelRoomExists(roomId);
      if (!exists) {
        router.replace("/404");
        return;
      }

      setIsValidRoom(true);
      const cards = await getAllCardtel();
      setAvailableCards(cards);
      setIsValidating(false);
    };

    validateAndFetch();
  }, [roomId, router]);

  console.log(availableCards);

  useEffect(() => {
    document.body.style.overflow = isSent ? "hidden" : "";
  }, [isSent]);

  const onDragEnd = (result: DropResult) => {
    if (isSent) return;
    const { source, destination } = result;
    if (!destination) return;

    const from = source.droppableId;
    const to = destination.droppableId;

    if (from === "available" && to === "selected") {
      const dragged = availableCards[source.index];
      setAvailableCards((prev) => prev.filter((_, i) => i !== source.index));
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      setSelectedCards((prev: any) => [...prev, dragged]);
    }

    if (from === "selected" && to === "available") {
      const dragged = selectedCards[source.index];
      setSelectedCards((prev) => prev.filter((_, i) => i !== source.index));
      setAvailableCards((prev) => [...prev, dragged]);
    }

    if (from === "selected" && to === "selected") {
      const copied = [...selectedCards];
      const [moved] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, moved);
      setSelectedCards(copied);
    }

    if (from === "available" && to === "available") {
      const copied = [...availableCards];
      const [moved] = copied.splice(source.index, 1);
      copied.splice(destination.index, 0, moved);
      setAvailableCards(copied);
    }
  };

  const handleSendCard = async () => {
    if (message.trim() === "") return;
    setIsSending(true);
    await saveCardtel(roomId, selectedCards, message);
    setSelectedCards([]);
    setMessage("");
    setIsSending(false);
    setIsSent(true);
  };

  if (isValidating) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-600 text-lg">
        🧙‍♂️ กำลังเปิดไพ่ รอสักครู่ค้าบโผ้ม...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f5f5ff] py-10 px-6 font-sans relative">
      <h1 className="text-4xl md:text-5xl font-black text-center mb-8 text-violet-700 tracking-tight drop-shadow-sm">
        <span className="inline-block animate-pulse"></span>
        <span className="bg-gradient-to-r from-violet-700 via-pink-500 to-yellow-400 bg-clip-text text-transparent">
          Cardtel
        </span>
        <span className="text-violet-800">: เลือกการ์ดที่ตรงกับใจคุณ</span>
      </h1>

      <DragDropContext onDragEnd={onDragEnd}>
        <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto">
          {/* AVAILABLE ZONE */}
          <Droppable droppableId="available">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 bg-white p-6 rounded-3xl shadow-xl border border-violet-200 min-h-[240px]"
              >
                <h2 className="font-bold mb-4 text-violet-700 text-xl">
                  🧾 การ์ดทั้งหมด
                </h2>
                <div className="flex flex-wrap gap-4 items-start">
                  {availableCards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                      isDragDisabled={isSent}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="w-[180px] aspect-square flex items-center justify-center text-center 
                                   bg-gradient-to-br from-white to-violet-100 text-violet-800 text-sm font-bold 
                                   rounded-2xl shadow-lg border border-violet-100 ring-1 ring-violet-200
                                   hover:scale-105 hover:shadow-xl hover:ring-2 hover:ring-violet-400
                                   transition-all duration-200 ease-in-out cursor-pointer 
                                   bg-[url('/Cardtel.png')] bg-contain bg-no-repeat bg-center px-3"
                        >
                          <span className="break-words leading-snug max-w-[90%]">
                            {card.title}
                          </span>
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>
              </div>
            )}
          </Droppable>

          {/* SELECTED ZONE */}
          <Droppable droppableId="selected">
            {(provided) => (
              <div
                ref={provided.innerRef}
                {...provided.droppableProps}
                className="flex-1 bg-[#fffde9] border border-yellow-300 p-8 rounded-3xl shadow-inner min-h-[300px] relative"
              >
                <h2 className="text-2xl font-bold text-yellow-700 mb-6 flex items-center gap-2">
                  ✅ การ์ดที่คุณเลือกแล้ว
                </h2>

                <div className="flex flex-col items-center gap-3 mb-6">
                  {selectedCards.map((card, index) => (
                    <Draggable
                      key={card.id}
                      draggableId={card.id}
                      index={index}
                      isDragDisabled={isSent}
                    >
                      {(provided) => (
                        <div
                          ref={provided.innerRef}
                          {...provided.draggableProps}
                          {...provided.dragHandleProps}
                          className="w-full max-w-xs text-center px-5 py-3 bg-gradient-to-br from-green-100 to-green-200 
                           text-green-900 text-base font-semibold rounded-2xl shadow ring-1 ring-green-300
                           cursor-pointer hover:ring-2 hover:ring-green-500 transition"
                        >
                          {card.title}
                        </div>
                      )}
                    </Draggable>
                  ))}
                  {provided.placeholder}
                </div>

                {selectedCards.length > 0 && (
                  <div className="flex flex-col items-center gap-4">
                    <textarea
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      rows={3}
                      placeholder="💬 ฝากข้อความถึงชี้ดาบ..."
                      className="w-full max-w-md px-4 py-3 text-sm text-gray-800 bg-white border border-violet-200 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-violet-400"
                    />

                    <button
                      onClick={handleSendCard}
                      disabled={isSending || isSent || message.trim() === ""}
                      className={`w-full max-w-xs text-white font-semibold px-5 py-2 rounded-full shadow transition
              ${
                isSending || isSent || message.trim() === ""
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-violet-600 hover:bg-violet-700"
              }`}
                    >
                      {isSent ? "📮 ส่งแล้วเรียบร้อย" : "💌 ส่งการ์ดให้ชี้ดาบ"}
                    </button>
                  </div>
                )}
              </div>
            )}
          </Droppable>
        </div>
      </DragDropContext>

      {/* OVERLAY */}
      <AnimatePresence>
        {isSent && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-white/70 backdrop-blur-sm flex items-center justify-center"
          >
            <motion.div
              initial={{ y: 30, opacity: 0, scale: 0.95 }}
              animate={{ y: 0, opacity: 1, scale: 1 }}
              transition={{ type: "spring", stiffness: 260, damping: 20 }}
              className="bg-white shadow-2xl rounded-2xl p-6 text-center max-w-sm mx-auto"
            >
              <h2 className="text-2xl font-bold text-violet-700 mb-3">
                💌 ส่งการ์ดเรียบร้อยแล้ว!
              </h2>
              <p className="text-gray-700 text-sm leading-relaxed">
                ขอบคุณที่เลือกการ์ดของคุณนะค้าบ
                <br />
                📺 ติดตามคำทำนายจาก{" "}
                <span className="font-semibold">Live ของชี้ดาบ</span>
                <br />
                ได้เลยค้าบโผ้ม!
              </p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
