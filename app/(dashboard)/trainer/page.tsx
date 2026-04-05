"use client";

import { Header } from "@/components/dashboard/header";
import { StatCard } from "@/components/dashboard/stat-card";
import { Button } from "@/components/ui/button";
import { TRAINER_STATS, UPCOMING_SESSIONS, RECENT_ASSIGNMENTS } from "@/constants/data";
import { Clock, MoreVertical, Calendar as CalendarIcon, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";

export default function TrainerDashboard() {
    return (
        <div className="pb-10">
            <Header />

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
                {TRAINER_STATS.map((stat, index) => (
                    <StatCard key={stat.label} {...stat} index={index} />
                ))}
            </div>


            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

                <div className="lg:col-span-2 space-y-8">
                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <div>
                                <h3 className="text-lg font-semibold dark:text-white">Today&apos;s Schedule</h3>
                                <p className="text-sm text-gray-500">Friday, January 10, 2026</p>
                            </div>
                            <Button variant="link" className="text-blue-400">View Calendar</Button>
                        </div>

                        <div className="space-y-4">
                            {/* Session Item */}
                            <div className="flex flex-col md:flex-row md:items-center p-4 rounded-xl bg-gray-50 dark:bg-white/5 border border-gray-100 dark:border-white/5 hover:border-gray-200 dark:hover:border-white/10 transition-colors">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-lg bg-indigo-500/20 text-indigo-400">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium dark:text-white">Marcus Johnson <span className="ml-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-400">Personal</span></h4>
                                        <p className="text-sm text-gray-400">14:00 - 15:00</p>
                                    </div>
                                </div>
                                <div className="ml-auto mt-4 md:mt-0 flex items-center space-x-3">

                                </div>
                            </div>

                            <div className="flex flex-col md:flex-row md:items-center p-4 rounded-xl border border-dashed border-white/10 opacity-70 hover:opacity-100 transition-opacity cursor-pointer">
                                <div className="flex items-center space-x-4">
                                    <div className="p-3 rounded-lg bg-gray-800 text-gray-400">
                                        <Clock className="w-5 h-5" />
                                    </div>
                                    <div>
                                        <h4 className="font-medium dark:text-white">Open Slot <span className="ml-2 text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-full bg-purple-500/20 text-purple-400">Open</span></h4>
                                        <p className="text-sm text-gray-400">16:00 - 17:00</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:dark:text-white">Recent Assignments</h3>
                            <Button variant="link" className="text-blue-400">Create Workout</Button>
                        </div>
                        <div className="space-y-3">
                            {RECENT_ASSIGNMENTS.map((item) => (
                                <div key={item.id} className="flex items-center p-3 rounded-xl hover:bg-gray-50 dark:hover:bg-white/5 transition-colors group cursor-pointer">
                                    <div className={cn("p-2 rounded-lg mr-4", item.color)}>
                                        <item.icon className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                        <h4 className="text-sm font-medium dark:text-white group-hover:text-blue-400 transition-colors">{item.title}</h4>
                                        <p className="text-xs text-gray-500">{item.subtitle}</p>
                                    </div>
                                    <ArrowRight className="w-4 h-4 text-gray-600 group-hover:dark:text-white transition-colors" />
                                </div>
                            ))}
                        </div>
                    </div>
                </div>


                <div className="space-y-8">

                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:dark:text-white">Upcoming</h3>
                            <Button variant="link" size="sm" className="text-xs text-blue-400">View All</Button>
                        </div>

                        <div className="space-y-4">
                            {UPCOMING_SESSIONS.map((session) => (
                                <div key={session.id} className="flex items-start pb-4 border-b border-white/5 last:border-0 last:pb-0">
                                    <div className="flex flex-col items-center mr-4 min-w-[3rem]">
                                        <span className="text-lg font-bold dark:text-white">{session.date}</span>
                                        <span className="text-xs text-gray-500">{session.month}</span>
                                    </div>
                                    <div>
                                        <h4 className="text-sm font-medium dark:text-white">{session.client}</h4>
                                        <p className="text-xs text-gray-500 mt-1">{session.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>


                    <div className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-2xl p-6 shadow-sm">
                        <div className="flex items-center justify-between mb-6">
                            <h3 className="text-lg font-semibold text-gray-900 dark:dark:text-white">Recent Messages</h3>
                            <Button variant="link" size="sm" className="text-xs text-blue-400">Inbox</Button>
                        </div>
                        <div className="space-y-4">
                            <div className="flex items-center">
                                <div className="w-8 h-8 rounded-full bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-xs font-bold mr-3">SM</div>
                                <div className="flex-1">
                                    <div className="flex justify-between">
                                        <p className="text-sm font-medium dark:text-white">Sarah Mitchell</p>
                                        <span className="text-[10px] text-gray-500">2m</span>
                                    </div>
                                    <p className="text-xs text-gray-400 truncate w-40">Thanks for the new workout plan!</p>
                                </div>
                                <div className="w-2 h-2 rounded-full bg-blue-500 ml-2"></div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
}
