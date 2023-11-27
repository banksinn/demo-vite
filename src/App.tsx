import { useCallback, useEffect, useState } from "react";
import { io, Socket } from "socket.io-client";
import "./App.css";
import MessageInput from "./MessageInput";
import Messages from "./Messages";
import Patient from "./Patient";
import JoinRoom from "./JoinRoom";

function App() {
  const [socket, setSocket] = useState<Socket>();
  const [messages, setMessages] = useState<
    { message: string; admin: { name: string }; createdAt: string }[]
  >([]);
  const joinRoom = (value: { room: string }) => {
    socket?.emit("join-room", { room: value.room });
  };
  const watchRoom = (value: { room: string; limit: number }) => {
    socket?.emit("scroll-message", { room: value.room, limit: value.limit });
  };
  const send = (value: { room: string; message: string }) => {
    socket?.emit("add-message", { room: value.room, message: value.message });
  };
  useEffect(() => {
    const socketOptions = {
      transportOptions: {
        polling: {
          extraHeaders: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDE3YzY3LWFiZDktNDg0MC05Yzc0LTk2Njk0NTVmMGY4OCIsInJvbGUiOiJwYXRpZW50IiwidHlwZSI6ImNvbW1vbiIsImNsaWVudCI6Im1hIiwiaWF0IjoxNzAxMDcwMzIwLCJleHAiOjE3MDExNTY3MjB9.rIWxQdBoSjsZg0OcLsYf0pi5WL9CoH_6PC_LKcYdWvM",
          },
        },
      },
    };
    const newSocket = io(
      "https://dev.api.medrefill-well.dev.witsawa.com",
      socketOptions
    );
    setSocket(newSocket);
  }, []);

  const messageListener = useCallback((message: any) => {
    setMessages(message.data);
  }, []);
  useEffect(() => {
    socket?.on("message", messageListener);
  }, [messageListener, socket]);
  useEffect(() => {
    socket?.on("unauthorized", (error) => console.log(error));
  }, [socket]);
  return (
    <>
      <div style={{ display: "flex", justifyContent: "center", gap: 8 }}>
        <div>
          <JoinRoom joinRoom={joinRoom} room="Patient1" />
          <Patient watchRoom={watchRoom} room="Patient1" limit={10} />
          <MessageInput send={send} room="Patient1" />
        </div>
        <div>
          <JoinRoom joinRoom={joinRoom} room="Patient2" />
          <Patient watchRoom={watchRoom} room="Patient2" limit={10} />
          <MessageInput send={send} room="Patient2" />
        </div>
        <div>
          <JoinRoom joinRoom={joinRoom} room="Patient3" />
          <Patient watchRoom={watchRoom} room="Patient3" limit={10} />
          <MessageInput send={send} room="Patient3" />
        </div>
      </div>
      <Messages messages={messages} />
    </>
  );
}

export default App;
