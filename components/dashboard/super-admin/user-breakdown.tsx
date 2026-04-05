"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function UserBreakdown() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">User Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-white text-gray-700">Clients</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold dark:text-white text-gray-900">44,892</span>
                        <span className="text-xs text-muted-foreground w-8 text-right">92.8%</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-white text-gray-700">Trainers</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold dark:text-white text-gray-900">2,847</span>
                        <span className="text-xs text-muted-foreground w-8 text-right">5.9%</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-white text-gray-700">Gym Admins</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold dark:text-white text-gray-900">653</span>
                        <span className="text-xs text-muted-foreground w-8 text-right">1.3%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
