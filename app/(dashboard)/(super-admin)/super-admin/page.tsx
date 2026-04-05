"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { OverviewStats } from "@/components/dashboard/super-admin/overview-stats";
import { UserBreakdown } from "@/components/dashboard/super-admin/user-breakdown";
import { HealthMetrics } from "@/components/dashboard/super-admin/health-metrics";
import { GymOnboardingChart } from "@/components/dashboard/super-admin/gym-onboarding-chart";
import { RevenueGrowthChart } from "@/components/dashboard/super-admin/revenue-growth-chart";
import { RetentionChurnChart } from "@/components/dashboard/super-admin/retention-churn-chart";

export default function SuperAdminDashboard() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-semibold dark:text-white text-gray-900">Platform Overview</h1>
                    <p className="text-sm text-gray-500 mt-1">
                        High-level health of the entire platform
                    </p>
                </div>
                <div className="flex items-center space-x-4">
                    <Button variant="ghost" size="icon" className="relative group">
                        <Bell className="w-5 h-5 text-gray-500 group-hover:text-gray-900 dark:text-gray-400 dark:group-hover:text-white" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white dark:border-black"></span>
                    </Button>
                </div>
            </div>

            {/* KPI Cards */}
            <OverviewStats />

            {/* Grid Layout */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* User Breakdown */}
                <div className="lg:col-span-1">
                    <UserBreakdown />
                </div>

                {/* Health Metrics */}
                <div className="lg:col-span-1">
                    <HealthMetrics />
                </div>

            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

                {/* Gym Onboarding */}
                <div className="lg:col-span-1">
                    <GymOnboardingChart />
                </div>

                {/* Revenue Growth */}
                <div className="lg:col-span-1">
                    <RevenueGrowthChart />
                </div>
            </div>

            {/* Bottom Chart */}
            <div className="w-full h-[300px]">
                <RetentionChurnChart />
            </div>
        </div>
    );
}
