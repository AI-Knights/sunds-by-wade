"use client";

import { useState } from "react";
import { Reorder } from "framer-motion";
import { Plus, Save, Calendar, UserPlus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { WorkoutExercise } from "@/app/(dashboard)/trainer/builder/page";
import { ExerciseCard } from "./exercise-card";
import {
    Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter
} from "@/components/ui/dialog";
import { CLIENTS } from "@/constants/data";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar as CalendarComponent } from "@/components/ui/calendar"; // Assuming standard UI component
import { format } from "date-fns";
import { cn } from "@/lib/utils";

interface BuilderCanvasProps {
    workout: WorkoutExercise[];
    onRemove: (id: string) => void;
    onReorder: (newOrder: WorkoutExercise[]) => void;
    setWorkout: (workout: WorkoutExercise[]) => void;
}

export function BuilderCanvas({ workout, onRemove, onReorder, setWorkout }: BuilderCanvasProps) {
    const [templateOpen, setTemplateOpen] = useState(false);
    const [assignOpen, setAssignOpen] = useState(false);
    const [templateName, setTemplateName] = useState("");
    const [selectedClient, setSelectedClient] = useState<string | null>(null);
    const [workoutTitle, setWorkoutTitle] = useState("");
    const [date, setDate] = useState<Date | undefined>(new Date());

    // Track expanded state for exercises
    const [expanded, setExpanded] = useState<Record<string, boolean>>({});

    const toggleExpand = (id: string) => {
        setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
    };

    const updateSet = (exerciseIndex: number, setIndex: number, field: string, value: string) => {
        const newWorkout = [...workout];
        newWorkout[exerciseIndex].sets[setIndex] = {
            ...newWorkout[exerciseIndex].sets[setIndex],
            [field]: value
        };
        setWorkout(newWorkout);
    };

    const updateExercise = (id: string, field: string, value: any) => {
        const newWorkout = workout.map(ex => {
            if (ex.instanceId === id) {
                return { ...ex, [field]: value };
            }
            return ex;
        });
        setWorkout(newWorkout);
    };

    const handleSaveTemplate = () => {
        console.log("Saving template:", templateName, workout);
        setTemplateOpen(false);
        setTemplateName("");
    };

    const handleAssign = () => {
        console.log("Assigning to client:", selectedClient, workout);
        setAssignOpen(false);
        setSelectedClient(null);
    };

    return (
        <div className="flex flex-col h-full bg-gray-50/50 dark:bg-zinc-950 rounded-none overflow-hidden transition-colors duration-200">
            {/* Header */}
            <div className="h-[72px] border-b border-gray-100 dark:border-white/5 flex items-center justify-between px-6 bg-white dark:bg-zinc-900 shrink-0 transition-colors duration-200 shadow-sm z-10">
                <div className="flex flex-col justify-center w-full max-w-2xl">
                    <Input
                        className="h-9 bg-transparent border-transparent text-lg font-semibold text-gray-900 dark:text-white placeholder:text-gray-400 focus-visible:ring-0 px-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors rounded-md -ml-2 pl-2"
                        placeholder="Title: Workout Name (e.g., Full Body Strength A)"
                        value={workoutTitle}
                        onChange={(e) => setWorkoutTitle(e.target.value)}
                    />
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-0.5">{workout.length} exercises added</p>
                </div>

                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        className="h-9 text-xs text-gray-600 dark:text-gray-400 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white"
                        onClick={() => setTemplateOpen(true)}
                    >
                        <Save className="w-3.5 h-3.5 mr-2" />
                        Save as Template
                    </Button>

                    <Button
                        className="h-9 text-xs bg-purple-600 hover:bg-purple-700 text-white shadow-sm border border-transparent"
                        onClick={() => setAssignOpen(true)}
                    >
                        <UserPlus className="w-3.5 h-3.5 mr-2" />
                        Assign to Client
                    </Button>

                    <Popover>
                        <PopoverTrigger asChild>
                            <Button
                                variant={"outline"}
                                className={cn(
                                    "h-9 w-[130px] justify-start text-left font-normal text-xs ml-2 border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-400",
                                    !date && "text-muted-foreground"
                                )}
                            >
                                <Calendar className="mr-2 h-3.5 w-3.5 text-gray-400" />
                                {date ? format(date, "MM/dd/yyyy") : <span>Pick a date</span>}
                            </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0" align="end">
                            <CalendarComponent
                                mode="single"
                                selected={date}
                                onSelect={setDate}
                                initialFocus
                            />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>

            {/* Canvas Area */}
            <div className="flex-1 overflow-y-auto py-6  scrollbar-hide bg-gray-50/50 dark:bg-black">
                {workout.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-gray-400 space-y-6">
                        <div className="w-20 h-20 rounded-full bg-white dark:bg-zinc-900 shadow-sm border border-gray-100 dark:border-white/5 flex items-center justify-center">
                            <Plus className="w-8 h-8 opacity-30 text-gray-400 dark:text-gray-600" />
                        </div>
                        <div className="text-center space-y-2">
                            <h3 className="text-lg font-medium text-gray-900 dark:text-white">Start Building Your Workout</h3>
                            <p className="max-w-xs mx-auto text-sm text-gray-500 dark:text-gray-400 leading-relaxed">
                                Search for exercises in the left panel and click to add them to your workout. You can then configure sets, reps, and other details.
                            </p>
                        </div>
                    </div>
                ) : (
                    <Reorder.Group axis="y" values={workout} onReorder={onReorder} className="space-y-4 pb-20 mx-auto">
                        {workout.map((exercise, index) => (
                            <ExerciseCard
                                key={exercise.instanceId}
                                index={index}
                                exercise={exercise}
                                onRemove={onRemove}
                                updateExercise={updateExercise}
                                updateSet={updateSet}
                                toggleExpand={toggleExpand}
                                isExpanded={!!expanded[exercise.instanceId]}
                            />
                        ))}
                    </Reorder.Group>
                )}
            </div>

            {/* Footer Actions (Only shown when exercises exist) */}
            {workout.length > 0 && (
                <div className="h-20 p-4 bg-white dark:bg-zinc-900 border-t border-gray-100 dark:border-white/5 flex gap-4 items-center justify-between shrink-0 z-10 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
                    <Button
                        variant="ghost"
                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10 h-11 px-6 text-sm font-medium"
                        onClick={() => setWorkout([])}
                    >
                        <Trash2 className="w-4 h-4 mr-2" />
                        Clear All
                    </Button>
                    <div className="flex gap-3">
                        <div className="flex-1"></div> {/* Spacer */}
                        <Button
                            className="bg-gray-900 hover:bg-black dark:bg-white dark:text-black dark:hover:bg-gray-200 text-white h-11 px-8 text-sm font-medium shadow-lg shadow-gray-200 dark:shadow-none"
                            onClick={() => setTemplateOpen(true)}
                        >
                            Save Template / Assign
                        </Button>
                    </div>
                </div>
            )}

            {/* Save Template Modal */}
            <Dialog open={templateOpen} onOpenChange={setTemplateOpen}>
                <DialogContent className="bg-white dark:bg-zinc-900 border-none text-gray-900 dark:text-white sm:max-w-[425px] shadow-2xl">
                    <DialogHeader>
                        <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                            <Save className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                            Save as Template
                        </DialogTitle>
                        <DialogDescription className="text-gray-500 dark:text-gray-400">
                            Save this workout structure to reuse later for other clients.
                        </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                        <div className="space-y-2">
                            <label className="text-sm font-medium text-gray-700 dark:text-gray-300">Template Name</label>
                            <Input
                                id="name"
                                placeholder="e.g., Hypertrophy Phase 1"
                                className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 focus:border-purple-500 text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-500"
                                value={templateName}
                                onChange={(e) => setTemplateName(e.target.value)}
                            />
                        </div>
                    </div>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setTemplateOpen(false)} className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5">Cancel</Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20" onClick={handleSaveTemplate}>Save Template</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>

            {/* Assign Client Modal */}
            <Dialog open={assignOpen} onOpenChange={setAssignOpen}>
                <DialogContent className="bg-white dark:bg-zinc-900 border-none text-gray-900 dark:text-white sm:max-w-[500px] p-0 overflow-hidden shadow-2xl">
                    <DialogHeader className="px-6 pt-6 pb-4 border-b border-gray-100 dark:border-white/5">
                        <DialogTitle className="text-xl font-semibold">Assign to Client</DialogTitle>
                        <DialogDescription className="text-gray-500 dark:text-gray-400">
                            Search for a client to assign this workout to.
                        </DialogDescription>
                    </DialogHeader>

                    <Command className="bg-transparent mt-2">
                        <CommandInput
                            placeholder="Search clients..."
                            className="h-12 border-0 focus:ring-0 text-gray-900 dark:text-white placeholder:text-gray-400 dark:placeholder:text-gray-500"
                        />
                        <CommandList className="max-h-[300px] p-2 scrollbar-thin">
                            <CommandEmpty className="py-6 text-center text-sm text-gray-500 dark:text-gray-400">No client found.</CommandEmpty>
                            <CommandGroup heading="Active Clients" className="text-gray-500 dark:text-gray-400">
                                {CLIENTS.map((client) => (
                                    <CommandItem
                                        key={client.id}
                                        onSelect={() => setSelectedClient(client.id)}
                                        className="flex items-center gap-3 p-2 rounded-lg aria-selected:bg-gray-100 dark:aria-selected:bg-white/5 cursor-pointer data-[selected=true]:bg-gray-100 dark:data-[selected=true]:bg-white/5"
                                    >
                                        <Avatar className="h-8 w-8 border border-gray-100 dark:border-white/10">
                                            <AvatarImage src={client.avatar} />
                                            <AvatarFallback className="bg-purple-100 dark:bg-purple-500/10 text-purple-600 dark:text-purple-400 text-xs">{client.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <div className="flex-1">
                                            <p className="font-medium text-gray-900 dark:text-white">{client.name}</p>
                                            <p className="text-xs text-gray-500 dark:text-gray-400">{client.email}</p>
                                        </div>
                                        {selectedClient === client.id && (
                                            <div className="w-2 h-2 rounded-full bg-purple-500 shadow-[0_0_8px_rgba(168,85,247,0.5)]" />
                                        )}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </CommandList>
                    </Command>

                    <div className="p-4 border-t border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-zinc-950/50 flex justify-end gap-3">
                        <Button variant="outline" onClick={() => setAssignOpen(false)} className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/5">Cancel</Button>
                        <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                            disabled={!selectedClient}
                            onClick={handleAssign}
                        >
                            Assign Workout
                        </Button>
                    </div>
                </DialogContent>
            </Dialog>
        </div>
    );
}
