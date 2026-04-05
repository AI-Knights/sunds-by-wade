"use client";

import { motion } from "framer-motion";
import { Header } from "@/components/dashboard/header";
import { TemplatesStats } from "@/components/dashboard/admin/templates/templates-stats";
import { TemplatesList } from "@/components/dashboard/admin/templates/templates-list";
import { AssignTemplateModal } from "@/components/dashboard/admin/templates/assign-template-modal";
import { useState } from "react";

export default function TemplatesPage() {
    const [selectedTemplate, setSelectedTemplate] = useState<any>(null);
    const [isAssignModalOpen, setIsAssignModalOpen] = useState(false);

    const handleAssignClick = (template: any) => {
        setSelectedTemplate(template);
        setIsAssignModalOpen(true);
    };

    return (
        <div className="space-y-6 p-1">

            {/* Stats */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
            >
                <TemplatesStats />
            </motion.div>

            {/* Templates List */}
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
            >
                <TemplatesList onAssign={handleAssignClick} />
            </motion.div>

            {/* Assign Modal */}
            <AssignTemplateModal
                template={selectedTemplate}
                isOpen={isAssignModalOpen}
                onClose={() => setIsAssignModalOpen(false)}
            />
        </div>
    );
}
