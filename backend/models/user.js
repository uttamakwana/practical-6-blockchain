import mongoose from "mongoose";

const User = new mongoose.Schema({
  name: {
    type: String,
    required: [true, "Please enter your name"],
  },
  username: {
    type: String,
    required: [true, "Please enter your username"],
  },
  number: {
   type: Number,
  },
  password: {
    type: String,
    required: [true, "Please enter your password"],
  },
  role: {
    type: String,
    required: [true, "Please enter your role"],
  },
  data: {
   type: String,
  }
});

export default mongoose.model("users", User);
