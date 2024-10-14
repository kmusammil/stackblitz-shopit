const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://muzammilalparamb:3390@cluster0.0lv2m.mongodb.net/neodb?retryWrites=true&w=majority&appName=Cluster0'

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


module.exports = connectDB;
