import {z} from "zod"

export const UserZodObject = z.object({
    username:z.string().min(1),
})

export const MeetingZodObject = z.object({
    uid1:z.string().min(1),
    uid2:z.string().min(1),
    date: z.string().min(1)
})

export const UpdateMeetingDateValidator = z.object({
    meeting_id: z.string().min(1),
    date: z.string().min(1)
})

