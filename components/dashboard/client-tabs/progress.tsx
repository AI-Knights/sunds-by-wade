"use client";

import { motion } from "framer-motion";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function ProgressTab({ metrics }: { metrics: any }) {
    if (!metrics) return <div className="text-gray-500">No data available</div>;

    const liftStats = [
        { label: "Bench Press (1RM)", data: metrics.bench },
        { label: "Squat (1RM)", data: metrics.squat },
        { label: "Deadlift (1RM)", data: metrics.deadlift },
    ];

    return (
        <div className="space-y-8">
            <h3 className="text-lg font-semibold text-white mb-4">Performance Metrics</h3>
            <div className="space-y-8">
                {liftStats.map((lift, index) => (
                    <div key={lift.label} className="space-y-2">
                        <div className="flex justify-between text-sm">
                            <span className="text-white font-medium">{lift.label}</span>
                            <span className="text-gray-400">{lift.data.current} lbs</span>
                        </div>
                        {/* Progress Bar Container */}
                        <div className="h-3 bg-white/5 rounded-full overflow-hidden relative">
                            {/* Animated Bar */}
                            <motion.div
                                initial={{ width: 0 }}
                                animate={{ width: `${lift.data.progress}%` }}
                                transition={{ duration: 1, delay: index * 0.2, ease: "easeOut" }}
                                className="h-full bg-indigo-600 rounded-full relative"
                            >
                                {/* Glow Tip */}
                                <div className="absolute right-0 top-0 bottom-0 w-2 bg-white/50 blur-[2px]" />
                            </motion.div>
                        </div>
                        <p className="text-xs text-green-400 font-medium">+10 lbs from last month</p>
                    </div>
                ))}
            </div>
        </div>
    );
}
