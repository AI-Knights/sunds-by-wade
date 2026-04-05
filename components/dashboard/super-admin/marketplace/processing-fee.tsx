"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";

export function ProcessingFee() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">POS Processing Fee</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                    Platform fee charged on all front desk sales
                </CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    <div>
                        <label htmlFor="fee" className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-1 block">
                            Processing Fee Percentage
                        </label>
                        <div className="relative">
                            <Input
                                id="fee"
                                defaultValue="2.9"
                                className="pr-8 font-medium text-lg border-gray-200 dark:border-white/10"
                            />
                            <span className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 font-bold">%</span>
                        </div>
                        <p className="text-xs text-gray-400 mt-2">Applied to all POS transactions across the platform</p>
                    </div>

                    <div className="bg-gray-50 dark:bg-white/5 rounded-lg p-4 space-y-2 mt-4">
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Example on $100 sale:</span>
                            <span className="font-medium text-gray-900 dark:text-white">$2.90 fee</span>
                        </div>
                        <div className="flex justify-between text-sm">
                            <span className="text-gray-500">Gym receives:</span>
                            <span className="font-bold text-emerald-500">$97.10</span>
                        </div>
                    </div>
                </div>
            </CardContent>
        </Card>
    );
}
