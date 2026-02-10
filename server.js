const express = require("express");
const cors = require("cors");
const { bfhlRouter } = require("./routers/bfhl");
const {  healthRouter } = require("./routers/health");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
   


app.use("/",bfhlRouter);
app.use("/",healthRouter);
 
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
  console.log("Node version:", process.version);
});
