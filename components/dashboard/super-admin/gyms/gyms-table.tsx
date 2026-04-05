"use client";

import * as React from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Search,
    MoreHorizontal,
    Filter,
    Eye,
    RotateCcw,
    Ban,
    PauseCircle,
    AlertTriangle
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle
} from "@/components/ui/dialog";

// Mock Data
const GYMS = [
    {
        id: "gym-1",
        name: "FitZone Downtown",
        location: "New York, NY",
        owner: "owner@fitzone.com",
        status: "Active",
        members: 457,
        trainers: 18,
        revenue: "$38,450",
        created: "3/15/2024"
    },
    {
        id: "gym-2",
        name: "Powerhouse Athletics",
        location: "Los Angeles, CA",
        owner: "admin@powerhouse.com",
        status: "Active",
        members: 892,
        trainers: 32,
        revenue: "$72,340",
        created: "11/20/2023"
    },
    {
        id: "gym-3",
        name: "Core Fitness Studio",
        location: "Chicago, IL",
        owner: "info@corefitness.com",
        status: "Active",
        members: 234,
        trainers: 12,
        revenue: "$18,920",
        created: "1/8/2025"
    },
    {
        id: "gym-4",
        name: "Elite Training Center",
        location: "Miami, FL",
        owner: "contact@elitetraining.com",
        status: "Paused",
        members: 156,
        trainers: 8,
        revenue: "$12,450",
        created: "8/12/2024"
    },
    {
        id: "gym-5",
        name: "Apex Performance Gym",
        location: "Austin, TX",
        owner: "owner@apexperformance.com",
        status: "Active",
        members: 623,
        trainers: 24,
        revenue: "$51,230",
        created: "5/22/2024"
    },
    {
        id: "gym-6",
        name: "Iron Works Fitness",
        location: "Seattle, WA",
        owner: "admin@ironworks.com",
        status: "Suspended",
        members: 91,
        trainers: 5,
        revenue: "$7,320",
        created: "10/3/2024"
    },
    {
        id: "gym-7",
        name: "Momentum Training Hub",
        location: "Boston, MA",
        owner: "info@momentumhub.com",
        status: "Active",
        members: 445,
        trainers: 16,
        revenue: "$36,780",
        created: "2/18/2024"
    },
    {
        id: "gym-8",
        name: "Peak Condition Athletic Club",
        location: "Denver, CO",
        owner: "contact@peakcondition.com",
        status: "Active",
        members: 731,
        trainers: 28,
        revenue: "$64,920",
        created: "9/14/2023"
    }

];

