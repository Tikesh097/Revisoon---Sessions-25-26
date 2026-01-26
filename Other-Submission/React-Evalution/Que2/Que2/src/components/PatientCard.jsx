export default function PatientCard({ patient, status, onTreat, onSkip, disabled }) {
    return (
        <div className="bg-white shadow-lg rounded-xl p-6 w-full max-w-md">
            <h2 className="text-3xl font-bold mb-3">{patient.name}</h2>
            <p>Age : {patient.age}</p>
            <p>Problem: {patient.problem}</p>
            <p className="mb-4 text-blue-900 font-semibold">Doctor: {patient.doctor}</p>

            {status ? (
                <p className={`font-bold ${status === "treated" ? "text-green-800" : "text-red-800"}`}>
                    {status.toUpperCase()}
                </p>
            ) : (
                <div className="flex gap-4">
                    <button disabled={disabled}
                        onClick={onTreat}
                        className="px-4 py-2 bg-green-800 text-white rounded disabled:opacity-50">
                        Treated
                    </button>

                    <button disabled={disabled} onClick={onSkip}
                        className="px-4 py-2 bg-red-800 text-white rounded disabled:opacity-50"
                    >
                        Not Treated
                    </button>
                </div>
            )}
        </div>
    );
}