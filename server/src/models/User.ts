import mongoose, { Document, Schema, model } from "mongoose";
import bcrypt from "bcrypt";

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
      required: true,
      unique: true,
      minLength: 3,
      maxLength: 20,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      maxLength: 50,
    },
    password: {
      type: String,
      required: true,
      minLength: 6,
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

userSchema.pre<UserDocument>("save", async function (next) {
  const salt = await bcrypt.genSalt();
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

userSchema.statics.login = async function (email, password) {
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
