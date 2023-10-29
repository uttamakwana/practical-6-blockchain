import { createContext, useState, useEffect } from "react";

export const Context = createContext();

const ContextProvider = ({ children }) => {
  // Retrieve data from local storage on component mount
  const initialSirName = localStorage.getItem("sirName") || "C M Kapadiya";
  const initialUser = JSON.parse(localStorage.getItem("user") || "");
  const initialData = localStorage.getItem("data") || "";
  const initialUsers = JSON.parse(localStorage.getItem("users")) || [];

  const [sirName, setSirName] = useState(initialSirName);
  const [user, setUser] = useState(initialUser);
  const [data, setData] = useState(initialData);
  const [users, setUsers] = useState(initialUsers);

  // Update local storage when data changes
  useEffect(() => {
    localStorage.setItem("user", JSON.stringify(user));
    localStorage.setItem("data", data);
    localStorage.setItem("users", JSON.stringify(users));
  }, [user, data, users]);

  return (
    <Context.Provider
      value={{
        user,
        setUser,
        data,
        setData,
        users,
        setUsers,
        sirName,
        setSirName,
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default ContextProvider;
