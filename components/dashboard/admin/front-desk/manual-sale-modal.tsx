"use client";

import { useState, useMemo } from "react";
import { X, CreditCard, ShoppingBag } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

// Mock Products
const MOCK_PRODUCTS = [
    { id: "1", name: "Protein Bar Analysis", price: 3.99, credits: 1 },
    { id: "2", name: "Water Bottle", price: 14.99, credits: 3 },
    { id: "3", name: "Day Pass", price: 25.00, credits: 5 },
    { id: "4", name: "Pre-Workout Shot", price: 4.50, credits: 1 },
    { id: "5", name: "T-Shirt", price: 29.99, credits: 6 },
    { id: "6", name: "Personal Training Session", price: 85.00, credits: 15 },
];

interface ManualSaleModalProps {
    isOpen: boolean;
    onClose: () => void;
    client: any;
    onComplete: (saleData: any) => void;
}

export function ManualSaleModal({ isOpen, onClose, client, onComplete }: ManualSaleModalProps) {
    const [selectedProductId, setSelectedProductId] = useState<string>("");
    const [quantity, setQuantity] = useState<number>(1);

    const selectedProduct = useMemo(() =>
        MOCK_PRODUCTS.find(p => p.id === selectedProductId),
        [selectedProductId]);

    const subtotal = useMemo(() =>
        selectedProduct ? selectedProduct.price * quantity : 0,
        [selectedProduct, quantity]);

    const processingFee = subtotal * 0.03;
    const total = subtotal + processingFee;
    const totalCredits = selectedProduct ? selectedProduct.credits * quantity : 0;

    const handleComplete = () => {
        if (!selectedProduct) return;

        onComplete({
            client,
            product: selectedProduct,
            quantity,
            total,
            date: new Date()
        });

        // Reset and close is handled by parent or here
        setSelectedProductId("");
        setQuantity(1);
        onClose();
    };

    if (!isOpen || !client) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.95, y: 20 }}
                    className="bg-white dark:bg-zinc-900 rounded-xl shadow-2xl w-full max-w-md overflow-hidden border border-gray-100 dark:border-white/10 flex flex-col"
                >
                    <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-white/10 bg-gray-50/50 dark:bg-white/5">
                        <div>
                            <h3 className="text-lg font-bold text-gray-900 dark:text-white">Manual Sale</h3>
                            <p className="text-sm text-gray-500 dark:text-gray-400">{client.name}</p>
                        </div>
                        <Button variant="ghost" size="icon" onClick={onClose} className="h-8 w-8 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </div>

                    <div className="p-6 space-y-6">
                        <div className="space-y-2">
                            <Label>Product</Label>
                            <Select value={selectedProductId} onValueChange={setSelectedProductId}>
                                <SelectTrigger className="bg-gray-50 dark:bg-white/5">
                                    <SelectValue placeholder="Select a product" />
                                </SelectTrigger>
                                <SelectContent>
                                    {MOCK_PRODUCTS.map(product => (
                                        <SelectItem key={product.id} value={product.id}>
                                            {product.name} - ${product.price.toFixed(2)}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>

                        <div className="space-y-2">
                            <Label>Quantity</Label>
                            <Input
                                type="number"
                                min="1"
                                value={quantity}
                                onChange={(e) => setQuantity(parseInt(e.target.value) || 1)}
                                className="bg-gray-50 dark:bg-white/5"
                            />
                        </div>

                        <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 space-y-2 text-sm">
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Subtotal</span>
                                <span>${subtotal.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-gray-600 dark:text-gray-400">
                                <span>Processing Fee (3%)</span>
                                <span>${processingFee.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between font-bold text-lg text-gray-900 dark:text-white pt-2 border-t border-gray-200 dark:border-white/10 mt-2">
                                <span>Total</span>
                                <span>${total.toFixed(2)}</span>
                            </div>
                            <div className="flex justify-between text-purple-600 dark:text-purple-400 font-medium pt-1">
                                <span>Total in Credits</span>
                                <span>{totalCredits} Credits</span>
                            </div>
                        </div>

                        {selectedProduct && (
                            <div className="bg-purple-50 dark:bg-purple-500/10 border border-purple-100 dark:border-purple-500/20 text-xs p-3 rounded-lg text-purple-700 dark:text-purple-300">
                                This charge will be added to <strong>{client.name}'s</strong> account balance.
                                <br />New balance will be: <strong>${(client.balance + total).toFixed(2)}</strong>
                            </div>
                        )}
                    </div>

                    <div className="p-6 border-t border-gray-100 dark:border-white/10 flex justify-end gap-3 bg-gray-50/50 dark:bg-white/5">
                        <Button variant="outline" onClick={onClose} className="w-full">Cancel</Button>
                        <Button
                            onClick={handleComplete}
                            disabled={!selectedProduct}
                            className="w-full bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                        >
                            Complete Sale
                        </Button>
                    </div>
                </motion.div>
            </div>
        </AnimatePresence>
    );
}
