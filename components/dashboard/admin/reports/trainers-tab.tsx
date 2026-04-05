"use client";

import { motion } from "framer-motion";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";

const DATA = [
    { name: 'Sarah Johnson', sessions: 124, revenue: 12400, clients: 32 },
    { name: 'Mike Chen', sessions: 118, revenue: 11800, clients: 28 },
    { name: 'Emma Davis', sessions: 112, revenue: 11200, clients: 30 },
    { name: 'James Wilson', sessions: 98, revenue: 9800, clients: 25 },
    { name: 'Lisa Brown', sessions: 95, revenue: 9500, clients: 24 },
];

export function TrainersTab() {
    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-6"
        >
            <div className="bg-white dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm overflow-hidden">
                <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Trainer Performance</h3>
                </div>
                <Table>
                    <TableHeader>
                        <TableRow className="border-gray-100 dark:border-zinc-800 hover:bg-transparent">
                            <TableHead className="w-[300px]">Trainer</TableHead>
                            <TableHead className="text-center">Sessions</TableHead>
                            <TableHead className="text-right">Revenue</TableHead>
                            <TableHead className="text-center">Clients</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {DATA.map((trainer) => (
                            <TableRow key={trainer.name} className="border-gray-100 dark:border-zinc-800 hover:bg-gray-50/50 dark:hover:bg-zinc-800/50">
                                <TableCell className="font-medium text-gray-900 dark:text-white">{trainer.name}</TableCell>
                                <TableCell className="text-center">{trainer.sessions}</TableCell>
                                <TableCell className="text-right font-medium text-gray-900 dark:text-white">${trainer.revenue.toLocaleString()}</TableCell>
                                <TableCell className="text-center">{trainer.clients}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div>
        </motion.div>
    );
}
