"use client";

import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { QrCode, User } from "lucide-react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { motion, AnimatePresence } from "framer-motion";

interface CheckInRecord {
    id: string;
    clientName: string;
    date: Date;
    method: "QR Code" | "Manual";
    staff?: string;
    note?: string;
}

interface CheckInHistoryProps {
    history: CheckInRecord[];
}

export function CheckInHistory({ history }: CheckInHistoryProps) {
    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-zinc-800 overflow-hidden">
            <div className="p-6 border-b border-gray-100 dark:border-zinc-800">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Check-In History</h3>
            </div>

            <Table>
                <TableHeader>
                    <TableRow className="border-gray-100 dark:border-zinc-800 hover:bg-transparent">
                        <TableHead>Client</TableHead>
                        <TableHead>Date</TableHead>
                        <TableHead>Time</TableHead>
                        <TableHead>Entry Method</TableHead>
                        <TableHead>Staff Member</TableHead>
                        <TableHead className="text-right">Note</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence initial={false}>
                        {history.map((record) => (
                            <motion.tr
                                key={record.id}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                className="group hover:bg-gray-50/50 dark:hover:bg-zinc-800/50 transition-colors border-gray-100 dark:border-zinc-800"
                                style={{ display: 'table-row' }} // Fix for frame-motion on tr
                            >
                                <TableCell className="font-medium text-gray-900 dark:text-white">
                                    {record.clientName}
                                </TableCell>
                                <TableCell className="text-gray-500 dark:text-gray-400">
                                    {format(record.date, "MM/dd/yyyy")}
                                </TableCell>
                                <TableCell className="text-gray-500 dark:text-gray-400">
                                    {format(record.date, "hh:mm a")}
                                </TableCell>
                                <TableCell>
                                    <Badge
                                        variant="secondary"
                                        className={
                                            record.method === "QR Code"
                                                ? "bg-blue-100 text-blue-700 dark:bg-blue-500/20 dark:text-blue-300 gap-1"
                                                : "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300 gap-1"
                                        }
                                    >
                                        {record.method === "QR Code" ? <QrCode className="w-3 h-3" /> : <User className="w-3 h-3" />}
                                        {record.method}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-500 dark:text-gray-400">
                                    {record.staff || "—"}
                                </TableCell>
                                <TableCell className="text-right text-gray-500 dark:text-gray-400 italic">
                                    {record.note || "—"}
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>

            {history.length === 0 && (
                <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                    No check-ins recorded yet today.
                </div>
            )}
        </div>
    );
}
