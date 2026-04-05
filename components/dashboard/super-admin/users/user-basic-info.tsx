"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { User, Mail, Shield, Calendar, Activity } from "lucide-react";
import { Badge } from "@/components/ui/badge";

export function UserBasicInfo() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Basic Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="flex items-start gap-3">
                    <User className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Full Name</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Sarah Johnson</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Mail className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Email Address</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">sarah.j@email.com</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Shield className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Role</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Client</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Calendar className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Joined Date</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">March 15, 2025</p>
                    </div>
                </div>

                <div className="flex items-start gap-3">
                    <Activity className="w-4 h-4 text-gray-400 mt-1" />
                    <div>
                        <p className="text-xs text-gray-500 mb-0.5">Last Active</p>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">Jan 13, 2026, 02:23 PM</p>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
