"use client";

import { motion } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, Users } from "lucide-react";

const CLASSES = [
    {
        id: 1,
        name: "Morning Yoga Flow",
        instructor: "Sarah Johnson",
        time: "07:00 AM - 08:00 AM",
        enrolled: 12,
        capacity: 15,
        status: "Starting Soon",
        color: "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
    },
    {
        id: 2,
        name: "HIIT Blast",
        instructor: "Mike Chen",
        time: "09:00 AM - 10:00 AM",
        enrolled: 25,
        capacity: 25,
        status: "Full",
        color: "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    },
    {
        id: 3,
        name: "Power Lifting",
        instructor: "David Rodriguez",
        time: "02:00 PM - 03:30 PM",
        enrolled: 8,
        capacity: 12,
        status: "Open",
        color: "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
    },
    {
        id: 4,
        name: "Evening Spin",
        instructor: "Emma Davis",
        time: "06:00 PM - 07:00 PM",
        enrolled: 18,
        capacity: 20,
        status: "Open",
        color: "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
    }
];

export function TodaysClasses() {
    return (
        <Card className="col-span-1 lg:col-span-2 border-none shadow-lg dark:shadow-none bg-white dark:bg-card/50 backdrop-blur-sm">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    <span>Today's Classes</span>
                    <Badge variant="outline" className="font-normal">
                        {new Date().toLocaleDateString('en-US', { weekday: 'long', month: 'short', day: 'numeric' })}
                    </Badge>
                </CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {CLASSES.map((session, i) => (
                        <motion.div
                            key={session.id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.2 + (i * 0.1) }}
                            className="group flex flex-col sm:flex-row items-start sm:items-center justify-between p-4 rounded-xl border border-gray-100 dark:border-gray-800 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                        >
                            <div className="flex gap-4">
                                <div className={`p-3 rounded-xl ${session.color} bg-opacity-20`}>
                                    <Calendar className="w-5 h-5" />
                                </div>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white group-hover:text-primary transition-colors">
                                        {session.name}
                                    </h4>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground mt-1">
                                        <Users className="w-3 h-3" />
                                        <span>{session.instructor}</span>
                                        <span>•</span>
                                        <Clock className="w-3 h-3" />
                                        <span>{session.time}</span>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-4 sm:mt-0 flex items-center gap-4 w-full sm:w-auto justify-between sm:justify-end">
                                <div className="text-right">
                                    <div className="text-sm font-medium text-gray-900 dark:text-white">
                                        {session.enrolled} / {session.capacity}
                                    </div>
                                    <div className="text-xs text-muted-foreground">Enrolled</div>
                                </div>
                                <Badge className={
                                    session.status === "Full"
                                        ? "bg-red-500 hover:bg-red-600"
                                        : "bg-emerald-500 hover:bg-emerald-600"
                                }>
                                    {session.status}
                                </Badge>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
