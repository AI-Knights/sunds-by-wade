"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function BookingRulesTab() {
    const handleSave = () => {
        toast.success("Booking configuration saved successfully");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl"
        >
            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Booking Configuration</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Advance Booking Window</Label>
                        <Select defaultValue="7days">
                            <SelectTrigger className="bg-gray-50 dark:bg-zinc-800/50 max-w-md">
                                <SelectValue placeholder="Select window" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="1day">1 Day</SelectItem>
                                <SelectItem value="3days">3 Days</SelectItem>
                                <SelectItem value="7days">7 days</SelectItem>
                                <SelectItem value="14days">14 Days</SelectItem>
                                <SelectItem value="30days">30 Days</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-2">
                        <Label>Cancellation Deadline</Label>
                        <Select defaultValue="1hour">
                            <SelectTrigger className="bg-gray-50 dark:bg-zinc-800/50 max-w-md">
                                <SelectValue placeholder="Select deadline" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="15min">15 minutes before</SelectItem>
                                <SelectItem value="1hour">1 hour before</SelectItem>
                                <SelectItem value="12hours">12 hours before</SelectItem>
                                <SelectItem value="24hours">24 hours before</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="space-y-3 pt-2">
                        <div className="flex items-center gap-2">
                            <Checkbox id="self-book-class" defaultChecked />
                            <Label htmlFor="self-book-class" className="font-normal text-gray-700 dark:text-gray-300">
                                Allow self-booking for classes
                            </Label>
                        </div>
                        <div className="flex items-center gap-2">
                            <Checkbox id="self-book-session" defaultChecked />
                            <Label htmlFor="self-book-session" className="font-normal text-gray-700 dark:text-gray-300">
                                Allow self-booking for trainer sessions
                            </Label>
                        </div>
                    </div>

                    <div className="pt-4">
                        <Button
                            onClick={handleSave}
                            className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                        >
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                </CardContent>
            </Card>
        </motion.div>
    );
}
