"use client";

import { motion } from "framer-motion";
import { UserStats } from "@/components/dashboard/admin/users/user-stats";
import { UsersTable } from "@/components/dashboard/admin/users/users-table";
import { UserModal } from "@/components/dashboard/admin/users/user-modal";
import { ClientDetailModal } from "@/components/dashboard/admin/users/client-detail-modal";
import { AddUserModal } from "@/components/dashboard/admin/users/add-user-modal";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/dashboard/header";

export default function UsersPage() {
    const [selectedUser, setSelectedUser] = useState<any>(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isAddUserOpen, setIsAddUserOpen] = useState(false);

    const handleViewUser = (user: any) => {
        setSelectedUser(user);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
        setTimeout(() => setSelectedUser(null), 300); // Wait for animation
    };

    return (
        <div className="space-y-6 p-1">
            {/* Header with Add User Button */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* <Header title="Users" subtitle="Manage clients, trainers, and staff" /> */}
                <div></div>
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                    onClick={() => setIsAddUserOpen(true)}
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add User
                </Button>
            </div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <UserStats />
            </motion.div>

            {/* Users Table */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <UsersTable onViewUser={handleViewUser} />
            </motion.div>

            {/* Detailed User Modal */}
            {selectedUser?.role === "Client" ? (
                <ClientDetailModal
                    user={selectedUser}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            ) : (
                <UserModal
                    user={selectedUser}
                    isOpen={isModalOpen}
                    onClose={handleCloseModal}
                />
            )}
            {/* Add User Modal */}
            <AddUserModal
                isOpen={isAddUserOpen}
                onClose={() => setIsAddUserOpen(false)}
            />
        </div>
    );
}
