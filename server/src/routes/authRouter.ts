import { Router, Request, Response } from "express";
import User from "../models/User";

const authRouter = Router();

// Signup
authRouter.get("/signup", async (req: Request, res: Response) => {
  const user = await new User({
    username: "foo",
    email: "foo@bar.com",
    password: "123456",
  });
  await user.save();
  res.send("User created");
});

export default authRouter;
