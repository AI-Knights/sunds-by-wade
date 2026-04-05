"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, User } from "lucide-react";
import Link from "next/link";
import { Badge } from "@/components/ui/badge";
import { UserBasicInfo } from "@/components/dashboard/super-admin/users/user-basic-info";
import { ConnectedGyms } from "@/components/dashboard/super-admin/users/connected-gyms";
import { BillingStatus } from "@/components/dashboard/super-admin/users/billing-status";
import { ActivityLogs } from "@/components/dashboard/super-admin/users/activity-logs";
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

export default function UserDetailsPage({ params }: { params: { userId: string } }) {
    return (
        <motion.div
            className="space-y-6 pb-10"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Header */}
            <div className="flex items-center gap-4 mb-6">
                <Button variant="ghost" size="icon" asChild className="h-10 w-10">
                    <Link href="/super-admin/users">
                        <ArrowLeft className="w-5 h-5" />
                    </Link>
                </Button>

                <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                        <User className="w-6 h-6 text-gray-500" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-gray-900 dark:text-white">Sarah Johnson</h1>
                        <div className="flex items-center gap-2 mt-1">
                            <p className="text-sm text-gray-500">sarah.j@email.com</p>
                            <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 border-0 text-xs px-2 py-0">
                                Active
                            </Badge>
                            <Badge variant="secondary" className="bg-purple-500/10 text-purple-500 border-0 text-xs px-2 py-0">
                                Client
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Top Row: Basic Info & Connected Gyms */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                <motion.div variants={itemVariants} className="h-full">
                    <UserBasicInfo />
                </motion.div>
                <motion.div variants={itemVariants} className="h-full">
                    <ConnectedGyms />
                </motion.div>
            </div>

            {/* Middle: Billing Status */}
            <motion.div variants={itemVariants}>
                <BillingStatus />
            </motion.div>

            {/* Bottom: Activity Logs */}
            <motion.div variants={itemVariants}>
                <ActivityLogs />
            </motion.div>

            {/* Bottom: Use ID */}
            <div className="p-4 rounded-lg bg-gray-50 border border-gray-100 dark:bg-white/5 dark:border-white/5 text-xs text-mono text-gray-400">
                User ID: {params.userId}
            </div>

        </motion.div>
    );
}
