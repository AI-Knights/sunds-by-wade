"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    subtext: string;
    icon: LucideIcon;
    trend: string;
    color: string;
    index: number;
}

export function StatCard({ label, value, subtext, icon: Icon, trend, color, index }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5 }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
            className="relative overflow-hidden p-6 rounded-2xl bg-white dark:bg-card border border-gray-100 dark:border-white/5 group hover:border-gray-200 dark:hover:border-white/10 transition-colors shadow-sm hover:shadow-md"
        >
            {/* Glow Effect */}
            <div className={cn("absolute -right-6 -top-6 w-24 h-24 rounded-full opacity-0 dark:opacity-10 blur-2xl group-hover:opacity-5 dark:group-hover:opacity-20 transition-opacity", color.replace('text-', 'bg-'))} />

            <div className="flex justify-between items-start mb-4">
                <div className={cn("p-3 rounded-xl bg-gray-50 dark:bg-white/5", color)}>
                    <Icon className="w-6 h-6" />
                </div>
                {trend !== "0" && (
                    <span className={cn("text-xs font-medium px-2 py-1 rounded-full bg-gray-50 dark:bg-white/5", color)}>
                        {trend}
                    </span>
                )}
            </div>

            <div className="space-y-1">
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{value}</h3>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400">{label}</p>
            </div>

            <div className="mt-4 pt-4 border-t border-gray-100 dark:border-white/5 flex items-center text-xs text-gray-500 dark:text-gray-400">
                <span>{subtext}</span>
            </div>
        </motion.div>
    );
}
