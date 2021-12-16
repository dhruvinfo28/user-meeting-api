import { Request, Response } from "express"
import { MeetingZodObject } from "../utils/zodSchema"
import MeetingModel from "../models/meeting.model"
import UserModel from "../models/user.model"

export const createMeeting = async (req: Request, res: Response) => {

    //Validating the request body
    const validationResult = MeetingZodObject.safeParse(req.body)
    if (!validationResult.success) {
        return res.status(400).json({
            "error": "Bad Request",
            "requestType": "{uid1:string,uid2:string,date:string} and all are non-empty"
        })
    }

    //Checking if both the ids are same
    if (validationResult.data.uid1 === validationResult.data.uid2) {
        return res.status(400).json({
            "error": "A meeting with two same users is not possible"
        })
    }

    //Confirming user corresponding to uid1
    try {
        const uid1FindResult = await UserModel.findById(validationResult.data.uid1)
        if (!uid1FindResult) {
            return res.status(400).json({
                "error": `No user with uid: ${validationResult.data.uid1} found`,
            })
        }
    } catch (uid1FindError) {
        console.error("Error in finding uid1: ", uid1FindError);
        return res.status(400).json({
            "error": `Id: ${validationResult.data.uid1} is not a valid id`
        })
    }

    //Confirming user corresponding to uid2
    try {
        const uid2FindResult = await UserModel.findById(validationResult.data.uid2)
        if (!uid2FindResult) {
            return res.status(400).json({
                "error": `No user with uid: ${validationResult.data.uid2} found`,
            })
        }
    } catch (uid2FindError) {
        console.error("Error in finding uid2: ", uid2FindError);
        return res.status(400).json({
            "error": `Id: ${validationResult.data.uid2} is not a valid id`
        })
    }

    //Saving the meeting
    try {
        const newMeeting = new MeetingModel(validationResult.data)
        const dbResult = await newMeeting.save()
        res.status(201).json({
            "meeting_uid": dbResult._id
        })
    } catch (MeetingSaveError) {
        console.error(MeetingSaveError)
        return res.status(500).json({
            "message": "Please try again later"
        })
    }
}

export const fetchAllMeetings = async (req: Request, res: Response) => {
    try {
        const meetings = await MeetingModel.find();
        let meetingUserInfo = await Promise.all(meetings.map(async meeting =>{ 

            let user1 = await UserModel.findById(meeting.uid1).exec()
            let user2 = await UserModel.findById(meeting.uid2).exec()

            return {
                "meeting_uid":meeting._id,
                "Date":meeting.date,
                "user1": {
                    "uid": user1?._id,
                    "usernmae": user1?.username
                },
                "user2":{
                    "uid": user2?._id,
                    "usernmae": user2?.username
                }
            }
        }))
         
        res.status(200).json(meetingUserInfo)

    } catch (allMeetingFindError) {
        console.error("Error in finding all meetings: ", allMeetingFindError)
    }
}