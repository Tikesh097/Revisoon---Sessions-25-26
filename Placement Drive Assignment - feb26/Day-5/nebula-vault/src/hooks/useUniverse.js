import { useEffect, useRef, useState } from "react";
import { ref, onChildAdded, push } from "firebase/database";
import { db } from "../firebase/firebaseConfig";

export function useUniverse(universe) {
  const [items, setItems] = useState([]);
  const [freeze, setFreeze] = useState(false);
  const freezeRef = useRef(false);
  const bufferRef = useRef([]);
  const [pulse, setPulse] = useState(false);

  useEffect(() => {
    const universeRef = ref(db, universe);

    const unsubscribe = onChildAdded(universeRef, (snapshot) => {
      const data = { id: snapshot.key, ...snapshot.val() };
      
      setPulse(true);
      setTimeout(() => setPulse(false), 800);

      if (freezeRef.current) {
        bufferRef.current.push(data);
      } else {
        setItems((prev) => [data, ...prev]);
      }
    });

    return () => unsubscribe();
  }, [universe]);

  const toggleFreeze = () => {
    freezeRef.current = !freezeRef.current;
    setFreeze(freezeRef.current);

    if (!freezeRef.current) {
      setItems((prev) => [...bufferRef.current, ...prev]);
      bufferRef.current = [];
    }
  };

  const addItem = (value) => {
    push(ref(db, universe), {
      value,
      createdAt: Date.now(),
    });
  };

  return { items, addItem, freeze, toggleFreeze, pulse  };
}
