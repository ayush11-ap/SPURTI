const mongoose = require("mongoose");
const validator = require("validator");

const ProblemSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      validate: {
        validator: function (v) {
          return v.split(" ").length <= 20; // Ensure title has at most 20 words
        },
        message: "Title must not exceed 20 words.",
      },
    },
    description: {
      type: String,
      required: true,
      minlength: 20, // Minimum length for description
      maxlength: 2000, // Maximum length for description
    },
    category: {
      type: String,
      enum: [
        "education",
        "healthcare",
        "infrastructure",
        "environment",
        "technology",
        "others",
      ],
      required: true,
    },
    images: {
      type: [String], // Cloud storage URLs
      validate: {
        validator: function (v) {
          return v.every((url) =>
            /^https?:\/\/.+\.(jpg|jpeg|png|gif)$/.test(url)
          );
        },
        message:
          "All images must be valid URLs ending with .jpg, .jpeg, .png, or .gif.",
      },
    },
    videos: {
      type: [String],
      validate: {
        validator: function (v) {
          return v.every((url) =>
            /^https?:\/\/.+\.(mp4|avi|mov|wmv)$/.test(url)
          );
        },
        message:
          "All videos must be valid URLs ending with .mp4, .avi, .mov, or .wmv.",
      },
    },
    submittedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    verified: { type: Boolean, default: false },
    verificationStatus: {
      type: String,
      enum: ["pending", "approved", "rejected"],
      default: "pending",
    },
    assignedExperts: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    votes: { type: Number, default: 0, min: 0 }, // Community votes, cannot be negative
  },
  { timestamps: true }
);

module.exports = mongoose.model("Problem", ProblemSchema);
