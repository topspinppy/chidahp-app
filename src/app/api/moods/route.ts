export async function GET() {
  const data = [
    {
      emoji: "😵",
      mood: "สับสน",
      gradient: "bg-gradient-to-r from-blue-500 to-purple-500",
      books: [
        {
          title: "พู่กันเปื้อนสี",
          author: "หงส์ | ชี้ดาบ",
          description: "เรื่องราวของคนที่ไม่มีโอกาสเลือกมากนัก แต่ต้องอยู่กับชีวิตที่เลือกเขาแทน",
          quote: "ฉันไม่มีสิทธิ์เลือก แต่ฉันยังมีหัวใจ",
          link: "https://www.chidahp.com/books/พู่กันเปื้อนสี",
          cover: "/covers/poogan.jpg"
        },
        {
          title: "0 ปี อเมริกา",
          author: "ชี้ดาบ x Charlie D.",
          description: "นิยายโลกคู่ขนานของเจม ถ้าเขาไม่ไปอเมริกา ชีวิตจะเป็นยังไง?",
          link: "https://www.chidahp.com/books/0ปีอเมริกา",
          cover: "/covers/0usa.jpg"
        },
        {
          title: "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 1",
          author: "ชี้ดาบ",
          description: "การเดินทางของเด็กไทยในอเมริกา ที่เต็มไปด้วยความงงและไม่เข้าใจระบบ",
          quote: "ชีวิตต่างแดนไม่ใช่ความฝันเสมอไป",
          link: "https://www.chidahp.com/books/1ปีอเมริกา1",
          cover: "/covers/year1.jpg"
        }
      ]
    },
    {
      emoji: "🥲",
      mood: "เศร้า",
      gradient: "bg-gradient-to-r from-gray-500 to-blue-700",
      books: [
        {
          title: "13 Years After",
          author: "ชี้ดาบ",
          description: "การเดินทางกลับมาทบทวนชีวิตหลัง 13 ปีเต็มจากวันที่เคยฝัน",
          quote: "ฝันเก่าก็ยังมีค่า แม้มันจะเปลี่ยนไปแล้ว",
          link: "https://www.chidahp.com/books/13-years-after",
          cover: "/covers/13years.jpg"
        },
        {
          title: "อยุติธรรม เจนเนอเรชั่น",
          author: "พังเรนเจอร์ จูเนียร์",
          description: "รวมเรื่องสั้นสะท้อนสังคม ความเจ็บปวดของเด็กที่ถูกระบบบีบจนหายใจไม่ออก",
          link: "https://www.chidahp.com/books/อยุติธรรม",
          cover: "/covers/injustice.jpg"
        },
        {
          title: "เอเลี่ยนในซานฟรานซิสโก",
          author: "ท้อป",
          description: "ความสัมพันธ์ล้มเหลวในเมืองในฝันของใครหลายคน",
          quote: "เราไม่ใช่ของกันและกัน แม้จะอยากเป็น",
          link: "https://www.chidahp.com/books/เอเลี่ยนในซานฟราน",
          cover: "/covers/alien.jpg"
        }
      ]
    },
    {
      emoji: "💪",
      mood: "ต้องการกำลังใจ",
      gradient: "bg-gradient-to-r from-green-500 to-teal-500",
      books: [
        {
          title: "James is Back",
          author: "ชี้ดาบ",
          description: "เด็กไทยกลับจากอเมริกา มาเจอการศึกษาไทย ชีวิตฮาแต่ชิบหายจริง",
          quote: "หัวเราะให้สุด แล้วเดินต่อไปให้สุดด้วย",
          link: "https://www.chidahp.com/books/james-is-back",
          cover: "/covers/jamesisback.jpg"
        },
        {
          title: "Route13 Part Two",
          author: "ชี้ดาบ",
          description: "ขี่มอเตอร์ไซค์กลางหิมะ ข้ามความกลัว และข้ามใจตัวเอง",
          link: "https://www.chidahp.com/books/route13-part2",
          cover: "/covers/route13pt2.jpg"
        },
        {
          title: "เนิร์ดคลั่ง แว้นผ่าทวีป",
          author: "ท้อป",
          description: "จากเด็กเนิร์ดสู่การแว้นในยุโรปเพื่อหาคำตอบชีวิต",
          link: "https://www.chidahp.com/books/เนิร์ดคลั่ง",
          cover: "/covers/nerd.jpg"
        },
        {
          title: "South Dakota 18+",
          author: "ชี้ดาบ",
          description: "ชีวิตจริงไม่ใสสะอาด แต่ก็ยังเดินต่อได้",
          link: "https://www.chidahp.com/books/south-dakota",
          cover: "/covers/sd.jpg"
        }
      ]
    },
    {
      emoji: "🤪",
      mood: "อยากบ้า",
      gradient: "bg-gradient-to-r from-purple-500 to-pink-500",
      books: [
        {
          title: "นัตโตะ คนชุ่ยตะลุยญี่ปุ่น",
          author: "KIMZA",
          description: "รวมความชุ่ยในแดนอาทิตย์อุทัย ที่ทั้งฮา ทั้ง WTF!",
          quote: "ชุ่ยให้สุด แล้วหยุดที่ซูชิ!",
          link: "https://www.chidahp.com/books/นัตโตะ",
          cover: "/covers/natto.jpg"
        },
        {
          title: "พังเรนเจอร์ FINAL",
          author: "ชี้ดาบและทีม",
          description: "รวมเรื่องพังสุดขีด ที่บอกว่าความพังก็มีพลังได้",
          link: "https://www.chidahp.com/books/พังเรนเจอร์",
          cover: "/covers/pang-final.jpg"
        },
        {
          title: "ไปญี่ปุ่นด้วยเงิน 7,000",
          author: "ชี้ดาบ",
          description: "ใช้เงินหลักพันเพื่อเก็บเรื่องเล่าหลักล้าน!",
          quote: "ไม่ต้องรวย... แค่กล้าก็ไปได้",
          link: "https://www.chidahp.com/books/ไปญี่ปุ่น7000",
          cover: "/covers/7000yen.jpg"
        }
      ]
    },
    {
      emoji: "🧘‍♂️",
      mood: "อยากเข้าใจตัวเอง",
      gradient: "bg-gradient-to-r from-teal-500 to-green-500",
      books: [
        {
          title: "Route13 Part One",
          author: "ชี้ดาบ",
          description: "เริ่มต้นการเดินทางเพื่อหาความหมายชีวิต ผ่านถนน 7,000 กิโล",
          link: "https://www.chidahp.com/books/route13-part1",
          cover: "/covers/route13pt1.jpg"
        },
        {
          title: "1 ปี กับชีวิตที่ผมอยู่ในอเมริกา 2",
          author: "ชี้ดาบ",
          description: "ตอนจบของชีวิตต่างแดน ที่ทิ้งคำถามกับหัวใจไว้มากมาย",
          link: "https://www.chidahp.com/books/1ปีอเมริกา2",
          cover: "/covers/year2.jpg"
        },
        {
          title: "ตามติดชีวิตอินเดีย 2",
          author: "ขิม",
          description: "อินเดียรอบสอง ที่เรื่องรักกับเรื่องชีวิตสลับกันเล่า",
          link: "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย2",
          cover: "/covers/india2.jpg"
        }
      ]
    },
    {
      emoji: "🌏",
      mood: "อยากไปไกลๆ",
      gradient: "bg-gradient-to-r from-indigo-500 to-blue-500",
      books: [
        {
          title: "ตามติดชีวิตอินเดีย",
          author: "ขิม",
          description: "อินเดียแบบเรียลๆ ทั้งเหม็น ทั้งงง ทั้งมีเสน่ห์",
          link: "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย",
          cover: "/covers/india1.jpg"
        },
        {
          title: "หลงจริงเวียดนาม",
          author: "ชี้ดาบ",
          description: "เรื่องราวเรียลทริปที่เวียดนาม ที่จริงยิ่งกว่านิยาย",
          link: "https://www.chidahp.com/books/เวียดนาม",
          cover: "/covers/vietnam.jpg"
        },
        {
          title: "Route13 FULL Version",
          author: "ชี้ดาบ",
          description: "รวม Route13 ทั้งสองภาคในเล่มเดียว สู่เส้นทางใหญ่ของชีวิต",
          link: "https://www.chidahp.com/books/route13-full",
          cover: "/covers/route13full.jpg"
        },
        {
          title: "Indialy",
          author: "ชี้ดาบ",
          description: "อินเดียในสายตาแบบอังกฤษล้วนๆ เรียล เรียบ แรง",
          link: "https://www.chidahp.com/books/indialy",
          cover: "/covers/indialy.jpg"
        }
      ]
    },
    {
      emoji: "😤",
      mood: "โกรธโลก",
      gradient: "bg-gradient-to-r from-red-500 to-yellow-600",
      books: [
        {
          title: "อยุติธรรม เจนเนอเรชั่น",
          author: "พังเรนเจอร์ จูเนียร์",
          description: "เสียงของเจนใหม่ที่ตะโกนใส่ระบบด้วยศิลปะและการเขียน",
          link: "https://www.chidahp.com/books/อยุติธรรม",
          cover: "/covers/injustice.jpg"
        },
        {
          title: "พังเรนเจอร์ FINAL",
          author: "ชี้ดาบและทีม",
          description: "รวมเรื่องพังสุดขีด ที่บอกว่าความพังก็มีพลังได้",
          link: "https://www.chidahp.com/books/พังเรนเจอร์",
          cover: "/covers/pang-final.jpg"
        },
        {
          title: "Age of Corona",
          author: "ทีมพังเรนเจอร์",
          description: "รวมบทบันทึกจากยุคโรคระบาด ที่จิกกัดและจุดไฟในใจ",
          link: "https://www.chidahp.com/books/age-of-corona",
          cover: "/covers/corona.jpg"
        }
      ]
    },
    {
      emoji: "😍",
      mood: "อินเลิฟ",
      gradient: "bg-gradient-to-r from-pink-400 to-red-500",
      books: [
        {
          title: "ตามติดชีวิตอินเดีย 2",
          author: "ขิม",
          description: "ความสัมพันธ์หลากรสชาติในแดนอินเดีย",
          link: "https://www.chidahp.com/books/ตามติดชีวิตอินเดีย2",
          cover: "/covers/india2.jpg"
        },
        {
          title: "เอเลี่ยนในซานฟรานซิสโก",
          author: "ท้อป",
          description: "ความรักที่หายไป กับเมืองที่ไม่ได้ฝัน",
          link: "https://www.chidahp.com/books/เอเลี่ยนในซานฟราน",
          cover: "/covers/alien.jpg"
        }
      ]
    }
  ];

  return Response.json(data);
}
