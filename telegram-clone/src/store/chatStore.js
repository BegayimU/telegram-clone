import { create } from 'zustand';

const useChatStore = create((set) => ({
  chats: [],

  selectedChat: null,

  setChats: (chats) =>
    set({
      chats,
    }),

  setSelectedChat: (chat) =>
    set({
      selectedChat: chat,
    }),
}));

export default useChatStore;