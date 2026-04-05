"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Checkbox } from "@/components/ui/checkbox";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Calendar } from "lucide-react";
import { useState } from "react";
import { USERS } from "@/constants/data";

interface AssignTemplateModalProps {
    template: any;
    isOpen: boolean;
    onClose: () => void;
}

export function AssignTemplateModal({ template, isOpen, onClose }: AssignTemplateModalProps) {
    const [selectedClients, setSelectedClients] = useState<string[]>([]);
    const [searchTerm, setSearchTerm] = useState("");

    // Filter only clients from USERS
    const clients = USERS.filter(u => u.role === "Client");

    // Filter by search term
    const filteredClients = clients.filter(c =>
        c.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const toggleClient = (clientId: string) => {
        if (selectedClients.includes(clientId)) {
            setSelectedClients(selectedClients.filter(id => id !== clientId));
        } else {
            setSelectedClients([...selectedClients, clientId]);
        }
    };

    if (!template) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-xl bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800">
                <DialogHeader>
                    <DialogTitle className="text-xl font-bold dark:text-white">Assign Template to Clients</DialogTitle>
                    <p className="text-sm text-muted-foreground">Assigning <span className="font-semibold text-purple-600">{template.title}</span></p>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    {/* Trainer Selection (Mock) */}
                    <div className="space-y-2">
                        <Label>Select Trainer</Label>
                        <Select defaultValue="sarah">
                            <SelectTrigger className="bg-white dark:bg-zinc-900">
                                <SelectValue placeholder="Select Trainer" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="sarah">Sarah Mitchell (You)</SelectItem>
                                <SelectItem value="mike">Mike Chen</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Client Selection */}
                    <div className="space-y-2">
                        <Label>Select Clients</Label>
                        <div className="bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800 overflow-hidden">
                            <div className="p-2 border-b border-gray-100 dark:border-zinc-800">
                                <div className="relative">
                                    <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                    <Input
                                        placeholder="Search clients..."
                                        className="pl-8 bg-white dark:bg-zinc-950 border-none shadow-none focus-visible:ring-0"
                                        value={searchTerm}
                                        onChange={(e) => setSearchTerm(e.target.value)}
                                    />
                                </div>
                            </div>
                            <ScrollArea className="h-[200px] p-2">
                                <div className="space-y-1">
                                    {filteredClients.map(client => (
                                        <div
                                            key={client.id}
                                            className="flex items-center gap-3 p-2 hover:bg-white dark:hover:bg-zinc-800 rounded-lg cursor-pointer transition-colors"
                                            onClick={() => toggleClient(client.id)}
                                        >
                                            <Checkbox
                                                id={`client-${client.id}`}
                                                checked={selectedClients.includes(client.id)}
                                                onCheckedChange={() => toggleClient(client.id)}
                                            />
                                            <Avatar className="h-8 w-8">
                                                <AvatarImage src={client.avatar} />
                                                <AvatarFallback>{client.name.charAt(0)}</AvatarFallback>
                                            </Avatar>
                                            <div className="flex flex-col">
                                                <span className="text-sm font-medium dark:text-white">{client.name}</span>
                                                <span className="text-xs text-muted-foreground">{client.location}</span>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </ScrollArea>
                        </div>
                    </div>

                    {/* Assignment Date */}
                    <div className="space-y-2">
                        <Label>Assignment Date (Optional)</Label>
                        <div className="relative">
                            <Input placeholder="mm/dd/yyyy" className="pl-9 bg-white dark:bg-zinc-900" />
                            <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                        </div>
                    </div>

                    {/* Summary */}
                    <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg text-sm text-purple-700 dark:text-purple-300">
                        Assigning to <span className="font-bold">{selectedClients.length}</span> clients
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        className="bg-purple-600 hover:bg-purple-700"
                        disabled={selectedClients.length === 0}
                    >
                        Assign Template
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
