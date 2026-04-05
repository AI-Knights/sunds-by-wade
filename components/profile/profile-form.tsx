"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Button } from "@/components/ui/button"
import { Camera } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"

export function ProfileForm() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.5 }}
        >
            <Card className="border-none shadow-sm overflow-hidden bg-white dark:bg-zinc-900">
                <CardHeader className="bg-muted/30 pb-4 border-b border-gray-100 dark:border-zinc-800">
                    <div className="flex flex-col gap-1">
                        <h3 className="font-semibold text-lg">Profile Information</h3>
                        <p className="text-sm text-muted-foreground">Update your personal information and profile picture</p>
                    </div>
                </CardHeader>
                <CardContent className="p-8">
                    <div className="flex flex-col items-center mb-8">
                        <div className="relative group cursor-pointer">
                            <div className="w-24 h-24 rounded-full overflow-hidden border-4 border-white dark:border-zinc-800 shadow-lg relative">
                                {/* Placeholder for avatar */}
                                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-purple-500"></div>
                            </div>
                            <div className="absolute inset-0 bg-black/40 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                                <Camera className="w-8 h-8 text-white" />
                            </div>
                        </div>
                        <button className="mt-3 text-sm font-medium text-blue-600 dark:text-blue-400 hover:underline">
                            Choose Photo
                        </button>
                    </div>

                    <div className="grid md:grid-cols-2 gap-x-8 gap-y-6">
                        <div className="space-y-2">
                            <Label htmlFor="fullName">Full name</Label>
                            <Input id="fullName" defaultValue="John Doe" className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="email">Email address</Label>
                            <Input id="email" defaultValue="admin@orbital.com" className="h-11" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="role">Role</Label>
                            <Input id="role" defaultValue="Super Admin" disabled className="h-11 bg-muted/50 text-muted-foreground" />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="phone">Phone number</Label>
                            <Input id="phone" defaultValue="+9668779869" className="h-11" />
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
