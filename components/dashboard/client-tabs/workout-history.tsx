"use client";

import { Clock } from "lucide-react";
import { cn } from "@/lib/utils";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function WorkoutHistoryTab({ history }: { history: any[] }) {
    if (!history) return <div className="text-gray-500">No history found</div>;
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Workout History</h3>
            <div className="space-y-3">
                {history.map((item) => (
                    <div key={item.id} className="bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 p-4 rounded-xl flex flex-col md:flex-row md:items-center justify-between group hover:border-gray-200 dark:hover:border-white/10 transition-colors shadow-sm">
                        <div className="flex items-center gap-4 mb-3 md:mb-0">
                            <div className={cn(
                                "w-2 h-2 rounded-full",
                                item.status === "Complete" ? "bg-green-500" : "bg-yellow-500"
                            )} />
                            <div>
                                <h4 className="text-gray-900 dark:text-white font-medium">{item.title}</h4>
                                <p className="text-sm text-gray-500">{item.date}</p>
                            </div>
                        </div>
                        <div className="flex items-center gap-6">
                            <span className={cn(
                                "px-3 py-1 rounded-full text-xs font-medium",
                                item.status === "Complete" ? "bg-blue-500/10 text-blue-400" : "bg-gray-500/10 text-gray-400"
                            )}>
                                {item.status}
                            </span>
                            <div className="flex items-center text-gray-500 text-sm">
                                <Clock className="w-4 h-4 mr-2" />
                                {item.duration}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
