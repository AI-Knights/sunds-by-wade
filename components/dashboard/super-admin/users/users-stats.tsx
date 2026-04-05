"use client";

import { Card, CardContent } from "@/components/ui/card";
import { motion } from "framer-motion";

interface StatCardProps {
    label: string;
    value: string;
    valueColor?: string;
    delay?: number;
}

function StatCard({ label, value, valueColor = "text-gray-900 dark:text-white", delay = 0 }: StatCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay }}
        >
            <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full relative overflow-hidden group">
                <CardContent className="p-6">
                    <h3 className="text-sm font-medium text-gray-500 mb-2">{label}</h3>
                    <p className={`text-3xl font-bold ${valueColor}`}>{value}</p>
                </CardContent>
            </Card>
        </motion.div>
    );
}

export function UsersStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                label="Total Users"
                value="48,392"
                delay={0}
            />
            <StatCard
                label="Active Users"
                value="44,892"
                valueColor="text-emerald-500"
                delay={0.1}
            />
            <StatCard
                label="Trainers"
                value="2,847"
                valueColor="text-blue-500"
                delay={0.2}
            />
            <StatCard
                label="Suspended"
                value="147"
                valueColor="text-red-500"
                delay={0.3}
            />
        </div>
    );
}
