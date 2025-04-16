"use client";

export default function PrivacyPolicy() {
  return (
    <div className="max-w-3xl mx-auto px-6 py-12 text-gray-800 font-sans">
      <h1 className="text-4xl font-black text-violet-800 mb-6 text-center">
        🛡️ นโยบายความเป็นส่วนตัว (Privacy Policy)
      </h1>

      <p className="text-sm text-gray-500 mb-8 text-center">ปรับปรุงล่าสุด: 16 เมษายน 2568</p>

      {/* Section 1 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">📌 สาระสำคัญ</h2>
        <p>
          ทางสำนักพิมพ์ชี้ดาบและระบบ Cardtel Live ให้ความสำคัญกับความเป็นส่วนตัวของผู้ใช้งาน
          ข้อมูลที่คุณให้กับเราจะถูกใช้เพื่อพัฒนาประสบการณ์การใช้งาน และจะถูกจัดเก็บอย่างปลอดภัย
        </p>
      </section>

      {/* Section 2 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🔍 ข้อมูลที่เราเก็บ</h2>
        <ul className="list-disc list-inside space-y-1">
          <li>ข้อความที่คุณเขียนในแบบฟอร์ม (feedback)</li>
          <li>ชื่อเล่น (หากคุณระบุ)</li>
          <li>การ์ดความรู้สึกที่คุณเลือก</li>
          <li>หนังสือที่ระบบแนะนำให้คุณ</li>
          <li>ข้อมูลอุปกรณ์ เช่น เบราว์เซอร์ (userAgent)</li>
          <li>ข้อมูลตำแหน่งโดยประมาณ (ประเทศ/เมือง จาก IP)</li>
        </ul>
      </section>

      {/* Section 3 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🎯 จุดประสงค์ในการเก็บข้อมูล</h2>
        <p>ข้อมูลของคุณจะถูกนำไปใช้เพื่อ:</p>
        <ul className="list-disc list-inside space-y-1 mt-2">
          <li>วิเคราะห์พฤติกรรมผู้ใช้เพื่อพัฒนาเนื้อหา</li>
          <li>ปรับปรุงระบบแนะนำหนังสือให้แม่นยำยิ่งขึ้น</li>
          <li>แสดงข้อความรีวิวจากผู้ใช้งาน (เมื่อคุณอนุญาต)</li>
        </ul>
      </section>

      {/* Section 4 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🤝 การเผยแพร่ข้อมูล</h2>
        <p>
          ข้อมูลที่แสดงต่อสาธารณะ เช่น รีวิวหรือความคิดเห็น
          จะถูกแสดงเฉพาะกรณีที่คุณอนุญาตให้แสดงเท่านั้น
          และเราไม่เก็บข้อมูลที่ระบุตัวตนจริงของคุณ
        </p>
      </section>

      {/* Section 5 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🗂️ ระยะเวลาการเก็บข้อมูล</h2>
        <p>ข้อมูลจะถูกเก็บไว้ในระบบจนกว่าจะไม่จำเป็น หรือตามคำขอของคุณ</p>
      </section>

      {/* Section 6 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">🔐 ความปลอดภัยของข้อมูล</h2>
        <p>
          ข้อมูลทั้งหมดจะถูกจัดเก็บอย่างปลอดภัยบนระบบ Cloud (Firebase)
          โดยมีการจำกัดสิทธิ์การเข้าถึงเฉพาะผู้ดูแลระบบ
        </p>
      </section>

      {/* Section 7 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">👤 สิทธิ์ของคุณ</h2>
        <p>คุณสามารถติดต่อเราเพื่อขอลบหรือแก้ไขข้อมูลของคุณได้ทุกเมื่อ ผ่านช่องทางดังนี้:</p>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li>Email: <a className="text-violet-600 underline" href="mailto:chidahp@gmail.com">chidahp@gmail.com</a></li>
          <li>Instagram: <a className="text-violet-600 underline" href="https://www.instagram.com/chidahp" target="_blank" rel="noopener noreferrer">@chidahp</a></li>
        </ul>
      </section>

      {/* Section 8 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">📎 ลิงก์ที่เกี่ยวข้อง</h2>
        <ul className="list-inside list-disc mt-2 space-y-1">
          <li><a href="https://www.chidahp.com" className="text-violet-600 underline" target="_blank">หน้าหลักชี้ดาบ</a></li>
        </ul>
      </section>

      {/* Section 9 */}
      <section className="mb-8">
        <h2 className="text-xl font-bold text-violet-700 mb-2">❤️ ขอบคุณ</h2>
        <p>ขอบคุณที่ร่วมเป็นส่วนหนึ่งของ Cardtel เราหวังว่าคุณจะได้รับประสบการณ์ที่ดีและหนังสือที่ตรงใจที่สุดจากเรา</p>
      </section>

      {/* Section 10 */}
      <section>
        <h2 className="text-xl font-bold text-violet-700 mb-2">👁 หมายเหตุเพิ่มเติม</h2>
        <p>นโยบายนี้อาจมีการปรับปรุงเป็นครั้งคราว กรุณาตรวจสอบอยู่เสมอเพื่อความเข้าใจที่ตรงกัน</p>
      </section>
    </div>
  );
}
