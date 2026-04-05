"use client";

import { CreateNotificationForm } from "@/components/dashboard/super-admin/notifications/create-notification-form";
import { NotificationHistory } from "@/components/dashboard/super-admin/notifications/notification-history";
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

export default function PushNotificationsPage() {
    return (
        <motion.div
            className="space-y-6"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            <div>
                <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Push Notifications</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">Send notifications to your users</p>
            </div>

            {/* Create Form */}
            <motion.div variants={itemVariants}>
                <CreateNotificationForm />
            </motion.div>

            {/* History Table */}
            <motion.div variants={itemVariants}>
                <NotificationHistory />
            </motion.div>
        </motion.div>
    );
}
