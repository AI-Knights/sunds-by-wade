"use client";

import { useState } from "react";
import { Download, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/dashboard/header";
import { CalendarView } from "@/components/dashboard/schedule/calendar-view";
import { UpcomingSessions } from "@/components/dashboard/schedule/upcoming-sessions";
import { AddAvailabilityModal } from "@/components/dashboard/schedule/modals/add-availability-modal";
import { SessionDetailsModal } from "@/components/dashboard/schedule/modals/session-details-modal";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { SESSIONS } from "@/constants/data";

export default function CalendarPage() {
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);
    const [sessions, setSessions] = useState(SESSIONS);
    const [selectedSession, setSelectedSession] = useState<any>(null);

    const handleAddAvailability = (data: any) => {
        const newSessions = data.timeRanges.map((range: any, index: number) => {
            const [startHour, startMinute] = range.start.split(":").map(Number);
            const info = data.baseDate.split("-").map(Number); // yyyy-mm-dd
            const sessionDate = new Date(info[0], info[1] - 1, info[2], startHour, startMinute);

            return {
                id: `new-${Date.now()}-${index}`,
                date: sessionDate,
                duration: Number(data.duration),
                client: data.isOpen ? "Open" : "New Client", // Simplified for demo
                type: data.isOpen ? "Open" : "Personal",
                status: data.isOpen ? "Open" : "Scheduled"
            };
        });

        setSessions([...sessions, ...newSessions]);
        setIsAddModalOpen(false);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 pb-20">
            <Header />

            <div className="container mx-auto px-6 max-w-[1600px] pt-8 space-y-8">
                {/* Page Header */}
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-6">
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Calendar & Availability</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage your schedule and availability</p>
                    </div>

                    <div className="flex flex-wrap gap-3 items-center">
                        <Select defaultValue="downtown">
                            <SelectTrigger className="w-[200px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white shadow-sm h-10">
                                <SelectValue placeholder="Select Location" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="downtown">Downtown Fitness Hut</SelectItem>
                                <SelectItem value="elite">Elite Training Center</SelectItem>
                            </SelectContent>
                        </Select>

                        <Button variant="outline" className="bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-700 dark:text-white shadow-sm h-10">
                            Export Calendar
                        </Button>

                        <Button
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 h-10 px-6 font-medium"
                            onClick={() => setIsAddModalOpen(true)}
                        >
                            <Plus className="w-4 h-4 mr-2" /> Set Availability
                        </Button>
                    </div>
                </div>

                {/* Calendar Grid */}
                <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                    <CalendarView sessions={sessions} />
                </div>

                {/* Upcoming Sessions List */}
                <div className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-900 dark:text-white">Upcoming Sessions</h2>
                    <div className="bg-white dark:bg-zinc-900 rounded-3xl border border-gray-100 dark:border-white/5 shadow-sm p-6">
                        <UpcomingSessions sessions={sessions} onSessionClick={setSelectedSession} />
                    </div>
                </div>
            </div>

            <AddAvailabilityModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
                onSave={handleAddAvailability}
            />

            <SessionDetailsModal
                session={selectedSession}
                onClose={() => setSelectedSession(null)}
            />
        </div>
    );
}
