"use client";

import { MarketplaceStats } from "@/components/dashboard/super-admin/marketplace/marketplace-stats";
import { AllowedProducts } from "@/components/dashboard/super-admin/marketplace/allowed-products";
import { ProcessingFee } from "@/components/dashboard/super-admin/marketplace/processing-fee";
import { PosVolumeChart } from "@/components/dashboard/super-admin/marketplace/pos-volume-chart";
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

export default function MarketplaceOversightPage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Marketplace Oversight</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Front desk / POS control and monitoring (no client-facing shop)</p>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
                <MarketplaceStats />
            </motion.div>

            {/* Config Row */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="h-full">
                    <AllowedProducts />
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <ProcessingFee />
                </motion.div>
            </div>

            {/* Chart */}
            <motion.div variants={itemVariants}>
                <PosVolumeChart />
            </motion.div>
        </motion.div>
    );
}
