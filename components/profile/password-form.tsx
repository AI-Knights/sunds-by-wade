"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"

export function PasswordForm() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.5 }}
        >
            <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
                <CardContent className="p-8">
                    <div className="grid md:grid-cols-3 gap-6">
                        <div className="space-y-2">
                            <Label htmlFor="currentPassword">Current password</Label>
                            <Input id="currentPassword" type="password" placeholder="••••••••••••" className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="newPassword">New password</Label>
                            <Input id="newPassword" type="password" className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="confirmPassword">Confirm New password</Label>
                            <Input id="confirmPassword" type="password" className="h-11" />
                        </div>
                    </div>

                    <div className="flex justify-end gap-3 mt-8">
                        <Button variant="outline" className="px-6">Cancel</Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white px-8">Save</Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    )
}
