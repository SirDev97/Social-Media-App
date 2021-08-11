import express, { Application, Request, Response, NextFunction } from "express";

// Server setup
const PORT = 3000;
const app: Application = express();
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.get("/", (req: Request, res: Response) => {
  res.send("hello");
});
