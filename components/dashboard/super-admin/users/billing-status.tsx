"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function BillingStatus() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Billing Status</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Current Plan</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Premium Membership</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Monthly Cost</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">$89.99</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Next Billing Date</p>
                        <p className="text-sm font-semibold text-gray-900 dark:text-white">Feb 13, 2026</p>
                    </div>
                    <div>
                        <p className="text-xs text-gray-500 mb-1">Payment Status</p>
                        <Badge variant="secondary" className="bg-emerald-500/10 text-emerald-500 hover:bg-emerald-500/20 border-0">
                            Paid
                        </Badge>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
