export default function Register() {
  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2 className="text-center mb-4">Register</h2>

      <input
        type="text"
        className="form-control mb-3"
        placeholder="Name"
      />

      <input
        type="email"
        className="form-control mb-3"
        placeholder="Email"
      />

      <input
        type="password"
        className="form-control mb-3"
        placeholder="Password"
      />

      <button className="btn btn-success w-100">Register</button>
    </div>
  );
}
