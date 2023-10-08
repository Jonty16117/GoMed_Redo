// function Hello() 
// {
//     return(
//         <h1>Hello</h1>
//     )
   
// }

// export default Hello;

import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import "./Hello.css";

const socket = io("http://localhost:5000"); 

function Hello() {
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState([]);
  const [isTyping, setIsTyping] = useState(false);

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

    // Fetch is used to send the message to the server (you can adjust this based on your needs)
    fetch("http://localhost:8000/", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        chats,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        msgs.push(data.output);
        setChats(msgs);
        setIsTyping(false);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // useEffect to handle answers from the Socket.IO server
  useEffect(() => {
    socket.on("answer", (data) => {
      let msgs = chats;
      msgs.push({ role: "server", content: data });
      setChats(msgs);
      setIsTyping(false);
    });

    // Clean up the socket connection on component unmount
    return () => {
      socket.disconnect();
    };
  }, [chats]);

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
