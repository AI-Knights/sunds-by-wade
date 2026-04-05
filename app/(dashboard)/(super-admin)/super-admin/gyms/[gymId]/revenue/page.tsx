"use client";

import { RevenueStats } from "@/components/dashboard/super-admin/gyms/details/revenue/revenue-stats";
import { RevenueBySource } from "@/components/dashboard/super-admin/gyms/details/revenue/revenue-by-source";
import { RevenueBreakdown } from "@/components/dashboard/super-admin/gyms/details/revenue/revenue-breakdown";
import { MonthlyRevenueChart } from "@/components/dashboard/super-admin/gyms/details/revenue/monthly-revenue-chart";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

export default function RevenueSummaryPage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Top Stats */}
            <motion.div variants={itemVariants}>
                <RevenueStats />
            </motion.div>

            {/* Middle Section: Pie Chart & Breakdown */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="h-full">
                    <RevenueBySource />
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <RevenueBreakdown />
                </motion.div>
            </div>

            {/* Bottom Section: Bar Chart */}
            <motion.div variants={itemVariants}>
                <MonthlyRevenueChart />
            </motion.div>
        </motion.div>
    );
}
