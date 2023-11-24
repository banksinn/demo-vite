export default function Patient({
  watchRoom,
  room,
  limit,
}: {
  watchRoom: (value: { room: string; limit: number }) => void;
  room: string;
  limit: number;
}) {
  return (
    <div style={{ padding: 8 }}>
      <button
        style={{ margin: "0px 2px" }}
        onClick={() => watchRoom({ room: room, limit: limit })}
      >
        {room}
      </button>
    </div>
  );
}
