"use client";
import { useEffect, useState, useRef } from "react";
import { HTTP_BACKEND_URL, WEBSOCKET_URL } from "../../../../../config";
import { useParams } from "next/navigation";
import { MessageCircle } from "lucide-react";
import { ModeToggle } from "@/components/modeToogle";

type Message = {
  id: number;
  message: string;
  senderId: string;
  type: "incoming" | "outgoing";
};

function Chat() {
  const params = useParams();
  const roomId = Number(params?.roomId as string);
  const [userId,setUserId]=useState<string| null>(null)
  const [token, setToken] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");

  const socketRef = useRef<WebSocket | null>(null);

  // ✅ Load token only on client
  useEffect(() => {
    if (typeof window !== "undefined") {
      setToken(localStorage.getItem("token"));
      setUserId(localStorage.getItem("userId"));
    }
  }, []);

  // ✅ Setup WebSocket connection
  useEffect(() => {
    if (!roomId || !token) return;

    const ws = new WebSocket(`${WEBSOCKET_URL}?token=${token}`);
    socketRef.current = ws;

    ws.onopen = () => {
      console.log("Connected to WS server");
      ws.send(
        JSON.stringify({
          type: "join_room",
          roomId,
        })
      );
    };

   ws.onmessage = (event) => {
  try {
    const data = JSON.parse(event.data);

    if (data.type === "chat") {
      setMessages((prev) => {
        // if the server sent back a tempId, find optimistic msg and replace it
        if (data.tempId) {
          const exists = prev.find((m) => m.id === data.tempId);
          if (exists) {
            return prev.map((m) =>
              m.id === data.tempId
                ? {
                    ...m,
                    id: data.id, // replace tempId with real id from server
                    message: data.message,
                    senderId: data.senderId,
                    type: data.senderId === userId ? "outgoing" : "incoming",
                  }
                : m
            );
          }
        }

        // else, just append normally
        return [
          ...prev,
          {
            id: data.id || Date.now(),
            message: data.message,
            senderId: data.senderId,
            type: data.senderId === userId ? "outgoing" : "incoming",
          },
        ];
      });
    }
  } catch (err) {
    console.error("Failed to parse WS message:", err);
  }
};


    ws.onclose = () => {
      console.log("Disconnected from WS server");
    };

    ws.onerror = (err) => {
      console.error(" WebSocket error:", err);
    };

    return () => {
      ws.close();
      socketRef.current = null;
    };
  }, [roomId, token,userId]);


  useEffect(() => {
    if (!roomId || !token) return;

    const fetchChats = async () => {
      try {
        const res = await fetch(`${HTTP_BACKEND_URL}/chats/${roomId}`, {
          headers: { Authorization: token },
            });

        if (!res.ok) throw new Error("Failed to fetch chats");

        const data = await res.json();

        const formatted = data.messages.map((msg: Message) => ({
          id: msg.id,
          message: msg.message,
          senderId: msg.senderId,
          type: msg.senderId === userId ? "outgoing" : "incoming",
        }));

        setMessages(formatted); // keep natural order
      } catch (err) {
        console.error("Error fetching chats:", err);
      }
    };

    fetchChats();
  }, [roomId, token,userId]);

  const handleSend = () => {
    if (!socketRef.current || socketRef.current.readyState !== WebSocket.OPEN) {
      console.error("❌ WebSocket not connected");
      return;
    }

    if (!newMessage.trim()) return;
    const tempId = Date.now();
    const msg = {
      type: "chat",
      roomId,
      message: newMessage,
      senderId: userId,
      tempId
    };

    socketRef.current.send(JSON.stringify(msg));

    // Optimistic UI update
    setMessages((prev) => [
      ...prev,
      { id: tempId, message: newMessage, senderId: String(userId), type: "outgoing" },
    ]);

    setNewMessage("");
  };

  return (
    <div className="h-screen flex flex-col bg-background text-foreground">
       <header className="flex justify-between items-center px-8 py-4 shadow-sm bg-secondary-background sticky top-0 z-50 border-b border-border">
      <div className="flex flex-row justify-center items-center">
        <MessageCircle className="text-main mr-2"></MessageCircle>
      <h1 className="text-2xl font-bold text-main">Wavy Chat</h1>
      </div>
      <div className="flex items-center gap-4">
        <ModeToggle />
      </div>
    </header>
      {roomId ? (
        <>
          {/* Header */}
          <header className="p-4 border-b border-border bg-secondary-background flex items-center justify-between">
            <h2 className="text-xl font-semibold">Room: {roomId}</h2>
            <span
              className={`h-3 w-3 rounded-full ${
                socketRef.current?.readyState === WebSocket.OPEN
                  ? "bg-green-500"
                  : "bg-red-500"
              }`}
            ></span>
          </header>

          {/* Messages */}
          <div className="flex-1 p-6 space-y-4 overflow-y-auto">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={`flex ${
                  msg.type === "outgoing" ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`max-w-sm p-3 rounded-2xl shadow-sm ${
                    msg.type === "outgoing"
                      ? "bg-main text-main-foreground rounded-br-none"
                      : "bg-muted rounded-bl-none bg-secondary-background text-foreground"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <footer className="p-4 border-t border-border flex gap-2">
            <input
              type="text"
              placeholder="Type a message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 rounded-xl border border-border px-4 py-2 focus:outline-none focus:ring-2 focus:ring-main"
            />
            <button
              onClick={handleSend}
              className="px-4 py-2 bg-main text-main-foreground rounded-xl shadow-sm hover:opacity-90"
            >
              Send
            </button>
          </footer>
        </>
      ) : (
        <div className="flex-1 flex items-center justify-center text-muted-foreground">
          No room selected
        </div>
      )}
    </div>
  );
}

export default Chat;
