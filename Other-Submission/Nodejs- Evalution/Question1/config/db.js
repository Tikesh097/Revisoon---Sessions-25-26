const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URL);
        console.log("MongoDB Connected Succesfully");
    } catch (error) {
        console.log("Database Connection Failed!",error.message);
       process.exit(1);
    }
};

module.exports = connectDB;