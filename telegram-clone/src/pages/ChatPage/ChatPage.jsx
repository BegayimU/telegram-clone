import MainLayout from '../../layouts/MainLayout';
import { useParams } from 'react-router-dom';
import { Phone, MoreHorizontal, Smile, Paperclip, Send } from 'lucide-react';

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

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-[#FFF7FB]">
        <header className="flex items-center justify-between gap-4 border-b border-[#F1E4FF] bg-white/80 px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#CDB4FF] grid place-items-center text-xl font-bold text-white shadow-[0_12px_30px_rgba(205,180,255,0.25)]">
              {chat ? chat.name.charAt(0) : '?'}
            </div>
            <div>
              <p className="text-lg font-semibold text-[#2D2D2D]">
                {chat ? chat.name : 'Chat not found'}
              </p>
              <p className={`text-sm ${chat ? 'text-[#24C48A]' : 'text-[#FF6B6B]'}`}>
                {chat ? chat.status : 'Chat not found'}
              </p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-white shadow-sm border border-[#F1E4FF] text-[#2D2D2D] transition hover:bg-[#F7E8FF]"
            >
              <Phone size={18} />
            </button>
            <button
              type="button"
              className="inline-flex h-11 w-11 items-center justify-center rounded-[18px] bg-white shadow-sm border border-[#F1E4FF] text-[#2D2D2D] transition hover:bg-[#F7E8FF]"
            >
              <MoreHorizontal size={18} />
            </button>
          </div>
        </header>

        <div className="flex-1 overflow-hidden px-6 py-5">
          <div className="flex h-full flex-col rounded-[32px] bg-[#FFFFFF] p-6 shadow-[0_24px_60px_rgba(205,180,255,0.12)]">
            <div className="flex-1 overflow-y-auto pr-2">
              {chat ? (
                <div className="space-y-4">
                  {messages.map((message) => (
                    <div
                      key={message.id}
                      className={`flex ${message.type === 'outgoing' ? 'justify-end' : 'justify-start'}`}
                    >
                      <div
                        className={`max-w-[70%] rounded-[28px] p-4 shadow-sm ${
                          message.type === 'outgoing'
                            ? 'bg-[#CDB4FF]/30 text-[#2D2D2D]' 
                            : 'bg-[#FFF7FB] border border-[#E9D7FF] text-[#2D2D2D]'
                        }`}
                      >
                        <p className="text-xs font-semibold text-[#8E8E93] mb-2">{message.sender}</p>
                        <p className="text-base leading-7">{message.text}</p>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="flex h-full items-center justify-center text-center text-[#2D2D2D]">
                  <p className="text-xl font-semibold">Chat not found</p>
                </div>
              )}
            </div>

            {chat && (
              <div className="mt-4 rounded-[28px] bg-[#F7E8FF] p-4 shadow-[0_16px_40px_rgba(205,180,255,0.12)]">
                <div className="flex items-center gap-3">
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#2D2D2D] shadow-sm border border-[#F1E4FF] transition hover:bg-[#FFF0FF]"
                  >
                    <Smile size={18} />
                  </button>
                  <input
                    type="text"
                    placeholder="Type a message..."
                    className="flex-1 rounded-2xl border border-[#E9D7FF] bg-white px-4 py-3 text-sm text-[#2D2D2D] outline-none transition focus:border-[#CDB4FF] focus:ring-2 focus:ring-[#EFD9FF]"
                  />
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-white text-[#2D2D2D] shadow-sm border border-[#F1E4FF] transition hover:bg-[#FFF0FF]"
                  >
                    <Paperclip size={18} />
                  </button>
                  <button
                    type="button"
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CDB4FF] text-white shadow-[0_12px_30px_rgba(205,180,255,0.25)] transition hover:bg-[#b89dff]"
                  >
                    <Send size={18} />
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
