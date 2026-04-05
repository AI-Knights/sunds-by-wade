"use client";

import { useState } from "react";
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
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { X, Shield, ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { motion, AnimatePresence } from "framer-motion";

interface AddUserModalProps {
    isOpen: boolean;
    onClose: () => void;
}

// Permission Data Structure
const PERMISSION_GROUPS = [
    {
        id: "user_management",
        title: "User Management",
        permissions: [
            { id: "view_clients", label: "View Clients", description: "View client profiles and information" },
            { id: "manage_clients", label: "Manage Clients", description: "Add, edit, and remove clients" },
            { id: "view_trainers", label: "View Trainers", description: "View trainer profiles and information" },
            { id: "manage_trainers", label: "Manage Trainers", description: "Add, edit, and remove trainers" },
            { id: "trainer_assignment", label: "Trainer Assignment", description: "Assign trainers to clients" },
        ]
    },
    {
        id: "classes_schedules",
        title: "Classes & Schedules",
        permissions: [
            { id: "create_edit_classes", label: "Create/Edit Classes", description: "Create and modify class schedules" },
            { id: "manage_schedules", label: "Manage Schedules", description: "Control trainer and class schedules" },
            { id: "trainer_availability", label: "Trainer Availability", description: "Manage trainer availability and booking windows" },
        ]
    },
    {
        id: "workout_management",
        title: "Workout Management",
        permissions: [
            { id: "access_workout_builder", label: "Access Workout Builder", description: "Use the workout builder tool" },
            { id: "create_workout_templates", label: "Create Workout Templates", description: "Create and save workout templates" },
            { id: "assign_workouts", label: "Assign Workouts", description: "Assign workouts to clients" },
        ]
    },
    {
        id: "business_revenue",
        title: "Business & Revenue",
        permissions: [
            { id: "view_revenue", label: "View Revenue", description: "Access financial reports and revenue data" },
            { id: "manage_marketplace", label: "Manage Marketplace", description: "Manage products and marketplace settings" },
            { id: "inventory", label: "Inventory / Marketplace", description: "Manage inventory and product stock" },
            { id: "reports_exports", label: "Reports & Exports", description: "Export reports and data as CSV/PDF" },
        ]
    },
    {
        id: "operations",
        title: "Operations",
        permissions: [
            { id: "front_desk_access", label: "Front Desk Access", description: "Access front desk operations and manual sales" },
            { id: "manual_check_in", label: "Manual Client Check-In", description: "Manually check in clients at front desk" },
            { id: "inbox_messaging", label: "Inbox Messaging", description: "Send messages to clients and staff" },
            { id: "system_settings", label: "System Settings (Admin Only)", description: "Modify system-wide settings and configurations" },
        ]
    }
];

export function AddUserModal({ isOpen, onClose }: AddUserModalProps) {
    const [step, setStep] = useState<"details" | "permissions">("details");
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        role: "Client",
        status: "Active"
    });
    const [selectedPermissions, setSelectedPermissions] = useState<string[]>([]);

    // Reset state on close
    const handleClose = () => {
        setStep("details");
        setFormData({ name: "", email: "", role: "Client", status: "Active" });
        setSelectedPermissions([]);
        onClose();
    };

    const handleRoleChange = (role: string) => {
        setFormData(prev => ({ ...prev, role }));
    };

    const needsPermissions = formData.role === "Moderator" || formData.role === "Associate" || formData.role === "Trainer";

    const togglePermission = (id: string) => {
        setSelectedPermissions(prev =>
            prev.includes(id)
                ? prev.filter(p => p !== id)
                : [...prev, id]
        );
    };

    const toggleGroup = (groupId: string) => {
        const group = PERMISSION_GROUPS.find(g => g.id === groupId);
        if (!group) return;

        const allGroupPermissionIds = group.permissions.map(p => p.id);
        const allSelected = allGroupPermissionIds.every(id => selectedPermissions.includes(id));

        if (allSelected) {
            // Deselect all
            setSelectedPermissions(prev => prev.filter(id => !allGroupPermissionIds.includes(id)));
        } else {
            // Select all
            setSelectedPermissions(prev => {
                const newIds = new Set([...prev, ...allGroupPermissionIds]);
                return Array.from(newIds);
            });
        }
    };

    return (
        <Dialog open={isOpen} onOpenChange={handleClose}>
            <DialogContent className={cn(
                "bg-white dark:bg-zinc-950 border-gray-200 dark:border-white/10 shadow-2xl p-0 gap-0 overflow-hidden flex flex-col",
                step === "permissions" ? "max-w-2xl h-[85vh]" : "max-w-[500px]"
            )}>
                {/* Header */}
                <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/5 shrink-0">
                    <div className="flex items-center gap-3">
                        {step === "permissions" && (
                            <div className="bg-blue-50 text-blue-600 dark:bg-blue-500/10 dark:text-blue-400 p-2 rounded-lg">
                                <Shield className="w-5 h-5" />
                            </div>
                        )}
                        <DialogTitle className="text-xl font-bold text-gray-900 dark:text-white">
                            {step === "details" ? "Add New User" : "Role & Permissions"}
                        </DialogTitle>
                    </div>
                    {step === "permissions" && (
                        <p className="text-sm text-gray-500 ml-2">{formData.name} • {formData.role}</p>
                    )}
                    {/* <button
                        onClick={handleClose}
                        className="text-gray-400 hover:text-gray-500 dark:text-gray-500 dark:hover:text-gray-400"
                    >
                        <X className="w-5 h-5" />
                    </button> */}
                </div>

                {/* Content */}
                <div className="flex-1 overflow-y-auto">
                    {step === "details" ? (
                        <div className="p-6 space-y-6">
                            <div className="space-y-2">
                                <Label>Name</Label>
                                <Input
                                    placeholder="Enter full name"
                                    value={formData.name}
                                    onChange={e => setFormData(prev => ({ ...prev, name: e.target.value }))}
                                    className="bg-gray-50 dark:bg-zinc-950/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Email</Label>
                                <Input
                                    placeholder="email@example.com"
                                    value={formData.email}
                                    onChange={e => setFormData(prev => ({ ...prev, email: e.target.value }))}
                                    className="bg-gray-50 dark:bg-zinc-950/50"
                                />
                            </div>
                            <div className="space-y-2">
                                <Label>Role</Label>
                                <Select value={formData.role} onValueChange={handleRoleChange}>
                                    <SelectTrigger className="bg-gray-50 dark:bg-zinc-950/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Client">Client</SelectItem>
                                        <SelectItem value="Trainer">Trainer</SelectItem>
                                        <SelectItem value="Associate">Associate</SelectItem>
                                        <SelectItem value="Moderator">Moderator</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>
                            <div className="space-y-2">
                                <Label>Status</Label>
                                <Select value={formData.status} onValueChange={(val) => setFormData(prev => ({ ...prev, status: val }))}>
                                    <SelectTrigger className="bg-gray-50 dark:bg-zinc-950/50">
                                        <SelectValue />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Active">Active</SelectItem>
                                        <SelectItem value="Paused">Paused</SelectItem>
                                        <SelectItem value="Inactive">Inactive</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            {needsPermissions && (
                                <div className="p-3 bg-blue-50 dark:bg-blue-900/10 border border-blue-100 dark:border-blue-900/20 rounded-lg flex items-center gap-2">
                                    <Shield className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                                    <div>
                                        <p className="text-sm font-medium text-blue-700 dark:text-blue-300">Permissions configured</p>
                                        <button onClick={() => setStep("permissions")} className="text-xs text-blue-600 dark:text-blue-400 hover:underline">
                                            Edit permissions
                                        </button>
                                    </div>
                                </div>
                            )}
                        </div>
                    ) : (
                        <div className="p-6 space-y-6">
                            {PERMISSION_GROUPS.map((group) => {
                                const allGroupPermissionIds = group.permissions.map(p => p.id);
                                const allSelected = allGroupPermissionIds.every(id => selectedPermissions.includes(id));

                                return (
                                    <div key={group.id} className="space-y-3">
                                        <div className="flex items-center justify-between">
                                            <h3 className="font-semibold text-gray-900 dark:text-white">{group.title}</h3>
                                            <button
                                                onClick={() => toggleGroup(group.id)}
                                                className="text-xs font-medium text-purple-600 hover:text-purple-700 dark:text-purple-400"
                                            >
                                                {allSelected ? "Deselect All" : "Select All"}
                                            </button>
                                        </div>
                                        <div className="space-y-2">
                                            {group.permissions.map((permission) => (
                                                <div
                                                    key={permission.id}
                                                    onClick={() => togglePermission(permission.id)}
                                                    className={cn(
                                                        "flex items-start gap-3 p-3 rounded-xl border border-transparent cursor-pointer transition-all",
                                                        selectedPermissions.includes(permission.id)
                                                            ? "bg-purple-50 border-purple-200 dark:bg-purple-900/10 dark:border-purple-500/20"
                                                            : "bg-gray-50 dark:bg-zinc-900/50 hover:bg-gray-100 dark:hover:bg-zinc-800"
                                                    )}
                                                >
                                                    <Checkbox
                                                        checked={selectedPermissions.includes(permission.id)}
                                                        onCheckedChange={() => togglePermission(permission.id)}
                                                        className="mt-0.5 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                                    />
                                                    <div>
                                                        <p className="text-sm font-medium text-gray-900 dark:text-white leading-none mb-1">{permission.label}</p>
                                                        <p className="text-xs text-gray-500 dark:text-gray-400">{permission.description}</p>
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}
                </div>

                {/* Footer */}
                <DialogFooter className="p-6 pt-4 border-t border-gray-100 dark:border-white/5 shrink-0">
                    <div className="flex justify-between w-full">
                        <Button
                            variant="outline"
                            onClick={step === "permissions" ? () => setStep("details") : handleClose}
                            className="w-32"
                        >
                            Cancel
                        </Button>

                        {step === "details" ? (
                            needsPermissions ? (
                                <Button
                                    onClick={() => setStep("permissions")}
                                    className="bg-purple-600 hover:bg-purple-700 w-32"
                                >
                                    Set Permissions
                                </Button>
                            ) : (
                                <Button
                                    className="bg-purple-600 hover:bg-purple-700 w-32"
                                >
                                    Add User
                                </Button>
                            )
                        ) : (
                            <Button
                                onClick={handleClose} // In real app, save everything
                                className="bg-purple-600 hover:bg-purple-700 w-32"
                            >
                                Continue
                            </Button>
                        )}

                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
