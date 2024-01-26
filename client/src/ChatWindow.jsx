import { useEffect, useState } from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:3000");

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});
  const [userId, setUserId] = useState("");

  const displayMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  socket.on("connect", () => {
    setUserId(socket.id);
  });

  useEffect(() => {
    socket.on("receive-message", (msg) => {
      if (msg?.body?.length > 0) {
        displayMessage(msg);
      }
    });
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    // console.log("sending message");
    socket.emit("send-message", message);
    if (message) {
      setMessages((prev) => [...prev, message]);
    }
    setMessage({});
  };

  return (
    <div className="chatWindow">
      <div className="messageContainer">
        {messages.map((msg) => (
          <div
            key={Math.random() * 6}
            className={`message ${msg.sentBy === userId ? "sent" : "received"}`}
          >
            {msg.body}
          </div>
        ))}
      </div>
      <form action="" onSubmit={handleSubmit}>
        <div className="inputContainer">
          <input
            type="text"
            onChange={(e) =>
              setMessage(() => {
                return { body: e.target.value, sentBy: userId };
              })
            }
            value={message.body}
          />
          <button type="sumbit">Send</button>
        </div>
      </form>
    </div>
  );
};

export default ChatWindow;
