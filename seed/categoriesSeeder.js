const mongoose = require("mongoose");
const Category = require("../models/Category");
require("dotenv").config();

const categories = ["Electronics", "Books", "Clothing", "Toys", "Furniture"];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    await Category.deleteMany();
    await Category.insertMany(categories.map(name => ({ name })));
    console.log("Categories seeded");
    process.exit();
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();