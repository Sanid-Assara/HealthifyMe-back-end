import express from "express";
import cors from "cors";
import "./db/index.js";
import errorHandler from "./middlewares/errorHandler.js";

const app = express();
const PORT = process.env.PORT ?? 8080;

app.use(
  cors({
    origin: "http://localhost:5173",
    methods: "GET,PUT,POST, DELETE",
    credentials: true,
  })
);
app.use(express.json());

app.get("/", (req, res) =>
  res.send("Hello, World! - from HealthifyMe Backend")
);
app.use("*", (req, res) => res.status(404).json({ error: "Not found" }));

app.use(errorHandler);

app.listen(PORT, () =>
  console.log(`Server running on http://localhost:${PORT}`)
);
