"use client";

import { useState } from "react";
import { format } from "date-fns";
import { X, Calendar as CalendarIcon, Clock, Users, User, Lock } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { cn } from "@/lib/utils";
import { CalendarEvent, EventType } from "./types";

interface BlockTimeModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (event: Partial<CalendarEvent>) => void;
    initialDate?: Date;
}

export function BlockTimeModal({ isOpen, onClose, onSave, initialDate = new Date() }: BlockTimeModalProps) {
    const [title, setTitle] = useState("");
    const [type, setType] = useState<EventType>("Blocked");
    const [date, setDate] = useState(format(initialDate, "yyyy-MM-dd"));
    const [startTime, setStartTime] = useState("09:00");
    const [endTime, setEndTime] = useState("10:00");
    const [trainer, setTrainer] = useState("");

    const handleSave = () => {
        const startDateTime = new Date(`${date}T${startTime}`);
        const endDateTime = new Date(`${date}T${endTime}`);
        const durationMinutes = (endDateTime.getTime() - startDateTime.getTime()) / (1000 * 60);

        onSave({
            title: title || (type === "Blocked" ? "Blocked Time" : "New Event"),
            type,
            date: startDateTime,
            durationMinutes,
            trainer
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-white/10"
                >
                    <div className="flex items-center justify-between p-4 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Block Time / Add Event</h3>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="p-6 space-y-4">
                        <div className="space-y-2">
                            <Label>Event Type</Label>
                            <div className="grid grid-cols-3 gap-2">
                                {(["Blocked", "Personal", "Group"] as EventType[]).map((t) => (
                                    <button
                                        key={t}
                                        onClick={() => setType(t)}
                                        className={cn(
                                            "flex flex-col items-center justify-center p-3 rounded-lg border transition-all text-xs font-medium gap-2",
                                            type === t
                                                ? "border-primary bg-primary/5 text-primary"
                                                : "border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                                        )}
                                    >
                                        {t === "Blocked" && <Lock className="w-4 h-4" />}
                                        {t === "Personal" && <User className="w-4 h-4" />}
                                        {t === "Group" && <Users className="w-4 h-4" />}
                                        {t}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="title">Title</Label>
                            <Input
                                id="title"
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder={type === "Blocked" ? "Maintenance, Personal Time..." : "Session Name"}
                                className="bg-gray-50 dark:bg-white/5"
                            />
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Date</Label>
                                <div className="relative">
                                    <CalendarIcon className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="date"
                                        value={date}
                                        onChange={(e) => setDate(e.target.value)}
                                        className="pl-9 bg-gray-50 dark:bg-white/5"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>Trainer (Optional)</Label>
                                <Input
                                    value={trainer}
                                    onChange={(e) => setTrainer(e.target.value)}
                                    placeholder="Select trainer..."
                                    className="bg-gray-50 dark:bg-white/5"
                                />
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            <div className="space-y-2">
                                <Label>Start Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="time"
                                        value={startTime}
                                        onChange={(e) => setStartTime(e.target.value)}
                                        className="pl-9 bg-gray-50 dark:bg-white/5"
                                    />
                                </div>
                            </div>
                            <div className="space-y-2">
                                <Label>End Time</Label>
                                <div className="relative">
                                    <Clock className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                    <Input
                                        type="time"
                                        value={endTime}
                                        onChange={(e) => setEndTime(e.target.value)}
                                        className="pl-9 bg-gray-50 dark:bg-white/5"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="p-4 border-t border-gray-100 dark:border-white/10 flex justify-end gap-2 bg-gray-50/50 dark:bg-white/5">
                        <Button variant="outline" onClick={onClose}>Cancel</Button>
                        <Button onClick={handleSave}>Save Event</Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
