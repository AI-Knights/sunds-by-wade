"use client";

import { useState } from "react";
import { Plus, Search, Filter, MoreHorizontal, Edit, Trash2, Eye, EyeOff, Package } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Header } from "@/components/dashboard/header";
import { ProductModal, Product } from "@/components/dashboard/admin/marketplace/product-modal";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

// Mock Data
const MOCK_PRODUCTS: Product[] = [
    { id: "1", name: "Protein Bar - Chocolate", category: "Consumables", price: 3.99, credits: 0.5, inventory: 45, isVisible: true, isTaxable: true, isPosAvailable: true },
    { id: "2", name: "Pre-Workout Supplement", category: "Supplements", price: 34.99, credits: 5, inventory: 12, isVisible: true, isTaxable: true, isPosAvailable: true },
    { id: "3", name: "Gym T-Shirt - Black", category: "Apparel", price: 24.99, credits: 2, inventory: 28, isVisible: true, isTaxable: true, isPosAvailable: true },
    { id: "4", name: "Water Bottle - 32oz", category: "Equipment", price: 14.99, credits: 1, inventory: 56, isVisible: true, isTaxable: true, isPosAvailable: true },
    { id: "5", name: "Day Pass", category: "Passes", price: 25.00, credits: 3, inventory: 999, isVisible: true, isTaxable: false, isPosAvailable: true },
    { id: "6", name: "Hoodie - Navy", category: "Apparel", price: 49.99, credits: 5, inventory: 15, isVisible: true, isTaxable: true, isPosAvailable: true },
    { id: "7", name: "BCAA Powder", category: "Supplements", price: 29.99, credits: 3, inventory: 0, isVisible: false, isTaxable: true, isPosAvailable: true }, // Low stock / Hidden example
    { id: "8", name: "10-Class Pack", category: "Passes", price: 150.00, credits: 10, inventory: 999, isVisible: true, isTaxable: false, isPosAvailable: true },
];

