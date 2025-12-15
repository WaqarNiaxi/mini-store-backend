import express from "express";
import dotenv from "dotenv";

dotenv.config(); // load .env variables
const app = express();
app.use(express.json());


app.listen(4000, () => console.log("Server running on port 4000"));
