"use client";

import { useState, useRef, useEffect } from "react";
import { Search, MoreVertical, Paperclip, Send, Phone, Video, Info, ChevronLeft, Filter, Check } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Header } from "@/components/dashboard/header";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data
type UserRole = "Client" | "Trainer" | "Associate" | "Admin";

interface Conversation {
    id: string;
    userId: string;
    userName: string;
    userRole: UserRole;
    userAvatar: string;
    lastMessage: string;
    timestamp: string;
    unreadCount: number;
    isOnline: boolean;
}

const CONVERSATIONS: Conversation[] = [
    {
        id: "conv-1",
        userId: "u-1",
        userName: "John Smith",
        userRole: "Client",
        userAvatar: "https://i.pravatar.cc/150?u=john",
        lastMessage: "Thanks for the workout plan!",
        timestamp: "Yesterday",
        unreadCount: 1,
        isOnline: true
    },
    {
        id: "conv-2",
        userId: "u-2",
        userName: "Sarah Johnson",
        userRole: "Trainer",
        userAvatar: "https://i.pravatar.cc/150?u=sarahj",
        lastMessage: "I updated the class schedule",
        timestamp: "Yesterday",
        unreadCount: 0,
        isOnline: false
    },
    {
        id: "conv-3",
        userId: "u-3",
        userName: "Mike Chen",
        userRole: "Trainer",
        userAvatar: "https://i.pravatar.cc/150?u=mike",
        lastMessage: "Can we discuss the new equipment?",
        timestamp: "Yesterday",
        unreadCount: 1,
        isOnline: true
    },
    {
        id: "conv-4",
        userId: "u-4",
        userName: "Emma Davis",
        userRole: "Associate",
        userAvatar: "https://i.pravatar.cc/150?u=emma",
        lastMessage: "The morning class was full today",
        timestamp: "Jan 10",
        unreadCount: 0,
        isOnline: false
    },
    {
        id: "conv-5",
        userId: "u-5",
        userName: "Lisa Brown",
        userRole: "Admin",
        userAvatar: "https://i.pravatar.cc/150?u=lisa",
        lastMessage: "Monthly report is ready",
        timestamp: "Jan 10",
        unreadCount: 0,
        isOnline: false
    }
];

const MESSAGES = {
    "conv-1": [
        { id: "m-1", sender: "client", text: "Hi, I have a question about the workout plan", timestamp: "2:25 PM" },
        { id: "m-2", sender: "admin", text: "Sure, what would you like to know?", timestamp: "2:26 PM" },
        { id: "m-3", sender: "client", text: "Is it okay to do cardio on rest days?", timestamp: "2:27 PM" },
        { id: "m-4", sender: "admin", text: "Yes, light cardio is fine on rest days. Just keep it moderate intensity.", timestamp: "2:29 PM" },
        { id: "m-5", sender: "client", text: "Thanks for the workout plan!", timestamp: "2:30 PM" }
    ],
    "conv-2": [
        { id: "m-1", sender: "trainer", text: "I updated the class schedule for next week.", timestamp: "Yesterday" },
        { id: "m-2", sender: "admin", text: "Great, thanks Sarah!", timestamp: "Yesterday" }
    ],
    "conv-3": [
        { id: "m-1", sender: "trainer", text: "Can we discuss the new equipment order?", timestamp: "Yesterday" }
    ]
};

const ROLE_COLORS: Record<UserRole, string> = {
    Client: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300",
    Trainer: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300",
    Associate: "bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300",
    Admin: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
};

