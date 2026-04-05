"use client";

import { Card, CardContent } from "@/components/ui/card";
import { GymTrainersTable } from "@/components/dashboard/super-admin/gyms/details/gym-trainers-table";
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

function SimpleStatCard({ label, value, subtext }: { label: string, value: string, subtext?: string }) {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardContent className="p-6">
                <h3 className="text-sm font-medium text-gray-500">{label}</h3>
                <p className="text-3xl font-bold mt-2 dark:text-white text-gray-900">{value}</p>
                {subtext && <p className="text-xs text-gray-400 mt-1">{subtext}</p>}
            </CardContent>
        </Card>
    );
}

export default function GymTrainersPage() {
    return (
        <motion.div
            className="space-y-8"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
        >
            {/* Stats */}
            <motion.div
                className="grid grid-cols-1 md:grid-cols-3 gap-6"
                variants={itemVariants}
            >
                <SimpleStatCard label="Total Trainers" value="4" />
                <SimpleStatCard label="Total Clients" value="78" />
                <SimpleStatCard label="Sessions This Month" value="220" />
            </motion.div>

            {/* Table */}
            <motion.div variants={itemVariants}>
                <GymTrainersTable />
            </motion.div>
        </motion.div>
    );
}