export function GymsTable() {
    const [searchTerm, setSearchTerm] = useState("");
    const [statusFilter, setStatusFilter] = useState("All status");

    // Modal States
    const [resetModalOpen, setResetModalOpen] = useState(false);
    const [suspendModalOpen, setSuspendModalOpen] = useState(false);
    const [reactivateModalOpen, setReactivateModalOpen] = useState(false);
    const [selectedGym, setSelectedGym] = useState<any>(null);

    const filteredGyms = GYMS.filter(gym => {
        const matchesSearch = gym.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gym.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
            gym.owner.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesStatus = statusFilter === "All status" || gym.status === statusFilter;
        return matchesSearch && matchesStatus;
    });

    const handleAction = (gym: any, action: string) => {
        setSelectedGym(gym);
        if (action === "reset") setResetModalOpen(true);
        if (action === "suspend") setSuspendModalOpen(true);
        if (action === "reactivate") setReactivateModalOpen(true);
    };

    return (
        <div className="space-y-4">
            {/* Filters */}
            <div className="flex flex-col sm:flex-row gap-4 justify-between">
                <div className="relative flex-1 max-w-sm">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-500 w-4 h-4" />
                    <Input
                        placeholder="Search gyms by name, location, or owner email..."
                        className="pl-10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[140px] justify-between">
                            {statusFilter}
                            <Filter className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuItem onClick={() => setStatusFilter("All status")}>All status</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("Active")}>Active</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("Paused")}>Paused</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setStatusFilter("Suspended")}>Suspended</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>

            {/* Table */}
            <div className="rounded-md border border-gray-200 dark:border-white/10 overflow-hidden dark:bg-zinc-900 bg-white shadow-sm">
                <Table>
                    <TableHeader className="bg-gray-50 dark:bg-white/5">
                        <TableRow>
                            <TableHead className="w-[250px]">GYM NAME</TableHead>
                            <TableHead>LOCATION</TableHead>
                            <TableHead>OWNER / ADMIN</TableHead>
                            <TableHead>STATUS</TableHead>
                            <TableHead>MEMBERS</TableHead>
                            <TableHead>TRAINERS</TableHead>
                            <TableHead>REVENUE</TableHead>
                            <TableHead>CREATED</TableHead>
                            <TableHead className="text-right">ACTIONS</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filteredGyms.map((gym, index) => (
                                <motion.tr
                                    key={gym.id}
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    transition={{ duration: 0.2, delay: index * 0.05 }}
                                    className="border-b transition-colors hover:bg-muted/50 data-[state=selected]:bg-muted"
                                >
                                    <TableCell className="font-medium flex items-center gap-3">
                                        <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                            <BuildingIcon className="w-4 h-4 text-gray-500" />
                                        </div>
                                        {gym.name}
                                    </TableCell>
                                    <TableCell className="text-gray-500 text-xs">{gym.location}</TableCell>
                                    <TableCell className="text-gray-500 text-xs">{gym.owner}</TableCell>
                                    <TableCell>
                                        <Badge
                                            variant="secondary"
                                            className={`${gym.status === "Active" ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20" :
                                                gym.status === "Paused" ? "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20" :
                                                    "bg-red-500/10 text-red-500 hover:bg-red-500/20"
                                                } border-0`}
                                        >
                                            {gym.status}
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-xs">{gym.members}</TableCell>
                                    <TableCell className="text-xs">{gym.trainers}</TableCell>
                                    <TableCell className="text-xs">{gym.revenue}</TableCell>
                                    <TableCell className="text-gray-500 text-xs">{gym.created}</TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex items-center justify-end gap-2">
                                            <Link href={`/super-admin/gyms/${gym.id}`}>
                                                <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                            </Link>

                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-100 dark:hover:bg-orange-500/10"
                                                onClick={() => handleAction(gym, "reset")}
                                            >
                                                <RotateCcw className="w-4 h-4" />
                                            </Button>

                                            {gym.status !== "Suspended" ? (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-100 dark:hover:bg-red-500/10"
                                                    onClick={() => handleAction(gym, "suspend")}
                                                >
                                                    <Ban className="w-4 h-4" />
                                                </Button>
                                            ) : (
                                                <Button
                                                    variant="ghost"
                                                    size="icon"
                                                    className="h-8 w-8 text-emerald-500 hover:text-emerald-600 hover:bg-emerald-100 dark:hover:bg-emerald-500/10"
                                                    onClick={() => handleAction(gym, "reactivate")}
                                                >
                                                    <PauseCircle className="w-4 h-4" />
                                                </Button>
                                            )}
                                        </div>
                                    </TableCell>
                                </motion.tr>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>
            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4">
                <Button variant="outline" size="sm" className="h-8 w-8 p-0" disabled>
                    &lt;
                </Button>
                <Button variant="default" size="sm" className="h-8 w-8 p-0 bg-indigo-600 hover:bg-indigo-700 text-white">
                    1
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    2
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    3
                </Button>
                <span className="text-sm text-gray-500">...</span>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    10
                </Button>
                <Button variant="outline" size="sm" className="h-8 w-8 p-0">
                    &gt;
                </Button>
            </div>

            {/* Modals */}
            <ResetAccessModal open={resetModalOpen} onOpenChange={setResetModalOpen} gymName={selectedGym?.name} />
            <SuspendGymModal open={suspendModalOpen} onOpenChange={setSuspendModalOpen} gymName={selectedGym?.name} />
            <ReactivateGymModal open={reactivateModalOpen} onOpenChange={setReactivateModalOpen} gymName={selectedGym?.name} />
        </div>
    );
}

function BuildingIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <rect width="16" height="20" x="4" y="2" rx="2" ry="2" />
            <path d="M9 22v-4h6v4" />
            <path d="M8 6h.01" />
            <path d="M16 6h.01" />
            <path d="M12 6h.01" />
            <path d="M12 10h.01" />
            <path d="M12 14h.01" />
            <path d="M16 10h.01" />
            <path d="M16 14h.01" />
            <path d="M8 10h.01" />
            <path d="M8 14h.01" />
        </svg>
    )
}

function ResetAccessModal({ open, onOpenChange, gymName }: { open: boolean, onOpenChange: (open: boolean) => void, gymName: string }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2 text-orange-500 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                        <DialogTitle>Reset Admin Access</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to reset admin access for <span className="font-bold text-black dark:text-white">{gymName}</span>?
                        This will log out all administrators and require password reset.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => onOpenChange(false)}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function SuspendGymModal({ open, onOpenChange, gymName }: { open: boolean, onOpenChange: (open: boolean) => void, gymName: string }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2 text-red-500 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                        <DialogTitle>Suspend Gym</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to suspend <span className="font-bold text-black dark:text-white">{gymName}</span>?
                        This will prevent all gym operations until reactivated.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white" onClick={() => onOpenChange(false)}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}

function ReactivateGymModal({ open, onOpenChange, gymName }: { open: boolean, onOpenChange: (open: boolean) => void, gymName: string }) {
    return (
        <Dialog open={open} onOpenChange={onOpenChange}>
            <DialogContent>
                <DialogHeader>
                    <div className="flex items-center gap-2 text-emerald-500 mb-2">
                        <AlertTriangle className="w-5 h-5" />
                        <DialogTitle>Reactivate Gym</DialogTitle>
                    </div>
                    <DialogDescription>
                        Are you sure you want to reactivate <span className="font-bold text-black dark:text-white">{gymName}</span>?
                        This will restore all gym operations.
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="mt-4">
                    <Button variant="outline" onClick={() => onOpenChange(false)}>Cancel</Button>
                    <Button className="bg-emerald-600 hover:bg-emerald-700 text-white" onClick={() => onOpenChange(false)}>Confirm</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
