"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { X } from "lucide-react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface CreateTagModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (tag: { name: string; color: string }) => void;
}

export function CreateTagModal({ open, onOpenChange, onSave }: CreateTagModalProps) {
    const [tagName, setTagName] = useState("");
    const [tagColor, setTagColor] = useState("Blue");

    const handleSave = () => {
        if (!tagName) return;
        onSave({ name: tagName, color: tagColor });
        setTagName("");
        setTagColor("Blue");
        onOpenChange(false);
    };

    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent className="bg-white dark:bg-zinc-900 border-none sm:max-w-[400px] shadow-2xl overflow-hidden p-0 gap-0">
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5">
                    <DialogTitle className="text-lg font-semibold text-gray-900 dark:text-white">Create New Tag</DialogTitle>
                    <DialogTitle className="sr-only">Create New Tag</DialogTitle>
                    <button
                        onClick={() => onOpenChange(false)}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                        <X className="w-5 h-5" />
                    </button>
                </div>

                <div className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tag Name</label>
                        <Input
                            placeholder=""
                            value={tagName}
                            onChange={(e) => setTagName(e.target.value)}
                            className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10"
                        />
                    </div>

                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tag Color</label>
                        <Select value={tagColor} onValueChange={setTagColor}>
                            <SelectTrigger className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10">
                                <SelectValue placeholder="Select color" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="Blue">Blue</SelectItem>
                                <SelectItem value="Red">Red</SelectItem>
                                <SelectItem value="Green">Green</SelectItem>
                                <SelectItem value="Yellow">Yellow</SelectItem>
                                <SelectItem value="Purple">Purple</SelectItem>
                                <SelectItem value="Orange">Orange</SelectItem>
                                <SelectItem value="Pink">Pink</SelectItem>
                                <SelectItem value="Black">Black</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </div>

                <DialogFooter className="p-6 pt-2">
                    <Button
                        variant="outline"
                        onClick={() => onOpenChange(false)}
                        className="border-gray-200 dark:border-white/10"
                    >
                        Cancel
                    </Button>
                    <Button
                        onClick={handleSave}
                        className="bg-gray-500 hover:bg-gray-600 text-white"
                    >
                        Create Tag
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
