"use client"

import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { TEMPLATES } from "@/constants/data"
import { useState } from "react"
import { CheckCircle2, Circle, Dumbbell } from "lucide-react"
import { cn } from "@/lib/utils"
import { toast } from "sonner"

interface AssignWorkoutModalProps {
    isOpen: boolean;
    onClose: () => void;
    clientName: string;
}

export function AssignWorkoutModal({ isOpen, onClose, clientName }: AssignWorkoutModalProps) {
    const [selectedTemplate, setSelectedTemplate] = useState<string | null>(null);

    const handleAssign = () => {
        if (!selectedTemplate) return;

        // Simulating API call
        toast.success(`Workout assigned successfully to ${clientName}`);
        onClose();
        setSelectedTemplate(null);
    }

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl bg-white dark:bg-zinc-900 border-gray-100 dark:border-white/10">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold">Assign Workout to {clientName}</DialogTitle>
                    <p className="text-sm text-gray-500">
                        You'll be redirected to the Workout Builder where you can create a new workout or select from your templates to assign to this client.
                    </p>
                </DialogHeader>

                <div className="space-y-3 my-4">
                    {TEMPLATES.map((template) => (
                        <div
                            key={template.id}
                            onClick={() => setSelectedTemplate(template.id)}
                            className={cn(
                                "flex items-center gap-4 p-4 rounded-xl border cursor-pointer transition-all",
                                selectedTemplate === template.id
                                    ? "bg-purple-50 dark:bg-purple-900/10 border-purple-500 ring-1 ring-purple-500"
                                    : "bg-gray-50 dark:bg-white/5 border-gray-100 dark:border-white/5 hover:border-purple-200 dark:hover:border-purple-800"
                            )}
                        >
                            <div className={cn(
                                "w-10 h-10 rounded-full flex items-center justify-center shrink-0",
                                selectedTemplate === template.id ? "bg-purple-600 text-white" : "bg-purple-100 dark:bg-purple-900/30 text-purple-600"
                            )}>
                                {selectedTemplate === template.id ? <CheckCircle2 className="w-6 h-6" /> : <span className="font-bold text-sm">SM</span>}
                            </div>

                            <div className="flex-1">
                                <h4 className="font-semibold text-gray-900 dark:text-white">{template.name}</h4>
                                <p className="text-sm text-gray-500">{template.totalExercises} Exercises</p>
                            </div>
                        </div>
                    ))}
                </div>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleAssign}
                        disabled={!selectedTemplate}
                        className="bg-purple-600 hover:bg-purple-700 text-white"
                    >
                        Assign
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )
}