export default function AdminInboxPage() {
    const [selectedId, setSelectedId] = useState<string | null>("conv-1");
    const [searchQuery, setSearchQuery] = useState("");
    const [roleFilter, setRoleFilter] = useState<string>("All Roles");
    const [messageInput, setMessageInput] = useState("");
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

    // Scroll to bottom
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
        }
    }, [messagesMap, selectedId]);

    const filteredConversations = CONVERSATIONS.filter(c => {
        const matchesSearch = c.userName.toLowerCase().includes(searchQuery.toLowerCase());
        const matchesRole = roleFilter === "All Roles" || c.userRole === roleFilter;
        return matchesSearch && matchesRole;
    });

    const selectedConversation = CONVERSATIONS.find(c => c.id === selectedId);
    const currentMessages = selectedId ? messagesMap[selectedId as keyof typeof MESSAGES] || [] : [];

    const handleSendMessage = (e?: React.FormEvent) => {
        e?.preventDefault();
        if (!messageInput.trim() || !selectedId) return;

        const newMessage = {
            id: `new-${Date.now()}`,
            sender: "admin",
            text: messageInput,
            timestamp: "Just now"
        };

        setMessagesMap(prev => ({
            ...prev,
            [selectedId]: [...(prev[selectedId as keyof typeof MESSAGES] || []), newMessage]
        }));
        setMessageInput("");
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex flex-col bg-white dark:bg-zinc-950 overflow-hidden">
            {/* <Header /> */}

            <div className="flex-1 flex overflow-hidden container mx-auto px-0 md:px-4 py-4 max-w-7xl h-full gap-4 relative">

                {/* Sidebar (List) */}
                <AnimatePresence mode="popLayout">
                    {(!isMobileView || !selectedId) && (
                        <motion.div
                            initial={{ x: -20, opacity: 0 }}
                            animate={{ x: 0, opacity: 1 }}
                            exit={{ x: -300, opacity: 0 }}
                            className="w-full md:w-[320px] lg:w-[380px] flex flex-col bg-white dark:bg-zinc-900 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex-shrink-0 absolute md:relative z-10 h-full"
                        >
                            <div className="p-4 border-b border-gray-100 dark:border-white/5 space-y-4">
                                <div>
                                    <h1 className="text-xl font-bold text-gray-900 dark:text-white">Inbox</h1>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 font-medium">Centralized messaging for all users</p>
                                </div>
                                <div className="space-y-2">
                                    <div className="relative">
                                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                        <Input
                                            placeholder="Search conversations..."
                                            className="pl-9 bg-gray-50 dark:bg-white/5 border-none h-9"
                                            value={searchQuery}
                                            onChange={(e) => setSearchQuery(e.target.value)}
                                        />
                                    </div>
                                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                                        <SelectTrigger className="w-full bg-gray-50 dark:bg-white/5 border-none h-9 text-xs">
                                            <SelectValue placeholder="Filter by Role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="All Roles">All Roles</SelectItem>
                                            <SelectItem value="Client">Clients</SelectItem>
                                            <SelectItem value="Trainer">Trainers</SelectItem>
                                            <SelectItem value="Associate">Staff</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                            </div>

                            <ScrollArea className="flex-1">
                                <div className="p-2 space-y-1">
                                    {filteredConversations.map((conv) => (
                                        <div
                                            key={conv.id}
                                            onClick={() => setSelectedId(conv.id)}
                                            className={cn(
                                                "flex items-start gap-3 p-3 rounded-xl cursor-pointer transition-all relative group",
                                                selectedId === conv.id
                                                    ? "bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20"
                                                    : "hover:bg-gray-50 dark:hover:bg-white/5 border border-transparent"
                                            )}
                                        >
                                            <div className="relative">
                                                <Avatar className="w-10 h-10 border border-gray-100 dark:border-white/10">
                                                    <AvatarImage src={conv.userAvatar} />
                                                    <AvatarFallback>{conv.userName[0]}</AvatarFallback>
                                                </Avatar>
                                                {conv.isOnline && (
                                                    <span className="absolute bottom-0 right-0 w-2.5 h-2.5 bg-green-500 border-2 border-white dark:border-zinc-900 rounded-full" />
                                                )}
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <div className="flex justify-between items-center mb-1">
                                                    <h3 className={cn(
                                                        "text-sm font-semibold truncate",
                                                        conv.unreadCount > 0 ? "text-gray-900 dark:text-white" : "text-gray-700 dark:text-gray-300"
                                                    )}>
                                                        {conv.userName}
                                                    </h3>
                                                    <span className="text-[10px] text-gray-400 flex-shrink-0">{conv.timestamp}</span>
                                                </div>
                                                <div className="flex items-center gap-2 mb-1">
                                                    <Badge variant="secondary" className={cn("text-[10px] px-1.5 py-0 h-5 font-medium border-none", ROLE_COLORS[conv.userRole])}>
                                                        {conv.userRole}
                                                    </Badge>
                                                </div>
                                                <p className={cn(
                                                    "text-xs truncate max-w-[200px]",
                                                    conv.unreadCount > 0 ? "text-gray-900 dark:text-white font-medium" : "text-gray-500 dark:text-gray-400"
                                                )}>
                                                    {conv.lastMessage}
                                                </p>
                                            </div>
                                            {conv.unreadCount > 0 && (
                                                <div className="absolute top-3 right-3 w-2 h-2 bg-purple-600 rounded-full animate-pulse" />
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </motion.div>
                    )}
                </AnimatePresence>

                {/* Chat Area */}
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
                                                <AvatarImage src={selectedConversation.userAvatar} />
                                                <AvatarFallback>{selectedConversation.userName[0]}</AvatarFallback>
                                            </Avatar>
                                            <div>
                                                <h2 className="text-sm font-bold text-gray-900 dark:text-white">{selectedConversation.userName}</h2>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedConversation.userRole}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-1">
                                            {/* <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <Phone className="w-4 h-4" />
                                            </Button>
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <Video className="w-4 h-4" />
                                            </Button> */}
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300">
                                                <MoreVertical className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </div>

                                    {/* Messages Area */}
                                    <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-6 bg-gray-50/30 dark:bg-zinc-950/30" ref={scrollRef}>
                                        {currentMessages.map((msg, idx) => {
                                            const isAdmin = msg.sender === 'admin';
                                            return (
                                                <motion.div
                                                    key={msg.id}
                                                    initial={{ opacity: 0, y: 10, scale: 0.98 }}
                                                    animate={{ opacity: 1, y: 0, scale: 1 }}
                                                    transition={{ delay: idx * 0.05 }}
                                                    className={cn(
                                                        "flex w-full gap-3 max-w-[85%] md:max-w-[75%]",
                                                        isAdmin ? "ml-auto flex-row-reverse" : "mr-auto"
                                                    )}
                                                >
                                                    {!isAdmin && (
                                                        <Avatar className="w-8 h-8 border border-gray-100 dark:border-white/10 mt-1 hidden md:block">
                                                            <AvatarImage src={selectedConversation.userAvatar} />
                                                            <AvatarFallback>{selectedConversation.userName[0]}</AvatarFallback>
                                                        </Avatar>
                                                    )}

                                                    <div className={cn(
                                                        "flex flex-col gap-1",
                                                        isAdmin ? "items-end" : "items-start"
                                                    )}>
                                                        {/* Name/Role label for context in group chats, optional here but nice */}
                                                        {!isAdmin && idx === 0 && (
                                                            <span className="text-[10px] text-gray-400 ml-1">{selectedConversation.userName}</span>
                                                        )}

                                                        <div className={cn(
                                                            "p-3 rounded-2xl text-sm shadow-sm transition-all hover:shadow-md",
                                                            isAdmin
                                                                ? "bg-purple-600 text-white rounded-br-none"
                                                                : "bg-white dark:bg-zinc-800 text-gray-700 dark:text-gray-200 border border-gray-100 dark:border-white/5 rounded-bl-none"
                                                        )}>
                                                            {msg.text}
                                                        </div>
                                                        <span className="text-[10px] text-gray-400 px-1 opacity-70">
                                                            {msg.timestamp}
                                                        </span>
                                                    </div>
                                                </motion.div>
                                            );
                                        })}
                                    </div>

                                    {/* Input Area */}
                                    <div className="p-3 md:p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/5">
                                        <form
                                            onSubmit={handleSendMessage}
                                            className="flex items-end gap-2 justify-between bg-gray-50 dark:bg-zinc-950/50 p-2 rounded-xl border border-gray-100 dark:border-white/5 focus-within:ring-2 focus-within:ring-purple-500/20 transition-all"
                                        >
                                            <div className="flex flex-row items-center" >
                                                <Button type="button" variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-purple-600 dark:hover:text-purple-400 mb-0.5">
                                                    <Paperclip className="w-4 h-4" />
                                                </Button>
                                                <Input
                                                    value={messageInput}
                                                    onChange={(e) => setMessageInput(e.target.value)}
                                                    placeholder="Type a message..."
                                                    className="flex-1 border-none bg-transparent shadow-none w-full focus-visible:ring-0 px-2 min-h-[40px] py-2 resize-none"
                                                />
                                            </div>
                                            <Button
                                                type="submit"
                                                size="icon"
                                                disabled={!messageInput.trim()}
                                                className={cn(
                                                    "rounded-lg h-9 w-9 transition-all mb-0.5",
                                                    messageInput.trim()
                                                        ? "bg-purple-600 text-white shadow-lg shadow-purple-500/25 hover:bg-purple-700 hover:scale-105 active:scale-95"
                                                        : "bg-gray-200 dark:bg-zinc-800 text-gray-400 cursor-not-allowed"
                                                )}
                                            >
                                                <Send className="w-4 h-4 ml-0.5" />
                                            </Button>
                                        </form>
                                    </div>
                                </>
                            ) : (
                                <div className="flex-1 flex flex-col items-center justify-center text-gray-400 p-8 text-center">
                                    <div className="w-20 h-20 bg-gray-50 dark:bg-white/5 rounded-full flex items-center justify-center mb-6 animate-pulse">
                                        <Info className="w-8 h-8 opacity-30" />
                                    </div>
                                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">No conversation selected</h3>
                                    <p className="max-w-[250px] mx-auto text-sm">Select a conversation from the list to start messaging.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
