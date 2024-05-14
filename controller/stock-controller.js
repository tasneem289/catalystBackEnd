const Stock = require("../model/stock");
const appError = require("../utility/appError");
const User = require('../model/auth')

const getAllStocks = async (req, res) => {
  try {
    const stocks = await Stock.find();
    res.json(stocks);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};
const getStocks = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id);

    res.json(stock);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch stocks" });
  }
};

const addStock = async (req, res) => {
  try {
    const { amount, price } = req.body;
    const newStock = new Stock({
      amount,
      price,
    });
    await newStock.save(); 
    const userId = req.params.id;
    const projid =req.params.projid
    const user = await User.findById(userId);
    user.stocks.push(newStock._id);
    user.projects.push(projid);
    await user.save();
    res
      .status(201)
      .json({ message: "Stock added successfully", stock: newStock });
  } catch (error) {
    res.status(400).json({ error: error });
  }
};

const updateStock = async (req, res, next) => {
  try {
    const _id = req.params.id;
    const updatedStock = await Stock.updateOne(
      { _id: _id },
      { $set: { ...req.body } }
    );
    return res
      .status(200)
      .json({ status: "SUCCESSFULLY UPDATED", data: { Stock: updatedStock } });
  } catch (err) {
    const error = appError.create(" Stock not found", 404, "fail");
    return next(error);
  }
};

const deleteStock = async (req, res, next) => {
  try {
    await Stock.deleteOne({ _id: req.params.id });
    res.status(200).json({ status: "SUCCESSFULLY DELETED" });
  } catch (error) {
    const err = appError.create(" Stock not found", 404);
    return next(err);
  }
};

module.exports = {
  getAllStocks,
  getStocks,
  addStock,
  updateStock,
  deleteStock,
};
