import { useContext, useState } from "react";
import "./register.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Register = () => {
  const { setUser } = useContext(Context);
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [number, setNumber] = useState(0);
  const [role, setRole] = useState("user");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    console.log(name);
    try {
      e.preventDefault();
      const response = await axios.post(
        "http://localhost:4000/api/bc/practical6/register",
        { name, username, password, number, role }
      );
      console.log(response);
      alert(response.data.message);
      setUser(response.data.user);
      if (response.data.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/user");
      }
    } catch (error) {
      return alert("User may exist or invalid information");
    }
  };
  return (
    <main className="register main">
      <div className="register-container transparent">
        <form action="/register" method="post" onSubmit={handleSubmit}>
          <h1>Register</h1>
          <div className="input-field">
            <input
              type="text"
              name="name"
              placeholder="Name"
              required
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="text"
              name="username"
              placeholder="Username"
              required
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="input-field">
            <input
              type="password"
              name="password"
              placeholder="Password"
              required
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div className="input-field">
            <select
              name="role"
              required
              onChange={(e) => {
                if (e.target.value === "") {
                  setRole("user");
                } else {
                  setRole(e.target.value);
                }
              }}
            >
              <option value="">Select a role</option>
              <option value="user">User</option>
              <option value="admin">Admin</option>
            </select>
          </div>
          {role === "user" && (
            <div className="input-field">
              <input
                type="number"
                name="number"
                placeholder="Enrollment Number"
                required
                onChange={(e) => setNumber(e.target.value)}
              />
            </div>
          )}
          <button type="submit" className="register-btn">
            Register
          </button>
        </form>
      </div>
    </main>
  );
};

export default Register;
