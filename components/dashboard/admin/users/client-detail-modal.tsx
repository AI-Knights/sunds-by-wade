"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ScrollArea } from "@/components/ui/scroll-area";
import {
    Mail,
    Phone,
    MapPin,
    Calendar,
    Briefcase,
    Shield,
    Activity,
    Clock,
    UserCheck,
    Dumbbell,
    MessageSquare,
    CheckCircle,
    X,
    MoreHorizontal,
    CreditCard,
    Zap,
    UserPlus,
    UserMinus,
    Users
} from "lucide-react";
import { useState, useEffect } from "react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface ClientDetailModalProps {
    user: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export function ClientDetailModal({ user, isOpen, onClose }: ClientDetailModalProps) {
    const [notes, setNotes] = useState("");
    const [isAssigning, setIsAssigning] = useState(false);
    const [searchTrainer, setSearchTrainer] = useState("");

    useEffect(() => {
        if (user) {
            setNotes(user.notes || "");
            setIsAssigning(false);
        }
    }, [user]);

    if (!user) return null;

    // Animation variants
    const containerVariants = {
        hidden: { opacity: 0 },
        visible: {
            opacity: 1,
            transition: {
                staggerChildren: 0.1
            }
        }
    };

    const itemVariants = {
        hidden: { opacity: 0, y: 10 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-5xl max-h-[90vh] p-0 overflow-hidden bg-white dark:bg-zinc-950 border-gray-200 dark:border-white/10 shadow-2xl flex flex-col">

                {/* Header */}
                <div className="p-6 border-b border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-900 flex justify-between items-start shrink-0 z-10">
                    <div className="flex items-center gap-4">
                        <Avatar className="h-16 w-16 border-2 border-gray-100 dark:border-zinc-800 shadow-sm">
                            <AvatarImage src={user.avatar} />
                            <AvatarFallback className="text-xl dark:bg-zinc-800">{user.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div>
                            <h2 className="text-2xl font-bold text-gray-900 dark:text-white">{user.name}</h2>
                            <div className="flex items-center gap-2 mt-1">
                                <Badge variant="secondary" className="bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 font-normal">
                                    {user.role}
                                </Badge>
                                <Badge className={cn(
                                    "font-normal",
                                    user.status === "Active" ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 hover:bg-emerald-200" :
                                        user.status === "Paused" ? "bg-amber-100 text-amber-700 dark:bg-amber-500/20 dark:text-amber-400 hover:bg-amber-200" :
                                            "bg-red-100 text-red-700 dark:bg-red-500/20 dark:text-red-400 hover:bg-red-200"
                                )}>
                                    {user.status}
                                </Badge>
                            </div>
                        </div>
                    </div>
                    <Button variant="ghost" size="icon" onClick={onClose} className="text-gray-400 hover:text-gray-500 dark:hover:text-white">
                        <X className="w-5 h-5" />
                    </Button>
                </div>

                {/* Content */}
                <ScrollArea className="flex-1 overflow-y-auto bg-gray-50/50 dark:bg-black/20">
                    <div className="p-6">
                        <motion.div
                            className="grid grid-cols-1 lg:grid-cols-3 gap-6"
                            variants={containerVariants}
                            initial="hidden"
                            animate="visible"
                        >
                            {/* Left Column (2 cols wide) */}
                            <div className="lg:col-span-2 space-y-6">

                                {/* Contact Info Card */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Contact Information</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-y-4 gap-x-8">
                                        <div className="space-y-1">
                                            <Label className="text-xs text-gray-400 dark:text-gray-500 font-normal">Email</Label>
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                <Mail className="w-3.5 h-3.5 text-gray-400" /> {user.email}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-gray-400 dark:text-gray-500 font-normal">Phone</Label>
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                <Phone className="w-3.5 h-3.5 text-gray-400" /> {user.phone}
                                            </div>
                                        </div>
                                        <div className="space-y-1 col-span-2">
                                            <Label className="text-xs text-gray-400 dark:text-gray-500 font-normal">Address</Label>
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                <MapPin className="w-3.5 h-3.5 text-gray-400" /> {user.location}
                                            </div>
                                        </div>
                                        <div className="space-y-1">
                                            <Label className="text-xs text-gray-400 dark:text-gray-500 font-normal">Date of Birth</Label>
                                            <div className="flex items-center gap-2 text-sm font-medium text-gray-900 dark:text-gray-200">
                                                <Calendar className="w-3.5 h-3.5 text-gray-400" /> {user.dob || "N/A"}
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Emergency Contact */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Emergency Contact</h3>
                                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
                                                <UserCheck className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Name</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{user.emergencyContact?.name || "N/A"}</p>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-3">
                                            <div className="h-8 w-8 rounded-full bg-orange-50 dark:bg-orange-500/10 flex items-center justify-center">
                                                <Phone className="w-4 h-4 text-orange-600 dark:text-orange-400" />
                                            </div>
                                            <div>
                                                <p className="text-xs text-gray-500 dark:text-gray-400">Phone</p>
                                                <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{user.emergencyContact?.phone || "N/A"}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Assigned Trainer */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <div className="flex justify-between items-center mb-4">
                                        <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Assigned Trainer</h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="h-8 text-xs text-purple-600 hover:text-purple-700 hover:bg-purple-50 dark:text-purple-400 dark:hover:bg-purple-500/10"
                                            onClick={() => setIsAssigning(!isAssigning)}
                                        >
                                            {isAssigning ? "Cancel" : (user.assignedTrainer ? "Reassign" : "Assign")}
                                        </Button>
                                    </div>

                                    {isAssigning ? (
                                        <div className="space-y-3">
                                            <Input
                                                placeholder="Search for a trainer..."
                                                className="bg-gray-50 dark:bg-zinc-950/50"
                                                value={searchTrainer}
                                                onChange={(e) => setSearchTrainer(e.target.value)}
                                            />
                                            <div className="p-3 bg-gray-50 dark:bg-zinc-950/50 rounded-lg text-center text-sm text-gray-500">
                                                Search functionality would go here...
                                            </div>
                                            <Button className="w-full bg-purple-600 hover:bg-purple-700 text-white">
                                                Assign Trainer
                                            </Button>
                                        </div>
                                    ) : (
                                        <>
                                            {user.assignedTrainer ? (
                                                <div className="flex items-center p-3 bg-emerald-50/50 dark:bg-emerald-500/5 border border-emerald-100 dark:border-emerald-500/20 rounded-xl">
                                                    <Avatar className="h-10 w-10 mr-3 border border-emerald-200 dark:border-emerald-500/30">
                                                        <AvatarFallback className="bg-emerald-100 text-emerald-700 dark:bg-emerald-900 dark:text-emerald-300">TR</AvatarFallback>
                                                    </Avatar>
                                                    <div className="flex-1">
                                                        <p className="font-semibold text-gray-900 dark:text-gray-100 text-sm">{user.assignedTrainer.name}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{user.assignedTrainer.email}</p>
                                                    </div>
                                                    <Badge className="bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-400 border-none shadow-none">
                                                        Assigned
                                                    </Badge>
                                                </div>
                                            ) : (
                                                <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-100 dark:border-white/10 rounded-xl bg-gray-50/50 dark:bg-zinc-950/30">
                                                    <UserMinus className="w-8 h-8 text-gray-300 dark:text-gray-600 mb-2" />
                                                    <p className="text-sm text-gray-500 font-medium">No trainer assigned</p>
                                                    <p className="text-xs text-gray-400">Click &quot;Assign&quot; to select a trainer</p>
                                                </div>
                                            )}
                                        </>
                                    )}
                                </motion.div>

                                {/* Recent Activity */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Recent Activity</h3>
                                    <div className="space-y-4">
                                        {user.recentActivity?.map((activity: any, index: number) => (
                                            <div key={index} className="relative pl-6 pb-4 last:pb-0 border-l border-gray-100 dark:border-white/10 last:border-0">
                                                <div className="absolute left-[-5px] top-1 h-2.5 w-2.5 rounded-full bg-white dark:bg-zinc-900 ring-4 ring-gray-50 dark:ring-zinc-800 border-2 border-purple-500" />
                                                <div className="bg-gray-50 dark:bg-zinc-950/50 p-3 rounded-xl border border-gray-100 dark:border-white/5 flex items-center justify-between group hover:border-purple-200 dark:hover:border-purple-500/30 transition-colors">
                                                    <div className="flex items-center gap-3">
                                                        <div className={cn(
                                                            "h-8 w-8 rounded-lg flex items-center justify-center",
                                                            activity.type === 'check-in' && "bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400",
                                                            activity.type === 'class' && "bg-purple-50 text-purple-600 dark:bg-purple-500/10 dark:text-purple-400",
                                                            activity.type === 'workout' && "bg-orange-50 text-orange-600 dark:bg-orange-500/10 dark:text-orange-400",
                                                            activity.type === 'payment' && "bg-emerald-50 text-emerald-600 dark:bg-emerald-500/10 dark:text-emerald-400"
                                                        )}>
                                                            {activity.type === 'check-in' && <Activity className="w-4 h-4" />}
                                                            {activity.type === 'class' && <Users className="w-4 h-4" />}
                                                            {activity.type === 'workout' && <Dumbbell className="w-4 h-4" />}
                                                            {activity.type === 'payment' && <CreditCard className="w-4 h-4" />}
                                                        </div>
                                                        <div>
                                                            <p className="text-sm font-medium text-gray-900 dark:text-gray-200">{activity.title}</p>
                                                            <p className="text-xs text-gray-500">{activity.time}</p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </motion.div>

                                {/* Notes */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Notes</h3>
                                    <Textarea
                                        placeholder="Add private notes about this user..."
                                        className="min-h-[100px] bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 resize-none focus:ring-purple-500/20"
                                        value={notes}
                                        onChange={(e) => setNotes(e.target.value)}
                                    />
                                    <div className="mt-3 flex justify-end">
                                        <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                                            Save Notes
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>

                            {/* Right Column (1 col wide) */}
                            <div className="space-y-6">
                                {/* Membership Card */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Membership</h3>
                                    <div className="space-y-4">
                                        <div>
                                            <p className="text-xs text-gray-400 mb-1">Tier</p>
                                            <p className="text-lg font-bold text-gray-900 dark:text-white">{user.membership}</p>
                                        </div>
                                        <div className="flex justify-between items-center py-2 border-t border-b border-gray-50 dark:border-white/5">
                                            <div>
                                                <p className="text-xs text-gray-400 mb-0.5">Join Date</p>
                                                <p className="text-sm font-medium dark:text-gray-200">{user.joinDate}</p>
                                            </div>
                                            <div className="text-right">
                                                <p className="text-xs text-gray-400 mb-0.5">Credits Remaining</p>
                                                <p className={cn(
                                                    "text-xl font-bold",
                                                    (user.credits || 0) > 5 ? "text-emerald-600 dark:text-emerald-400" : "text-amber-500"
                                                )}>{user.credits || 0}</p>
                                            </div>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Quick Stats */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Quick Stats</h3>
                                    <div className="space-y-3">
                                        <div className="flex items-center justify-between p-3 bg-blue-50 dark:bg-blue-500/5 rounded-xl border border-blue-100 dark:border-blue-500/10">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-blue-100 dark:bg-blue-500/20 p-2 rounded-lg text-blue-600 dark:text-blue-400">
                                                    <Clock className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Last Check-In</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{user.lastCheckIn || "N/A"}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-emerald-50 dark:bg-emerald-500/5 rounded-xl border border-emerald-100 dark:border-emerald-500/10">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-emerald-100 dark:bg-emerald-500/20 p-2 rounded-lg text-emerald-600 dark:text-emerald-400">
                                                    <Activity className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Total Check-Ins</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{user.totalCheckIns || 0}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-purple-50 dark:bg-purple-500/5 rounded-xl border border-purple-100 dark:border-purple-500/10">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-purple-100 dark:bg-purple-500/20 p-2 rounded-lg text-purple-600 dark:text-purple-400">
                                                    <Dumbbell className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Workouts Done</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{user.workoutsDone || 0}</span>
                                        </div>

                                        <div className="flex items-center justify-between p-3 bg-amber-50 dark:bg-amber-500/5 rounded-xl border border-amber-100 dark:border-amber-500/10">
                                            <div className="flex items-center gap-3">
                                                <div className="bg-amber-100 dark:bg-amber-500/20 p-2 rounded-lg text-amber-600 dark:text-amber-400">
                                                    <Calendar className="w-4 h-4" />
                                                </div>
                                                <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Upcoming Classes</span>
                                            </div>
                                            <span className="text-sm font-bold text-gray-900 dark:text-white">{user.upcomingClasses || 0}</span>
                                        </div>
                                    </div>
                                </motion.div>

                                {/* Quick Actions */}
                                <motion.div variants={itemVariants} className="bg-white dark:bg-zinc-900 p-5 rounded-2xl border border-gray-100 dark:border-white/5 shadow-sm">
                                    <h3 className="text-sm font-medium text-gray-500 dark:text-gray-400 mb-4 uppercase tracking-wider">Quick Actions</h3>
                                    <div className="space-y-2">
                                        <Button variant="outline" className="w-full justify-between h-10 hover:border-blue-200 hover:bg-blue-50 hover:text-blue-700 dark:hover:bg-blue-900/10 dark:hover:text-blue-400 dark:hover:border-blue-500/30 group">
                                            <span className="flex items-center gap-2"><Mail className="w-4 h-4 text-gray-400 group-hover:text-blue-500" /> Send Message</span>
                                            <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                        <Button variant="outline" className="w-full justify-between h-10 hover:border-emerald-200 hover:bg-emerald-50 hover:text-emerald-700 dark:hover:bg-emerald-900/10 dark:hover:text-emerald-400 dark:hover:border-emerald-500/30 group">
                                            <span className="flex items-center gap-2"><CheckCircle className="w-4 h-4 text-gray-400 group-hover:text-emerald-500" /> Check In</span>
                                            <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                        <Button variant="outline" className="w-full justify-between h-10 hover:border-purple-200 hover:bg-purple-50 hover:text-purple-700 dark:hover:bg-purple-900/10 dark:hover:text-purple-400 dark:hover:border-purple-500/30 group">
                                            <span className="flex items-center gap-2"><Calendar className="w-4 h-4 text-gray-400 group-hover:text-purple-500" /> Book Class</span>
                                            <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                        <Button variant="outline" className="w-full justify-between h-10 hover:border-amber-200 hover:bg-amber-50 hover:text-amber-700 dark:hover:bg-amber-900/10 dark:hover:text-amber-400 dark:hover:border-amber-500/30 group">
                                            <span className="flex items-center gap-2"><Dumbbell className="w-4 h-4 text-gray-400 group-hover:text-amber-500" /> Assign Workout</span>
                                            <Zap className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                                        </Button>
                                    </div>
                                </motion.div>
                            </div>
                        </motion.div>
                    </div>
                </ScrollArea>

                {/* Footer */}
                <DialogFooter className="p-6 border-t border-gray-100 dark:border-white/5 bg-white dark:bg-zinc-900 z-10">
                    <div className="flex justify-between w-full items-center">
                        <Button variant="outline" onClick={onClose} className="border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5">
                            Close
                        </Button>
                        <div className="flex gap-3">
                            {/* <Button variant="outline" className="border-gray-200 hover:bg-gray-50 dark:border-white/10 dark:hover:bg-white/5">
                                Edit Profile
                            </Button> */}
                            <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20">
                                Save Changes
                            </Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
