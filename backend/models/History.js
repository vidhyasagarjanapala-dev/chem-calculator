const mongoose = require("mongoose");

const historySchema = new mongoose.Schema(
  {
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    },
    calculatorType: {
      type: String,
      required: true
    },
    inputs: {
      type: Object,
      required: true
    },
    result: {
      type: String,
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("History", historySchema);