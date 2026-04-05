"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Plus, Edit, Trash2, Award, Calendar, Building2, Moon, Sun } from "lucide-react";
import { useTheme } from "next-themes";

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.1,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 300,
      damping: 24,
    },
  },
  exit: {
    opacity: 0,
    x: -100,
    scale: 0.9,
    transition: {
      duration: 0.3,
    },
  },
};

const dialogVariants = {
  hidden: { opacity: 0, scale: 0.95, y: 20 },
  visible: {
    opacity: 1,
    scale: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 400,
      damping: 25,
    },
  },
  exit: {
    opacity: 0,
    scale: 0.95,
    y: 20,
    transition: {
      duration: 0.2,
    },
  },
};

interface Certification {
  id: string;
  title: string;
  organization: string;
  status: "active" | "expired";
  issued: string;
  expires: string;
}

export default function AssociatedGyms() {
  const { theme, setTheme } = useTheme();
  const [certifications, setCertifications] = useState<Certification[]>([
    {
      id: "1",
      title: "Downtown Fitness Hub",
      organization: "123 Main St, New York, NY 10001",
      status: "active",
      issued: "Jan 2018",
      expires: "Jan 2026",
    },
    {
      id: "2",
      title: "Elite Training Center",
      organization: "456 Elm Ave, New York, NY 10002",
      status: "active",
      issued: "Jun 2019",
      expires: "Jun 2027",
    },
    {
      id: "3",
      title: "Precision Nutrition Level 1",
      organization: "Precision Nutrition",
      status: "active",
      issued: "Mar 2020",
      expires: "N/A",
    },
  ]);

  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    organization: "",
    status: "active" as "active" | "expired",
    issued: "",
    expires: "",
  });

  const handleAdd = () => {
    setEditingCert(null);
    setFormData({
      title: "",
      organization: "",
      status: "active",
      issued: "",
      expires: "",
    });
    setIsDialogOpen(true);
  };

  const handleEdit = (cert: Certification) => {
    setEditingCert(cert);
    setFormData({
      title: cert.title,
      organization: cert.organization,
      status: cert.status,
      issued: cert.issued,
      expires: cert.expires,
    });
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setCertifications(certifications.filter((cert) => cert.id !== id));
  };

  const handleSave = () => {
    if (editingCert) {
      // Update existing
      setCertifications(
        certifications.map((cert) =>
          cert.id === editingCert.id ? { ...cert, ...formData } : cert
        )
      );
    } else {
      // Add new
      const newCert: Certification = {
        id: Date.now().toString(),
        ...formData,
      };
      setCertifications([...certifications, newCert]);
    }
    setIsDialogOpen(false);
  };

  return (
    <div className="min-h-screen transition-colors duration-500 p-4 md:p-8">
      <div className=" mx-auto">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-8"
        >
          <div>
            <motion.h1
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
              className="text-3xl md:text-4xl font-bold text-gray-900 dark:text-white mb-2"
            >
              Certifications & Credentials
            </motion.h1>
            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="text-gray-600 dark:text-gray-400"
            >
              Manage your professional certifications
            </motion.p>
          </div>

          <div className="flex gap-3">
            {/* Dark Mode Toggle */}
          

            {/* Add Button */}
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, type: "spring", stiffness: 300 }}
            >
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/50"
              >
                <motion.div
                  whileHover={{ rotate: 90 }}
                  transition={{ duration: 0.3 }}
                  className="mr-2"
                >
                  <Plus className="w-4 h-4" />
                </motion.div>
                Add Certification
              </Button>
            </motion.div>
          </div>
        </motion.div>

        {/* Certifications List */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="space-y-4"
        >
          <AnimatePresence mode="popLayout">
            {certifications.map((cert, index) => (
              <motion.div
                key={cert.id}
                variants={cardVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
                layout
                layoutId={cert.id}
                whileHover={{
                  scale: 1.01,
                  transition: { type: "spring", stiffness: 400, damping: 25 },
                }}
              >
                <Card className="border-none shadow-xl bg-white/80 dark:bg-gray-800/50 backdrop-blur-lg transition-all duration-300 overflow-hidden relative group">
                  {/* Left accent bar */}
                  <motion.div
                    className="absolute top-0 left-0 w-1 h-full bg-gradient-to-b from-purple-500 to-purple-700"
                    initial={{ height: 0 }}
                    animate={{ height: "100%" }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                  />
                  
                  <CardContent className="p-6">
                    <div className="flex flex-col sm:flex-row justify-between gap-4">
                      <div className="flex-1 space-y-3">
                        {/* Title and Badge */}
                        <div className="flex items-start gap-3 flex-wrap">
                          <motion.div
                            initial={{ scale: 0, rotate: -180 }}
                            animate={{ scale: 1, rotate: 0 }}
                            transition={{
                              delay: 0.2 + index * 0.1,
                              type: "spring",
                              stiffness: 500,
                              damping: 20,
                            }}
                            whileHover={{ rotate: 360, scale: 1.1 }}
                            className="p-3 bg-gradient-to-br from-purple-100 to-purple-200 dark:from-purple-900/30 dark:to-purple-800/30 rounded-xl cursor-pointer"
                          >
                            <Award className="w-5 h-5 text-purple-600 dark:text-purple-400" />
                          </motion.div>
                          
                          <div className="flex-1">
                            <div className="flex items-center gap-3 flex-wrap">
                              <motion.h3
                                initial={{ opacity: 0, x: -10 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ delay: 0.3 + index * 0.1 }}
                                className="text-lg font-semibold text-gray-900 dark:text-white"
                              >
                                {cert.title}
                              </motion.h3>
                              
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{
                                  delay: 0.4 + index * 0.1,
                                  type: "spring",
                                  stiffness: 400,
                                }}
                              >
                                <Badge
                                  className={`${
                                    cert.status === "active"
                                      ? "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400 hover:bg-green-200 dark:hover:bg-green-900/50"
                                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                  } transition-colors duration-300`}
                                >
                                  {cert.status === "active" ? "Active" : "Expired"}
                                </Badge>
                              </motion.div>
                            </div>

                            {/* Organization */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.4 + index * 0.1 }}
                              className="flex items-center gap-2 mt-2 text-gray-600 dark:text-gray-400"
                            >
                              <Building2 className="w-4 h-4" />
                              <span className="text-sm">{cert.organization}</span>
                            </motion.div>

                            {/* Dates */}
                            <motion.div
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: 0.5 + index * 0.1 }}
                              className="flex items-center gap-2 mt-1 text-sm text-gray-500 dark:text-gray-400"
                            >
                              <Calendar className="w-4 h-4" />
                              <span>
                                Issued: {cert.issued} • Expires: {cert.expires}
                              </span>
                            </motion.div>
                          </div>
                        </div>
                      </div>

                      {/* Action Buttons */}
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.6 + index * 0.1 }}
                        className="flex sm:flex-col gap-2"
                      >
                        <motion.div
                          whileHover={{ scale: 1.1, rotate: 5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleEdit(cert)}
                            className="text-purple-600 dark:text-purple-400 hover:bg-purple-100 dark:hover:bg-purple-900/30 hover:text-purple-700 dark:hover:text-purple-300 transition-all duration-300"
                          >
                            <Edit className="w-4 h-4 sm:mr-0 mr-2" />
                            <span className="sm:hidden">Edit</span>
                          </Button>
                        </motion.div>

                        <motion.div
                          whileHover={{ scale: 1.1, rotate: -5 }}
                          whileTap={{ scale: 0.9 }}
                        >
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleDelete(cert.id)}
                            className="text-red-600 dark:text-red-400 hover:bg-red-100 dark:hover:bg-red-900/30 hover:text-red-700 dark:hover:text-red-300 transition-all duration-300"
                          >
                            <Trash2 className="w-4 h-4 sm:mr-0 mr-2" />
                            <span className="sm:hidden">Delete</span>
                          </Button>
                        </motion.div>
                      </motion.div>
                    </div>
                  </CardContent>

                  {/* Bottom hover effect */}
                  <motion.div
                    className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-purple-500 via-purple-600 to-purple-700"
                    initial={{ scaleX: 0 }}
                    whileHover={{ scaleX: 1 }}
                    transition={{ duration: 0.3 }}
                  />
                </Card>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>

        {/* Empty State */}
        {certifications.length === 0 && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="text-center py-16"
          >
            <motion.div
              animate={{
                y: [0, -10, 0],
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                ease: "easeInOut",
              }}
            >
              <Award className="w-16 h-16 mx-auto text-gray-400 dark:text-gray-600 mb-4" />
            </motion.div>
            <h3 className="text-xl font-semibold text-gray-700 dark:text-gray-300 mb-2">
              No certifications yet
            </h3>
            <p className="text-gray-500 dark:text-gray-400 mb-6">
              Add your first certification to get started
            </p>
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <Button
                onClick={handleAdd}
                className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white shadow-lg shadow-purple-500/50"
              >
                <Plus className="w-4 h-4 mr-2" />
                Add Your First Certification
              </Button>
            </motion.div>
          </motion.div>
        )}
      </div>

      {/* Edit/Add Dialog */}
      <AnimatePresence>
        {isDialogOpen && (
          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogContent className="sm:max-w-[500px] bg-white dark:bg-gray-800 border-none">
              <motion.div
                variants={dialogVariants}
                initial="hidden"
                animate="visible"
                exit="exit"
              >
                <DialogHeader>
                  <DialogTitle className="text-2xl font-bold text-gray-900 dark:text-white">
                    {editingCert ? "Edit Certification" : "Add Certification"}
                  </DialogTitle>
                  <DialogDescription className="text-gray-600 dark:text-gray-400">
                    {editingCert
                      ? "Update your certification details"
                      : "Add a new certification to your profile"}
                  </DialogDescription>
                </DialogHeader>

                <div className="space-y-4 py-4">
                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.1 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="title" className="text-gray-700 dark:text-gray-300">
                      Certification Title
                    </Label>
                    <Input
                      id="title"
                      value={formData.title}
                      onChange={(e) =>
                        setFormData({ ...formData, title: e.target.value })
                      }
                      placeholder="e.g., NASM Certified Personal Trainer"
                      className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="organization" className="text-gray-700 dark:text-gray-300">
                      Organization
                    </Label>
                    <Input
                      id="organization"
                      value={formData.organization}
                      onChange={(e) =>
                        setFormData({ ...formData, organization: e.target.value })
                      }
                      placeholder="e.g., National Academy of Sports Medicine"
                      className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                    />
                  </motion.div>

                  <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.3 }}
                    className="space-y-2"
                  >
                    <Label htmlFor="status" className="text-gray-700 dark:text-gray-300">
                      Status
                    </Label>
                    <Select
                      value={formData.status}
                      onValueChange={(value: "active" | "expired") =>
                        setFormData({ ...formData, status: value })
                      }
                    >
                      <SelectTrigger className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="active">Active</SelectItem>
                        <SelectItem value="expired">Expired</SelectItem>
                      </SelectContent>
                    </Select>
                  </motion.div>

                  <div className="grid grid-cols-2 gap-4">
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.4 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="issued" className="text-gray-700 dark:text-gray-300">
                        Issued Date
                      </Label>
                      <Input
                        id="issued"
                        value={formData.issued}
                        onChange={(e) =>
                          setFormData({ ...formData, issued: e.target.value })
                        }
                        placeholder="e.g., Jan 2020"
                        className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </motion.div>

                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.5 }}
                      className="space-y-2"
                    >
                      <Label htmlFor="expires" className="text-gray-700 dark:text-gray-300">
                        Expires Date
                      </Label>
                      <Input
                        id="expires"
                        value={formData.expires}
                        onChange={(e) =>
                          setFormData({ ...formData, expires: e.target.value })
                        }
                        placeholder="e.g., Jan 2025 or N/A"
                        className="bg-white dark:bg-gray-700/50 border-gray-200 dark:border-gray-600 text-gray-900 dark:text-white"
                      />
                    </motion.div>
                  </div>
                </div>

                <DialogFooter>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      variant="outline"
                      onClick={() => setIsDialogOpen(false)}
                      className="border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700"
                    >
                      Cancel
                    </Button>
                  </motion.div>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <Button
                      onClick={handleSave}
                      className="bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white"
                    >
                      {editingCert ? "Update" : "Add"} Certification
                    </Button>
                  </motion.div>
                </DialogFooter>
              </motion.div>
            </DialogContent>
          </Dialog>
        )}
      </AnimatePresence>
    </div>
  );
}