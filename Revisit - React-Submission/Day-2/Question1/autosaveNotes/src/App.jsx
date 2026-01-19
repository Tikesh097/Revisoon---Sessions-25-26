import { useEffect, useState } from "react";

function AutoSaveNotes() {
  const [note, setNote] = useState("");
  const [status, setStatus] = useState("Saved ✓");

  useEffect(() => {
    if (!note) return;

    setStatus("Saving...");

    const timer = setTimeout(() => {
      console.log("Saved note:", note);
      setStatus("Saved ✓");
    }, 2000);

    return () => {
      clearTimeout(timer);
    };
  }, [note]);

  return (
    <div>
      <textarea
        value={note}
        onChange={(e) => setNote(e.target.value)}
        placeholder="Write your notes..."
      />
      <p>{status}</p>
    </div>
  );
}

export default AutoSaveNotes;
