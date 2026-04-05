"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { X } from "lucide-react";
import { TagSelector } from "./tag-selector";
import { CreateTagModal } from "./create-tag-modal";

interface CreateExerciseModalProps {
    open: boolean;
    onOpenChange: (open: boolean) => void;
    onSave: (exercise: any) => void;
    initialData?: any;
}

export function CreateExerciseModal({ open, onOpenChange, onSave, initialData }: CreateExerciseModalProps) {
    const [name, setName] = useState(initialData?.name || "");
    const [description, setDescription] = useState(initialData?.description || "");
    const [notes, setNotes] = useState(initialData?.notes || "");
    const [selectedTags, setSelectedTags] = useState<string[]>(initialData?.tags || []);

    // Tag creation state
    const [createTagOpen, setCreateTagOpen] = useState(false);

    // Reset state when modal opens/changes (especially for initialData)
    // We can use a useEffect keying on open/initialData if needed, but for now simple state init might need adjustment if modal is reused without full remount.
    // Better to use useEffect to sync initialData when it changes or modal opens.
    // However, since we are using Uncontrolled pattern relative to parent (parent controls open), let's add a useEffect.

    // Actually, simpler to just use specific useEffect
    const [isInitialized, setIsInitialized] = useState(false);

    if (open && !isInitialized) {
        setName(initialData?.name || "");
        setDescription(initialData?.description || "");
        setNotes(initialData?.notes || "");
        setSelectedTags(initialData?.tags || []);
        setIsInitialized(true);
    }

    if (!open && isInitialized) {
        setIsInitialized(false);
    }

    const handleSave = () => {
        if (!name) return;

        onSave({
            ...initialData, // Keep existing ID etc if editing
            name,
            description,
            notes,
            tags: selectedTags,
            type: initialData?.type || "Custom",
            sets: initialData?.sets || [{ lbs: "", reps: "", rpe: "" }],
            restMinutes: initialData?.restMinutes || "0",
            restSeconds: initialData?.restSeconds || "0"
        });

        // Reset and close
        if (!initialData) {
            setName("");
            setDescription("");
            setNotes("");
            setSelectedTags([]);
        }
        onOpenChange(false);
    };

    const toggleTag = (tag: string) => {
        setSelectedTags(prev =>
            prev.includes(tag)
                ? prev.filter(t => t !== tag)
                : [...prev, tag]
        );
    };

    const handleCreateTag = (newTag: { name: string, color: string }) => {
        // In a real app, this would persist the tag. For now we just select it if it existed, or log it.
        // Since we can't easily modify the constant, we'll just pretend it's added and select it for this exercise.
        // If we were using state for ALL_TAGS, we would update that here.
        console.log("New tag created:", newTag);
        toggleTag(newTag.name);
    };

    return (
        <>
            <Dialog open={open} onOpenChange={onOpenChange}>
                <DialogContent className="bg-white dark:bg-zinc-900 border-none sm:max-w-[500px] shadow-2xl overflow-hidden p-0 gap-0 max-h-[90vh] flex flex-col">
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 shrink-0">
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            {initialData ? "Edit Exercise" : "Create New Exercise"}
                        </DialogTitle>
                        <button
                            onClick={() => onOpenChange(false)}
                            className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                        >
                            <X className="w-5 h-5" />
                        </button>
                    </div>

                    <div className="p-6 space-y-6 overflow-y-auto flex-1 scrollbar-hide">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Name</label>
                            <Input
                                className="bg-gray-50 dark:bg-zinc-950/50 border-gray-100 dark:border-white/5"
                                value={name}
                                onChange={(e) => setName(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Description (Optional)</label>
                            <Textarea
                                placeholder="Add exercise description or coaching cues..."
                                className="bg-gray-50 dark:bg-zinc-950/50 border-gray-100 dark:border-white/5 resize-none h-24"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                            />
                        </div>

                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Default Notes (Optional)</label>
                            <Textarea
                                placeholder="Add default notes for this exercise..."
                                className="bg-gray-50 dark:bg-zinc-950/50 border-gray-100 dark:border-white/5 resize-none h-20"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                        </div>

                        <div className="space-y-3">
                            <div className="flex items-center justify-between">
                                <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Tags</label>
                            </div>

                            <TagSelector
                                selectedTags={selectedTags}
                                onToggle={toggleTag}
                            />

                            <Button
                                variant="outline"
                                className="w-full justify-start text-xs border-dashed text-gray-500"
                                onClick={() => setCreateTagOpen(true)}
                            >
                                + Create New Tag
                            </Button>
                        </div>
                    </div>

                    <DialogFooter className="p-6 pt-4 border-t border-gray-100 dark:border-white/5 shrink-0 bg-white dark:bg-zinc-900">
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
                            {initialData ? "Save Changes" : "Create Exercise"}
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            <CreateTagModal
                open={createTagOpen}
                onOpenChange={setCreateTagOpen}
                onSave={handleCreateTag}
            />
        </>
    );
}
