"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Mail, Edit2 } from "lucide-react"

const templates = [
    { name: "Welcome Email" },
    { name: "Payment Receipt" },
    { name: "Password Reset" },
    { name: "Subscription Renewal" },
    { name: "Failed Payment" },
    { name: "Account Suspended" },
]

export function EmailConfiguration() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
                <CardHeader className="bg-muted/30 pb-4 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400">
                            <Mail className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Email Configuration</h3>
                            <p className="text-sm text-muted-foreground">Platform email settings and templates</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6 space-y-8">
                    <div className="space-y-3">
                        <Label htmlFor="supportEmail">Support Email Address</Label>
                        <Input id="supportEmail" defaultValue="support@gymflow.com" className="h-11" />
                        <p className="text-xs text-muted-foreground ml-1">All system emails will come from this address</p>
                    </div>

                    <div className="space-y-4">
                        <Label className="text-base font-medium">Email Templates</Label>
                        <div className="grid md:grid-cols-2 gap-4">
                            {templates.map((template) => (
                                <div
                                    key={template.name}
                                    className="flex items-center justify-between p-3 rounded-lg border bg-card hover:border-purple-200 dark:hover:border-purple-900 transition-colors group cursor-pointer"
                                >
                                    <span className="text-sm font-medium">{template.name}</span>
                                    <div className="h-8 w-8 rounded-md flex items-center justify-center text-muted-foreground group-hover:text-purple-600 group-hover:bg-purple-50 dark:group-hover:bg-purple-900/20 transition-all">
                                        <Edit2 className="h-4 w-4" />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
