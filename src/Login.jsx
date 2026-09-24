import { useState } from "react";

function Login() {
  const [role, setRole] = useState("User");

  const handleLogin = () => {
    alert(role + " login successful!");
  };

  return (
    <div>
      <h2>Login</h2>

      <input type="email" placeholder="Email" />
      <br /><br />

      <input type="password" placeholder="Password" />
      <br /><br />

      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="User">User</option>
        <option value="Admin">Admin</option>
      </select>

      <br /><br />

      <button onClick={handleLogin}>
        Login
      </button>
    </div>
  );
}

export default Login;