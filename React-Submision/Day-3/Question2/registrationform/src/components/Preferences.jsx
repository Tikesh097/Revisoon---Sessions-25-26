export default function Preferences({ data, setData, back }) {
  return (
    <>
      <h3>Preferences</h3>

      <label>
        <input
          type="checkbox"
          checked={data.newsletter}
          onChange={(e) =>
            setData({ ...data, newsletter: e.target.checked })
          }
        />
        Subscribe to Newsletter
      </label>

      <h4>Review Data</h4>
      <pre>{JSON.stringify(data, null, 2)}</pre>

      <button onClick={back}>Back</button>
      <button onClick={() => alert("Form Submitted!")}>
        Submit
      </button>
    </>
  );
}
