import mongoose from "mongoose"

interface Meeting{
    uid1:String,
    uid2:String,
    date: String,
    createdAt: Date,
    updatedAt: Date
}

const meetingSchema = new mongoose.Schema<Meeting>({
    uid1:{
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    uid2:{
        type:mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'user'
    },
    date:{
        type:String,
        required: true
    }
}, { timestamps: true})

const MeetingModel = mongoose.model<Meeting>("meeting",meetingSchema)

export default MeetingModel