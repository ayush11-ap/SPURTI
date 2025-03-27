const Problem = require("../models/problem.model");
const {
  calculateUrgency,
  extractCity,
  analyzeProblems,
} = require("../utils/gemini.service");

module.exports.registerProblem = async (req, res) => {
  try {
    const { title, description, category, images, videos, votes, address } =
      req.body;

    const city = extractCity(address);
    const urgencyLevel = calculateUrgency(votes);

    // Create a new problem instance
    const newProblem = new Problem({
      title,
      description,
      category,
      images,
      videos,
      submittedBy: req.user._id, // Assigning the logged-in user as the submitter
      votes,
      address,
      address,
      city,
      urgencyLevel,
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

module.exports.problemFeed = async (req, res) => {
  try {
    const problems = await Problem.find({
      verified: true,
      verificationStatus: "approved",
    }).populate("submittedBy", "name email");
    res.status(200).json({ problems });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching problems: " + error.message });
  }
};

module.exports.aiProblemAnalysis = async (req, res) => {
  try {
    const problems = await Problem.find({
      verified: true,
      verificationStatus: "approved",
    }).populate("submittedBy", "name email");

    // Process problems to extract cities & urgency levels
    const processedProblems = problems.map((problem) => ({
      ...problem._doc,
      city: extractCity(problem.address),
      urgencyLevel: calculateUrgency(problem.votes),
    }));

    // Generate AI report
    const geminiResponse = await analyzeProblems(processedProblems);

    // Store report in MongoDB
    await Promise.all(
      processedProblems.map(async (problem) => {
        await Problem.findByIdAndUpdate(problem._id, {
          city: problem.city,
          urgencyLevel: problem.urgencyLevel,
          geminiReport: geminiResponse,
        });
      })
    );

    res.status(200).json({
      message: "Processing complete!",
      processedProblems,
      geminiReport: geminiResponse,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Error fetching problems: " + error.message });
  }
};
