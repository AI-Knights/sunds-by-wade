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
import { Button } from "@/components/ui/button";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Filter, User } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

// Mock Data
const USERS = [
    {
        id: "u-1",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        role: "Client",
        status: "Active",
        joined: "3/15/2025"
    },
    {
        id: "u-2",
        name: "Mike Peters",
        email: "mike.p@email.com",
        role: "Trainer",
        status: "Active",
        joined: "8/22/2024"
    },
    {
        id: "u-3",
        name: "Emily Chen",
        email: "emily.c@email.com",
        role: "Client",
        status: "Active",
        joined: "6/10/2025"
    },
    {
        id: "u-4",
        name: "John Smith",
        email: "john.s@email.com",
        role: "Client",
        status: "Active",
        joined: "11/18/2024"
    },
    {
        id: "u-5",
        name: "Lisa Anderson",
        email: "lisa.a@email.com",
        role: "Trainer",
        status: "Active",
        joined: "5/22/2024"
    },
    {
        id: "u-6",
        name: "David Brown",
        email: "david.b@email.com",
        role: "Front Desk",
        status: "Active",
        joined: "1/8/2025"
    },
    {
        id: "u-7",
        name: "Rachel Martinez",
        email: "rachel.m@email.com",
        role: "Client",
        status: "Inactive",
        joined: "9/14/2024"
    },
    {
        id: "u-8",
        name: "Tom Bradley",
        email: "tom.b@email.com",
        role: "Client",
        status: "Active",
        joined: "2/20/2025"
    }
];

export function GymUsersTable() {
    const [roleFilter, setRoleFilter] = useState("All Users");

    const filteredUsers = USERS.filter(user => {
        if (roleFilter === "All Users") return true;
        return user.role === roleFilter;
    });

    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case "Trainer":
                return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-0";
            case "Front Desk":
                return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0";
            default: // Client
                return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0";
        }
    };

    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                <div>
                    <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">User Details (Read-Only)</CardTitle>
                    <p className="text-sm text-gray-500 mt-1">User count and basic information</p>
                </div>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-[140px] justify-between">
                            {roleFilter}
                            <Filter className="w-4 h-4 ml-2 opacity-50" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-[140px]">
                        <DropdownMenuItem onClick={() => setRoleFilter("All Users")}>All Users</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoleFilter("Client")}>Client</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoleFilter("Trainer")}>Trainer</DropdownMenuItem>
                        <DropdownMenuItem onClick={() => setRoleFilter("Front Desk")}>Front Desk</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-200 dark:border-white/10 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-white/5">
                            <TableRow>
                                <TableHead className="w-[250px]">NAME</TableHead>
                                <TableHead>EMAIL</TableHead>
                                <TableHead>ROLE</TableHead>
                                <TableHead>STATUS</TableHead>
                                <TableHead>JOINED</TableHead>
                                <TableHead className="text-right"></TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {filteredUsers.map((user, index) => (
                                    <motion.tr
                                        key={user.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, scale: 0.95 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                        className="border-b transition-colors hover:bg-muted/50"
                                    >
                                        <TableCell className="font-medium">
                                            <div className="flex items-center gap-3">
                                                <div className="w-8 h-8 rounded-full bg-gray-100 dark:bg-white/10 flex items-center justify-center">
                                                    <User className="w-4 h-4 text-gray-500" />
                                                </div>
                                                {user.name}
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-gray-500 text-sm">{user.email}</TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={getRoleBadgeStyle(user.role)}
                                            >
                                                {user.role}
                                            </Badge>
                                        </TableCell>
                                        <TableCell>
                                            <Badge
                                                variant="secondary"
                                                className={`${user.status === "Active"
                                                    ? "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20"
                                                    : "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20"
                                                    } border-0`}
                                            >
                                                {user.status}
                                            </Badge>
                                        </TableCell>
                                        <TableCell className="text-gray-500 text-sm">{user.joined}</TableCell>
                                        <TableCell className="text-right">
                                            <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white">
                                                <Eye className="w-4 h-4" />
                                            </Button>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                    {filteredUsers.length === 0 && (
                        <div className="p-8 text-center text-gray-500">
                            No users found matching filter.
                        </div>
                    )}
                </div>

                {/* Pagination */}
                <div className="flex items-center justify-end space-x-2 py-4 mt-2">
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
