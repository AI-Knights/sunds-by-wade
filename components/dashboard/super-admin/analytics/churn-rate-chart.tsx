"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from "recharts";

const churnData = [
    { name: "PowerHouse", churn: 1.2 },
    { name: "Peak Condition", churn: 1.8 },
    { name: "FitZone", churn: 2.1 },
    { name: "Momentum Hub", churn: 2.5 },
    { name: "Apex Performance", churn: 3.2 },
    { name: "Core Fitness", churn: 4.1 },
    { name: "Elite Training", churn: 5.8 },
    { name: "Iron Works", churn: 6.5 },
];

export function ChurnRateChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Churn Rate by Gym</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart layout="vertical" data={churnData} margin={{ top: 5, right: 30, left: 40, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="rgba(128,128,128,0.1)" />
                            <XAxis type="number" hide />
                            <YAxis
                                dataKey="name"
                                type="category"
                                width={100}
                                tickLine={false}
                                axisLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    color: '#374151',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)'
                                }}
                                formatter={(value: number) => [`${value}%`, "Churn Rate"]}
                                cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                            />
                            <Bar
                                dataKey="churn"
                                fill="#a855f7"
                                radius={[0, 4, 4, 0]}
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
