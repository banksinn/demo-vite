export default function JoinRoom({
  joinRoom,
  room,
}: {
  joinRoom: (value: string) => void;
  room: string;
}) {
  return (
    <div style={{ padding: 8 }}>
      <button style={{ margin: "0px 2px" }} onClick={() => joinRoom(room)}>
        {room}
      </button>
    </div>
  );
}
