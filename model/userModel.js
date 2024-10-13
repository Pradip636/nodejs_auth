import mongoose from "mongoose";
import bcrypt from "bcrypt";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      required: [true, "email is required"],
      unique: [true, "email already taken"],
    },
    username: {
      type: String,
      required: [true, "username is required"],
    },
    password: {
      type: String,
      required: [true, "password is required"],
      minLength: [4, "password length should be greater then 4 character"],
    },
  },
  { timestamps: true }
);

// password hashing
userSchema.pre("save", async function () {
  this.password = await bcrypt.hash(this.password, 10);
});

// password comparing

userSchema.methods.comparePass = async function (password) {
  return await bcrypt.compare(password, this.password);
};

export const userModel = mongoose.model("user", userSchema);
export default userModel;
