export async function GET() {
  const data = [
    {
      "emoji": "😵",
      "mood": "สับสน",
      "quote": "เราไม่ได้หลงทาง...",
      "quoteLineTwo": "แค่เรายังไม่เจอเส้นทางของเรา",
      "gradient": "bg-gradient-to-r from-blue-500 to-purple-500",
      "books": [
        {
          "title": "พู่กันเปื้อนสี",
          "author": "หงส์ | ชี้ดาบ",
          "description": "เรื่องราวของคนที่ไม่มีโอกาสเลือกมากนัก แต่ต้องอยู่กับชีวิตที่เลือกเขาแทน",
          "quote": "ฉันไม่มีสิทธิ์เลือก แต่ฉันยังมีหัวใจ",
          "link": "https://www.chidahp.com/books/พู่กันเปื้อนสี",
          "cover": "/covers/poogun.png"
        },
        {
          "title": "0 ปี อเมริกา",
          "author": "ชี้ดาบ x Charlie D.",
          "description": "นิยายโลกคู่ขนานของเจม ถ้าเขาไม่ไปอเมริกา ชีวิตจะเป็นยังไง?",
          "link": "https://www.chidahp.com/books/0ปีอเมริกา",
          "cover": "/covers/0year.png"
        },
        {
          "title": "Route13 Part One",
          "author": "ชี้ดาบ",
          "description": "เริ่มต้นการเดินทางเพื่อหาความหมายชีวิต ผ่านถนน 7,000 กิโล",
          "link": "https://www.chidahp.com/books/route13-part1",
          "cover": "/covers/route13pt1.png"
        }
      ]
    },
    {
      "emoji": "🥲",
      "mood": "เศร้า",
      "quote": "น้ำตาไม่ผิด...",
      "quoteLineTwo": "มันแค่บอกเราว่าตอนนี้เรายังรู้สึก",
      "gradient": "bg-gradient-to-r from-gray-500 to-blue-700",
      "books": [
        {
          "title": "13 Years After",
          "author": "ชี้ดาบ",
          "description": "บางที...การกลับไป ก็คือทางเดียวที่จะเข้าใจว่า “เราเดินจากอะไรมา”",
          "quote": "ฝันเก่าก็ยังมีค่า แม้มันจะเปลี่ยนไปแล้ว",
          "link": "https://www.chidahp.com/books/13-years-after",
          "cover": "/covers/13years.png"
        },
        {
          "title": "อยุติธรรม เจนเนอเรชั่น",
          "author": "พังเรนเจอร์ จูเนียร์",
          "description": "รวมเรื่องสั้นสะท้อนสังคม ความเจ็บปวดของเด็กที่ถูกระบบบีบจนหายใจไม่ออก",
          "link": "https://www.chidahp.com/books/อยุติธรรม",
          "cover": "/covers/injustice.png"
        },
        {
          "title": "เอเลี่ยนในซานฟรานซิสโก",
          "author": "ท้อป",
          "description": "เขาหนีมาที่นี่ เพื่อหาความหมาย... แต่กลับเจอความว่างเปล่าที่ลึกกว่าเดิม",
          "quote": "เราไม่ใช่ของกันและกัน แม้จะอยากเป็น",
          "link": "https://www.chidahp.com/books/เอเลี่ยนในซานฟราน",
          "cover": "/covers/alien.png"
        }
      ]
    },
    {
      "emoji": "💪",
      "mood": "ต้องการกำลังใจ",
      "quote": "บางวันที่หมดแรง...",
      "quoteLineTwo": "ขอแค่ลมหายใจก็พอจะไปต่อ",
      "gradient": "bg-gradient-to-r from-green-500 to-teal-500",
      "books": [
        {
          "title": "James is Back",
          "author": "ชี้ดาบ",
          "description": "เด็กไทยกลับจากอเมริกา มาเจอการศึกษาไทย ชีวิตฮาแต่ชิบหายจริง",
          "quote": "หัวเราะให้สุด แล้วเดินต่อไปให้สุดด้วย",
          "link": "https://www.chidahp.com/books/james-is-back",
          "cover": "/covers/jamesisback.png"
        },
        {
          "title": "Route13 Part Two",
          "author": "ชี้ดาบ",
          "description": "ขี่มอเตอร์ไซค์กลางหิมะ ข้ามความกลัว และข้ามใจตัวเอง",
          "link": "https://www.chidahp.com/books/route13-part2",
          "cover": "/covers/route13pt2.png"
        },
        {
          "title": "เนิร์ดคลั่ง แว้นผ่าทวีป",
          "author": "ท้อป",
          "description": "จากเด็กเนิร์ดสู่การแว้นในยุโรปเพื่อหาคำตอบชีวิต",
          "link": "https://www.chidahp.com/books/เนิร์ดคลั่ง",
          "cover": "/covers/nerd.png"
        },
        {
          "title": "South Dakota 18+",
          "author": "ชี้ดาบ",
          "description": "ชีวิตจริงไม่ใสสะอาด แต่ก็ยังเดินต่อได้",
          "link": "https://www.chidahp.com/books/south-dakota",
          "cover": "/covers/sd.png"
        }
      ]
    },
    {
      "emoji": "🤪",
      "mood": "อยากบ้า",
      "quote": "ในโลกที่จริงจังเกินไป...",
      "quoteLineTwo": "บ้าให้สุดอาจคือคำตอบ",
      "gradient": "bg-gradient-to-r from-purple-500 to-pink-500",
      "books": [
        {
          "title": "นัตโตะ คนชุ่ยตะลุยญี่ปุ่น",
          "author": "KIMZA",
          "description": "รวมความชุ่ยในแดนอาทิตย์อุทัย ที่ทั้งฮา ทั้ง WTF!",
          "quote": "ชุ่ยให้สุด แล้วหยุดที่ซูชิ!",
          "link": "https://www.chidahp.com/books/นัตโตะ",
          "cover": "/covers/natto.png"
        },
        {
          "title": "พังเรนเจอร์",
          "author": "ชี้ดาบ & ทีมพังเรนเจอร์",
          "description": "รวมเรื่องสั้นแสบๆ ของแก๊งวัยรุ่นที่พร้อมปั่นโลกทั้งใบด้วยมุกบ้าบอ",
          "link": "https://www.chidahp.com/books/พังเรนเจอร์",
          "cover": "/covers/pang.png"
        }
      ]
    },
    {
      "emoji": "🧘‍♂️",
      "mood": "อยากเข้าใจตัวเอง",
      "quote": "ทุกคำถามในใจ อาจไม่ได้ต้องการคำตอบ...",
      "quoteLineTwo": "แต่อาจต้องการแค่ฟังตัวเอง",
      "gradient": "bg-gradient-to-r from-teal-500 to-green-500",
      "books": [
        {
          "title": "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 2",
          "author": "ชี้ดาบ",
          "description": "ตอนจบของชีวิตต่างแดน ที่ทิ้งคำถามกับหัวใจไว้มากมาย",
          "link": "https://www.chidahp.com/books/1ปีอเมริกา2",
          "cover": "/covers/year2.png"
        },
        {
          "title": "ตามติดชีวิตอินเดีย 2",
          "author": "ขิม",
          "description": "อินเดียรอบสอง ที่เรื่องรักกับเรื่องชีวิตสลับกันเล่า",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย2",
          "cover": "/covers/india2.png"
        },
        {
          "title": "13 Years After",
          "author": "ชี้ดาบ",
          "description": "บางที...การกลับไป ก็คือทางเดียวที่จะเข้าใจว่า “เราเดินจากอะไรมา”",
          "link": "https://www.chidahp.com/books/13-years-after",
          "cover": "/covers/13years.png"
        }
      ]
    },
    {
      "emoji": "🌏",
      "mood": "อยากไปไกลๆ",
      "quote": "บางครั้งปลายทางไม่สำคัญ",
      "quoteLineTwo": "เท่าการได้ออกเดินทาง...",
      "gradient": "bg-gradient-to-r from-indigo-500 to-blue-500",
      "books": [
        {
          "title": "ตามติดชีวิตอินเดีย",
          "author": "ขิม",
          "description": "อินเดียแบบเรียลๆ ทั้งเหม็น ทั้งงง ทั้งมีเสน่ห์",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย",
          "cover": "/covers/india.png"
        },
        {
          "title": "หลงจริงเวียดนาม",
          "author": "ชี้ดาบ",
          "description": "เรื่องราวเรียลทริปที่เวียดนาม ที่จริงยิ่งกว่านิยาย",
          "link": "https://www.chidahp.com/books/เวียดนาม",
          "cover": "/covers/vietnam.png"
        },
        {
          "title": "ไปญี่ปุ่นด้วยเงิน 7,000",
          "author": "ชี้ดาบ",
          "description": "ใช้เงินหลักพันเพื่อเก็บเรื่องเล่าหลักล้าน!",
          "link": "https://www.chidahp.com/books/ไปญี่ปุ่น7000",
          "cover": "/covers/7000yen.png"
        }
      ]
    },
    {
      "emoji": "😤",
      "mood": "โกรธโลก",
      "quote": "โลกมันไม่แฟร์...",
      "quoteLineTwo": "แต่นั่นแหละคือเหตุผลที่เราต้องเขียนเรื่องของเราเอง",
      "gradient": "bg-gradient-to-r from-red-500 to-yellow-600",
      "books": [
        {
          "title": "อยุติธรรม เจนเนอเรชั่น",
          "author": "พังเรนเจอร์ จูเนียร์",
          "description": "เสียงของเจนใหม่ที่ตะโกนใส่ระบบด้วยศิลปะและการเขียน",
          "link": "https://www.chidahp.com/books/อยุติธรรม",
          "cover": "/covers/injustice.png"
        },
        {
          "title": "Age of Corona",
          "author": "ทีมพังเรนเจอร์",
          "description": "รวมบทบันทึกจากยุคโรคระบาด ที่จิกกัดและจุดไฟในใจ",
          "link": "https://www.chidahp.com/books/age-of-corona",
          "cover": "/covers/corona.png"
        }
      ]
    },
    {
      "emoji": "😍",
      "mood": "อินเลิฟ",
      "quote": "ความรักบางครั้งไม่ต้องเข้าใจ...",
      "quoteLineTwo": "แค่รู้สึกไปด้วยใจก็พอ",
      "gradient": "bg-gradient-to-r from-pink-400 to-red-500",
      "books": [
        {
          "title": "ตามติดชีวิตอินเดีย 2",
          "author": "ขิม",
          "description": "ความสัมพันธ์หลากรสชาติในแดนอินเดีย",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย2",
          "cover": "/covers/india2.png"
        },
        {
          "title": "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 1",
          "author": "ชี้ดาบ",
          "description": "การเดินทางของเด็กไทยในอเมริกา ที่เต็มไปด้วยการปิ๊งรักวัยใสกับสาวลูกครึ่งญี่ปุ่น",
          "link": "https://www.chidahp.com/books/1ปีอเมริกา1",
          "cover": "/covers/year1.png"
        }
      ]
    },
    {
      "emoji": "😮‍💨",
      "mood": "หมดไฟ",
      "quote": "ไม่ใช่เพราะเราขี้เกียจ...",
      "quoteLineTwo": "แต่เพราะเราล้าเกินจะอยากทำอะไรอีก",
      "gradient": "bg-gradient-to-r from-zinc-500 to-neutral-700",
      "books": [
        {
          "title": "Route13 Part Two",
          "author": "ชี้ดาบ",
          "description": "ขี่มอเตอร์ไซค์กลางหิมะ ข้ามความกลัว และข้ามใจตัวเอง",
          "link": "https://www.chidahp.com/books/route13-part2",
          "cover": "/covers/route13pt2.png"
        },
        {
          "title": "South Dakota 18+",
          "author": "ชี้ดาบ",
          "description": "ชีวิตจริงไม่ใสสะอาด แต่ก็ยังเดินต่อได้",
          "link": "https://www.chidahp.com/books/south-dakota",
          "cover": "/covers/sd.png"
        },
        {
          "title": "เอเลี่ยนในซานฟรานซิสโก",
          "author": "ท้อป",
          "description": "เขาหนีมาที่นี่ เพื่อหาความหมาย... แต่กลับเจอความว่างเปล่าที่ลึกกว่าเดิม",
          "link": "https://www.chidahp.com/books/เอเลี่ยนในซานฟราน",
          "cover": "/covers/alien.png"
        }
      ]
    },
    {
      "emoji": "🫣",
      "mood": "กลัวความล้มเหลว",
      "quote": "เราไม่ได้กลัวพลาด...",
      "quoteLineTwo": "แต่เรากลัวไม่มีโอกาสเริ่มใหม่อีกครั้ง",
      "gradient": "bg-gradient-to-r from-orange-400 to-red-400",
      "books": [
        {
          "title": "เนิร์ดคลั่ง แว้นผ่าทวีป",
          "author": "ท้อป",
          "description": "จากเด็กเนิร์ดสู่การแว้นในยุโรปเพื่อหาคำตอบชีวิต",
          "link": "https://www.chidahp.com/books/เนิร์ดคลั่ง",
          "cover": "/covers/nerd.png"
        },
        {
          "title": "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 2",
          "author": "ชี้ดาบ",
          "description": "ตอนจบของชีวิตต่างแดน ที่ทิ้งคำถามกับหัวใจไว้มากมาย",
          "link": "https://www.chidahp.com/books/1ปีอเมริกา2",
          "cover": "/covers/year2.png"
        },
        {
          "title": "13 Years After",
          "author": "ชี้ดาบ",
          "description": "บางที...การกลับไป ก็คือทางเดียวที่จะเข้าใจว่า “เราเดินจากอะไรมา”",
          "link": "https://www.chidahp.com/books/13-years-after",
          "cover": "/covers/13years.png"
        }
      ]
    },
    {
      "emoji": "🤔",
      "mood": "ตั้งคำถามกับชีวิต",
      "quote": "ถ้าฉันไม่ใช่แบบที่สังคมคาดหวัง...",
      "quoteLineTwo": "ฉันยังเป็น 'ฉัน' ได้อยู่ไหม?",
      "gradient": "bg-gradient-to-r from-slate-500 to-gray-800",
      "books": [
        {
          "title": "0 ปี อเมริกา",
          "author": "ชี้ดาบ x Charlie D.",
          "description": "นิยายโลกคู่ขนานของเจม ถ้าเขาไม่ไปอเมริกา ชีวิตจะเป็นยังไง?",
          "link": "https://www.chidahp.com/books/0ปีอเมริกา",
          "cover": "/covers/0year.png"
        },
        {
          "title": "พู่กันเปื้อนสี",
          "author": "หงส์ | ชี้ดาบ",
          "description": "เรื่องราวของคนที่ไม่มีโอกาสเลือกมากนัก แต่ต้องอยู่กับชีวิตที่เลือกเขาแทน",
          "link": "https://www.chidahp.com/books/พู่กันเปื้อนสี",
          "cover": "/covers/poogun.png"
        },
        {
          "title": "อยุติธรรม เจนเนอเรชั่น",
          "author": "พังเรนเจอร์ จูเนียร์",
          "description": "รวมเรื่องสั้นสะท้อนสังคม ความเจ็บปวดของเด็กที่ถูกระบบบีบจนหายใจไม่ออก",
          "link": "https://www.chidahp.com/books/อยุติธรรม",
          "cover": "/covers/injustice.png"
        }
      ]
    },
    {
      "emoji": "🎨",
      "mood": "อยากรู้จักโลกมากขึ้น",
      "quote": "เพราะโลกไม่ได้มีแค่เรา...",
      "quoteLineTwo": "บางทีเราแค่ยังไม่เคยออกไปพอ",
      "gradient": "bg-gradient-to-r from-cyan-500 to-emerald-400",
      "books": [
        {
          "title": "ตามติดชีวิตอินเดีย",
          "author": "ขิม",
          "description": "อินเดียแบบเรียลๆ ทั้งเหม็น ทั้งงง ทั้งมีเสน่ห์",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย",
          "cover": "/covers/india.png"
        },
        {
          "title": "หลงจริงเวียดนาม",
          "author": "ชี้ดาบ",
          "description": "เรื่องราวเรียลทริปที่เวียดนาม ที่จริงยิ่งกว่านิยาย",
          "link": "https://www.chidahp.com/books/เวียดนาม",
          "cover": "/covers/vietnam.png"
        },
        {
          "title": "Indialy",
          "author": "ชี้ดาบ",
          "description": "อินเดียในสายตาแบบอังกฤษล้วนๆ เรียล เรียบ แรง",
          "link": "https://www.chidahp.com/books/indialy",
          "cover": "/covers/indialy.png"
        }
      ]
    }
  ];
  

  return Response.json(data);
}
