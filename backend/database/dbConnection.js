import mongoose from "mongoose";

// created a connectDB function that will connect to the mongoDB database
export const connectDB = async () => {
  // as mongoose.connect is asynchronous so we have to wait till it give us the output
  const database = await mongoose.connect("mongodb://127.0.0.1:27017/Practical-6-BC", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  console.log("*****Database*****");
  console.log("Database connection successfull!");
  // host name
  console.log("Host name:", database.connection.host);
  // database name
  console.log("Database name:", database.connection.name);
};
