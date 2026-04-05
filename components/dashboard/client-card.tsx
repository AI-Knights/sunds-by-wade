"use client";

import { motion } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { Calendar } from "lucide-react";
import { CLIENTS } from "@/constants/data";

type Client = typeof CLIENTS[0];

interface ClientCardProps {
    client: Client;
    index: number;
}

export function ClientCard({ client, index }: ClientCardProps) {
    return (
        <Link href={`/trainer/clients/${client.id}`}>
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ delay: index * 0.05 }}
                whileHover={{ y: -4, transition: { duration: 0.2 } }}
                className="rounded-xl bg-white dark:bg-card p-6 border border-gray-100 dark:border-white/5 shadow-sm hover:shadow-md transition-all cursor-pointer group"
            >
                <div className="flex justify-between items-start mb-4">
                    <div className="flex items-center space-x-4">
                        <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                            <AvatarImage src={client.avatar} alt={client.name} />
                            <AvatarFallback className="text-gray-900 dark:text-white">{client.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h3 className="font-semibold text-gray-900 dark:text-white group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">{client.name}</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{client.location}</p>
                        </div>
                    </div>
                    <Badge variant={client.status === "Active" ? "default" : "destructive"} className={client.status === "Active" ? "bg-green-100 text-green-700 dark:bg-green-500/10 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-500/20" : ""}>
                        {client.status}
                    </Badge>
                </div>

                <div className="space-y-3 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Membership</span>
                        <span className="font-medium text-gray-900 dark:text-white">{client.membership}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Training Type</span>
                        <span className="font-medium text-gray-900 dark:text-white">{client.trainingType}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                        <span className="text-gray-500 dark:text-gray-400">Completion Rate</span>
                        <span className="font-bold text-gray-900 dark:text-white">{client.completionRate}%</span>
                    </div>
                </div>

                <div className="pt-4 border-t border-gray-100 dark:border-white/10 flex items-center text-xs text-gray-500 dark:text-gray-400">
                    <Calendar className="w-3.5 h-3.5 mr-2" />
                    <span>Next Session:</span>
                    <span className="ml-1 font-medium text-gray-700">{client.nextSession}</span>
                </div>
            </motion.div>
        </Link>
    );
}
