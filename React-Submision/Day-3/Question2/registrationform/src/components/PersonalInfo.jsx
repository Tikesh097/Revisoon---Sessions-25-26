export default function PersonalInfo({ data, setData, next }) {
  return (
    <>
      <h3>Personal Info</h3>

      <input
        placeholder="Name"
        value={data.name}
        onChange={(e) =>
          setData({ ...data, name: e.target.value })
        }
      />

      <input
        placeholder="Email"
        value={data.email}
        onChange={(e) =>
          setData({ ...data, email: e.target.value })
        }
      />

      <button onClick={next}>Next</button>
    </>
  );
}
