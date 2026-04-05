"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, UserCheck, Dumbbell, Briefcase } from "lucide-react";
import { USERS } from "@/constants/data";

export function UserStats() {
    // Calculate stats dynamically
    const totalUsers = USERS.length;
    const activeClients = USERS.filter(u => u.role === "Client" && u.status === "Active").length;
    const trainers = USERS.filter(u => u.role === "Trainer").length;
    const staff = USERS.filter(u => u.role !== "Client" && u.role !== "Trainer").length;

    const stats = [
        {
            label: "Total Users",
            value: totalUsers,
            icon: Users,
            color: "text-blue-500",
            bg: "bg-blue-500/10"
        },
        {
            label: "Active Clients",
            value: activeClients,
            icon: UserCheck,
            color: "text-emerald-500",
            bg: "bg-emerald-500/10"
        },
        {
            label: "Trainers",
            value: trainers,
            icon: Dumbbell,
            color: "text-purple-500",
            bg: "bg-purple-500/10"
        },
        {
            label: "Staff",
            value: staff,
            icon: Briefcase,
            color: "text-orange-500",
            bg: "bg-orange-500/10"
        }
    ];

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
                <Card key={index} className="border-none shadow-xs bg-white dark:bg-card/50 backdrop-blur-sm">
                    <CardContent className="p-6 flex items-center justify-between">
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold mt-2 text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                        <div className={`p-3 rounded-xl ${stat.bg} ${stat.color}`}>
                            <stat.icon className="w-5 h-5" />
                        </div>
                    </CardContent>
                </Card>
            ))}
        </div>
    );
}
