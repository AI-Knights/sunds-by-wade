"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

export function HealthMetrics() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-sm font-medium text-muted-foreground">Health Metrics</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-white text-gray-700">Retention Rate</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-emerald-500">87.4%</span>
                        <span className="text-xs text-emerald-500 w-8 text-right">+2.1%</span>
                    </div>
                </div>
                <div className="flex items-center justify-between">
                    <span className="text-sm font-medium dark:text-white text-gray-700">Churn Rate</span>
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-bold text-orange-500">3.8%</span>
                        <span className="text-xs text-orange-500 w-8 text-right">+0.4%</span>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
