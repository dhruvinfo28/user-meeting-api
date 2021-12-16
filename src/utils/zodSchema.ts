import {z} from "zod"

export const UserZodObject = z.object({
    username:z.string().min(1),
})

