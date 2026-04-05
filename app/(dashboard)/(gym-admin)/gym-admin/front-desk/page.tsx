"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { StatsGrid } from "@/components/dashboard/admin/front-desk/stats-grid";
import { ClientSearch } from "@/components/dashboard/admin/front-desk/client-search";
import { RecentTransactions } from "@/components/dashboard/admin/front-desk/recent-transactions";
import { ManualSaleModal } from "@/components/dashboard/admin/front-desk/manual-sale-modal";
import { toast } from "sonner";

// Initial Mock Transactions
const INITIAL_TRANSACTIONS = [
    { id: "t1", clientName: "John Smith", description: "Protein Bar x2", amount: 7.98, timestamp: new Date(Date.now() - 1000 * 60 * 2), avatar: "https://i.pravatar.cc/150?u=john" }, // 2 mins ago
    { id: "t2", clientName: "Emily Taylor", description: "Day Pass", amount: 25.00, timestamp: new Date(Date.now() - 1000 * 60 * 15), avatar: "https://i.pravatar.cc/150?u=emily" }, // 15 mins ago
    { id: "t3", clientName: "David Martinez", description: "Water Bottle", amount: 14.99, timestamp: new Date(Date.now() - 1000 * 60 * 32), avatar: "https://i.pravatar.cc/150?u=david" }, // 32 mins ago
];

export default function FrontDeskPage() {
    const [transactions, setTransactions] = useState(INITIAL_TRANSACTIONS);
    const [isSaleModalOpen, setIsSaleModalOpen] = useState(false);
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const handleNewSale = (client: any) => {
        setSelectedClient(client);
        setIsSaleModalOpen(true);
    };

    const handleCompleteSale = (saleData: any) => {
        const newTransaction = {
            id: `t${Date.now()}`,
            clientName: saleData.client.name,
            description: `${saleData.product.name} x${saleData.quantity}`,
            amount: saleData.total,
            timestamp: new Date(),
            avatar: saleData.client.avatar
        };

        setTransactions([newTransaction, ...transactions]);
        toast.success("Sale Completed", {
            description: `Successfully charged $${saleData.total.toFixed(2)} to ${saleData.client.name}`,
        });
    };

    return (
        <div className="space-y-8 p-1">
            {/* <Header /> */}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Front Desk</h1>
                <p className="text-muted-foreground">Manual POS and operations panel</p>
            </div>

            <StatsGrid />

            <div className="bg-gray-50/50 dark:bg-white/5 rounded-2xl p-6 border border-gray-100 dark:border-white/5 space-y-8">
                <ClientSearch onNewSale={handleNewSale} />
                <RecentTransactions transactions={transactions} />
            </div>

            <ManualSaleModal
                isOpen={isSaleModalOpen}
                onClose={() => setIsSaleModalOpen(false)}
                client={selectedClient}
                onComplete={handleCompleteSale}
            />
        </div>
    );
}
