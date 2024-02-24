var express = require("express")
var bodyPaser = require("body-parser")
var cookbooksRoutes = require("./routes/cookbooks")
var mongoose = require("mongoose")
const cors = require("cors")
const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());

//database connection
require("./services/connections")

//configs
app.use(bodyPaser.json());
app.use(bodyPaser.urlencoded({extended:false}));

//bind routes
app.use("/cookbooks", cookbooksRoutes);

app.get("/", (req, res) => res.send("Hello from Homepage"));

app.listen(PORT, (err)=>{
  if(err){
    console.log(err);
  }
  console.log(`Server Started and Listening at PORT ${PORT}`);
})

