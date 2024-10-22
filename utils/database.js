const { default: mongoose } = require("mongoose");

let isConnected = false;

async function connectToDB() {
  if (isConnected) {
    console.log("Mongo DB already connected");
    return;
  }

  try {
    await mongoose.connect(process.env.MONGODB_URI);
    isConnected = true;
    console.log("Mongo DB connected successfully");
    return;
  } catch (error) {
    console.log(error.message);
  }
}

export { connectToDB };
