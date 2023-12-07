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
    { chatmessage_message: string; chatmessage_createdAt: string }[]
  >([]);
  const readRoom = (value: { room: string }) => {
    socket?.emit("read-room", { room: value.room });
  };
  const joinRoom = (value: { room: string }) => {
    socket?.emit("join-room", { room: value.room });
  };
  const watchRoom = (value: { room: string; limit: number }) => {
    socket?.emit("scroll-message", { room: value.room, limit: value.limit });
  };
  const send = (value: {
    room: string;
    type: string;
    message: string;
    imageId?: string;
  }) => {
    socket?.emit("add-message", {
      room: value.room,
      type: value.type,
      message: value.message,
      imageId: value.imageId,
    });
  };
  // admin, patient
  useEffect(() => {
    const socketOptions = {
      transportOptions: {
        polling: {
          // extraHeaders: {
          //   Authorization:
          //     "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjlkZTg3NmRmLWNjNDMtNDkzYy04NzM1LTU1MDQ1OTcxOTI3MiIsInJvbGUiOiJhZG1pbiIsInR5cGUiOiJjb21tb24iLCJjbGllbnQiOiJ3YSIsImlhdCI6MTcwMTY4NzQwOSwiZXhwIjoxNzAxNzczODA5fQ.I1pueevmDt-cgLMY2EnZcOVnLT2AW5nQLgRfTA5-cik",
          // },
          extraHeaders: {
            Authorization:
              "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxNDE3YzY3LWFiZDktNDg0MC05Yzc0LTk2Njk0NTVmMGY4OCIsInJvbGUiOiJwYXRpZW50IiwidHlwZSI6ImNvbW1vbiIsImNsaWVudCI6Im1hIiwiaWF0IjoxNzAxNjg0MTc4LCJleHAiOjE3MDE3NzA1Nzh9.OzeT5KLq9H1ryIuXcSmiHVmzS7QGfcSDVumCeGDCfYI",
          },
        },
      },
    };
    const newSocket = io(
      "https://dev.api.medrefill-well.dev.witsawa.com",
      // "http://localhost:3000",
      socketOptions
    );
    setSocket(newSocket);
  }, []);

  const messageListener = useCallback((message: any) => {
    console.log("message", message);
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
        <button
          style={{ margin: "0px 2px" }}
          onClick={() => readRoom({ room: "Patient1" })}
        >
          read
        </button>
        <div>
          <JoinRoom joinRoom={joinRoom} room="Patient1" />
          <Patient watchRoom={watchRoom} room="Patient1" limit={20} />
          <MessageInput send={send} room="Patient1" type="text" />
        </div>
        <div>
          <JoinRoom joinRoom={joinRoom} room="Patient2" />
          <Patient watchRoom={watchRoom} room="Patient2" limit={10} />
          <MessageInput
            send={send}
            room="Patient2"
            type="image"
            imageId="94263ac2-4479-451e-8330-1adb6565e223"
          />
        </div>
        <div>
          <JoinRoom joinRoom={joinRoom} room="Patient3" />
          <Patient watchRoom={watchRoom} room="Patient3" limit={10} />
          <MessageInput
            send={send}
            room="Patient3"
            type="image"
            imageId="94263ac2-4479-451e-8330-1adb6565e223"
          />
        </div>
      </div>
      <Messages messages={messages} />
    </>
  );
}

export default App;
