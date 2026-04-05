"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Calendar, Clock, Save, Sparkles } from "lucide-react";

// Animation variants
const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 100,
      damping: 15,
      staggerChildren: 0.1,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, x: -20 },
  visible: {
    opacity: 1,
    x: 0,
    transition: {
      type: "spring",
      stiffness: 120,
      damping: 12,
    },
  },
};

const iconFloat = {
  initial: { y: 0 },
  animate: {
    y: [-3, 3, -3],
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "easeInOut",
    },
  },
};

const shimmer = {
  initial: { backgroundPosition: "-200% 0" },
  animate: {
    backgroundPosition: "200% 0",
    transition: {
      duration: 3,
      repeat: Infinity,
      ease: "linear",
    },
  },
};

export default function CalendarPreferences() {
  const [sessionLength, setSessionLength] = useState("60");
  const [restTime, setRestTime] = useState("60");
  const [isSaving, setIsSaving] = useState(false);

  const sessionLengthOptions = [
    { value: "30", label: "30 minutes" },
    { value: "45", label: "45 minutes" },
    { value: "60", label: "60 minutes" },
    { value: "75", label: "75 minutes" },
    { value: "90", label: "90 minutes" },
    { value: "120", label: "120 minutes" },
  ];

  const restTimeOptions = [
    { value: "30", label: "30 Seconds" },
    { value: "60", label: "60 Seconds" },
    { value: "90", label: "90 Seconds" },
    { value: "120", label: "120 Seconds" },
    { value: "180", label: "180 Seconds" },
  ];

  const handleSavePreferences = async () => {
    setIsSaving(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    setIsSaving(false);
  };

  return (
    <motion.div
      variants={cardVariants}
      initial="hidden"
      animate="visible"
      className="w-full"
    >
      <Card className="relative overflow-hidden border-none shadow-2xl bg-gradient-to-br from-white via-purple-50/30 to-white dark:from-gray-900 dark:via-purple-950/20 dark:to-gray-900 backdrop-blur-xl">
        {/* Animated background gradient orbs */}
        <div className="absolute top-0 right-0 w-72 h-72 bg-purple-400/20 dark:bg-purple-600/10 rounded-full blur-3xl animate-pulse" />
        <div className="absolute bottom-0 left-0 w-96 h-96 bg-blue-400/20 dark:bg-blue-600/10 rounded-full blur-3xl animate-pulse delay-1000" />
        
        <CardContent className="relative p-8 md:p-10 space-y-8">
          {/* Header */}
          <motion.div
            variants={itemVariants}
            className="flex items-center gap-3 mb-8"
          >
           
            <div>
              <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 bg-clip-text text-transparent bg-[length:200%_auto] animate-gradient">
                Calendar & Availability Preferences
              </h2>
              <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                Customize your session and rest time settings
              </p>
            </div>
          </motion.div>

          {/* Form Fields */}
          <div className="space-y-6">
            {/* Default Session Length */}
            <motion.div variants={itemVariants} className="space-y-3 group">
              <Label
                htmlFor="sessionLength"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Clock className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                </motion.div>
                Default Session Length
              </Label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative"
              >
                <Select value={sessionLength} onValueChange={setSessionLength}>
                  <SelectTrigger
                    id="sessionLength"
                    className="w-full h-12 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-purple-400 dark:hover:border-purple-600 focus:border-purple-600 dark:focus:border-purple-500 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md group-hover:shadow-purple-500/20"
                  >
                    <SelectValue placeholder="Select session length" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
                    {sessionLengthOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer hover:bg-purple-50 dark:hover:bg-purple-950/30 focus:bg-purple-100 dark:focus:bg-purple-900/30 transition-colors rounded-lg"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-purple-600" />
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(168, 85, 247, 0.4), transparent)",
                  }}
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            </motion.div>

            {/* Default Rest Time Between Sets */}
            <motion.div variants={itemVariants} className="space-y-3 group">
              <Label
                htmlFor="restTime"
                className="text-base font-semibold text-gray-800 dark:text-gray-200 flex items-center gap-2"
              >
                <motion.div
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  <Sparkles className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                </motion.div>
                Default Rest Time Between Sets
              </Label>
              <motion.div
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
                className="relative"
              >
                <Select value={restTime} onValueChange={setRestTime}>
                  <SelectTrigger
                    id="restTime"
                    className="w-full h-12 bg-white dark:bg-gray-800/50 border-2 border-gray-200 dark:border-gray-700 hover:border-blue-400 dark:hover:border-blue-600 focus:border-blue-600 dark:focus:border-blue-500 transition-all duration-300 rounded-xl shadow-sm hover:shadow-md group-hover:shadow-blue-500/20"
                  >
                    <SelectValue placeholder="Select rest time" />
                  </SelectTrigger>
                  <SelectContent className="bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 rounded-xl shadow-xl">
                    {restTimeOptions.map((option) => (
                      <SelectItem
                        key={option.value}
                        value={option.value}
                        className="cursor-pointer hover:bg-blue-50 dark:hover:bg-blue-950/30 focus:bg-blue-100 dark:focus:bg-blue-900/30 transition-colors rounded-lg"
                      >
                        <span className="flex items-center gap-2">
                          <span className="w-2 h-2 rounded-full bg-blue-600" />
                          {option.label}
                        </span>
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                {/* Animated border effect */}
                <motion.div
                  className="absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none"
                  style={{
                    background:
                      "linear-gradient(90deg, transparent, rgba(59, 130, 246, 0.4), transparent)",
                  }}
                  variants={shimmer}
                  initial="initial"
                  animate="animate"
                />
              </motion.div>
            </motion.div>
          </div>

          {/* Save Button */}
          <motion.div
            variants={itemVariants}
            className="flex justify-end pt-6"
          >
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleSavePreferences}
                disabled={isSaving}
                className="relative px-8 py-6 bg-gradient-to-r from-purple-600 via-blue-600 to-purple-600 hover:from-purple-700 hover:via-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl shadow-lg shadow-purple-500/50 hover:shadow-xl hover:shadow-purple-600/60 transition-all duration-300 overflow-hidden group disabled:opacity-50 disabled:cursor-not-allowed bg-[length:200%_auto]"
              >
                {/* Shimmer effect on hover */}
                <motion.div
                  className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent"
                  initial={{ x: "-100%" }}
                  whileHover={{ x: "100%" }}
                  transition={{ duration: 0.6 }}
                />
                
                <span className="relative flex items-center gap-2 text-base">
                  {isSaving ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{
                          duration: 1,
                          repeat: Infinity,
                          ease: "linear",
                        }}
                      >
                        <Save className="w-5 h-5" />
                      </motion.div>
                      Saving...
                    </>
                  ) : (
                    <>
                      <Save className="w-5 h-5" />
                      Save Preferences
                    </>
                  )}
                </span>
              </Button>
            </motion.div>
          </motion.div>

          {/* Success message animation */}
          {isSaving && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              className="flex items-center justify-center gap-2 text-sm text-green-600 dark:text-green-400"
            >
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 0.5, repeat: Infinity }}
              >
                ✓
              </motion.div>
              Preferences saved successfully!
            </motion.div>
          )}
        </CardContent>
      </Card>

    
    </motion.div>
  );
}