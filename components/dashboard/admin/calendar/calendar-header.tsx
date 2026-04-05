"use client";

import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type CalendarViewType = "month" | "week" | "day";

interface CalendarHeaderProps {
    date: Date;
    view: CalendarViewType;
    onViewChange: (view: CalendarViewType) => void;
    onPrev: () => void;
    onNext: () => void;
    onToday: () => void;
    filter: string;
    onFilterChange: (value: string) => void;
}

export function CalendarHeader({
    date,
    view,
    onViewChange,
    onPrev,
    onNext,
    onToday,
    filter,
    onFilterChange
}: CalendarHeaderProps) {
    return (
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-4 p-4 bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
            {/* Date Navigation */}
            <div className="flex items-center gap-4 w-full xl:w-auto justify-between xl:justify-start">
                <div className="flex items-center gap-2">
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onPrev}
                        className="h-9 w-9 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                        <ChevronLeft className="w-4 h-4" />
                    </Button>
                    <Button
                        variant="outline"
                        size="icon"
                        onClick={onNext}
                        className="h-9 w-9 border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                        <ChevronRight className="w-4 h-4" />
                    </Button>
                </div>

                <h2 className="text-xl font-bold text-gray-900 dark:text-white min-w-[200px] text-center xl:text-left">
                    {view === "month" && format(date, "MMMM yyyy")}
                    {view === "week" && `Week of ${format(date, "MMM d, yyyy")}`}
                    {view === "day" && format(date, "EEEE, MMM d, yyyy")}
                </h2>
            </div>

            {/* Controls */}
            <div className="flex flex-col sm:flex-row items-center gap-3 w-full xl:w-auto">
                <div className="flex items-center gap-3 w-full sm:w-auto">
                    <Button
                        variant="outline"
                        onClick={onToday}
                        className="border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                    >
                        Today
                    </Button>

                    <div className="flex bg-gray-100 dark:bg-zinc-800 rounded-lg p-1">
                        {(["month", "week", "day"] as CalendarViewType[]).map((v) => (
                            <button
                                key={v}
                                onClick={() => onViewChange(v)}
                                className={cn(
                                    "relative px-4 py-1.5 text-sm font-medium rounded-md transition-colors z-10 capitalize",
                                    view === v
                                        ? "text-white"
                                        : "text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
                                )}
                            >
                                {view === v && (
                                    <motion.div
                                        layoutId="activeView"
                                        className="absolute inset-0 bg-purple-600 rounded-md -z-10 shadow-sm"
                                        transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                    />
                                )}
                                {v}
                            </button>
                        ))}
                    </div>
                </div>

                <div className="h-8 w-px bg-gray-200 dark:bg-white/10 hidden sm:block" />

                <Select value={filter} onValueChange={onFilterChange}>
                    <SelectTrigger className="w-full sm:w-[160px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10">
                        <SelectValue placeholder="Filter View" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all">All Events</SelectItem>
                        <SelectItem value="classes">Classes</SelectItem>
                        <SelectItem value="trainers">Trainers</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
