import { WebSocket, WebSocketServer } from "ws";
import jwt, { JwtPayload } from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-comman/config";
import {prisma} from "@repo/db/client"
interface User{
    ws:WebSocket,
    userId:string,
    rooms:string[]
}

const wss=new WebSocketServer({port:8000},()=>{
    console.log("WS Server on Port",8000);
});

const users:User[]=[];

function checkUser(token:string):string|null{
   const decodedToken=jwt.verify(token,JWT_SECRET);
    if(!decodedToken || !(decodedToken as JwtPayload).userId){
        console.log("user not authenticated for ws");
        return null ;
    }
    return (decodedToken as JwtPayload).userId;

    
}

wss.on("connection",(ws,request)=>{

    const url=request.url
    if(!url){
        ws.close();
        return ;
    }
    const queryParams=new URLSearchParams(url.split("?")[1]);
    const token=queryParams.get("token")||"";
    const userId=checkUser(token);

    if(!userId){
        ws.close()
        return;
    }
 
    users.push({
        userId,
        rooms:[],
        ws
    })


    ws.on("message",async(data)=>{
        const parsedData=JSON.parse(data as unknown as string); //{type:"join_room","roomId":1}
        if(parsedData.type==="join_room"){
            const user=users.find(x=>x.ws===ws);
            user?.rooms.push(parsedData.roomId);
        }
        if(parsedData.type==="leave_room"){
            const user=users.find(x=>x.ws===ws);
            if(!user){
                console.log("user not found.")
                return;
            }
            user.rooms=user?.rooms.filter(x=>x===parsedData.roomId);
        }
        if(parsedData.type==="chat"){
            const roomId=parsedData.roomId
            const message=parsedData.message
            await prisma.chat.create({
                data:{
                    roomId,
                    message,
                    userId,
                }
            })
            users.forEach(user=>{
                if(user.rooms.includes(roomId)){
                    user.ws.send(JSON.stringify({
                        type:"chat",
                        message:message,
                        roomId
                    }));
                }
            });

        }

    })
});