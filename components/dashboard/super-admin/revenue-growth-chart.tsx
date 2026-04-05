"use client";

import { Area, AreaChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { month: "Jul", revenue: 200, users: 190 },
    { month: "Aug", revenue: 220, users: 210 },
    { month: "Sep", revenue: 240, users: 220 },
    { month: "Oct", revenue: 260, users: 230 },
    { month: "Nov", revenue: 280, users: 240 },
    { month: "Dec", revenue: 290, users: 245 },
    { month: "Jan", revenue: 295, users: 248 },
];

export function RevenueGrowthChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Revenue & User Growth</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <AreaChart data={data}>
                            <defs>
                                <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#10b981" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                </linearGradient>
                                <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                                    <stop offset="5%" stopColor="#8b5cf6" stopOpacity={0.1} />
                                    <stop offset="95%" stopColor="#8b5cf6" stopOpacity={0} />
                                </linearGradient>
                            </defs>
                            <XAxis
                                dataKey="month"
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                stroke="#888888"
                            />
                            <YAxis
                                fontSize={12}
                                tickLine={false}
                                axisLine={false}
                                stroke="#888888"
                                tickFormatter={(value) => `$${value}k`}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgb(24 24 27)', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Area
                                type="monotone"
                                dataKey="revenue"
                                stroke="#10b981"
                                fillOpacity={1}
                                fill="url(#colorRevenue)"
                                strokeWidth={2}
                            />
                            <Area
                                type="monotone"
                                dataKey="users"
                                stroke="#8b5cf6"
                                fillOpacity={1}
                                fill="url(#colorUsers)"
                                strokeWidth={2}
                            />
                        </AreaChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center space-x-6 mt-2">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                        <span className="text-xs text-muted-foreground">Revenue</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-purple-500 mr-2" />
                        <span className="text-xs text-muted-foreground">Users</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
