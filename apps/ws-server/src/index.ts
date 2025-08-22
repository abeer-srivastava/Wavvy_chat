import { WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-comman/config";
const wss=new WebSocketServer({port:8000},()=>{
    console.log("WS Server on Port",8000);
});


wss.on("connection",(ws,request)=>{

    const url=request.url
    if(!url){
        ws.close();
        return ;
    }
    const queryParams=new URLSearchParams(url.split("?")[1]);
    const token=queryParams.get("token")||"";

    const decodedToken=jwt.verify(token,JWT_SECRET);
    if(!decodedToken || !(decodedToken as JwtPayload).userId){
        ws.close();
        console.log("user not authenticated for ws");
        return ;
    }

    ws.on("message",(data)=>{
        ws.send("Hello");
    })
});