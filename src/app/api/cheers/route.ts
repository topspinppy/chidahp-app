import { createClient } from '@supabase/supabase-js';

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);

export async function POST(req: Request) {
  const { emoji } = await req.json();
  const { data, error } = await supabase.from('cheers').insert([{ emoji }]);
  if (error) return Response.json({ error: error.message }, { status: 500 });
  return Response.json({ success: true });
}

