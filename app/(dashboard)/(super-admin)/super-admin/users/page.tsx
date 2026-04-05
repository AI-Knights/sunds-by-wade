"use client";

import { UsersStats } from "@/components/dashboard/super-admin/users/users-stats";
import { UsersTable } from "@/components/dashboard/super-admin/users/users-table";
import { UsersFilters } from "@/components/dashboard/super-admin/users/users-filters";
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

export default function UsersManagementPage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Users Management</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Platform-wide user oversight and emergency control</p>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
                <UsersStats />
            </motion.div>

            {/* Filters & Table */}
            <motion.div variants={itemVariants} className="space-y-4">
                <UsersFilters />
                <UsersTable />
            </motion.div>
        </motion.div>
    );
}
