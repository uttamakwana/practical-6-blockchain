import { useContext } from "react";
import "./user.css";
import { Context } from "../../context/ContextProvider";
import axios from "axios";

const User = () => {
  const { user, data, setData } = useContext(Context);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const response = await axios.post(
      "http://localhost:4000/api/bc/practical6/submit",
      { username: user.username, data: data }
    );

    console.log(response);
  };
  return (
    <main className="user-page main">
      <div class="form-container transparent">
        <h1 className="user-name">
          Welcome <span className="highlight">{user.name}</span>
        </h1>
        <p className="user-info">Kindly submit your Practical file in pdf.</p>
        <p className="user-info-2">
          Please submit the public drive link of your file
        </p>
        <form
          action="/submit-user"
          method="post"
          enctype="multipart/form-data"
          onSubmit={handleSubmit}
        >
          {/* <input type="text" name="username" placeholder="Username" required /> */}
          {/* <input type="email" name="email" placeholder="Email" required /> */}
          <input
            type="url"
            name="url"
            id="url"
            required
            placeholder='Drive Link URL'
            onChange={(e) => setData(e.target.value)}
          />
          <input type="submit" value="Submit" />
        </form>
      </div>
    </main>
  );
};

export default User;
