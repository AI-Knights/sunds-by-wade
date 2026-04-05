"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function GymDetailsCard() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Gym Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Owner / Admin Email</h4>
                    <p className="text-sm font-medium dark:text-white text-gray-900 mt-1">owner@fitzone.com</p>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Location</h4>
                    <p className="text-sm font-medium dark:text-white text-gray-900 mt-1">New York, NY</p>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Created Date</h4>
                    <p className="text-sm font-medium dark:text-white text-gray-900 mt-1">March 15, 2024</p>
                </div>
                <div>
                    <h4 className="text-sm font-medium text-gray-500">Gym ID</h4>
                    <p className="text-sm font-medium font-mono dark:text-white text-gray-900 mt-1">gym-001</p>
                </div>
            </CardContent>
        </Card>
    );
}

const ACTIVITIES = [
    {
        title: "New member registered",
        desc: "Client account created\nSarah Johnson",
        time: "09:23 AM"
    },
    {
        title: "Class schedule updated",
        desc: "Added 3 new yoga sessions\nMike Peters (Admin)",
        time: "08:45 AM"
    },
    {
        title: "Trainer assigned",
        desc: "John Doe assigned to 2 new clients\nAdmin",
        time: "04:20 PM"
    },
    {
        title: "Payment processed",
        desc: "Monthly membership fee - $89.99\nSystem",
        time: "02:15 PM"
    },
    {
        title: "Member check-in",
        desc: "Emily Chen checked in\nFront Desk",
        time: "11:30 AM"
    }

]

export function RecentActivity() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6 relative before:absolute before:inset-0 before:ml-2 before:w-0.5 before:-translate-x-1/2 before:bg-gray-200 dark:before:bg-gray-800 before:h-full">
                    {ACTIVITIES.map((activity, index) => (
                        <div key={index} className="relative flex gap-4 pl-6">
                            <span className="absolute left-0 top-1.5 ml-2 -translate-x-1/2 w-2 h-2 rounded-full border border-white dark:border-zinc-900 bg-gray-400 dark:bg-gray-600 box-content"></span>
                            <div className="flex-1 space-y-1">
                                <p className="text-sm font-medium text-gray-900 dark:text-white">{activity.title}</p>
                                <p className="text-xs text-gray-500 whitespace-pre-line">{activity.desc}</p>
                            </div>
                            <div className="text-xs text-gray-400 tabular-nums">
                                {activity.time}
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
