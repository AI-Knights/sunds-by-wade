"use client";

import { motion } from "framer-motion";
import { Area, AreaChart, CartesianGrid, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";
import { Card, CardContent } from "@/components/ui/card";

// Mock Data
const DATA = [
    { name: 'Jan', membership: 4000, topup: 2400, merch: 2400 },
    { name: 'Feb', membership: 3000, topup: 1398, merch: 2210 },
    { name: 'Mar', membership: 2000, topup: 9800, merch: 2290 },
    { name: 'Apr', membership: 2780, topup: 3908, merch: 2000 },
    { name: 'May', membership: 1890, topup: 4800, merch: 2181 },
    { name: 'Jun', membership: 2390, topup: 3800, merch: 2500 },
];

function RevenueStatCard({ title, value, growth, subtext }: any) {
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

export function RevenueTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <RevenueStatCard title="Total Revenue" value="$104,000" growth="+8.2%" subtext="from last month" />
                <RevenueStatCard title="Memberships" value="$48,500" growth="46.6%" subtext="of total" />
                <RevenueStatCard title="Topup" value="$30,000" growth="28.8%" subtext="of total" />
                <RevenueStatCard title="Merchandise" value="$16,500" growth="15.9%" subtext="of total" />
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardContent className="p-6">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-6">Revenue by Category</h3>
                    <div className="h-[400px] w-full">
                        <ResponsiveContainer width="100%" height="100%">
                            <AreaChart data={DATA} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                                <defs>
                                    <linearGradient id="colorMembership" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#3b82f6" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#3b82f6" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorTopup" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#a855f7" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#a855f7" stopOpacity={0} />
                                    </linearGradient>
                                    <linearGradient id="colorMerch" x1="0" y1="0" x2="0" y2="1">
                                        <stop offset="5%" stopColor="#10b981" stopOpacity={0.8} />
                                        <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                                    </linearGradient>
                                </defs>
                                <XAxis dataKey="name" stroke="#888888" fontSize={12} tickLine={false} axisLine={false} />
                                <YAxis stroke="#888888" fontSize={12} tickLine={false} axisLine={false} tickFormatter={(value) => `$${value}`} />
                                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#374151" opacity={0.1} />
                                <Tooltip
                                    contentStyle={{ backgroundColor: 'rgba(0,0,0,0.8)', border: 'none', borderRadius: '8px', color: '#fff' }}
                                    itemStyle={{ color: '#fff' }}
                                />
                                <Area type="monotone" dataKey="membership" stackId="1" stroke="#3b82f6" fill="url(#colorMembership)" />
                                <Area type="monotone" dataKey="topup" stackId="1" stroke="#a855f7" fill="url(#colorTopup)" />
                                <Area type="monotone" dataKey="merch" stackId="1" stroke="#10b981" fill="url(#colorMerch)" />
                            </AreaChart>
                        </ResponsiveContainer>
                    </div>
                    <div className="flex items-center justify-center gap-6 mt-4">
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-blue-500"></span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Memberships</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-purple-500"></span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Topup</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="w-3 h-3 rounded-full bg-green-500"></span>
                            <span className="text-sm text-gray-500 dark:text-gray-400">Merchandise</span>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
