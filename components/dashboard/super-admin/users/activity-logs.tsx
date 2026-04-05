"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function ActivityLogs() {
    const logs = [
        {
            action: "Session check-in",
            date: "Jan 13, 02:23 PM",
            detail: "Yoga class at FitZone Downtown"
        },
        {
            action: "Booked session",
            date: "Jan 12, 04:45 PM",
            detail: "Personal training with Mike Peters"
        },
        {
            action: "Payment processed",
            date: "Jan 11, 10:30 AM",
            detail: "Monthly membership - $89.99"
        },
        {
            action: "Profile updated",
            date: "Jan 10, 09:15 AM",
            detail: "Changed phone number"
        },
        {
            action: "Session completed",
            date: "Jan 9, 06:20 PM",
            detail: "HIIT class at FitZone Downtown"
        }
    ];

    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Activity Logs</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6 relative ml-3">
                    {/* Vertical Line */}
                    <div className="absolute left-0 top-3 bottom-3 w-px bg-gray-200 dark:bg-white/10" />

                    {logs.map((log, index) => (
                        <div key={index} className="relative pl-6">
                            {/* Dot */}
                            <div className="absolute left-[-4px] top-1.5 w-2 h-2 rounded-full bg-gray-300 dark:bg-gray-600 border-2 border-white dark:border-zinc-900" />

                            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-1">
                                <h4 className="text-sm font-medium text-gray-900 dark:text-white">{log.action}</h4>
                                <span className="text-xs text-gray-500">{log.date}</span>
                            </div>
                            <p className="text-sm text-gray-500">{log.detail}</p>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
