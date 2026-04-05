"use client";

import { useState } from "react";
import { X, Calendar as CalendarIcon } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { format } from "date-fns";
import { Calendar } from "@/components/ui/calendar";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { cn } from "@/lib/utils";

interface ApproveModalProps {
    isOpen: boolean;
    onClose: () => void;
    onApprove: (data: any) => void;
    userName: string;
}

export function ApproveModal({ isOpen, onClose, onApprove, userName }: ApproveModalProps) {
    const [plan, setPlan] = useState("Pro Plan");
    const [trainer, setTrainer] = useState("");
    const [credits, setCredits] = useState("0");
    const [startDate, setStartDate] = useState<Date | undefined>(new Date());
    const [notes, setNotes] = useState("");

    const handleApprove = () => {
        onApprove({
            plan,
            trainer,
            credits,
            startDate,
            notes
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
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col max-h-[90vh]"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Approve Gym Connection</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Approve join request from <span className="font-semibold text-gray-900 dark:text-white">{userName}</span></p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="p-6 space-y-4 overflow-y-auto">
                        <div className="space-y-2">
                            <Label>Membership Plan *</Label>
                            <Select value={plan} onValueChange={setPlan}>
                                <SelectTrigger className="bg-gray-50 dark:bg-white/5">
                                    <SelectValue placeholder="Select Plan" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Basic Plan">Basic Plan</SelectItem>
                                    <SelectItem value="Pro Plan">Pro Plan</SelectItem>
                                    <SelectItem value="Elite Plan">Elite Plan</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Assign Trainer (Optional)</Label>
                            <Select value={trainer} onValueChange={setTrainer}>
                                <SelectTrigger className="bg-gray-50 dark:bg-white/5">
                                    <SelectValue placeholder="Assign a Trainer" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                    <SelectItem value="mike">Mike Chen</SelectItem>
                                    <SelectItem value="james">James Wilson</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Initial Credits (Optional)</Label>
                            <Input
                                type="number"
                                value={credits}
                                onChange={(e) => setCredits(e.target.value)}
                                className="bg-gray-50 dark:bg-white/5"
                            />
                            <p className="text-[10px] text-muted-foreground">Bonus credits to give to the new member</p>
                        </div>

                        <div className="space-y-2">
                            <Label>Start Date *</Label>
                            <Popover>
                                <PopoverTrigger asChild>
                                    <Button
                                        variant={"outline"}
                                        className={cn(
                                            "w-full justify-start text-left font-normal bg-gray-50 dark:bg-white/5",
                                            !startDate && "text-muted-foreground"
                                        )}
                                    >
                                        <CalendarIcon className="mr-2 h-4 w-4" />
                                        {startDate ? format(startDate, "PPP") : <span>Pick a date</span>}
                                    </Button>
                                </PopoverTrigger>
                                <PopoverContent className="w-auto p-0">
                                    <Calendar
                                        mode="single"
                                        selected={startDate}
                                        onSelect={setStartDate}
                                        initialFocus
                                    />
                                </PopoverContent>
                            </Popover>
                        </div>

                        <div className="space-y-2">
                            <Label>Notes (Optional)</Label>
                            <Textarea
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                                placeholder="Any additional notes..."
                                className="bg-gray-50 dark:bg-white/5 min-h-[80px]"
                            />
                        </div>

                        <div className="rounded-lg p-4 bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-xs space-y-1 text-purple-700 dark:text-purple-300">
                            <p className="font-semibold mb-2">After approval:</p>
                            <ul className="list-disc pl-4 space-y-1 opacity-90">
                                <li>User becomes an active client</li>
                                <li>Client appears in Client list</li>
                                <li>Trainer (if assigned) gains access</li>
                                <li>Status updates to "Approved"</li>
                            </ul>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 bg-gray-50/50 dark:bg-white/5">
                        <Button variant="outline" onClick={onClose} className="w-32">Cancel</Button>
                        <Button onClick={handleApprove} className="w-40 bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25">
                            Approve
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
