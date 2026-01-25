import { useState } from "react";

export default function Flashcard({ card, onAnswer }) {
    const [flipped, setFlipped] = useState(false);

    return (
        <div className="bg-white p-6 rounded-xl shadow-md w-full max-w-xl text-center">
            <h2 className="text-xl font-semibold mb-6">
                {flipped ? card.answer : card.question}
            </h2>

            {!flipped ? (
                <button className="px-4 py-2 bg-blue-800 text-white rounded"
                    onClick={() => setFlipped(true)}
                > Flip
                </button>
            ) : (
                <div className="flex justify-center gap-4">
                    <button className="px-4 py-2 bg-green-500 text-white rounded"
                        onClick={() => onAnswer(true)}
                    >
                        Correct
                    </button>

                    <button className=" px-4 py-2 bg-red-500 text-white rounded"
                        onClick={() => onAnswer(false)}
                    >
                        Incorrect
                    </button>
                </div>
            )}

        </div>
    );
}