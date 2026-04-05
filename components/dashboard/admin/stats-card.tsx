"use client";

import { motion } from "framer-motion";
import { LucideIcon } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface StatsCardProps {
    title: string;
    value: string | number;
    trend: string;
    trendUp: boolean;
    icon: LucideIcon;
    description: string;
    index: number;
}

export function StatsCard({ title, value, trend, trendUp, icon: Icon, description, index }: StatsCardProps) {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, duration: 0.5, type: "spring" }}
            whileHover={{ y: -5, transition: { duration: 0.2 } }}
        >
            <Card className="border-none shadow-lg dark:shadow-none bg-white dark:bg-card/50 backdrop-blur-sm overflow-hidden relative group">
                <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                    <Icon className="w-24 h-24 text-primary transform rotate-12 -mr-8 -mt-8" />
                </div>

                <CardContent className="p-6 relative z-10">
                    <div className="flex justify-between items-start mb-4">
                        <div className="p-3 rounded-2xl bg-primary/10 dark:bg-primary/20 text-primary">
                            <Icon className="w-6 h-6" />
                        </div>
                        <div className={cn(
                            "flex items-center gap-1 text-sm font-medium px-2 py-1 rounded-full",
                            trendUp
                                ? "text-emerald-600 bg-emerald-100 dark:text-emerald-400 dark:bg-emerald-900/30"
                                : "text-rose-600 bg-rose-100 dark:text-rose-400 dark:bg-rose-900/30"
                        )}>
                            <span>{trend}</span>
                        </div>
                    </div>

                    <div className="space-y-1">
                        <h3 className="text-sm font-medium text-muted-foreground">{title}</h3>
                        <div className="flex items-baseline gap-2">
                            <h2 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                                {value}
                            </h2>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{description}</p>
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className={cn(
                        "absolute bottom-0 left-0 right-0 h-1 bg-linear-to-r",
                        trendUp ? "from-emerald-500 to-emerald-300" : "from-rose-500 to-rose-300"
                    )} />
                </CardContent>
            </Card>
        </motion.div>
    );
}
