import { Router, Request, Response } from "express";
const authRouter = Router();

authRouter.get("/auth", (req: Request, res: Response) => {
  res.send("Hello from auth");
});

export default authRouter;
