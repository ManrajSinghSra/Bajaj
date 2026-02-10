const express=require("express");
const { bfhl } = require("../controllers/bfhl");

const bfhlRouter=express.Router();

bfhlRouter.post("/bfhl", bfhl)


module.exports={bfhlRouter}