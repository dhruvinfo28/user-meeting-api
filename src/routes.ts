import { Express, Request, Response } from "express"
import {createUser, fetchAllUsers, fetchUser} from "./controllers/user.controller"
import { createMeeting, fetchAllMeetings, updateMeetingDate } from "./controllers/meeting.controller"
const routes = (app: Express) => {

    //Check Api status
    app.get("/", (req: Request, res: Response) => res.status(200).json({
        "message":"API is up and running",
        "documentation" : "https://github.com/dhruvinfo28/user-meeting-api#readme"
    }))

    //Register a new user
    app.post("/users/new",createUser)

    //Get all users
    app.get("/users/all", fetchAllUsers)

    //Get user info corresponding to a user name
    app.get("/users/:username", fetchUser)

    //Create a new meeting
    app.post("/meetings/new", createMeeting)

    //Get all meetings
    app.get("/meetings/all", fetchAllMeetings)

    //Update meeting date
    app.patch("/meetings/updateDate",updateMeetingDate)
}

export default routes