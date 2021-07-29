import mongoose from "mongoose";
import getConfig from "next/config";

const connectDB = async (req, res, next) => {
  if (mongoose.connections[0].readyState) {
    return next();
  }
  const { serverRuntimeConfig } = getConfig();
  mongoose.connect(
    serverRuntimeConfig.mongo.endpoint,
    {
      useUnifiedTopology: true,
      useFindAndModify: false,
      useCreateIndex: true,
      useNewUrlParser: true,
    },
    () => console.log(" Mongoose is connected")
  );

  return next();
};

export default connectDB;
