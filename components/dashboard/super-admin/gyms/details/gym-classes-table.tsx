"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Clock } from "lucide-react";

// Mock Data
const CLASSES = [
    {
        id: "c-1",
        name: "Morning HIIT",
        instructor: "Mike Peters",
        schedule: "Mon, Wed, Fri - 7:00 AM",
        capacity: 20,
        avgAttendance: 18,
        totalSessions: 24,
        utilization: 90
    },
    {
        id: "c-2",
        name: "Yoga Flow",
        instructor: "Lisa Anderson",
        schedule: "Tue, Thu - 6:00 PM",
        capacity: 20,
        avgAttendance: 16,
        totalSessions: 18,
        utilization: 80
    },
    {
        id: "c-3",
        name: "CrossFit WOD",
        instructor: "James Wilson",
        schedule: "Mon-Fri - 5:30 PM",
        capacity: 15,
        avgAttendance: 14,
        totalSessions: 42,
        utilization: 93
    },
    {
        id: "c-4",
        name: "Spin Class",
        instructor: "Sarah Martinez",
        schedule: "Mon, Wed - 6:00 AM",
        capacity: 18,
        avgAttendance: 15,
        totalSessions: 16,
        utilization: 83
    },
    {
        id: "c-5",
        name: "Strength Training",
        instructor: "Mike Peters",
        schedule: "Tue, Thu - 7:00 PM",
        capacity: 15,
        avgAttendance: 12,
        totalSessions: 20,
        utilization: 80
    },
    {
        id: "c-6",
        name: "Pilates",
        instructor: "Lisa Anderson",
        schedule: "Sat - 9:00 AM",
        capacity: 12,
        avgAttendance: 10,
        totalSessions: 8,
        utilization: 83
    }
];

export function GymClassesTable() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Class Summary (Read-Only)</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Overview of all classes - no scheduling allowed</p>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-200 dark:border-white/10 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-white/5">
                            <TableRow>
                                <TableHead className="w-[200px]">CLASS NAME</TableHead>
                                <TableHead>INSTRUCTOR</TableHead>
                                <TableHead>SCHEDULE</TableHead>
                                <TableHead>CAPACITY</TableHead>
                                <TableHead>AVG ATTENDANCE</TableHead>
                                <TableHead>TOTAL SESSIONS</TableHead>
                                <TableHead className="w-[200px] text-right">UTILIZATION</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {CLASSES.map((cls, index) => (
                                    <motion.tr
                                        key={cls.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b hover:bg-muted/50 transition-colors"
                                    >
                                        <TableCell className="font-medium">{cls.name}</TableCell>
                                        <TableCell className="text-gray-600 dark:text-gray-400">{cls.instructor}</TableCell>
                                        <TableCell>
                                            <div className="flex items-center text-xs text-gray-500">
                                                <Clock className="w-3 h-3 mr-1" />
                                                {cls.schedule}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm font-medium">{cls.capacity}</TableCell>
                                        <TableCell className="text-sm font-medium">{cls.avgAttendance}</TableCell>
                                        <TableCell className="text-sm font-medium">{cls.totalSessions}</TableCell>
                                        <TableCell className="text-right">
                                            <div className="flex items-center justify-end gap-3">
                                                <Progress value={cls.utilization} className={`h-2 w-24 ${cls.utilization > 90 ? "bg-emerald-100 dark:bg-emerald-900" : "bg-blue-100 dark:bg-blue-900"
                                                    }`} indicatorClassName={
                                                        cls.utilization > 90 ? "bg-emerald-500" : "bg-blue-500"
                                                    } />
                                                <span className="text-xs font-medium w-8 text-right">{cls.utilization}%</span>
                                            </div>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4 px-6">
                <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                    &lt;
                </Button>
                <Button variant="default" size="icon" className="h-8 w-8 bg-purple-600 hover:bg-purple-700 text-white">
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
        </Card>
    );
}
