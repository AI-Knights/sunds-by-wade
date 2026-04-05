"use client";

import { Line, LineChart, ResponsiveContainer, XAxis, YAxis, Tooltip, CartesianGrid } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { month: "Jul", retention: 85, churn: 5 },
    { month: "Aug", retention: 86, churn: 4.8 },
    { month: "Sep", retention: 86.5, churn: 4.5 },
    { month: "Oct", retention: 87, churn: 4.2 },
    { month: "Nov", retention: 87.2, churn: 4.0 },
    { month: "Dec", retention: 87.5, churn: 3.9 },
    { month: "Jan", retention: 87.4, churn: 3.8 },
];

export function RetentionChurnChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Retention vs Churn Trend</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[250px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <LineChart data={data}>
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
                                tickFormatter={(value) => `${value}%`}
                            />
                            <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(255,255,255,0.1)" />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgb(24 24 27)', border: 'none', borderRadius: '8px', color: '#fff' }}
                            />
                            <Line
                                type="monotone"
                                dataKey="retention"
                                stroke="#10b981"
                                strokeWidth={2}
                                dot={{ fill: '#10b981', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                            <Line
                                type="monotone"
                                dataKey="churn"
                                stroke="#ef4444"
                                strokeWidth={2}
                                dot={{ fill: '#ef4444', r: 4 }}
                                activeDot={{ r: 6 }}
                            />
                        </LineChart>
                    </ResponsiveContainer>
                </div>
                <div className="flex items-center justify-center space-x-6 mt-2">
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-emerald-500 mr-2" />
                        <span className="text-xs text-emerald-500">Retention Rate</span>
                    </div>
                    <div className="flex items-center">
                        <div className="w-2 h-2 rounded-full bg-red-500 mr-2" />
                        <span className="text-xs text-red-500">Churn Rate</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
