"use client";

import { useState } from "react";
import { Search, Filter, Eye, Check, X, MessageSquare, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Header } from "@/components/dashboard/header";
import { ApproveModal } from "@/components/dashboard/admin/request/approve-modal";
import { RejectModal } from "@/components/dashboard/admin/request/reject-modal";
import { RequestDetailsModal } from "@/components/dashboard/admin/request/request-details-modal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data
interface Lead {
    id: string;
    name: string;
    email: string;
    phone: string;
    status: 'Join Request' | 'Approved' | 'Rejected';
    membershipPlan: string;
    notes: string;
    avatar: string;
}

const MOCK_LEADS: Lead[] = [
    { id: "1", name: "Alex Johnson", email: "alex@example.com", phone: "555-0101", status: "Join Request", membershipPlan: "Pro Plan", notes: "Requested to join from mobile app", avatar: "https://i.pravatar.cc/150?u=alex" },
    { id: "2", name: "Maria Garcia", email: "maria@example.com", phone: "555-0102", status: "Join Request", membershipPlan: "Pro Plan", notes: "Requested to join from mobile app", avatar: "https://i.pravatar.cc/150?u=maria" },
    { id: "3", name: "David Lee", email: "david@example.com", phone: "555-0103", status: "Join Request", membershipPlan: "Pro Plan", notes: "Requested to join from mobile app", avatar: "https://i.pravatar.cc/150?u=david" },
    { id: "4", name: "Sophie Martin", email: "sophie@example.com", phone: "555-0104", status: "Join Request", membershipPlan: "Pro Plan", notes: "Requested to join from mobile app", avatar: "https://i.pravatar.cc/150?u=sophie" },
    { id: "5", name: "James Wilson", email: "james@example.com", phone: "555-0105", status: "Join Request", membershipPlan: "Pro Plan", notes: "Join request from app", avatar: "https://i.pravatar.cc/150?u=james" },
    { id: "6", name: "Emily Brown", email: "emily@example.com", phone: "555-0106", status: "Approved", membershipPlan: "Basic", notes: "Join request approved", avatar: "https://i.pravatar.cc/150?u=emily" },
    { id: "7", name: "Robert Chen", email: "robert@example.com", phone: "555-0107", status: "Rejected", membershipPlan: "Elite", notes: "Join request rejected - outside service area", avatar: "https://i.pravatar.cc/150?u=robert" },
];

