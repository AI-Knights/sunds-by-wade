"use client";

import { motion } from "framer-motion";
import { Line, LineChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock Data
const DATA = [
    { name: 'Jan', active: 240, new: 40, churned: 10 },
    { name: 'Feb', active: 255, new: 30, churned: 8 },
    { name: 'Mar', active: 270, new: 45, churned: 12 },
    { name: 'Apr', active: 285, new: 35, churned: 5 },
    { name: 'May', active: 300, new: 50, churned: 7 },
    { name: 'Jun', active: 320, new: 60, churned: 9 },
];

function MemberStatCard({ title, value, growth, subtext }: any) {
    return (
        <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
                <div className="flex items-center gap-2 text-xs">
                    <span className="text-green-600 font-medium">{growth}</span>
                    <span className="text-gray-400">{subtext}</span>
                </div>
            </CardContent>
        </Card>
    );
}

export function MembersTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                <MemberStatCard title="Total Members" value="275" growth="+2.2%" subtext="from last month" />
                <MemberStatCard title="Retention Rate" value="97.8%" growth="Above industry avg" subtext="" />
                <MemberStatCard title="Avg Lifetime Value" value="$1,847" growth="Per member" subtext="" />
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Member Retention</h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <LineChart data={DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Legend />
                                <Line type="monotone" dataKey="active" name="Active Members" stroke="#3b82f6" strokeWidth={2} dot={{ r: 4 }} activeDot={{ r: 6 }} />
                                <Line type="monotone" dataKey="new" name="New Members" stroke="#10b981" strokeWidth={2} dot={{ r: 4 }} />
                                <Line type="monotone" dataKey="churned" name="Churned" stroke="#ef4444" strokeWidth={2} dot={{ r: 4 }} />
                            </LineChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
