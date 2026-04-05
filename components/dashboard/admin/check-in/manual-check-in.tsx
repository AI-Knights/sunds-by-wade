"use client";

import { useState } from "react";
import { Search, UserCheck } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { motion, AnimatePresence } from "framer-motion";

// Mock Clients for search suggestion
const MOCK_CLIENTS = [
    { id: "1", name: "John Smith", email: "john@example.com", avatar: "https://i.pravatar.cc/150?u=john", status: "Active" },
    { id: "2", name: "Emily Taylor", email: "emily@example.com", avatar: "https://i.pravatar.cc/150?u=emily", status: "Active" },
    { id: "3", name: "David Martinez", email: "david@example.com", avatar: "https://i.pravatar.cc/150?u=david", status: "Active" },
    { id: "4", name: "Sarah Johnson", email: "sarah@example.com", avatar: "https://i.pravatar.cc/150?u=sarah", status: "Active" },
    { id: "5", name: "Mike Chen", email: "mike@example.com", avatar: "https://i.pravatar.cc/150?u=mike", status: "Active" },
];

interface ManualCheckInProps {
    onCheckIn: (scanData: any) => void;
}

export function ManualCheckIn({ onCheckIn }: ManualCheckInProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [note, setNote] = useState("");
    const [selectedClient, setSelectedClient] = useState<any>(null);

    const filteredClients = searchTerm.length > 0
        ? MOCK_CLIENTS.filter(c => c.name.toLowerCase().includes(searchTerm.toLowerCase()) && !selectedClient)
        : [];

    const handleSelectClient = (client: any) => {
        setSelectedClient(client);
        setSearchTerm(client.name);
    };

    const handleCheckIn = () => {
        if (!selectedClient && !searchTerm) {
            toast.error("Please select a client or enter a name");
            return;
        }

        const clientName = selectedClient ? selectedClient.name : searchTerm;
        // Mock check-in data
        const checkInData = {
            id: `ci-${Date.now()}`,
            clientName,
            clientAvatar: selectedClient?.avatar,
            date: new Date(),
            method: "Manual",
            staff: "Admin User",
            note: note || undefined,
            type: "Manual"
        };

        onCheckIn(checkInData);

        // Reset
        setSearchTerm("");
        setNote("");
        setSelectedClient(null);
        toast.success(`Checked in ${clientName}`);
    };

    return (
        <div className="bg-white dark:bg-zinc-900 rounded-xl p-6 border border-gray-100 dark:border-zinc-800 shadow-sm space-y-6">
            <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Manual Check-In</h3>
                <p className="text-sm text-gray-500 dark:text-gray-400">Search client or scan membership card...</p>
            </div>

            <div className="space-y-4">
                <div className="space-y-2 relative">
                    <Label>Search Client</Label>
                    <div className="relative">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Enter client name or scan membership card..."
                            className="pl-10 bg-gray-50 dark:bg-zinc-800/50"
                            value={searchTerm}
                            onChange={(e) => {
                                setSearchTerm(e.target.value);
                                setSelectedClient(null); // Clear selection on edit
                            }}
                        />
                    </div>
                    {/* Suggestions Dropdown */}
                    <AnimatePresence>
                        {filteredClients.length > 0 && (
                            <motion.div
                                initial={{ opacity: 0, y: -10 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -10 }}
                                className="absolute z-10 w-full mt-1 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-zinc-800 rounded-lg shadow-lg overflow-hidden"
                            >
                                {filteredClients.map(client => (
                                    <div
                                        key={client.id}
                                        className="p-3 hover:bg-gray-50 dark:hover:bg-zinc-800 cursor-pointer flex items-center gap-3 transition-colors"
                                        onClick={() => handleSelectClient(client)}
                                    >
                                        <Avatar className="w-8 h-8">
                                            <AvatarImage src={client.avatar} />
                                            <AvatarFallback>{client.name[0]}</AvatarFallback>
                                        </Avatar>
                                        <span className="text-sm font-medium text-gray-900 dark:text-white">{client.name}</span>
                                    </div>
                                ))}
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                <div className="space-y-2">
                    <Label>Note (Optional)</Label>
                    <Input
                        placeholder="e.g., Forgot phone, Guest pass"
                        className="bg-gray-50 dark:bg-zinc-800/50"
                        value={note}
                        onChange={(e) => setNote(e.target.value)}
                    />
                </div>

                <Button
                    className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25 h-12 text-base"
                    onClick={handleCheckIn}
                >
                    <UserCheck className="w-5 h-5 mr-2" />
                    Check In Client
                </Button>
            </div>
        </div>
    );
}
