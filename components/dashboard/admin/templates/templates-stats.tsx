"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Dumbbell, Users, Briefcase, Layout } from "lucide-react";
import { TEMPLATES } from "@/constants/data";

export function TemplatesStats() {
    const totalTemplates = TEMPLATES.length;
    const gymTemplates = TEMPLATES.filter(t => t.type === "Gym").length;
    const trainerTemplates = TEMPLATES.filter(t => t.type === "Trainer").length;
    const totalAssignments = TEMPLATES.reduce((acc, curr) => acc + (curr.assignedCount || 0), 0);

    const stats = [
        {
            label: "Total Templates",
            value: totalTemplates,
            icon: Layout,
            bg: "bg-blue-500/10",
            color: "text-blue-500"
        },
        {
            label: "Gym Templates",
            value: gymTemplates,
            icon: Dumbbell,
            bg: "bg-purple-500/10",
            color: "text-purple-500"
        },
        {
            label: "Trainer Templates",
            value: trainerTemplates,
            icon: Briefcase,
            bg: "bg-emerald-500/10",
            color: "text-emerald-500"
        },
        {
            label: "Total Assignments",
            value: totalAssignments,
            icon: Users,
            bg: "bg-orange-500/10",
            color: "text-orange-500"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-xs bg-white dark:bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6">
                        <p className="text-sm font-medium text-muted-foreground mb-2">{stat.label}</p>
                        <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
