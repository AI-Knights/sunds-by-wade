"use client";

import { motion } from "framer-motion";
import { Users, QrCode, UserPlus, Clock } from "lucide-react";

interface StatCardProps {
    title: string;
    value: string | number;
    icon: any;
    delay: number;
}

function StatCard({ title, value, icon: Icon, delay }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay }}
            className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between"
        >
            <div>
                <p className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-1">{title}</p>
                <h3 className="text-3xl font-bold text-gray-900 dark:text-white">{value}</h3>
            </div>
            <div className="p-3 bg-purple-50 dark:bg-purple-500/10 rounded-lg text-purple-600 dark:text-purple-400">
                <Icon className="w-6 h-6" />
            </div>
        </motion.div>
    );
}

export function CheckInStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <StatCard
                title="Today's Check-Ins"
                value="5"
                icon={Users}
                delay={0}
            />
            <StatCard
                title="QR Code"
                value="3"
                icon={QrCode}
                delay={0.1}
            />
            <StatCard
                title="Manual"
                value="2"
                icon={UserPlus}
                delay={0.2}
            />
            <StatCard
                title="Peak Hour"
                value="9-10 AM"
                icon={Clock}
                delay={0.3}
            />
        </div>
    );
}
