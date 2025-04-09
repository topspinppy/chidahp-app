/* eslint-disable @typescript-eslint/no-explicit-any */
function getNextQuestionBalanced(
  allQuestions: any[],
  answered: { id: string; mood: string }[],
  usedIds: Set<string>,
  currentIndex: number,
  totalCount: number
): any {
  const moodCounter: Record<string, number> = {};
  for (const a of answered) {
    moodCounter[a.mood] = (moodCounter[a.mood] || 0) + 1;
  }

  const remaining = allQuestions.filter((q) => !usedIds.has(q.id));

  // 🎯 Mood variety strict filter
  const moodStrict = remaining.filter((q) =>
    q.choices.every((c: any) => (moodCounter[c.mood] || 0) < 2)
  );

  // 🔧 Weight balance based on question position
  let weightRange = [1, 4];
  if (currentIndex === 0) weightRange = [3, 4]; // คำถามแรก: น้ำหนักสูง
  else if (currentIndex >= totalCount - 2) weightRange = [1, 2]; // ท้ายๆ: เบาๆหน่อย

  const filteredByWeight = (moodStrict.length > 0 ? moodStrict : remaining).filter(
    (q) => q.weight >= weightRange[0] && q.weight <= weightRange[1]
  );

  const filtered = filteredByWeight.length > 0 ? filteredByWeight : remaining;

  // 🧂 Weighted random
  const expanded = filtered.flatMap((q) => Array(q.weight).fill(q));
  return expanded[Math.floor(Math.random() * expanded.length)];
}

function getInitialQuestion(allQuestions: any[]): any {
  const starters = allQuestions.filter((q) => q.weight >= 3);
  const expanded = starters.flatMap((q) => Array(q.weight).fill(q));
  return expanded[Math.floor(Math.random() * expanded.length)];
}

function getQuestionSequenceBalancedWithEnding(allQuestions: any[], count: number): any[] {
  const result: any[] = [];
  const usedIds = new Set<string>();

  const endingIds = ["q6", "q8", "q10"];
  const endingAll = allQuestions.filter((q) => endingIds.includes(q.id));

  const questionPool = allQuestions.filter((q) => !endingAll.includes(q));

  // 🔰 คำถามแรกแบบหนัก
  const first = getInitialQuestion(questionPool);
  result.push(first);
  usedIds.add(first.id);

  while (result.length < count - 1) {
    const next = getNextQuestionBalanced(questionPool, result, usedIds, result.length, count);
    if (!usedIds.has(next.id)) {
      result.push(next);
      usedIds.add(next.id);
    }
  }

  // 🎯 Ending logic
  const firstThreeMoods = result.slice(0, 3).flatMap((q: any) =>
    q.choices.map((c: any) => c.mood)
  );

  const sadCount = firstThreeMoods.filter((m) => m === "เศร้า").length;
  let endingCandidates;

  if (sadCount >= 2) {
    const soothingMoods = ["ฮีลใจ", "อยากกลับมาเป็นตัวเอง", "เหนื่อย"];
    endingCandidates = endingAll.filter((q) =>
      q.choices.some((c: any) => soothingMoods.includes(c.mood))
    );
  } else {
    endingCandidates = endingAll;
  }

  const ending = endingCandidates[Math.floor(Math.random() * endingCandidates.length)];
  if (!usedIds.has(ending.id)) {
    result.push(ending);
  } else {
    const fallback = questionPool.find((q) => !usedIds.has(q.id));
    if (fallback) result.push(fallback);
  }

  return result;
}

function getMoodStats(questions: any[]): Record<string, number> {
  const stats: Record<string, number> = {};
  for (const q of questions) {
    for (const c of q.choices) {
      stats[c.mood] = (stats[c.mood] || 0) + 1;
    }
  }
  return stats;
}



