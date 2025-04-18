"use client";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 font-sans">
      <h1 className="text-4xl font-black text-violet-800 mb-6 text-center">
        🛡️ นโยบายความเป็นส่วนตัว (Privacy Policy)
      </h1>

      <p className="text-sm text-gray-500 mb-8 text-center">
        ปรับปรุงล่าสุด: 18 เมษายน 2568
      </p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">📌 สาระสำคัญ</h2>
        <p>
          สำนักพิมพ์ชี้ดาบ และระบบ Cardtel Live ให้ความสำคัญสูงสุดต่อความเป็นส่วนตัวของผู้ใช้งานทุกท่าน
          เราตระหนักดีว่า ข้อมูลส่วนบุคคลเป็นทรัพย์สินที่มีค่า และควรได้รับการจัดการด้วยความรับผิดชอบสูงสุด
          เราขอยืนยันว่า ข้อมูลที่คุณให้กับเราจะถูกนำไปใช้เพื่อวัตถุประสงค์ในการพัฒนาประสบการณ์การใช้งานเท่านั้น
          และจะถูกจัดเก็บภายใต้มาตรการรักษาความปลอดภัยที่รัดกุมและเชื่อถือได้
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🔍 ข้อมูลที่เราเก็บ</h2>
        <p>เพื่อให้ระบบสามารถทำงานได้อย่างมีประสิทธิภาพ เราจะเก็บข้อมูลบางประเภทจากผู้ใช้งาน ซึ่งได้แก่:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>ข้อความที่คุณกรอกไว้ในแบบฟอร์ม (Feedback)</li>
          <li>ชื่อเล่น (กรณีที่คุณระบุ)</li>
          <li>การ์ดความรู้สึกที่คุณเลือก</li>
          <li>รายการหนังสือที่ระบบแนะนำให้คุณ</li>
          <li>ข้อมูลเกี่ยวกับอุปกรณ์ เช่น ประเภทเบราว์เซอร์ (User Agent)</li>
          <li>ตำแหน่งโดยประมาณ (เมืองและประเทศที่อ้างอิงจาก IP Address)</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🎯 จุดประสงค์ในการเก็บข้อมูล</h2>
        <p>ข้อมูลที่เราเก็บจะถูกนำไปใช้เพื่อวัตถุประสงค์ดังต่อไปนี้:</p>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>วิเคราะห์พฤติกรรมผู้ใช้ เพื่อพัฒนาเนื้อหาและประสบการณ์การใช้งาน</li>
          <li>ปรับปรุงระบบจับคู่หนังสือให้มีความแม่นยำและตรงใจผู้ใช้งานมากยิ่งขึ้น</li>
          <li>แสดงความคิดเห็นหรือรีวิวของผู้ใช้งานบนระบบ (เฉพาะในกรณีที่ได้รับความยินยอมจากคุณ)</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🤝 การเผยแพร่ข้อมูล</h2>
        <p>
          ทางเราจะไม่เปิดเผยข้อมูลที่สามารถระบุตัวตนของคุณได้ เว้นแต่จะได้รับความยินยอมจากคุณโดยชัดแจ้ง
          ข้อมูลเช่น ข้อความรีวิวหรือความคิดเห็น อาจถูกแสดงต่อสาธารณะบนแพลตฟอร์มของเรา โดยจะพิจารณาเฉพาะกรณีที่คุณอนุญาตให้เผยแพร่เท่านั้น
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🗂️ ระยะเวลาการจัดเก็บข้อมูล</h2>
        <p>
          ข้อมูลของคุณจะถูกจัดเก็บไว้ในระบบตราบเท่าที่ยังมีความจำเป็นต่อการให้บริการ หรือจนกว่าคุณจะร้องขอให้ลบข้อมูลดังกล่าว
          โดยคุณสามารถดำเนินการขอให้ลบหรือแก้ไขข้อมูลของคุณได้ตลอดเวลา
        </p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🔐 มาตรการรักษาความปลอดภัย</h2>
        <p>
          เราใช้บริการคลาวด์ที่มีมาตรฐานความปลอดภัยระดับสูง (Firebase) และมีการจำกัดสิทธิ์ในการเข้าถึงข้อมูลให้เฉพาะเจ้าหน้าที่ที่ได้รับมอบหมายเท่านั้น
          เพื่อป้องกันการเข้าถึงข้อมูลโดยไม่ได้รับอนุญาต และลดความเสี่ยงจากการรั่วไหลของข้อมูล
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">👤 สิทธิของผู้ใช้งาน</h2>
        <p>
          คุณมีสิทธิในการเข้าถึง แก้ไข หรือลบข้อมูลของคุณได้ตลอดเวลา
          โดยสามารถติดต่อเราเพื่อยื่นคำร้องขอผ่านช่องทางต่อไปนี้:
        </p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            Email:{" "}
            <a className="text-violet-600 underline" href="mailto:chidahp@gmail.com">
              chidahp@gmail.com
            </a>
          </li>
          <li>
            Instagram:{" "}
            <a className="text-violet-600 underline" href="https://www.instagram.com/chidahp" target="_blank" rel="noopener noreferrer">
              @chidahp
            </a>
          </li>
        </ul>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">📎 ลิงก์ที่เกี่ยวข้อง</h2>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>
            <a href="https://www.chidahp.com" className="text-violet-600 underline" target="_blank" rel="noopener noreferrer">
              หน้าหลักชี้ดาบ
            </a>
          </li>
        </ul>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">❤️ ขอบคุณจากใจ</h2>
        <p>
          ขอบคุณที่เลือกใช้บริการของ Cardtel Live และที่ไว้วางใจให้เราร่วมเป็นส่วนหนึ่งในเส้นทางการค้นหาหนังสือที่ตรงใจคุณ
          เราหวังว่าประสบการณ์ที่คุณได้รับจะเป็นประโยชน์ และสร้างแรงบันดาลใจที่งดงามให้กับคุณต่อไป
        </p>
      </section>

      {/* Section 10 */}
      <section>
        <h2 className="text-xl font-bold text-violet-700 mb-2">👁 หมายเหตุเพิ่มเติม</h2>
        <p>
          นโยบายฉบับนี้อาจมีการปรับปรุงเป็นครั้งคราว เพื่อให้สอดคล้องกับกฎหมายที่เกี่ยวข้อง
          หรือเพื่อตอบสนองต่อข้อเสนอแนะจากผู้ใช้งาน โดยเราขอแนะนำให้คุณกลับมาอ่านนโยบายนี้อย่างสม่ำเสมอ
          เพื่อให้คุณทราบถึงสิทธิและข้อกำหนดล่าสุดอยู่เสมอ
        </p>
      </section>
    </div>
  );
}
