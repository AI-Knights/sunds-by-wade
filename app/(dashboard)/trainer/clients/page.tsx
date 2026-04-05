"use client";

import { CLIENTS } from "@/constants/data";
import { ClientCard } from "@/components/dashboard/client-card";
import { Input } from "@/components/ui/input";
import { Search, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function ClientsPage() {
    return (
        <div className="space-y-8 pb-10">
            {/* Header */}
            <div>
                <h1 className="text-3xl font-bold text-gray-900 dark:text-pink-100 tracking-tight">Clients</h1>
                <p className="text-gray-500 mt-1">Manage and track your assigned clients</p>
            </div>

            {/* Filters */}
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative  flex-1">
                    <Search className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
                    <Input
                        placeholder="Search clients by name or email..."
                        className="pl-10 bg-white dark:bg-transparent outline-none  dark:text-gray-500 text-gray-900  "
                    />
                </div>
                <div className="flex gap-3">
                    <Button variant="outline" className="text-gray-600 border-gray-200">
                        All Status <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                    <Button variant="outline" className="text-gray-600 border-gray-200">
                        All Memberships <ChevronDown className="ml-2 h-4 w-4" />
                    </Button>
                </div>
            </div>

            {/* Clients Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {CLIENTS.map((client, index) => (
                    <ClientCard key={client.id} client={client} index={index} />
                ))}
            </div>
        </div>
    );
}
