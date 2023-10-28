import mongoose from "mongoose";

let isConnected: boolean = false;

export const connectToDatabase = async () => {
  mongoose.set("strictQuery", true);

  if (!process.env.MONGODB_URL) return console.log("Mongodb url is missing");

  if (isConnected) {
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URL, {
      dbName: "nextjs_devOverflow_bipin",
    });
    isConnected = true;
    console.log("MongoDb is connected");
  } catch (error) {
    console.log("MongoDb connection failed", error);
  }
};
