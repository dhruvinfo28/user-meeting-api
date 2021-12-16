import { Express, Request, Response } from "express"
import {createUser, fetchAllUsers, fetchUser} from "./controllers/user.controller"
import { createMeeting, fetchAllMeetings, updateMeetingDate } from "./controllers/meeting.controller"
const routes = (app: Express) => {

    //Check Api status
    app.get("/apiStatus", (req: Request, res: Response) => res.sendStatus(200))

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