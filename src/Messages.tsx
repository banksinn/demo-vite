export default function Messages({
  messages,
}: {
  messages: { message: string; admin: { name: string }; createdAt: string }[];
}) {
  console.log("messages", messages);
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <div>text: {message.message}</div>
          <div>createdAt: {message.createdAt}</div>
        </div>
      ))}
    </div>
  );
}
