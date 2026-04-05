"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { CLIENTS } from "@/constants/data";
import { Calendar, Search, Users } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { ScrollArea } from "@/components/ui/scroll-area";

interface AssignTemplateModalProps {
    isOpen: boolean;
    onClose: () => void;
    template: any;
}

export function AssignTemplateModal({ isOpen, onClose, template }: AssignTemplateModalProps) {
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const [searchQuery, setSearchQuery] = useState("");
    const [date, setDate] = useState("");

    // Filter clients based on search
    const filteredClients = CLIENTS.filter(client =>
        client.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const toggleClient = (id: string) => {
        if (selectedClients.includes(id)) {
            setSelectedClients(selectedClients.filter(c => c !== id));
        } else {
            setSelectedClients([...selectedClients, id]);
        }
    };

    const toggleAll = () => {
        if (selectedClients.length === filteredClients.length) {
            setSelectedClients([]);
        } else {
            setSelectedClients(filteredClients.map(c => c.id));
        }
    };

    const handleAssign = () => {
        console.log("Assigning template", template?.name, "to", selectedClients, "on", date);
        onClose();
        // Reset state after close animation
        setTimeout(() => {
            setSelectedClients([]);
            setDate("");
            setSearchQuery("");
        }, 300);
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-zinc-900 border-none text-gray-900 dark:text-white sm:max-w-[600px] shadow-2xl overflow-hidden p-0 gap-0">
                <DialogHeader className="p-6 pb-4 border-b border-gray-100 dark:border-white/5">
                    <DialogTitle className="text-xl font-semibold flex items-center gap-2">
                        <Users className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                        Assign to Clients
                    </DialogTitle>
                    <DialogDescription className="text-gray-500 dark:text-gray-400">
                        Select clients to assign <strong>{template?.name}</strong>.
                    </DialogDescription>
                </DialogHeader>

                {/* Search & Toolbar */}
                <div className="px-6 py-4 bg-gray-50/50 dark:bg-white/5 border-b border-gray-100 dark:border-white/5 flex items-center gap-4">
                    <div className="relative flex-1">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        <Input
                            placeholder="Search clients..."
                            className="pl-9 h-9 bg-white dark:bg-zinc-950 border-gray-200 dark:border-white/10"
                            value={searchQuery}
                            onChange={(e) => setSearchQuery(e.target.value)}
                        />
                    </div>
                    <Button
                        variant="ghost"
                        size="sm"
                        onClick={toggleAll}
                        className="text-xs text-purple-600 dark:text-purple-400 hover:text-purple-700 hover:bg-purple-50 dark:hover:bg-purple-500/10"
                    >
                        {selectedClients.length === filteredClients.length ? "Deselect All" : "Select All"}
                    </Button>
                </div>

                {/* Client List */}
                <ScrollArea className="h-[300px] p-2">
                    <div className="space-y-1 p-2">
                        {filteredClients.map((client) => (
                            <motion.div
                                key={client.id}
                                layout
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className={`flex items-center gap-4 p-3 rounded-xl transition-all cursor-pointer border ${selectedClients.includes(client.id)
                                        ? "bg-purple-50 dark:bg-purple-500/10 border-purple-200 dark:border-purple-500/20"
                                        : "hover:bg-gray-50 dark:hover:bg-white/5 border-transparent"
                                    }`}
                                onClick={() => toggleClient(client.id)}
                            >
                                <Checkbox
                                    checked={selectedClients.includes(client.id)}
                                    className="border-gray-300 dark:border-gray-600 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <Avatar className="h-10 w-10 border border-gray-100 dark:border-white/10">
                                    <AvatarImage src={client.avatar} />
                                    <AvatarFallback className="bg-gray-100 dark:bg-zinc-800 text-gray-600 dark:text-gray-300">
                                        {client.name[0]}
                                    </AvatarFallback>
                                </Avatar>
                                <div className="flex-1">
                                    <h4 className={`font-medium text-sm ${selectedClients.includes(client.id) ? "text-purple-900 dark:text-purple-100" : "text-gray-900 dark:text-white"}`}>
                                        {client.name}
                                    </h4>
                                    <p className="text-xs text-gray-500 dark:text-gray-400">{client.location}</p>
                                </div>
                                {selectedClients.includes(client.id) && (
                                    <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="w-2 h-2 rounded-full bg-purple-500" />
                                )}
                            </motion.div>
                        ))}

                        {filteredClients.length === 0 && (
                            <div className="text-center py-10 text-gray-500 dark:text-gray-400">
                                <p>No clients found matching "{searchQuery}"</p>
                            </div>
                        )}
                    </div>
                </ScrollArea>

                {/* Footer Actions */}
                <div className="p-6 bg-gray-50 dark:bg-zinc-950/50 border-t border-gray-100 dark:border-white/5 space-y-4">
                    <div className="flex flex-col gap-2">
                        <label className="text-xs font-semibold uppercase tracking-wider text-gray-500 dark:text-gray-400">
                            Start Date (Optional)
                        </label>
                        <div className="relative">
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                            <Input
                                type="date"
                                className="pl-10 h-10 bg-white dark:bg-zinc-900 border-gray-200 dark:border-white/10 text-gray-900 dark:text-white dark:[color-scheme:dark]"
                                value={date}
                                onChange={(e) => setDate(e.target.value)}
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between pt-2">
                        <p className="text-sm text-gray-600 dark:text-gray-300">
                            <span className="font-semibold text-purple-600 dark:text-purple-400">{selectedClients.length}</span> clients selected
                        </p>
                        <div className="flex gap-3">
                            <Button variant="outline" onClick={onClose} className="border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-white dark:hover:bg-white/5">
                                Cancel
                            </Button>
                            <Button
                                className="bg-purple-600 hover:bg-purple-700 text-white min-w-[140px] shadow-lg shadow-purple-500/20"
                                onClick={handleAssign}
                                disabled={selectedClients.length === 0}
                            >
                                Assign Template
                            </Button>
                        </div>
                    </div>
                </div>
            </DialogContent>
        </Dialog>
    );
}
