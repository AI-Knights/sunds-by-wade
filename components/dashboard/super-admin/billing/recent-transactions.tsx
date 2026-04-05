"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion } from "framer-motion";

const TRANSACTIONS = [
    { id: "PAY-2024-001", user: "Sarah Mitchell", plan: "Annual", amount: "$12,000", date: "Mar 15, 2024", status: "Success" },
    { id: "PAY-2024-002", user: "Emily Chen", plan: "Monthly", amount: "$12,000", date: "Dec 10, 2024", status: "Success" },
    { id: "PAY-2024-003", user: "Michael Johnson", plan: "Monthly", amount: "$12,000", date: "Dec 8, 2024", status: "Failed" },
    { id: "PAY-2024-004", user: "Olivia Rodriguez", plan: "Annual", amount: "$12,000", date: "Jan 8, 2024", status: "Success" },
    { id: "PAY-2024-005", user: "Daniel Brown", plan: "Monthly", amount: "$12,000", date: "Dec 4, 2024", status: "Pending" },
];

export function RecentTransactions() {
    const getStatusBadge = (status: string) => {
        switch (status) {
            case "Success":
                return <Badge className="bg-emerald-500 hover:bg-emerald-600 text-white border-0"><span className="mr-1">✓</span> Success</Badge>;
            case "Failed":
                return <Badge variant="destructive" className="bg-red-500 hover:bg-red-600 border-0"><span className="mr-1">✕</span> Failed</Badge>;
            case "Pending":
                return <Badge variant="secondary" className="bg-yellow-500/20 text-yellow-600 hover:bg-yellow-500/30 border-0"><span className="mr-1">🕒</span> Pending</Badge>;
            default:
                return <Badge variant="secondary">{status}</Badge>;
        }
    };

    const getPlanBadge = (plan: string) => {
        return (
            <Badge variant="secondary" className="bg-fuchsia-500/10 text-fuchsia-500 hover:bg-fuchsia-500/20 border-0 font-normal">
                {plan}
            </Badge>
        );
    }

    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Recent Transactions</CardTitle>
                <div className="w-[300px]">
                    <Input placeholder="Search by Transaction ID" className="h-9" />
                </div>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-100 dark:border-white/5 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-fuchsia-50/50 dark:bg-white/5">
                            <TableRow>
                                <TableHead className="font-semibold text-xs text-gray-500">Transaction ID</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500">User</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500">Plan</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500">Amount</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500">Date</TableHead>
                                <TableHead className="font-semibold text-xs text-gray-500">Status</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {TRANSACTIONS.map((tx, index) => (
                                <motion.tr
                                    key={tx.id}
                                    initial={{ opacity: 0, x: -10 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    transition={{ delay: index * 0.05 }}
                                    className="border-b last:border-0 hover:bg-gray-50 dark:hover:bg-white/5 transition-colors"
                                >
                                    <TableCell className="font-medium text-gray-600 dark:text-gray-400 text-sm">{tx.id}</TableCell>
                                    <TableCell className="font-medium text-gray-900 dark:text-white">{tx.user}</TableCell>
                                    <TableCell>{getPlanBadge(tx.plan)}</TableCell>
                                    <TableCell className="font-medium text-gray-900 dark:text-white">{tx.amount}</TableCell>
                                    <TableCell className="text-gray-500 text-sm">{tx.date}</TableCell>
                                    <TableCell>{getStatusBadge(tx.status)}</TableCell>
                                </motion.tr>
                            ))}
                        </TableBody>
                    </Table>
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end space-x-2 py-4">
                    <Button variant="outline" size="icon" className="h-8 w-8" disabled>
                        &lt;
                    </Button>
                    <Button variant="default" size="icon" className="h-8 w-8 bg-purple-600 hover:bg-purple-700 text-white">
                        1
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        2
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        3
                    </Button>
                    <span className="text-sm text-gray-500 mx-1">...</span>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        10
                    </Button>
                    <Button variant="outline" size="icon" className="h-8 w-8">
                        &gt;
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
