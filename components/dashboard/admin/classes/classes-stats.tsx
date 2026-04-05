"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Calendar, Users, Activity, Video } from "lucide-react";
import { CLASSES } from "@/constants/data";

export function ClassesStats() {
    // Determine "Today" (mocking as Wednesday Jan 14 for demo data alignment, or use real date)
    // For this demo, let's calculate based on the full dataset to show some numbers
    const totalClasses = CLASSES.length;
    const totalEnrolled = CLASSES.reduce((acc, curr) => acc + curr.enrolled, 0);
    const totalCapacity = CLASSES.reduce((acc, curr) => acc + curr.capacity, 0);
    const avgFillRate = totalCapacity > 0 ? Math.round((totalEnrolled / totalCapacity) * 100) : 0;
    const virtualClasses = CLASSES.filter(c => c.isVirtual).length;

    // Mock "Today's" classes count based on the most frequent date in mock data (Wed Jan 14)
    const todaysClasses = CLASSES.filter(c => c.date === "2026-01-14").length;

    const stats = [
        {
            label: "Today's Classes",
            value: todaysClasses, // Dynamic based on mock date
            icon: Calendar,
            bg: "bg-blue-500/10",
            color: "text-blue-500"
        },
        {
            label: "Total Enrolled",
            value: totalEnrolled,
            icon: Users,
            bg: "bg-emerald-500/10",
            color: "text-emerald-500"
        },
        {
            label: "Avg Fill Rate",
            value: `${avgFillRate}%`,
            icon: Activity,
            bg: "bg-purple-500/10",
            color: "text-purple-500"
        },
        {
            label: "Virtual Classes",
            value: virtualClasses,
            icon: Video,
            bg: "bg-orange-500/10",
            color: "text-orange-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-xs bg-white dark:bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <div className="flex justify-between items-start mb-2">
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                        </div>
                        <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">{stat.value}</h3>
                        {/* <div className={`inline-flex p-2 rounded-lg ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-4 h-4" />
                        </div> */}
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
