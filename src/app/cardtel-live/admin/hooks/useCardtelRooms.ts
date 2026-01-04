import { useEffect, useState } from "react";
import { onSnapshot, collection, query, orderBy } from "firebase/firestore";
import { CardtelRoom, db } from "../../firebase"; // ตรงนี้เปลี่ยน path ตามจริง


export function useCardtelRooms() {
  const [rooms, setRooms] = useState<CardtelRoom[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | string>(null);

  useEffect(() => {
    try {
      const q = query(collection(db, "cardtel-room"), orderBy("createdAt", "desc"));
      const unsubscribe = onSnapshot(q, (snapshot) => {
        const result: CardtelRoom[] = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        })) as CardtelRoom[];

        setRooms(result);
        setLoading(false);
      });

      return () => unsubscribe(); // cleanup ตอน unmount
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (err: any) {
      setError(err.message);
      setLoading(false);
    }
  }, []);

  return { rooms, loading, error };
}
