"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, Activity, DollarSign, Calendar } from "lucide-react";

interface StatBaseProps {
    label: string;
    value: string;
    subtext: string;
    subtextClass?: string;
    icon: React.ElementType;
    color: string;
    bg: string;
}

function StatCard({ label, value, subtext, subtextClass, icon: Icon, color, bg }: StatBaseProps) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardContent className="p-6">
                <div className="flex items-center justify-between mb-4">
                    <div className={`p-2 rounded-lg ${bg}`}>
                        <Icon className={`w-5 h-5 ${color}`} />
                    </div>
                    {/* Trend Icon could go here if needed, keeping simple for now based on screenshot */}
                    <span className="text-emerald-500">
                        <Activity className="w-4 h-4" />
                    </span>
                </div>
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
                    <p className="text-2xl font-bold mt-1 dark:text-white text-gray-900">{value}</p>
                    <p className={`text-xs mt-1 ${subtextClass}`}>{subtext}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function GymOverviewStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                label="Total Members"
                value="487"
                subtext="+23 this month"
                subtextClass="text-emerald-500"
                icon={Users}
                color="text-purple-500"
                bg="bg-purple-500/10"
            />
            <StatCard
                label="Active Trainers"
                value="18"
                subtext="27 members per trainer"
                subtextClass="text-gray-500"
                icon={Activity}
                color="text-blue-500"
                bg="bg-blue-500/10"
            />
            <StatCard
                label="Monthly Revenue"
                value="$38,450"
                subtext="+12.5% vs last month"
                subtextClass="text-emerald-500"
                icon={DollarSign}
                color="text-emerald-500"
                bg="bg-emerald-500/10"
            />
            <StatCard
                label="Member Since"
                value="Mar 2024"
                subtext="669 days"
                subtextClass="text-gray-500"
                icon={Calendar}
                color="text-orange-500"
                bg="bg-orange-500/10"
            />
        </div>
    );
}
