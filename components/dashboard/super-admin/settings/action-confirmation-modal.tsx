"use client"

import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogDescription,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog"
import { AlertCircle } from "lucide-react"

interface ActionConfirmationModalProps {
    isOpen: boolean
    onClose: () => void
    onConfirm: () => void
    title: string
    description: string
    confirmText?: string
    variant?: "danger" | "warning"
}

export function ActionConfirmationModal({
    isOpen,
    onClose,
    onConfirm,
    title,
    description,
    confirmText = "Confirm",
    variant = "danger",
}: ActionConfirmationModalProps) {

    return (
        <AlertDialog open={isOpen} onOpenChange={onClose}>
            <AlertDialogContent className="max-w-[400px]">
                <AlertDialogHeader>
                    <div className="flex items-center gap-3 mb-2">
                        <div className={`flex h-10 w-10 items-center justify-center rounded-full ${variant === 'danger' ? 'bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-500' : 'bg-orange-100 text-orange-600 dark:bg-orange-900/30 dark:text-orange-500'}`}>
                            <AlertCircle className="h-5 w-5" />
                        </div>
                        <AlertDialogTitle className="text-lg">{title}</AlertDialogTitle>
                    </div>
                    <AlertDialogDescription>
                        {description}
                    </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter className="mt-4">
                    <AlertDialogCancel onClick={onClose} className="h-10">Cancel</AlertDialogCancel>
                    <AlertDialogAction
                        onClick={onConfirm}
                        className={`h-10 ${variant === 'danger' ? 'bg-red-600 hover:bg-red-700 focus:ring-red-600' : 'bg-orange-600 hover:bg-orange-700'}`}
                    >
                        {confirmText}
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    )
}