export async function GET(req: Request) {
  const url = new URL(req.url);
  const mode = url.searchParams.get("mode") || "default";

  const allQuestions = [
    {
      id: "q1",
      question: "ช่วงนี้ความรู้สึกคุณใกล้กับสิ่งไหนมากที่สุด?",
      allowCustom: true,
      weight: 3,
      placeholder: "พิมพ์ความรู้สึกของคุณ...",
      choices: [
        {
          text: "ความฝันที่ยังไม่กล้าทำ",
          mood: "หมดไฟ",
          subfeeling: "กลัวเริ่มใหม่แล้วพังอีก",
          reaction: "บางทีฝันมันไม่ได้น่ากลัวหรอก... แต่กลัวว่าจะไม่มีแรงลุกขึ้นอีกถ้ามันพังอีกครั้งต่างหากค้าบ"
        },
        {
          text: "คนบางคนที่ไม่อยู่แล้ว",
          mood: "เศร้า",
          subfeeling: "สูญเสีย",
          reaction: "ไม่อยู่แล้วก็จริง แต่ใจเรานี่มันยังว่างให้เขานั่งอยู่ตลอดเลย"
        },
        {
          text: "ความเงียบที่ไม่ได้เลือกเอง",
          mood: "สับสน",
          subfeeling: "รู้สึกโดดเดี่ยว",
          reaction: "ความเงียบมันก็โอเคแหละ...แต่อย่าทำเป็นเพื่อนทั้งที่เราไม่ได้ชวน"
        },
        {
          text: "ทางแยกที่ยังไม่รู้จะไปทางไหนดี",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "ลังเล ตัดสินใจไม่ได้",
          reaction: "ไม่มีใครเริ่มก้าวแรกแล้วเท่เลย ทุกคนก็งงเหมือนกันหมดนั่นแหละ"
        },
        {
          text: "โลกที่ไม่แฟร์กับเรา",
          mood: "โกรธโลก",
          subfeeling: "ถูกเอาเปรียบ",
          reaction: "เธอไม่งี่เง่าหรอก ที่รู้สึกว่าโลกมันไม่แฟร์... มันไม่แฟร์จริงๆ นั่นแหละ"
        }
      ]
    },
    {
      id: "q2",
      question: "ถ้าได้หยุดไปที่ไหนก็ได้ตอนนี้ คุณอยากไปเพื่ออะไร?",
      weight: 3,
      allowCustom: true,
      placeholder: "พิมพ์ความรู้สึกของคุณ...",
      choices: [
        {
          text: "ไปอยู่คนเดียวสักพัก",
          mood: "สับสน",
          subfeeling: "อยากหนีจากเสียงรอบตัว",
          reaction: "บางเรื่องต้องเว้นวรรคก่อน ไม่ใช่เพราะแพ้...แต่เพราะสมองมันแล็ก"
        },
        {
          text: "ไปตามหาตัวเอง",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "ยังไม่รู้ว่าตัวเองต้องการอะไร",
          reaction: "บางคนมี GPS ชีวิต เราแค่มีแผนที่วาดเอง...แต่แม่งก็เท่ดีนะ"
        },
        {
          text: "ไปเจออะไรใหม่ ๆ",
          mood: "อยากเริ่มใหม่",
          subfeeling: "หมดแรงกับที่เดิม",
          reaction: "ของใหม่มันมักจะงง ๆ แหละ…แต่บางที งงถูกทางก็ได้"
        },
        {
          text: "ไปเจอใครบางคน",
          mood: "เหงา",
          subfeeling: "โหยหาการเชื่อมโยง",
          reaction: "บางทีแค่มีใครสักคนที่ฟังโดยไม่พยายามแก้…มันก็ดีพอแล้วป่ะ"
        },
        {
          text: "ไปใช้ชีวิตให้สุด ๆ",
          mood: "เฟียซ",
          subfeeling: "อยากใช้ชีวิตให้คุ้ม",
          reaction: "บางวันที่โคตรมั่ว แต่ใจเราบอกว่าใช่…นั่นแหละเรียกว่าดีแล้วเว้ย"
        }
      ]
    },
    {
      id: "q3",
      question: "คุณรู้สึกยังไงกับคำว่า 'เปลี่ยนแปลง' ในตอนนี้?",
      weight: 4,
      allowCustom: true,
      placeholder: "พิมพ์ความรู้สึกของคุณ...",
      choices: [
        {
          text: "ยังไม่พร้อม",
          mood: "กังวล",
          subfeeling: "กลัวจะเสียของเดิม",
          reaction: "บางคนเริ่มตอน 25 บางคนเริ่มตอน 52 ก็ไม่ผิดหรอก…แค่ขออย่าเร่งตัวเองเกินไปก็พอ"
        },
        {
          text: "กลัวแต่รู้ว่าต้องทำ",
          mood: "อยากก้าวข้าม",
          subfeeling: "กลัวล้มเหลว",
          reaction: "การกลัว แปลว่าเรากำลังจะเจอสิ่งสำคัญ"
        },
        {
          text: "อยากเปลี่ยน แต่ไม่รู้จะเริ่มยังไง",
          mood: "สับสน",
          subfeeling: "ขาดเป้าหมาย",
          reaction: "ไม่รู้ก็แค่ยังไม่เริ่มถาม จุดจบที่ไหน มันคือจุดแจกคำถามต่างหาก!"
        },
        {
          text: "พร้อมแล้ว ขอแค่โอกาส",
          mood: "มั่นใจ",
          subfeeling: "แค่รอโอกาสมาเคาะประตู",
          reaction: "โอกาสแม่งไม่ค่อยมา... แต่ก็อย่าอยู่นิ่ง ไปลากมันมาเองเลย"
        },
        {
          text: "ไม่กลัวอะไรแล้ว!",
          mood: "เฟียซ",
          subfeeling: "พร้อมลุย",
          reaction: "ไม่ต้องแน่ใจอะไรทั้งนั้นค้าบ พลังมาทีหลังก็ได้... ตอนนี้ลุยไว้ก่อน!"
        }
      ]
    },
    {
      id: "q4",
      question: "สิ่งที่คุณคิดถึงมากที่สุดตอนนี้คืออะไร?",
      weight: 2,
      allowCustom: true,
      placeholder: "พิมพ์สิ่งที่คิดถึง...",
      choices: [
        {
          text: "ใครบางคนที่เคยอยู่ข้างกัน",
          mood: "เศร้า",
          subfeeling: "คิดถึงอดีต",
          reaction: "ความทรงจำแม่งไม่ได้ไปไหนหรอก... มันแค่ซุ่มอยู่เงียบๆ รอวันจู่โจมเท่านั้นเอง..."
        },
        {
          text: "ช่วงเวลาที่เราเคยมั่นใจในตัวเอง",
          mood: "หมดไฟ",
          subfeeling: "รู้สึกตัวเองไม่เก่งเหมือนเดิม",
          reaction: "ยังไม่มั่นใจก็ไม่เป็นไร... แต่อย่าลืม ว่าคุณคือคนเก่งคนเดิม ที่แค่กำลังพักอยู่"
        },
        {
          text: "ครอบครัว",
          mood: "เหงา",
          subfeeling: "อยากรู้สึกอบอุ่นอีกครั้ง",
          reaction: "ที่ปลอดภัยที่สุด บางทีมันไม่ใช่สถานที่ แต่คือ 'คน'"
        },
        {
          text: "ความรู้สึกที่ไม่ต้องพยายามอะไร",
          mood: "เหนื่อย",
          subfeeling: "แบกเยอะเกินไป",
          reaction: "เหนื่อยได้ หยุดได้ ไม่ต้องรีบลุกก็ได้"
        },
        {
          text: "ตัวเราในเวอร์ชันที่กล้า",
          mood: "อยากกลับมาเป็นตัวเอง",
          subfeeling: "ห่างไกลจากตัวเอง",
          reaction: "ตัวคุณที่กล้า... ยังอยู่ตรงนี้แหละ แค่รอมือคุณเอื้อมถึง"
        }
      ]
    },
    {
      id: "q5",
      question: "คุณรู้สึกยังไงกับคำว่า ‘อนาคต’ ตอนนี้?",
      weight: 3,
      allowCustom: true,
      placeholder: "พิมพ์สิ่งที่คุณรู้สึกกับอนาคต...",
      choices: [
        {
          text: "ยังดูไม่ออกเลยว่าจะไปทางไหน",
          mood: "สับสน",
          subfeeling: "ขาดเป้าหมาย",
          reaction: "ไม่รู้อนาคตไม่ใช่เรื่องแย่ แค่คุณกำลังเริ่มสร้างมัน"
        },
        {
          text: "กลัวว่าจะไม่ดีพอ",
          mood: "กังวล",
          subfeeling: "ไม่มั่นใจในตัวเอง",
          reaction: "คุณไม่ต้องเพอร์เฟกต์ แค่เดินต่อก็พอ"
        },
        {
          text: "อยากไปให้ไกลกว่านี้",
          mood: "เฟียซ",
          subfeeling: "หิวความสำเร็จ",
          reaction: "คุณไม่ได้อยากหนี แค่พร้อมไปให้สุด"
        },
        {
          text: "ขอแค่มีใครอยู่ข้าง ๆ ก็พอ",
          mood: "เหงา",
          subfeeling: "ต้องการความมั่นคง",
          reaction: "บางครั้ง 'คน' สำคัญกว่าจุดหมาย"
        },
        {
          text: "ไม่อยากคิดอะไรทั้งนั้น",
          mood: "เหนื่อย",
          subfeeling: "ล้าเกินจะวางแผน",
          reaction: "ตอนนี้ยังไม่ต้องรู้ก็ได้ แค่ได้พักก็พอ"
        }
      ]
    },
    {
      id: "q6",
      question: "ตอนนี้คุณอยากบอกอะไรกับตัวเอง?",
      weight: 2,
      allowCustom: true,
      placeholder: "เขียนสิ่งที่อยากบอกตัวเอง...",
      choices: [
        {
          text: "พอได้แล้ว หยุดโทษตัวเองซักที",
          mood: "เศร้า",
          subfeeling: "รู้สึกผิด",
          reaction: "คุณก็แค่คนธรรมดาที่พยายามอยู่ทุกวัน"
        },
        {
          text: "เราเก่งแล้วนะ แค่ยังไม่เห็น",
          mood: "อยากกลับมาเป็นตัวเอง",
          subfeeling: "หลงลืมคุณค่าในตัวเอง",
          reaction: "คุณยังมีแสงสว่างในตัวเองเสมอ"
        },
        {
          text: "อย่ายอมแพ้นะ เดี๋ยวมันก็ผ่านไป",
          mood: "ฮีลใจ",
          subfeeling: "ต้องการความหวัง",
          reaction: "ทุกคลื่นลูกใหญ่ ก็ต้องผ่านไปเหมือนเดิม"
        },
        {
          text: "ถึงมันจะไม่โอเคก็ไม่เป็นไร",
          mood: "เหนื่อย",
          subfeeling: "แบกเยอะ",
          reaction: "ไม่ต้องรีบดีก็ได้ แค่ไม่แย่ลงก็พอ"
        },
        {
          text: "ลองอีกครั้งเถอะ",
          mood: "มั่นใจ",
          subfeeling: "พร้อมจะพยายามใหม่",
          reaction: "บางครั้งความสำเร็จก็อยู่หลังคำว่า 'อีกครั้งเดียว'"
        }
      ]
    },
    {
      id: "q7",
      question: "ในชีวิตตอนนี้ คุณโฟกัสเรื่องไหนมากที่สุด?",
      weight: 1,
      allowCustom: true,
      placeholder: "สิ่งที่คุณกำลังให้ความสำคัญ...",
      choices: [
        {
          text: "ตัวเองและการเยียวยา",
          mood: "ฮีลใจ",
          subfeeling: "อยากรักตัวเอง",
          reaction: "คุณสำคัญพอจะได้รับการดูแลจากคุณเอง"
        },
        {
          text: "ความสัมพันธ์",
          mood: "เหงา",
          subfeeling: "ต้องการใครสักคน",
          reaction: "ความสัมพันธ์ดี ๆ เริ่มจากใจที่พร้อมเป็นเพื่อนกับตัวเองก่อน"
        },
        {
          text: "การเอาตัวรอด",
          mood: "เครียด",
          subfeeling: "มีภาระเยอะ",
          reaction: "แค่ยังยืนไหวในโลกนี้ก็เก่งมากแล้ว"
        },
        {
          text: "ความสำเร็จ",
          mood: "เฟียซ",
          subfeeling: "อยากพิสูจน์ตัวเอง",
          reaction: "คุณไม่ต้องแข่งขันกับใคร แค่กล้าเดินต่อก็เหนือแล้ว"
        },
        {
          text: "การเริ่มใหม่",
          mood: "อยากเริ่มใหม่",
          subfeeling: "จบอะไรบางอย่างมา",
          reaction: "ทุกจุดจบคือจุดเริ่มต้นของสิ่งใหม่"
        }
      ]
    },
    {
      id: "q8",
      question: "ถ้าให้ตั้งชื่อ 'บทนี้ในชีวิตคุณ' จะชื่อว่าอะไร?",
      weight: 2,
      allowCustom: true,
      placeholder: "ตั้งชื่อบทของคุณเอง...",
      choices: [
        {
          text: "บทของคนที่กำลังพยายามอยู่เงียบ ๆ",
          mood: "เหนื่อย",
          subfeeling: "ยังต้องสู้",
          reaction: "แม้ไม่มีใครเห็น... คุณยังมีตัวเองอยู่เสมอ"
        },
        {
          text: "บทของการเดินออกจากบางอย่าง",
          mood: "อยากเริ่มใหม่",
          subfeeling: "จบอะไรมาแล้ว",
          reaction: "คุณกล้ากว่าที่คุณคิด เพราะไม่ใช่ทุกคนที่เดินออกมาได้"
        },
        {
          text: "บทของความกลัวที่ต้องฝืนยิ้ม",
          mood: "กังวล",
          subfeeling: "ไม่อยากให้ใครเป็นห่วง",
          reaction: "คุณไม่ต้องยิ้มก็ได้ ถ้าข้างในยังร้องไห้"
        },
        {
          text: "บทของคนที่อยากรักตัวเองให้ได้",
          mood: "ฮีลใจ",
          subfeeling: "กำลังเยียวยา",
          reaction: "คุณกำลังทำดีมากแล้ว... แค่ยังไม่ได้ชมตัวเองเท่านั้นเอง"
        },
        {
          text: "บทของการเริ่มต้นอีกครั้ง",
          mood: "มั่นใจ",
          subfeeling: "พร้อมจะก้าว",
          reaction: "คุณไม่ได้เริ่มจากศูนย์ คุณเริ่มจากประสบการณ์"
        }
      ]
    },
    {
      id: "q9",
      question: "ถ้าจะเลือกแนวหนังสือตอนนี้ คุณอยากอ่านแบบไหน?",
      weight: 2,
      allowCustom: true,
      placeholder: "เลือกแนวที่คุณรู้สึกว่าอยากอ่าน...",
      choices: [
        {
          text: "เบา ๆ คลายเครียด",
          mood: "เหนื่อย",
          subfeeling: "อยากพักหัว",
          reaction: "หัวใจเราก็เหมือนไฟแช็ก...ใช้งานบ่อยก็ต้องพักบ้าง"
        },
        {
          text: "บันทึกชีวิตจริง",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "อยากเห็นมุมของคนอื่น",
          reaction: "เรื่องของคนอื่น บางทีก็ส่องให้เราเห็นเรื่องของตัวเอง"
        },
        {
          text: "ฮาแบบขม ๆ",
          mood: "เศร้า",
          subfeeling: "อยากหัวเราะทั้งที่ยังน้ำตาคลอ",
          reaction: "ขำแบบเข้าใจชีวิต...ช่วยให้เราอยู่กับมันได้นุ่มขึ้น"
        },
        {
          text: "แนวแรงบันดาลใจ",
          mood: "เฟียซ",
          subfeeling: "อยากลุกขึ้นมาทำอะไรสักอย่าง",
          reaction: "แรงบันดาลใจดี ๆ ไม่ใช่สิ่งสวยงาม แต่มันทำให้ใจคุณขยับ"
        },
        {
          text: "จริงจังหน่อย อยากคิด",
          mood: "กังวล",
          subfeeling: "อยากเข้าใจโลก",
          reaction: "บางทีสิ่งที่เรากลัว คือสิ่งที่เรายังไม่เข้าใจ"
        }
      ]
    },
    {
      id: "q10",
      question: "อะไรคือสิ่งที่คุณกำลังพยายามอยู่ในชีวิตตอนนี้?",
      weight: 1,
      allowCustom: true,
      placeholder: "พิมพ์สิ่งที่คุณกำลังเผชิญอยู่...",
      choices: [
        {
          text: "เข้าใจตัวเองให้มากขึ้น",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "อยากหาตัวตน",
          reaction: "บางครั้งการเข้าใจตัวเอง...เริ่มจากการฟังคนอื่น"
        },
        {
          text: "รักษาความสัมพันธ์บางอย่าง",
          mood: "เหงา",
          subfeeling: "ไม่อยากสูญเสีย",
          reaction: "ความสัมพันธ์ดี ๆ ไม่ใช่แค่ใส่ใจ...แต่ต้องกล้าอยู่ด้วยใจจริง"
        },
        {
          text: "ก้าวผ่านอดีต",
          mood: "เศร้า",
          subfeeling: "เจ็บกับเรื่องเดิม ๆ",
          reaction: "อดีตไม่หายไป...แต่มันจะเบาลง เมื่อเราไม่กอดมันแน่น"
        },
        {
          text: "เริ่มต้นใหม่อีกครั้ง",
          mood: "อยากเริ่มใหม่",
          subfeeling: "ปิดฉากเก่าไว้แล้ว",
          reaction: "ทุกการเริ่มใหม่ คือโอกาสที่ให้ตัวเองอีกครั้ง"
        },
        {
          text: "พิสูจน์บางอย่างกับตัวเอง",
          mood: "เฟียซ",
          subfeeling: "อยากกลับมามั่นใจ",
          reaction: "การพิสูจน์ตัวเอง...ไม่ต้องเสียงดัง แค่ไปให้ไกล"
        }
      ]
    },
    {
      id: "q11",
      question: "คุณอยากให้หนังสือเล่มนี้ ‘ช่วย’ อะไรคุณมากที่สุด?",
      weight: 3,
      allowCustom: true,
      placeholder: "สิ่งที่คุณอยากได้จากหนังสือเล่มนี้...",
      choices: [
        {
          text: "ช่วยให้รู้สึกว่าเราไม่ได้อยู่คนเดียว",
          mood: "เหงา",
          subfeeling: "อยากรู้ว่าไม่ใช่แค่เราที่เป็นแบบนี้",
          reaction: "เธอไม่ได้แปลกหรอก แค่ยังไม่เจอคนที่กล้าพูดความรู้สึกแบบเดียวกัน"
        },
        {
          text: "ช่วยเปิดมุมคิดใหม่ ๆ",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "อยากเปลี่ยนมุมมอง",
          reaction: "บางทีเราติดอยู่กับคำตอบ เพราะเราไม่เคยกล้าถามคำถามใหม่ ๆ"
        },
        {
          text: "ช่วยให้มีแรงฮึบอีกนิด",
          mood: "ฮีลใจ",
          subfeeling: "ต้องการแรงใจเล็ก ๆ",
          reaction: "เหนื่อยแค่ไหนก็อย่าลืม... เธอผ่านมาถึงตรงนี้ได้แล้วนะเว้ย"
        },
        {
          text: "ช่วยให้ขำบ้างไรบ้าง",
          mood: "เหนื่อย",
          subfeeling: "ต้องการปลดปล่อย",
          reaction: "ถ้าจะร้องไห้ ก็ขอให้หัวเราะไปด้วยเลยแล้วกัน... จะได้รู้ว่าชีวิตมันก็มีหลายรสค้าบ"
        }
      ]
    },
    {
      id: "q12",
      question: "ถ้าหนังสือเล่มนี้เป็นเพื่อนสักคน คุณอยากให้มันเป็นแบบไหน?",
      weight: 2,
      allowCustom: true,
      placeholder: "เขียนลักษณะเพื่อนที่คุณอยากให้หนังสือเล่มนี้เป็น...",
      choices: [
        {
          text: "เพื่อนที่เข้าใจแม้ไม่ต้องพูด",
          mood: "ฮีลใจ",
          subfeeling: "อยากได้ความเข้าใจ",
          reaction: "บางคำในหนังสือ มันเหมือนมาจากเพื่อนที่นั่งอยู่ข้างๆ เราในหัวใจเลยค้าบ"
        },
        {
          text: "เพื่อนที่กล้าพูดความจริงแม้เราจะไม่อยากฟัง",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "ต้องการกระตุกคิด",
          reaction: "เพื่อนบางคนไม่ปลอบ แต่แม่งทำให้เรามองตัวเองชัดขึ้น"
        },
        {
          text: "เพื่อนสายฮาที่ทำให้เราลืมเรื่องเครียด",
          mood: "เหนื่อย",
          subfeeling: "อยากพัก",
          reaction: "บางทีแค่ขำด้วยกัน ก็คือการรักษาที่ดีที่สุดแล้วค้าบ"
        },
        {
          text: "เพื่อนบ้าพลังที่ลากเราไปลุย",
          mood: "เฟียซ",
          subfeeling: "ต้องการพลัง",
          reaction: "ถ้าเพื่อนคนนี้จะลากเราออกไปลุยโลก... ก็ขอให้มันทำตอนนี้เลย"
        }
      ]
    },
    {
      id: "q13",
      question: "ถ้าต้องเลือกอ่านเรื่องของใครสักคนตอนนี้ คุณอยากรู้เรื่องของใคร?",
      weight: 3,
      allowCustom: true,
      placeholder: "พิมพ์คนแบบที่คุณอยากอ่านเรื่องของเขา...",
      choices: [
        {
          text: "คนที่ชีวิตแม่งพังแต่ยังฮาได้",
          mood: "เศร้า",
          subfeeling: "อยากเห็นแสงในความพัง",
          reaction: "พังแล้วขำ มันไม่ใช่เรื่องตลก แต่มันคือศิลปะของการอยู่รอดค้าบ"
        },
        {
          text: "คนที่เคยสับสนแต่ค่อย ๆ เข้าใจตัวเอง",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "อยากเห็นเส้นทาง",
          reaction: "บางครั้งเรายังไม่รู้ทาง ไม่เป็นไร...แค่รู้ว่ามีคนเดินอยู่ก็พอ"
        },
        {
          text: "คนที่กล้าทำสิ่งที่ตัวเองฝันไว้",
          mood: "เฟียซ",
          subfeeling: "ต้องการแรงผลัก",
          reaction: "กล้าครั้งเดียวก็พอ... เดี๋ยวครั้งต่อไปมันจะง่ายขึ้นเองค้าบ"
        },
        {
          text: "คนที่ยังหาคำตอบชีวิตไม่ได้เหมือนเรา",
          mood: "สับสน",
          subfeeling: "อยากรู้ว่าไม่ได้งงคนเดียว",
          reaction: "บางทีการงงของเราก็เป็นความกล้ารูปแบบหนึ่งนะค้าบ"
        }
      ]
    },
    {
      id: "q14",
      question: "ถ้าจะได้แรงบันดาลใจจากอะไรสักอย่างตอนนี้... คุณอยากได้จากอะไร?",
      weight: 2,
      allowCustom: true,
      placeholder: "เขียนสิ่งที่อยากได้แรงบันดาลใจจาก...",
      choices: [
        {
          text: "คนธรรมดาที่ล้มแล้วลุก",
          mood: "ฮีลใจ",
          subfeeling: "อยากเห็นความหวัง",
          reaction: "แรงบันดาลใจที่ดีที่สุด คือเรื่องของคนที่ยังไม่ยอมแพ้…แม้จะไม่ได้ชนะ"
        },
        {
          text: "การเดินทาง",
          mood: "อยากเริ่มใหม่",
          subfeeling: "อยากเปลี่ยนที่เปลี่ยนใจ",
          reaction: "บางทีเราไม่ต้องหาที่หมาย…แค่ขยับจากจุดเดิมก็ถือว่าเริ่มแล้วค้าบ"
        },
        {
          text: "คนที่กล้าทำในสิ่งที่ตัวเองรัก",
          mood: "เฟียซ",
          subfeeling: "หิวไฟ",
          reaction: "เธอไม่ได้ต้องการแรงบันดาลใจ...เธอต้องการไฟจากคนที่จุดมันได้"
        },
        {
          text: "คนที่ยังงง แต่กล้าไปต่อ",
          mood: "สับสน",
          subfeeling: "ยังไม่มั่นใจในทาง",
          reaction: "ไม่มีใครพร้อมก่อนเริ่มหรอก...เริ่มก่อน แล้วค่อยพร้อมก็ได้"
        }
      ]
    },
    {
      id: "q15",
      question: "แล้วถ้าต้องเลือก... หนังสือแบบไหนที่คุณ ‘ไม่อยากอ่าน’ ตอนนี้?",
      weight: 2,
      allowCustom: true,
      placeholder: "พิมพ์แนวที่คุณไม่อยากอ่านตอนนี้...",
      choices: [
        {
          text: "แนวโลกสวยจนไม่จริง",
          mood: "โกรธโลก",
          subfeeling: "รู้สึกไม่อินกับการปลอบ",
          reaction: "คุณไม่ได้ต้องการให้ทุกอย่างดี...คุณแค่อยากให้มัน ‘จริง’"
        },
        {
          text: "แนวที่ต้องคิดเยอะ",
          mood: "เหนื่อย",
          subfeeling: "ยังไม่มีแรงใช้สมอง",
          reaction: "หนังสือบางเล่มไม่ต้องเปลี่ยนชีวิต...แค่ไม่ทำให้หนักใจก็พอ"
        },
        {
          text: "แนวที่เนิบ ๆ ช้า ๆ",
          mood: "เฟียซ",
          subfeeling: "อยากได้พลัง",
          reaction: "คุณไม่ได้อยากพัก...คุณอยากระเบิด"
        },
        {
          text: "แนวที่เครียดกว่าในชีวิตจริง",
          mood: "กังวล",
          subfeeling: "ต้องการปลอดภัย",
          reaction: "หนังสือไม่ควรซ้ำเติมเรา...อย่างน้อยก็ในวันที่ยังไม่ไหว"
        }
      ]
    }        
  ];

  const modeCount = mode === "quick" ? 5 : mode === "deep" ? 10 : 8;
  
  // 🔄 สุ่มคำถาม 1–2 ข้อ (จากทั้งหมด)
  const selected = getQuestionSequenceBalancedWithEnding(allQuestions, modeCount);
  const moodStats = getMoodStats(selected);

  return Response.json({ questions: selected, moodStats });
}
