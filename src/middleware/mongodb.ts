import mongoose from "mongoose";

const connectDB = (handler) => async (req, res) => {
  if (mongoose.connections[0].readyState) {
    console.log("DB connection already open");
    return handler(req, res);
  }

  mongoose.connect(
    "mongodb://localhost:27017/mydb",
    {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    () => console.log(" Mongoose is connected")
  );
  console.log("connected to mongodb");
  return handler(req, res);
};

export default connectDB;
