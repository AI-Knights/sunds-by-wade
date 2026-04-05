"use client";

import { motion } from "framer-motion";
import { Check } from "lucide-react";
import { cn } from "@/lib/utils";

interface FilterBarProps {
    filters: {
        classes: boolean;
        trainers: boolean;
        bookings: boolean;
    };
    onChange: (key: keyof FilterBarProps["filters"]) => void;
}

export function FilterBar({ filters, onChange }: FilterBarProps) {
    const filterItems = [
        {
            key: "classes",
            label: "Classes",
            color: "bg-blue-500",
            borderColor: "border-blue-200 dark:border-blue-800",
            activeClass: "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300"
        },
        {
            key: "trainers",
            label: "Trainer Availability",
            color: "bg-emerald-500",
            borderColor: "border-emerald-200 dark:border-emerald-800",
            activeClass: "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300"
        },
        {
            key: "bookings",
            label: "Client Bookings",
            color: "bg-purple-500",
            borderColor: "border-purple-200 dark:border-purple-800",
            activeClass: "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300"
        }
    ] as const;

    return (
        <div className="flex flex-wrap items-center gap-4 p-4 bg-white dark:bg-card/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
            {filterItems.map((item) => (
                <button
                    key={item.key}
                    onClick={() => onChange(item.key)}
                    className="flex items-center gap-2 group cursor-pointer"
                >
                    <div
                        className={cn(
                            "w-5 h-5 rounded-md flex items-center justify-center border transition-all duration-200",
                            item.borderColor,
                            filters[item.key]
                                ? item.color
                                : "bg-transparent hover:bg-gray-50 dark:hover:bg-white/5"
                        )}
                    >
                        {filters[item.key] && (
                            <motion.div
                                initial={{ scale: 0 }}
                                animate={{ scale: 1 }}
                                exit={{ scale: 0 }}
                                transition={{ type: "spring", stiffness: 500, damping: 30 }}
                            >
                                <Check className="w-3.5 h-3.5 text-white stroke-[3]" />
                            </motion.div>
                        )}
                    </div>
                    <span className={cn(
                        "text-sm font-medium transition-colors",
                        filters[item.key] ? "text-gray-900 dark:text-white" : "text-gray-500 dark:text-gray-400"
                    )}>
                        {item.label}
                    </span>
                </button>
            ))}
        </div>
    );
}
