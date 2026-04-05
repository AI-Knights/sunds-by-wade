"use client";

import { startOfMonth, endOfMonth, startOfWeek, endOfWeek, eachDayOfInterval, format, isSameMonth, isSameDay, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface MonthViewProps {
    date: Date;
    events: any[];
    onEventClick: (event: any) => void;
}

export function MonthView({ date, events, onEventClick }: MonthViewProps) {
    const monthStart = startOfMonth(date);
    const monthEnd = endOfMonth(date);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const dateFormat = "d";
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
            {/* Days Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5">
                {weekDays.map(day => (
                    <div key={day} className="py-3 text-center text-xs font-semibold text-gray-500 uppercase tracking-wider">
                        {day}
                    </div>
                ))}
            </div>

            {/* Calendar Grid */}
            <div className="grid grid-cols-7 grid-rows-5 flex-1">
                {days.map((day, dayIdx) => {
                    const dayEvents = events.filter(event => isSameDay(new Date(event.date), day));
                    // Check if day is from previous/next month
                    const isCurrentMonth = isSameMonth(day, monthStart);

                    return (
                        <div
                            key={day.toString()}
                            className={cn(
                                "min-h-[100px] border-b border-r border-gray-100 dark:border-white/5 p-2 transition-colors relative group",
                                // Last column shouldn't have right border if we want strict grid, but grid-cols handles layout. 
                                // Borders on grid items:
                                dayIdx % 7 === 6 ? "border-r-0" : "",
                                !isCurrentMonth && "bg-gray-50/30 dark:bg-white/2"
                            )}
                        >
                            {/* Date Number */}
                            <div className="flex justify-between items-start mb-1">
                                <span
                                    className={cn(
                                        "text-sm font-medium h-7 w-7 flex items-center justify-center rounded-full",
                                        !isCurrentMonth && "text-gray-400 dark:text-gray-600",
                                        isToday(day)
                                            ? "bg-purple-600 text-white shadow-md shadow-purple-500/20"
                                            : "text-gray-700 dark:text-gray-300 group-hover:bg-gray-100 dark:group-hover:bg-white/10"
                                    )}
                                >
                                    {format(day, dateFormat)}
                                </span>
                            </div>

                            {/* Events */}
                            <div className="space-y-1.5 overflow-hidden max-h-[100px]">
                                {dayEvents.slice(0, 3).map((event, i) => (
                                    <motion.button
                                        key={event.id || i}
                                        initial={{ opacity: 0, scale: 0.95 }}
                                        animate={{ opacity: 1, scale: 1 }}
                                        className={cn(
                                            "w-full text-left px-2 py-1 rounded-md text-[10px] sm:text-xs font-medium truncate flex items-center gap-1.5 transition-all hover:brightness-95",
                                            event.type === 'class' && "bg-blue-50 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 border border-blue-100 dark:border-blue-500/20",
                                            event.type === 'trainer' && "bg-emerald-50 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border border-emerald-100 dark:border-emerald-500/20",
                                            event.type === 'booking' && "bg-purple-50 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border border-purple-100 dark:border-purple-500/20",
                                        )}
                                        onClick={() => onEventClick(event)}
                                    >
                                        <span className="opacity-70 font-normal">{event.startTime}</span>
                                        <span>{event.title}</span>
                                    </motion.button>
                                ))}
                                {dayEvents.length > 3 && (
                                    <div className="text-[10px] text-gray-400 pl-1 font-medium">
                                        +{dayEvents.length - 3} more
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
