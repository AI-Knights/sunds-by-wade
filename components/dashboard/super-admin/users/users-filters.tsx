"use client";

import { Input } from "@/components/ui/input";
import { Search, Filter } from "lucide-react";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";

export function UsersFilters() {
    return (
        <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                    placeholder="Search users by name, email, or gym..."
                    className="pl-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10"
                />
            </div>
            <div className="flex gap-4">
                <Select defaultValue="all-roles">
                    <SelectTrigger className="w-[140px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10">
                        <div className="flex items-center gap-2">
                            <Filter className="w-4 h-4 text-gray-500" />
                            <SelectValue placeholder="All Roles" />
                        </div>
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-roles">All Roles</SelectItem>
                        <SelectItem value="client">Client</SelectItem>
                        <SelectItem value="trainer">Trainer</SelectItem>
                        <SelectItem value="gym-admin">Gym Admin</SelectItem>
                        <SelectItem value="front-desk">Front Desk</SelectItem>
                    </SelectContent>
                </Select>

                <Select defaultValue="all-status">
                    <SelectTrigger className="w-[140px] bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10">
                        <SelectValue placeholder="All Status" />
                    </SelectTrigger>
                    <SelectContent>
                        <SelectItem value="all-status">All Status</SelectItem>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="inactive">Inactive</SelectItem>
                        <SelectItem value="churned">Churned</SelectItem>
                        <SelectItem value="suspended">Suspended</SelectItem>
                    </SelectContent>
                </Select>
            </div>
        </div>
    );
}
