"use client";

import * as React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { motion } from "framer-motion";
import { Loader2, Lock, Mail } from "lucide-react";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/lib/utils";
import Image from "next/image";
import LogoImage from "@/public/images/icon.svg"
const signInSchema = z.object({
    email: z.string().email({ message: "Please enter a valid email address" }),
    password: z.string().min(6, { message: "Password must be at least 6 characters" }),
    rememberMe: z.boolean().default(false).optional(),
});

type SignInValues = z.infer<typeof signInSchema>;

interface SignInFormProps {
    className?: string;
    defaultRole?: string;
}

export function SignInForm({ className, defaultRole }: SignInFormProps) {
    const [isLoading, setIsLoading] = React.useState<boolean>(false);
    const params = useParams();
    const router = useRouter()
    // Determine role from props or URL params. default is 'user' or generic
    const role = (params?.role as string) || defaultRole || "Member";

    // Format role for display (e.g. "personal-trainer" -> "Personal Trainer")
    const displayRole = role.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase());

    const form = useForm<SignInValues>({
        resolver: zodResolver(signInSchema),
        defaultValues: {
            email: "",
            password: "",
            rememberMe: false,
        },
    });

    async function onSubmit(data: SignInValues) {
        setIsLoading(true);
        // Simulate API call
        setTimeout(() => {
            console.log(data);
            setIsLoading(false);
            router.push('/trainer')

            // Add toast or routing here
        }, 2000);
    }

    // Animation variants
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const containerVariants: any = {
        hidden: { opacity: 0, scale: 0.95 },
        visible: {
            opacity: 1,
            scale: 1,
            transition: {
                duration: 0.5,
                ease: "easeOut",
                staggerChildren: 0.1
            }
        }
    };

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const itemVariants: any = {
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
    };

    return (
        <div className={cn("grid gap-6 w-full max-w-md mx-auto", className)}>
            <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="relative flex flex-col items-center p-8 rounded-2xl border border-white/10 bg-black/40 backdrop-blur-xl shadow-2xl overflow-hidden"
            >
                {/* Decorative background glow inside card */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-purple-500 to-transparent opacity-50" />
                <div className="absolute -top-[100px] -left-[100px] w-[200px] h-[200px] bg-purple-600/20 blur-[80px] rounded-full pointer-events-none" />

                {/* Header */}
                <motion.div variants={itemVariants} className="flex flex-col items-center space-y-2 text-center mb-8">
                    {/* Logo placeholder - replace with actual logo */}
                    <Image src={LogoImage} height={100} width={100} alt="logo" />
                    <h1 className="text-2xl font-bold tracking-tight text-white drop-shadow-sm">Sign in to your account</h1>
                    <p className="text-sm text-muted-foreground">
                        {displayRole} Login
                    </p>
                </motion.div>

                {/* Form */}
                <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-4">

                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-xs font-medium text-gray-300 ml-1" htmlFor="email">
                            Email address
                        </label>
                        <div className="relative">
                            <Input
                                id="email"
                                placeholder="name@example.com"
                                type="email"
                                autoCapitalize="none"
                                autoComplete="email"
                                autoCorrect="off"
                                disabled={isLoading}
                                className="pl-10 bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-white/30 transition-all"
                                {...form.register("email")}
                            />
                            <Mail className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                        </div>
                        {form.formState.errors.email && (
                            <p className="text-xs text-red-400 ml-1 mt-1 font-medium">{form.formState.errors.email.message}</p>
                        )}
                    </motion.div>

                    <motion.div variants={itemVariants} className="space-y-1">
                        <label className="text-xs font-medium text-gray-300 ml-1" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <Input
                                id="password"
                                placeholder="Orbi....."
                                type="password"
                                autoCapitalize="none"
                                autoComplete="current-password"
                                disabled={isLoading}
                                className="pl-10 bg-white/5 border-white/10 focus:border-purple-500 focus:ring-purple-500/20 text-white placeholder:text-white/30 transition-all font-mono tracking-widest"
                                style={{ fontFamily: 'monospace' }} // for the dots effect
                                {...form.register("password")}
                            />
                            <Lock className="absolute left-3 top-3 h-4 w-4 text-white/40" />
                        </div>
                        {form.formState.errors.password && (
                            <p className="text-xs text-red-400 ml-1 mt-1 font-medium">{form.formState.errors.password.message}</p>
                        )}
                    </motion.div>

                    {/* Remember & Forgot */}
                    <motion.div variants={itemVariants} className="flex items-center justify-between pt-2">
                        <div className="flex items-center space-x-2">
                            <input
                                type="checkbox"
                                id="remember"
                                className="rounded border-white/20 bg-white/5 text-purple-500 focus:ring-purple-500 focus:ring-offset-0 w-4 h-4 cursor-pointer accent-purple-500"
                                {...form.register("rememberMe")}
                            />
                            <label
                                htmlFor="remember"
                                className="text-xs font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-gray-400 cursor-pointer select-none"
                            >
                                Remember me
                            </label>
                        </div>
                        <Link
                            href="/forgot-password"
                            className="text-xs font-medium text-purple-400 hover:text-purple-300 transition-colors hover:underline"
                        >
                            Forgot password?
                        </Link>
                    </motion.div>

                    <motion.div variants={itemVariants} className="pt-4">
                        <Button

                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-violet-600 to-indigo-600 hover:from-violet-500 hover:to-indigo-500 text-white font-semibold py-6 shadow-lg shadow-indigo-500/25 border border-white/10"
                        >
                            {isLoading && (
                                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                            )}
                            Sign In
                        </Button>
                    </motion.div>

                </form>
            </motion.div>
        </div>
    );
}
