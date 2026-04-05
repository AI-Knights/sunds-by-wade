"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Users, AlertTriangle, Building, Ban, PauseCircle } from "lucide-react";

interface StatBaseProps {
    label: string;
    value: string;
    icon: React.ElementType;
    color: string;
}

function StatCard({ label, value, icon: Icon, color }: StatBaseProps) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardContent className="p-6 flex items-center justify-between">
                <div>
                    <h3 className="text-sm font-medium text-muted-foreground">{label}</h3>
                    <p className={`text-2xl font-bold mt-2 ${color}`}>{value}</p>
                </div>
                <div className={`p-3 rounded-full ${color.replace('text-', 'bg-')}/10`}>
                    <Icon className={`w-5 h-5 ${color}`} />
                </div>
            </CardContent>
        </Card>
    );
}

export function GymStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                label="Total Gyms"
                value="247"
                icon={Building}
                color="text-gray-900 dark:text-white"
            />
            <StatCard
                label="Active"
                value="238"
                icon={Users} // Using Users temporarily, ideally a CheckCircle or similar
                color="text-green-500"
            />
            <StatCard
                label="Paused"
                value="6"
                icon={PauseCircle}
                color="text-orange-500"
            />
            <StatCard
                label="Suspended"
                value="3"
                icon={Ban}
                color="text-red-500"
            />
        </div>
    );
}
