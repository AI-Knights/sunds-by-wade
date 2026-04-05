"use client"

import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

const stats = [
    {
        title: "Total Messages",
        value: "7",
        color: "text-blue-500",
    },
    {
        title: "New Messages",
        value: "3",
        color: "text-purple-500",
    },
    {
        title: "Read Messages",
        value: "4",
        color: "text-blue-500",
    },
    {
        title: "Avg Response Time",
        value: "4.2 hrs",
        color: "text-blue-500",
    },
]

const container = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: {
            staggerChildren: 0.1,
        },
    },
}

const item = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0 },
}

export function SupportStats() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="grid gap-4 md:grid-cols-2 lg:grid-cols-4"
        >
            {stats.map((stat, index) => (
                <motion.div key={stat.title} variants={item} whileHover={{ scale: 1.02 }} transition={{ type: "spring", stiffness: 300 }}>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium text-muted-foreground">
                                {stat.title}
                            </CardTitle>
                        </CardHeader>
                        <CardContent>
                            <div className={`text-2xl font-bold ${stat.color}`}>{stat.value}</div>
                        </CardContent>
                    </Card>
                </motion.div>
            ))}
        </motion.div>
    )
}
