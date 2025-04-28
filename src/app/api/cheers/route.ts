import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

// ใช้ Map เก็บข้อมูล IP -> Request History
const rateLimitMap = new Map<string, { count: number, lastReset: number }>();

const RATE_LIMIT_WINDOW = 60 * 1000; // 1 นาที
const MAX_REQUESTS_PER_WINDOW = 30; // ขออนุญาตสูงขึ้นนิดหน่อย เช่น 30 ครั้ง/นาที

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();

    // เช็กใน Map
    let info = rateLimitMap.get(ip);

    if (!info) {
      info = { count: 0, lastReset: now };
      rateLimitMap.set(ip, info);
    }

    // ถ้าเกิน 1 นาทีแล้ว -> Reset ใหม่
    if (now - info.lastReset > RATE_LIMIT_WINDOW) {
      info.count = 0;
      info.lastReset = now;
    }

    // เพิ่ม count
    info.count += 1;

    // ถ้าเกิน limit
    if (info.count > MAX_REQUESTS_PER_WINDOW) {
      return Response.json({ error: 'Too many requests. Please slow down.' }, { status: 429 });
    }

    // อ่าน Body
    const { emojis } = await req.json();

    // Validate Request
    if (!Array.isArray(emojis)) {
      return Response.json({ error: 'Invalid payload: emojis must be an array' }, { status: 400 });
    }

    if (emojis.length === 0) {
      return Response.json({ error: 'Emoji list is empty' }, { status: 400 });
    }

    if (emojis.length > 100) {
      return Response.json({ error: 'Too many emojis in one request (max 100)' }, { status: 400 });
    }

    for (const emoji of emojis) {
      if (typeof emoji !== 'string' || emoji.length > 4) {
        return Response.json({ error: 'Invalid emoji format' }, { status: 400 });
      }
    }

    // Insert ลง Supabase
    const inserts = emojis.map((emoji: string) => ({ emoji }));
    const { error } = await supabase.from('cheers').insert(inserts);

    if (error) {
      console.error('Supabase Insert Error:', error);
      return Response.json({ error: error.message }, { status: 500 });
    }

    return Response.json({ success: true });

  } catch (e) {
    console.error('API Error:', e);
    return Response.json({ error: 'Something went wrong' }, { status: 500 });
  }
}
