import { useState } from "react";
import { Chatbot } from "./Chatbot";

export const ChatbotProvider = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Chatbot 
      isOpen={isOpen} 
      onToggle={() => setIsOpen(!isOpen)} 
    />
  );
};