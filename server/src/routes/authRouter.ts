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

export default authRouter;
