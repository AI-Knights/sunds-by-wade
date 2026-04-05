"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { Progress } from "@/components/ui/progress";
import { ArrowUpRight, ArrowDownRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";

const RETENTION_DATA = [
    { gym: "PowerHouse Athletics", rate: 92.4, change: 3.2, color: "bg-emerald-500" },
    { gym: "Peak Condition", rate: 89.7, change: 2.8, color: "bg-blue-500" },
    { gym: "FitZone Downtown", rate: 88.3, change: 1.5, color: "bg-blue-500" },
    { gym: "Apex Performance", rate: 86.9, change: -0.8, color: "bg-blue-500" },
    { gym: "Momentum Hub", rate: 85.2, change: 2.1, color: "bg-blue-500" },
    { gym: "Core Fitness", rate: 82.6, change: -1.4, color: "bg-orange-500" },
    { gym: "Elite Training", rate: 79.1, change: -3.2, color: "bg-red-500" },
    { gym: "Iron Works", rate: 76.8, change: -2.5, color: "bg-red-500" },
];

export function RetentionRateTable() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white mb-8">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Retention Rate by Gym</CardTitle>
            </CardHeader>
            <CardContent>
                <Table>
                    <TableHeader className="bg-gray-50 dark:bg-white/5">
                        <TableRow>
                            <TableHead className="w-[200px] text-xs font-semibold text-gray-500">GYM</TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500">RETENTION RATE</TableHead>
                            <TableHead className="text-xs font-semibold text-gray-500">CHANGE</TableHead>
                            <TableHead className="w-[300px] text-xs font-semibold text-gray-500">VISUAL</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {RETENTION_DATA.map((item) => (
                            <TableRow key={item.gym} className="border-b last:border-0 hover:bg-transparent">
                                <TableCell className="font-medium text-sm text-gray-900 dark:text-white">{item.gym}</TableCell>
                                <TableCell className="font-bold text-gray-900 dark:text-white">{item.rate}%</TableCell>
                                <TableCell>
                                    <div className={`flex items-center text-xs font-medium ${item.change >= 0 ? 'text-emerald-500' : 'text-red-500'}`}>
                                        {item.change >= 0 ? <ArrowUpRight className="w-3 h-3 mr-1" /> : <ArrowDownRight className="w-3 h-3 mr-1" />}
                                        {item.change >= 0 ? '+' : ''}{item.change}%
                                    </div>
                                </TableCell>
                                <TableCell>
                                    <Progress value={item.rate} className="h-2 bg-gray-100 dark:bg-zinc-800" indicatorClassName={item.color} />
                                </TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </CardContent>
        </Card>
    );
}
