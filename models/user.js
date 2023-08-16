import { Schema, model, models } from "mongoose";

const UserSchema = new Schema({
  email: {
    type: String,
    unique: [true, "Email already exists!"],
    required: [true, "Email is required!"],
  },
  username: {
    type: String,
    required: [true, "Username is required!"],
    validate: [
      {
        validator: (v) => /^(?=.{4,20}$)/.test(v),
        message: "Username should be between 4 to 20 characters long!",
      },
      {
        validator: (v) => /^(?!.*[_.]{2})/.test(v),
        message: "Username should not have two consecutive `.` or `_`!",
      },
      {
        validator: (v) => /^(?![_.]).*(?<![_.])$/.test(v),
        message: "Username shouldn't start or end with a `_` or `.`!",
      },
      {
        validator: (v) => !/\s/.test(v),
        message: "Username shouldn't contain any spaces!",
      },
      // Additional validators can be added here if needed.
    ],
  },
  image: {
    type: String,
  },
});

const User = models.User || model("User", UserSchema);

export default User;
