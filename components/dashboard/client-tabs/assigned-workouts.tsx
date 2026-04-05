"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Plus, Dumbbell } from "lucide-react";
import { WorkoutDetailsModal } from "@/components/dashboard/trainer/clients/workout-details-modal";
import { AssignWorkoutModal } from "@/components/dashboard/trainer/clients/assign-workout-modal";

// Mock data for assigned workouts
const MOCK_ASSIGNED_WORKOUTS = [
    {
        id: "aw-1",
        title: "Full Body Strength A",
        date: "Jan 9",
        exercisesCount: 4,
        exercises: [
            { name: "Barbell Squat", sets: 4, reps: "8-10", rest: "90s", target: "185 lbs" },
            { name: "Bench Press", sets: 4, reps: "8-10", rest: "90s", target: "135 lbs" },
            { name: "Pull-ups", sets: 3, reps: "8-12", rest: "60s", target: "Bodyweight" },
            { name: "Plank", sets: 3, reps: "30-60s", rest: "60s", target: "Bodyweight" },
        ]
    },
    {
        id: "aw-2",
        title: "Upper Body Hypertrophy",
        date: "Jan 7",
        exercisesCount: 5,
        exercises: [
            { name: "Bench Press", sets: 3, reps: "10-12", rest: "60s", target: "135 lbs" },
            { name: "Overhead Press", sets: 3, reps: "10-12", rest: "60s", target: "95 lbs" },
            { name: "Barbell Row", sets: 3, reps: "10-12", rest: "60s", target: "135 lbs" },
            { name: "Dumbbell Curl", sets: 3, reps: "12-15", rest: "45s", target: "25 lbs" },
            { name: "Tricep Dips", sets: 3, reps: "12-15", rest: "45s", target: "Bodyweight" },
        ]
    },
    {
        id: "aw-3",
        title: "Leg Day Focus",
        date: "Jan 5",
        exercisesCount: 3,
        exercises: [
            { name: "Barbell Squat", sets: 4, reps: "6-8", rest: "120s", target: "225 lbs" },
            { name: "Leg Press", sets: 3, reps: "10-12", rest: "90s", target: "360 lbs" },
            { name: "Lunges", sets: 3, reps: "10-12", rest: "60s", target: "35 lbs" },
        ]
    }
];

export function AssignedWorkoutsTab() {
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [selectedWorkout, setSelectedWorkout] = useState<any>(null);
    const [isAssignOpen, setIsAssignOpen] = useState(false);

    const handleViewDetails = (workout: typeof MOCK_ASSIGNED_WORKOUTS[0]) => {
        setSelectedWorkout(workout);
        setIsDetailsOpen(true);
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Currently Assigned Workouts</h3>
                <Button
                    size="sm"
                    className="bg-purple-600 hover:bg-purple-700 text-white"
                    onClick={() => setIsAssignOpen(true)}
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Assign New
                </Button>
            </div>

            <div className="grid gap-4">
                {MOCK_ASSIGNED_WORKOUTS.map((workout) => (
                    <div
                        key={workout.id}
                        className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-xl p-4 flex items-center justify-between shadow-sm hover:shadow-md transition-all group"
                    >
                        <div className="flex items-center gap-4">
                            <div className="p-3 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-500 dark:text-gray-400 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                                <Dumbbell className="w-5 h-5" />
                            </div>
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{workout.title}</h4>
                                <p className="text-sm text-gray-500">{workout.exercisesCount} exercises • Assigned {workout.date}</p>
                            </div>
                        </div>
                        <Button
                            variant="outline"
                            size="sm"
                            onClick={() => handleViewDetails(workout)}
                            className="bg-transparent border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                        >
                            View Details
                        </Button>
                    </div>
                ))}
            </div>

            <WorkoutDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                workout={selectedWorkout}
            />

            <AssignWorkoutModal
                isOpen={isAssignOpen}
                onClose={() => setIsAssignOpen(false)}
                clientName="Sarah Mitchell"
            />
        </div>
    );
}
