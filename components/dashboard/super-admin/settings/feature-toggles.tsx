"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { ToggleLeft } from "lucide-react"

const features = [
    {
        id: "workout_builder",
        label: "Workout Builder",
        description: "Allow trainers to create custom workout programs",
        defaultChecked: true,
    },
    {
        id: "messaging",
        label: "Messaging",
        description: "In-app messaging between trainers and clients",
        defaultChecked: true,
    },
    {
        id: "mobile_checkin",
        label: "Mobile Check-In",
        description: "Allow clients to check in via mobile app",
        defaultChecked: false,
    },
    {
        id: "credit_system",
        label: "Credit System",
        description: "Credit-based booking for sessions and classes",
        defaultChecked: true,
    },
    {
        id: "class_booking",
        label: "Class Booking",
        description: "Enable class booking system for gyms",
        defaultChecked: true,
    },
    {
        id: "pos_system",
        label: "POS System",
        description: "Front desk point-of-sale functionality",
        defaultChecked: true,
    },
    {
        id: "trainer_assignment",
        label: "Trainer Assignment",
        description: "Manual trainer-client assignment system",
        defaultChecked: true,
    },
    {
        id: "analytics",
        label: "Analytics Dashboard",
        description: "Advanced analytics and reporting for gyms",
        defaultChecked: false,
    },
]

export function FeatureToggles() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
        >
            <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
                <CardHeader className="bg-muted/30 pb-4 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100 dark:bg-green-900/20 text-green-600 dark:text-green-400">
                            <ToggleLeft className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Feature Toggles</h3>
                            <p className="text-sm text-muted-foreground">Enable or disable platform modules globally</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-x-12 gap-y-8">
                        {features.map((feature) => (
                            <div key={feature.id} className="flex items-center justify-between">
                                <div className="space-y-0.5">
                                    <Label htmlFor={feature.id} className="text-sm font-medium cursor-pointer">
                                        {feature.label}
                                    </Label>
                                    <p className="text-xs text-muted-foreground mr-4">
                                        {feature.description}
                                    </p>
                                </div>
                                <Switch id={feature.id} defaultChecked={feature.defaultChecked} />
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
