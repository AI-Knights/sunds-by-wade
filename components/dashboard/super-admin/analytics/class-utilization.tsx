"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip, Legend } from "recharts";

const utilizationData = [
    { name: "HIIT", avgAttendance: 18, capacity: 20 },
    { name: "Yoga", avgAttendance: 16, capacity: 20 },
    { name: "Spin Class", avgAttendance: 14, capacity: 20 },
    { name: "Strength", avgAttendance: 12, capacity: 15 },
    { name: "CrossFit", avgAttendance: 10, capacity: 15 },
    { name: "Pilates", avgAttendance: 9, capacity: 12 },
];

export function ClassUtilization() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Class Utilization Trends</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={utilizationData} barGap={0} barCategoryGap="20%">
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
                                iconType="rect"
                                formatter={(value, entry: any) => <span style={{ color: entry.color, fontSize: '12px', fontWeight: 500, marginLeft: '5px' }}>{value}</span>}
                            />
                            <Bar
                                dataKey="avgAttendance"
                                name="Avg Attendance"
                                fill="#8b5cf6"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                            />
                            <Bar
                                dataKey="capacity"
                                name="Capacity"
                                fill="#3b82f6"
                                radius={[4, 4, 0, 0]}
                                barSize={20}
                            />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
