import React, { useState } from 'react';
import { MessageSquare, X, Send } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export const FloatingChatButton: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ sender: 'agent' | 'user'; text: string }>>([
    { sender: 'agent', text: 'Namaste! Have a question about our signage, menu displays, or custom sizes across India? Ask us anything!' }
  ]);
  const [input, setInput] = useState('');

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userText = input;
    setMessages((prev) => [...prev, { sender: 'user', text: userText }]);
    setInput('');

    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          sender: 'agent',
          text: 'Thanks for reaching out! A member of the Moveon Signs team will respond shortly. In the meantime, feel free to explore our collection.'
        }
      ]);
    }, 1000);
  };

  return (
    <>
      {/* Floating Chat Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            className="fixed bottom-24 right-6 md:right-10 w-80 md:w-96 bg-[#FEFBF4] text-[#294A3A] border border-[#294A3A]/20 shadow-2xl z-50 rounded-lg overflow-hidden flex flex-col h-[450px]"
          >
            {/* Header */}
            <div className="bg-[#294A3A] text-[#FEFBF4] p-4 flex justify-between items-center">
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 rounded-full bg-[#FEFBF4]/20 flex items-center justify-center font-bold text-xs">
                  MOS
                </div>
                <div>
                  <h3 className="font-serif text-sm">Moveon Signs Support</h3>
                  <p className="text-[10px] text-[#FEFBF4]/70 uppercase tracking-widest">We typically reply in minutes</p>
                </div>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="p-1 hover:bg-[#FEFBF4]/10 rounded-full transition-colors"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Chat Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-[#F8F5EE]/60 text-xs">
              {messages.map((m, idx) => (
                <div
                  key={idx}
                  className={`flex ${m.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                >
                  <div
                    className={`max-w-[80%] p-3 rounded-md ${
                      m.sender === 'user'
                        ? 'bg-[#294A3A] text-[#FEFBF4]'
                        : 'bg-[#FEFBF4] text-[#294A3A] border border-[#294A3A]/10 shadow-sm'
                    }`}
                  >
                    {m.text}
                  </div>
                </div>
              ))}
            </div>

            {/* Input Form */}
            <form onSubmit={handleSend} className="p-3 border-t border-[#294A3A]/10 bg-[#FEFBF4] flex items-center space-x-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your message..."
                className="flex-1 bg-[#F8F5EE] border border-[#294A3A]/20 px-3 py-2 text-xs outline-none text-[#294A3A] rounded-sm"
              />
              <button
                type="submit"
                className="p-2 bg-[#294A3A] text-[#FEFBF4] hover:bg-[#213B2E] rounded-sm transition-colors"
                aria-label="Send message"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-[30px] right-[35px] w-[54px] h-[54px] md:w-[68px] md:h-[68px] rounded-full bg-[#FEFBF4] text-[#294A3A] border border-[#294A3A]/20 shadow-xl flex items-center justify-center hover:scale-105 active:scale-95 transition-all z-40"
        aria-label="Toggle Support Chat"
      >
        {isOpen ? (
          <X className="w-6 h-6 md:w-7 md:h-7 stroke-[2]" />
        ) : (
          <MessageSquare className="w-6 h-6 md:w-7 md:h-7 stroke-[1.75]" />
        )}
      </button>
    </>
  );
};
