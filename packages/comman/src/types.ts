import {email, z} from "zod";

export const CreateUserSchema=z.object({
    username:z.string(),
    email:z.email(),
    password:z.string()
});

export const GetUserSchema=z.object({
    email:z.email(),
    password:z.string()
});

export const RoomSchema=z.object({
    roomName:z.string()
});