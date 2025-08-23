import express from "express";
import {CreateUserSchema,GetUserSchema,RoomSchema} from "@repo/comman/types"
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-comman/config"
import {prisma} from "@repo/db/client";
import { authMiddleware } from "../middlewares/authMiddleware";
import bcrypt from "bcrypt";

const router=express.Router();

declare global {
    namespace Express {
        interface Request {
            userId?: string;
        }
    }
}

router.post("/signup",async (req,res)=>{

    const body=req.body;
    // add zod validations 
    const parsedData=CreateUserSchema.safeParse(body);

    if(!parsedData.success){
        console.log(parsedData.error);
        return res.status(403).json({
            message:"Incorrect Inputs"
        });
    }
    // db
    try {
        const hashedPassword = await bcrypt.hash(parsedData.data?.password, 10);
        const createdUser = await prisma.user.create({
            data: {
                name: parsedData.data?.username,
                email: parsedData.data?.email,
                password: hashedPassword
            }
        });
        if(!createdUser){
            return res.json({
                message:"User Already Exist"
            });
        }
        return res.json({
            message:"User Signed Up",
            userId:createdUser.id
        });
    } catch (error) {
        console.log("error in signup route",error);
        return res.status(411).json({
            message:"User Already Exist"
        });
    }
})

router.post("/signin",async (req,res)=>{
    const body=req.body;

    const parsedData=GetUserSchema.safeParse(body);

    if(!parsedData.success){
        return res.status(403).json({
            message:"Incorrect Inputs"
        });
    }
    // db call->for fetching the existing users else return no user exist
    // after this sign the jwt token and then send it to along with the res

   try {
     const existingUser = await prisma.user.findFirst({
         where: {
             email: parsedData.data.email,
         }
     });

     if (!existingUser) {
         return res.status(404).json({
             message: "User does not exist"
         });
     }

     const hashedPasswordComparision = await bcrypt.compare(parsedData.data.password, existingUser.password as string);
     if (!hashedPasswordComparision) {
         return res.status(403).json({
             message: "Password is not Valid"
         });
     }

     const userId = existingUser.id;
     const token = jwt.sign({ userId }, JWT_SECRET);
     return res.json({
         message: "User Signed IN",
         token
     });
   } catch (error) {
    console.log("Error Occured  During Signup", error);
    return res.status(411).json({
        message: "Error Occured During SignUp"
        })
   }
});

router.post("/room",authMiddleware,async(req,res)=>{
    const parsedData=RoomSchema.safeParse(req.body);
    if(!parsedData.success){
        console.log("error ourrced in room route in the safeParsing",parsedData.error);
        return res.status(411).json({
            message:"provide the valid room name "
        });
    }
    const userId=req.userId;
    // console.log(userId);
    if(!userId){
        return res.status(404).json({
            message:"User not found for the middleware"
        });
    }
    try {
        const createdRoom=await prisma.room.create({
            data:{
                slug:parsedData.data.roomName,
                adminId:userId,
            }
        });
        return res.status(201).json({
            message:"Room Created",
            id:createdRoom.id
        });
    } catch (error) {
        console.log("Room already existed with this name");
        return res.status(411).json({
            message:"Room already existed with this name"
        });
    }

})


export default router;