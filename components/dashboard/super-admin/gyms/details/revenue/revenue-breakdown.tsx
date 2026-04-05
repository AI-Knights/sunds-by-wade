"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";

const breakdownData = [
    { label: "Memberships", amount: "$24,850", percentage: 84.6, color: "bg-blue-500" },
    { label: "Session Credits", amount: "$8,920", percentage: 23.2, color: "bg-blue-500" }, // Using blue to match screenshot for main bars? Screenshot shows blue for all progress bars
    { label: "POS Sales", amount: "$3,480", percentage: 9.1, color: "bg-blue-500" },
];

export function RevenueBreakdown() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Revenue Breakdown</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                {breakdownData.map((item, index) => (
                    <div key={item.label} className="space-y-2">
                        <div className="flex items-center justify-between text-sm">
                            <span className="font-medium text-gray-700 dark:text-gray-300">{item.label}</span>
                            <span className="font-bold text-gray-900 dark:text-white">{item.amount}</span>
                        </div>
                        <Progress
                            value={item.percentage}
                            className="h-2 bg-gray-100 dark:bg-gray-800"
                            indicatorClassName={item.color}
                        />
                        <div className="flex justify-end">
                            <span className="text-xs text-gray-500">{item.percentage}%</span>
                        </div>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
