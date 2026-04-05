"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Bell, Mail, Smartphone, Calendar, MessageSquare, Dumbbell } from "lucide-react";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
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
      stiffness: 300,
      damping: 24,
    },
  },
};

const sectionVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
};

interface NotificationSetting {
  id: string;
  label: string;
  description: string;
  enabled: boolean;
  icon: any;
}

export default function NotificationPreferences() {
  const [communicationSettings, setCommunicationSettings] = useState<NotificationSetting[]>([
    {
      id: "email",
      label: "Email Notifications",
      description: "Receive notifications via email",
      enabled: true,
      icon: Mail,
    },
    {
      id: "push",
      label: "Push Notifications",
      description: "Receive push notifications on your device",
      enabled: true,
      icon: Smartphone,
    },
  ]);

  const [activitySettings, setActivitySettings] = useState<NotificationSetting[]>([
    {
      id: "session",
      label: "Session Reminders",
      description: "Get reminded about upcoming sessions",
      enabled: true,
      icon: Calendar,
    },
    {
      id: "messages",
      label: "New Messages",
      description: "Notify when you receive new messages",
      enabled: true,
      icon: MessageSquare,
    },
    {
      id: "workouts",
      label: "Workout Completions",
      description: "Notify when clients complete workouts",
      enabled: true,
      icon: Dumbbell,
    },
  ]);

  const handleCommunicationToggle = (id: string) => {
    setCommunicationSettings(
      communicationSettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleActivityToggle = (id: string) => {
    setActivitySettings(
      activitySettings.map((setting) =>
        setting.id === id ? { ...setting, enabled: !setting.enabled } : setting
      )
    );
  };

  const handleSave = () => {
    // Save preferences logic here
    console.log("Preferences saved!");
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-2">
          Notification Preferences
        </h2>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Manage how you receive notifications
        </p>
      </motion.div>

      {/* Communication Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
      >
        <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg transition-all duration-300">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl"
              >
                <Bell className="w-5 h-5 text-purple-600 dark:text-purple-400" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Communication
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Choose how you want to be notified
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {communicationSettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <motion.div
                    key={setting.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.3 + index * 0.1,
                          type: "spring",
                          stiffness: 500,
                        }}
                        className="p-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                      >
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </motion.div>
                      <div className="flex-1">
                        <Label
                          htmlFor={setting.id}
                          className="text-base font-medium text-gray-900 dark:text-white cursor-pointer"
                        >
                          {setting.label}
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Switch
                        id={setting.id}
                        checked={setting.enabled}
                        onCheckedChange={() => handleCommunicationToggle(setting.id)}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Activity Alerts Section */}
      <motion.div
        variants={sectionVariants}
        initial="hidden"
        animate="visible"
        transition={{ delay: 0.2 }}
      >
        <Card className="border-none shadow-lg bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg transition-all duration-300">
          <CardContent className="p-6">
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.4 }}
              className="flex items-center gap-3 mb-6"
            >
              <motion.div
                whileHover={{ rotate: [0, -10, 10, -10, 0], scale: 1.1 }}
                transition={{ duration: 0.5 }}
                className="p-3 bg-gradient-to-br from-blue-100 to-blue-200 dark:from-blue-900/30 dark:to-blue-800/30 rounded-xl"
              >
                <Bell className="w-5 h-5 text-blue-600 dark:text-blue-400" />
              </motion.div>
              <div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Activity Alerts
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Stay updated on important activities
                </p>
              </div>
            </motion.div>

            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="space-y-4"
            >
              {activitySettings.map((setting, index) => {
                const Icon = setting.icon;
                return (
                  <motion.div
                    key={setting.id}
                    variants={itemVariants}
                    whileHover={{ x: 4 }}
                    className="flex items-center justify-between p-4 rounded-xl hover:bg-gray-50 dark:hover:bg-gray-700/30 transition-all duration-300"
                  >
                    <div className="flex items-start gap-4 flex-1">
                      <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{
                          delay: 0.5 + index * 0.1,
                          type: "spring",
                          stiffness: 500,
                        }}
                        className="p-2.5 bg-gray-100 dark:bg-gray-700/50 rounded-lg"
                      >
                        <Icon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
                      </motion.div>
                      <div className="flex-1">
                        <Label
                          htmlFor={setting.id}
                          className="text-base font-medium text-gray-900 dark:text-white cursor-pointer"
                        >
                          {setting.label}
                        </Label>
                        <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">
                          {setting.description}
                        </p>
                      </div>
                    </div>
                    <motion.div
                      whileHover={{ scale: 1.1 }}
                      whileTap={{ scale: 0.9 }}
                    >
                      <Switch
                        id={setting.id}
                        checked={setting.enabled}
                        onCheckedChange={() => handleActivityToggle(setting.id)}
                        className="data-[state=checked]:bg-purple-600"
                      />
                    </motion.div>
                  </motion.div>
                );
              })}
            </motion.div>
          </CardContent>
        </Card>
      </motion.div>

      {/* Save Button */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.6, duration: 0.5 }}
        className="flex justify-end"
      >
        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <Button
            onClick={handleSave}
            className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/50 px-8"
          >
            Save Preferences
          </Button>
        </motion.div>
      </motion.div>
    </div>
  );
}