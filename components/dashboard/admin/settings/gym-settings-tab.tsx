"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";

export function GymSettingsTab() {
    const handleSave = () => {
        toast.success("Gym settings saved successfully");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl"
        >
            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Gym Information</CardTitle>
                    <CardDescription>Update your gym's public profile and contact details.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Gym Name</Label>
                        <Input defaultValue="Elite Fitness Center" className="bg-gray-50 dark:bg-zinc-800/50" />
                    </div>

                    <div className="space-y-2">
                        <Label>Address</Label>
                        <Input defaultValue="123 Main Street, City, State 12345" className="bg-gray-50 dark:bg-zinc-800/50" />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div className="space-y-2">
                            <Label>Phone</Label>
                            <Input defaultValue="(555) 123-4567" className="bg-gray-50 dark:bg-zinc-800/50" />
                        </div>
                        <div className="space-y-2">
                            <Label>Email</Label>
                            <Input defaultValue="info@elitefitness.com" className="bg-gray-50 dark:bg-zinc-800/50" />
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Timezone</Label>
                        <Select defaultValue="est">
                            <SelectTrigger className="bg-gray-50 dark:bg-zinc-800/50">
                                <SelectValue placeholder="Select timezone" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="est">Eastern Time (ET)</SelectItem>
                                <SelectItem value="cst">Central Time (CT)</SelectItem>
                                <SelectItem value="mst">Mountain Time (MT)</SelectItem>
                                <SelectItem value="pst">Pacific Time (PT)</SelectItem>
                                <SelectItem value="gmt">Greenwich Mean Time (GMT)</SelectItem>
                            </SelectContent>
                        </Select>
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
