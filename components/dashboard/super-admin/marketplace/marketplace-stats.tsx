"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Store, Activity } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    subtext: string;
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
    trend?: string;
    trendType?: "positive" | "negative";
}

function StatCard({ label, value, subtext, icon: Icon, iconColor, iconBg, trend, trendType = "positive" }: StatCardProps) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full relative overflow-hidden">
            <CardContent className="p-6">
                <div className={`absolute top-6 right-6 p-2 rounded-lg ${iconBg}`}>
                    <Icon className={`w-5 h-5 ${iconColor}`} />
                </div>
                {trend && (
                    <div className={`text-xs font-medium mb-4 ${trendType === "positive" ? "text-emerald-500" : "text-red-500"
                        }`}>
                        {/* Trend Icon could be added here if specialized, generally text suffices or separate icon */}
                    </div>
                )}

                <h3 className="text-sm font-medium text-gray-500 mb-1">{label}</h3>
                <p className="text-3xl font-bold text-gray-900 dark:text-white mb-1">{value}</p>
                <div className="flex items-center gap-2">
                    {trend && (
                        <span className={`text-xs font-medium ${trendType === "positive" ? "text-emerald-500" : "text-red-500"}`}>
                            {trend}
                        </span>
                    )}
                    <p className="text-xs text-gray-400">{subtext}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function MarketplaceStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <StatCard
                label="Total POS Volume"
                value="$50,390"
                subtext="this month"
                trend="+12.4%"
                trendType="positive"
                icon={DollarSign}
                iconColor="text-emerald-500"
                iconBg="bg-emerald-500/10"
            />
            <StatCard
                label="Active POS Gyms"
                value="184"
                subtext="74% of all gyms"
                icon={Store}
                iconColor="text-purple-500"
                iconBg="bg-purple-500/10"
            />
            <StatCard
                label="Processing Fees"
                value="$1,461"
                subtext="2.9% fee rate"
                icon={Activity} // Using Activity as a placeholder for the cube icon
                iconColor="text-blue-500"
                iconBg="bg-blue-500/10"
            />
        </div>
    );
}
