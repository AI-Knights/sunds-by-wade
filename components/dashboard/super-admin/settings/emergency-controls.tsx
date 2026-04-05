"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { AlertTriangle, Lock, ShieldAlert, RotateCcw } from "lucide-react"
import { ActionConfirmationModal } from "./action-confirmation-modal"
import { toast } from "sonner"

export function EmergencyControls() {
    const [modalState, setModalState] = useState<{
        isOpen: boolean
        type: "freeze" | "lock" | "reset" | null
    }>({ isOpen: false, type: null })

    const handleAction = (type: "freeze" | "lock" | "reset") => {
        setModalState({ isOpen: true, type })
    }

    const handleConfirm = () => {
        // Simulate action
        setTimeout(() => {
            toast.success("Action executed successfully")
            setModalState({ isOpen: false, type: null })
        }, 1000)
    }

    const getModalContent = () => {
        switch (modalState.type) {
            case "freeze":
                return {
                    title: "Freeze Gym Access",
                    description: "This is an emergency action that will immediately block all gym operations platform-wide. Use only in critical situations.",
                    variant: "danger" as const
                }
            case "lock":
                return {
                    title: "Lock Admin Actions",
                    description: "This will prevent all gym administrators from making changes. Use this during investigations or system maintenance.",
                    variant: "danger" as const
                }
            case "reset":
                return {
                    title: "Force Compliance Reset",
                    description: "This will reset all system policies to default values. This action cannot be undone easily.",
                    variant: "danger" as const
                }
            default:
                return {
                    title: "Are you sure?",
                    description: "This action cannot be undone.",
                    variant: "danger" as const
                }
        }
    }

    const modalContent = getModalContent()

    return (
        <>
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5, duration: 0.5 }}
            >
                <Card className="border-red-100 dark:border-red-900/30 shadow-sm overflow-hidden bg-red-50/10 dark:bg-red-900/5">
                    <CardHeader className="bg-red-50/50 dark:bg-red-900/10 pb-4 border-b border-red-100 dark:border-red-900/30">
                        <div className="flex items-center gap-3">
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-red-100 dark:bg-red-900/20 text-red-600 dark:text-red-500">
                                <AlertTriangle className="h-5 w-5" />
                            </div>
                            <div>
                                <h3 className="font-semibold text-lg text-red-700 dark:text-red-400">Emergency Controls</h3>
                                <p className="text-sm text-red-600/80 dark:text-red-400/70">Critical security actions (use with caution)</p>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent className="p-6 grid gap-4 md:grid-cols-3">
                        <div className="rounded-lg border border-red-200 dark:border-red-900/40 bg-white dark:bg-black/20 p-4 space-y-3">
                            <div className="flex items-center gap-2 text-red-600 dark:text-red-400 font-medium">
                                <Lock className="h-4 w-4" />
                                <span>Freeze Gym Access</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Block all gym operations immediately.</p>
                            <Button
                                variant="outline"
                                className="w-full border-red-200 text-red-600 hover:bg-red-50 hover:text-red-700 dark:border-red-900/50 dark:hover:bg-red-900/20"
                                onClick={() => handleAction("freeze")}
                            >
                                Freeze Access
                            </Button>
                        </div>

                        <div className="rounded-lg border border-orange-200 dark:border-orange-900/40 bg-white dark:bg-black/20 p-4 space-y-3">
                            <div className="flex items-center gap-2 text-orange-600 dark:text-orange-400 font-medium">
                                <ShieldAlert className="h-4 w-4" />
                                <span>Lock Admin Actions</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Prevent admin changes system-wide.</p>
                            <Button
                                variant="outline"
                                className="w-full border-orange-200 text-orange-600 hover:bg-orange-50 hover:text-orange-700 dark:border-orange-900/50 dark:hover:bg-orange-900/20"
                                onClick={() => handleAction("lock")}
                            >
                                Lock Admin Actions
                            </Button>
                        </div>

                        <div className="rounded-lg border border-zinc-200 dark:border-zinc-800 bg-white dark:bg-black/20 p-4 space-y-3">
                            <div className="flex items-center gap-2 text-foreground font-medium">
                                <RotateCcw className="h-4 w-4" />
                                <span>Force Compliance Reset</span>
                            </div>
                            <p className="text-xs text-muted-foreground">Reset to default policies.</p>
                            <Button
                                variant="outline"
                                className="w-full hover:bg-zinc-100 dark:hover:bg-zinc-800"
                                onClick={() => handleAction("reset")}
                            >
                                Force Reset
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </motion.div>

            <ActionConfirmationModal
                isOpen={modalState.isOpen}
                onClose={() => setModalState({ ...modalState, isOpen: false })}
                onConfirm={handleConfirm}
                title={modalContent.title}
                description={modalContent.description}
                variant={modalContent.variant}
            />
        </>
    )
}
