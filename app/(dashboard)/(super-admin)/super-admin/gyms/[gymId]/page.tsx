"use client";

import { GymOverviewStats } from "@/components/dashboard/super-admin/gyms/details/gym-overview-stats";
import { RevenueTrendChart } from "@/components/dashboard/super-admin/gyms/details/revenue-trend-chart";
import { GymDetailsCard, RecentActivity } from "@/components/dashboard/super-admin/gyms/details/gym-details-content";
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

export default function GymDetailsPage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <motion.div variants={itemVariants}>
                <GymOverviewStats />
            </motion.div>

            <motion.div variants={itemVariants}>
                <RevenueTrendChart />
            </motion.div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants}>
                    <GymDetailsCard />
                </motion.div>
                <motion.div variants={itemVariants}>
                    <RecentActivity />
                </motion.div>
            </div>
        </motion.div>
    );
}
