"use client";

import { startOfWeek, endOfWeek, eachDayOfInterval, format, isSameDay, isToday } from "date-fns";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface WeekViewProps {
    date: Date;
    events: any[];
    onEventClick: (event: any) => void;
}

export function WeekView({ date, events, onEventClick }: WeekViewProps) {
    const startDate = startOfWeek(date);
    const endDate = endOfWeek(date);
    const days = eachDayOfInterval({ start: startDate, end: endDate });

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden flex flex-col h-[calc(100vh-280px)] min-h-[600px]">
            {/* Week Header */}
            <div className="grid grid-cols-7 border-b border-gray-100 dark:border-white/5 bg-gray-50/50 dark:bg-white/5 divide-x divide-gray-100 dark:divide-white/5">
                {days.map((day) => (
                    <div
                        key={day.toString()}
                        className={cn(
                            "py-4 text-center cursor-pointer hover:bg-white dark:hover:bg-white/5 transition-colors",
                            isToday(day) && "bg-purple-50/50 dark:bg-purple-900/10"
                        )}
                    >
                        <div className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-1">
                            {format(day, "EEE")}
                        </div>
                        <div className={cn(
                            "text-2xl font-bold",
                            isToday(day)
                                ? "text-purple-600 dark:text-purple-400"
                                : "text-gray-900 dark:text-white"
                        )}>
                            {format(day, "d")}
                        </div>
                    </div>
                ))}
            </div>

            {/* Events Columns */}
            <div className="grid grid-cols-7 flex-1 divide-x divide-gray-100 dark:divide-white/5 overflow-y-auto">
                {days.map((day) => {
                    const dayEvents = events.filter(event => isSameDay(new Date(event.date), day));

                    return (
                        <div key={day.toString()} className="min-h-full p-2 space-y-2 bg-white dark:bg-transparent">
                            {dayEvents.length > 0 ? (
                                dayEvents.map((event, i) => (
                                    <motion.button
                                        key={event.id || i}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: i * 0.05 }}
                                        className={cn(
                                            "w-full text-left p-3 rounded-lg border text-xs transition-all hover:scale-[1.02] hover:shadow-sm",
                                            event.type === 'class' && "bg-blue-50 border-blue-100 text-blue-700 dark:bg-blue-500/10 dark:border-blue-500/20 dark:text-blue-300",
                                            event.type === 'trainer' && "bg-emerald-50 border-emerald-100 text-emerald-700 dark:bg-emerald-500/10 dark:border-emerald-500/20 dark:text-emerald-300",
                                            event.type === 'booking' && "bg-purple-50 border-purple-100 text-purple-700 dark:bg-purple-500/10 dark:border-purple-500/20 dark:text-purple-300",
                                        )}
                                        onClick={() => onEventClick(event)}
                                    >
                                        <div className="font-semibold mb-1 truncate">{event.title}</div>
                                        <div className="flex items-center gap-1 opacity-80 mb-1.5">
                                            {/* <Clock className="w-3 h-3" /> */}
                                            <span className="font-mono">{event.startTime}</span>
                                        </div>
                                        {event.description && (
                                            <div className="text-[10px] opacity-70 line-clamp-2 leading-relaxed">
                                                {event.description}
                                            </div>
                                        )}
                                    </motion.button>
                                ))
                            ) : (
                                <div className="h-full flex flex-col items-center justify-center text-gray-400 dark:text-gray-600 gap-2 opacity-50">
                                    <p className="text-[10px]">No events</p>
                                </div>
                            )}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
