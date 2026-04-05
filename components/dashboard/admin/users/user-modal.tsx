"use client";

import {
    Dialog,
    DialogContent,
    DialogHeader,
    DialogTitle,
    DialogFooter,
    DialogDescription
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
    X
} from "lucide-react";
import { useState, useEffect } from "react";

interface UserModalProps {
    user: any | null;
    isOpen: boolean;
    onClose: () => void;
}

export function UserModal({ user, isOpen, onClose }: UserModalProps) {
    const [notes, setNotes] = useState("");
    const [isAssigning, setIsAssigning] = useState(false);

    useEffect(() => {
        if (user) {
            setNotes(user.notes || "");
            setIsAssigning(false);
        }
    }, [user]);

    if (!user) return null;

    const isClient = user.role === "Client";
    const isTrainer = user.role === "Trainer";

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-4xl max-h-[90vh] overflow-y-auto bg-white dark:bg-zinc-950 border-gray-200 dark:border-zinc-800">
                <DialogHeader className="flex flex-row items-center justify-between">
                    <DialogTitle className="text-xl">
                        {isClient ? "Manage Client" : isTrainer ? "Trainer Profile" : "User Details"}
                    </DialogTitle>
                    {/* <Button variant="ghost" size="icon" onClick={onClose}>
                        <X className="w-5 h-5" />
                    </Button> */}
                </DialogHeader>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mt-4">
                    {/* Left Column - Profile Overview */}
                    <div className="lg:col-span-1 space-y-6">
                        <div className="flex flex-col items-center text-center p-6 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                            <Avatar className="h-24 w-24 mb-4 border-2 border-white dark:border-zinc-800 shadow-lg">
                                <AvatarImage src={user.avatar} />
                                <AvatarFallback className="text-2xl">{user.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <h2 className="text-xl font-bold dark:text-white">{user.name}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <Badge variant="outline" className="bg-white dark:bg-zinc-800">{user.role}</Badge>
                                <Badge className={user.status === "Active" ? "bg-emerald-500 hover:bg-emerald-600" : "bg-gray-500"}>
                                    {user.status}
                                </Badge>
                            </div>
                        </div>

                        {/* Quick Stats (Client) */}
                        {isClient && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick Stats</h3>
                                <div className="grid grid-cols-2 gap-3">
                                    <div className="p-3 bg-blue-50 dark:bg-blue-900/10 rounded-lg">
                                        <div className="text-xs text-blue-600 dark:text-blue-400 mb-1 flex items-center gap-1">
                                            <Activity className="w-3 h-3" /> Check-ins
                                        </div>
                                        <div className="text-lg font-bold text-blue-700 dark:text-blue-300">{user.totalCheckIns || 0}</div>
                                    </div>
                                    <div className="p-3 bg-purple-50 dark:bg-purple-900/10 rounded-lg">
                                        <div className="text-xs text-purple-600 dark:text-purple-400 mb-1 flex items-center gap-1">
                                            <Dumbbell className="w-3 h-3" /> Workouts
                                        </div>
                                        <div className="text-lg font-bold text-purple-700 dark:text-purple-300">{user.workoutsDone || 0}</div>
                                    </div>
                                </div>
                            </div>
                        )}

                        {/* Quick Stats (Trainer) */}
                        {isTrainer && (
                            <div className="space-y-3">
                                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Performance</h3>
                                <div className="p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl space-y-3">
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Clients</span>
                                        <span className="font-semibold dark:text-white">{user.clientCount || 0}</span>
                                    </div>
                                    <Separator />
                                    <div className="flex justify-between items-center">
                                        <span className="text-sm text-gray-500">Rating</span>
                                        <span className="font-semibold dark:text-white flex items-center gap-1">
                                            4.9 <span className="text-yellow-500">★</span>
                                        </span>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Right Column - Detailed Info */}
                    <div className="lg:col-span-2 space-y-8">

                        {/* Contact Information */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                <UserCheck className="w-5 h-5 text-gray-500" /> Contact Information
                            </h3>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500">Email Address</Label>
                                    <div className="flex items-center gap-2 text-sm dark:text-gray-300">
                                        <Mail className="w-4 h-4 text-gray-400" /> {user.email}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500">Phone Number</Label>
                                    <div className="flex items-center gap-2 text-sm dark:text-gray-300">
                                        <Phone className="w-4 h-4 text-gray-400" /> {user.phone}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500">Address</Label>
                                    <div className="flex items-center gap-2 text-sm dark:text-gray-300">
                                        <MapPin className="w-4 h-4 text-gray-400" /> {user.location}
                                    </div>
                                </div>
                                <div className="space-y-1">
                                    <Label className="text-xs text-gray-500">Date of Birth</Label>
                                    <div className="flex items-center gap-2 text-sm dark:text-gray-300">
                                        <Calendar className="w-4 h-4 text-gray-400" /> {user.dob || "N/A"}
                                    </div>
                                </div>
                            </div>
                        </section>

                        <Separator />

                        {/* Role Specific Details */}
                        {isClient && (
                            <>
                                <section className="space-y-4">
                                    <div className="flex items-center justify-between">
                                        <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                            <Briefcase className="w-5 h-5 text-gray-500" /> Assigned Trainer
                                        </h3>
                                        <Button
                                            variant="ghost"
                                            size="sm"
                                            className="text-purple-600 hover:text-purple-700 hover:bg-purple-50"
                                            onClick={() => setIsAssigning(!isAssigning)}
                                        >
                                            {isAssigning ? "Cancel" : "Reassign"}
                                        </Button>
                                    </div>

                                    {isAssigning ? (
                                        <div className="p-4 bg-purple-50 dark:bg-purple-900/10 rounded-xl space-y-3">
                                            <Label>Select Trainer</Label>
                                            <div className="flex gap-2">
                                                <Input placeholder="Search trainers..." className="bg-white dark:bg-zinc-900" />
                                                <Button className="bg-purple-600 hover:bg-purple-700">Assign</Button>
                                            </div>
                                        </div>
                                    ) : (
                                        <div className="flex items-center p-4 bg-gray-50 dark:bg-zinc-900 rounded-xl border border-gray-100 dark:border-zinc-800">
                                            {user.assignedTrainer ? (
                                                <>
                                                    <Avatar className="h-10 w-10 mr-3">
                                                        <AvatarFallback>TR</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium dark:text-white">{user.assignedTrainer.name}</p>
                                                        <p className="text-xs text-muted-foreground">{user.assignedTrainer.email}</p>
                                                    </div>
                                                    <Badge className="ml-auto bg-green-100 text-green-800 hover:bg-green-100 dark:bg-green-900/30 dark:text-green-400 border-none shadow-none">
                                                        Assigned
                                                    </Badge>
                                                </>
                                            ) : (
                                                <p className="text-sm text-gray-500 italic">No trainer assigned.</p>
                                            )}
                                        </div>
                                    )}
                                </section>
                                <Separator />
                            </>
                        )}

                        {isTrainer && (
                            <>
                                <section className="space-y-4">
                                    <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                        <Briefcase className="w-5 h-5 text-gray-500" /> Work Information
                                    </h3>
                                    <div className="grid grid-cols-2 gap-4">
                                        <div>
                                            <Label className="text-xs text-gray-500">Employment Status</Label>
                                            <p className="text-sm font-medium dark:text-white mt-1">{user.employmentStatus}</p>
                                        </div>
                                        <div>
                                            <Label className="text-xs text-gray-500">Join Date</Label>
                                            <p className="text-sm font-medium dark:text-white mt-1">{user.joinDate}</p>
                                        </div>
                                        <div className="col-span-2">
                                            <Label className="text-xs text-gray-500">Specialties</Label>
                                            <div className="flex gap-2 mt-2">
                                                {user.specialties?.map((tag: string) => (
                                                    <Badge key={tag} variant="secondary">{tag}</Badge>
                                                ))}
                                            </div>
                                        </div>
                                    </div>
                                </section>
                                <Separator />
                            </>
                        )}

                        {/* Recent Activity (Universal but mostly for Clients) */}
                        {user.recentActivity && (
                            <section className="space-y-4">
                                <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                    <Clock className="w-5 h-5 text-gray-500" /> Recent Activity
                                </h3>
                                <div className="space-y-3">
                                    {user.recentActivity.map((activity: any) => (
                                        <div key={activity.id} className="flex items-start gap-3 text-sm">
                                            <div className="mt-1 min-w-[20px] text-center">
                                                {activity.type === 'check-in' && <Activity className="w-4 h-4 text-blue-500" />}
                                                {activity.type === 'payment' && <CheckCircle className="w-4 h-4 text-green-500" />}
                                                {activity.type === 'class' && <Users className="w-4 h-4 text-purple-500" />}
                                                {activity.type === 'workout' && <Dumbbell className="w-4 h-4 text-orange-500" />}
                                            </div>
                                            <div>
                                                <p className="font-medium dark:text-white">{activity.title}</p>
                                                <p className="text-xs text-gray-500">{activity.time}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </section>
                        )}

                        <Separator />

                        {/* Notes Section */}
                        <section className="space-y-4">
                            <h3 className="text-lg font-semibold dark:text-white flex items-center gap-2">
                                <MessageSquare className="w-5 h-5 text-gray-500" /> Notes
                            </h3>
                            <Textarea
                                placeholder="Add private notes about this user..."
                                className="min-h-[100px] bg-gray-50 dark:bg-zinc-900 border-gray-200 dark:border-zinc-800"
                                value={notes}
                                onChange={(e) => setNotes(e.target.value)}
                            />
                            <div className="flex justify-end">
                                <Button size="sm" className="bg-purple-600 hover:bg-purple-700 text-white">Save Notes</Button>
                            </div>
                        </section>
                    </div>
                </div>

                <DialogFooter className="mt-6 border-t border-gray-100 dark:border-zinc-800 pt-4">
                    <div className="flex justify-between w-full items-center">
                        <div className="flex gap-2">
                            {/* Quick Actions */}
                            <Button variant="outline" size="sm" className="gap-2">
                                <Mail className="w-4 h-4" /> Send Message
                            </Button>
                            <Button variant="outline" size="sm" className="gap-2 text-red-600 hover:text-red-700 hover:bg-red-50 dark:hover:bg-red-900/10">
                                <Shield className="w-4 h-4" /> Suspend User
                            </Button>
                        </div>
                        <div className="flex gap-2">
                            <Button variant="outline" onClick={onClose}>Close</Button>
                            <Button className="bg-purple-600 hover:bg-purple-700">Edit Profile</Button>
                        </div>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
