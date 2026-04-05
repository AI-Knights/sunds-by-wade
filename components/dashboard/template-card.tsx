"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Edit, Copy, Users, Dumbbell } from "lucide-react";
import { cn } from "@/lib/utils";

interface TemplateCardProps {
    template: any;
    onAssign: (template: any) => void;
    index: number;
}

export function TemplateCard({ template, onAssign, index }: TemplateCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.4 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="group flex flex-col bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm hover:shadow-xl dark:shadow-none hover:border-purple-500/20 dark:hover:border-purple-500/20 transition-all duration-300"
        >
            {/* Header */}
            <div className="flex justify-between items-start mb-4">
                <div>
                    <h3 className="text-lg font-bold text-gray-900 dark:text-white line-clamp-1 group-hover:text-purple-600 dark:group-hover:text-purple-400 transition-colors">
                        {template.name}
                    </h3>
                    <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">
                        {template.totalExercises} exercises • {template.totalSets} sets
                    </p>
                </div>
                <Badge variant="secondary" className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300">
                    {template.type}
                </Badge>
            </div>

            {/* Exercise Preview List */}
            <div className="flex-1 space-y-3 mb-6">
                {template.exercises.slice(0, 3).map((ex: any, i: number) => (
                    <div key={i} className="flex justify-between text-sm py-1 border-b border-dashed border-gray-100 dark:border-white/5 last:border-0">
                        <span className="text-gray-600 dark:text-gray-300 font-medium truncate pr-4">{ex.name}</span>
                        <span className="text-gray-400 dark:text-gray-500 font-mono text-xs whitespace-nowrap">
                            {ex.sets}
                        </span>
                    </div>
                ))}
                {template.exercises.length > 3 && (
                    <p className="text-xs text-center text-gray-400 dark:text-gray-500 font-medium pt-2 italic">
                        +{template.exercises.length - 3} more exercises
                    </p>
                )}
            </div>

            {/* Actions */}
            <div className="flex gap-3 pt-4 border-t border-gray-100 dark:border-white/5">
                <Button
                    variant="outline"
                    className="flex-1 border-purple-100 dark:border-purple-500/20 text-purple-600 dark:text-purple-400 hover:bg-purple-50 dark:hover:bg-purple-500/10 hover:border-purple-200"
                    onClick={() => onAssign(template)}
                >
                    <Users className="w-4 h-4 mr-2" /> Assign
                </Button>
                <div className="flex gap-1">
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <Edit className="w-4 h-4" />
                    </Button>
                    <Button variant="ghost" size="icon" className="h-9 w-9 text-gray-400 hover:text-gray-600 dark:hover:text-gray-200">
                        <Copy className="w-4 h-4" />
                    </Button>
                </div>
            </div>
        </motion.div>
    );
}
