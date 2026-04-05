"use client";

import { useState } from "react";
import {
    format,
    addMonths,
    subMonths,
    startOfMonth,
    endOfMonth,
    startOfWeek,
    endOfWeek,
    eachDayOfInterval,
    isSameMonth,
    isSameDay,
    isToday
} from "date-fns";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";
import { DayOverviewModal } from "./modals/day-overview-modal";
import { SessionDetailsModal } from "./modals/session-details-modal";

interface CalendarViewProps {
    sessions: any[];
}

export function CalendarView({ sessions }: CalendarViewProps) {
    const [currentMonth, setCurrentMonth] = useState(new Date(2026, 0, 1)); // Default to Jan 2026 as per screenshot
    const [selectedDay, setSelectedDay] = useState<Date | null>(null);
    const [selectedSession, setSelectedSession] = useState<any>(null);

    const nextMonth = () => setCurrentMonth(addMonths(currentMonth, 1));
    const prevMonth = () => setCurrentMonth(subMonths(currentMonth, 1));

    const monthStart = startOfMonth(currentMonth);
    const monthEnd = endOfMonth(monthStart);
    const startDate = startOfWeek(monthStart);
    const endDate = endOfWeek(monthEnd);

    const calendarDays = eachDayOfInterval({
        start: startDate,
        end: endDate
    });

    const weekDays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

    const getSessionsForDay = (date: Date) => {
        return sessions.filter(session => isSameDay(session.date, date));
    };

    const getTypeColor = (type: string) => {
        switch (type.toLowerCase()) {
            case "personal": return "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300";
            case "group": return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300";
            case "open": return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300";
            default: return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="p-6">
            {/* Calendar Controls */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
                <div className="flex items-center gap-4">
                    <div className="flex items-center bg-gray-50 dark:bg-white/5 rounded-lg p-1">
                        <Button variant="ghost" size="icon" onClick={prevMonth} className="h-8 w-8 hover:bg-white dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <span className="min-w-[140px] text-center text-sm font-semibold text-gray-900 dark:text-white">
                            {format(currentMonth, "MMMM yyyy")}
                        </span>
                        <Button variant="ghost" size="icon" onClick={nextMonth} className="h-8 w-8 hover:bg-white dark:hover:bg-white/10 text-gray-600 dark:text-gray-300">
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>

                <div className="flex gap-4 text-xs font-medium">
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-blue-500" /> Personal
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-purple-500" /> Group
                    </div>
                    <div className="flex items-center gap-2 text-gray-600 dark:text-gray-400">
                        <div className="w-2 h-2 rounded-full bg-gray-400 dark:bg-gray-600" /> Open
                    </div>
                </div>
            </div>

            {/* Calendar Grid */}
            <div className="border border-gray-100 dark:border-white/5 rounded-xl overflow-hidden">
                {/* Weekday Headers */}
                <div className="grid grid-cols-7 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5">
                    {weekDays.map(day => (
                        <div key={day} className="py-3 text-center text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                            {day}
                        </div>
                    ))}
                </div>

                {/* Days Grid */}
                <div className="grid grid-cols-7 auto-rows-[minmax(120px,auto)] bg-white dark:bg-zinc-900">
                    {calendarDays.map((day, dayIdx) => {
                        const daySessions = getSessionsForDay(day);
                        return (
                            <div
                                key={day.toString()}
                                onClick={() => setSelectedDay(day)}
                                className={cn(
                                    "min-h-[120px] p-2 border-b border-r border-gray-100 dark:border-white/5 transition-colors hover:bg-gray-50/50 dark:hover:bg-white/2 cursor-pointer group relative",
                                    !isSameMonth(day, currentMonth) && "bg-gray-50/30 dark:bg-zinc-950/30",
                                    (dayIdx + 1) % 7 === 0 && "border-r-0" // Remove right border for last col
                                )}
                            >
                                <div className="flex justify-between items-start mb-2">
                                    <span className={cn(
                                        "text-xs font-medium w-6 h-6 flex items-center justify-center rounded-full",
                                        isToday(day)
                                            ? "bg-purple-600 text-white"
                                            : !isSameMonth(day, currentMonth)
                                                ? "text-gray-300 dark:text-gray-600"
                                                : "text-gray-700 dark:text-gray-300"
                                    )}>
                                        {format(day, "d")}
                                    </span>
                                </div>

                                <div className="space-y-1">
                                    {daySessions.map((session, i) => (
                                        <motion.div
                                            key={i}
                                            initial={{ opacity: 0, scale: 0.9 }}
                                            animate={{ opacity: 1, scale: 1 }}
                                            className={cn(
                                                "px-2 py-1 rounded-md text-[10px] font-medium truncate",
                                                getTypeColor(session.type)
                                            )}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                setSelectedSession(session);
                                            }}
                                        >
                                            {format(session.date, "HH:mm")} {session.type === "Open" ? "Open" : session.client}
                                        </motion.div>
                                    ))}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Modals */}
            {selectedDay && (
                <DayOverviewModal
                    date={selectedDay}
                    sessions={getSessionsForDay(selectedDay)}
                    onClose={() => setSelectedDay(null)}
                />
            )}

            {selectedSession && (
                <SessionDetailsModal
                    session={selectedSession}
                    onClose={() => setSelectedSession(null)}
                />
            )}
        </div>
    );
}
