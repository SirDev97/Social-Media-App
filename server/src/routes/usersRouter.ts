import { Router, Request, Response } from "express";
import User from "../models/User";
import bcrypt from "bcrypt";

const usersRouter = Router();

// Update user
usersRouter.put("/:id", async (req: Request, res: Response) => {
  const id = req.params.id;

  if (req.body.password) {
    try {
      const salt = await bcrypt.genSalt();
      req.body.password = await bcrypt.hash(req.body.password, salt);
    } catch (err) {
      if (err) {
        console.log(err);
        res.sendStatus(500);
        return;
      }
    }
  }
  try {
    const user = await User.findByIdAndUpdate(id, {
      $set: req.body,
    });
    res.status(200).json("User updated!");
  } catch (err) {
    res.status(400).json("Something went wrong...");
  }

  res.status(403).json("No access rights!");
});
// Delete user
// Find a user
// Follow a user
// Unfollow a user

export default usersRouter;
