"use client";

import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer, Legend } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock Data matching the screenshot roughly
const DATA = [
    { name: 'Week 1', purchased: 180, used: 145 },
    { name: 'Week 2', purchased: 160, used: 170 },
    { name: 'Week 3', purchased: 195, used: 150 },
    { name: 'Week 4', purchased: 205, used: 175 },
];

function CreditStatCard({ title, value, subtext, subtextColor = "text-gray-400" }: any) {
    return (
        <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
            <CardContent className="p-6">
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</h3>
                <p className={`text-xs ${subtextColor}`}>{subtext}</p>
            </CardContent>
        </Card>
    );
}

export function CreditsTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <CreditStatCard
                    title="Credits Purchased"
                    value="730"
                    subtext="This month"
                    subtextColor="text-green-600 font-medium"
                />
                <CreditStatCard
                    title="Credits Used"
                    value="640"
                    subtext="87.7% utilization"
                    subtextColor="text-gray-500"
                />
                <CreditStatCard
                    title="Credit Revenue"
                    value="$7,300"
                    subtext="$10 per credit"
                    subtextColor="text-gray-500"
                />
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Credit Usage vs. Purchase</h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }} barGap={0}>
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Legend />
                                <Bar dataKey="purchased" name="Purchased" fill="#a855f7" radius={[4, 4, 0, 0]} barSize={50} />
                                <Bar dataKey="used" name="Used" fill="#10b981" radius={[4, 4, 0, 0]} barSize={50} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
