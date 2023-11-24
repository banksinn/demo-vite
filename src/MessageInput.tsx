import { useState } from "react";

export default function MessageInput({
  send,
  room,
}: {
  send: (val: { room: string; message: string }) => void;
  room: string;
}) {
  const [value, setValue] = useState("");
  return (
    <>
      <input
        onChange={(e) => setValue(e.target.value)}
        placeholder="Type your message..."
        value={value}
      />
      <button
        onClick={() => {
          send({ room: room, message: value });
          setValue("");
        }}
      >
        Send
      </button>
    </>
  );
}
