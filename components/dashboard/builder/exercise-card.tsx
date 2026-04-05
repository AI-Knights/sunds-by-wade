"use client";

import { useState, useEffect } from "react";
import { motion, Reorder, AnimatePresence } from "framer-motion";
import { GripVertical, X, ChevronDown, ChevronUp, Image as ImageIcon, Video } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkoutExercise } from "@/app/(dashboard)/trainer/builder/page";
import { cn } from "@/lib/utils";

interface ExerciseCardProps {
    exercise: WorkoutExercise;
    index: number;
    onRemove: (id: string) => void;
    updateExercise: (id: string, field: string, value: any) => void;
    updateSet: (exerciseIndex: number, setIndex: number, field: string, value: string) => void;
    toggleExpand: (id: string) => void;
    isExpanded: boolean;
}

export function ExerciseCard({
    exercise,
    index,
    onRemove,
    updateExercise,
    updateSet,
    toggleExpand,
    isExpanded
}: ExerciseCardProps) {
    const [setsCount, setSetsCount] = useState(exercise.sets.length.toString());

    useEffect(() => {
        setSetsCount(exercise.sets.length.toString());
    }, [exercise.sets.length]);

    const handleSetsChange = (value: string) => {
        setSetsCount(value);
        const newCount = parseInt(value);
        if (!isNaN(newCount) && newCount >= 0 && newCount <= 20) {
            const currentSets = [...exercise.sets];
            if (newCount > currentSets.length) {
                const setsToAdd = newCount - currentSets.length;
                const newSets = Array.from({ length: setsToAdd }, () => ({ lbs: "", reps: "", rpe: "" }));
                updateExercise(exercise.instanceId, "sets", [...currentSets, ...newSets]);
            } else if (newCount < currentSets.length) {
                updateExercise(exercise.instanceId, "sets", currentSets.slice(0, newCount));
            }
        }
    };

    return (

        <Reorder.Item
            value={exercise}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/10 rounded-none shadow-[0_2px_10px_-4px_rgba(0,0,0,0.05)] mb-4 overflow-hidden transition-colors duration-200"
        >
            {/* Header */}
            <div className="flex items-center justify-between px-6 py-4">
                <div className="flex items-center gap-4">
                    <GripVertical className="w-4 h-4 text-gray-300 cursor-grab active:cursor-grabbing flex-shrink-0" />
                    <h4 className="font-semibold text-gray-900 dark:text-white/70 text-base">{exercise.name}</h4>
                    <div className="flex gap-2">
                        {exercise.tags.slice(0, 3).map(tag => (
                            <span
                                key={tag}
                                className={cn(
                                    "text-[10px] leading-none px-2 py-1 rounded-md font-semibold uppercase tracking-wide",
                                    tag === "Triceps" ? "bg-pink-100 dark:bg-pink-600 dark:text-white  text-pink-600" :
                                        tag === "Chest" ? "bg-orange-100 dark:bg-orange-600 dark:text-white text-orange-600" :
                                            "bg-gray-100 dark:bg-gray-600 dark:text-white text-gray-600"
                                )}
                            >
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <button
                    onClick={() => onRemove(exercise.instanceId)}
                    className="text-gray-400 hover:text-gray-900 transition-colors"
                >
                    <X className="w-4 h-4" />
                </button>
            </div>

            {/* Main Inputs Row */}
            <div className="px-6 pb-6">
                <div className="flex flex-wrap items-end gap-x-6 gap-y-4">
                    {/* Sets */}
                    <div className="grid grid-cols-12  gap-2 justify-between w-full" >
                        <div className="flex col-span-2 flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Sets:</label>
                            <Input
                                type="number"
                                className=" h-[40px]  bg dark:text-white text-gray-700 -[#F3F3F5] dark:bg-[#1E1E1E]  border border-gray-800 text-center font-medium text-gray-900 rounded-lg text-sm"
                                value={setsCount}
                                onChange={(e) => handleSetsChange(e.target.value)}
                            />
                        </div>

                        {/* Time */}
                        <div className="flex col-span-3 flex-col w-full  gap-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Minutes:</label>
                            <div className="flex w-fullitems-center gap-2">
                                <Input
                                    type="number"
                                    className=" h-[40px]  bg dark:text-white text-gray-700 -[#F3F3F5] dark:bg-[#1E1E1E]  border border-gray-800 text-center font-medium text-gray-900 rounded-lg text-sm"
                                    placeholder="0"
                                    value={exercise.restMinutes || ""}
                                    onChange={(e) => updateExercise(exercise.instanceId, "restMinutes", e.target.value)}
                                />
                                <span className="text-gray-300 mb-1">:</span>
                                <Input
                                    type="number"
                                    className=" h-[40px]  bg dark:text-white text-gray-700 -[#F3F3F5] dark:bg-[#1E1E1E]  border border-gray-800 text-center font-medium text-gray-900 rounded-lg text-sm"
                                    placeholder="0"
                                    value={exercise.restSeconds || ""}
                                    onChange={(e) => updateExercise(exercise.instanceId, "restSeconds", e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Reps */}
                        <div className="flex col-span-3 w-full flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Reps per set:</label>
                            <div className="grid grid-cols-3 gap-2 ">
                                {exercise.sets.map((set, i) => (
                                    <Input
                                        key={`reps-${i}`}
                                        type="number"
                                        className=" h-[40px] dark:text-white text-gray-700   bg-[#F3F3F5] dark:bg-[#1E1E1E]  border border-gray-800 text-center font-medium text-gray-900 rounded-lg text-sm"
                                        placeholder="10"
                                        value={set.reps}
                                        onChange={(e) => updateSet(index, i, "reps", e.target.value)}
                                    />
                                ))}
                            </div>
                        </div>
                        <div className="flex col-span-3 w-full flex-col gap-2">
                            <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Weights per set:</label>
                            <div className="grid grid-cols-3 gap-2 ">
                                {exercise.sets.map((set, i) => (
                                    <Input
                                        key={`weight-${i}`}
                                        className=" h-[40px]  bg-[#F3F3F5] dark:bg-[#1E1E1E]  border border-gray-800 text-center font-medium text-gray-900 rounded-lg text-sm"
                                        placeholder="lbs"
                                        value={set.lbs}
                                        onChange={(e) => updateSet(index, i, "lbs", e.target.value)}
                                    />
                                ))}
                                {/* Collapse Toggle Button */}

                            </div>
                        </div>
                        <button
                            onClick={() => toggleExpand(exercise.instanceId)}
                            className=""
                        >
                            {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                        </button>
                    </div>



                </div>

                {/* Collapsible Section */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: "auto", opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                        >
                            <div className="pt-6 justify-between  space-y-6">
                                {/* Description */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Description (Optional):</label>
                                    <textarea
                                        className="w-full min-h-[80px] p-4 rounded-none outline-none border-gray-600 border text-gray-900 dark:text-white/50 resize-none transition-all"
                                        placeholder="Add exercise description or coaching cues..."
                                        value={exercise.description || ""}
                                        onChange={(e) => updateExercise(exercise.instanceId, "description", e.target.value)}
                                    />
                                </div>

                                {/* Media */}
                                <div className="space-y-2">
                                    <label className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">Media (Optional):</label>
                                    <div className="flex gap-3">
                                        <Button variant="outline" className="h-[40px] border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-4 rounded-lg">
                                            <ImageIcon className="w-4 h-4 mr-2" />
                                            Add Image
                                        </Button>
                                        <Button variant="outline" className="h-[40px] border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-gray-900 px-4 rounded-lg">
                                            <Video className="w-4 h-4 mr-2" />
                                            Add Video
                                        </Button>
                                    </div>
                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </Reorder.Item>
    );
}