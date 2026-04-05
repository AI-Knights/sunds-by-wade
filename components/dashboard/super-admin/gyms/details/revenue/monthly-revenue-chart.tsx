"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Bar, BarChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { month: "Jul", revenue: 32000 },
    { month: "Aug", revenue: 34000 },
    { month: "Sep", revenue: 35500 },
    { month: "Oct", revenue: 36000 },
    { month: "Nov", revenue: 37000 },
    { month: "Dec", revenue: 37800 },
    { month: "Jan", revenue: 38450 },
];

export function MonthlyRevenueChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Monthly Revenue Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                            <XAxis
                                dataKey="month"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                stroke="#888888"
                                dy={10}
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                stroke="#888888"
                                tickFormatter={(value) => `$${value / 1000}k`}
                                dx={-10}
                            />
                            <Tooltip
                                cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                                contentStyle={{ backgroundColor: 'rgb(24 24 27)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                            />
                            <Bar
                                dataKey="revenue"
                                fill="#7c3aed" // Purple color matching screenshot
                                radius={[4, 4, 0, 0]}
                                barSize={40}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
