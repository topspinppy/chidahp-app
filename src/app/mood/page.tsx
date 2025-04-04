// app/cardtel/page.tsx (ถ้าใช้ App Router)
export const dynamic = 'force-dynamic'; // 👈 สำคัญ

import MoodDisplay from "./components/MoodDisplay";

// ใช้ fetch แทน axios
async function fetchMoods() {
  try {
    const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moods`, {
      cache: 'no-store',
    });
    if (!res.ok) throw new Error('Failed to fetch moods');
    return await res.json();
  } catch (error) {
    console.error('Error fetching moods:', error);
    throw new Error('Failed to fetch moods');
  }
}

// Metadata แบบ App Router
export const metadata = {
  title: "Cardtel by ชี้ดาบ | อ่านอะไรดีตามอารมณ์",
  description: "เลือกอารมณ์ แล้วเราจะบอกเล่มที่เหมาะกับคุณจากสำนักพิมพ์ชี้ดาบ",
};

// Main component
export default async function CardTel() {
  const moods = await fetchMoods();
  return <MoodDisplay moods={moods} />;
}