export default function MarketplacePage() {
    const [products, setProducts] = useState<Product[]>(MOCK_PRODUCTS);
    const [searchQuery, setSearchQuery] = useState("");
    const [isProductModalOpen, setIsProductModalOpen] = useState(false);
    const [editingProduct, setEditingProduct] = useState<Product | null>(null);

    const filteredProducts = products.filter(p =>
        p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const handleEdit = (product: Product) => {
        setEditingProduct(product);
        setIsProductModalOpen(true);
    };

    const handleDelete = (id: string) => {
        if (confirm("Are you sure you want to delete this product?")) {
            setProducts(prev => prev.filter(p => p.id !== id));
        }
    };

    const handleSaveProduct = (productData: Partial<Product>) => {
        if (editingProduct) {
            setProducts(prev => prev.map(p => p.id === editingProduct.id ? { ...p, ...productData } : p));
        } else {
            const newProduct: Product = {
                id: Math.random().toString(36).substr(2, 9),
                image: "", // Placeholder
                ...productData as Product
            };
            setProducts(prev => [...prev, newProduct]);
        }
    };

    const handleCloseModal = () => {
        setIsProductModalOpen(false);
        setEditingProduct(null);
    };

    // Stats
    const totalProducts = products.length;
    const inventoryValue = products.reduce((acc, p) => acc + (p.price * (p.inventory === 999 ? 0 : p.inventory)), 0); // Exclude unlimited items from value calc mostly
    const lowStockItems = products.filter(p => p.inventory < 10 && p.category !== 'Passes').length;
    const visibleItems = products.filter(p => p.isVisible).length;

    return (
        <div className="space-y-6 p-1">
        

            {/* Header & Actions */}
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Marketplace</h1>
                    <p className="text-muted-foreground">Manage products and inventory</p>
                </div>
                <Button
                    onClick={() => setIsProductModalOpen(true)}
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Product
                </Button>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1  md:grid-cols-4 gap-4">
                <div className="bg-white dark:bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Total Products</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{totalProducts}</h3>
                </div>
                <div className="bg-white dark:bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Inventory Value</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">
                        ${inventoryValue.toLocaleString(undefined, { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                    </h3>
                </div>
                <div className="bg-white dark:bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Low Stock Items</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{lowStockItems}</h3>
                </div>
                <div className="bg-white dark:bg-card/50 backdrop-blur-sm p-4 rounded-xl border border-gray-100 dark:border-white/5 shadow-sm">
                    <p className="text-xs font-medium text-gray-500 dark:text-gray-400">Visible in App</p>
                    <h3 className="text-2xl font-bold text-gray-900 dark:text-white mt-1">{visibleItems}</h3>
                </div>
            </div>

            {/* Filters */}
            <div className="flex gap-2">
                <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                    <Input
                        placeholder="Search products..."
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="pl-9 bg-white dark:bg-card/50 border-gray-200 dark:border-white/10"
                    />
                </div>
                <Button variant="outline" className="bg-white dark:bg-card/50 border-gray-200 dark:border-white/10">
                    <Filter className="w-4 h-4 mr-2" />
                    Filters
                </Button>
            </div>

            {/* Product Table */}
            <div className="bg-white dark:bg-card/50 backdrop-blur-sm rounded-xl border border-gray-100 dark:border-white/5 shadow-sm overflow-hidden">
                <Table>
                    <TableHeader>
                        <TableRow className="hover:bg-transparent border-gray-100 dark:border-white/5">
                            <TableHead className="w-[300px]">Product</TableHead>
                            <TableHead>Category</TableHead>
                            <TableHead>Price</TableHead>
                            <TableHead>Credits</TableHead>
                            <TableHead>Inventory</TableHead>
                            <TableHead>Visibility</TableHead>
                            <TableHead className="text-right">Actions</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        <AnimatePresence>
                            {filteredProducts.map((product) => (
                                <TableRow key={product.id} className="group border-gray-100 dark:border-white/5 hover:bg-gray-50/50 dark:hover:bg-white/[0.02]">
                                    <TableCell className="font-medium">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-lg bg-gray-100 dark:bg-white/10 flex items-center justify-center text-gray-400">
                                                <Package className="w-5 h-5" />
                                            </div>
                                            <span className="text-gray-900 dark:text-white">{product.name}</span>
                                        </div>
                                    </TableCell>
                                    <TableCell>
                                        <Badge variant="secondary" className="bg-gray-100 dark:bg-white/10 text-gray-600 dark:text-gray-300 font-normal">
                                            {product.category}
                                        </Badge>
                                    </TableCell>
                                    <TableCell>${product.price.toFixed(2)}</TableCell>
                                    <TableCell>{product.credits} credits</TableCell>
                                    <TableCell>
                                        <span className={cn(
                                            product.inventory < 10 && product.category !== 'Passes' ? "text-red-500 font-medium" : ""
                                        )}>
                                            {product.inventory === 999 ? "∞" : product.inventory}
                                        </span>
                                    </TableCell>
                                    <TableCell>
                                        <Badge
                                            variant={product.isVisible ? "default" : "secondary"}
                                            className={cn(
                                                "capitalize",
                                                product.isVisible
                                                    ? "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 hover:bg-emerald-100"
                                                    : "bg-gray-100 text-gray-500 dark:bg-white/10 dark:text-gray-400"
                                            )}
                                        >
                                            <span className="flex items-center gap-1.5">
                                                {product.isVisible ? <Eye className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                                                {product.isVisible ? "Visible" : "Hidden"}
                                            </span>
                                        </Badge>
                                    </TableCell>
                                    <TableCell className="text-right">
                                        <div className="flex justify-end gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-500 hover:text-blue-600 dark:hover:text-blue-400"
                                                onClick={() => handleEdit(product)}
                                            >
                                                <Edit className="w-4 h-4" />
                                            </Button>
                                            <Button
                                                variant="ghost"
                                                size="icon"
                                                className="h-8 w-8 text-gray-500 hover:text-red-600 dark:hover:text-red-400"
                                                onClick={() => handleDelete(product.id)}
                                            >
                                                <Trash2 className="w-4 h-4" />
                                            </Button>
                                        </div>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </AnimatePresence>
                    </TableBody>
                </Table>
            </div>

            <ProductModal
                isOpen={isProductModalOpen}
                onClose={handleCloseModal}
                onSave={handleSaveProduct}
                initialData={editingProduct}
            />
        </div>
    );
}
