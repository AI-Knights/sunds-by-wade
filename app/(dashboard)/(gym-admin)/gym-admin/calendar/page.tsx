"use client";

import { useState } from "react";
import { addMonths, subMonths, addWeeks, subWeeks, addDays, subDays } from "date-fns";
import { CalendarHeader, CalendarViewType } from "@/components/dashboard/admin/calendar/calendar-header";
import { MonthView } from "@/components/dashboard/admin/calendar/month-view";
import { WeekView } from "@/components/dashboard/admin/calendar/week-view";
import { Header } from "@/components/dashboard/header";
import { Button } from "@/components/ui/button";
import { Download, Calendar as CalendarIcon, CheckSquare } from "lucide-react";
import { CLASSES, SESSIONS } from "@/constants/data";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { BlockTimeModal } from "@/components/dashboard/admin/calendar/block-time-modal";

export default function CalendarPage() {
    const [currentDate, setCurrentDate] = useState(new Date());
    const [view, setView] = useState<CalendarViewType>("month");
    const [filter, setFilter] = useState("all"); // 'all', 'classes', 'trainers'
    const [toggles, setToggles] = useState({
        classes: true,
        trainerAvailability: true,
        clientBookings: true
    });

    // Navigation handlers
    const handlePrev = () => {
        if (view === "month") setCurrentDate(subMonths(currentDate, 1));
        else if (view === "week") setCurrentDate(subWeeks(currentDate, 1));
        else setCurrentDate(subDays(currentDate, 1));
    };

    const handleNext = () => {
        if (view === "month") setCurrentDate(addMonths(currentDate, 1));
        else if (view === "week") setCurrentDate(addWeeks(currentDate, 1));
        else setCurrentDate(addDays(currentDate, 1));
    };

    const handleToday = () => setCurrentDate(new Date());

    // Prepare Events Data
    const classEvents = CLASSES.map(cls => ({
        ...cls,
        type: 'class',
        // Ensure date is consistent (CLASSES uses string "2026-01-14")
        date: cls.date
    }));

    // Mock Trainer Availability (Green)
    const trainerEvents = [
        { id: 't-1', title: 'Trainer Availability', startTime: '14:00', date: '2026-01-14', type: 'trainer' },
        { id: 't-2', title: 'Trainer Availability', startTime: '09:00', date: '2026-01-15', type: 'trainer' },
    ];

    // Mock Client Bookings (Purple) - using SESSIONS or mock
    const sessionEvents = SESSIONS.map(sess => {
        // Convert JS Date to YYYY-MM-DD string roughly for matching or use date object in component
        // Since MonthView expects string date or Date object, we handle it there.
        // Let's standardize on Date string for simple filtering or Date object.
        return {
            id: sess.id,
            title: `${sess.type} Session - ${sess.client}`,
            startTime: sess.date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit', hour12: false }),
            date: sess.date, // Use Date object directly
            type: 'booking'
        }
    });

    let allEvents = [];
    if (toggles.classes) allEvents.push(...classEvents);
    if (toggles.trainerAvailability) allEvents.push(...trainerEvents);
    if (toggles.clientBookings) allEvents.push(...sessionEvents);

    // Apply Dropdown Filter if needed (can overlap with checkboxes, usually one or other is primary. The screenshot shows Dropdown AND Checkboxes. Let's make Dropdown a broader preset or just strict filter)
    if (filter === 'classes') {
        allEvents = allEvents.filter(e => e.type === 'class');
    } else if (filter === 'trainers') {
        allEvents = allEvents.filter(e => e.type === 'trainer');
    }

    const handleEventClick = (event: any) => {
        console.log("Clicked event", event);
        // Open detail modal todo
    };

    const [isBlockTimeOpen, setIsBlockTimeOpen] = useState(false);

    const handleBlockTimeSave = (data: any) => {
        console.log("Saving block time:", data);
        // Here we would typically make an API call to save the data
        setIsBlockTimeOpen(false);
    };

    return (
        <div className="space-y-6 max-w-[1600px] mx-auto h-[calc(100vh-100px)] flex flex-col">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 shrink-0">
                <Header title="Calendar" subtitle="Unified view of classes, trainers, and bookings" />
            </div>

            <CalendarHeader
                date={currentDate}
                view={view}
                onViewChange={setView}
                onPrev={handlePrev}
                onNext={handleNext}
                onToday={handleToday}
                filter={filter}
                onFilterChange={setFilter}
            />

            {/* Filter Toggles Row */}
            <div className="flex items-center gap-6 px-2 shrink-0">
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="classes"
                        checked={toggles.classes}
                        onCheckedChange={(c) => setToggles(prev => ({ ...prev, classes: !!c }))}
                        className="data-[state=checked]:bg-blue-500 data-[state=checked]:border-blue-500"
                    />
                    <Label htmlFor="classes" className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5 cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-blue-500" />
                        Classes
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="availability"
                        checked={toggles.trainerAvailability}
                        onCheckedChange={(c) => setToggles(prev => ({ ...prev, trainerAvailability: !!c }))}
                        className="data-[state=checked]:bg-emerald-500 data-[state=checked]:border-emerald-500"
                    />
                    <Label htmlFor="availability" className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5 cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-emerald-500" />
                        Trainer Availability
                    </Label>
                </div>
                <div className="flex items-center space-x-2">
                    <Checkbox
                        id="bookings"
                        checked={toggles.clientBookings}
                        onCheckedChange={(c) => setToggles(prev => ({ ...prev, clientBookings: !!c }))}
                        className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                    />
                    <Label htmlFor="bookings" className="text-sm font-medium text-gray-600 dark:text-gray-300 flex items-center gap-1.5 cursor-pointer">
                        <div className="w-2 h-2 rounded-full bg-purple-600" />
                        Client Bookings
                    </Label>
                </div>
            </div>

            <div className="flex-1 min-h-0">
                {view === "month" && (
                    <MonthView
                        date={currentDate}
                        events={allEvents}
                        onEventClick={handleEventClick}
                    />
                )}
                {view === "week" && (
                    <WeekView
                        date={currentDate}
                        events={allEvents}
                        onEventClick={handleEventClick}
                    />
                )}
                {view === "day" && (
                    <div className="h-full flex items-center justify-center bg-white dark:bg-zinc-900 rounded-xl border border-dashed border-gray-200 dark:border-white/10 text-gray-400">
                        Day view coming soon
                    </div>
                )}
            </div>

            <div className="flex gap-4 shrink-0 pb-4">
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                    onClick={() => setIsBlockTimeOpen(true)}
                >
                    Block Time
                </Button>
                <Button variant="outline" className="gap-2">
                    <Download className="w-4 h-4" /> Export Calendar
                </Button>
            </div>

            <BlockTimeModal
                isOpen={isBlockTimeOpen}
                onClose={() => setIsBlockTimeOpen(false)}
                onSave={handleBlockTimeSave}
            />
        </div>
    );
}
