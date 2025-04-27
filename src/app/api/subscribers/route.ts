let cachedSubscribers: number | null = null;
let cachedAt: number = 0;
const CACHE_TTL = 5 * 60 * 1000; // 5 นาที

export async function GET() {
  const now = Date.now();
  const apiKey = process.env.YOUTUBE_API_KEY;
  const channelId = process.env.YOUTUBE_CHANNEL_ID;

  if (!apiKey || !channelId) {
    return Response.json({ error: 'Missing API Key or Channel ID' });
  }

  // ถ้ามี cache และยังไม่หมดอายุ
  if (cachedSubscribers !== null && now - cachedAt < CACHE_TTL) {
    return Response.json({ subscribers: cachedSubscribers });
  }

  const socialCountsUrl = `https://api.socialcounts.org/youtube-live-subscriber-count/${channelId}`;
  const googleApiUrl = `https://www.googleapis.com/youtube/v3/channels?part=statistics&id=${channelId}&key=${apiKey}`;

  try {
    // 1. พยายาม fetch จาก SocialCounts ก่อน
    const response = await fetch(socialCountsUrl, { cache: "no-store" });
    if (!response.ok) throw new Error('SocialCounts fetch failed');
    const data = await response.json();

    const subscribers = Number(data.est_sub ?? 0);

    // อัปเดต cache
    cachedSubscribers = subscribers;
    cachedAt = now;

    return Response.json({ subscribers });
  } catch (error) {
    console.warn('Failed to fetch from SocialCounts, trying Google API...', error);

    try {
      // 2. ถ้า SocialCounts fail → fallback ไป Google API
      const response = await fetch(googleApiUrl, { cache: "no-store" });
      if (!response.ok) throw new Error('Google API fetch failed');
      const data = await response.json();

      const subscribers = Number(data.items?.[0]?.statistics?.subscriberCount ?? 0);

      // อัปเดต cache
      cachedSubscribers = subscribers;
      cachedAt = now;

      return Response.json({ subscribers });
    } catch (error) {
      console.error('Failed to fetch from both sources:', error);
      return Response.json({ error: 'Failed to fetch subscribers' });
    }
  }
}
