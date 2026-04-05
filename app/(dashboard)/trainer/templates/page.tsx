"use client";

import { useState } from "react";
import { Search, Plus, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { TEMPLATES } from "@/constants/data";
import { motion, AnimatePresence } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import { AssignTemplateModal } from "@/components/dashboard/assign-template-modal";
import { TemplateCard } from "@/components/dashboard/template-card";

export default function TemplatesPage() {
    const [searchQuery, setSearchQuery] = useState("");
    const [assignModalOpen, setAssignModalOpen] = useState(false);
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);

    const filteredTemplates = TEMPLATES.filter(t =>
        t.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleAssignClick = (template: any) => {
        setSelectedTemplate(template);
        setAssignModalOpen(true);
    };

    return (
        <div className="min-h-screen bg-gray-50/50 dark:bg-zinc-950 pb-20">


            <div className="container mx-auto px-6 pt-8 space-y-8">
                {/* Page Header */}
                <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="flex flex-col md:flex-row md:items-end justify-between gap-6"
                >
                    <div>
                        <h1 className="text-3xl font-bold text-gray-900 dark:text-white tracking-tight">Workout Templates</h1>
                        <p className="text-gray-500 dark:text-gray-400 mt-2">Manage and assign your workout templates</p>
                    </div>
                </motion.div>

                {/* Toolbar */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="sticky top-4 z-10 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-xl p-4 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm flex flex-col md:flex-row gap-4 items-center justify-between"
                >
                    <div className="relative w-full md:max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                        <Input
                            placeholder="Search templates..."
                            className="pl-10 h-10 bg-gray-50 dark:bg-white/5 border-transparent text-gray-900 dark:text-white placeholder:text-gray-500 rounded-xl focus:bg-white dark:focus:bg-zinc-800 transition-all"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>

                    <div className="flex w-full md:w-auto gap-3">
                        <Button variant="outline" className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300">
                            <Filter className="w-4 h-4 mr-2" /> Filter
                        </Button>
                        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                            <Plus className="w-4 h-4 mr-2" /> Create Template
                        </Button>
                    </div>
                </motion.div>

                {/* Templates Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    <AnimatePresence mode='popLayout'>
                        {filteredTemplates.map((template, index) => (
                            <TemplateCard
                                key={template.id}
                                template={template}
                                index={index}
                                onAssign={handleAssignClick}
                            />
                        ))}
                    </AnimatePresence>
                </div>

                <AssignTemplateModal
                    isOpen={assignModalOpen}
                    onClose={() => setAssignModalOpen(false)}
                    template={selectedTemplate}
                />
            </div>
        </div>
    );
}
