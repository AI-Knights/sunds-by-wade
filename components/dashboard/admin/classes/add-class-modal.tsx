"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Clock, Users, Calendar as CalendarIcon, Link as LinkIcon } from "lucide-react";
import { useState } from "react";

interface AddClassModalProps {
    isOpen: boolean;
    onClose: () => void;
}

export function AddClassModal({ isOpen, onClose }: AddClassModalProps) {
    const [isVirtual, setIsVirtual] = useState(false);

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800 max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold dark:text-white">Add New Class</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    {/* Title */}
                    <div className="space-y-2">
                        <Label htmlFor="title">Class Title</Label>
                        <Input id="title" placeholder="e.g., Morning Yoga" className="bg-white dark:bg-zinc-900" />
                    </div>

                    {/* Instructor */}
                    <div className="space-y-2">
                        <Label>Instructor</Label>
                        <Select>
                            <SelectTrigger className="bg-white dark:bg-zinc-900">
                                <SelectValue placeholder="Select Instructor" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sarah">Sarah Johnson</SelectItem>
                                <SelectItem value="mike">Mike Chen</SelectItem>
                                <SelectItem value="emma">Emma Davis</SelectItem>
                                <SelectItem value="james">James Wilson</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Date & Capacity */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Date</Label>
                            <div className="relative">
                                <Input type="date" className="bg-white dark:bg-zinc-900" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>Max Capacity</Label>
                            <Input type="number" placeholder="20" className="bg-white dark:bg-zinc-900" />
                        </div>
                    </div>

                    {/* Time Range */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Start Time</Label>
                            <div className="relative">
                                <Input type="time" className="bg-white dark:bg-zinc-900" />
                                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                        <div className="space-y-2">
                            <Label>End Time</Label>
                            <div className="relative">
                                <Input type="time" className="bg-white dark:bg-zinc-900" />
                                <Clock className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
                            </div>
                        </div>
                    </div>

                    {/* Credits */}
                    <div className="space-y-2">
                        <Label>Credits Required</Label>
                        <Input type="number" placeholder="1" className="bg-white dark:bg-zinc-900" />
                    </div>

                    {/* Description */}
                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea placeholder="Brief description of the class" className="bg-white dark:bg-zinc-900 min-h-[100px]" />
                    </div>

                    {/* Virtual Class Toggle */}
                    <div className="flex flex-col gap-4 p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="virtual"
                                checked={isVirtual}
                                onCheckedChange={(checked) => setIsVirtual(checked as boolean)}
                            />
                            <Label htmlFor="virtual" className="cursor-pointer font-medium">Virtual Class</Label>
                        </div>

                        {isVirtual && (
                            <div className="space-y-2 animate-in fade-in slide-in-from-top-2 duration-300">
                                <Label>Zoom URL</Label>
                                <div className="relative">
                                    <Input placeholder="https://zoom.us/j/..." className="pl-9 bg-white dark:bg-zinc-950" />
                                    <LinkIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                </div>
                            </div>
                        )}
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button className="bg-purple-600 hover:bg-purple-700">Add Class</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
