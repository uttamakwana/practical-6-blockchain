import express from "express";
import User from "./models/user.js";
import { connectDB } from "./database/dbConnection.js";
import cors from "cors";
import BlockChain from "./blockchain.js";
import PubSub from "./publishsubscriber.js";

const app = express();
const blockChain = new BlockChain();
const pubSub = new PubSub(blockChain);

setTimeout(() => pubSub.broadcastChain(), 1000);
// connect the database
connectDB();

// middlewares
app.use(express.json());

// cors for sending the request from the frontend
// Use the cors middleware with your desired options
app.use(
  cors({
    origin: "http://localhost:5173", // Replace with your frontend URL
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true, // Enable credentials (cookies, HTTP authentication)
    optionsSuccessStatus: 204, // Return a 204 No Content status for preflight requests
  })
);

// login api
app.post("/api/bc/practical6/login", async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username });

  if (!user) return res.json({ success: false, message: "User not found!" });

  if (password === user.password) {
    if (user.role === "admin") {
      let users = await User.find();
      return res.json({
        sucess: true,
        message: "Admin Login Successfull!",
        user,
        users,
      });
    }
    return res.json({ sucess: true, message: "User Login Sucessfull!", user });
  }
});

// register api
app.post("/api/bc/practical6/register", async (req, res) => {
  const { name, username, password, number, role } = req.body;
  console.log(name);
  let user = await User.findOne({ username });
  if (user) {
    console.log(user);
    return res
      .status(402)
      .json({ success: false, message: "Invalid username or password!" });
  }
  if (!username || !password || !role)
    return res.status(402).json({
      sucess: false,
      message: "Please fill all the details correctly!",
    });
  user = await User.create({ name, username, password, number, role });
  return res.json({ sucess: true, message: "Registration sucessfull", user });
});

// admin api
app.get("/api/bc/practical6/all", async (req, res) => {
  const all = await User.find();

  return res.json({ sucess: true, all });
});

// submit api
app.post("/api/bc/practical6/submit", async (req, res) => {
  const { username, data } = req.body;
  let user = await User.findOne({ username });

  if (!user) return res.json({ success: false, message: "User not found!" });
  if (user.role === "admin") {
    return res.json({
      success: false,
      message: "Admin are not allowed to send the data",
    });
  }
  user.data = data;
  await user.save();

  blockChain.addBlock({ data: user });
  pubSub.broadcastChain();

  return res
    .status(200)
    .json({ sucess: true, message: "Practical Submit Successfully!", user });
});

// start the server
app.listen(4000, () => {
  console.log("Server is started on PORT number 4000");
});
