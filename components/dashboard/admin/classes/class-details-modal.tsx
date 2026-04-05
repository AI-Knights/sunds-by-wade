"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card } from "@/components/ui/card";
import {
    Clock,
    Users,
    MapPin,
    User,
    Calendar,
    MessageSquare,
    Edit,
    Trash2,
    Video
} from "lucide-react";

interface ClassDetailsModalProps {
    classItem: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ClassDetailsModal({ classItem, isOpen, onClose }: ClassDetailsModalProps) {
    if (!classItem) return null;

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-md bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800">
                <DialogHeader>
                    <div className="mb-2">
                        <span className="text-2xl font-bold dark:text-white">{classItem.title}</span>
                    </div>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="w-4 h-4" />
                        <span>{new Date(classItem.date).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span>
                    </div>
                </DialogHeader>

                <div className="space-y-6 py-2">
                    {/* Time & Enrollment row */}
                    <div className="grid grid-cols-2 gap-4">
                        <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl flex items-center gap-3">
                            <Clock className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-muted-foreground">Time</p>
                                <p className="font-semibold text-sm dark:text-white">{classItem.startTime} - {classItem.endTime}</p>
                            </div>
                        </div>
                        <div className="p-3 bg-gray-50 dark:bg-zinc-900 rounded-xl flex items-center gap-3">
                            <Users className="w-5 h-5 text-gray-500" />
                            <div>
                                <p className="text-xs text-muted-foreground">Enrollment</p>
                                <p className="font-semibold text-sm dark:text-white">{classItem.enrolled} / {classItem.capacity} <span className="text-xs font-normal text-gray-400">({Math.round(classItem.enrolled / classItem.capacity * 100)}%)</span></p>
                            </div>
                        </div>
                    </div>

                    {/* Instructor */}
                    <div>
                        <p className="text-xs text-muted-foreground mb-2">Instructor</p>
                        <div className="flex items-center gap-3">
                            <Avatar className="h-10 w-10">
                                <AvatarImage src={classItem.instructor.avatar} />
                                <AvatarFallback>IN</AvatarFallback>
                            </Avatar>
                            <span className="font-medium dark:text-white text-lg">{classItem.instructor.name}</span>
                        </div>
                    </div>

                    {/* Credits & Virtual */}
                    <div className="space-y-2">
                        <p className="text-xs text-muted-foreground">Credits Required</p>
                        <div className="flex gap-2">
                            <Badge variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
                                {classItem.credits} credit{classItem.credits > 1 ? 's' : ''}
                            </Badge>
                            {classItem.isVirtual && (
                                <Badge variant="secondary" className="bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400 flex items-center gap-1">
                                    <Video className="w-3 h-3" /> Virtual Class
                                </Badge>
                            )}
                        </div>
                    </div>

                    {/* Description */}
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Description</p>
                        <p className="text-sm dark:text-gray-300">{classItem.description}</p>
                    </div>

                    {/* Attendees count */}
                    <div className="space-y-1">
                        <p className="text-xs text-muted-foreground">Attendees ({classItem.enrolled})</p>
                        <p className="text-xs text-gray-500">{classItem.enrolled} clients enrolled</p>
                    </div>
                </div>

                <DialogFooter className="flex gap-2">
                    <Button variant="outline" className="flex-1 gap-2 border-purple-200 text-purple-700 hover:bg-purple-50 dark:border-purple-900/50 dark:text-purple-400 dark:hover:bg-purple-900/20">
                        <MessageSquare className="w-4 h-4" /> Message All
                    </Button>
                    <Button variant="outline" className="gap-2">
                        <Edit className="w-4 h-4" /> Edit
                    </Button>
                    <Button variant="outline" className="gap-2 text-red-600 hover:bg-red-50 dark:text-red-400 dark:hover:bg-red-900/20">
                        <Trash2 className="w-4 h-4" /> Delete
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
