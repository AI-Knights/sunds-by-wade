"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { motion } from "framer-motion";

const NOTIFICATIONS = [
    {
        id: "1",
        title: "New Meditation Added",
        message: "Check out our latest Deep Sleep Journey meditation",
        segment: "All Users",
        date: "Dec 3",
        time: "10:00 AM",
        status: "Sent"
    },
    {
        id: "2",
        title: "Premium Offer",
        message: "Get 30% off on annual subscription this week only!",
        segment: "Trainers",
        date: "Dec 2",
        time: "2:00 PM",
        status: "Sent"
    },
    {
        id: "3",
        title: "Streak Reminder",
        message: "Don't break your streak! Complete today's meditation",
        segment: "Clients",
        date: "Dec 1",
        time: "8:00 PM",
        status: "Sent"
    },
    {
        id: "4",
        title: "Weekend Special",
        message: "New sleep stories added for peaceful weekend rest",
        segment: "Gym Admin",
        date: "Dec 7",
        time: "9:00 AM",
        status: "Scheduled"
    },
    {
        id: "5",
        title: "App Update",
        message: "New breathing exercises and improved interface",
        segment: "All Users",
        date: "Nov 28",
        time: "11:00 AM",
        status: "Failed"
    }
];

export function NotificationHistory() {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Sent":
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0"><span className="mr-1">✓</span> Sent</Badge>;
            case "Scheduled":
                return <Badge className="bg-[#8b5cf6] hover:bg-[#7c3aed] text-white border-0"><span className="mr-1">🕒</span> Scheduled</Badge>;
            case "Failed":
                return <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 border-0"><span className="mr-1">✕</span> Failed</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getSegmentBadge = (segment: string) => {
        let colorClass = "bg-gray-100 text-gray-600 dark:bg-white/10 dark:text-gray-300";
        if (segment === "All Users") colorClass = "bg-purple-100 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400";
        if (segment === "Trainers") colorClass = "bg-emerald-100 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400";
        if (segment === "Clients") colorClass = "bg-orange-100 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400";
        if (segment === "Gym Admin") colorClass = "bg-blue-100 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400";

        return (
            <Badge variant="secondary" className={`${colorClass} hover:${colorClass} border-0 font-normal`}>
                {segment}
            </Badge>
        );
    }

    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Notification History (Last 1 month)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-100 dark:border-white/5 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-fuchsia-50/30 dark:bg-white/5">
                            <TableRow>
                                <TableHead className="font-semibold text-xs text-gray-500 w-[200px]">Title</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500">Message</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500 w-[150px]">Segment</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500 w-[150px]">Date & Time</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500 w-[120px]">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {NOTIFICATIONS.map((notification, index) => (
                                <motion.tr
                                    key={notification.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <TableCell className="font-medium text-gray-600 dark:text-gray-400 text-sm">{notification.title}</TableCell>
                                    <TableCell className="text-gray-500 dark:text-gray-400 text-sm">{notification.message}</TableCell>
                                    <TableCell>{getSegmentBadge(notification.segment)}</TableCell>
                                    <TableCell className="text-gray-500 text-xs">
                                        <div className="font-medium text-gray-700 dark:text-gray-300">{notification.date}</div>
                                        <div className="text-gray-400">{notification.time}</div>
                                    </TableCell>
                                    <TableCell>{getStatusBadge(notification.status)}</TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                        &lt;
                    </Button>
                    <Button variant="default" size="icon" className="h-[34px] w-[34px] bg-[#d6bcfa] hover:bg-[#c084fc] text-[#553c9a] border-2 border-[#553c9a]">
                        1
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        2
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        3
                    </Button>
                    <span className="text-sm text-gray-500 mx-1">...</span>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        10
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        &gt;
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
