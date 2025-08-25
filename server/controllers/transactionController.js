const Transaction = require("../models/Transaction");

exports.getTransactions = async (req, res) => {
  try {
    const transactions = await Transaction.find({ user: req.user._id }).sort({
      date: -1,
    });
    res.json(transactions);
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};

exports.addTransaction = async (req, res) => {
  try {
    const { type, amount } = req.body;
    const transaction = new Transaction({ user: req.user._id, type, amount });
    await transaction.save();
    res.json({ success: true, transaction });
  } catch (err) {
    res.status(500).json({ success: false, message: err.message });
  }
};
