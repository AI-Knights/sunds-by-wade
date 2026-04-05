"use client";

import { Check } from "lucide-react";
import { cn } from "@/lib/utils";
import { EXERCISE_TAGS } from "@/constants/data";

interface TagSelectorProps {
    selectedTags: string[];
    onToggle: (tag: string) => void;
}

export function TagSelector({ selectedTags, onToggle }: TagSelectorProps) {
    return (
        <div className="border border-gray-100 dark:border-white/5 rounded-xl p-1 max-h-[300px] overflow-y-auto">
            {EXERCISE_TAGS.map((tag) => {
                const isSelected = selectedTags.includes(tag);
                return (
                    <div
                        key={tag}
                        onClick={() => onToggle(tag)}
                        className={cn(
                            "flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-colors",
                            isSelected ? "bg-purple-50 dark:bg-purple-500/10" : "hover:bg-gray-50 dark:hover:bg-white/5"
                        )}
                    >
                        <div className={cn(
                            "w-5 h-5 rounded border flex items-center justify-center transition-colors",
                            isSelected
                                ? "bg-purple-600 border-purple-600 text-white"
                                : "border-gray-200 dark:border-gray-700 bg-white dark:bg-transparent"
                        )}>
                            {isSelected && <Check className="w-3.5 h-3.5" />}
                        </div>

                        <div className={cn(
                            "w-8 h-8 rounded-full flex items-center justify-center text-xs font-semibold",
                            getTagColor(tag)
                        )}>
                            {tag.charAt(0)}
                        </div>

                        <span className="text-sm font-medium text-gray-900 dark:text-gray-200">
                            {tag}
                        </span>
                    </div>
                );
            })}
        </div>
    );
}

function getTagColor(tag: string) {
    // Determine color based on tag name (Mock logic for visual variety)
    const colors: Record<string, string> = {
        "Chest": "bg-black text-white dark:bg-white dark:text-black",
        "Back": "bg-black text-white dark:bg-white dark:text-black",
        "Shoulders": "bg-black text-white dark:bg-white dark:text-black",
        "Biceps": "bg-black text-white dark:bg-white dark:text-black",
        "Triceps": "bg-black text-white dark:bg-white dark:text-black",
        "Legs": "bg-black text-white dark:bg-white dark:text-black",
        "Glutes": "bg-black text-white dark:bg-white dark:text-black",
        "Core": "bg-black text-white dark:bg-white dark:text-black",
    };
    return colors[tag] || "bg-black text-white dark:bg-white dark:text-black";
}
