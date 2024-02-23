import express from "express";
import bodyPaser from "body-parser";
import cookbooksRoutes from "./routes/cookbooks.js";
import mongoose from "mongoose";
import cors from 'cors';

const app = express();
const PORT = 5000;

app.use(cors());

app.use(bodyPaser.json());

app.use(bodyPaser.urlencoded({extended:false}));

app.use("/cookbooks", cookbooksRoutes);

app.get("/", (req, res) => res.send("Hello from Homepage"));

mongoose.set("strictQuery", false)
mongoose
  .connect(
    "mongodb+srv://admin:gzgi4t0xohvP983t@cluster0.zg0upsa.mongodb.net/?retryWrites=true&w=majority"
  )
  .then(() => {
    console.log("Connected to MongoDB");
    app.listen(PORT, () =>
      console.log(`Server runnning on port: http://localhost:${PORT}`)
    );
  })
  .catch((err) => {
    console.log(err);
  });
