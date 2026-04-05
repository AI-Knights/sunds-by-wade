"use client";

import { useState, useEffect } from "react";
import { X, Upload, DollarSign, Package, Tag, Layers, Check } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Textarea } from "@/components/ui/textarea";
import { cn } from "@/lib/utils";

export type Product = {
    id: string;
    name: string;
    category: string;
    price: number;
    credits: number;
    inventory: number;
    isVisible: boolean;
    image?: string;
    description?: string;
    isTaxable?: boolean;
    isPosAvailable?: boolean;
};

interface ProductModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (product: Partial<Product>) => void;
    initialData?: Product | null;
}

export function ProductModal({ isOpen, onClose, onSave, initialData }: ProductModalProps) {
    const [formData, setFormData] = useState<Partial<Product>>({
        name: "",
        category: "",
        price: 0,
        credits: 0,
        inventory: 0,
        isVisible: true,
        description: "",
        isTaxable: true,
        isPosAvailable: true
    });

    useEffect(() => {
        if (initialData) {
            setFormData(initialData);
        } else {
            setFormData({
                name: "",
                category: "",
                price: 0,
                credits: 0,
                inventory: 0,
                isVisible: true,
                description: "",
                isTaxable: true,
                isPosAvailable: true
            });
        }
    }, [initialData, isOpen]);

    const handleChange = (field: keyof Product, value: any) => {
        setFormData(prev => {
            const updates = { ...prev, [field]: value };

            // Auto-calculate credits (simple 1:1 ratio for demo, or formula)
            if (field === 'price') {
                updates.credits = Number(value); // Assuming $1 = 1 credit for simplicity
            }

            return updates;
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(formData);
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
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-xl w-full max-w-2xl overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <div>
                            <h3 className="text-xl font-bold text-gray-900 dark:text-white">
                                {initialData ? "Edit Product" : "Add New Product"}
                            </h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {initialData ? "Update product details and inventory." : "Fill in the details to create a new product."}
                            </p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 hover:bg-gray-200 dark:hover:bg-white/10 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    {/* Body */}
                    <div className="flex-1 overflow-y-auto p-6 space-y-6">
                        {/* Stats / Info Row */}
                        <div className="grid grid-cols-2 gap-4 p-4 bg-blue-50 dark:bg-blue-900/10 rounded-lg border border-blue-100 dark:border-blue-500/10">
                            <div>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Total Products</p>
                                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">8</p>
                            </div>
                            <div>
                                <p className="text-xs text-blue-600 dark:text-blue-400 font-medium">Visible in App</p>
                                <p className="text-lg font-bold text-blue-700 dark:text-blue-300">5</p>
                            </div>
                        </div>

                        <div className="space-y-4">
                            <div className="space-y-2">
                                <Label>Product Name *</Label>
                                <Input
                                    value={formData.name}
                                    onChange={(e) => handleChange("name", e.target.value)}
                                    placeholder="e.g., Protein Bar - Chocolate"
                                    className="bg-gray-50 dark:bg-white/5"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Category *</Label>
                                <Select
                                    value={formData.category}
                                    onValueChange={(val) => handleChange("category", val)}
                                >
                                    <SelectTrigger className="bg-gray-50 dark:bg-white/5">
                                        <SelectValue placeholder="Select Category" />
                                    </SelectTrigger>
                                    <SelectContent>
                                        <SelectItem value="Consumables">Consumables</SelectItem>
                                        <SelectItem value="Supplements">Supplements</SelectItem>
                                        <SelectItem value="Apparel">Apparel</SelectItem>
                                        <SelectItem value="Equipment">Equipment</SelectItem>
                                        <SelectItem value="Passes">Passes</SelectItem>
                                    </SelectContent>
                                </Select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label>Price (USD) *</Label>
                                    <div className="relative">
                                        <DollarSign className="absolute left-3 top-2.5 w-4 h-4 text-muted-foreground" />
                                        <Input
                                            type="number"
                                            value={formData.price}
                                            onChange={(e) => handleChange("price", Number(e.target.value))}
                                            className="pl-9 bg-gray-50 dark:bg-white/5"
                                        />
                                    </div>
                                </div>
                                <div className="space-y-2">
                                    <Label>Credits Equivalent *</Label>
                                    <Input
                                        type="number"
                                        value={formData.credits}
                                        onChange={(e) => handleChange("credits", Number(e.target.value))}
                                        className="bg-gray-50 dark:bg-white/5"
                                    />
                                    <p className="text-[10px] text-muted-foreground">Auto-calculated (1:1 ratio)</p>
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label>Stock Quantity *</Label>
                                <Input
                                    type="number"
                                    value={formData.inventory}
                                    onChange={(e) => handleChange("inventory", Number(e.target.value))}
                                    className="bg-gray-50 dark:bg-white/5"
                                />
                            </div>

                            <div className="space-y-2">
                                <Label>Description</Label>
                                <Textarea
                                    value={formData.description}
                                    onChange={(e) => handleChange("description", e.target.value)}
                                    placeholder="Optional product description..."
                                    className="bg-gray-50 dark:bg-white/5 min-h-[80px]"
                                />
                            </div>

                            {/* Toggles */}
                            <div className="space-y-4 pt-2">
                                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.02]">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Taxable</Label>
                                        <p className="text-xs text-muted-foreground">Apply taxes to this product</p>
                                    </div>
                                    <Switch
                                        checked={formData.isTaxable}
                                        onCheckedChange={(c) => handleChange("isTaxable", c)}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.02]">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">Active / Visible</Label>
                                        <p className="text-xs text-muted-foreground">Show product in system</p>
                                    </div>
                                    <Switch
                                        checked={formData.isVisible}
                                        onCheckedChange={(c) => handleChange("isVisible", c)}
                                    />
                                </div>
                                <div className="flex items-center justify-between p-3 rounded-lg border border-gray-100 dark:border-white/5 bg-gray-50/30 dark:bg-white/[0.02]">
                                    <div className="space-y-0.5">
                                        <Label className="text-base">POS Availability</Label>
                                        <p className="text-xs text-muted-foreground">Available at front desk</p>
                                    </div>
                                    <Switch
                                        checked={formData.isPosAvailable}
                                        onCheckedChange={(c) => handleChange("isPosAvailable", c)}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="p-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 bg-gray-50/50 dark:bg-white/5">
                        <Button variant="outline" onClick={onClose} className="w-32">Cancel</Button>
                        <Button onClick={handleSubmit} className="w-40 bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25">
                            {initialData ? "Save Changes" : "Add Product"}
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
