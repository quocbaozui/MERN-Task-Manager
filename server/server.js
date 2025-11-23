const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParse = require("cookie-parser");
const cors = require("cors");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandle } = require("./middlewares/errorMiddleware");
const rateLimiter = require("./middlewares/rateLimiter");

dotenv.config();

const app = express();
app.use(rateLimiter);

app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use(helmet());
app.use(express.json());
app.use(cookieParse());

app.use("/api/auth", authRoutes);
app.use("/api/tasks", taskRoutes);

app.get("/", (req, res) => {
  res.send("MERN Task Manager API is running !");
});

app.use(notFound);
app.use(errorHandle);

const PORT = process.env.PORT || 5001;

connectDB().then(() => {
  app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}..`);
  });
});
