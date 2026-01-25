import { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft, onExpire }) {
    useEffect(() => {
        if (timeLeft <= 0) {
            onExpire();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft((prev) => prev - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [timeLeft]);

    return (
        <p className="text-lg font-medium">
            Time Left : {Math.floor(timeLeft / 60)} :
            {String(timeLeft % 60).padStart(2, "0")}
        </p>
    );
}