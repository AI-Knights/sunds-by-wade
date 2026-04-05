"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { formatDistanceToNow } from "date-fns";

interface Transaction {
    id: string;
    clientName: string;
    description: string;
    amount: number;
    timestamp: Date;
    avatar: string;
}

interface RecentTransactionsProps {
    transactions: Transaction[];
}

export function RecentTransactions({ transactions }: RecentTransactionsProps) {
    return (
        <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Recent Transactions</h3>

            <div className="bg-white dark:bg-zinc-900 rounded-xl shadow-sm border border-gray-100 dark:border-white/5 overflow-hidden">
                {transactions.length === 0 ? (
                    <div className="p-8 text-center text-gray-500 dark:text-gray-400">
                        No transactions yet today.
                    </div>
                ) : (
                    <div className="divide-y divide-gray-100 dark:divide-white/5">
                        {transactions.map((transaction) => (
                            <div key={transaction.id} className="p-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
                                <div className="flex items-center gap-4">
                                    <Avatar className="w-10 h-10 border border-gray-100 dark:border-white/10">
                                        <AvatarImage src={transaction.avatar} />
                                        <AvatarFallback>{transaction.clientName[0]}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium text-gray-900 dark:text-white">{transaction.clientName}</p>
                                        <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                            <span>{transaction.description}</span>
                                            <span>•</span>
                                            <span>{formatDistanceToNow(transaction.timestamp, { addSuffix: true })}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="font-bold text-gray-900 dark:text-white">
                                    ${transaction.amount.toFixed(2)}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}
