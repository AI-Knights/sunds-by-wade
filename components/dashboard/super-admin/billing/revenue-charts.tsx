"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip as PieTooltip, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip as LineTooltip, Legend } from "recharts";

// Mock Data for Pie Chart
const pieData = [
    { name: "Gym Subscriptions", value: 55, color: "#3b82f6" }, // Blue
    { name: "Pos Processing", value: 28, color: "#a855f7" },    // Purple
    { name: "Credit Top-ups", value: 10, color: "#10b981" },    // Emerald
];

// Mock Data for Line Chart
const lineData = [
    { month: "Jul", processing: 65, subscriptions: 130 },
    { month: "Aug", processing: 68, subscriptions: 135 },
    { month: "Sep", processing: 72, subscriptions: 142 },
    { month: "Oct", processing: 75, subscriptions: 148 },
    { month: "Nov", processing: 78, subscriptions: 152 },
    { month: "Dec", processing: 82, subscriptions: 155 },
    { month: "Jan", processing: 85, subscriptions: 158 },
];

export function RevenueCharts() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            {/* Pie Chart */}
            <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Revenue by Source</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full relative">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={pieData}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={0}
                                    outerRadius={80}
                                    paddingAngle={0}
                                    dataKey="value"
                                    label={({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value }) => {
                                        const RADIAN = Math.PI / 180;
                                        // Custom label positioning to match screenshot (outside with lines ideally, simplify here with just text)
                                        const radius = outerRadius + 20;
                                        const x = cx + radius * Math.cos(-midAngle * RADIAN);
                                        const y = cy + radius * Math.sin(-midAngle * RADIAN);
                                        return (
                                            <text
                                                x={x}
                                                y={y}
                                                fill={pieData[index].color}
                                                textAnchor={x > cx ? 'start' : 'end'}
                                                dominantBaseline="central"
                                                className="text-[10px] font-medium"
                                            >
                                                {`${name}: ${value}%`}
                                            </text>
                                        );
                                    }}
                                >
                                    {pieData.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} stroke="white" strokeWidth={2} />
                                    ))}
                                </Pie>
                                <PieTooltip
                                    formatter={(value: number) => `${value}%`}
                                    contentStyle={{
                                        backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                        color: '#374151'
                                    }}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="circle"
                                    formatter={(value, entry: any) => <span style={{ color: entry.color, fontSize: '12px', fontWeight: 500, marginLeft: '5px' }}>{value}</span>}
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            {/* Line Chart */}
            <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
                <CardHeader>
                    <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Revenue Trend</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="h-[300px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={lineData}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="rgba(128,128,128,0.1)" />
                                <XAxis
                                    dataKey="month"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280', fontSize: 12 }}
                                    tickFormatter={(value) => `$${value}k`}
                                    domain={[0, 160]}
                                    dx={-10}
                                />
                                <LineTooltip
                                    contentStyle={{
                                        backgroundColor: 'rgba(24, 24, 27, 0.9)',
                                        border: 'none',
                                        borderRadius: '8px',
                                        color: '#fff'
                                    }}
                                    formatter={(value: number) => [`$${value}k`, ""]}
                                />
                                <Legend
                                    verticalAlign="bottom"
                                    height={36}
                                    iconType="diamond"
                                    formatter={(value, entry: any) => <span style={{ color: entry.color, fontSize: '12px', fontWeight: 500, marginLeft: '5px' }}>{value}</span>}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="processing"
                                    name="Processing Fees"
                                    stroke="#a855f7"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#a855f7", strokeWidth: 2, stroke: "#fff" }}
                                    activeDot={{ r: 6 }}
                                />
                                <Line
                                    type="monotone"
                                    dataKey="subscriptions"
                                    name="Gym Subscriptions"
                                    stroke="#3b82f6"
                                    strokeWidth={2}
                                    dot={{ r: 4, fill: "#3b82f6", strokeWidth: 2, stroke: "#fff" }}
                                    activeDot={{ r: 6 }}
                                />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </div>
    );
}
