"use client";

import { useMemo, useState } from "react";
import { Search, Plus, FileText } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { EXERCISES, EXERCISE_TAGS } from "@/constants/data";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";
import { CreateExerciseModal } from "./create-exercise-modal";

interface ExerciseLibraryProps {
    onAdd: (ex: typeof EXERCISES[0]) => void;
    activeTag: string;
    setActiveTag: (tag: string) => void;
    searchQuery: string;
    setSearchQuery: (q: string) => void;
}

export function ExerciseLibrary({ onAdd, activeTag, setActiveTag, searchQuery, setSearchQuery }: ExerciseLibraryProps) {
    const [createOpen, setCreateOpen] = useState(false);
    const [customExercises, setCustomExercises] = useState<any[]>([]);
    const [modifiedExercises, setModifiedExercises] = useState<Record<string, any>>({});
    const [editingExercise, setEditingExercise] = useState<any>(null);

    const filteredExercises = useMemo(() => {
        // Merge defaults with modifications
        const effectiveDefaults = EXERCISES.map(ex => modifiedExercises[ex.id] || ex);
        const allExercises = [...customExercises, ...effectiveDefaults];

        return allExercises.filter(ex => {
            const matchesSearch = ex.name.toLowerCase().includes(searchQuery.toLowerCase());
            const matchesTag = activeTag === "All Tags" || ex.tags.includes(activeTag);
            return matchesSearch && matchesTag;
        });
    }, [searchQuery, activeTag, customExercises, modifiedExercises]);

    const handleCreateExercise = (exerciseData: any) => {
        if (editingExercise) {
            if (editingExercise.id.toString().startsWith("custom-")) {
                // Update existing custom exercise
                setCustomExercises(prev => prev.map(ex =>
                    ex.id === editingExercise.id ? { ...exerciseData, id: ex.id } : ex
                ));
            } else {
                // Update default exercise (store in modified map)
                setModifiedExercises(prev => ({
                    ...prev,
                    [editingExercise.id]: { ...exerciseData, id: editingExercise.id }
                }));
            }
            setEditingExercise(null);
        } else {
            // Create new
            const mockExercise = {
                id: `custom-${Date.now()}`,
                ...exerciseData,
                type: "Custom",
                equipment: "Custom"
            };
            setCustomExercises(prev => [mockExercise, ...prev]);
            onAdd(mockExercise);
        }
    };

    const openEdit = (e: React.MouseEvent, ex: any) => {
        e.stopPropagation();
        setEditingExercise(ex);
        setCreateOpen(true);
    };

    return (
        <div className="flex flex-col h-full bg-white dark:bg-zinc-900 border-r border-gray-100 dark:border-white/5">
            {/* Header Search & Filter */}
            <div className="p-4 space-y-4 border-b border-gray-100 dark:border-white/5">
                <div className="relative">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search exercises..."
                        className="pl-9 bg-gray-50 dark:bg-zinc-950/50 border-transparent text-gray-900 dark:text-white placeholder:text-gray-400 focus:bg-white dark:focus:bg-white/10 transition-all h-10"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>

                {/* Horizontal Scroll Tags */}
                <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-gray-700 scrollbar-track-transparent">
                    <button
                        onClick={() => setActiveTag("All Tags")}
                        className={cn(
                            "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                            activeTag === "All Tags"
                                ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30"
                                : "text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                        )}
                    >
                        All Tags
                    </button>
                    {EXERCISE_TAGS.map(tag => (
                        <button
                            key={tag}
                            onClick={() => setActiveTag(tag)}
                            className={cn(
                                "whitespace-nowrap px-3 py-1.5 rounded-lg text-xs font-medium transition-all border",
                                activeTag === tag
                                    ? "bg-purple-100 text-purple-700 border-purple-200 dark:bg-purple-500/20 dark:text-purple-300 dark:border-purple-500/30"
                                    : "text-gray-600 dark:text-gray-400 border-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                            )}
                        >
                            {tag}
                        </button>
                    ))}
                </div>
            </div>

            {/* List */}
            <div className="flex-1 overflow-y-auto p-4 space-y-3 scrollbar-thin scrollbar-thumb-gray-200 dark:scrollbar-thumb-zinc-800">
                {filteredExercises.map((ex) => (
                    <motion.div
                        key={ex.id}
                        layoutId={`library-${ex.id}`}
                        onClick={() => onAdd(ex)}
                        whileHover={{ scale: 1.01 }}
                        whileTap={{ scale: 0.99 }}
                        className="p-3 rounded-xl border border-gray-100 dark:border-white/5 cursor-pointer group bg-white dark:bg-zinc-900/50 hover:border-purple-200 dark:hover:border-purple-500/30 hover:shadow-sm transition-all relative"
                    >
                        <div className="flex justify-between items-start mb-2">
                            <h4 className="font-medium text-gray-900 dark:text-gray-200 text-sm group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors pr-6">{ex.name}</h4>
                            <div className="flex items-center gap-1 absolute right-2 top-2">
                                <button
                                    onClick={(e) => openEdit(e, ex)}
                                    className="p-1 rounded-full text-gray-300 dark:text-gray-600 hover:text-purple-500 dark:hover:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 transition-colors opacity-0 group-hover:opacity-100"
                                >
                                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" /></svg>
                                </button>
                                <Plus className="w-4 h-4 text-gray-300 dark:text-gray-600 group-hover:text-purple-500 dark:group-hover:text-purple-400 transition-colors opacity-0 group-hover:opacity-100" />
                            </div>
                        </div>
                        <div className="flex flex-wrap gap-1">
                            {ex.tags.map((tag: string) => (
                                <span key={tag} className={cn(
                                    "text-[10px] px-1.5 py-0.5 rounded-md font-medium",
                                    getTagColor(tag)
                                )}>
                                    {tag}
                                </span>
                            ))}
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Bottom Actions */}
            <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-950/50 grid grid-cols-2 gap-3 shrink-0">
                <Button
                    variant="outline"
                    className="h-10 text-xs border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 hover:text-purple-600 dark:hover:text-purple-400"
                    onClick={() => {
                        setEditingExercise(null);
                        setCreateOpen(true);
                    }}
                >
                    Add New Exercise
                </Button>
                <Button
                    variant="outline"
                    className="h-10 text-xs border-gray-200 dark:border-white/10 hover:bg-white dark:hover:bg-white/5 hover:text-purple-600 dark:hover:text-purple-400"
                >
                    <FileText className="w-3.5 h-3.5 mr-2" />
                    Instruction Block
                </Button>
            </div>

            <CreateExerciseModal
                open={createOpen}
                onOpenChange={(open) => {
                    setCreateOpen(open);
                    if (!open) setEditingExercise(null);
                }}
                onSave={handleCreateExercise}
                initialData={editingExercise}
            />
        </div>
    );
}

// Helper for consistent tag colors - Matching the "Clean" aesthetic
function getTagColor(tag: string) {
    const colors: Record<string, string> = {
        "Legs": "bg-blue-50 text-blue-700 dark:bg-blue-500/10 dark:text-blue-300",
        "Glutes": "bg-purple-50 text-purple-700 dark:bg-purple-500/10 dark:text-purple-300",
        "Chest": "bg-orange-50 text-orange-700 dark:bg-orange-500/10 dark:text-orange-300",
        "Triceps": "bg-pink-50 text-pink-700 dark:bg-pink-500/10 dark:text-pink-300",
        "Back": "bg-green-50 text-green-700 dark:bg-green-500/10 dark:text-green-300",
        "Biceps": "bg-red-50 text-red-700 dark:bg-red-500/10 dark:text-red-300",
        "Shoulders": "bg-yellow-50 text-yellow-700 dark:bg-yellow-500/10 dark:text-yellow-300",
        "Core": "bg-teal-50 text-teal-700 dark:bg-teal-500/10 dark:text-teal-300",
    };
    return colors[tag] || "bg-gray-100 text-gray-600 dark:bg-gray-800 dark:text-gray-400";
}
