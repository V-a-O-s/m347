const express = require("express");
const mongoose = require("mongoose");
const path = require("path")
require("dotenv").config();

mongoose.connect(`${process.env.DB_URI}/${process.env.DB_NAME}`)
const db = mongoose.connection

db.on("error", (error) => {
  console.log("Error connecting to DB:", error);
});

db.once("open", () => {
  console.log("Connected to DB");
});

//REST API
const port = process.env.PORT;
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', '*');
  next();
});

app.use(express.json())

const dataRouter = require("./routes/data")
app.use("/data",dataRouter)

app.use(express.static("public"));
app.get("/",(req,res)=>{
    res.sendFile("Public","index.html")
})

app.get("/admin",(req,res)=>{
  res.sendFile(path.join(__dirname, "public", "/admin/admin.html"));
})

app.get("/new",(req,res)=>{
  res.sendFile(path.join(__dirname, "public", "new.html"));
})

app.listen(port, () => {
    console.log("Online on port " + port);
});
