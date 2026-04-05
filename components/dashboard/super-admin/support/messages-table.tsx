"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Search, Mail, Eye, MoreHorizontal, ChevronLeft, ChevronRight, Inbox } from "lucide-react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table"
import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Message, MessageDetailModal } from "./message-detail-modal"

// Mock Data
const messages: Message[] = [
    {
        id: "1",
        name: "Emily Rodriguez",
        email: "emily.r@email.com",
        subject: "Unable to access premium features",
        date: "Dec 4, 2024",
        status: "New",
        content: "Hi, I recently subscribed to the premium plan but I'm still unable to access the premium meditation library. I've tried logging out and back in, but the issue persists. My payment went through successfully. Could you please help me resolve this?"
    },
    {
        id: "2",
        name: "Michael Chen",
        email: "m.chen@email.com",
        subject: "Request for refund",
        date: "Dec 4, 2024",
        status: "Replied",
        content: "I would like to request a refund for my recent purchase because I am not creating any new classes."
    },
    {
        id: "3",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        subject: "Meditation audio not playing",
        date: "Dec 3, 2024",
        status: "Viewed",
        content: "The audio for the 'Morning Calm' track keeps cutting out after the first minute."
    },
    {
        id: "4",
        name: "David Kim",
        email: "david.k@email.com",
        subject: "Suggestion for new feature",
        date: "Dec 3, 2024",
        status: "Viewed",
        content: "It would be great if you could add a dark mode toggle to the app settings."
    },
    {
        id: "5",
        name: "Lisa Wang",
        email: "lisa.w@email.com",
        subject: "App crashes on startup",
        date: "Dec 2, 2024",
        status: "New",
        content: "Since the last update, the app crashes immediately when I try to open it on my iPhone 13."
    },
    {
        id: "6",
        name: "James Brown",
        email: "james.b@email.com",
        subject: "Thank you!",
        date: "Dec 2, 2024",
        status: "Viewed",
        content: "Just wanted to say thanks for the amazing content. It's really helping me manage my stress."
    },
    {
        id: "7",
        name: "Olivia Martinez",
        email: "olivia.m@email.com",
        subject: "Cannot reset password",
        date: "Dec 1, 2024",
        status: "Viewed",
        content: "I'm not receiving the password reset email. I've checked my spam folder."
    }
]

export function MessagesTable() {
    const [selectedMessage, setSelectedMessage] = useState<Message | null>(null)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [searchTerm, setSearchTerm] = useState("")

    const filteredMessages = messages.filter(msg =>
        msg.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
        msg.subject.toLowerCase().includes(searchTerm.toLowerCase())
    )

    const handleViewMessage = (message: Message) => {
        setSelectedMessage(message)
        setIsModalOpen(true)
    }

    const getStatusColor = (status: string) => {
        switch (status) {
            case "New": return "bg-green-100 text-green-700 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400";
            case "Replied": return "bg-gray-100 text-gray-700 hover:bg-gray-100 dark:bg-gray-800 dark:text-gray-400";
            case "Viewed": return "bg-purple-100 text-purple-700 hover:bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400";
            default: return "bg-gray-100 text-gray-700";
        }
    }

    return (
        <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="space-y-4"
        >
            <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                    placeholder="Search messages by name, email, or subject..."
                    className="pl-10 h-11 bg-muted/40 border-none shadow-sm"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
            </div>

            <div className="rounded-xl border bg-card shadow-sm overflow-hidden">
                <Table>
                    <TableHeader className="bg-muted/50">
                        <TableRow>
                            <TableHead className="w-[50px]"></TableHead>
                            <TableHead>Name</TableHead>
                            <TableHead>Email</TableHead>
                            <TableHead>Subject</TableHead>
                            <TableHead>Date</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filteredMessages.map((message, index) => (
                                <motion.tr
                                    key={message.id}
                                    initial={{ opacity: 0, x: -20 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: -20 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="group hover:bg-muted/30 transition-colors"
                                >
                                    <TableCell>
                                        <div className="h-8 w-8 rounded-full bg-muted flex items-center justify-center text-muted-foreground">
                                            <Inbox className="h-4 w-4" />
                                        </div>
                                    </TableCell>
                                    <TableCell className="font-medium">{message.name}</TableCell>
                                    <TableCell className="text-muted-foreground">{message.email}</TableCell>
                                    <TableCell className="max-w-[300px] truncate">{message.subject}</TableCell>
                                    <TableCell className="text-muted-foreground whitespace-nowrap">{message.date}</TableCell>
                                    <TableCell>
                                        <Badge className={`${getStatusColor(message.status)} border-0`}>
                                            {message.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            size="sm"
                                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                                            onClick={() => handleViewMessage(message)}
                                        >
                                            View
                                        </Button>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                        {filteredMessages.length === 0 && (
                            <TableRow>
                                <TableCell colSpan={7} className="h-24 text-center">
                                    No results found.
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>

                <div className="flex items-center justify-end p-4 gap-2">
                    <Button variant="outline" size="icon" disabled>
                        <ChevronLeft className="h-4 w-4" />
                    </Button>
                    <Button variant="outline" size="sm" className="bg-purple-100 text-purple-700 border-purple-200 hover:bg-purple-200 hover:text-purple-800 dark:bg-purple-900/30 dark:text-purple-400 dark:border-purple-800">1</Button>
                    <Button variant="ghost" size="sm">2</Button>
                    <Button variant="ghost" size="sm">3</Button>
                    <span className="text-muted-foreground text-sm px-2">...</span>
                    <Button variant="ghost" size="sm">10</Button>
                    <Button variant="outline" size="icon">
                        <ChevronRight className="h-4 w-4" />
                    </Button>
                </div>
            </div>

            <MessageDetailModal
                message={selectedMessage}
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
            />
        </motion.div>
    )
}
