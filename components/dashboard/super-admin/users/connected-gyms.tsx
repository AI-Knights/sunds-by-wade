"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Store } from "lucide-react";

export function ConnectedGyms() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Connected Gyms</CardTitle>
            </CardHeader>
            <CardContent>
                {/* Gym Item */}
                <div className="flex items-center gap-4 p-3 bg-fuchsia-50 dark:bg-fuchsia-900/10 rounded-lg border border-fuchsia-100 dark:border-fuchsia-900/20">
                    <div className="w-10 h-10 rounded-lg bg-white dark:bg-white/10 flex items-center justify-center border border-fuchsia-100 dark:border-white/5">
                        <Store className="w-5 h-5 text-gray-500" />
                    </div>
                    <div>
                        <p className="text-sm font-medium text-gray-900 dark:text-white">FitZone Downtown</p>
                        <p className="text-xs text-gray-500">Active Member</p>
                    </div>
                </div>

                <div className="mt-6">
                    <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Trainer Assignment</h4>
                    <p className="text-sm text-gray-900 dark:text-white font-medium">Mike Peters</p>
                    <p className="text-xs text-gray-500 mt-1">Read-only view</p>
                </div>
            </CardContent>
        </Card>
    );
}
