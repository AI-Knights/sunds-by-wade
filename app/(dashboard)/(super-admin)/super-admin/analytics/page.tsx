"use client";

import { RetentionRateTable } from "@/components/dashboard/super-admin/analytics/retention-rate-table";
import { ChurnRateChart } from "@/components/dashboard/super-admin/analytics/churn-rate-chart";
import { TopTrainerEffectiveness } from "@/components/dashboard/super-admin/analytics/top-trainer-effectiveness";
import { ClassUtilization } from "@/components/dashboard/super-admin/analytics/class-utilization";
import { RevenueByGymSize } from "@/components/dashboard/super-admin/analytics/revenue-by-gym-size";
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

export default function AnalyticsPage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Analytics & Insights</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Strategic insights across the platform</p>
            </div>

            {/* Row 1: Retention Table */}
            <motion.div variants={itemVariants}>
                <RetentionRateTable />
            </motion.div>

            {/* Row 2: Churn & Trainers */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="h-full">
                    <ChurnRateChart />
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <TopTrainerEffectiveness />
                </motion.div>
            </div>

            {/* Row 3: Class Utilization & Revenue */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="h-full">
                    <ClassUtilization />
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <RevenueByGymSize />
                </motion.div>
            </div>
        </motion.div>
    );
}
