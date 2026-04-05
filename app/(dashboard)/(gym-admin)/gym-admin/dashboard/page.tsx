"use client";

import { motion } from "framer-motion";
import {
    Users,
    Dumbbell,
    Calendar,
    TrendingUp,
    Activity,
    DollarSign,
    CheckCircle
} from "lucide-react";
import { StatsCard } from "@/components/dashboard/admin/stats-card";
import { ChartSection } from "@/components/dashboard/admin/charts-section";
import { TodaysClasses } from "@/components/dashboard/admin/todays-classes";
import { Button } from "@/components/ui/button";
import { Header } from "@/components/dashboard/header";

// Top Stats Data
const TOP_STATS = [
    {
        title: "Total Active Members",
        value: "267",
        trend: "+12%",
        trendUp: true,
        icon: Users,
        description: "from last month"
    },
    {
        title: "Active Trainers",
        value: "18",
        trend: "+2",
        trendUp: true,
        icon: Dumbbell,
        description: "new this month"
    },
    {
        title: "Today's Classes",
        value: "24",
        trend: "0",
        trendUp: true,
        icon: Calendar,
        description: "scheduled today"
    },
    {
        title: "Trainer Utilization",
        value: "87%",
        trend: "+5%",
        trendUp: true,
        icon: Activity,
        description: "from last week"
    }
];

// Secondary Stats Data
const SECONDARY_STATS = [
    {
        label: "Check-ins Today",
        value: "143",
        icon: CheckCircle,
        color: "text-blue-500 bg-blue-500/10"
    },
    {
        label: "Class Attendance Rate",
        value: "91%",
        icon: Users,
        color: "text-emerald-500 bg-emerald-500/10"
    },
    {
        label: "Revenue This Month",
        value: "$96,000",
        icon: DollarSign,
        color: "text-purple-500 bg-purple-500/10"
    }
];

export default function AdminDashboardPage() {
    return (
        <div className="space-y-8 p-1">
            {/* Global Dashboard Header */}
            <Header />

            {/* Top Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {TOP_STATS.map((stat, index) => (
                    <StatsCard
                        key={stat.title}
                        {...stat}
                        index={index}
                    />
                ))}
            </div>

            {/* Secondary Stats Row */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {SECONDARY_STATS.map((stat, index) => (
                    <motion.div
                        key={stat.label}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.4 + (index * 0.1) }}
                        className="bg-white dark:bg-card/50 backdrop-blur-sm rounded-xl p-6 shadow-sm border border-gray-100 dark:border-gray-800 flex items-center gap-4"
                    >
                        <div className={`p-3 rounded-xl ${stat.color}`}>
                            <stat.icon className="w-6 h-6" />
                        </div>
                        <div>
                            <p className="text-sm font-medium text-muted-foreground">{stat.label}</p>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</h3>
                        </div>
                    </motion.div>
                ))}
            </div>

            {/* Charts Section */}
            <ChartSection />

            {/* Bottom Section: Classes List + (Placeholder for another widget) */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <TodaysClasses />

                {/* Placeholder for future widget (e.g., Quick Actions or Notifications) */}
                <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.6 }}
                    className="bg-linear-to-br from-primary/5 to-purple-500/5 rounded-xl border border-primary/10 p-6 flex flex-col justify-center items-center text-center space-y-4"
                >
                    <div className="p-4 rounded-full bg-primary/10 text-primary mb-2">
                        <Activity className="w-8 h-8" />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 dark:text-white">System Health</h3>
                    <p className="text-muted-foreground">All systems operational. No alerts require your attention.</p>
                    <Button variant="outline" className="mt-4">Run Diagnostics</Button>
                </motion.div>
            </div>
        </div>
    );
}
