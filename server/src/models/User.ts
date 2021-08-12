import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";
import isEmail from "validator/lib/isEmail";

interface UserDocument extends Document {
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  coverPicture?: string;
  followers: [];
  following: [];
  isAdmin: boolean;
}

interface User extends mongoose.Model<UserDocument> {
  login(email: string, password: string): UserDocument;
}

const userSchema = new Schema<UserDocument>(
  {
    username: {
      type: String,
      required: [true, "Please enter a username"],
      unique: true,
      minLength: [3, "Username is too short"],
      maxLength: [10, "Username is too long"],
    },
    email: {
      type: String,
      required: [true, "Please enter an email"],
      unique: true,
      validate: [isEmail, "Please enter a valid email"],
    },
    password: {
      type: String,
      required: [true, "Please enter a password"],
      minLength: [8, "Password must be at least 8 characters long"],
    },
    profilePicture: {
      type: String,
      default: "",
    },
    coverPicture: {
      type: String,
      default: "",
    },
    followers: {
      type: Array,
      default: [],
    },
    following: {
      type: Array,
      default: [],
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email: string, password: string) {
  const user = await this.findOne({ email });
  if (user) {
    const auth = await bcrypt.compare(password, user.password);
    if (auth) {
      return user;
    }
    throw Error("incorrect password");
  }
  throw Error("incorrect email");
};

export default model<UserDocument, User>("user", userSchema);
