import mongoose from "mongoose";

const initializeDatabase = async () => {
    try {
        const MONGO_URI = process.env.MONGO_URI;
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
        });
        console.log("Connection to database successful");
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1); 
    }
};

export default initializeDatabase;
