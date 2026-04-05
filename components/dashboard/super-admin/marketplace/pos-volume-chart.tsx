"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const data = [
    { name: "PowerHouse", volume: 12500 },
    { name: "Peak Condition", volume: 9800 },
    { name: "Apex Performance", volume: 8400 },
    { name: "FitZone", volume: 6800 },
    { name: "Momentum Hub", volume: 5900 },
    { name: "Core Fitness", volume: 3500 },
    { name: "Elite Training", volume: 2200 },
    { name: "Iron Works", volume: 1600 },
];

export function PosVolumeChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">POS Volume by Gym</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                dy={10}
                            />
                            <YAxis
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                tickFormatter={(value) => `$${value / 1000}k`}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    color: '#374151'
                                }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, "Volume"]}
                                cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                            />
                            <Bar
                                dataKey="volume"
                                fill="#8b5cf6"
                                radius={[4, 4, 0, 0]}
                                maxBarSize={60}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