export default function RequestPage() {
    const [leads, setLeads] = useState<Lead[]>(MOCK_LEADS);
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLead, setSelectedLead] = useState<Lead | null>(null);

    // Modal States
    const [isApproveOpen, setIsApproveOpen] = useState(false);
    const [isRejectOpen, setIsRejectOpen] = useState(false);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);

    const filteredLeads = leads.filter(lead =>
        lead.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        lead.email.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleOpenApprove = (lead: Lead) => {
        setSelectedLead(lead);
        setIsApproveOpen(true);
    };

    const handleOpenReject = (lead: Lead) => {
        setSelectedLead(lead);
        setIsRejectOpen(true);
    };

    const handleOpenDetails = (lead: Lead) => {
        setSelectedLead(lead);
        setIsDetailsOpen(true);
    };

    const handleApprove = (data: any) => {
        if (!selectedLead) return;
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, status: "Approved" } : l));
        // close details if open
        setIsDetailsOpen(false);
    };

    const handleReject = (data: any) => {
        if (!selectedLead) return;
        setLeads(prev => prev.map(l => l.id === selectedLead.id ? { ...l, status: "Rejected" } : l));
        // close details if open
        setIsDetailsOpen(false);
    };

    // Stats
    const totalLeads = leads.length;
    const joinRequests = leads.filter(l => l.status === "Join Request").length;
    const approved = leads.filter(l => l.status === "Approved").length;
    const rejected = leads.filter(l => l.status === "Rejected").length;

    return (
        <div className="space-y-6 p-1">
            {/* <Header /> */}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Leads</h1>
                <p className="text-muted-foreground">Track and convert potential members • Approval hub for join requests</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-5 gap-4">
                <StatsCard title="Total Leads" value={totalLeads} />
                <StatsCard title="Join Requests" value={joinRequests} highlight />
                <StatsCard title="Guest Users" value={1} />
                <StatsCard title="Rejected" value={rejected} />
                <StatsCard title="Approved" value={approved} />
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search leads..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-white dark:bg-card/50 border-gray-200 dark:border-white/10"
                    />
                </div>
                <Button variant="outline" className="bg-white dark:bg-card/50 border-gray-200 dark:border-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </Button>
            </div>

            {/* Leads Table */}
            <div className="bg-white dark:bg-card/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-gray-100 dark:border-white/5">
                            <TableHead className="w-[250px]">User</TableHead>
                            <TableHead>Contact</TableHead>
                            <TableHead>Status</TableHead>
                            <TableHead>Membership</TableHead>
                            <TableHead className="hidden md:table-cell">Notes</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filteredLeads.map((lead) => (
                                <TableRow key={lead.id} className="group border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                                    <TableCell>
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden">
                                                <img src={lead.avatar} alt={lead.name} className="w-full h-full object-cover" />
                                            </div>
                                            <span className="font-medium text-gray-900 dark:text-white">{lead.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <div className="flex flex-col text-sm text-gray-500 dark:text-gray-400">
                                            <span>{lead.email}</span>
                                            <span className="text-xs opacity-80">{lead.phone}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={cn(
                                                "font-normal",
                                                lead.status === "Join Request" && "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300",
                                                lead.status === "Approved" && "bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300",
                                                lead.status === "Rejected" && "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-300"
                                            )}
                                        >
                                            {lead.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="outline" className={cn(
                                            "bg-green-50 text-green-700 border-green-200 dark:bg-green-900/10 dark:text-green-400 dark:border-green-900/20",
                                            lead.membershipPlan === "Basic" && "bg-blue-50 text-blue-700 border-blue-200 dark:bg-blue-900/10 dark:text-blue-400 dark:border-blue-900/20",
                                            lead.membershipPlan === "Elite" && "bg-purple-50 text-purple-700 border-purple-200 dark:bg-purple-900/10 dark:text-purple-400 dark:border-purple-900/20"
                                        )}>
                                            {lead.membershipPlan}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="hidden md:table-cell text-muted-foreground text-sm truncate max-w-[200px]">
                                        {lead.notes}
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300"
                                                onClick={() => handleOpenDetails(lead)}
                                            >
                                                <Eye className="w-4 h-4" />
                                            </Button>

                                            {lead.status === "Join Request" && (
                                                <>
                                                    <Button
                                                        size="sm"
                                                        className="h-8 bg-green-600 hover:bg-green-700 text-white shadow-sm"
                                                        onClick={() => handleOpenApprove(lead)}
                                                    >
                                                        <Check className="w-3.5 h-3.5 mr-1" />
                                                        Accept
                                                    </Button>
                                                    <Button
                                                        size="sm"
                                                        variant="destructive"
                                                        className="h-8 shadow-sm"
                                                        onClick={() => handleOpenReject(lead)}
                                                    >
                                                        <X className="w-3.5 h-3.5 mr-1" />
                                                        Reject
                                                    </Button>
                                                </>
                                            )}

                                            {lead.status !== "Join Request" && (
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-400">
                                                    <MessageSquare className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            {/* Modals */}
            <ApproveModal
                isOpen={isApproveOpen}
                onClose={() => setIsApproveOpen(false)}
                onApprove={handleApprove}
                userName={selectedLead?.name || ""}
            />
            <RejectModal
                isOpen={isRejectOpen}
                onClose={() => setIsRejectOpen(false)}
                onReject={handleReject}
                userName={selectedLead?.name || ""}
            />
            <RequestDetailsModal
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
                lead={selectedLead}
                onApprove={() => {
                    setIsApproveOpen(true);
                    // keep details open? or close? let's keep details open until approved actions starts
                }}
                onReject={() => {
                    setIsRejectOpen(true);
                }}
            />
        </div>
    );
}

function StatsCard({ title, value, highlight = false }: { title: string, value: number, highlight?: boolean }) {
    return (
        <div className="bg-white dark:bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
            <p className={cn("text-xs font-medium", highlight ? "text-purple-600 dark:text-purple-400" : "text-gray-500 dark:text-gray-400")}>{title}</p>
            <h3 className={cn("text-2xl font-bold mt-1", highlight ? "text-purple-700 dark:text-purple-300" : "text-gray-900 dark:text-white")}>{value}</h3>
        </div>
    );
}
