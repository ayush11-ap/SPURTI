const Problem = require("../models/problem.model");

module.exports.registerProblem = async (req, res) => {
  try {
    const { title, description, category, images, videos } = req.body;

    // Create a new problem instance
    const newProblem = new Problem({
      title,
      description,
      category,
      images,
      videos,
      submittedBy: req.user._id, // Assigning the logged-in user as the submitter
    });

    // Save the problem to the database
    await newProblem.save();

    res
      .status(201)
      .json({ message: "Problem submitted successfully", problem: newProblem });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error submitting problem: " + error.message });
  }
};
