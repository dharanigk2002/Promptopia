import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: [true, "Email is required"],
    unique: [true, "E-mail id exists already"],
  },
  username: {
    type: String,
    required: [true, "Username is required"],
  },
  image: String,
});

export const userModel =
  mongoose.models.User || mongoose.model("User", userSchema);
