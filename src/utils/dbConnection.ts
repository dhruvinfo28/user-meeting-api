import mongoose from 'mongoose'

const connectDb = async ()=> {
    let uri:string = process.env.DB_URI || 'mongodb://localhost:27017/user-meeting-db';
    return mongoose.connect(uri)
}

export default connectDb