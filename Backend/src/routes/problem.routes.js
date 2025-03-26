const express = require("express");
const { userAuth } = require("../middlewares/auth.middleware");
const {
  registerProblem,
  problemFeed,
} = require("../controllers/problem.controller");

const problemRouter = express.Router();

problemRouter.post("/submit", userAuth, registerProblem);
problemRouter.get("/allProblems", userAuth, problemFeed);

module.exports = problemRouter;
