"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Palette } from "lucide-react"

export function PlatformBranding() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        >
            <Card className="border-none shadow-sm overflow-hidden bg-card/50 backdrop-blur-sm">
                <CardHeader className="bg-muted/30 pb-4 border-b">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-purple-100 dark:bg-purple-900/20 text-purple-600 dark:text-purple-400">
                            <Palette className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">Platform Branding</h3>
                            <p className="text-sm text-muted-foreground">Customize platform name and appearance</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="p-6">
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="space-y-3">
                            <Label htmlFor="platformName">Platform Name</Label>
                            <Input id="platformName" defaultValue="Orbital" className="h-11" />
                            <p className="text-xs text-muted-foreground ml-1">Displayed across all gym dashboards</p>
                        </div>
                        <div className="space-y-3">
                            <Label htmlFor="brandColor">Primary Brand Color</Label>
                            <div className="flex gap-3">
                                <div className="h-11 w-11 rounded-md border flex-shrink-0 bg-[#722BFF] shadow-sm ring-2 ring-offset-2 ring-transparent hover:ring-purple-200 transition-all cursor-pointer"></div>
                                <Input id="brandColor" defaultValue="#722BFF" className="h-11 font-mono uppercase" />
                            </div>
                            <p className="text-xs text-muted-foreground ml-1">Used for buttons and accents</p>
                        </div>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
