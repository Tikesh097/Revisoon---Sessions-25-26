export default function Summary({ correct, incorrect, unattempted }) {
    return (
        <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-4">
                Session Summary
            </h1>
            <p>Correct Answer : {correct}</p>
            <p>Incorrect Answer: {incorrect}</p>
            <p>Unattempted : {unattempted}</p>
        </div>
    );
}