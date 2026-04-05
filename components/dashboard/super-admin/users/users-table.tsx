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
import { Eye, Ban, LogOut, UserMinus } from "lucide-react"; // Icons for actions
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Link from "next/link";

// Mock Data
const USERS = [
    {
        id: "u-1",
        name: "Sarah Johnson",
        email: "sarah.j@email.com",
        role: "Client",
        gym: "FitZone Downtown",
        status: "Active",
        lastActivity: "1/13/2026",
        avatar: "/avatars/01.png"
    },
    {
        id: "u-2",
        name: "Mike Peters",
        email: "mike.p@email.com",
        role: "Trainer",
        gym: "FitZone Downtown +1",
        status: "Active",
        lastActivity: "1/13/2026",
        avatar: "/avatars/02.png"
    },
    {
        id: "u-3",
        name: "Emily Chen",
        email: "emily.c@email.com",
        role: "Gym Admin",
        gym: "Core Fitness Studio",
        status: "Active",
        lastActivity: "1/13/2026",
        avatar: "/avatars/03.png"
    },
    {
        id: "u-4",
        name: "John Doe",
        email: "john.d@email.com",
        role: "Client",
        gym: "Elite Training Center",
        status: "Churned",
        lastActivity: "12/10/2025",
        avatar: "/avatars/04.png"
    },
    {
        id: "u-5",
        name: "Lisa Anderson",
        email: "lisa.a@email.com",
        role: "Trainer",
        gym: "Apex Performance Gym",
        status: "Active",
        lastActivity: "1/13/2026",
        avatar: "/avatars/05.png"
    },
    {
        id: "u-6",
        name: "David Wilson",
        email: "david.w@email.com",
        role: "Client",
        gym: "Iron Works Fitness",
        status: "Suspended",
        lastActivity: "11/28/2025",
        avatar: "/avatars/06.png"
    },
    {
        id: "u-7",
        name: "Rachel Martinez",
        email: "rachel.m@email.com",
        role: "Front Desk",
        gym: "Momentum Training Hub",
        status: "Active",
        lastActivity: "1/13/2026",
        avatar: "/avatars/07.png"
    },
    {
        id: "u-8",
        name: "Tom Bradley",
        email: "tom.b@email.com",
        role: "Client",
        gym: "Peak Condition Athletic Club",
        status: "Active",
        lastActivity: "1/13/2026",
        avatar: "/avatars/08.png"
    }
];

export function UsersTable() {
    const getRoleBadgeStyle = (role: string) => {
        switch (role) {
            case "Trainer":
                return "bg-blue-500/10 text-blue-500 hover:bg-blue-500/20 border-0";
            case "Gym Admin":
                return "bg-orange-500/10 text-orange-500 hover:bg-orange-500/20 border-0";
            case "Front Desk":
                return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-0";
            default: // Client
                return "bg-purple-500/10 text-purple-500 hover:bg-purple-500/20 border-0";
        }
    };

    const getStatusBadgeStyle = (status: string) => {
        switch (status) {
            case "Active":
                return "bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0";
            case "Churned":
                return "bg-yellow-500/10 text-yellow-500 hover:bg-yellow-500/20 border-0";
            case "Suspended":
                return "bg-red-500/10 text-red-500 hover:bg-red-500/20 border-0";
            default:
                return "bg-gray-500/10 text-gray-500 hover:bg-gray-500/20 border-0";
        }
    };

    return (
        <div className="rounded-md border border-gray-200 dark:border-white/10 overflow-hidden bg-white dark:bg-zinc-900 shadow-sm">
            <Table>
                <TableHeader className="bg-gray-50 dark:bg-white/5">
                    <TableRow>
                        <TableHead className="w-[250px] pl-6">NAME</TableHead>
                        <TableHead>EMAIL</TableHead>
                        <TableHead>ROLE</TableHead>
                        <TableHead>GYM(S)</TableHead>
                        <TableHead>STATUS</TableHead>
                        <TableHead>LAST ACTIVITY</TableHead>
                        <TableHead className="text-right pr-6">ACTIONS</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    <AnimatePresence mode="popLayout">
                        {USERS.map((user, index) => (
                            <motion.tr
                                key={user.id}
                                initial={{ opacity: 0, y: 10 }}
                                animate={{ opacity: 1, y: 0 }}
                                transition={{ delay: index * 0.05 }}
                                className="border-b transition-colors hover:bg-muted/50 group"
                            >
                                <TableCell className="pl-6 font-medium">
                                    <div className="flex items-center gap-3">
                                        <Avatar className="h-9 w-9">
                                            <AvatarImage src={user.avatar} alt={user.name} />
                                            <AvatarFallback>{user.name.charAt(0)}</AvatarFallback>
                                        </Avatar>
                                        {user.name}
                                    </div>
                                </TableCell>
                                <TableCell className="text-gray-500 text-sm">{user.email}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={getRoleBadgeStyle(user.role)}>
                                        {user.role}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-500 text-sm">{user.gym}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary" className={getStatusBadgeStyle(user.status)}>
                                        {user.status}
                                    </Badge>
                                </TableCell>
                                <TableCell className="text-gray-500 text-sm">{user.lastActivity}</TableCell>
                                <TableCell className="text-right pr-6">
                                    <div className="flex items-center justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-gray-500 hover:text-gray-900 dark:hover:text-white" asChild>
                                            <Link href={`/super-admin/users/${user.id}`}>
                                                <Eye className="w-4 h-4" />
                                            </Link>
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                                            <Ban className="w-4 h-4" />
                                        </Button>
                                        {/* Additional actions from screenshot: logout, delete/remove? */}
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-orange-500 hover:text-orange-600 hover:bg-orange-50 dark:hover:bg-orange-900/10">
                                            <LogOut className="w-4 h-4" />
                                        </Button>
                                        <Button variant="ghost" size="icon" className="h-8 w-8 text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-900/10">
                                            <UserMinus className="w-4 h-4" />
                                        </Button>
                                    </div>
                                </TableCell>
                            </motion.tr>
                        ))}
                    </AnimatePresence>
                </TableBody>
            </Table>

            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4 px-6 border-t border-gray-100 dark:border-white/5">
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
        </div>
    );
}
