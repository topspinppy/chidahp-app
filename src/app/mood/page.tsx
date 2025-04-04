import Head from "next/head";
import MoodDisplay from "./components/MoodDisplay";

// Server component to fetch data
async function fetchMoods() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/moods`);
  if (!res.ok) {
    throw new Error('Failed to fetch moods');
  }
  return res.json();
}



// Main component to fetch data and render the client component
export default async function CardTel() {
  const moods = await fetchMoods();
  return (
    <>
      <Head>
        <title>Cardtel by ชี้ดาบ | อ่านอะไรดีตามอารมณ์</title>
        <meta name="description" content="เลือกอารมณ์ แล้วเราจะบอกเล่มที่เหมาะกับคุณจากสำนักพิมพ์ชี้ดาบ" />
      </Head>
      <MoodDisplay moods={moods} />
    </>
  );
}