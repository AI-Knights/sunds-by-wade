"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const topGyms = [
    { rank: 1, name: "PowerHouse Athletics", revenue: "$72,340", growth: "+15.2%", value: 100 },
    { rank: 2, name: "Peak Condition Athletic Club", revenue: "$64,920", growth: "+12.8%", value: 90 },
    { rank: 3, name: "Apex Performance Gym", revenue: "$51,280", growth: "+18.4%", value: 70 },
    { rank: 4, name: "FitZone Downtown", revenue: "$38,450", growth: "+9.7%", value: 55 },
    { rank: 5, name: "Momentum Training Hub", revenue: "$36,780", growth: "+11.3%", value: 50 },
];

export function TopGymsList() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white mb-8">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Top Revenue Generating Gyms</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {topGyms.map((gym) => (
                        <div key={gym.name} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-8 h-8 flex items-center justify-center bg-gray-100 dark:bg-white/5 rounded-md text-sm font-medium text-gray-500">
                                #{gym.rank}
                            </div>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{gym.name}</p>
                            </div>
                            <div className="flex-1 hidden sm:block">
                                <Progress value={gym.value} className="h-2" indicatorClassName="bg-emerald-500" />
                            </div>
                            <div className="text-right">
                                <p className="text-sm font-bold text-gray-900 dark:text-white">{gym.revenue}</p>
                                <p className="text-xs text-emerald-500 font-medium">{gym.growth}</p>
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
