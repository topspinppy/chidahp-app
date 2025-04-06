import PreQuestionFlow from "./components/PreQuestion";

type Choice = {
  text: string;
  mood: string;
  subfeeling: string;
};

type Question = {
  id: string;
  question: string;
  choices: Choice[];
};

export default async function PreQuestionPage() {
  const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/api/soft-interview`, {
    cache: "no-store" // ให้ fetch สดทุกครั้ง (ถ้าอยาก real-time)
  });

  const data = await res.json();
  const questions: Question[] = data.questions;

  return (
    <div className="min-h-screen w-full bg-gradient-to-b from-slate-700 via-gray-800 to-zinc-900">
      <PreQuestionFlow questions={questions} />
    </div>
  );
}
