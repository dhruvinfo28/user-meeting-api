import { Express, Request, Response } from "express"
import {createUser, fetchAllUsers} from "./controllers/user.controller"

const routes = (app: Express) => {

    //Check Api status
    app.get("/apiStatus", (req: Request, res: Response) => res.sendStatus(200))

    //Register a new user
    app.post("/users/new",createUser)

    //Get all users
    app.get("/users/all", fetchAllUsers)
}

export default routes