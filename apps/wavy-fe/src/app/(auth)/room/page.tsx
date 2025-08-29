"use client";
import { Button } from "@/components/ui/button";
import axios from "axios";
import React, { useEffect, useRef, useState } from "react";
import { HTTP_BACKEND_URL } from "../../../../config";
import { toast } from "sonner";
import { useRouter } from "next/navigation";
function Room() {
    const roomRef=useRef<HTMLInputElement>(null)
    const [token,setToken]=useState<string>("");
    const router=useRouter()

    useEffect(()=>{
        const storedToken=localStorage.getItem("token");
        console.log("token in effect ",typeof storedToken);

        if(!storedToken){
            console.log("token is not passed");
            return;
        }
        setToken(storedToken)
        console.log("token in the effect 2 ",token);
        // dependency error 
        // eslint-disable-next-line react-hooks/exhaustive-deps 
    },[]); 

    const JoinHandleSubmit=async (e:React.FormEvent)=>{
        e.preventDefault();
        
        if(!roomRef.current){
            return;
        }
        const roomName=roomRef.current?.value
        if (!roomName) {
            toast.warning("Room name cannot be empty");
            return;
            }
        console.log("join room name ",roomName);
       try {
         const res=await axios.get(`${HTTP_BACKEND_URL}/room/${roomName}`,{
            headers:{
                "authorization":token
            }
         }); 
         if(!res.data){
             console.log("Room cannot be joined ");
             return;
         }
         const roomId=res.data.roomId;
         toast.message(`Room Joined with ID ${roomId}`)
         console.log("the room is",res.data.roomId);
         router.replace(`/chat/${roomId}`)
       } catch (error) {
        toast.warning("Cannot Join Room",{
            description:"ERROR OCCURED IN JOINING ROOM "
        })
        console.log("Error in the room route",error);
       }
    }

    const createHandleSubmit=async(e:React.FormEvent)=>{
        console.log("token in the creation", token);
        e.preventDefault();
        if(!roomRef.current){
            return;
        }
        const roomName=roomRef.current?.value
        if (!roomName) {
            toast.error("Room name cannot be empty");
            return;
        }
        console.log("create room Name",roomName);
        try {
            const res=await axios.post(`${HTTP_BACKEND_URL}/room`,{
                roomName
            },{
                headers:{
                    "authorization":token
                }
            });
            if(!res.data){
             console.log("room cannot be created ");
             return;
         }
         const roomId=res.data.id;
         toast.message(`Room Created with ID ${roomId}`)

         console.log("the roomId is ",roomId);
         router.replace(`/chat/${roomId}`);
        } catch (error) {
            console.log("error in creation of room ",error);
                    toast.warning("Cannot Create Room",{
                    description:"ERROR OCCURED IN Creating ROOM"
        })
        }
    }
    return (
    <div className="min-h-screen flex items-center justify-center bg-background text-main">
        <div className="w-full max-w-md p-8 bg-secondary-background rounded-2xl shadow-shadow border border-border">
         <h2 className="text-2xl font-bold text-center mb-6 text-main">
            Create a Room | Join a Room
        </h2>
            <form className="space-y-4">
                        <div>
              <label className="block text-sm font-medium mb-1" htmlFor="roomName">
                RoomName
              </label>
              <input
              ref={roomRef}
                type="text"
                id="roomName"
                className="w-full px-4 py-2 rounded-lg border border-border bg-background focus:outline-none focus:ring-2 focus:ring-main"
                placeholder="Room Name"
              />
            </div>
            <Button type="button" className="w-full " onClick={JoinHandleSubmit} >Join Room</Button>
            <Button  type="button" className="w-full" onClick={createHandleSubmit}>Create Room</Button>
            </form>
        </div>
    </div>);
}

export default Room;