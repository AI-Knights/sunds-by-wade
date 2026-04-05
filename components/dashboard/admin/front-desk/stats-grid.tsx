"use client";

import { motion } from "framer-motion";
import { Users, DollarSign, Activity, AlertCircle } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    subValue?: string;
    icon: any;
    color: string;
    delay: number;
}

function StatCard({ title, value, subValue, icon: Icon, color, delay }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm relative overflow-hidden group"
        >
            <div className={`absolute right-0 top-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity ${color}`}>
                <Icon className="w-24 h-24" />
            </div>

            <div className="relative z-10">
                <div className="flex items-center gap-3 mb-2">
                    <div className={`p-2 rounded-lg ${color} bg-opacity-10 text-opacity-100`}>
                        <Icon className="w-5 h-5" />
                    </div>
                    <span className="text-sm font-medium text-gray-500 dark:text-gray-400">{title}</span>
                </div>

                <div className="flex items-baseline gap-2">
                    <h3 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">
                        {value}
                    </h3>
                    {subValue && (
                        <span className="text-sm font-medium text-gray-500 dark:text-gray-400">
                            {subValue}
                        </span>
                    )}
                </div>
            </div>
        </motion.div>
    );
}

export function StatsGrid() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Today's Check-Ins"
                value="87"
                icon={Users}
                color="text-blue-600 bg-blue-100 dark:bg-blue-500/20"
                delay={0}
            />
            <StatCard
                title="Today's Sales"
                value="$342"
                icon={DollarSign}
                color="text-green-600 bg-green-100 dark:bg-green-500/20"
                delay={0.1}
            />
            <StatCard
                title="Active Members"
                value="267"
                icon={Activity}
                color="text-purple-600 bg-purple-100 dark:bg-purple-500/20"
                delay={0.2}
            />
            <StatCard
                title="Pending Balances"
                value="$-127"
                icon={AlertCircle}
                color="text-red-600 bg-red-100 dark:bg-red-500/20"
                delay={0.3}
            />
        </div>
    );
}
