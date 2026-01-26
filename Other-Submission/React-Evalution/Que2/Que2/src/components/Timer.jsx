import { useEffect } from "react";

export default function Timer({ timeLeft, setTimeLeft, onExpire }) {
    useEffect(() => {
        if (timeLeft <= 0) {
            onExpire();
            return;
        }
        const interval = setInterval(() => {
            setTimeLeft(t => t - 1);
        }, 1000);
        return () => clearInterval(interval);
    }, [timeLeft]);

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;

    return (
        <div className="text-xl font-semibold text-blue-900">
            Session Time: {minutes} : {seconds.toString().padStart(2, "0")}
        </div>
    );
}