"use client";

import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { TEMPLATES } from "@/constants/data";
import { TemplateCard } from "@/components/dashboard/admin/templates/template-card";

interface TemplatesListProps {
    onAssign: (template: any) => void;
}

export function TemplatesList({ onAssign }: TemplatesListProps) {
    const [searchTerm, setSearchTerm] = useState("");

    const gymTemplates = TEMPLATES.filter(t => t.type === "Gym" && t?.name?.toLowerCase().includes(searchTerm.toLowerCase()));
    const trainerTemplates = TEMPLATES.filter(t => t.type === "Trainer" && t?.name?.toLowerCase().includes(searchTerm.toLowerCase()));

    return (
        <div className="space-y-6">
            <Tabs defaultValue="gym" className="w-full">
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6">
                    <TabsList className="bg-gray-100 dark:bg-zinc-900">
                        <TabsTrigger value="gym" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">Gym Templates</TabsTrigger>
                        <TabsTrigger value="trainer" className="data-[state=active]:bg-white dark:data-[state=active]:bg-zinc-800">Trainer Templates</TabsTrigger>
                    </TabsList>

                    <div className="relative w-full sm:w-72">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search templates..."
                            className="pl-9 bg-white dark:bg-card/50"
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>
                </div>

                <TabsContent value="gym" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {gymTemplates.map(template => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onAssign={onAssign}
                            />
                        ))}
                    </div>
                </TabsContent>

                <TabsContent value="trainer" className="mt-0">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {trainerTemplates.map(template => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                onAssign={onAssign}
                            />
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    );
}
