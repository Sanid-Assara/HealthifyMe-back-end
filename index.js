import express from "express";
import cors from "cors";
import connectToDatabase from "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.use("/API/users", userRoutes);
app.use("/API/foods", foodRoutes);

app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () =>
      console.log(
        `Servers are running on \n http://localhost:${PORT}/API/users \n http://localhost:${PORT}/API/foods`
      )
    );
  } catch (error) {
    console.error("Server failed to start due to DB connection error", error);
    process.exit(1);
  }
};

startServer();
