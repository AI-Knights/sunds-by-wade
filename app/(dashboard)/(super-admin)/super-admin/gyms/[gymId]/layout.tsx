"use client";

import { Button } from "@/components/ui/button";
import { ArrowLeft, Building, Store } from "lucide-react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { ModeToggle } from "@/components/mode-toggle";

const TABS = [
    { label: "Overview", href: "" }, // Root path for this layout
    { label: "Users", href: "/users" },
    { label: "Trainers", href: "/trainers" },
    { label: "Classes", href: "/classes" },
    { label: "Revenue Summary", href: "/revenue" },
];

export default function GymDetailsLayout({
    children,
    params
}: {
    children: React.ReactNode;
    params: { gymId: string };
}) {
    const pathname = usePathname();
    const router = useRouter();
    const baseUrl = `/super-admin/gyms/${params.gymId}`;

    return (
        <div className="space-y-6 pb-10">
            {/* Header */}
            <div className="space-y-4">
                <div className="flex items-center justify-between">
                    <Link
                        href="/super-admin/gyms"
                        className="flex items-center text-sm text-gray-500 hover:text-gray-900 dark:hover:text-white transition-colors"
                    >
                        <ArrowLeft className="w-4 h-4 mr-2" />
                        Back to Gyms
                    </Link>
                    <ModeToggle />
                </div>

                <div className="flex items-center gap-4">
                    <div className="w-16 h-16 rounded-xl bg-gray-100 dark:bg-white/10 flex items-center justify-center border border-gray-200 dark:border-white/10">
                        <Store className="w-8 h-8 text-gray-500 dark:text-gray-400" />
                    </div>
                    <div>
                        <h1 className="text-2xl font-bold text-gray-900 dark:text-white flex items-center gap-3">
                            FitZone Downtown
                            {/* In real app, fetch name by params.gymId */}
                        </h1>
                        <div className="flex items-center gap-3 mt-1 text-sm text-gray-500">
                            <span>New York, NY</span>
                            <Badge
                                variant="secondary"
                                className="bg-emerald-500/10 text-emerald-500 border-0 text-xs px-2 py-0.5"
                            >
                                Active
                            </Badge>
                        </div>
                    </div>
                </div>
            </div>

            {/* Navigation Tabs */}
            <div className="border-b border-gray-200 dark:border-white/10">
                <nav className="flex items-center space-x-6">
                    {TABS.map((tab) => {
                        // Logic to determine active tab based on path suffix
                        // if tab.href is empty, it matches exactly baseUrl or baseUrl/
                        // if tab.href is /users, it matches baseUrl/users
                        const tabPath = `${baseUrl}${tab.href}`;
                        const isActive = tab.href === ""
                            ? pathname === baseUrl || pathname === `${baseUrl}/`
                            : pathname?.startsWith(tabPath);

                        return (
                            <Link
                                key={tab.label}
                                href={tabPath}
                                className={cn(
                                    "pb-3 text-sm font-medium border-b-2 transition-colors",
                                    isActive
                                        ? "border-blue-600 text-blue-600 dark:border-blue-500 dark:text-blue-400"
                                        : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                )}
                            >
                                {tab.label}
                            </Link>
                        );
                    })}
                </nav>
            </div>

            {/* Content */}
            <div className="min-h-[500px]">
                {children}
            </div>
        </div>
    );
}
