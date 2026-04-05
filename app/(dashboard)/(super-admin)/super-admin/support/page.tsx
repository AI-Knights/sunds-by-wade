"use client"

import { motion } from "framer-motion"
import { SupportStats } from "@/components/dashboard/super-admin/support/support-stats"
import { AnnouncementPanel } from "@/components/dashboard/super-admin/support/announcement-panel"
import { MessagesTable } from "@/components/dashboard/super-admin/support/messages-table"

export default function SupportPage() {
    return (
        <div className="flex flex-col gap-6 p-6">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold tracking-tight">Support & Operations</h1>
                <p className="text-muted-foreground">
                    Gym support message, user issues, and system-wide communications
                </p>
            </motion.div>

            <SupportStats />

            <AnnouncementPanel />

            <MessagesTable />
        </div>
    )
}
