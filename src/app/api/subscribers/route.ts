let cachedSubscribers: number | null = null;
let cachedAt = 0; // timestamp ของ cache ล่าสุด
const CACHE_TTL = 5 * 60 * 1000; // 5 นาที (300,000 milliseconds)

export async function GET() {
  const now = Date.now();

  if (cachedSubscribers && now - cachedAt < CACHE_TTL) {
    // ยังอยู่ในช่วง cache ตอบจาก cache ไปเลย
    return Response.json({ subscribers: cachedSubscribers });
  }

  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  const url = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();
    const subscribers = Number(data.items[0].statistics.subscriberCount);

    // update cache
    cachedSubscribers = subscribers;
    cachedAt = now;

    return Response.json({ subscribers });
  } catch {
    return Response.json({ error: 'Failed to fetch subscribers' });
  }
}
