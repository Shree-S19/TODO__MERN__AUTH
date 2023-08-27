const express = require("express");
const app = express();
const cors = require("cors");
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const dotenv = require('dotenv');

const mongoose = require("mongoose");
const allRoutes = require ("./routes/index.js");

// Load environment variables from .env
dotenv.config();

app.use(cors({
    origin: 'http://localhost:5173', // Set your frontend URL here
    credentials: true, // Allow credentials (cookies)
}));
app.use(morgan('tiny'));
app.use(express.json());
app.use(cookieParser());

app.use('/api', allRoutes);

app.use((err, req, res, next) => {
    const status = err.statusCode || 500;
    const message = err.message || "Internal Server Error";

    return res.status(status).json({ message, stack: err.stack });
});

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb://127.0.0.1:27017/task_management_record");
        console.log("db connected")
    } catch (err) {
        console.log(err);
    }
}

const PORT = process.env.PORT || 3000; // Corrected line

connectDB().then(() => {
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
});
