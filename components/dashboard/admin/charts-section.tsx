"use client";

import { motion } from "framer-motion";
import {
    AreaChart,
    Area,
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    PieChart,
    Pie,
    Cell,
    Legend
} from "recharts";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

// Mock Data
const GROWTH_DATA = [
    { name: 'Jan', members: 140 },
    { name: 'Feb', members: 168 },
    { name: 'Mar', members: 192 },
    { name: 'Apr', members: 215 },
    { name: 'May', members: 245 },
    { name: 'Jun', members: 267 },
];

const ATTENDANCE_DATA = [
    { day: 'Mon', count: 85 },
    { day: 'Tue', count: 72 },
    { day: 'Wed', count: 95 },
    { day: 'Thu', count: 88 },
    { day: 'Fri', count: 98 },
    { day: 'Sat', count: 110 },
    { day: 'Sun', count: 65 },
];

const REVENUE_DATA = [
    { name: 'Memberships', value: 45000, color: '#3b82f6' }, // Blue
    { name: 'Personal Training', value: 28000, color: '#8b5cf6' }, // Purple
    { name: 'Merchandise', value: 8000, color: '#10b981' }, // Emerald
];

const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
        return (
            <div className="bg-white dark:bg-zinc-900 border border-gray-200 dark:border-zinc-800 p-3 rounded-lg shadow-xl">
                <p className="font-semibold text-gray-900 dark:text-white mb-1">{label}</p>
                <p className="text-sm text-primary">
                    {payload[0].value}
                </p>
            </div>
        );
    }
    return null;
};

export function ChartSection() {
    return (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-6">
            {/* Membership Growth Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.2 }}
            >
                <Card className="border-none shadow-lg dark:shadow-none bg-white dark:bg-card/50 backdrop-blur-sm h-[400px]">
                    <CardHeader>
                        <CardTitle>Membership Growth</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={GROWTH_DATA}>
                                <defs>
                                    <linearGradient id="colorMembers" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.3} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                                <XAxis
                                    dataKey="name"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280' }}
                                />
                                <Tooltip content={<CustomTooltip />} />
                                <Area
                                    type="monotone"
                                    dataKey="members"
                                    stroke="#3b82f6"
                                    strokeWidth={3}
                                    fillOpacity={1}
                                    fill="url(#colorMembers)"
                                />
                            </AreaChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Class Attendance Bar Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.3 }}
            >
                <Card className="border-none shadow-lg dark:shadow-none bg-white dark:bg-card/50 backdrop-blur-sm h-[400px]">
                    <CardHeader>
                        <CardTitle>Class Attendance (This Week)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px]">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={ATTENDANCE_DATA}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" className="dark:stroke-zinc-800" />
                                <XAxis
                                    dataKey="day"
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280' }}
                                    dy={10}
                                />
                                <YAxis
                                    axisLine={false}
                                    tickLine={false}
                                    tick={{ fill: '#6b7280' }}
                                />
                                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                                <Bar
                                    dataKey="count"
                                    fill="#10b981"
                                    radius={[8, 8, 0, 0]}
                                    barSize={40}
                                />
                            </BarChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>

            {/* Revenue Breakdown Donut Chart */}
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: 0.4 }}
                className="lg:col-span-2" // Taking full width on bottom row or keep parallel
            >
                <Card className="border-none shadow-lg dark:shadow-none bg-white dark:bg-card/50 backdrop-blur-sm h-[400px]">
                    <CardHeader>
                        <CardTitle>Revenue Breakdown</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[320px] flex items-center justify-center">
                        <ResponsiveContainer width="100%" height="100%">
                            <PieChart>
                                <Pie
                                    data={REVENUE_DATA}
                                    cx="50%"
                                    cy="50%"
                                    innerRadius={80}
                                    outerRadius={110}
                                    paddingAngle={5}
                                    dataKey="value"
                                >
                                    {REVENUE_DATA.map((entry, index) => (
                                        <Cell key={`cell-${index}`} fill={entry.color} />
                                    ))}
                                </Pie>
                                <Tooltip />
                                <Legend
                                    verticalAlign="middle"
                                    align="right"
                                    layout="vertical"
                                    iconType="circle"
                                />
                            </PieChart>
                        </ResponsiveContainer>
                    </CardContent>
                </Card>
            </motion.div>
        </div>
    );
}
