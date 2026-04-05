"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { motion } from "framer-motion";

const data = [
    { name: "Memberships", value: 65, color: "#3b82f6" },     // Blue
    { name: "Session Credits", value: 23, color: "#8b5cf6" }, // Purple
    { name: "POS Sales", value: 9, color: "#10b981" },        // Emerald
];

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name, value, color }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = outerRadius + 25; // Push label further out
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
        <text
            x={x}
            y={y}
            fill={color}
            textAnchor={x > cx ? 'start' : 'end'}
            dominantBaseline="central"
            className="text-[10px] sm:text-xs font-medium"
        >
            {`${name}: ${value}%`}
        </text>
    );
};

export function RevenueBySource() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Revenue by Source</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="h-[300px] w-full relative">
                    <ResponsiveContainer width="100%" height="100%">
                        <PieChart>
                            <Pie
                                data={data}
                                cx="50%"
                                cy="50%"
                                labelLine={false}
                                label={renderCustomizedLabel}
                                outerRadius={80}
                                innerRadius={0}
                                fill="#8884d8"
                                dataKey="value"
                                stroke="none"
                            >
                                {data.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={entry.color} />
                                ))}
                            </Pie>
                            <Tooltip
                                formatter={(value: number) => `${value}%`}
                                contentStyle={{
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    border: 'none',
                                    borderRadius: '8px',
                                    boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)',
                                    color: '#374151'
                                }}
                                itemStyle={{ color: '#374151' }}
                            />
                        </PieChart>
                    </ResponsiveContainer>
                </div>
            </CardContent>
        </Card>
    );
}
