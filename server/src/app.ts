import express, { Application, Request, Response } from "express";
import mongoose from "mongoose";
import "dotenv/config";
import helmet from "helmet";
import morgan from "morgan";
import usersRouter from "./routes/usersRouter";
import authRouter from "./routes/authRouter";

const app: Application = express();

// Middleware
app.use(express.json());
app.use(helmet());
app.use(morgan("common"));

// DB connection
const DB_URI = process.env.DB_URI;
const PORT = 3000;

mongoose
  .connect(`${DB_URI}`, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
  })
  .then(() => {
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log(err));

// Routes
app.get("/", (req: Request, res: Response) => {
  res.send("Hello from home");
});
app.use(usersRouter);
app.use(authRouter);
