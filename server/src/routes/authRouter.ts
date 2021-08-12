import { Router, Request, Response } from "express";
import User from "../models/User";

const authRouter = Router();

// Signup
authRouter.post("/signup", async (req: Request, res: Response) => {
  const { username, email, password } = req.body;

  try {
    const newUser = await User.create({ username, email, password });
    res.status(200).json(newUser);
  } catch (err) {
    console.log(err);
  }
});

// Login
authRouter.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.login(email, password);
    res.status(200).json({ user: user._id });
  } catch (err) {
    res.status(400).json({});
  }
});

export default authRouter;
