"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";

interface DayOverviewModalProps {
    date: Date;
    sessions: any[];
    onClose: () => void;
}

export function DayOverviewModal({ date, sessions, onClose }: DayOverviewModalProps) {
    return (
        <Dialog open={!!date} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-zinc-900 border-none text-gray-900 dark:text-white sm:max-w-[425px] shadow-2xl p-0 overflow-hidden">
                <div className="p-6 pb-4 border-b border-gray-100 dark:border-white/5 flex justify-between items-center">
                    <DialogTitle className="text-lg font-bold">
                        {format(date, "EEEE, MMMM d")}
                    </DialogTitle>
                    <Button size="sm" variant="ghost" className="h-8 w-8 p-0 text-gray-500" onClick={onClose}>
                        <span className="sr-only">Close</span>
                    </Button>
                </div>

                <div className="p-6 min-h-[200px] max-h-[400px] overflow-y-auto space-y-3">
                    {sessions.length === 0 ? (
                        <div className="text-center py-8 text-gray-400 dark:text-gray-500">
                            No sessions scheduled for this day.
                        </div>
                    ) : (
                        sessions.map((session, i) => (
                            <div key={i} className="flex items-center justify-between p-3 bg-gray-50 dark:bg-zinc-950/50 rounded-lg border border-gray-100 dark:border-white/5">
                                <div>
                                    <p className="font-medium text-sm text-gray-900 dark:text-white">
                                        {format(session.date, "HH:mm")} - {session.type === "Open" ? "Open" : session.client}
                                    </p>
                                    <p className="text-xs text-gray-500 dark:text-gray-400 capitalize">{session.type} Session</p>
                                </div>
                                <Badge variant="secondary" className="bg-white dark:bg-zinc-900 shadow-sm text-gray-600 dark:text-gray-300">
                                    {session.type}
                                </Badge>
                            </div>
                        ))
                    )}
                </div>

                <div className="p-4 bg-gray-50 dark:bg-zinc-950/50 border-t border-gray-100 dark:border-white/5">
                    <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                        <Plus className="w-4 h-4 mr-2" /> Add Session
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
