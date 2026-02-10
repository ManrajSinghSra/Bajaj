
const express=require("express");
const { health } = require("../controllers/heath"); 

const healthRouter=express.Router();

healthRouter.get("/health", health)

module.exports={healthRouter}