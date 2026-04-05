"use client";

import { X, User, Activity, Dumbbell, Calendar, Mail, Phone, MapPin, Ruler, Weight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";

interface RequestDetailsModalProps {
    isOpen: boolean;
    onClose: () => void;
    lead: any; // Using detailed type in real app
    onApprove: () => void;
    onReject: () => void;
}

export function RequestDetailsModal({ isOpen, onClose, lead, onApprove, onReject }: RequestDetailsModalProps) {
    if (!isOpen || !lead) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col max-h-[90vh]"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <div className="flex items-center gap-4">
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">Client Join Request Details</h3>
                            <Badge variant="outline" className="text-gray-500">Submitted: Oct 24, 2023</Badge>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="flex-1 overflow-y-auto p-6 space-y-8">
                        {/* Header Profile */}
                        <div className="flex items-start justify-between">
                            <div className="flex gap-4">
                                <Avatar className="w-20 h-20 border-2 border-white dark:border-zinc-800 shadow-md">
                                    <AvatarImage src={lead.avatar} />
                                    <AvatarFallback>{lead.name[0]}</AvatarFallback>
                                </Avatar>
                                <div>
                                    <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{lead.name}</h2>
                                    <div className="flex flex-col gap-1 mt-1 text-sm text-gray-500 dark:text-gray-400">
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-3.5 h-3.5" />
                                            {lead.email}
                                        </div>
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-3.5 h-3.5" />
                                            {lead.phone}
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="flex flex-col items-end gap-2">
                                <Badge variant="secondary" className="bg-orange-100 text-orange-700 dark:bg-orange-500/20 dark:text-orange-300">Join Request</Badge>
                                <Badge variant="outline" className="flex items-center gap-1">
                                    <Activity className="w-3 h-3 text-purple-500" />
                                    Pro Plan
                                </Badge>
                            </div>
                        </div>

                        <Separator />

                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                            {/* Personal Info */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
                                    <User className="w-4 h-4 text-purple-500" />
                                    Personal Information
                                </div>
                                <div className="bg-gray-50 dark:bg-white/5 rounded-xl p-4 space-y-3 text-sm">
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Age</span>
                                        <span className="font-medium">28</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Gender</span>
                                        <span className="font-medium">Female</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Height</span>
                                        <span className="font-medium">5'6"</span>
                                    </div>
                                    <div className="flex justify-between">
                                        <span className="text-gray-500">Current Weight</span>
                                        <span className="font-medium">145 lbs</span>
                                    </div>
                                </div>
                            </div>

                            {/* Fitness Goals */}
                            <div className="space-y-4">
                                <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
                                    <Activity className="w-4 h-4 text-purple-500" />
                                    Fitness Goals
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <p className="text-xs text-gray-500 mb-1.5">Primary Goal</p>
                                        <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-100 dark:bg-blue-500/20 dark:text-blue-300 border-none px-3 py-1">Build Muscle</Badge>
                                    </div>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1.5">Fitness Level</p>
                                            <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300">Intermediate</Badge>
                                        </div>
                                        <div>
                                            <p className="text-xs text-gray-500 mb-1.5">Training Style</p>
                                            <Badge variant="secondary" className="bg-green-100 text-green-700 dark:bg-green-500/20 dark:text-green-300">Strength Training</Badge>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Preferences */}
                        <div className="space-y-4">
                            <div className="flex items-center gap-2 text-gray-900 dark:text-white font-semibold">
                                <Dumbbell className="w-4 h-4 text-purple-500" />
                                Training Preferences
                            </div>

                            <div className="space-y-4">
                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Training Frequency</p>
                                    <div className="flex items-center gap-2 text-sm text-gray-600 dark:text-gray-400">
                                        <Calendar className="w-4 h-4" />
                                        4-5 days / week
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interested Equipment</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Dumbbells</Badge>
                                        <Badge variant="secondary">Resistance Bands</Badge>
                                        <Badge variant="secondary">Kettlebells</Badge>
                                    </div>
                                </div>

                                <div>
                                    <p className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Interested In</p>
                                    <div className="flex flex-wrap gap-2">
                                        <Badge variant="secondary">Group Classes</Badge>
                                        <Badge variant="secondary">Personal Training</Badge>
                                    </div>
                                </div>
                            </div>
                        </div>

                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 bg-gray-50/50 dark:bg-white/5">
                        <Button
                            variant="outline"
                            onClick={onReject}
                            className="text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10 border-red-200 dark:border-red-900/20"
                        >
                            <X className="w-4 h-4 mr-2" />
                            Reject Request
                        </Button>
                        <Button
                            onClick={onApprove}
                            className="bg-green-600 hover:bg-green-700 text-white shadow-lg shadow-green-500/25"
                        >
                            <CheckIcon className="w-4 h-4 mr-2" />
                            Approve Request
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}

function CheckIcon(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M20 6 9 17l-5-5" />
        </svg>
    )
}
