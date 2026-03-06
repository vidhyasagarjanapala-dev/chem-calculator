const History = require("../models/History");

exports.saveHistory = async (req, res) => {
  try {
    const { calculatorType, inputs, result } = req.body;

    if (!calculatorType || !inputs || result === undefined) {
      return res.status(400).json({ message: "Missing history data" });
    }

    const history = await History.create({
      user: req.user.id,
      calculatorType,
      inputs,
      result: String(result)
    });

    res.status(201).json({
      message: "History saved successfully",
      history
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.getHistory = async (req, res) => {
  try {
    const history = await History.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.status(200).json(history);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.deleteHistory = async (req, res) => {
  try {
    const deleted = await History.findOneAndDelete({
      _id: req.params.id,
      user: req.user.id
    });

    if (!deleted) {
      return res.status(404).json({ message: "History not found" });
    }

    res.status(200).json({ message: "History deleted successfully" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

exports.clearHistory = async (req, res) => {
  try {
    await History.deleteMany({ user: req.user.id });
    res.status(200).json({ message: "All history cleared" });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};