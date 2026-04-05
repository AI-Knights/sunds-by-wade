"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ComposedChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from "recharts";

const data = [
    { name: "PowerHouse", revenue: 92, members: 850 },
    { name: "Apex Performance", revenue: 82, members: 630 },
    { name: "FitZone", revenue: 79, members: 480 },
    { name: "Momentum Hub", revenue: 84, members: 450 },
    { name: "Core Fitness", revenue: 81, members: 230 },
    { name: "Elite Training", revenue: 80, members: 160 },
    { name: "Iron Works", revenue: 80, members: 90 },
];

export function RevenueByGymSize() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Revenue per Member by Gym Size</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <ComposedChart data={data}>
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                            <XAxis
                                dataKey="name"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                dy={10}
                            />
                            <YAxis
                                yAxisId="left"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                domain={[0, 100]}
                                tickFormatter={(value) => `$${value}`}
                            />
                            <YAxis
                                yAxisId="right"
                                orientation="right"
                                axisLine={false}
                                tickLine={false}
                                tick={{ fill: '#6b7280', fontSize: 10 }}
                                domain={[0, 1000]}
                            />
                            <Tooltip
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    color: '#374151'
                                }}
                                cursor={{ fill: 'rgba(128,128,128,0.1)' }}
                            />
                            <Legend
                                verticalAlign="bottom"
                                height={36}
                                iconType="plainline"
                                formatter={(value, entry: any) => <span style={{ color: entry.color, fontSize: '12px', fontWeight: 500, marginLeft: '5px' }}>{value}</span>}
                            />
                            <Line
                                yAxisId="left"
                                type="monotone"
                                dataKey="revenue"
                                name="Revenue per Member ($)"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ r: 4, fill: "#10b981", strokeWidth: 2, stroke: "#fff" }}
                            />
                            <Line
                                yAxisId="right"
                                type="monotone"
                                dataKey="members"
                                name="Total Members"
                                stroke="#3b82f6"
                                strokeWidth={2}
                                dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                            />
                        </ComposedChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
