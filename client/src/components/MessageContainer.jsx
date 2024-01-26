const MessageContainer = ({ messages, messagesEndRef, userId }) => {
  console.log(messages);
  return (
    <div className="messageContainer">
      {messages.map((msg) => (
        <div
          key={Math.random() * 6}
          className={`message ${msg.sentBy === userId ? "sent" : "received"}`}
        >
          {msg.body}
        </div>
      ))}
      <div style={{ float: "left", clear: "both" }} ref={messagesEndRef}></div>
    </div>
  );
};

export default MessageContainer;
