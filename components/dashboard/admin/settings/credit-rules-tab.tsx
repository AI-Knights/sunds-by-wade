"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { toast } from "sonner";
import { Save } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";

export function CreditRulesTab() {
    const handleSave = () => {
        toast.success("Credit rules saved successfully");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6 max-w-4xl"
        >
            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardHeader>
                    <CardTitle className="text-xl">Credit System</CardTitle>
                </CardHeader>
                <CardContent className="space-y-6">
                    <div className="space-y-2">
                        <Label>Credit Price</Label>
                        <div className="flex items-center gap-2">
                            <span className="text-gray-500 font-medium">$</span>
                            <Input defaultValue="10" type="number" className="bg-gray-50 dark:bg-zinc-800/50 max-w-[200px]" />
                            <span className="text-gray-500 text-sm">per credit</span>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Credit Expiration</Label>
                        <Select defaultValue="never">
                            <SelectTrigger className="bg-gray-50 dark:bg-zinc-800/50 max-w-md">
                                <SelectValue placeholder="Select expiration" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="never">Never Expire</SelectItem>
                                <SelectItem value="30days">30 Days</SelectItem>
                                <SelectItem value="90days">90 Days</SelectItem>
                                <SelectItem value="1year">1 Year</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    <div className="flex items-center gap-2 pt-2">
                        <Checkbox id="allow-purchase" defaultChecked />
                        <Label htmlFor="allow-purchase" className="font-normal text-gray-700 dark:text-gray-300">
                            Allow credit purchases from client app
                        </Label>
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
