"use client"

import { motion } from "framer-motion"
import { ProfileForm } from "@/components/profile/profile-form"
import { PasswordForm } from "@/components/profile/password-form"

export default function ProfilePage() {
    return (
        <div className="flex flex-col gap-6 p-6 md:p-8 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h1 className="text-2xl font-bold tracking-tight">User Profile</h1>
                <p className="text-muted-foreground">
                    Manage your account settings and preferences
                </p>
            </motion.div>

            <div className="grid gap-6">
                <ProfileForm />
                <PasswordForm />
            </div>
        </div>
    )
}
