const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const { registerProblem } = require("../controllers/problem.controller");

const problemRouter = express.Router();

problemRouter.post("/submit", userAuth, registerProblem);

module.exports = problemRouter;
