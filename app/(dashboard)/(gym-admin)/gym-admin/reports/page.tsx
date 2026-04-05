"use client";

import { Header } from "@/components/dashboard/header";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Download } from "lucide-react";
import { RevenueTab } from "@/components/dashboard/admin/reports/revenue-tab";
import { MembersTab } from "@/components/dashboard/admin/reports/members-tab";
import { TrainersTab } from "@/components/dashboard/admin/reports/trainers-tab";
import { ClassesTab } from "@/components/dashboard/admin/reports/classes-tab";
import { CreditsTab } from "@/components/dashboard/admin/reports/credits-tab";

export default function ReportsPage() {
    return (
        <div className="space-y-8 p-1">
            <Header />

            <div className="flex items-center justify-between">
                <div className="flex flex-col gap-2">
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Reports & Analytics</h1>
                    <p className="text-muted-foreground">Track performance and insights</p>
                </div>
                <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25">
                    <Download className="w-4 h-4 mr-2" />
                    Export Report
                </Button>
            </div>

            <Tabs defaultValue="revenue" className="w-full">
                <TabsList className="bg-transparent p-0 mb-6 border-b border-gray-100 dark:border-zinc-800 w-full justify-start rounded-none h-auto">
                    <TabsTrigger
                        value="revenue"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3"
                    >
                        $ Revenue
                    </TabsTrigger>
                    <TabsTrigger
                        value="members"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3"
                    >
                        Members
                    </TabsTrigger>
                    <TabsTrigger
                        value="trainers"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3"
                    >
                        Trainers
                    </TabsTrigger>
                    <TabsTrigger
                        value="classes"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3"
                    >
                        Classes
                    </TabsTrigger>
                    <TabsTrigger
                        value="credits"
                        className="rounded-none border-b-2 border-transparent data-[state=active]:border-purple-600 data-[state=active]:bg-transparent px-4 py-2 pb-3"
                    >
                        Credits
                    </TabsTrigger>
                </TabsList>

                <TabsContent value="revenue" className="mt-0">
                    <RevenueTab />
                </TabsContent>
                <TabsContent value="members" className="mt-0">
                    <MembersTab />
                </TabsContent>
                <TabsContent value="trainers" className="mt-0">
                    <TrainersTab />
                </TabsContent>
                <TabsContent value="classes" className="mt-0">
                    <ClassesTab />
                </TabsContent>
                <TabsContent value="credits" className="mt-0">
                    <CreditsTab />
                </TabsContent>
            </Tabs>
        </div>
    );
}
