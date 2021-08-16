import { Router, Request, Response } from "express";
import User from "../models/User";

const authRouter = Router();

// Errors
const handleErrors = (err: any) => {
  let errors: any = { username: "", email: "", password: "" };

  if (err.code === 11000) {
    errors.username = "Username is already taken.";
    errors.email = "Email is already in use";
  }

  if (err.message === "incorrect email") {
    errors.email = "Incorrect email";
  }

  if (err.message === "incorrect password") {
    errors.password = "Incorrect password";
  }

  if (err.message.includes("user validation failed")) {
    Object.values(err.errors).forEach((error: any) => {
      console.log(error.properties.message);
      errors[error.properties.path] = error.properties.message;
    });
  }
  return errors;
};

// Signup
authRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.status(201).json(newUser);
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

// Login
authRouter.post("/login", async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (err) {
    const errors = handleErrors(err);
    res.status(400).json({ errors });
  }
});

export default authRouter;
