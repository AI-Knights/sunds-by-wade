"use client";

import { motion } from "framer-motion";
import { Bar, BarChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

const DATA = [
    { name: 'Morning Yoga', fillRate: 93, attendees: 14, capacity: 15 },
    { name: 'HIIT Training', fillRate: 95, attendees: 19, capacity: 20 },
    { name: 'Spin Class', fillRate: 84, attendees: 21, capacity: 25 },
    { name: 'Evening Pilates', fillRate: 87, attendees: 13, capacity: 15 },
    { name: 'CrossFit', fillRate: 80, attendees: 16, capacity: 20 },
];

export function ClassesTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Class Fill Rates</h3>
                    <div className="h-[350px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <BarChart data={DATA} layout="vertical" margin={{ top: 0, right: 30, left: 40, bottom: 0 }}>
                                <XAxis type="number" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} domain={[0, 100]} />
                                <YAxis dataKey="name" type="category" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} width={100} />
                                <Tooltip
                                    cursor={{ fill: 'rgba(255,255,255,0.05)' }}
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                />
                                <Bar dataKey="fillRate" fill="#a855f7" radius={[0, 4, 4, 0]} barSize={32} />
                            </BarChart>
                        </ResponsiveContainer>
                    </div>
                </CardContent>
            </Card>

            <div className="space-y-4">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white px-1">Class Performance</h3>
                <div className="grid grid-cols-1 gap-4">
                    {DATA.map((item, index) => (
                        <div key={index} className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-100 dark:border-zinc-800 flex items-center justify-between">
                            <div>
                                <h4 className="font-semibold text-gray-900 dark:text-white">{item.name}</h4>
                                <p className="text-sm text-gray-500 dark:text-gray-400">Avg {item.attendees}/{item.capacity} attendees</p>
                            </div>
                            <div className="text-right">
                                <span className={`text-lg font-bold ${item.fillRate >= 90 ? 'text-green-600' : 'text-purple-600'}`}>
                                    {item.fillRate}%
                                </span>
                                <p className="text-xs text-gray-400">fill rate</p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </motion.div>
    );
}
