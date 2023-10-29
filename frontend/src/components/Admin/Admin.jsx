import { useContext, useEffect } from "react";
import "./admin.css";
import { Context } from "../../context/ContextProvider";
import axios from "axios";

const Admin = () => {
  const { user, sirName, users, setUsers } = useContext(Context);

  useEffect(() => {
    async function fetchUsers() {
      try {
        const response = await axios.get(
          "http://localhost:4000/api/bc/practical6/all"
        );
        setUsers(response.data.all);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    }

    // Call the async function to fetch users when the component mounts
    fetchUsers();
  }, []); // Empty dependency array to ensure it runs once when the component mounts

  // Filter users after they have been fetched
  const filteredUsers = users.filter((user) => user.role !== "admin");

  return (
    user && (
      <main className="main admin-page">
        <main className="container transparent admin">
          <h1 className="admin-heading">
            Welcome <span className="highlight">{sirName}</span>
          </h1>
          <ul className="user-list">
            {filteredUsers.map((user) => (
              <li key={user.username} className="user">
                <h1>Name: {user.name}</h1>
                <p>Enrollment Number: {user.number}</p>
                <p>Username: {user.username}</p>
                <a className="user-data" target="_blank" href={user.data}>
                  Practical File
                </a>
              </li>
            ))}
          </ul>
        </main>
      </main>
    )
  );
};

export default Admin;
