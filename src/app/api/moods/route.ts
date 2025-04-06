export async function GET() {
  const data = [
    {
      "emoji": "😵",
      "mood": "สับสน",
      "subfeelings": [
        "รู้สึกโดดเดี่ยว",
        "ลังเล ตัดสินใจไม่ได้",
        "ไม่แน่ใจว่าอะไรคือสิ่งที่ใช่",
        "ขาดเป้าหมาย",
        "ไม่รู้ว่ากำลังทำอะไรอยู่"
      ],
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
          "cover": "/covers/poogun.png",
          "matchSubfeelings": ["รู้สึกโดดเดี่ยว", "ไม่รู้ว่ากำลังทำอะไรอยู่"]
        },
        {
          "title": "0 ปี อเมริกา",
          "author": "ชี้ดาบ x Charlie D.",
          "description": "นิยายโลกคู่ขนานของเจม ถ้าเขาไม่ไปอเมริกา ชีวิตจะเป็นยังไง?",
          "link": "https://www.chidahp.com/books/0ปีอเมริกา",
          "cover": "/covers/0year.png",
          "matchSubfeelings": ["ลังเล ตัดสินใจไม่ได้", "ขาดเป้าหมาย"]
        },
        {
          "title": "Route13 Part One",
          "author": "ชี้ดาบ",
          "description": "เริ่มต้นการเดินทางเพื่อหาความหมายชีวิต ผ่านถนน 7,000 กิโล",
          "link": "https://www.chidahp.com/books/route13-part1",
          "cover": "/covers/route13pt1.png",
          "matchSubfeelings": ["ไม่แน่ใจว่าอะไรคือสิ่งที่ใช่", "ขาดเป้าหมาย", "ลังเล ตัดสินใจไม่ได้"]
        }
      ]
    },    
    {
      "emoji": "🥲",
      "mood": "เศร้า",
      "subfeelings": [
        "คิดถึงอดีต",
        "รู้สึกไม่เป็นที่รัก",
        "แบกรับมากเกินไป",
        "สูญเสีย",
        "โดดเดี่ยว"
      ],
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
          "cover": "/covers/13years.png",
          "matchSubfeelings": ["คิดถึงอดีต", "สูญเสีย"]
        },
        {
          "title": "อยุติธรรม เจนเนอเรชั่น",
          "author": "พังเรนเจอร์ จูเนียร์",
          "description": "รวมเรื่องสั้นสะท้อนสังคม ความเจ็บปวดของเด็กที่ถูกระบบบีบจนหายใจไม่ออก",
          "link": "https://www.chidahp.com/books/อยุติธรรม",
          "cover": "/covers/injustice.png",
          "matchSubfeelings": ["แบกรับมากเกินไป", "รู้สึกไม่เป็นที่รัก"]
        },
        {
          "title": "เอเลี่ยนในซานฟรานซิสโก",
          "author": "ท้อป",
          "description": "เขาหนีมาที่นี่ เพื่อหาความหมาย... แต่กลับเจอความว่างเปล่าที่ลึกกว่าเดิม",
          "quote": "เราไม่ใช่ของกันและกัน แม้จะอยากเป็น",
          "link": "https://www.chidahp.com/books/เอเลี่ยนในซานฟราน",
          "cover": "/covers/alien.png",
          "matchSubfeelings": ["โดดเดี่ยว", "รู้สึกไม่เป็นที่รัก"]
        }
      ]
    },
    {
      "emoji": "💪",
      "mood": "ต้องการกำลังใจ",
      "subfeelings": [
        "รู้สึกไร้ค่า",
        "ไม่กล้าเริ่มใหม่",
        "ล้มเหลวมาเยอะ",
        "เหนื่อยกับความคาดหวัง",
        "กำลังท้อแท้"
      ],
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
          "cover": "/covers/jamesisback.png",
          "matchSubfeelings": ["เหนื่อยกับความคาดหวัง", "ล้มเหลวมาเยอะ"]
        },
        {
          "title": "Route13 Part Two",
          "author": "ชี้ดาบ",
          "description": "ขี่มอเตอร์ไซค์กลางหิมะ ข้ามความกลัว และข้ามใจตัวเอง",
          "link": "https://www.chidahp.com/books/route13-part2",
          "cover": "/covers/route13pt2.png",
          "matchSubfeelings": ["ไม่กล้าเริ่มใหม่", "กำลังท้อแท้"]
        },
        {
          "title": "เนิร์ดคลั่ง แว้นผ่าทวีป",
          "author": "ท้อป",
          "description": "จากเด็กเนิร์ดสู่การแว้นในยุโรปเพื่อหาคำตอบชีวิต",
          "link": "https://www.chidahp.com/books/เนิร์ดคลั่ง",
          "cover": "/covers/nerd.png",
          "matchSubfeelings": ["รู้สึกไร้ค่า", "ไม่กล้าเริ่มใหม่"]
        },
        {
          "title": "South Dakota 18+",
          "author": "ชี้ดาบ",
          "description": "ชีวิตจริงไม่ใสสะอาด แต่ก็ยังเดินต่อได้",
          "link": "https://www.chidahp.com/books/south-dakota",
          "cover": "/covers/sd.png",
          "matchSubfeelings": ["ล้มเหลวมาเยอะ", "กำลังท้อแท้"]
        }
      ]
    },
    {
      "emoji": "🤪",
      "mood": "อยากบ้า",
      "subfeelings": [
        "เครียดเกินไป",
        "อยากปลดปล่อย",
        "อยากหัวเราะแบบไม่คิดมาก",
        "เบื่อชีวิตแบบเดิม",
        "อยากใช้ชีวิตแบบไม่แคร์"
      ],
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
          "cover": "/covers/natto.png",
          "matchSubfeelings": [
            "อยากปลดปล่อย",
            "เบื่อชีวิตแบบเดิม",
            "อยากใช้ชีวิตแบบไม่แคร์"
          ]
        },
        {
          "title": "พังเรนเจอร์",
          "author": "ชี้ดาบ & ทีมพังเรนเจอร์",
          "description": "รวมเรื่องสั้นแสบๆ ของแก๊งวัยรุ่นที่พร้อมปั่นโลกทั้งใบด้วยมุกบ้าบอ",
          "link": "https://www.chidahp.com/books/พังเรนเจอร์",
          "cover": "/covers/pang.png",
          "matchSubfeelings": [
            "เครียดเกินไป",
            "อยากหัวเราะแบบไม่คิดมาก",
            "อยากใช้ชีวิตแบบไม่แคร์"
          ]
        }
      ]
    },
    {
      "emoji": "🧘‍♂️",
      "mood": "อยากเข้าใจตัวเอง",
      "subfeelings": [
        "ลังเล ตัดสินใจไม่ได้",
        "ไม่รู้ว่าตัวเองต้องการอะไร",
        "อยากนิ่งๆ เพื่อฟังหัวใจตัวเอง",
        "เพิ่งเจอเรื่องที่สั่นคลอนตัวตน",
        "คิดเยอะจนไม่แน่ใจอะไรเลย"
      ],
      "quote": "ทุกคำถามในใจ อาจไม่ได้ต้องการคำตอบ...",
      "quoteLineTwo": "แต่อาจต้องการแค่ฟังตัวเอง",
      "gradient": "bg-gradient-to-r from-teal-500 to-green-500",
      "books": [
        {
          "title": "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 2",
          "author": "ชี้ดาบ",
          "description": "ตอนจบของชีวิตต่างแดน ที่ทิ้งคำถามกับหัวใจไว้มากมาย",
          "link": "https://www.chidahp.com/books/1ปีอเมริกา2",
          "cover": "/covers/year2.png",
          "matchSubfeelings": [
            "ลังเล ตัดสินใจไม่ได้",
            "คิดเยอะจนไม่แน่ใจอะไรเลย"
          ]
        },
        {
          "title": "ตามติดชีวิตอินเดีย 2",
          "author": "ขิม",
          "description": "อินเดียรอบสอง ที่เรื่องรักกับเรื่องชีวิตสลับกันเล่า",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย2",
          "cover": "/covers/india2.png",
          "matchSubfeelings": [
            "อยากนิ่งๆ เพื่อฟังหัวใจตัวเอง",
            "เพิ่งเจอเรื่องที่สั่นคลอนตัวตน"
          ]
        },
        {
          "title": "13 Years After",
          "author": "ชี้ดาบ",
          "description": "บางที...การกลับไป ก็คือทางเดียวที่จะเข้าใจว่า “เราเดินจากอะไรมา”",
          "link": "https://www.chidahp.com/books/13-years-after",
          "cover": "/covers/13years.png",
          "matchSubfeelings": [
            "ไม่รู้ว่าตัวเองต้องการอะไร",
            "เพิ่งเจอเรื่องที่สั่นคลอนตัวตน"
          ]
        }
      ]
    },
    {
      "emoji": "🌏",
      "mood": "อยากไปไกลๆ",
      "subfeelings": [
        "หลบความวุ่นวาย",
        "เหนื่อยกับที่เดิมๆ",
        "อยากออกไปเจออะไรใหม่ๆ",
        "อยากรีเซ็ตชีวิต",
        "หนีความเศร้า"
      ],
      "quote": "บางครั้งปลายทางไม่สำคัญ",
      "quoteLineTwo": "เท่าการได้ออกเดินทาง...",
      "gradient": "bg-gradient-to-r from-indigo-500 to-blue-500",
      "books": [
        {
          "title": "ตามติดชีวิตอินเดีย",
          "author": "ขิม",
          "description": "อินเดียแบบเรียลๆ ทั้งเหม็น ทั้งงง ทั้งมีเสน่ห์",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย",
          "cover": "/covers/india.png",
          "matchSubfeelings": [
            "หลบความวุ่นวาย",
            "อยากรีเซ็ตชีวิต"
          ]
        },
        {
          "title": "หลงจริงเวียดนาม",
          "author": "ชี้ดาบ",
          "description": "เรื่องราวเรียลทริปที่เวียดนาม ที่จริงยิ่งกว่านิยาย",
          "link": "https://www.chidahp.com/books/เวียดนาม",
          "cover": "/covers/vietnam.png",
          "matchSubfeelings": [
            "เหนื่อยกับที่เดิมๆ",
            "อยากออกไปเจออะไรใหม่ๆ"
          ]
        },
        {
          "title": "ไปญี่ปุ่นด้วยเงิน 7,000",
          "author": "ชี้ดาบ",
          "description": "ใช้เงินหลักพันเพื่อเก็บเรื่องเล่าหลักล้าน!",
          "link": "https://www.chidahp.com/books/ไปญี่ปุ่น7000",
          "cover": "/covers/7000yen.png",
          "matchSubfeelings": [
            "หนีความเศร้า",
            "อยากออกไปเจออะไรใหม่ๆ"
          ]
        }
      ]
    },
    {
      "emoji": "😤",
      "mood": "โกรธโลก",
      "subfeelings": [
        "ถูกเอาเปรียบ",
        "ไม่ยุติธรรม",
        "ถูกกดทับ",
        "ถูกทำให้เงียบ",
        "รู้สึกโลกไม่เห็นหัวเรา"
      ],
      "quote": "โลกมันไม่แฟร์...",
      "quoteLineTwo": "แต่นั่นแหละคือเหตุผลที่เราต้องเขียนเรื่องของเราเอง",
      "gradient": "bg-gradient-to-r from-red-500 to-yellow-600",
      "books": [
        {
          "title": "อยุติธรรม เจนเนอเรชั่น",
          "author": "พังเรนเจอร์ จูเนียร์",
          "description": "เสียงของเจนใหม่ที่ตะโกนใส่ระบบด้วยศิลปะและการเขียน",
          "link": "https://www.chidahp.com/books/อยุติธรรม",
          "cover": "/covers/injustice.png",
          "matchSubfeelings": [
            "ถูกกดทับ",
            "ไม่ยุติธรรม",
            "ถูกเอาเปรียบ"
          ]
        },
        {
          "title": "Age of Corona",
          "author": "ทีมพังเรนเจอร์",
          "description": "รวมบทบันทึกจากยุคโรคระบาด ที่จิกกัดและจุดไฟในใจ",
          "link": "https://www.chidahp.com/books/age-of-corona",
          "cover": "/covers/corona.png",
          "matchSubfeelings": [
            "ถูกทำให้เงียบ",
            "รู้สึกโลกไม่เห็นหัวเรา"
          ]
        }
      ]
    },
    {
      "emoji": "😍",
      "mood": "อินเลิฟ",
      "subfeelings": [
        "คิดถึงใครบางคน",
        "เพิ่งตกหลุมรัก",
        "รักที่ไม่สมหวัง",
        "ความสัมพันธ์กำลังเปลี่ยนไป",
        "อบอุ่นแต่ก็สับสน"
      ],
      "quote": "ความรักบางครั้งไม่ต้องเข้าใจ...",
      "quoteLineTwo": "แค่รู้สึกไปด้วยใจก็พอ",
      "gradient": "bg-gradient-to-r from-pink-400 to-red-500",
      "books": [
        {
          "title": "ตามติดชีวิตอินเดีย 2",
          "author": "ขิม",
          "description": "ความสัมพันธ์หลากรสชาติในแดนอินเดีย",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย2",
          "cover": "/covers/india2.png",
          "matchSubfeelings": [
            "ความสัมพันธ์กำลังเปลี่ยนไป",
            "อบอุ่นแต่ก็สับสน",
            "รักที่ไม่สมหวัง"
          ]
        },
        {
          "title": "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 1",
          "author": "ชี้ดาบ",
          "description": "การเดินทางของเด็กไทยในอเมริกา ที่เต็มไปด้วยการปิ๊งรักวัยใสกับสาวลูกครึ่งญี่ปุ่น",
          "link": "https://www.chidahp.com/books/1ปีอเมริกา1",
          "cover": "/covers/year1.png",
          "matchSubfeelings": [
            "เพิ่งตกหลุมรัก",
            "คิดถึงใครบางคน"
          ]
        }
      ]
    },
    {
      "emoji": "😮‍💨",
      "mood": "หมดไฟ",
      "subfeelings": [
        "เหนื่อยล้าเกินจะเริ่ม",
        "รู้สึกว่าทำอะไรไม่ไหว",
        "อยากหายไปสักพัก",
        "ชีวิตไม่คืบหน้า",
        "ท้อแท้กับตัวเอง"
      ],
      "quote": "ไม่ใช่เพราะเราขี้เกียจ...",
      "quoteLineTwo": "แต่เพราะเราล้าเกินจะอยากทำอะไรอีก",
      "gradient": "bg-gradient-to-r from-zinc-500 to-neutral-700",
      "books": [
        {
          "title": "Route13 Part Two",
          "author": "ชี้ดาบ",
          "description": "ขี่มอเตอร์ไซค์กลางหิมะ ข้ามความกลัว และข้ามใจตัวเอง",
          "link": "https://www.chidahp.com/books/route13-part2",
          "cover": "/covers/route13pt2.png",
          "matchSubfeelings": [
            "เหนื่อยล้าเกินจะเริ่ม",
            "ชีวิตไม่คืบหน้า",
            "ท้อแท้กับตัวเอง"
          ]
        },
        {
          "title": "South Dakota 18+",
          "author": "ชี้ดาบ",
          "description": "ชีวิตจริงไม่ใสสะอาด แต่ก็ยังเดินต่อได้",
          "link": "https://www.chidahp.com/books/south-dakota",
          "cover": "/covers/sd.png",
          "matchSubfeelings": [
            "รู้สึกว่าทำอะไรไม่ไหว",
            "ชีวิตไม่คืบหน้า",
            "ท้อแท้กับตัวเอง"
          ]
        },
        {
          "title": "เอเลี่ยนในซานฟรานซิสโก",
          "author": "ท้อป",
          "description": "เขาหนีมาที่นี่ เพื่อหาความหมาย... แต่กลับเจอความว่างเปล่าที่ลึกกว่าเดิม",
          "link": "https://www.chidahp.com/books/เอเลี่ยนในซานฟราน",
          "cover": "/covers/alien.png",
          "matchSubfeelings": [
            "อยากหายไปสักพัก",
            "เหนื่อยล้าเกินจะเริ่ม",
            "รู้สึกว่าทำอะไรไม่ไหว"
          ]
        }
      ]
    },
    {
      "emoji": "🫣",
      "mood": "กลัวความล้มเหลว",
      "subfeelings": [
        "กลัวเริ่มใหม่แล้วพังอีก",
        "ไม่มั่นใจในตัวเอง",
        "แบกความคาดหวังไว้มากเกินไป",
        "เปรียบเทียบตัวเองกับคนอื่น",
        "ลังเลไม่กล้าตัดสินใจ"
      ],
      "quote": "เราไม่ได้กลัวพลาด...",
      "quoteLineTwo": "แต่เรากลัวไม่มีโอกาสเริ่มใหม่อีกครั้ง",
      "gradient": "bg-gradient-to-r from-orange-400 to-red-400",
      "books": [
        {
          "title": "เนิร์ดคลั่ง แว้นผ่าทวีป",
          "author": "ท้อป",
          "description": "จากเด็กเนิร์ดสู่การแว้นในยุโรปเพื่อหาคำตอบชีวิต",
          "link": "https://www.chidahp.com/books/เนิร์ดคลั่ง",
          "cover": "/covers/nerd.png",
          "matchSubfeelings": [
            "ไม่มั่นใจในตัวเอง",
            "กลัวเริ่มใหม่แล้วพังอีก",
            "เปรียบเทียบตัวเองกับคนอื่น"
          ]
        },
        {
          "title": "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 2",
          "author": "ชี้ดาบ",
          "description": "ตอนจบของชีวิตต่างแดน ที่ทิ้งคำถามกับหัวใจไว้มากมาย",
          "link": "https://www.chidahp.com/books/1ปีอเมริกา2",
          "cover": "/covers/year2.png",
          "matchSubfeelings": [
            "ลังเลไม่กล้าตัดสินใจ",
            "แบกความคาดหวังไว้มากเกินไป",
            "กลัวเริ่มใหม่แล้วพังอีก"
          ]
        },
        {
          "title": "13 Years After",
          "author": "ชี้ดาบ",
          "description": "บางที...การกลับไป ก็คือทางเดียวที่จะเข้าใจว่า “เราเดินจากอะไรมา”",
          "link": "https://www.chidahp.com/books/13-years-after",
          "cover": "/covers/13years.png",
          "matchSubfeelings": [
            "กลัวเริ่มใหม่แล้วพังอีก",
            "ไม่มั่นใจในตัวเอง",
            "ลังเลไม่กล้าตัดสินใจ"
          ]
        }
      ]
    },    
    {
      "emoji": "🤔",
      "mood": "ตั้งคำถามกับชีวิต",
      "subfeelings": [
        "ไม่แน่ใจว่าตัวเองต้องการอะไร",
        "รู้สึกไม่เข้าพวก",
        "สังคมคาดหวังสูงเกินไป",
        "กลัวจะไม่เป็นคนที่ใช่",
        "อยากค้นหาความหมายชีวิต"
      ],
      "quote": "ถ้าฉันไม่ใช่แบบที่สังคมคาดหวัง...",
      "quoteLineTwo": "ฉันยังเป็น 'ฉัน' ได้อยู่ไหม?",
      "gradient": "bg-gradient-to-r from-slate-500 to-gray-800",
      "books": [
        {
          "title": "0 ปี อเมริกา",
          "author": "ชี้ดาบ x Charlie D.",
          "description": "นิยายโลกคู่ขนานของเจม ถ้าเขาไม่ไปอเมริกา ชีวิตจะเป็นยังไง?",
          "link": "https://www.chidahp.com/books/0ปีอเมริกา",
          "cover": "/covers/0year.png",
          "matchSubfeelings": [
            "ไม่แน่ใจว่าตัวเองต้องการอะไร",
            "อยากค้นหาความหมายชีวิต",
            "กลัวจะไม่เป็นคนที่ใช่"
          ]
        },
        {
          "title": "พู่กันเปื้อนสี",
          "author": "หงส์ | ชี้ดาบ",
          "description": "เรื่องราวของคนที่ไม่มีโอกาสเลือกมากนัก แต่ต้องอยู่กับชีวิตที่เลือกเขาแทน",
          "link": "https://www.chidahp.com/books/พู่กันเปื้อนสี",
          "cover": "/covers/poogun.png",
          "matchSubfeelings": [
            "สังคมคาดหวังสูงเกินไป",
            "รู้สึกไม่เข้าพวก"
          ]
        },
        {
          "title": "อยุติธรรม เจนเนอเรชั่น",
          "author": "พังเรนเจอร์ จูเนียร์",
          "description": "รวมเรื่องสั้นสะท้อนสังคม ความเจ็บปวดของเด็กที่ถูกระบบบีบจนหายใจไม่ออก",
          "link": "https://www.chidahp.com/books/อยุติธรรม",
          "cover": "/covers/injustice.png",
          "matchSubfeelings": [
            "สังคมคาดหวังสูงเกินไป",
            "รู้สึกไม่เข้าพวก",
            "กลัวจะไม่เป็นคนที่ใช่"
          ]
        }
      ]
    },
    {
      "emoji": "🎨",
      "mood": "อยากรู้จักโลกมากขึ้น",
      "subfeelings": [
        "อยากออกจาก comfort zone",
        "อยากเข้าใจวัฒนธรรมใหม่",
        "เบื่อชีวิตเดิมๆ",
        "อยากเจอมุมมองใหม่ๆ",
        "รู้สึกว่าโลกกว้างแต่เราแคบ"
      ],
      "quote": "เพราะโลกไม่ได้มีแค่เรา...",
      "quoteLineTwo": "บางทีเราแค่ยังไม่เคยออกไปพอ",
      "gradient": "bg-gradient-to-r from-cyan-500 to-emerald-400",
      "books": [
        {
          "title": "ตามติดชีวิตอินเดีย",
          "author": "ขิม",
          "description": "อินเดียแบบเรียลๆ ทั้งเหม็น ทั้งงง ทั้งมีเสน่ห์",
          "link": "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย",
          "cover": "/covers/india.png",
          "matchSubfeelings": [
            "อยากเข้าใจวัฒนธรรมใหม่",
            "อยากออกจาก comfort zone",
            "รู้สึกว่าโลกกว้างแต่เราแคบ"
          ]
        },
        {
          "title": "หลงจริงเวียดนาม",
          "author": "ชี้ดาบ",
          "description": "เรื่องราวเรียลทริปที่เวียดนาม ที่จริงยิ่งกว่านิยาย",
          "link": "https://www.chidahp.com/books/เวียดนาม",
          "cover": "/covers/vietnam.png",
          "matchSubfeelings": [
            "เบื่อชีวิตเดิมๆ",
            "อยากเจอมุมมองใหม่ๆ",
            "อยากออกจาก comfort zone"
          ]
        },
        {
          "title": "Indialy",
          "author": "ชี้ดาบ",
          "description": "อินเดียในสายตาแบบอังกฤษล้วนๆ เรียล เรียบ แรง",
          "link": "https://www.chidahp.com/books/indialy",
          "cover": "/covers/indialy.png",
          "matchSubfeelings": [
            "อยากเข้าใจวัฒนธรรมใหม่",
            "อยากเจอมุมมองใหม่ๆ"
          ]
        }
      ]
    }    
  ];
  

  return Response.json(data);
}
