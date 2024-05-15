import { create } from 'zustand'

const useConversion = create((set) => ({
  selectedConversion: null,
  setSelectedConversation: (selectedConversion) => set({selectedConversion}) ,
  
  messages: [],
	setMessages: (messages) => set({ messages }),
}))

export default useConversion