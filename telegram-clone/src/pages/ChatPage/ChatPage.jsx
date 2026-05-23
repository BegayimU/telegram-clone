import { useState } from 'react';
import MainLayout from '../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import {
  Phone,
  MoreHorizontal,
  Smile,
  Paperclip,
  Send,
  MessageCircle
} from 'lucide-react';

const chats = {
  '1': {
    name: 'Anna',
    status: 'online',
  },
  '2': {
    name: 'Alex',
    status: 'last seen',
  },
  '3': {
    name: 'Sara',
    status: 'typing...',
  },
};

const messages = [
  {
    id: 1,
    sender: 'Anna',
    type: 'incoming',
    text: 'Hello 👋',
  },
  {
    id: 2,
    sender: 'Me',
    type: 'outgoing',
    text: 'Hi 😊',
  },
  {
    id: 3,
    sender: 'Anna',
    type: 'incoming',
    text: 'How are you?',
  },
];

function ChatPage() {
  const { chatId } = useParams();
  const chat = chats[chatId];

  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim()) {
      console.log('Message sent:', message);
      setMessage('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-[#FFF7FB]">

        {/* Верхняя панель */}
        <header className="flex items-center justify-between gap-4 border-b border-[#F1E4FF] bg-white/80 px-6 py-4 shadow-sm">
          
          <div className="flex items-center gap-4">
            
            <div className="h-14 w-14 rounded-full bg-[#CDB4FF] grid place-items-center text-xl font-bold text-white">
              {chat ? chat.name.charAt(0) : '?'}
            </div>

            <div>
              <p className="text-lg font-semibold text-[#2D2D2D]">
                {chat ? chat.name : 'Chat not found'}
              </p>

              <p className="text-sm text-[#24C48A]">
                {chat ? chat.status : ''}
              </p>
            </div>

          </div>

          {/* Кнопки справа */}
          <div className="flex items-center gap-3">

            <button
              className="h-12 w-12 rounded-[18px] bg-white border border-[#F1E4FF] flex items-center justify-center hover:bg-[#FFF0FF]"
            >
              <Phone size={20}/>
            </button>

            <button
              className="h-12 w-12 rounded-[18px] bg-white border border-[#F1E4FF] flex items-center justify-center hover:bg-[#FFF0FF]"
            >
              <MoreHorizontal size={20}/>
            </button>

          </div>

        </header>

        {/* Сообщения */}
        <div className="flex-1 overflow-hidden px-6 py-5">

          <div className="flex h-full flex-col rounded-[32px] bg-white p-6 shadow-md">

            <div className="flex-1 overflow-y-auto">

              {chat ? (

                <div className="space-y-4">

                  {messages.map((msg) => (

                    <div
                      key={msg.id}
                      className={`flex ${
                        msg.type === 'outgoing'
                          ? 'justify-end'
                          : 'justify-start'
                      }`}
                    >

                      <div
                        className={`max-w-[70%] rounded-[28px] p-4 ${
                          msg.type === 'outgoing'
                            ? 'bg-[#CDB4FF]/30'
                            : 'bg-[#FFF7FB] border border-[#E9D7FF]'
                        }`}
                      >

                        <p className="text-xs text-[#8E8E93] mb-2">
                          {msg.sender}
                        </p>

                        <p>{msg.text}</p>

                      </div>

                    </div>

                  ))}

                </div>

              ) : (

                <div className="h-full flex items-center justify-center">

                  <div className="text-center">

                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#F7E8FF] mb-6">

                      <MessageCircle
                        size={48}
                        className="text-[#CDB4FF]"
                      />

                    </div>

                    <h2 className="text-2xl font-semibold">
                      Welcome to Telegram Clone
                    </h2>

                    <p className="text-sm text-[#8E8E93]">
                      Select a chat
                    </p>

                  </div>

                </div>

              )}

            </div>

            {/* Поле ввода */}
            {chat && (

              <div className="mt-4 rounded-[28px] bg-[#F7E8FF] p-4">

                <div className="flex items-center gap-3">

                  {/* Emoji */}
                  <button
                    className="h-11 w-11 rounded-2xl bg-white border border-[#F1E4FF] flex items-center justify-center"
                  >
                    <Smile size={18}/>
                  </button>

                  {/* Input */}
                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e)=>setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1 rounded-2xl border border-[#E9D7FF] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none transition focus:border-[#CDB4FF] focus:ring-2 focus:ring-[#EFD9FF]"
                  />

                  {/* Скрепка */}
                  <button
                    className="h-11 w-11 rounded-2xl bg-white border border-[#F1E4FF] flex items-center justify-center"
                  >
                    <Paperclip size={18}/>
                  </button>

                  {/* Отправка */}
                  <button
                    onClick={handleSend}
                    className="h-11 w-11 rounded-2xl bg-[#CDB4FF] text-white flex items-center justify-center hover:bg-[#b89dff]"
                  >
                    <Send size={18}/>
                  </button>

                </div>

              </div>

            )}

          </div>

        </div>

      </div>
    </MainLayout>
  );
}

export default ChatPage;