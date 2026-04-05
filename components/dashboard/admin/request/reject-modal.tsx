"use client";

import { useState } from "react";
import { X, AlertTriangle } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";

interface RejectModalProps {
    isOpen: boolean;
    onClose: () => void;
    onReject: (data: any) => void;
    userName: string;
}

export function RejectModal({ isOpen, onClose, onReject, userName }: RejectModalProps) {
    const [reason, setReason] = useState("");
    const [notifyUser, setNotifyUser] = useState(true);

    const handleReject = () => {
        onReject({
            reason,
            notifyUser
        });
        onClose();
    };

    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-lg overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Reject Join Request</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">Reject request from <span className="font-semibold text-gray-900 dark:text-white">{userName}</span></p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label>Reason (Optional)</Label>
                            <Textarea
                                value={reason}
                                onChange={(e) => setReason(e.target.value)}
                                placeholder="Provide a reason for rejecting this request..."
                                className="bg-gray-50 dark:bg-white/5 min-h-[100px]"
                            />
                        </div>

                        <div className="flex items-center justify-between p-4 rounded-lg border border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                            <div className="space-y-0.5">
                                <Label className="text-base">Notify User</Label>
                                <p className="text-xs text-muted-foreground">Send rejection notification to user</p>
                            </div>
                            <Switch
                                checked={notifyUser}
                                onCheckedChange={setNotifyUser}
                            />
                        </div>

                        <div className="rounded-lg p-4 bg-red-50 dark:bg-red-500/10 border border-red-100 dark:border-red-500/20 text-xs space-y-1 text-red-700 dark:text-red-300">
                            <p className="font-semibold mb-2 flex items-center gap-2">
                                <AlertTriangle className="w-3 h-3" />
                                After rejection:
                            </p>
                            <ul className="list-disc pl-4 space-y-1 opacity-90">
                                <li>User is not connected to the gym</li>
                                <li>Status updates to "Rejected"</li>
                                <li>Request remains logged for audit</li>
                                {notifyUser && <li>User will receive a rejection notification</li>}
                            </ul>
                        </div>
                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 bg-gray-50/50 dark:bg-white/5">
                        <Button variant="outline" onClick={onClose} className="w-32">Cancel</Button>
                        <Button onClick={handleReject} className="w-40 bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/25">
                            Reject Request
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
