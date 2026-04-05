"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { LogOut, Settings, User } from "lucide-react";
import { SIDEBAR_ITEMS, ADMIN_SIDEBAR_ITEMS, SUPER_ADMIN_SIDEBAR_ITEMS } from "@/constants/data";
import { cn } from "@/lib/utils";
import LogoImage from "../../public/images/icon.svg"
import Image from "next/image";
import { ModeToggle } from "@/components/mode-toggle";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function Sidebar() {
    const router = useRouter()
    const pathname = usePathname();

    // Role detection based on URL path
    const isSuperAdmin = pathname?.startsWith("/super-admin");
    const isGymAdmin = pathname?.startsWith("/gym-admin") || pathname?.startsWith("/admin");

    let items = SIDEBAR_ITEMS;
    let homeLink = "/trainer";
    let portalName = "Personal Trainer Portal";

    if (isSuperAdmin) {
        items = SUPER_ADMIN_SIDEBAR_ITEMS;
        homeLink = "/super-admin";
        portalName = "Super Admin Portal";
    } else if (isGymAdmin) {
        items = ADMIN_SIDEBAR_ITEMS;
        homeLink = "/gym-admin/dashboard";
        portalName = "Gym Admin Portal";
    }

    const activeColorClass = isSuperAdmin
        ? "text-orange-500 dark:text-orange-400"
        : isGymAdmin
            ? "text-purple-600 dark:text-purple-400"
            : "text-blue-600 dark:text-blue-400";

    const activeBgClass = isSuperAdmin
        ? "bg-orange-500/10"
        : isGymAdmin
            ? "bg-purple-600/20"
            : "bg-blue-600/20";

    const activeBorderClass = isSuperAdmin
        ? "bg-orange-500"
        : isGymAdmin
            ? "bg-purple-500"
            : "bg-blue-500";

    const activeShadowClass = isSuperAdmin
        ? "shadow-[0_0_10px_rgba(249,115,22,0.5)]"
        : isGymAdmin
            ? "shadow-[0_0_10px_rgba(147,51,234,0.5)]"
            : "shadow-[0_0_10px_rgba(59,130,246,0.5)]";

    return (
        <motion.aside
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="hidden md:flex flex-col w-64 h-screen fixed left-0 top-0 border-r border-gray-200 dark:border-sidebar-border bg-white dark:bg-sidebar/95 backdrop-blur-xl z-50 text-gray-900 dark:text-sidebar-foreground p-4 transition-colors duration-300"
        >
            <div onClick={() => {
                router.push(homeLink)
            }} className="mb-8 px-2 flex-col items-start flex gap-3 border-b py-3 space-x-2 cursor-pointer">
                <Image src={LogoImage} alt="logo image" height={100} width={100} />
                <p className={cn("font-semibold", isSuperAdmin ? "text-orange-500 dark:text-orange-400" : isGymAdmin ? "text-purple-600 dark:text-purple-400" : "text-blue-600 dark:text-blue-400")}>{portalName}</p>
            </div>

            <nav className="flex-1 space-y-2 overflow-y-auto no-scrollbar">
                {items.map((item) => {
                    const isActive = pathname === item.href;
                    const Icon = item.icon;

                    return (
                        <Link key={item.label} href={item.href} className="relative block group">
                            {isActive && (
                                <motion.div
                                    layoutId="sidebarActive"
                                    className={cn("absolute inset-0 rounded-lg", activeBgClass)}
                                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                                />
                            )}
                            <div className={cn(
                                "relative flex items-center px-4 py-3 rounded-lg transition-colors group-hover:bg-gray-100 dark:group-hover:bg-white/5",
                                isActive ? cn(activeColorClass, "font-medium") : "text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white"
                            )}>
                                <Icon className="w-5 h-5 mr-3" />
                                <span>{item.label}</span>
                                {isActive && (
                                    <div className={cn("absolute left-0 w-1 h-6 rounded-r-full", activeBorderClass, activeShadowClass)} />
                                )}
                            </div>
                        </Link>
                    );
                })}
            </nav>

            <div className="border-t border-gray-200 dark:border-white/10 pt-4 space-y-3">

                <div className="flex items-center gap-2 px-2">
                    <ModeToggle />
                    <div className="text-xs text-muted-foreground ml-1 hidden md:block">Theme</div>
                </div>

                <div className="px-2">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <button className="w-full flex items-center p-2 rounded-lg hover:bg-gray-100 dark:hover:bg-white/5 transition-colors text-left outline-none">
                                <div className="w-10 h-10 rounded-full bg-gray-100 dark:bg-white/10 overflow-hidden border border-gray-200 dark:border-white/20 flex-shrink-0">
                                    <div className="w-full h-full flex items-center justify-center text-xs font-bold bg-gradient-to-br from-gray-200 to-gray-300 dark:from-gray-700 dark:to-gray-800 text-gray-700 dark:text-white">
                                        {isSuperAdmin ? "SA" : isGymAdmin ? "AD" : "JD"}
                                    </div>
                                </div>
                                <div className="ml-3 flex-1 min-w-0">
                                    <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{isSuperAdmin ? "John Doe" : isGymAdmin ? "Admin User" : "John Doe"}</p>
                                    <p className="text-xs text-gray-500 truncate">{isSuperAdmin ? "Super Admin" : isGymAdmin ? "Gym Admin" : "Certified Trainer"}</p>
                                </div>
                                <Settings className="w-4 h-4 text-muted-foreground ml-2" />
                            </button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" className="w-56">
                            <DropdownMenuLabel>My Account</DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={() => router.push('/profile')}>
                                <User className="mr-2 h-4 w-4" />
                                <span>Profile</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem className="text-red-600 focus:text-red-600 focus:bg-red-50 dark:focus:bg-red-900/10" onClick={() => console.log("Logout clicked")}>
                                <LogOut className="mr-2 h-4 w-4" />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </motion.aside>
    );
}
