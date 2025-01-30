import mongoose from "mongoose";

const initializeDatabase = async() => {
    const MONGO_URI = process.env.MONGO_URI
    const connection = await mongoose.connect(MONGO_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000, 
      })
    if(!connection){
       return console.log("unable to connect to database")
    }
    console.log("Connection to database successfull")
}

export default initializeDatabase