"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";

export default function Home() {
  const router = useRouter();
  useEffect(() => {
    router.push("/404");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <></>
  );
}
