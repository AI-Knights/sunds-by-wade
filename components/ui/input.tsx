"use client";

import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

export type InputProps = React.InputHTMLAttributes<HTMLInputElement>

const Input = React.forwardRef<HTMLInputElement, InputProps>(
    ({ className, type, ...props }, ref) => {
        // We wrap the input to handle the focus ring animation if we want a fancy border not just CSS
        // But CSS ring is also quite performant. Let's start with a clean CSS-first animated approach
        // and maybe a subtle motion frame if needed.
        // For now, standard clean input with focus transition.
        return (
            <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
            >
                <input
                    type={type}
                    className={cn(
                        "flex h-11 w-full rounded-md border dark:border-gray-900 bg-transparent px-3 py-2 text-sm shadow-sm transition-all duration-200 file:border-0 file:bg-transparent  file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring focus-visible:border-primary disabled:cursor-not-allowed disabled:opacity-50",
                        className
                    )}
                    ref={ref}
                    {...props}
                />
            </motion.div>
        );
    }
);
Input.displayName = "Input";

export { Input };
