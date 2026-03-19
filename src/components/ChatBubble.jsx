import React from 'react';

const ChatBubble = ({ message, sender }) => {
  return (
    <div key={message} className={`chat-bubble ${sender}`}>
      <div className="message-content">
        {message}
      </div>
    </div>
  );
};

export default ChatBubble;
