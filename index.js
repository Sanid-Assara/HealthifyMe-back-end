import express from "express";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import foodRoutes from "./routes/foodRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT ?? 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST,DELETE",
    credentials: true,
  })
);

app.use(favicon(path.join(__dirname, "public", "tabicon.png")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/API/users", userRoutes);
app.use("/API/foods", foodRoutes);
app.use("/API/recipes", recipeRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () =>
      console.log(
        `\n Servers are running on \n http://localhost:${PORT}/API/users \n http://localhost:${PORT}/API/foods  \n http://localhost:${PORT}/API/recipes`
      )
    );
  } catch (error) {
    console.error("Server failed to start due to DB connection error", error);
    process.exit(1);
  }
};

startServer();
