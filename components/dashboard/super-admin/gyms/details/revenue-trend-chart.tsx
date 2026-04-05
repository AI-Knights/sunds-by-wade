"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Area, AreaChart, ResponsiveContainer, Tooltip, XAxis, YAxis, CartesianGrid } from "recharts";

const data = [
    { month: "Jul", revenue: 32000 },
    { month: "Aug", revenue: 33500 },
    { month: "Sep", revenue: 35000 },
    { month: "Oct", revenue: 36200 },
    { month: "Nov", revenue: 38000 },
    { month: "Dec", revenue: 39500 },
    { month: "Jan", revenue: 38450 },
];

export function RevenueTrendChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white mb-8">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Revenue Trend (Last 7 Months)</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenueGraph" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                            </defs>
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
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgb(24 24 27)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                formatter={(value: number) => [`$${value.toLocaleString()}`, "Revenue"]}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                strokeWidth={2}
                                fillOpacity={1}
                                fill="url(#colorRevenueGraph)"
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
