"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Paperclip, Send, Phone, Video, Info, ChevronLeft } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Header } from "@/components/dashboard/header";
import { CONVERSATIONS, MESSAGES } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

export default function MessagesPage() {
    const [selectedId, setSelectedId] = useState<string | null>("conv-1");
    const [searchQuery, setSearchQuery] = useState("");
    const [messageInput, setMessageInput] = useState("");
    // Local state for messages to allow "sending"
    const [messagesMap, setMessagesMap] = useState(MESSAGES);
    const scrollRef = useRef<HTMLDivElement>(null);
    const [isMobileView, setIsMobileView] = useState(false);

    // Handle Resize
    useEffect(() => {
        const checkMobile = () => setIsMobileView(window.innerWidth < 768);
        checkMobile();
        window.addEventListener("resize", checkMobile);
        return () => window.removeEventListener("resize", checkMobile);
    }, []);

    const filteredConversations = CONVERSATIONS.filter(c =>
        c.clientName.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const selectedConversation = CONVERSATIONS.find(c => c.id === selectedId);
    const currentMessages = selectedId ? messagesMap[selectedId as keyof typeof MESSAGES] || [] : [];

    // Auto-scroll to bottom of chat
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [currentMessages, selectedId]);

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!messageInput.trim() || !selectedId) return;

        const newMessage = {
            id: `new-${Date.now()}`,
            sender: "trainer",
            text: messageInput,
            timestamp: "Just now",
            type: "text"
        };

        setMessagesMap(prev => ({
            ...prev,
            [selectedId]: [...(prev[selectedId as keyof typeof MESSAGES] || []), newMessage]
        }));

        setMessageInput("");
    };

    return (
        <div className="h-screen flex flex-col bg-white dark:bg-zinc-950 overflow-hidden">
            {/* <Header /> */}

            <div className="flex-1 flex overflow-hidden  px-4 py-4 max-w-7xl h-full gap-4 relative">

                {/* Left Panel: Conversation List */}
                <AnimatePresence mode="popLayout">
                    {(!isMobileView || !selectedId) && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            className="w-full md:w-[320px] lg:w-[380px] flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex-shrink-0 absolute md:relative z-10 h-full"
                        >
                            {/* Header */}
                            <div className="p-4 border-b border-gray-100 dark:border-white/5 space-y-4">
                                <div className="flex justify-between items-center">
                                    <div>
                                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Messages</h1>
                                        <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">3 unread</p>
                                    </div>
                                </div>
                                <div className="relative">
                                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search conversations..."
                                        className="pl-9 bg-gray-50 dark:bg-white/5 border-none"
                                        value={searchQuery}
                                        onChange={(e) => setSearchQuery(e.target.value)}
                                    />
                                </div>
                            </div>

                            {/* List */}
                            <ScrollArea className="flex-1">
                                <div className="p-2 space-y-1">
                                    {filteredConversations.map((conv) => (
                                        <div
                                            key={conv.id}
                                            onClick={() => setSelectedId(conv.id)}
                                            className={cn(
                                                "flex items-center gap-3 p-3 rounded-xl cursor-pointer transition-all",
                                                selectedId === conv.id
                                                    ? "bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20"
                                                    : "hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent"
                                            )}
                                        >
                                            <div className="relative">
                                                <Avatar className="w-12 h-12 border border-gray-100 dark:border-white/10">
                                                    <AvatarImage src={conv.avatar} />
                                                    <AvatarFallback>{conv.clientName[0]}</AvatarFallback>
                                                </Avatar>
                                                {conv.isOnline && (
                                                    <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full"></span>
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-baseline mb-0.5">
                                                    <h3 className={cn(
                                                        "text-sm font-semibold truncate",
                                                        conv.unreadCount > 0 ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                                                    )}>
                                                        {conv.clientName}
                                                    </h3>
                                                    <span className="text-[10px] text-gray-400 flex-shrink-0">{conv.timestamp}</span>
                                                </div>
                                                <p className={cn(
                                                    "text-xs truncate max-w-[180px]",
                                                    conv.unreadCount > 0 ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"
                                                )}>
                                                    {conv.lastMessage}
                                                </p>
                                            </div>
                                            {conv.unreadCount > 0 && (
                                                <div className="w-5 h-5 bg-green-500 text-white text-[10px] font-bold flex items-center justify-center rounded-full shadow-sm">
                                                    {conv.unreadCount}
                                                </div>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Right Panel: Chat Area */}
                <AnimatePresence mode="popLayout">
                    {selectedId && (
                        <motion.div
                            key={selectedId}
                            initial={{ x: "100%", opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: "100%", opacity: 0 }}
                            transition={{ type: "spring", damping: 25, stiffness: 200 }}
                            className="flex-1 flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden absolute md:relative w-full h-full z-20"
                        >
                            {selectedConversation ? (
                                <>
                                    {/* Chat Header */}
                                    <div className="p-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center bg-white/50 dark:bg-white/[0.02] backdrop-blur-sm">
                                        <div className="flex items-center gap-3">
                                            {isMobileView && (
                                                <Button variant="ghost" size="icon" onClick={() => setSelectedId(null)} className="-ml-2">
                                                    <ChevronLeft className="w-5 h-5" />
                                                </Button>
                                            )}
                                            <Avatar className="w-10 h-10 border border-gray-100 dark:border-white/10">
                                                <AvatarImage src={selectedConversation.avatar} />
                                                <AvatarFallback>{selectedConversation.clientName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-sm font-bold text-gray-900 dark:text-white">{selectedConversation.clientName}</h2>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Client</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-2">
                                            {/* <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <Video className="w-4 h-4" />
                                            </Button> */}
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <Info className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-6 space-y-6 bg-gray-50/30 dark:bg-zinc-950/30" ref={scrollRef}>
                                        {currentMessages.map((msg, idx) => {
                                            const isTrainer = msg.sender === 'trainer';
                                            return (
                                                <motion.div
                                                    key={msg.id}
                                                    initial={{ opacity: 0, y: 20, scale: 0.95 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ delay: idx * 0.1, type: "spring" }}
                                                    className={cn(
                                                        "flex w-full gap-3 max-w-[80%]",
                                                        isTrainer ? "ml-auto flex-row-reverse" : "mr-auto"
                                                    )}
                                                >
                                                    {!isTrainer && (
                                                        <Avatar className="w-8 h-8 border border-gray-100 dark:border-white/10 mt-1">
                                                            <AvatarImage src={selectedConversation.avatar} />
                                                            <AvatarFallback>{selectedConversation.clientName[0]}</AvatarFallback>
                                                        </Avatar>
                                                    )}

                                                    <div className={cn(
                                                        "flex flex-col gap-1",
                                                        isTrainer ? "items-end" : "items-start"
                                                    )}>
                                                        <div className={cn(
                                                            "p-3 rounded-2xl text-sm shadow-sm",
                                                            isTrainer
                                                                ? "bg-purple-600 text-white rounded-br-none"
                                                                : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-bl-none"
                                                        )}>
                                                            {msg.text}
                                                        </div>
                                                        <span className="text-[10px] text-gray-400 px-1">
                                                            {msg.timestamp}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/5">
                                        <form
                                            onSubmit={handleSendMessage}
                                            className="flex items-center justify-between gap-3 bg-gray-50 dark:bg-zinc-950/50 p-2 rounded-xl border border-gray-100 dark:border-white/5 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all"
                                        >
                                            <div className="flex flex-row  items-center" >
                                                <Button type="button" size="icon" className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                    <Paperclip className="w-4 h-4" />
                                                </Button>
                                                <Input
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    placeholder="Type your message..."
                                                    className="flex-1 border-none  px-2 h-auto py-2"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                size="icon"
                                                disabled={!messageInput.trim()}
                                                className={cn(
                                                    "rounded-lg w-8 h-8  transition-all",
                                                    messageInput.trim()
                                                        ? "bg-purple-600 text-white shadow-lg hover:bg-purple-700"
                                                        : "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                                                )}
                                            >
                                                <Send className="w-4 h-4" />
                                            </Button>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400">
                                    <div className="w-16 h-16 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-4">
                                        <Info className="w-8 h-8 opacity-50" />
                                    </div>
                                    <p>Select a conversation to start messaging</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>

            </div>
        </div>
    );
}
