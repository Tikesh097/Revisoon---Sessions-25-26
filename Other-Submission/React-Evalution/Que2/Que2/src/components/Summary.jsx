export default function Summary({ total, treated, notTreated }) {
    return (
        <div className="bg-gray-100 p-6 rounded-xl">
            <h2 className="text-2xl font-bold mb-4"> Session Summary</h2>
            <p>Total Patients: {total}</p>
            <p className="text-green-600">Treated: {treated}</p>
            <p className="text-red-600">Not Treated: {notTreated}</p>

            <p>Pending: {total - treated - notTreated}</p>
        </div>
    );
}