export default function Messages({
  messages,
}: {
  messages: { chatmessage_message: string; chatmessage_createdAt: string }[];
}) {
  console.log("messages", messages);
  return (
    <div>
      {messages.map((message, index) => (
        <div key={index}>
          <div>text: {message.chatmessage_message}</div>
          <div>createdAt: {message.chatmessage_createdAt}</div>
        </div>
      ))}
    </div>
  );
}
