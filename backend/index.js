var express = require("express")
var bodyPaser = require("body-parser")
var cookbooksRoutes = require("./routes/cookbooks")
var mongoose = require("mongoose")
var cors = require("cors")

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
