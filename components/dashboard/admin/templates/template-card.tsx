"use client";

import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Send,
    Copy,
    Lock,
    Unlock,
    Edit,
    Trash2,
    Dumbbell,
    Users
} from "lucide-react";
import { motion } from "framer-motion";

interface TemplateCardProps {
    template: any;
    onAssign: (template: any) => void;
}

export function TemplateCard({ template, onAssign }: TemplateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.2 }}
        >
            <Card className="border-gray-100 dark:border-gray-800 bg-white dark:bg-card/50 overflow-hidden hover:shadow-md transition-shadow">
                <CardContent className="p-6">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-1">{template.title || template.name}</h3>
                            <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                <span>by {template.author?.name || "Gym Admin"}</span>
                            </div>
                        </div>
                        {template.isLocked && (
                            <Lock className="w-4 h-4 text-orange-400" />
                        )}
                    </div>

                    <div className="flex items-center gap-4 mb-6 text-sm">
                        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                            <Dumbbell className="w-4 h-4" />
                            <span>{template.exercisesCount || template.totalExercises || 0} exercises</span>
                        </div>
                        {template.assignedCount !== undefined && (
                            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300">
                                <Users className="w-4 h-4" />
                                <span>{template.assignedCount} assigned</span>
                            </div>
                        )}
                    </div>

                    <div className="text-xs text-muted-foreground mb-4">
                        {template.lastModified ? `Modified ${template.lastModified}` : (template.totalSets ? `${template.totalSets} total sets` : "")}
                    </div>

                    <Button
                        className="w-full bg-purple-600 hover:bg-purple-700 text-white gap-2"
                        onClick={() => onAssign(template)}
                    >
                        <Send className="w-4 h-4" /> Assign
                    </Button>
                </CardContent>

                <CardFooter className="p-2 bg-gray-50 dark:bg-zinc-900/50 flex justify-between border-t border-gray-100 dark:border-gray-800">
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            <Copy className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                            {template.isLocked ? <Unlock className="w-4 h-4" /> : <Lock className="w-4 h-4" />}
                        </Button>
                    </div>
                    <div className="flex gap-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-blue-600">
                            <Edit className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-red-600">
                            <Trash2 className="w-4 h-4" />
                        </Button>
                    </div>
                </CardFooter>
            </Card>
        </motion.div>
    );
}
