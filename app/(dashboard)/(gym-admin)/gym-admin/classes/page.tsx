"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { ClassesStats } from "@/components/dashboard/admin/classes/classes-stats";
import { WeeklySchedule } from "@/components/dashboard/admin/classes/weekly-schedule";
import { ClassDetailsModal } from "@/components/dashboard/admin/classes/class-details-modal";
import { AddClassModal } from "@/components/dashboard/admin/classes/add-class-modal";

export default function ClassesPage() {
    const [selectedClass, setSelectedClass] = useState<any>(null);
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [isAddModalOpen, setIsAddModalOpen] = useState(false);

    const handleClassClick = (cls: any) => {
        setSelectedClass(cls);
        setIsDetailsOpen(true);
    };

    return (
        <div className="space-y-6 p-1">
            {/* Header */}
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                {/* <Header title="Classes & Schedule" subtitle="Manage class schedules and attendance" /> */}
                <div></div>
                <Button
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20"
                    onClick={() => setIsAddModalOpen(true)}
                >
                    <Plus className="w-5 h-5 mr-2" />
                    Add Class
                </Button>
            </div>

            {/* Stats Cards */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <ClassesStats />
            </motion.div>

            {/* Weekly Schedule */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <WeeklySchedule onClassClick={handleClassClick} />
            </motion.div>

            {/* Modals */}
            <ClassDetailsModal
                classItem={selectedClass}
                isOpen={isDetailsOpen}
                onClose={() => setIsDetailsOpen(false)}
            />

            <AddClassModal
                isOpen={isAddModalOpen}
                onClose={() => setIsAddModalOpen(false)}
            />
        </div>
    );
}
