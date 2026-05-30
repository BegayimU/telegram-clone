import { getUsers } from "../../services/userService";
import { useState, useEffect, useRef } from "react";
import MainLayout from "../../layouts/MainLayout";
import { useParams } from "react-router-dom";
import { auth } from "../../firebase/auth";
import EmojiPicker from "emoji-picker-react";
import {
  sendMessage,
  subscribeMessages,
  deleteMessage,
} from "../../services/messageService";
import {
  Phone,
  MoreHorizontal,
  Smile,
  Paperclip,
  Send,
  MessageCircle,
} from "lucide-react";

const initialMessages = [
  {
    id: 1,
    sender: "Anna",
    type: "incoming",
    text: "Hello 👋",
  },
  {
    id: 2,
    sender: "Me",
    type: "outgoing",
    text: "Hi 😊",
  },
  {
    id: 3,
    sender: "Anna",
    type: "incoming",
    text: "How are you?",
  },
];

function ChatPage() {
  const { chatId } = useParams();

  const [message, setMessage] = useState("");
  const [showEmoji, setShowEmoji] = useState(false);
  const [messages, setMessages] = useState({
    1: initialMessages,
  });
  const currentMessages = messages[chatId] || [];
  const messagesEndRef = useRef(null);
  const [users, setUsers] = useState([]);
  const [showImageInput, setShowImageInput] = useState(false);
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const loadUsers = async () => {
      const data = await getUsers();
      setUsers(data);
    };

    loadUsers();
  }, []);

  useEffect(() => {
    if (!chatId) return;

    const unsubscribe = subscribeMessages(chatId, (data) => {
      setMessages((prev) => ({
        ...prev,
        [chatId]: data,
      }));
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({
      behavior: "smooth",
    });
  }, [messages]);

  const chat = users.find((user) => user.id === chatId);

  if (!users?.length) {
    return (
      <MainLayout>
        <div className="flex items-center justify-center h-full">
          Loading...
        </div>
      </MainLayout>
    );
  }

  const handleSend = async () => {
    if (!message.trim()) return;

    await sendMessage(chatId, auth.currentUser.uid, message, imageUrl);

    setMessage("");
    setImageUrl("");
  };

  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  const handleEmojiClick = (emojiData) => {
    setMessage((prev) => prev + emojiData.emoji);
  };

  return (
    <MainLayout>
      <div className="flex h-full flex-col bg-[#FFF7FB]">
        {/* Верхняя панель */}
        <header className="flex items-center justify-between gap-4 border-b border-[#F1E4FF] bg-white/80 px-6 py-4 shadow-sm">
          <div className="flex items-center gap-4">
            <div className="h-14 w-14 rounded-full bg-[#CDB4FF] grid place-items-center text-xl font-bold text-white shadow-[0_12px_30px_rgba(205,180,255,0.25)]">
              {chat ? chat?.name.charAt(0) : "?"}
            </div>

            <div>
              <p className="text-lg font-semibold text-[#2D2D2D]">
                {chat ? chat?.name : "Chat not found"}
              </p>

              <p
                className={`text-sm ${
                  chat?.status === "online"
                    ? "text-[#24C48A]"
                    : "text-[#8E8E93]"
                }`}
              >
                {chat?.status === "online"
                  ? "online"
                  : chat?.lastSeen
                    ? `last seen`
                    : "offline"}
              </p>
            </div>
          </div>

          {/* Кнопки справа */}

          <div className="flex items-center gap-3">
            <button
              className="inline-flex h-12 w-12 items-center justify-center rounded-[18px]
              bg-white shadow-sm border border-[#F1E4FF]
              text-[#2D2D2D]
              transition-all duration-300
              hover:bg-[#F5EEFF]
              hover:shadow-md
              hover:border-[#E9D7FF]"
            >
              <Phone size={20} />
            </button>

            <button
              className="inline-flex h-12 w-12 items-center justify-center rounded-[18px]
              bg-white shadow-sm border border-[#F1E4FF]
              text-[#2D2D2D]
              transition-all duration-300
              hover:bg-[#F5EEFF]
              hover:shadow-md
              hover:border-[#E9D7FF]"
            >
              <MoreHorizontal size={20} />
            </button>
          </div>
        </header>

        {/* Сообщения */}

        <div className="flex-1 overflow-hidden px-6 py-5">
          <div className="flex h-full flex-col rounded-[32px] bg-white p-6 shadow-[0_24px_60px_rgba(205,180,255,0.12)]">
            <div className="flex-1 overflow-y-auto pr-2">
              {chat ? (
                <div className="space-y-4">
                  {currentMessages.map((msg) => {
                    const isMyMessage = msg.senderId === auth.currentUser?.uid;

                    return (
                      <div
                        key={msg.id}
                        className={`group relative overflow-visible flex ${
                          isMyMessage ? "justify-end" : "justify-start"
                        }`}
                      >
                        <div
                          className={`relative max-w-[80%] rounded-[28px] p-4 shadow-sm ${
                            isMyMessage
                              ? "bg-[#CDB4FF]/30 text-[#2D2D2D]"
                              : "bg-[#FFF7FB] border border-[#E9D7FF] text-[#2D2D2D]"
                          }`}
                        >
                          {isMyMessage && (
                            <button
                              onClick={() => deleteMessage(msg.id)}
                              className="
                              absolute
                              top-2
                              right-3
                              opacity-0
                              group-hover:opacity-100
                              transition
                              text-red-500
                              "
                            >
                              🗑
                            </button>
                          )}
                          <p className="text-xs font-semibold text-[#8E8E93] mb-2">
                            {isMyMessage ? "Me" : chat?.name}
                          </p>

                          <div className="relative pr-12">
                            {msg.text && (
                              <p className="text-base leading-6 break-words">
                                {msg.text}
                              </p>
                            )}

                            {msg.image && (
                              <img
                                src={msg.image}
                                alt="message"
                                className="
                                mt-2
                                max-w-[260px]
                                rounded-2xl
                                object-cover
                                "
                              />
                            )}

                            <span
                              className="
                              absolute
                              bottom-0
                              right-0
                              text-[11px]
                              text-[#8E8E93]
                              "
                            >
                              {msg.createdAt
                                ? new Date(
                                    msg.createdAt.seconds * 1000,
                                  ).toLocaleTimeString([], {
                                    hour: "2-digit",
                                    minute: "2-digit",
                                  })
                                : ""}
                            </span>
                          </div>                          
                        </div>
                      </div>
                    );
                  })}

                  <div ref={messagesEndRef}></div>
                </div>
              ) : (
                <div className="h-full flex items-center justify-center">
                  <div className="text-center">
                    <div className="inline-flex h-24 w-24 items-center justify-center rounded-full bg-[#F7E8FF] shadow-[0_12px_30px_rgba(205,180,255,0.15)] mb-6">
                      <MessageCircle size={48} className="text-[#CDB4FF]" />
                    </div>

                    <h2 className="text-2xl font-semibold text-[#2D2D2D]">
                      Welcome to Telegram Clone
                    </h2>

                    <p className="text-sm text-[#8E8E93]">
                      Start a conversation
                    </p>
                  </div>
                </div>
              )}
            </div>

            {/* Поле ввода */}

            {chat && (
              <div className="mt-4 rounded-[28px] bg-[#F7E8FF] p-4 shadow-[0_16px_40px_rgba(205,180,255,0.12)]">
                <div className="flex items-center gap-3">
                  <div className="relative">
                    <button
                      onClick={() => setShowEmoji(!showEmoji)}
                      className="
                      inline-flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white
                      text-[#2D2D2D]
                      shadow-sm
                      border
                      border-[#F1E4FF]
                      transition
                      hover:bg-[#FFF0FF]
                      "
                    >
                      <Smile size={18} />
                    </button>

                    {showEmoji && (
                      <div className="absolute bottom-14 left-0 z-50">
                        <EmojiPicker onEmojiClick={handleEmojiClick} />
                      </div>
                    )}
                  </div>

                  <input
                    type="text"
                    placeholder="Type a message..."
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    onKeyDown={handleKeyDown}
                    className="flex-1
                    rounded-2xl
                    border border-[#E9D7FF]
                    bg-white
                    px-4 py-3
                    text-sm
                    text-[#2D2D2D]
                    placeholder:text-[#8E8E93]
                    outline-none
                    transition
                    focus:border-[#CDB4FF]
                    focus:ring-2
                    focus:ring-[#EFD9FF]"
                  />

                  <div className="relative">
                    <button
                      onClick={() => setShowImageInput(!showImageInput)}
                      className="
                      inline-flex
                      h-11
                      w-11
                      items-center
                      justify-center
                      rounded-2xl
                      bg-white
                      text-[#2D2D2D]
                      shadow-sm
                      transition
                      hover:bg-[#F7E8FF]
                      "
                    >
                      📎
                    </button>

                    {showImageInput && (
                      <div
                        className="
                        absolute
                        bottom-14
                        right-0
                        w-[260px]
                        rounded-2xl
                        border
                        border-[#E9D7FF]
                        bg-white
                        p-4
                        shadow-[0_15px_40px_rgba(205,180,255,0.2)]
                        z-50
                        "
                      >
                        <input
                          type="text"
                          placeholder="Paste image URL..."
                          value={imageUrl}
                          onChange={(e) => setImageUrl(e.target.value)}
                          className="
                          w-full
                          rounded-xl
                          border
                          border-[#E9D7FF]
                          px-4
                          py-3
                          text-sm
                          outline-none
                          focus:border-[#CDB4FF]
                          "
                        />

                        <button
                          onClick={() => {
                            if (!imageUrl) return;

                            handleSendImage(imageUrl);

                            setImageUrl("");

                            setShowImageInput(false);
                          }}
                          className="
                          mt-3
                          w-full
                          rounded-xl
                          bg-[#CDB4FF]
                          py-3
                          text-sm
                          font-medium
                          text-white
                          transition
                          hover:bg-[#b89dff]
                          "
                        >
                          Send image
                        </button>
                      </div>
                    )}
                  </div>

                  <button
                    onClick={handleSend}
                    className="inline-flex h-11 w-11 items-center justify-center rounded-2xl bg-[#CDB4FF]
                    text-white
                    shadow-[0_12px_30px_rgba(205,180,255,0.25)]
                    transition hover:bg-[#b89dff]"
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
