"use client";

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";

const categories = [
    { id: "apparel", label: "Apparel & Merchandise", checked: false },
    { id: "supplements", label: "Supplements & Nutrition", checked: false },
    { id: "equipment", label: "Equipment & Accessories", checked: false },
    { id: "beverages", label: "Beverages", checked: true },
    { id: "recovery", label: "Recovery Products", checked: true },
    { id: "personal-care", label: "Personal Care", checked: false },
    { id: "gift-cards", label: "Gift Cards", checked: true },
    { id: "services", label: "Services", checked: true },
];

export function AllowedProducts() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Allowed Product Categories</CardTitle>
                <CardDescription className="text-xs text-gray-500">
                    Define which product categories gyms can sell via front desk POS
                </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
                {categories.map((category) => (
                    <div key={category.id} className="flex items-center space-x-3">
                        <Checkbox id={category.id} defaultChecked={category.checked} className="border-purple-500 data-[state=checked]:bg-purple-500" />
                        <Label
                            htmlFor={category.id}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-700 dark:text-gray-300"
                        >
                            {category.label}
                        </Label>
                    </div>
                ))}
            </CardContent>
        </Card>
    );
}
