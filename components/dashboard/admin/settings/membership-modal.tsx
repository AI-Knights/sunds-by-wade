"use client";

import { useEffect, useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, X, Trash2 } from "lucide-react";

interface MembershipModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: any;
    onSave: (data: any) => void;
}

export function MembershipModal({ isOpen, onClose, initialData, onSave }: MembershipModalProps) {
    const [name, setName] = useState("");
    const [price, setPrice] = useState("");
    const [billingCycle, setBillingCycle] = useState("Monthly");
    const [description, setDescription] = useState("");
    const [credits, setCredits] = useState("0");
    const [features, setFeatures] = useState<string[]>([]);
    const [isPopular, setIsPopular] = useState(false);
    const [newFeature, setNewFeature] = useState("");

    useEffect(() => {
        if (initialData) {
            setName(initialData.name);
            setPrice(initialData.price);
            setBillingCycle(initialData.cycle);
            setDescription(initialData.description || "");
            setCredits(initialData.credits);
            setFeatures(initialData.features || []);
            setIsPopular(initialData.popular || false);
        } else {
            setName("");
            setPrice("");
            setBillingCycle("Monthly");
            setDescription("");
            setCredits("0");
            setFeatures([]);
            setIsPopular(false);
        }
        setNewFeature("");
    }, [initialData, isOpen]);

    const handleAddFeature = () => {
        if (newFeature.trim()) {
            setFeatures([...features, newFeature]);
            setNewFeature("");
        }
    };

    const handleRemoveFeature = (index: number) => {
        setFeatures(features.filter((_, i) => i !== index));
    };

    const handleSave = () => {
        onSave({
            id: initialData?.id,
            name,
            price,
            cycle: billingCycle,
            description,
            credits,
            features,
            popular: isPopular
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto">
                <DialogHeader>
                    <DialogTitle>{initialData ? "Edit Membership Plan" : "Add New Membership Plan"}</DialogTitle>
                </DialogHeader>

                <div className="space-y-6 py-4">
                    <div className="space-y-2">
                        <Label>Plan Name *</Label>
                        <Input
                            placeholder="e.g. Premium Membership"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                        />
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                            <Label>Price ($) *</Label>
                            <Input
                                type="number"
                                placeholder="0"
                                value={price}
                                onChange={(e) => setPrice(e.target.value)}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label>Billing Cycle *</Label>
                            <Select value={billingCycle} onValueChange={setBillingCycle}>
                                <SelectTrigger>
                                    <SelectValue />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="Monthly">Monthly</SelectItem>
                                    <SelectItem value="Yearly">Yearly</SelectItem>
                                    <SelectItem value="One-Time">One-Time</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </div>

                    <div className="space-y-2">
                        <Label>Description</Label>
                        <Textarea
                            placeholder="Brief description of the membership plan..."
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Credits Included</Label>
                        <Input
                            type="number"
                            placeholder="0"
                            value={credits}
                            onChange={(e) => setCredits(e.target.value)}
                        />
                    </div>

                    <div className="space-y-2">
                        <Label>Features</Label>
                        <div className="space-y-2">
                            {features.map((feature, index) => (
                                <div key={index} className="flex items-center gap-2">
                                    <Input value={feature} readOnly className="flex-1 bg-gray-50 dark:bg-zinc-800/50" />
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                                        onClick={() => handleRemoveFeature(index)}
                                    >
                                        <Trash2 className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                            <div className="flex items-center gap-2">
                                <Input
                                    placeholder="e.g. Access to all classes"
                                    value={newFeature}
                                    onChange={(e) => setNewFeature(e.target.value)}
                                    onKeyDown={(e) => e.key === "Enter" && handleAddFeature()}
                                />
                                <Button
                                    variant="outline"
                                    className="gap-1 text-purple-600 border-purple-200 hover:bg-purple-50 dark:border-purple-500/30 dark:hover:bg-purple-500/10"
                                    onClick={handleAddFeature}
                                >
                                    <Plus className="w-4 h-4" />
                                    Add
                                </Button>
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center justify-between p-4 bg-gray-50 dark:bg-zinc-900 rounded-lg border border-gray-100 dark:border-zinc-800">
                        <div className="space-y-0.5">
                            <Label>Mark as Popular</Label>
                            <p className="text-xs text-muted-foreground">Highlight this plan with a badge</p>
                        </div>
                        <Switch checked={isPopular} onCheckedChange={setIsPopular} />
                    </div>
                </div>

                <DialogFooter>
                    <Button variant="outline" onClick={onClose}>Cancel</Button>
                    <Button
                        onClick={handleSave}
                        className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                    >
                        {initialData ? "Save Changes" : "Add Plan"}
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    );
}
