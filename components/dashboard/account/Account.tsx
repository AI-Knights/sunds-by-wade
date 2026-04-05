"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent } from "@/components/ui/card";
import { Camera, Mail, Phone } from "lucide-react";
import CertificationsCredentials from "./tab-content/Cirtification";
import AssociatedGyms from "./tab-content/AssociatedGyms";
import NotificationPreferences from "./tab-content/Notifications";
import CalendarPreferences from "./tab-content/Prafarance";

const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: {
        opacity: 1,
        y: 0,
        transition: { type: "spring" as const, duration: 0.5, ease: "easeOut" },
    },
};

const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
        opacity: 1,
        transition: {
            type: "spring" as const,
            staggerChildren: 0.1,
            delayChildren: 0.2,
        },
    },
};

const tabVariants = {
    inactive: { scale: 1 },
    active: {
        scale: 1.05,
        transition: { type: "spring" as const, stiffness: 500, damping: 30 },
    },
};

export default function AccountSettings() {
    const [activeTab, setActiveTab] = useState("profile");
    const [firstName, setFirstName] = useState("John");
    const [lastName, setLastName] = useState("Doe");
    const [email, setEmail] = useState("john.doe@ibpro.com");
    const [phone, setPhone] = useState("+1 (555) 123-4567");
    const [bio, setBio] = useState("");
    const [currentPassword, setCurrentPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    console.log(activeTab)
    const tabs = [
        { id: "profile", label: "Profile" },
        { id: "certifications", label: "Certifications" },
        { id: "gyms", label: "Associated Gyms" },
        { id: "notifications", label: "Notifications" },
        { id: "preferences", label: "Preferences" },
    ];

    return (
        <div className="min-h-screen bg-white dark:bg-transparent transition-colors duration-500">
            <div className=" mx-auto px-4 py-8 md:py-12">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                    className="mb-8"
                >
                    <h1 className="text-3xl md:text-4xl font-bold mb-2 text-gray-900 dark:text-white">
                        Account Settings
                    </h1>
                    <p className="text-gray-600 dark:text-gray-400">
                        Manage your profile and preferences
                    </p>
                </motion.div>

                {/* Tabs */}
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, duration: 0.5 }}
                    className="border rounded-full w-full max-w-fit p-1 my-10 my-shadow overflow-x-auto"
                >
                    <div className="flex gap-2 min-w-max">
                        {tabs.map((tab) => (
                            <motion.button
                                key={tab.id}
                                variants={tabVariants}
                                initial="inactive"
                                animate={activeTab === tab.id ? "active" : "inactive"}
                                whileHover={{ scale: 1.03 }}
                                whileTap={{ scale: 0.97 }}
                                onClick={() => setActiveTab(tab.id)}
                                className={`px-6 py-2.5 rounded-full font-medium text-sm transition-all duration-300 whitespace-nowrap ${activeTab === tab.id
                                        ? "bg-[#7220FF] text-white shadow-purple-500/50"
                                        : "bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 shadow-sm"
                                    }`}
                            >
                                {tab.label}
                            </motion.button>
                        ))}
                    </div>
                </motion.div>
                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === "profile" && (
                        <motion.div
                            key="profile"
                            variants={staggerContainer}
                            initial="hidden"
                            animate="visible"
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-6"
                        >

                            <motion.div variants={fadeInUp}>
                                <Card className="border-none  bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg transition-all duration-300">
                                    <CardContent className="p-6 md:p-8">
                                        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                                            Profile Information
                                        </h2>

                                        {/* Avatar Section */}
                                        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-6 mb-8">
                                            <motion.div
                                                whileHover={{ scale: 1.05 }}
                                                className="relative"
                                            >
                                                <Avatar className="w-20 h-20 ring-4 ring-purple-500/20">
                                                    <AvatarImage src="/placeholder.jpg" />
                                                    <AvatarFallback className="text-2xl bg-gradient-to-br from-purple-400 to-purple-600 text-white">
                                                        JD
                                                    </AvatarFallback>
                                                </Avatar>
                                                <motion.button
                                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                                    whileTap={{ scale: 0.9 }}
                                                    className="absolute bottom-0 right-0 bg-purple-600 text-white p-2 rounded-full hover:bg-purple-700 transition-colors"
                                                >
                                                    <Camera className="w-4 h-4" />
                                                </motion.button>
                                            </motion.div>
                                            <div>
                                                <h3 className="font-semibold text-lg mb-1 text-gray-900 dark:text-white">
                                                    Change Photo
                                                </h3>
                                                <p className="text-sm mb-3 text-gray-500 dark:text-gray-400">
                                                    JPG, PNG or GIF. Max size 2MB
                                                </p>
                                            </div>
                                        </div>

                                        {/* Form Fields */}
                                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="firstName"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    First Name
                                                </Label>
                                                <Input
                                                    id="firstName"
                                                    value={firstName}
                                                    onChange={(e) => setFirstName(e.target.value)}
                                                    className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                />
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="lastName"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Last Name
                                                </Label>
                                                <Input
                                                    id="lastName"
                                                    value={lastName}
                                                    onChange={(e) => setLastName(e.target.value)}
                                                    className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                />
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="email"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Email
                                                </Label>
                                                <div className="relative">
                                                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        id="email"
                                                        type="email"
                                                        value={email}
                                                        onChange={(e) => setEmail(e.target.value)}
                                                        className="pl-10 bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                    />
                                                </div>
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="phone"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Phone
                                                </Label>
                                                <div className="relative">
                                                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
                                                    <Input
                                                        id="phone"
                                                        type="tel"
                                                        value={phone}
                                                        onChange={(e) => setPhone(e.target.value)}
                                                        className="pl-10 bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                    />
                                                </div>
                                            </motion.div>

                                            <motion.div
                                                variants={fadeInUp}
                                                className="md:col-span-2 space-y-2"
                                            >
                                                <Label
                                                    htmlFor="bio"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Bio
                                                </Label>
                                                <textarea
                                                    id="bio"
                                                    value={bio}
                                                    onChange={(e) => setBio(e.target.value)}
                                                    rows={4}
                                                    className="w-full px-3 py-2 rounded-md border bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-2 focus:ring-purple-500/20 transition-all duration-300 resize-none focus:outline-none"
                                                    placeholder="Tell us about yourself..."
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                                                >
                                                    Cancel
                                                </Button>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/50 transition-all duration-300">
                                                    Save Changes
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>

                            {/* Password Change Card */}
                            <motion.div variants={fadeInUp}>
                                <Card className="border-none shadow-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg transition-all duration-300">
                                    <CardContent className="p-6 md:p-8">
                                        <h2 className="text-xl md:text-2xl font-semibold mb-6 text-gray-900 dark:text-white">
                                            Change Password
                                        </h2>

                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 max-w-4xl">
                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="currentPassword"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Current password
                                                </Label>
                                                <Input
                                                    id="currentPassword"
                                                    type="password"
                                                    value={currentPassword}
                                                    onChange={(e) => setCurrentPassword(e.target.value)}
                                                    placeholder="••••••••••"
                                                    className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                />
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="newPassword"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    New password
                                                </Label>
                                                <Input
                                                    id="newPassword"
                                                    type="password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    placeholder="••••••••••"
                                                    className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                />
                                            </motion.div>

                                            <motion.div variants={fadeInUp} className="space-y-2">
                                                <Label
                                                    htmlFor="confirmPassword"
                                                    className="text-sm font-medium text-gray-700 dark:text-gray-300"
                                                >
                                                    Confirm new password
                                                </Label>
                                                <Input
                                                    id="confirmPassword"
                                                    type="password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    placeholder="••••••••••"
                                                    className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white placeholder:text-gray-400 focus:border-purple-500 focus:ring-purple-500/20 transition-all duration-300"
                                                />
                                            </motion.div>
                                        </div>

                                        <div className="flex flex-col sm:flex-row justify-end gap-3 mt-8">
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button
                                                    variant="outline"
                                                    className="w-full sm:w-auto border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 hover:text-gray-900 dark:hover:text-white transition-all duration-300"
                                                >
                                                    Cancel
                                                </Button>
                                            </motion.div>
                                            <motion.div
                                                whileHover={{ scale: 1.02 }}
                                                whileTap={{ scale: 0.98 }}
                                            >
                                                <Button className="w-full sm:w-auto bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/50 transition-all duration-300">
                                                    Save
                                                </Button>
                                            </motion.div>
                                        </div>
                                    </CardContent>
                                </Card>
                            </motion.div>
                        </motion.div>
                    )}

                    {/* Other Tabs */}
                    {activeTab == "notifications" && (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <NotificationPreferences />
                        </motion.div>
                    )}
                    {activeTab == "preferences" && (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CalendarPreferences />
                        </motion.div>
                    )}
                    {activeTab == "certifications" && (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <CertificationsCredentials />
                        </motion.div>
                    )}
                    {activeTab == "gyms" && (
                        <motion.div
                            key={activeTab}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            transition={{ duration: 0.5 }}
                        >
                            <AssociatedGyms />
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
}