"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { ScrollArea } from "@/components/ui/scroll-area"

interface WorkoutDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    workout: {
        title: string;
        date: string;
        exercises: {
            name: string;
            sets: number;
            reps: string;
            rest: string;
            target: string;
        }[];
    } | null;
}

export function WorkoutDetailsModal({ isOpen, onClose, workout }: WorkoutDetailsModalProps) {
    if (!workout) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-zinc-900 border-gray-100 dark:border-white/10">
                <DialogHeader>
                    <div className="flex flex-col gap-1">
                        <DialogTitle className="text-xl font-bold">{workout.title}</DialogTitle>
                        <p className="text-sm text-gray-500">Assigned on {workout.date}</p>
                        <p className="text-sm text-gray-400">{workout.exercises.length} exercises</p>
                    </div>
                </DialogHeader>

                <ScrollArea className="max-h-[60vh] pr-4">
                    <div className="space-y-4">
                        {workout.exercises.map((exercise, index) => (
                            <div key={index} className="bg-gray-50 dark:bg-white/5 p-4 rounded-xl border border-gray-100 dark:border-white/5">
                                <div className="flex justify-between items-start mb-3">
                                    <div>
                                        <h4 className="font-semibold text-gray-900 dark:text-white">{exercise.name}</h4>
                                        <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Exercise {index + 1}</p>
                                    </div>
                                </div>

                                <div className="grid grid-cols-4 gap-4">
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Sets</p>
                                        <p className="font-medium">{exercise.sets}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Reps</p>
                                        <p className="font-medium">{exercise.reps}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Rest</p>
                                        <p className="font-medium">{exercise.rest}</p>
                                    </div>
                                    <div className="space-y-1">
                                        <p className="text-xs text-gray-500 dark:text-gray-400">Target Weight</p>
                                        <p className="font-medium">{exercise.target}</p>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </ScrollArea>

                <div className="flex justify-end pt-4">
                    <Button variant="outline" onClick={onClose}>Close</Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}
