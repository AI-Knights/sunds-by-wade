"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight, Clock, Users } from "lucide-react";
import { CLASSES } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";

interface WeeklyScheduleProps {
    onClassClick: (cls: any) => void;
}

export function WeeklySchedule({ onClassClick }: WeeklyScheduleProps) {
    // Mocking current week start as Jan 12, 2026 for demo alignment with screenshots/data
    const [currentWeekStart, setCurrentWeekStart] = useState(new Date("2026-01-12T00:00:00"));

    const days = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"];

    // Generate dates for current week
    const weekDates = Array.from({ length: 7 }, (_, i) => {
        const date = new Date(currentWeekStart);
        date.setDate(currentWeekStart.getDate() + i);
        return date;
    });

    const formatDate = (date: Date) => {
        return date.toISOString().split('T')[0];
    };

    const handlePrevWeek = () => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() - 7);
        setCurrentWeekStart(newDate);
    };

    const handleNextWeek = () => {
        const newDate = new Date(currentWeekStart);
        newDate.setDate(newDate.getDate() + 7);
        setCurrentWeekStart(newDate);
    };

    const getClassesForDate = (dateStr: string) => {
        return CLASSES.filter(c => c.date === dateStr).sort((a, b) => a.startTime.localeCompare(b.startTime));
    };

    const weekRangeStr = `${weekDates[0].toLocaleDateString('en-US', { month: 'short', day: 'numeric' })} - ${weekDates[6].toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}`;

    // Helper to identify today (mocking today as Jan 14 for visual highlight matching data)
    const isToday = (date: Date) => date.toISOString().split('T')[0] === "2026-01-14";

    return (
        <div className="space-y-4">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row items-center justify-between bg-white dark:bg-card/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm">
                <div className="flex items-center gap-4">
                    <div className="flex bg-gray-100 dark:bg-zinc-900 rounded-lg p-1">
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white" onClick={handlePrevWeek}>
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white" onClick={handleNextWeek}>
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                    <span className="text-lg font-semibold text-gray-900 dark:text-white">
                        {weekRangeStr}
                    </span>
                </div>

                <div className="flex p-1 bg-gray-100 dark:bg-zinc-900 rounded-lg">
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-white dark:hover:bg-zinc-800 rounded-md">Today</Button>
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-white dark:hover:bg-zinc-800 rounded-md">Day</Button>
                    <Button variant="secondary" size="sm" className="text-xs shadow-sm bg-white dark:bg-zinc-800 rounded-md">Week</Button>
                    <Button variant="ghost" size="sm" className="text-xs hover:bg-white dark:hover:bg-zinc-800 rounded-md">Month</Button>
                </div>
            </div>

            {/* Weekly Grid */}
            <div className="grid grid-cols-1 md:grid-cols-7 gap-4 min-h-[600px]">
                {weekDates.map((date, index) => {
                    const dateStr = formatDate(date);
                    const dayClasses = getClassesForDate(dateStr);
                    const isCurrentDay = isToday(date);

                    return (
                        <div key={dateStr} className={`flex flex-col gap-3 min-h-[200px] md:min-h-0 bg-white dark:bg-card/50 rounded-xl border ${isCurrentDay ? 'border-purple-500/50 dark:border-purple-500/50 ring-1 ring-purple-500/20' : 'border-gray-100 dark:border-gray-800'} shadow-sm p-3`}>
                            {/* Day Header */}
                            <div className="text-left mb-2">
                                <span className={`text-xs font-semibold uppercase block ${isCurrentDay ? 'text-purple-600 dark:text-purple-400' : 'text-gray-500'}`}>
                                    {days[index]}
                                </span>
                                <span className={`text-xl font-bold ${isCurrentDay ? 'text-purple-700 dark:text-purple-300' : 'text-gray-900 dark:text-white'}`}>
                                    {date.getDate()}
                                </span>
                            </div>

                            {/* Classes List */}
                            <div className="flex-1 space-y-2">
                                {dayClasses.length > 0 ? (
                                    dayClasses.map((cls) => (
                                        <motion.div
                                            whileHover={{ scale: 1.02 }}
                                            key={cls.id}
                                            onClick={() => onClassClick(cls)}
                                            className={`p-3 rounded-lg border text-left cursor-pointer transition-colors shadow-xs ${cls.status === 'Full'
                                                    ? 'bg-blue-50 border-blue-100 dark:bg-blue-900/20 dark:border-blue-900/30'
                                                    : cls.startTime >= "12:00" && cls.startTime < "17:00"
                                                        ? 'bg-purple-50 border-purple-100 dark:bg-purple-900/20 dark:border-purple-900/30'
                                                        : 'bg-emerald-50 border-emerald-100 dark:bg-emerald-900/20 dark:border-emerald-900/30'
                                                }`}
                                        >
                                            <h4 className="font-semibold text-sm mb-1 line-clamp-1 text-gray-900 dark:text-white">{cls.title}</h4>

                                            <div className="flex items-center gap-1 text-xs text-muted-foreground mb-1">
                                                <Clock className="w-3 h-3" />
                                                <span>{cls.startTime}</span>
                                            </div>

                                            <div className="flex items-center gap-1 text-xs text-muted-foreground">
                                                <Users className="w-3 h-3" />
                                                <span>{cls.enrolled}/{cls.capacity}</span>
                                            </div>
                                        </motion.div>
                                    ))
                                ) : (
                                    <div className="h-full flex items-center justify-center text-xs text-gray-400 italic">
                                        No classes
                                    </div>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
