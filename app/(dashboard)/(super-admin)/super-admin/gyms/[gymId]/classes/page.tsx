"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GymClassesTable } from "@/components/dashboard/super-admin/gyms/details/gym-classes-table";
import { motion } from "framer-motion";

const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1
        }
    }
};

const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
        y: 0,
        opacity: 1,
        transition: {
            type: "spring",
            stiffness: 100,
            damping: 15
        }
    }
};

function SimpleStatCard({ label, value }: { label: string, value: string }) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                <p className="text-3xl font-bold mt-2 dark:text-white text-gray-900">{value}</p>
            </CardContent>
        </Card>
    );
}

export default function GymClassesPage() {
    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Stats */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
                variants={itemVariants}
            >
                <SimpleStatCard label="Total Classes" value="6" />
                <SimpleStatCard label="Total Sessions" value="128" />
                <SimpleStatCard label="Avg Attendance" value="14" />
                <SimpleStatCard label="Avg Utilization" value="85%" />
            </motion.div>

            {/* Table */}
            <motion.div variants={itemVariants}>
                <GymClassesTable />
            </motion.div>
        </motion.div>
    );
}
