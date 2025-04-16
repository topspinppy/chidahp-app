import { initializeApp, getApps } from "firebase/app";
import { getAuth, signOut } from "firebase/auth";
import { addDoc, arrayUnion, collection, doc, getDoc, getDocs, getFirestore, updateDoc } from "firebase/firestore";

export interface Card {
  id: string;
  title: string;
}

export interface CardtelRoom {
  id?: string;
  slug: string;
  title: string;
  cardChoose: Card[];
  message: string;
  hasSubmitted: boolean;
  watch?: boolean;
  createdAt: Date | string;
  bookAssigned: string[] // ⬅ เปลี่ยนจาก string เดี่ยว
};

const firebaseConfig = {
  apiKey: "AIzaSyDbpX939m0_2OHvaIoYAf9RnB3Rrg7RATk",
  authDomain: "cardtel-chidahp.firebaseapp.com",
  projectId: "cardtel-chidahp",
  storageBucket: "cardtel-chidahp.firebasestorage.app",
  messagingSenderId: "916463426545",
  appId: "1:916463426545:web:5e44f4dd0a72974a5a8250",
  measurementId: "G-82T8GRKPZV"
};


const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const auth = getAuth(app);
export const db = getFirestore(app);


export const handleLogout = async () => {
  await signOut(auth)
}


export async function getAllCardtel(): Promise<Card[]> {
  const snapshot = await getDocs(collection(db, "cardtel"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    title: doc.data().title,
  })) as Card[];
}

export async function getAllCardtelRooms(): Promise<CardtelRoom[]> {
  const snapshot = await getDocs(collection(db, "cardtel-room"));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as CardtelRoom[];
}

export async function createCardtelRoom(room: CardtelRoom) {
  await addDoc(collection(db, "cardtel-room"), room);
}


export async function saveCardtel(slug: string, cards: Card[], message: string) {
  try {
    const roomRef = doc(db, "cardtel-room", slug);

    // 👉 push การ์ดทั้งหมดเข้า array ทีเดียว
    const cardUpdates = cards.map((card) => ({
      id: card.id,
      title: card.title,
    }));

    await updateDoc(roomRef, {
      cardChoose: arrayUnion(...cardUpdates), // 🌀 spread เพื่อ push หลายใบพร้อมกัน
      message: message.trim(),               // 💬 ใส่ข้อความแยก
      hasSubmitted: true                     // ✅ status ว่าส่งแล้ว
    });

    console.log(`✅ บันทึกสำเร็จเข้า room "${slug}" เรียบร้อยค้าบ`);
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการบันทึก:", error);
  }
}

export async function updateCardtelRoom(roomId: string, updates: Partial<CardtelRoom>) {
  const roomRef = doc(db, "cardtel-room", roomId);
  await updateDoc(roomRef, updates);
}

export async function markRoomAsWatched(roomId: string) {
  try {
    const roomRef = doc(db, "cardtel-room", roomId);
    await updateDoc(roomRef, {
      watch: true,
    });
  } catch (error) {
    console.error("❌ เกิดข้อผิดพลาดในการ mark watch:", error);
  }
}

export async function checkCardtelRoomExists(slug: string): Promise<boolean> {
  try {
    const roomRef = doc(db, "cardtel-room", slug);
    const docSnap = await getDoc(roomRef);

    if (!docSnap.exists()) {
      console.log("❌ ไม่มี slug นี้ในระบบ");
      return false;
    }

    const data = docSnap.data();

    if (data.hasSubmitted === true) {
      console.log("⚠️ slug นี้ถูกใช้งานไปแล้ว (hasSubmitted: true)");
      return false;
    }

    console.log("✅ slug นี้ยังใช้งานได้!");
    return true;
  } catch (error) {
    console.error("❌ ตรวจสอบ slug ผิดพลาด:", error);
    return false;
  }
}


export async function getAllBooks() {
  const snapshot = await getDocs(collection(db, "books"));
  return snapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data(),
  })) as { id: string; title: string }[];
}

export async function assignBookToRoom(roomId: string, bookIds: string[]) {
  const ref = doc(db, "cardtel-room", roomId); // 🔥 FIXED COLLECTION NAME
  await updateDoc(ref, {
    bookAssigned: bookIds, // ✅ Overwrite เดิมไปเลย
  });
}
