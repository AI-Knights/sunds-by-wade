"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, MessageSquare, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CLIENTS, CLIENT_METRICS, CLIENT_HISTORY } from "@/constants/data";
import { cn } from "@/lib/utils";
import { WorkoutHistoryTab } from "@/components/dashboard/client-tabs/workout-history";
import { ProgressTab } from "@/components/dashboard/client-tabs/progress";
import { AssignedWorkoutsTab } from "@/components/dashboard/client-tabs/assigned-workouts";
import { AssignWorkoutModal } from "@/components/dashboard/trainer/clients/assign-workout-modal";


export default function ClientDetailsPage() {
    const params = useParams();
    const router = useRouter();
    const id = params.id as string;
    const client = CLIENTS.find(c => c.id === id);
    const metrics = CLIENT_METRICS[id as keyof typeof CLIENT_METRICS];

    // Default tabs state
    const [activeTab, setActiveTab] = useState("history");
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    if (!client) {
        return <div className="p-8 text-white">Client not found</div>;
    }

    return (
        <div className="pb-10 space-y-8">
            {/* Back Nav */}
            <div className="flex items-center space-x-2 text-sm text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white cursor-pointer transition-colors" onClick={() => router.back()}>
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Clients</span>
            </div>

            {/* Header Profile */}
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <div className="flex items-center space-x-4">
                    <Avatar className="h-16 w-16 border-2 border-white dark:border-white/10 shadow-sm">
                        <AvatarImage src={client.avatar} />
                        <AvatarFallback>{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                    <div>
                        <div className="flex items-center space-x-3">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-white tracking-tight">{client.name}</h1>
                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/30 border-0">
                                {client.status}
                            </Badge>
                        </div>
                        <p className="text-gray-500 dark:text-gray-400">{client.location}</p>
                    </div>
                </div>
                <div className="flex space-x-3">
                    <Button variant="outline" className="border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5 hover:text-gray-900 dark:hover:text-white">
                        <MessageSquare className="w-4 h-4 mr-2" />
                        Message
                    </Button>
                    <Button className="bg-blue-600 hover:bg-blue-700 text-white" onClick={() => setIsAssignModalOpen(true)}>
                        <Plus className="w-4 h-4 mr-2" />
                        Assign Workout
                    </Button>
                </div>
            </div>

            {/* Contact Info Card */}
            <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 grid grid-cols-1 md:grid-cols-2 gap-6 shadow-sm">
                <div className="space-y-4">
                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-500 uppercase tracking-wider">Contact Information</h3>
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Email</p>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{client.email}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Member Since</p>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{client.memberSince}</p>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="space-y-4 md:mt-0 pt-4 md:pt-0 border-t md:border-t-0 border-gray-100 dark:border-white/5">
                    <div className="hidden md:block h-6" /> {/* Spacer for alignment */}
                    <div className="grid grid-cols-1 gap-4">
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Phone</p>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{client.phone}</p>
                            </div>
                        </div>
                        <div className="flex items-center space-x-3">
                            <div className="p-2 bg-gray-50 dark:bg-white/5 rounded-lg text-gray-400">
                                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" /></svg>
                            </div>
                            <div>
                                <p className="text-xs text-gray-500 dark:text-gray-500">Training Type</p>
                                <p className="text-sm text-gray-900 dark:text-white font-medium">{client.trainingType}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Quick Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <QuickStat label="Bodyweight" value={metrics?.bodyweight.value || "N/A"} trend={metrics?.bodyweight.trend} trendGood={true} />
                <QuickStat label="Total Workouts" value={metrics?.totalWorkouts || "0"} subtext="Completed sessions" />
                <QuickStat label="Completion Rate" value={metrics?.completionRate || "0%"} subtext="Of assigned workouts" />
                <QuickStat label="Membership" value={metrics?.plan || client.membership} subtext="Current plan" />
            </div>

            {/* Tabs Navigation */}
            <div className="flex space-x-1 bg-gray-100 dark:bg-white/5 p-1 rounded-xl w-fit">
                {["history", "progress", "assigned"].map((tab) => (
                    <button
                        key={tab}
                        onClick={() => setActiveTab(tab)}
                        className={cn(
                            "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                            activeTab === tab
                                ? "bg-white dark:bg-zinc-800 text-blue-600 dark:text-white shadow-sm"
                                : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white hover:bg-white/50 dark:hover:bg-white/5"
                        )}
                    >
                        {tab === "history" && "Workout History"}
                        {tab === "progress" && "Progress"}
                        {tab === "assigned" && "Assigned Workouts"}
                    </button>
                ))}
            </div>

            {/* Tab Content */}
            <div className="min-h-[300px]">
                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === "history" && <WorkoutHistoryTab history={CLIENT_HISTORY} />}
                        {activeTab === "progress" && <ProgressTab metrics={metrics} />}
                        {activeTab === "assigned" && <AssignedWorkoutsTab />}
                    </motion.div>
                </AnimatePresence>
            </div>

            <AssignWorkoutModal
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
                clientName={client.name}
            />
        </div>
    );
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
function QuickStat({ label, value, subtext, trend, trendGood }: any) {
    return (
        <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 p-5 rounded-xl shadow-sm">
            <p className="text-xs text-gray-500 dark:text-gray-500 mb-2">{label}</p>
            <h4 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">{value}</h4>
            {trend && (
                <p className={cn("text-xs font-medium", trendGood ? "text-green-600 dark:text-green-400" : "text-red-500 dark:text-red-400")}>
                    {trend}
                </p>
            )}
            {subtext && <p className="text-xs text-gray-500 dark:text-gray-600">{subtext}</p>}
        </div>
    );
}
