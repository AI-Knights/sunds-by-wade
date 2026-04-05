"use client";

import { useState } from "react";
import { ExerciseLibrary } from "@/components/dashboard/builder/exercise-library";
import { BuilderCanvas } from "@/components/dashboard/builder/builder-canvas";
import { EXERCISES } from "@/constants/data";
import { motion } from "framer-motion";

export type WorkoutExercise = typeof EXERCISES[0] & {
    instanceId: string;
    sets: { lbs: string; reps: string; rpe: string; }[];
    restMinutes: string;
    restSeconds: string;
    description?: string;
};

export default function WorkoutBuilderPage() {
    const [activeTag, setActiveTag] = useState("All Tags");
    const [searchQuery, setSearchQuery] = useState("");
    const [workout, setWorkout] = useState<WorkoutExercise[]>([]);

    const addExercise = (exercise: typeof EXERCISES[0]) => {
        const newExercise: WorkoutExercise = {
            ...exercise,
            instanceId: Math.random().toString(36).substr(2, 9),
            sets: [{ lbs: "", reps: "", rpe: "" }], // Default 1 set
            restMinutes: "0",
            restSeconds: "0"
        };
        setWorkout([...workout, newExercise]);
    };

    const removeExercise = (instanceId: string) => {
        setWorkout(workout.filter(w => w.instanceId !== instanceId));
    };

    const reorderWorkout = (newOrder: WorkoutExercise[]) => {
        setWorkout(newOrder);
    };

    return (
        <div className="h-[calc(100vh-2rem)] flex gap-6 overflow-hidden">
            {/* Left Panel: Exercise Library */}
            <motion.div
                initial={{ x: -20, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                className="w-80 flex-shrink-0 bg-white dark:bg-zinc-900 rounded-2xl dark:border-white/5 flex flex-col overflow-hidden shadow-sm"
            >
                <ExerciseLibrary
                    onAdd={addExercise}
                    activeTag={activeTag}
                    setActiveTag={setActiveTag}
                    searchQuery={searchQuery}
                    setSearchQuery={setSearchQuery}
                />
            </motion.div>

            {/* Right Panel: Builder Canvas */}
            <div className="flex-1 flex flex-col h-full overflow-hidden">
                <BuilderCanvas
                    workout={workout}
                    onRemove={removeExercise}
                    onReorder={reorderWorkout}
                    setWorkout={setWorkout}
                />
            </div>
        </div>
    );
}
