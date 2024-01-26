import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import MessageContainer from "./components/MessageContainer";

const socket = io.connect("http://localhost:3000");

const ChatWindow = () => {
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState({});
  const [userId, setUserId] = useState("");

  const messagesEndRef = useRef();

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const displayMessage = (message) => {
    setMessages((prev) => [...prev, message]);
  };

  socket.on("connect", () => {
    setUserId(socket.id);
  });

  useEffect(() => {
    scrollToBottom();
    socket.on("receive-message", (msg) => {
      if (msg?.body?.length > 0) {
        displayMessage(msg);
      }
    });
    return () => {
      // Cleanup function to unsubscribe when the component unmounts
      socket.off("receive-message");
    };
  }, [messages]);

  const handleSubmit = (e) => {
    e.preventDefault();
    socket.emit("send-message", message);
    if (message) {
      setMessages((prev) => [...prev, message]);
    }
    setMessage({ body: "", sentBy: userId });
  };

  return (
    <div className="chatWindow">
      <MessageContainer
        messages={messages}
        messagesEndRef={messagesEndRef}
        userId={userId}
      />
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
