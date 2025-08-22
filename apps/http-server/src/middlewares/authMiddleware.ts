import jwt from "jsonwebtoken"
import { JWT_SECRET } from "@repo/backend-comman/config"
import { NextFunction, Request, Response } from "express"

function authMiddleware(req:Request,res:Response,next:NextFunction){
    const token=req.headers["authorization"] || "";
    const decodedToken=jwt.verify(token,JWT_SECRET);
    if(decodedToken || typeof decodedToken ==="object"&&"userId" in decodedToken){
        req.body = {
                userId: (decodedToken as jwt.JwtPayload).userId,
                username: (decodedToken as jwt.JwtPayload).username || "",
            };
        next(); 
    }else {
        return res.status(403).json({
            message: "Unauthenticated User"
        });
    }
}