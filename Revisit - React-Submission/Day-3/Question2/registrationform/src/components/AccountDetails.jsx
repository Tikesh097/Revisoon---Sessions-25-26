export default function AccountDetails({ data, setData, next, back }) {
  return (
    <>
      <h3>Account Details</h3>

      <input
        placeholder="Username"
        value={data.username}
        onChange={(e) =>
          setData({ ...data, username: e.target.value })
        }
      />

      <input
        type="password"
        placeholder="Password"
        value={data.password}
        onChange={(e) =>
          setData({ ...data, password: e.target.value })
        }
      />

      <button onClick={back}>Back</button>
      <button onClick={next}>Next</button>
    </>
  );
}
