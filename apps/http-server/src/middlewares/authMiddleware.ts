import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-comman/config"
import { NextFunction, Request, Response } from "express"

export function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"] || "";
    console.log("token ======",token);
    const decodedToken=jwt.verify(token,JWT_SECRET);
    if(decodedToken){
        req.userId =(decodedToken as jwt.JwtPayload).userId,
        next(); 
    }else {
        return res.status(403).json({
            message: "Unauthenticated User"
        });
    }
}