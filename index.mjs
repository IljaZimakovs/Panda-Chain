import dotenv from "dotenv";
// import app from "./app.mjs";
import dbConnect from "./utils/dbconnect.mjs";
import startTGBot from "./Controllers/botController.mjs";
import express from "express";
import cors from "cors";
import morgan from "morgan";
import bodyParser from "body-parser";
import router from "./routes/index.mjs";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();

app.use(cookieParser());

const corsOptions = {
  origin: true, // Replace with your allowed origin(s)
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"], // Specify the HTTP methods allowed
  allowedHeaders: ["Content-Type", "Authorization"], // Specify the allowed request headers
  credentials: true, // Enable sending cookies across different domains
  optionsSuccessStatus: 200 // Set the response status code for successful OPTIONS requests
};

app.use(cors(corsOptions));
app.use(morgan("dev"));
app.use(bodyParser.json({ limit: "1mb" }));
app.use(bodyParser.urlencoded({ limit: "1mb", extended: false }));

app.use("/api", router);

dbConnect()
  .then(() => {
    console.log("Database connected successfully");
    startTGBot();
    const port = process.env.PORT || 5000;
    app.listen(port, () => {
      console.log(`Server is running on port: ${port}`);
    });
  })
  .catch((error) => {
    console.error("Database connection failed:", error);
  });

export default app;
