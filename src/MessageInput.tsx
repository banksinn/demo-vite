import { useState } from "react";

export default function MessageInput({
  send,
  room,
  type,
  imageId,
}: {
  send: (val: {
    room: string;
    type: string;
    message: string;
    imageId?: string;
  }) => void;
  room: string;
  type: string;
  imageId?: string;
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
          send({ room: room, type: type, message: value, imageId: imageId });
          setValue("");
        }}
      >
        Send
      </button>
    </>
  );
}
