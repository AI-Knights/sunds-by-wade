"use client"

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Textarea } from "@/components/ui/textarea"
import { Badge } from "@/components/ui/badge"
import { Mail, Send, Trash2, CheckCircle2 } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export interface Message {
    id: string
    name: string
    email: string
    subject: string
    date: string
    status: "New" | "Replied" | "Viewed"
    content: string
}

interface MessageDetailModalProps {
    message: Message | null
    isOpen: boolean
    onClose: () => void
}

export function MessageDetailModal({ message, isOpen, onClose }: MessageDetailModalProps) {
    if (!message) return null

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl gap-0 p-0 overflow-hidden border-none sm:rounded-2xl">
                <DialogHeader className="p-6 pb-2 bg-muted/10 space-y-1">
                    <div className="flex items-center justify-between">
                        <DialogTitle className="text-xl font-bold">Message Details</DialogTitle>
                        <Badge variant={message.status === "New" ? "default" : "secondary"} className="capitalize">
                            {message.status}
                        </Badge>
                    </div>
                    <p className="text-sm text-muted-foreground">
                        View and manage the details of the selected support message.
                    </p>
                </DialogHeader>

                <div className="p-6 grid gap-6">
                    {/* Header Info */}
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-lg">{message.subject}</h3>
                        <div className="flex items-center text-sm text-muted-foreground gap-2">
                            <span>From: <span className="font-medium text-foreground">{message.name}</span> ({message.email})</span>
                        </div>
                        <div className="text-xs text-muted-foreground mt-1">
                            Received on {message.date}
                        </div>
                    </div>

                    {/* Message Body */}
                    <div className="bg-muted/30 p-4 rounded-xl border">
                        <h4 className="font-medium mb-2 text-sm">Message</h4>
                        <p className="text-sm leading-relaxed text-muted-foreground">
                            {message.content}
                        </p>
                    </div>

                    {/* Reply Section */}
                    <div className="grid gap-3">
                        <h4 className="font-medium text-sm">Reply</h4>
                        <Textarea
                            placeholder="Write reply message here..."
                            className="min-h-[100px] resize-none"
                        />
                    </div>
                </div>

                {/* Footer Actions */}
                <DialogFooter className="p-6 pt-2 flex items-center justify-between bg-muted/10">
                    <div className="flex items-center gap-2 w-full">
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white gap-2">
                            <Send className="w-4 h-4" /> Send Reply
                        </Button>
                        <Button variant="outline" className="gap-2">
                            <CheckCircle2 className="w-4 h-4" /> Mark as Read
                        </Button>
                        <Button variant="destructive" className="ml-auto gap-2">
                            <Trash2 className="w-4 h-4" /> Delete
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
