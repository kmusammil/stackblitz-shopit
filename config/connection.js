const mongoose = require('mongoose');

const mongoURI = "mongodb+srv://muzammil:alparamb@shopit.xwq6a.mongodb.net/shopit?retryWrites=true&w=majority&appName=shopit"
// const mongoURI = "mongodb://localhost:27017/products"

const connectDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log('MongoDB connected successfully!');
  } catch (error) {
    console.error('MongoDB connection error:', error.message);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;
