"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Label } from "@/components/ui/label"
import { Bell } from "lucide-react"

const rules = [
    {
        id: "new_gym",
        label: "New Gym Signup",
        description: "Notify when a new gym joins the platform",
        defaultChecked: true
    },
    {
        id: "payment_failed",
        label: "Payment Failed",
        description: "Notify when a gym payment fails",
        defaultChecked: true
    },
    {
        id: "support_ticket",
        label: "Support Ticket Created",
        description: "Notify when a new support ticket is opened",
        defaultChecked: true
    },
    {
        id: "system_alerts",
        label: "System Alerts",
        description: "Notify about critical system issues",
        defaultChecked: true
    },
    {
        id: "weekly_report",
        label: "Weekly Platform Report",
        description: "Receive weekly summary of platform metrics",
        defaultChecked: false
    },
]

export function NotificationRules() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
        >
            <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
                <CardHeader className="bg-muted/30 pb-4 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-yellow-100 dark:bg-yellow-900/20 text-yellow-600 dark:text-yellow-500">
                            <Bell className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Notification Rules</h3>
                            <p className="text-sm text-muted-foreground">Configure when to send notifications to Super Admin</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-0">
                    {rules.map((rule, index) => (
                        <div
                            key={rule.id}
                            className={`flex items-start space-x-4 p-5 hover:bg-muted/40 transition-colors ${index !== rules.length - 1 ? 'border-b border-gray-100 dark:border-zinc-800' : ''}`}
                        >
                            <div className="flex-1 space-y-1">
                                <Label htmlFor={rule.id} className="text-sm font-medium leading-none cursor-pointer">
                                    {rule.label}
                                </Label>
                                <p className="text-sm text-muted-foreground">
                                    {rule.description}
                                </p>
                            </div>
                            <Checkbox id={rule.id} defaultChecked={rule.defaultChecked} className="mt-1" />
                        </div>
                    ))}
                </CardContent>
            </Card>
        </motion.div>
    )
}
