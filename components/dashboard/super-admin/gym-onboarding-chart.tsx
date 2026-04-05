"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip } from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const data = [
    { month: "Jul", value: 18 },
    { month: "Aug", value: 24 },
    { month: "Sep", value: 31 },
    { month: "Oct", value: 28 },
    { month: "Nov", value: 35 },
    { month: "Dec", value: 42 },
    { month: "Jan", value: 38 },
];

export function GymOnboardingChart() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Gym Onboarding Over Time</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[200px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={data}>
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
                                tickFormatter={(value) => `${value}`}
                            />
                            <Tooltip
                                contentStyle={{ backgroundColor: 'rgb(24 24 27)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                            />
                            <Bar
                                dataKey="value"
                                fill="#8b5cf6"
                                radius={[4, 4, 0, 0]}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
