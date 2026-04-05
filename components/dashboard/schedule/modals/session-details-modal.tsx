"use client";

import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Calendar, Clock, User, Users, Phone, Mail, X } from "lucide-react";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface SessionDetailsModalProps {
    session: any;
    onClose: () => void;
}

export function SessionDetailsModal({ session, onClose }: SessionDetailsModalProps) {
    if (!session) return null;

    const isPersonal = session.type === "Personal";
    const isGroup = session.type === "Group";
    const isOpen = session.type === "Open";

    const getBadgeColor = () => {
        if (isPersonal) return "bg-blue-600 text-white hover:bg-blue-700";
        if (isGroup) return "bg-purple-600 text-white hover:bg-purple-700";
        return "bg-gray-500 text-white hover:bg-gray-600";
    };

    return (
        <Dialog open={!!session} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-zinc-900 border-none text-gray-900 dark:text-white sm:max-w-[500px] shadow-2xl p-0 gap-0 overflow-hidden outline-none [&>button]:hidden">
                <div className="flex justify-between items-start p-6 border-b border-gray-100 dark:border-white/5">
                    <div className="space-y-1">
                        <DialogTitle className="text-lg font-bold">Session Details</DialogTitle>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 -mt-1 -mr-2 text-gray-500 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white">
                        <X className="w-4 h-4" />
                    </Button>
                </div>

                <div className="p-6 space-y-6">
                    {/* Header Info */}
                    <div>
                        <h3 className="text-lg font-bold text-gray-900 dark:text-white mb-2">
                            {isGroup ? "Group Training Session" : isOpen ? "Group Training Session" : session.client}
                        </h3>
                        <div className="flex gap-2">
                            <Badge className={`${getBadgeColor()} border-0 px-2.5 py-0.5 rounded text-xs font-semibold uppercase tracking-wide`}>
                                {session.type}
                            </Badge>
                            <Badge variant="outline" className="text-green-600 border-green-200 bg-green-50 dark:bg-green-900/10 dark:border-green-900/20 px-2.5 py-0.5 rounded text-xs font-bold uppercase tracking-wide">
                                Scheduled
                            </Badge>
                        </div>
                    </div>

                    {/* Date & Time Card */}
                    <div className="grid grid-cols-2 gap-4 bg-white dark:bg-zinc-950/50 p-4 rounded-xl border border-gray-200 dark:border-white/5">
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                                <Calendar className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Date</span>
                            </div>
                            <p className="text-sm font-medium pl-6 text-gray-900 dark:text-white">{format(session.date, "EEEE, MMMM d, yyyy")}</p>
                        </div>
                        <div className="space-y-1">
                            <div className="flex items-center gap-2 text-gray-400 dark:text-gray-500">
                                <Clock className="w-4 h-4" />
                                <span className="text-[10px] font-bold uppercase tracking-wider">Time</span>
                            </div>
                            <p className="text-sm font-medium pl-6 text-gray-900 dark:text-white">
                                {format(session.date, "HH:mm")} - {format(new Date(session.date.getTime() + (session.duration || 60) * 60000), "HH:mm")}
                            </p>
                        </div>
                    </div>

                    {/* Specific Details based on Type */}
                    {isGroup && (
                        <div className="space-y-3 p-4 border border-gray-200 dark:border-white/5 rounded-xl bg-white dark:bg-zinc-950/20">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Group Session Details</h4>
                            <div className="flex items-center gap-3 text-gray-600 dark:text-gray-300">
                                <Users className="w-5 h-5 text-gray-400" />
                                <span className="text-sm">
                                    <span className="font-bold text-gray-900 dark:text-white">{session.participants || 0} / {session.maxParticipants || 8}</span> participants
                                </span>
                            </div>
                            <p className="text-xs text-gray-400 pl-8 font-medium">{session.maxParticipants ? session.maxParticipants - (session.participants || 0) : 8} spots remaining</p>
                        </div>
                    )}

                    {isPersonal && (
                        <div className="space-y-4 p-4 border border-gray-200 dark:border-white/5 rounded-xl bg-white dark:bg-zinc-950/20">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Client Information</h4>
                            <div className="flex items-start gap-3">
                                <Avatar className="w-10 h-10 border border-gray-200 dark:border-white/10">
                                    <AvatarImage src={`https://i.pravatar.cc/150?u=${session.client}`} />
                                    <AvatarFallback>{session.client.substring(0, 2)}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <p className="text-sm font-bold text-gray-900 dark:text-white">{session.client}</p>
                                    <p className="text-xs text-gray-500 font-medium">Hybrid Training</p>
                                </div>
                            </div>
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-2 gap-x-4 pt-2">
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Mail className="w-3.5 h-3.5" />
                                    <span>client@email.com</span>
                                </div>
                                <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                                    <Phone className="w-3.5 h-3.5" />
                                    <span>+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    )}

                    {isOpen && (
                        <div className="space-y-2 p-4 border border-gray-200 dark:border-white/5 rounded-xl bg-white dark:bg-zinc-950/20">
                            <h4 className="text-sm font-semibold text-gray-900 dark:text-white">Open Availability</h4>
                            <p className="text-xs text-gray-500 dark:text-gray-400 leading-relaxed">
                                This is an open time slot available for booking by clients.
                                No sessions have been booked yet.
                            </p>
                        </div>
                    )}
                </div>

                <div className="p-6 bg-white dark:bg-zinc-900 flex justify-end gap-3">
                    <Button variant="outline" onClick={onClose} className="border-gray-200 dark:border-white/10 dark:text-gray-300 dark:hover:bg-white/5 px-6 font-medium">
                        Close
                    </Button>
                    <Button variant="destructive" className="bg-red-600 hover:bg-red-700 text-white shadow-lg shadow-red-500/20 border-0 px-6 font-medium">
                        {isOpen ? "Cancel Session" : "Cancel Session"}
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
