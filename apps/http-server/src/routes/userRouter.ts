import express from "express";
import {CreateUserSchema,GetUserSchema,RoomSchema} from "@repo/comman/types"
import jwt from "jsonwebtoken";
import {JWT_SECRET} from "@repo/backend-comman/config"
const router=express.Router();



router.post("/signin",(req,res)=>{

    const body=req.body;
    // add zod validations 
    const data=CreateUserSchema.safeParse(body);

    if(!data.success){
        return res.status(403).json({
            message:"Incorrect Inputs"
        });
    }

    // Db calls
    
    return res.json({
        message:"User Signed Up"
    });
})

router.post("/signin",(req,res)=>{
    const body=req.body;

    const data=GetUserSchema.safeParse(body);

    if(!data.success){
        return res.status(403).json({
            message:"Incorrect Inputs"
        });
    }
    // db call->for fetching the existing users else return no user exist
    // after this sign the jwt token and then send it to along with the res

    const userId=1;
    const token=jwt.sign({userId},JWT_SECRET);

    return res.json({
        message:"User Signed IN",
        token
    });
})

router.post("/room",(req,res)=>{
    
})


export default router;