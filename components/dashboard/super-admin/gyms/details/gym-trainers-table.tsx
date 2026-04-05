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
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { motion, AnimatePresence } from "framer-motion";
import { Mail, Phone } from "lucide-react";

// Mock Data
const TRAINERS = [
    {
        id: "t-1",
        name: "Mike Peters",
        email: "mike.p@email.com",
        phone: "+1 (555) 123-4567",
        specialty: "Strength Training, HIIT",
        clients: 24,
        sessions: 67,
        status: "Active"
    },
    {
        id: "t-2",
        name: "Lisa Anderson",
        email: "lisa.a@email.com",
        phone: "+1 (555) 234-5678",
        specialty: "Yoga, Pilates",
        clients: 18,
        sessions: 52,
        status: "Active"
    },
    {
        id: "t-3",
        name: "James Wilson",
        email: "james.w@email.com",
        phone: "+1 (555) 345-6789",
        specialty: "CrossFit, Olympic Lifting",
        clients: 21,
        sessions: 58,
        status: "Active"
    },
    {
        id: "t-4",
        name: "Sarah Martinez",
        email: "sarah.m@email.com",
        phone: "+1 (555) 456-7890",
        specialty: "Nutrition, Weight Loss",
        clients: 15,
        sessions: 43,
        status: "Active"
    }
];

export function GymTrainersTable() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Trainer Details (Read-Only)</CardTitle>
                <p className="text-sm text-gray-500 mt-1">Overview of all trainers at this gym</p>
            </CardHeader>
            <CardContent>
                <div className="rounded-md border border-gray-200 dark:border-white/10 overflow-hidden">
                    <Table>
                        <TableHeader className="bg-gray-50 dark:bg-white/5">
                            <TableRow>
                                <TableHead className="w-[200px]">TRAINER</TableHead>
                                <TableHead>CONTACT</TableHead>
                                <TableHead>SPECIALTY</TableHead>
                                <TableHead>CLIENTS</TableHead>
                                <TableHead>SESSIONS</TableHead>
                                <TableHead className="text-right">STATUS</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            <AnimatePresence mode="popLayout">
                                {TRAINERS.map((trainer, index) => (
                                    <motion.tr
                                        key={trainer.id}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="border-b hover:bg-muted/50 transition-colors"
                                    >
                                        <TableCell className="font-medium flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-full bg-blue-100 dark:bg-blue-500/20 flex items-center justify-center text-blue-600 dark:text-blue-400">
                                                {/* Placeholder Icon/Avatar */}
                                                <svg
                                                    xmlns="http://www.w3.org/2000/svg"
                                                    viewBox="0 0 24 24"
                                                    fill="none"
                                                    stroke="currentColor"
                                                    strokeWidth="2"
                                                    strokeLinecap="round"
                                                    strokeLinejoin="round"
                                                    className="w-5 h-5"
                                                >
                                                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                                                    <circle cx="9" cy="7" r="4" />
                                                    <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
                                                    <path d="M16 3.13a4 4 0 0 1 0 7.75" />
                                                </svg>
                                            </div>
                                            {trainer.name}
                                        </TableCell>
                                        <TableCell>
                                            <div className="flex flex-col space-y-1">
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Mail className="w-3 h-3 mr-2" />
                                                    {trainer.email}
                                                </div>
                                                <div className="flex items-center text-xs text-gray-500">
                                                    <Phone className="w-3 h-3 mr-2" />
                                                    {trainer.phone}
                                                </div>
                                            </div>
                                        </TableCell>
                                        <TableCell className="text-sm text-gray-600 dark:text-gray-400">{trainer.specialty}</TableCell>
                                        <TableCell className="text-sm font-medium">{trainer.clients}</TableCell>
                                        <TableCell className="text-sm font-medium">{trainer.sessions}</TableCell>
                                        <TableCell className="text-right">
                                            <Badge
                                                variant="secondary"
                                                className="bg-emerald-500/10 text-emerald-500 border-0 font-normal"
                                            >
                                                {trainer.status}
                                            </Badge>
                                        </TableCell>
                                    </motion.tr>
                                ))}
                            </AnimatePresence>
                        </TableBody>
                    </Table>
                </div>
            </CardContent>
            {/* Pagination */}
            <div className="flex items-center justify-end space-x-2 py-4 px-6">
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
        </Card>
    );
}
