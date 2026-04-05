"use client";

import { useState } from "react";
import { Search, Plus, User, CreditCard, ArrowRight } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

// Mock Data
const MOCK_CLIENTS = [
    { id: "1", name: "John Smith", email: "john@example.com", plan: "Premium", balance: 45.50, status: "Active", avatar: "https://i.pravatar.cc/150?u=john", category: "Member" },
    { id: "2", name: "Emily Taylor", email: "emily@example.com", plan: "Basic", balance: -12.00, status: "Active", avatar: "https://i.pravatar.cc/150?u=emily", category: "Member" },
    { id: "3", name: "David Martinez", email: "david@example.com", plan: "Premium", balance: 0.00, status: "Active", avatar: "https://i.pravatar.cc/150?u=david", category: "Member" },
    { id: "4", name: "Sarah Wilson", email: "sarah@example.com", plan: "Pro", balance: 150.00, status: "Inactive", avatar: "https://i.pravatar.cc/150?u=sarah", category: "Member" },
];

interface ClientSearchProps {
    onNewSale: (client: any) => void;
}

export function ClientSearch({ onNewSale }: ClientSearchProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const filteredClients = MOCK_CLIENTS.filter(client =>
        client.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        client.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const handleCheckIn = (clientName: string) => {
        toast.success(`Checked in ${clientName}`, {
            description: "Access granted. Enjoy your workout!",
            duration: 3000,
        });
    };

    return (
        <div className="space-y-4">
            <div className="flex flex-col gap-2">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Client Search</h3>
                <div className="relative">
                    <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                        placeholder="Search by name or email..."
                        className="pl-12 h-12 text-lg bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-800 rounded-xl focus:ring-2 focus:ring-purple-500/20"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
            </div>

            <div className="space-y-3">
                <AnimatePresence>
                    {searchTerm && filteredClients.map((client) => (
                        <motion.div
                            key={client.id}
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="bg-white dark:bg-zinc-900 rounded-xl p-4 border border-gray-100 dark:border-zinc-800 shadow-sm flex items-center justify-between group hover:border-purple-200 dark:hover:border-purple-500/30 transition-colors"
                        >
                            <div className="flex items-center gap-4">
                                <Avatar className="w-12 h-12 border-2 border-white dark:border-zinc-800">
                                    <AvatarImage src={client.avatar} />
                                    <AvatarFallback>{client.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h4 className="font-semibold text-gray-900 dark:text-white flex items-center gap-2">
                                        {client.name}
                                        <Badge variant="outline" className={`text-xs ${client.plan === "Premium" ? "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/20 dark:text-purple-300 dark:border-purple-500/30" :
                                                "bg-gray-50 text-gray-600 border-gray-200 dark:bg-zinc-800 dark:text-gray-400"
                                            }`}>
                                            {client.plan}
                                        </Badge>
                                    </h4>
                                    <div className="flex items-center gap-3 text-sm text-muted-foreground">
                                        <span>{client.email}</span>
                                        <span className="w-1 h-1 rounded-full bg-gray-300 dark:bg-zinc-700" />
                                        <span className={client.balance < 0 ? "text-red-500 font-medium" : "text-green-600 font-medium"}>
                                            Balance: ${client.balance.toFixed(2)}
                                        </span>
                                    </div>
                                </div>
                            </div>

                            <div className="flex items-center gap-2">
                                <Button
                                    className="bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                    onClick={() => handleCheckIn(client.name)}
                                >
                                    Check In
                                </Button>
                                <Button
                                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-sm"
                                    onClick={() => onNewSale(client)}
                                >
                                    <Plus className="w-4 h-4 mr-2" />
                                    New Sale
                                </Button>
                                <Button variant="outline" className="border-gray-200 dark:border-zinc-800 hover:bg-gray-50 dark:hover:bg-zinc-800">
                                    View Account
                                </Button>
                            </div>
                        </motion.div>
                    ))}

                    {searchTerm && filteredClients.length === 0 && (
                        <div className="text-center py-8 text-gray-500 dark:text-gray-400">
                            No clients found matching "{searchTerm}"
                        </div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}
