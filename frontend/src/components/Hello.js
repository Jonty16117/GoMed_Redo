import React, { useState, useEffect } from "react";
import "./Hello.css";
import { io } from "socket.io-client";

function Hello() {
  // State variables
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

  // Initialize the socket using the useState hook
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    const socketInstance = io('http://localhost:5000');
    setSocket(socketInstance);
  
    // listen for events emitted by the server
  
    socketInstance.on('connect', () => {
      console.log('Connected to server');
    });

    socketInstance.on("answer", (data) => {
      let msgs = chats;
      msgs.push({ role: "server", content: data });
      setChats(msgs);
      setIsTyping(false);
    });
  
    return () => {
      if (socketInstance) {
        socketInstance.disconnect();
      }
    };
  }, []);

  // Handle sending messages via the socket
  const chat = async (e, message) => {
    e.preventDefault();

    if (!message) return;
    setIsTyping(true);

    let msgs = chats;
    msgs.push({ role: "user", content: message });
    setChats(msgs);

    setMessage("");

    // Emit the user's message as a "question" event to the Socket.IO server
    socket.emit("question", message);
  };

  // Return JSX for the component
  return (
    <main>
    <h1 className="logo">GoMed-ChatBOT</h1>

      <section>
        {chats && chats.length
          ? chats.map((chat, index) => (
              <p key={index} className={chat.role === "user" ? "user_msg" : ""}>
                <span>
                  <b>{chat.role.toUpperCase()}</b>
                </span>
                <span>:</span>
                <span>{chat.content}</span>
              </p>
            ))
          : ""}
      </section>

      <div className={isTyping ? "" : "hide"}>
        <p>
          <i>{isTyping ? "Typing" : ""}</i>
        </p>
      </div>

      <form action="" onSubmit={(e) => chat(e, message)}>
        <input
          type="text"
          name="message"
          value={message}
          placeholder="Type a message here and hit Enter..."
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
    </main>
  );
}

export default Hello;
