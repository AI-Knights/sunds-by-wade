"use client";

import { useState } from "react";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Input } from "@/components/ui/input";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
    Search,
    Filter,
    MoreHorizontal,
    Eye,
    Mail,
    Edit,
    Trash2,
    ChevronLeft,
    ChevronRight,
    Shield
} from "lucide-react";
import { USERS } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";

interface UsersTableProps {
    onViewUser: (user: any) => void;
}

export function UsersTable({ onViewUser }: UsersTableProps) {
    const [searchTerm, setSearchTerm] = useState("");
    const [roleFilter, setRoleFilter] = useState("All Users");
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    // Filter Users
    const filteredUsers = USERS.filter((user) => {
        const matchesSearch = user.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
            user.email.toLowerCase().includes(searchTerm.toLowerCase());
        const matchesRole = roleFilter === "All Users" ||
            (roleFilter === "Clients" && user.role === "Client") ||
            (roleFilter === "Trainers" && user.role === "Trainer") ||
            (roleFilter === "Associates" && user.role === "Associate") ||
            (roleFilter === "Admins & Moderators" && (user.role === "Admin" || user.role === "Moderator"));

        return matchesSearch && matchesRole;
    });

    // Pagination Logic
    const totalPages = Math.ceil(filteredUsers.length / itemsPerPage);
    const startIndex = (currentPage - 1) * itemsPerPage;
    const currentUsers = filteredUsers.slice(startIndex, startIndex + itemsPerPage);

    const getRoleBadgeColor = (role: string) => {
        switch (role) {
            case "Client": return "bg-gray-100 text-gray-800 dark:bg-gray-800 dark:text-gray-300";
            case "Trainer": return "bg-green-100 text-green-800 dark:bg-green-900/30 dark:text-green-400";
            case "Associate": return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900/30 dark:text-yellow-400";
            case "Moderator": return "bg-blue-100 text-blue-800 dark:bg-blue-900/30 dark:text-blue-400";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusColor = (status: string) => {
        switch (status) {
            case "Active": return "bg-emerald-100 text-emerald-800 dark:bg-emerald-900/30 dark:text-emerald-400";
            case "Paused": return "bg-orange-100 text-orange-800 dark:bg-orange-900/30 dark:text-orange-400";
            case "Inactive": return "bg-red-100 text-red-800 dark:bg-red-900/30 dark:text-red-400";
            default: return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="space-y-4">
            {/* Search and Filters */}
            <div className="flex flex-col sm:flex-row gap-4 items-center justify-between bg-white dark:bg-card/50 p-4 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm">
                <div className="relative w-full sm:w-96">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                    <Input
                        placeholder="Search users..."
                        className="pl-10 bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10"
                        value={searchTerm}
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />
                </div>

                <div className="flex gap-2 w-full sm:w-auto">
                    <Select value={roleFilter} onValueChange={setRoleFilter}>
                        <SelectTrigger className="w-[180px] bg-gray-50 dark:bg-white/5 border-gray-200 dark:border-white/10">
                            <SelectValue placeholder="All Users" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="All Users">All Users</SelectItem>
                            <SelectItem value="Clients">Clients</SelectItem>
                            <SelectItem value="Trainers">Trainers</SelectItem>
                            <SelectItem value="Associates">Associates</SelectItem>
                            <SelectItem value="Admins & Moderators">Admins & Moderators</SelectItem>
                        </SelectContent>
                    </Select>
                </div>
            </div>

            {/* Users Table */}
            <div className="bg-white dark:bg-card/50 rounded-xl border border-gray-100 dark:border-gray-800 shadow-sm backdrop-blur-sm overflow-hidden">
                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left">
                        <thead className="text-xs text-gray-500 uppercase bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-gray-800">
                            <tr>
                                <th className="px-6 py-4 font-medium">User</th>
                                <th className="px-6 py-4 font-medium">Role</th>
                                <th className="px-6 py-4 font-medium">Status</th>
                                <th className="px-6 py-4 font-medium">Membership</th>
                                <th className="px-6 py-4 font-medium">Join Date</th>
                                <th className="px-6 py-4 font-medium text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-100 dark:divide-gray-800">
                            <AnimatePresence>
                                {currentUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -10 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="hover:bg-gray-50/50 dark:hover:bg-white/5 transition-colors group"
                                    >
                                        <td className="px-6 py-4">
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9 border border-gray-200 dark:border-gray-700">
                                                    <AvatarImage src={user.avatar} alt={user.name} />
                                                    <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <div className="font-medium text-gray-900 dark:text-white">{user.name}</div>
                                                    <div className="text-xs text-muted-foreground">{user.email}</div>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary" className={`font-normal ${getRoleBadgeColor(user.role)}`}>
                                                {user.role}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4">
                                            <Badge variant="secondary" className={`font-normal ${getStatusColor(user.status)}`}>
                                                {user.status}
                                            </Badge>
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {user.membership || "—"}
                                        </td>
                                        <td className="px-6 py-4 text-gray-600 dark:text-gray-300">
                                            {user.joinDate}
                                        </td>
                                        <td className="px-6 py-4 text-right">
                                            <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-gray-500 hover:text-purple-600 hover:bg-purple-50 dark:hover:bg-purple-900/20"
                                                    onClick={() => onViewUser(user)}
                                                >
                                                    <Eye className="w-4 h-4" />
                                                </Button>
                                                <Button
                                                    size="icon"
                                                    variant="ghost"
                                                    className="h-8 w-8 text-gray-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                                                >
                                                    <Mail className="w-4 h-4" />
                                                </Button>
                                                {user.role === "Moderator" ? (
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-indigo-600">
                                                        <Shield className="w-4 h-4" />
                                                    </Button>
                                                ) : (
                                                    <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-indigo-600 hover:bg-indigo-50 dark:hover:bg-indigo-900/20">
                                                        <Edit className="w-4 h-4" />
                                                    </Button>
                                                )}
                                                <Button size="icon" variant="ghost" className="h-8 w-8 text-gray-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20">
                                                    <Trash2 className="w-4 h-4" />
                                                </Button>
                                            </div>
                                        </td>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </tbody>
                    </table>
                </div>

                {/* Pagination (Simplified) */}
                <div className="px-6 py-4 flex items-center justify-between border-t border-gray-100 dark:border-gray-800">
                    <div className="text-sm text-gray-500">
                        Showing {startIndex + 1} to {Math.min(startIndex + itemsPerPage, filteredUsers.length)} of {filteredUsers.length} entries
                    </div>
                    <div className="flex gap-2">
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(p => Math.max(1, p - 1))}
                            disabled={currentPage === 1}
                        >
                            <ChevronLeft className="w-4 h-4" />
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8 bg-purple-600 text-white border-purple-600 hover:bg-purple-700 hover:text-white"
                        >
                            {currentPage}
                        </Button>
                        <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => setCurrentPage(p => Math.min(totalPages, p + 1))}
                            disabled={currentPage === totalPages}
                        >
                            <ChevronRight className="w-4 h-4" />
                        </Button>
                    </div>
                </div>
            </div>
        </div>
    );
}
