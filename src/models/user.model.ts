import mongoose from "mongoose"

interface User{
    username: string
    createdAt: Date,
    updatedAt: Date
}

const userSchema = new mongoose.Schema<User>({
    username: {
        type: String,
        required: true,
        unique: true
    }
}, { timestamps: true })

const UserModel = mongoose.model<User>("user",userSchema)

export default UserModel