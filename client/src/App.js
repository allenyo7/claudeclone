import "./normal.css"
import "./App.css"
import React from 'react';

function App() {
  const [input, setInput] = React.useState("");
  const [chatLog, setChatLog] = React.useState([]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newMessage = { user: 'Me', message: input };
    setChatLog([...chatLog, newMessage]);
    
    try {
      console.log("Sending request to backend...");
      const response = await fetch('http://localhost:3080/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ prompt: input }),
      });
      const data = await response.json();
      console.log("Received response from backend:", data);
      setChatLog(prevChatLog => [...prevChatLog, newMessage, { user: 'AI', message: data.response }]);
    } catch (error) {
      console.error('Error:', error);
    }
    
    setInput("");
  };
  
  

  return (
    <div className="App">
      <aside className="sidemenu">
        <div className="side-menu-button">
          <span>+</span>
          New Chat
        </div>
      </aside>

      <section className="chatbox">
        <div className="chat-log">
          {chatLog.map((message, index) => (
            <div key={index} className={`chat-message ${message.user === 'Me' ? '' : 'chatgpt'}`}>
              <div className="chat-message-center">
                <div className={message.user === 'Me' ? "Avatar-me" : "Avatar-ai"}>
                  {message.user}
                </div>
                <div className="message">
                  {message.message}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="chat-input-holder">
          <form onSubmit={handleSubmit}>
            <textarea
              rows="1"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              className="chat-input-textarea"
              placeholder="Type your message to Blallen here"
            ></textarea>
            <button type="submit">Send</button>
          </form>
        </div>
      </section>
    </div>
  )
}

export default App