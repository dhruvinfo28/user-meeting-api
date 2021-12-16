import { Request, Response } from "express"
import { UserZodObject } from "../utils/zodSchema"
import UserModel from "../models/user.model"

export const createUser = async (req: Request, res: Response) => {
    const validationResult = UserZodObject.safeParse(req.body)

    if (!validationResult.success) {
        return res.status(400).json({
            "error": "Bad Request",
            "requestType": "{username:string} and string is non-empty"
        })
    }

    try {
        const result = await UserModel.findOne({ username: validationResult.data.username })
        if (result) {
            return res.status(400).json({
                "error": "Duplicate Resource"
            })
        }

        const newUser = new UserModel(validationResult.data)
        const dbResult = await newUser.save();

        res.status(201).json({
            "message": "User saved",
            "uid": dbResult._id
        })

    } catch (UserModelError) {
        res.status(500).json({
            "message": "Please try again later"
        })
        console.log("Internal server error occured: ", UserModelError)
    }
}

export const fetchAllUsers = async (req: Request, res: Response) => {
    try {
        const dbResponse = await UserModel.find();
        res.status(200).json(dbResponse.map(user => ({
            "uid": user._id,
            "username": user.username
        })))
    } catch (error) {
        res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}

export const fetchUser = async (req: Request, res: Response) => {
    const validationResult = UserZodObject.safeParse(req.params);

    if (!validationResult.success) {
        return res.status(400).json({
            "error": "Bad Request",
            "requestType": "/users/<username>"
        })
    }

    try {
        const user = await UserModel.findOne({username:validationResult.data.username})
        res.status(200).json({
            "uid":user?._id,
            "username":user?.username
        })
    } catch (error) {
        res.status(500).json({
            "message": "Internal Server Error"
        })
    }
}