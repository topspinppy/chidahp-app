/* eslint-disable @typescript-eslint/no-explicit-any */
function getNextQuestionBalanced(
  allQuestions: any[],
  answered: { id: string; mood: string }[]
): any {
  const usedIds = new Set(answered.map((a) => a.id));
  const moodCounter: Record<string, number> = {};

  for (const a of answered) {
    moodCounter[a.mood] = (moodCounter[a.mood] || 0) + 1;
  }

  const remaining = allQuestions.filter((q) => !usedIds.has(q.id));

  // กรอง: mood ซ้ำไม่เกิน 2 ครั้ง
  const moodSafe = remaining.filter((q) =>
    q.choices.some((c: any) => (moodCounter[c.mood] || 0) < 2)
  );

  const filtered = moodSafe.length > 0 ? moodSafe : remaining;

  // สุ่มแบบ weighted
  const expanded = filtered.flatMap((q) => Array(q.weight).fill(q));
  return expanded[Math.floor(Math.random() * expanded.length)];
}

function getInitialQuestion(allQuestions: any[]): any {
  const expanded = allQuestions.flatMap((q) => Array(q.weight).fill(q));
  return expanded[Math.floor(Math.random() * expanded.length)];
}

function getQuestionSequenceBalancedWithEnding(allQuestions: any[], count: number): any[] {
  const result: any[] = [];
  const usedIds = new Set<string>();

  const endingCandidates = allQuestions.filter((q) =>
    ["q6", "q8", "q10"].includes(q.id)
  );

  // 🔁 ลบ ending ออกจากชุด shuffle ก่อน
  const questionPool = allQuestions.filter((q) => !endingCandidates.includes(q));

  // เริ่มจากคำถามแรก
  const first = getInitialQuestion(questionPool);
  result.push(first);
  usedIds.add(first.id);

  while (result.length < count - 1) {
    const next = getNextQuestionBalanced(questionPool, result);
    if (!usedIds.has(next.id)) {
      result.push(next);
      usedIds.add(next.id);
    }
  }

  // ✅ สุ่มคำถามปิดท้ายจาก ending set
  const ending = endingCandidates[Math.floor(Math.random() * endingCandidates.length)];
  if (!usedIds.has(ending.id)) {
    result.push(ending);
  } else {
    // fallback เผื่อ ending ซ้ำ
    const fallback = questionPool.find((q) => !usedIds.has(q.id));
    if (fallback) result.push(fallback);
  }

  return result;
}



export async function GET() {
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
          reaction: "บางทีเราก็เหนื่อยกับการต้องมั่นใจอยู่ตลอดเวลา"
        },
        {
          text: "คนบางคนที่ไม่อยู่แล้ว",
          mood: "เศร้า",
          subfeeling: "สูญเสีย",
          reaction: "การหายไปของใครบางคน ไม่ได้หายไปจากใจเราง่ายๆ หรอก"
        },
        {
          text: "ความเงียบที่ไม่ได้เลือกเอง",
          mood: "สับสน",
          subfeeling: "รู้สึกโดดเดี่ยว",
          reaction: "ความเงียบไม่ใช่เพื่อนเสมอไป โดยเฉพาะเมื่อเราไม่ได้ขอ"
        },
        {
          text: "ทางแยกที่ยังไม่รู้จะไปทางไหนดี",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "ลังเล ตัดสินใจไม่ได้",
          reaction: "ไม่มีเส้นทางไหนผิด มีแต่เส้นทางที่ยังไม่กล้าก้าว"
        },
        {
          text: "โลกที่ไม่แฟร์กับเรา",
          mood: "โกรธโลก",
          subfeeling: "ถูกเอาเปรียบ",
          reaction: "การรู้สึกไม่ยุติธรรม แปลว่าเรายังเชื่อว่าโลกควรจะดีกว่านี้"
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
          reaction: "บางทีเราต้องถอยออกมาก่อน ถึงจะได้ยินหัวใจตัวเอง"
        },
        {
          text: "ไปตามหาตัวเอง",
          mood: "อยากเข้าใจตัวเอง",
          subfeeling: "ยังไม่รู้ว่าตัวเองต้องการอะไร",
          reaction: "เราไม่ได้หลงทาง แค่ยังไม่เจอเส้นทางของเรา"
        },
        {
          text: "ไปเจออะไรใหม่ ๆ",
          mood: "อยากเริ่มใหม่",
          subfeeling: "หมดแรงกับที่เดิม",
          reaction: "สิ่งใหม่อาจยังไม่สมบูรณ์แบบ แต่มันคือก้าวใหม่ของหัวใจ"
        },
        {
          text: "ไปเจอใครบางคน",
          mood: "เหงา",
          subfeeling: "โหยหาการเชื่อมโยง",
          reaction: "เราไม่ได้ต้องการใครมาช่วย... แค่ใครสักคนที่เข้าใจ"
        },
        {
          text: "ไปใช้ชีวิตให้สุด ๆ",
          mood: "เฟียซ",
          subfeeling: "อยากใช้ชีวิตให้คุ้ม",
          reaction: "ชีวิตที่ดี อาจไม่ต้องสมบูรณ์แบบก็ได้ แค่มัน 'ใช่'"
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
          reaction: "ไม่เป็นไรเลยที่จะยังไม่พร้อม เปลี่ยนเมื่อพร้อมก็ได้"
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
          reaction: "การไม่รู้ไม่ใช่จุดจบ มันคือจุดเริ่มต้นของคำถามใหม่"
        },
        {
          text: "พร้อมแล้ว ขอแค่โอกาส",
          mood: "มั่นใจ",
          subfeeling: "แค่รอโอกาสมาเคาะประตู",
          reaction: "โอกาสไม่ได้มาหาเราบ่อย แต่เราเดินไปหาได้เสมอ"
        },
        {
          text: "ไม่กลัวอะไรแล้ว!",
          mood: "เฟียซ",
          subfeeling: "พร้อมลุย",
          reaction: "บางทีพลังมาทั้ง ๆ ที่ยังไม่แน่ใจอะไรเลยนั่นแหละ"
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
          reaction: "ความทรงจำไม่ได้หายไป มันแค่เงียบลง"
        },
        {
          text: "ช่วงเวลาที่เราเคยมั่นใจในตัวเอง",
          mood: "หมดไฟ",
          subfeeling: "รู้สึกตัวเองไม่เก่งเหมือนเดิม",
          reaction: "แม้วันนี้ยังไม่มั่นใจ แต่คุณก็ยังเป็นคนเก่งคนนั้นอยู่"
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
    }            
  ];

  // 🔄 สุ่มคำถาม 1–2 ข้อ (จากทั้งหมด)
  const selected = getQuestionSequenceBalancedWithEnding(allQuestions, 8);
  return Response.json({ questions: selected });
}
