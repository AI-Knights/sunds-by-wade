"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Megaphone } from "lucide-react";

export function SystemAnnouncement() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white mb-8">
            <CardHeader>
                <div className="flex items-center space-x-2">
                    <div className="p-2 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                        <Megaphone className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                        <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">System-wide Announcement</CardTitle>
                        <CardDescription className="text-xs text-gray-500">
                            Broadcast message to all gyms and users
                        </CardDescription>
                    </div>
                </div>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="type" className="text-sm font-medium text-gray-700 dark:text-gray-300">Announcement Type</Label>
                    <Input id="type" placeholder="" className="bg-transparent border-gray-200 dark:border-zinc-700" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</Label>
                    <Textarea
                        id="message"
                        placeholder="Enter your announcement message here..."
                        className="min-h-[100px] bg-transparent border-gray-200 dark:border-zinc-700"
                    />
                </div>

                <Button className="bg-gray-500 hover:bg-gray-600 text-white">
                    Send Announcement
                </Button>
            </CardContent>
        </Card>
    );
}
