import { format, isAfter } from "date-fns";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

interface UpcomingSessionsProps {
    sessions: any[];
    onSessionClick: (session: any) => void;
}

export function UpcomingSessions({ sessions, onSessionClick }: UpcomingSessionsProps) {
    const upcomingSessions = sessions
        .filter(s => isAfter(s.date, new Date(2026, 0, 1)))
        .sort((a, b) => a.date.getTime() - b.date.getTime())
        .slice(0, 4);

    const getTypeStyles = (type: string) => {
        switch (type.toLowerCase()) {
            case "personal": return "bg-gray-100 text-gray-700 dark:bg-white/10 dark:text-gray-300 border-gray-200 dark:border-transparent";
            case "group": return "bg-purple-100 text-purple-700 dark:bg-purple-500/20 dark:text-purple-300 border-purple-200 dark:border-purple-500/10";
            case "open": return "bg-emerald-100 text-emerald-700 dark:bg-emerald-500/20 dark:text-emerald-300 border-emerald-200 dark:border-emerald-500/10";
            default: return "bg-gray-100 text-gray-700";
        }
    };
    return (
        <div className="space-y-4">
            {upcomingSessions.map((session, index) => (
                <motion.div
                    key={session.id}
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1 }}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 bg-white dark:bg-zinc-900 border border-gray-100 dark:border-white/5 rounded-xl shadow-sm hover:shadow-md transition-all gap-4"
                >
                    <div className="flex items-start gap-4">
                        <div className="flex flex-col items-center justify-center w-12 h-12 bg-gray-50 dark:bg-white/5 rounded-lg border border-gray-100 dark:border-white/5">
                            <span className="text-sm font-bold text-gray-900 dark:text-white">{format(session.date, "dd")}</span>
                            <span className="text-[10px] text-gray-500 uppercase">{format(session.date, "MMM")}</span>
                        </div>
                        <div>
                            <div className="flex items-center gap-2 mb-1">
                                <h3 className="font-semibold text-gray-900 dark:text-white">
                                    {session.type === "Open" ? "Open Slot" : session.client}
                                </h3>
                                <Badge variant="outline" className={getTypeStyles(session.type)}>
                                    {session.type}
                                </Badge>
                            </div>
                            <p className="text-sm text-gray-500 dark:text-gray-400">
                                {format(session.date, "HH:mm")} - {format(new Date(session.date.getTime() + session.duration * 60000), "HH:mm")}
                                {session.type === "Group" && " • 5/8 clients"}
                            </p>
                        </div>
                    </div>
                    <Button
                        variant="outline"
                        size="sm"
                        className="w-full sm:w-auto border-gray-200 dark:border-white/10 text-gray-600 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-white/5"
                        onClick={() => onSessionClick(session)}
                    >
                        View Details
                    </Button>
                </motion.div>
            ))}
        </div>
    );
}
