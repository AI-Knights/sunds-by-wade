"use client";

import { Card, CardContent } from "@/components/ui/card";
import { DollarSign, Building, CreditCard, AlertCircle, ArrowUpRight } from "lucide-react";

interface StatCardProps {
    label: string;
    value: string;
    trend?: string;
    trendType?: "positive" | "negative";
    icon: React.ElementType;
    iconColor: string;
    iconBg: string;
}

function StatCard({ label, value, trend, trendType = "positive", icon: Icon, iconColor, iconBg }: StatCardProps) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardContent className="p-6">
                <div className="flex justify-between items-start mb-4">
                    <div className={`p-2 rounded-lg ${iconBg}`}>
                        <Icon className={`w-5 h-5 ${iconColor}`} />
                    </div>
                    {trend && (
                        <div className={`flex items-center text-xs font-medium ${trendType === "positive" ? "text-emerald-500" : "text-red-500"
                            }`}>
                            <ArrowUpRight className="w-3 h-3 mr-1" />
                            {trend}
                        </div>
                    )}
                </div>
                <div>
                    <h3 className="text-xs font-medium text-gray-500 mb-1">{label}</h3>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{value}</p>
                </div>
            </CardContent>
        </Card>
    );
}

export function BillingStats() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <StatCard
                label="Total Platform Revenue"
                value="$284,920"
                trend="+$18,450"
                trendType="positive"
                icon={DollarSign}
                iconColor="text-emerald-500"
                iconBg="bg-emerald-500/10"
            />
            <StatCard
                label="Gym Subscriptions"
                value="$156,340"
                trend="+$8,200"
                trendType="positive"
                icon={Building}
                iconColor="text-blue-500"
                iconBg="bg-blue-500/10"
            />
            <StatCard
                label="Processing Fees"
                value="$89,280"
                trend="+$6,120"
                trendType="positive"
                icon={CreditCard}
                iconColor="text-purple-500"
                iconBg="bg-purple-500/10"
            />
            <StatCard
                label="Failed Payments"
                value="127"
                trend="+23"
                trendType="negative" // Although +23, it's 'bad', displayed in red in screenshot
                icon={AlertCircle}
                iconColor="text-red-500"
                iconBg="bg-red-500/10"
            />
        </div>
    );
}
