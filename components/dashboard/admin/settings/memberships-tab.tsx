"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Plus, Edit2, Trash2, CheckCircle2 } from "lucide-react";
import { MembershipModal } from "@/components/dashboard/admin/settings/membership-modal";
import { toast } from "sonner";

// Initial Mock Data
const INITIAL_PLANS = [
    {
        id: "1",
        name: "Basic",
        price: "49",
        cycle: "Monthly",
        credits: "10",
        features: ["10 credits", "5 classes"],
        description: "Perfect for getting started",
        popular: false
    },
    {
        id: "2",
        name: "Premium",
        price: "79",
        cycle: "Monthly",
        credits: "25",
        features: ["25 credits", "Unlimited classes", "1 PT session"],
        description: "Most popular choice",
        popular: true
    },
    {
        id: "3",
        name: "Elite",
        price: "99",
        cycle: "Monthly",
        credits: "50",
        features: ["50 credits", "Unlimited classes", "4 PT sessions"],
        description: "All access premium experience",
        popular: false
    },
];

export function MembershipsTab() {
    const [plans, setPlans] = useState(INITIAL_PLANS);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingPlan, setEditingPlan] = useState<any>(null);
    const [cancellationPolicy, setCancellationPolicy] = useState("Members may cancel their membership at any time with 30 days notice. No refunds will be issued for partial months.");

    const handleAdd = () => {
        setEditingPlan(null);
        setIsModalOpen(true);
    };

    const handleEdit = (plan: any) => {
        setEditingPlan(plan);
        setIsModalOpen(true);
    };

    const handleDelete = (id: string) => {
        setPlans(plans.filter(p => p.id !== id));
        toast.success("Membership plan deleted");
    };

    const handleSavePlan = (planData: any) => {
        if (editingPlan) {
            setPlans(plans.map(p => p.id === planData.id ? planData : p));
            toast.success("Membership plan updated");
        } else {
            setPlans([...plans, { ...planData, id: Date.now().toString() }]);
            toast.success("Membership plan created");
        }
    };

    const handleSavePolicy = () => {
        toast.success("Cancellation policy updated");
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="space-y-8"
        >
            <div className="flex items-center justify-between bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm">
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Membership Plans</h3>
                <Button
                    onClick={handleAdd}
                    className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/25"
                >
                    <Plus className="w-4 h-4 mr-2" />
                    Add Plan
                </Button>
            </div>

            <div className="space-y-4">
                {plans.map((plan) => (
                    <div
                        key={plan.id}
                        className="bg-white dark:bg-zinc-900 p-6 rounded-xl border border-gray-100 dark:border-zinc-800 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6"
                    >
                        <div className="flex-1 space-y-2">
                            <div className="flex items-center gap-3">
                                <h4 className="font-bold text-lg text-gray-900 dark:text-white flex items-center gap-2">
                                    {plan.name} - ${plan.price}/{plan.cycle.toLowerCase()}
                                </h4>
                                {plan.popular && (
                                    <Badge className="bg-pink-100 text-pink-700 border-pink-200 dark:bg-pink-500/20 dark:text-pink-300 dark:border-pink-500/30">
                                        Popular
                                    </Badge>
                                )}
                            </div>
                            <p className="text-gray-500 dark:text-gray-400 text-sm">{plan.description}</p>
                            <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm text-gray-600 dark:text-gray-400 mt-2">
                                {plan.features.map((feature, i) => (
                                    <span key={i} className="flex items-center gap-1.5">
                                        <span className="w-1 h-1 rounded-full bg-gray-400"></span>
                                        {feature}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <div className="flex items-center gap-2">
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-blue-600 hover:text-blue-700 hover:bg-blue-50 dark:hover:bg-blue-500/10"
                                onClick={() => handleEdit(plan)}
                            >
                                <Edit2 className="w-4 h-4 mr-2" />
                                Edit
                            </Button>
                            <Button
                                variant="ghost"
                                size="sm"
                                className="text-red-500 hover:text-red-600 hover:bg-red-50 dark:hover:bg-red-500/10"
                                onClick={() => handleDelete(plan.id)}
                            >
                                <Trash2 className="w-4 h-4 mr-2" />
                                Delete
                            </Button>
                        </div>
                    </div>
                ))}
            </div>

            <Card className="border-gray-100 dark:border-zinc-800 bg-white dark:bg-zinc-900 shadow-sm">
                <CardContent className="p-6 space-y-4">
                    <h3 className="text-lg font-semibold text-gray-900 dark:text-white">Cancellation Policy</h3>
                    <Textarea
                        value={cancellationPolicy}
                        onChange={(e) => setCancellationPolicy(e.target.value)}
                        className="min-h-[100px] bg-gray-50 dark:bg-zinc-800/50"
                    />
                    <Button onClick={handleSavePolicy} className="bg-purple-600 hover:bg-purple-700 text-white">
                        Save Policy
                    </Button>
                </CardContent>
            </Card>

            <MembershipModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                initialData={editingPlan}
                onSave={handleSavePlan}
            />
        </motion.div>
    );
}
