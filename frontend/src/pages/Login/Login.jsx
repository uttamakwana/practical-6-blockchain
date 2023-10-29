import { useContext, useState } from "react";
import "./login.css";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { Context } from "../../context/ContextProvider";

const Login = () => {
  const { setUser, setUsers, setSirName } = useContext(Context);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:4000/api/bc/practical6/login",
        { username, password }
      );

      alert(response.data.message);
      if (response.data.message === "Admin Login Successfull!") {
        setSirName(response.data.user.name);
        setUser(response.data.user);
        setUsers(response.data.users);
        navigate("/admin");
      } else {
        setUser(response.data.user);
        navigate("/user");
      }
    } catch (error) {
      return alert("Invalid username or password");
    }
  };

  return (
    <main className="login main">
      <div className="login-container transparent">
        <form action="/login" method="post" onSubmit={handleSubmit}>
          <h1>Login</h1>
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
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </main>
  );
};

export default Login;
