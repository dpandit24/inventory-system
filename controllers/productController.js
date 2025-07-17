const Product = require("../models/Product");
const Category = require("../models/Category");
const { validationResult } = require("express-validator");

exports.createProduct = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });

    const { name, description, quantity, categories } = req.body;

    const existing = await Product.findOne({ name });
    if (existing) return res.status(400).json({ message: "Product name already exists" });

    const product = await Product.create({ name, description, quantity, categories });
    res.status(201).json(product);
  } catch (error) {
    next(error);
  }
};

exports.getProducts = async (req, res, next) => {
  try {
    const { page = 1, limit = 10, search = "", categories = "" } = req.query;

    const query = {};
    if (search) query.name = { $regex: search, $options: "i" };
    if (categories) query.categories = { $in: categories.split(",") };

    const total = await Product.countDocuments(query);
    const products = await Product.find(query)
      .populate("categories")
      .skip((page - 1) * limit)
      .limit(Number(limit))
      .sort({ createdAt: -1 });

    res.json({ total, products });
  } catch (error) {
    next(error);
  }
};

exports.deleteProduct = async (req, res, next) => {
  try {
    const product = await Product.findByIdAndDelete(req.params.id);
    if (!product) return res.status(404).json({ message: "Product not found" });
    res.json({ message: "Product deleted" });
  } catch (error) {
    next(error);
  }
};