const express = require("express");
const { createProduct, getProducts, deleteProduct } = require("../controllers/productController");
const { check } = require("express-validator");

const router = express.Router();

router.post(
  "/",
  [
    check("name").notEmpty().withMessage("Name is required"),
    check("quantity").isInt({ min: 0 }).withMessage("Quantity must be 0 or more"),
  ],
  createProduct
);

router.get("/", getProducts);
router.delete("/:id", deleteProduct);

module.exports = router;