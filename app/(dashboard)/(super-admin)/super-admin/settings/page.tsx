"use client"

import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Save } from "lucide-react"
import { PlatformBranding } from "@/components/dashboard/super-admin/settings/platform-branding"
import { EmailConfiguration } from "@/components/dashboard/super-admin/settings/email-configuration"
import { NotificationRules } from "@/components/dashboard/super-admin/settings/notification-rules"
import { FeatureToggles } from "@/components/dashboard/super-admin/settings/feature-toggles"
import { EmergencyControls } from "@/components/dashboard/super-admin/settings/emergency-controls"

export default function SettingsPage() {
    return (
        <div className="relative min-h-[calc(100vh-4rem)] p-6 space-y-6 pb-24">

            {/* Header */}
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4"
            >
                <div>
                    <h1 className="text-2xl font-bold tracking-tight">Platform Settings</h1>
                    <p className="text-muted-foreground">
                        Configure global platform settings and preferences
                    </p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 items-center justify-center gap-2">
                    <Save className="h-4 w-4" /> Save All Changes
                </Button>
            </motion.div>

            {/* Settings Sections */}
            <div className="space-y-6">
                {/* <PlatformBranding /> */}
                <EmailConfiguration />
                <NotificationRules />
                <FeatureToggles />
                <EmergencyControls />
            </div>
        </div>
    )
}
