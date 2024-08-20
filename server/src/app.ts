import express from "express";
import morgan from "morgan";
import cors from "cors";
import cookieParser from "cookie-parser";
import userRoutes from "./routes/user.routes";
import taskRoute from "./routes/task.routes";

const app = express();

app.use(morgan("dev"));
app.use(cors({ credentials: true, origin: process.env.CLIENT_URL }));
app.use(cookieParser());

app.use(express.json());
app.use(express.text());
app.use(express.urlencoded({ extended: true }));
app.use(express.static("public"));

// routes

/* USER ROUTES */
app.use("/user", userRoutes);
/* TASK ROUTES */
app.use("/task", taskRoute);

app.use((_, res) => {
  res.status(404).json({ status: 404, message: "NOT FOUND" });
});

export default app;
