import express from "express";
import dotenv from "dotenv";
import path from "path";
import { fileURLToPath } from "url";
import favicon from "serve-favicon";
import cors from "cors";
import cookieParser from "cookie-parser";
import connectToDatabase from "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";
import userRoutes from "./routes/userRoutes.js";
import ingredientRoutes from "./routes/ingredientRoutes.js";
import recipeRoutes from "./routes/recipeRoutes.js";
import uploadRoutes from "./routes/uploadRoutes.js";

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const PORT = process.env.PORT ?? 8080;

const app = express();
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: ["https://healthifyme.onrender.com", "http://localhost:5173"],
    methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
    credentials: true,
  })
);

app.use(favicon(path.join(__dirname, "public", "tabicon.png")));
app.use(express.static(path.join(__dirname, "public")));

app.use("/API/users", userRoutes);
app.use("/API/ingredients", ingredientRoutes);
app.use("/API/recipes", recipeRoutes);
app.use("/API/upload", uploadRoutes);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

app.use(errorHandler);

const startServer = async () => {
  try {
    await connectToDatabase();

    app.listen(PORT, () =>
      console.log(
        `\n Servers are running locally on \n http://localhost:${PORT}/API/users \n http://localhost:${PORT}/API/ingredients  \n http://localhost:${PORT}/API/recipes \n http://localhost:8080/API/users/profile \n http://localhost:8080/API/users/upload \n\n Servers are running online on \n https://healthifyme-api.onrender.com/API/users \n https://healthifyme-api.onrender.com/API/ingredients  \n https://healthifyme-api.onrender.com/API/recipes \n https://healthifyme-api.onrender.com/API/profile  \n https://healthifyme-api.onrender.com/API/upload`
      )
    );
  } catch (error) {
    console.error("Server failed to start due to DB connection error", error);
    process.exit(1);
  }
};

startServer();
