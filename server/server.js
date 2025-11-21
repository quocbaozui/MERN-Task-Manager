const express = require("express");
const dotenv = require("dotenv");
const helmet = require("helmet");
const cookieParse = require("cookie-parser");

const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");
const taskRoutes = require("./routes/taskRoutes");
const { notFound, errorHandle } = require("./middleware/errorMiddleware");

dotenv.config();

const app = express();

app.use(helmet());
app.use(express.json());
app.use(cookieParse());

app.use("/api/auth", authRoutes);
app.use("/api/task", taskRoutes);

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
