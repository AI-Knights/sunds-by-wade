"use client";

import { Activity, Building2, Calendar, DollarSign, Store, TrendingUp, Users } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatCardProps {
    label: string;
    value: string;
    trend: string;
    icon: any;
    color: string;
    bg: string;
}

function StatCard({ label, value, trend, icon: Icon, color, bg }: StatCardProps) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className={cn("p-3 rounded-xl", bg, color)}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <div className="flex items-center text-emerald-500 text-sm font-medium">
                        <TrendingUp className="w-4 h-4 mr-1" />
                        {trend}
                    </div>
                </div>
                <div>
                    <p className="text-sm font-medium text-muted-foreground mb-1">{label}</p>
                    <h3 className="text-2xl font-bold dark:text-white text-gray-900">{value}</h3>
                </div>
            </CardContent>
        </Card>
    );
}

export function OverviewStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <StatCard
                label="Total Gyms"
                value="247"
                trend="+12"
                icon={Store}
                color="text-blue-500"
                bg="bg-blue-500/10"
            />
            <StatCard
                label="Active Gyms"
                value="238"
                trend="+8"
                icon={Activity}
                color="text-emerald-500"
                bg="bg-emerald-500/10"
            />
            <StatCard
                label="Total Users"
                value="48,392"
                trend="+2,341"
                icon={Users}
                color="text-purple-500"
                bg="bg-purple-500/10"
            />
            <StatCard
                label="Monthly Revenue"
                value="$284,920"
                trend="+$18,450"
                icon={DollarSign}
                color="text-green-500"
                bg="bg-green-500/10"
            />
        </div>
    );
}
