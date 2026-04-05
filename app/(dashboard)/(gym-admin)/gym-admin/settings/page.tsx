"use client";

import { Header } from "@/components/dashboard/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GymSettingsTab } from "@/components/dashboard/admin/settings/gym-settings-tab";
import { MembershipsTab } from "@/components/dashboard/admin/settings/memberships-tab";
import { CreditRulesTab } from "@/components/dashboard/admin/settings/credit-rules-tab";
import { BookingRulesTab } from "@/components/dashboard/admin/settings/booking-rules-tab";
import { Building2, Users, CreditCard, CalendarClock } from "lucide-react";

export default function SettingsPage() {
    return (
        <div className="space-y-8 p-1">
            {/* <Header /> */}

            <div className="flex flex-col gap-2">
                <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Settings</h1>
                <p className="text-muted-foreground">Configure your gym settings and preferences</p>
            </div>

            <Tabs defaultValue="gym" className="w-full">
                <TabsList className="bg-transparent p-0 mb-6 border-b border-gray-100 dark:border-zinc-800 w-full justify-start rounded-none h-auto flex-wrap gap-y-2">
                    <TabsTrigger
                        value="gym"
                        className="rounded-none   data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3 gap-2"
                    >
                        <Building2 className="w-4 h-4" />
                        Gym Settings
                    </TabsTrigger>
                    <TabsTrigger
                        value="memberships"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3 gap-2"
                    >
                        <Users className="w-4 h-4" />
                        Memberships
                    </TabsTrigger>
                    <TabsTrigger
                        value="credits"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3 gap-2"
                    >
                        <CreditCard className="w-4 h-4" />
                        Credit Rules
                    </TabsTrigger>
                    <TabsTrigger
                        value="booking"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3 gap-2"
                    >
                        <CalendarClock className="w-4 h-4" />
                        Booking Rules
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="gym" className="mt-0">
                    <GymSettingsTab />
                </TabsContent>
                <TabsContent value="memberships" className="mt-0">
                    <MembershipsTab />
                </TabsContent>
                <TabsContent value="credits" className="mt-0">
                    <CreditRulesTab />
                </TabsContent>
                <TabsContent value="booking" className="mt-0">
                    <BookingRulesTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
