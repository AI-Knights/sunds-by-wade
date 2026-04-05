"use client";

import { useState } from "react";
import { Header } from "@/components/dashboard/header";
import { CheckInStats } from "@/components/dashboard/admin/check-in/check-in-stats";
import { ManualCheckIn } from "@/components/dashboard/admin/check-in/manual-check-in";
import { CheckInHistory } from "@/components/dashboard/admin/check-in/check-in-history";

// Initial Mock Data
const INITIAL_HISTORY = [
    { id: "1", clientName: "John Smith", date: new Date(new Date().setHours(8, 15)), method: "QR Code" as const, staff: undefined, note: undefined },
    { id: "2", clientName: "Emily Taylor", date: new Date(new Date().setHours(9, 30)), method: "Manual" as const, staff: "Admin User", note: "Forgot phone" },
    { id: "3", clientName: "David Martinez", date: new Date(new Date().setHours(10, 45)), method: "QR Code" as const, staff: undefined, note: undefined },
    { id: "4", clientName: "Sarah Johnson", date: new Date(new Date().setHours(11, 20)), method: "Manual" as const, staff: "Front Desk Staff", note: undefined },
    { id: "5", clientName: "Mike Chen", date: new Date(new Date().setHours(12, 5)), method: "QR Code" as const, staff: undefined, note: undefined },
];

export default function CheckInPage() {
    const [history, setHistory] = useState(INITIAL_HISTORY);

    const handleNewCheckIn = (data: any) => {
        setHistory([data, ...history]);
    };

    return (
        <div className="space-y-8 p-1">
            {/* <Header /> */}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Check-In Management</h1>
                <p className="text-muted-foreground">Track gym entry via QR code or manual check-in</p>
            </div>

            <CheckInStats />

            <div className="space-y-8">
                <ManualCheckIn onCheckIn={handleNewCheckIn} />
                <CheckInHistory history={history} />
            </div>
        </div>
    );
}
