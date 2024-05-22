import express, { Express } from "express";
import dotenv from "dotenv";
import dbConnection from "./models/dbConnection";
import careerPage from "./routes/careerPage";

dotenv.config();
dbConnection(); // Connection with the database

const app: Express = express();
const port = process.env.PORT || 5000;

app.use("/careerPage", careerPage);

app.listen(port, () => {
  console.log(`[server]: Server is running at http://localhost:${port}`);
});
