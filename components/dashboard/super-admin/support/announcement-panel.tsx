"use client"

import { motion } from "framer-motion"
import { Megaphone } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function AnnouncementPanel() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Card className="overflow-hidden border-none shadow-md">
                <CardHeader className="bg-muted/30 pb-4">
                    <div className="flex items-center gap-3">
                        <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-pink-100 dark:bg-pink-900/20 text-pink-500">
                            <Megaphone className="h-5 w-5" />
                        </div>
                        <div>
                            <h3 className="font-semibold text-lg">System-wide Announcement</h3>
                            <p className="text-sm text-muted-foreground">Broadcast message to all gyms and users</p>
                        </div>
                    </div>
                </CardHeader>
                <CardContent className="grid gap-6 p-6">
                    <div className="grid gap-3">
                        <Label htmlFor="type">Announcement Type</Label>
                        <Input id="type" placeholder="e.g. Maintenance, Feature Update" className="h-11" />
                    </div>
                    <div className="grid gap-3">
                        <Label htmlFor="message">Message</Label>
                        <Textarea
                            id="message"
                            placeholder="Enter your announcement message here..."
                            className="min-h-[120px] resize-y"
                        />
                    </div>
                    <div>
                        <Button className="bg-gray-500 hover:bg-gray-600 text-white font-medium px-6">
                            Send Announcement
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
