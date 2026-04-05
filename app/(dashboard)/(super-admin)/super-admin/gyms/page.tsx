"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";
import { motion } from "framer-motion";
import { GymStats } from "@/components/dashboard/super-admin/gyms/gym-stats";
import { GymsTable } from "@/components/dashboard/super-admin/gyms/gyms-table";

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

export default function GymsPage() {
    return (
        <motion.div
            className="space-y-8 pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold dark:text-white text-gray-900">Gyms Management</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        Platform-wide gym oversight and control
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <ModeToggle />
                    <Button variant="ghost" size="icon" className="relative group">
                        <Bell className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
                    </Button>
                </div>
            </div>

            {/* Stats */}
            <motion.div variants={itemVariants}>
                <GymStats />
            </motion.div>

            {/* Table */}
            <motion.div variants={itemVariants}>
                <GymsTable />
            </motion.div>
        </motion.div>
    );
}
