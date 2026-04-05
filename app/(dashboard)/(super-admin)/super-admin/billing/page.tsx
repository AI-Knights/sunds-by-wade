"use client";

import { BillingStats } from "@/components/dashboard/super-admin/billing/billing-stats";
import { RevenueCharts } from "@/components/dashboard/super-admin/billing/revenue-charts";
import { TopGymsList } from "@/components/dashboard/super-admin/billing/top-gyms-list";
import { RecentTransactions } from "@/components/dashboard/super-admin/billing/recent-transactions";
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

export default function BillingRevenuePage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Billing & Revenue</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Platform-wide revenue tracking and billing control</p>
            </div>

            {/* Stats Cards */}
            <motion.div variants={itemVariants}>
                <BillingStats />
            </motion.div>

            {/* Charts Row */}
            <motion.div variants={itemVariants}>
                <RevenueCharts />
            </motion.div>

            {/* Top Gyms */}
            <motion.div variants={itemVariants}>
                <TopGymsList />
            </motion.div>

            {/* Recent Transactions */}
            <motion.div variants={itemVariants}>
                <RecentTransactions />
            </motion.div>
        </motion.div>
    );
}
