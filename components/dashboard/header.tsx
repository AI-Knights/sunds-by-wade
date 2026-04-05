"use client";

import { Bell } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ModeToggle } from "@/components/mode-toggle";

interface HeaderProps {
    title?: string;
    subtitle?: string;
}

export function Header({ title = "Dashboard", subtitle = "Welcome back, Admin! Here's your overview for today." }: HeaderProps) {
    return (
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 dark:text-white tracking-tight">{title}</h1>
                <p className="text-gray-500 dark:text-gray-400 mt-1">{subtitle}</p>
            </div>

            <div className="flex items-center space-x-4">
                <Button variant="ghost" size="icon" className="text-gray-400 hover:text-white relative">
                    <Bell className="w-5 h-5" />
                    <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border border-[#09090b]" />
                </Button>
                <div className=" dark:text-white" >
                    <ModeToggle />
                </div>

                {/* Mobile Menu Trigger would go here */}
            </div>
        </header>
    );
}
