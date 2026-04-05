"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";

const TRAINERS = [
    { rank: 1, name: "Mike Peters", sessions: 142, retention: 94.2, avatar: "https://i.pravatar.cc/150?u=mike" },
    { rank: 2, name: "Lisa Anderson", sessions: 128, retention: 91.8, avatar: "https://i.pravatar.cc/150?u=lisa" },
    { rank: 3, name: "John Davis", sessions: 115, retention: 89.3, avatar: "https://i.pravatar.cc/150?u=john" },
    { rank: 4, name: "Sarah Johnson", sessions: 98, retention: 87.6, avatar: "https://i.pravatar.cc/150?u=sarahj" },
    { rank: 5, name: "Tom Bradley", sessions: 87, retention: 85.1, avatar: "https://i.pravatar.cc/150?u=tom" },
];

export function TopTrainerEffectiveness() {
    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white h-full">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Top Trainer Effectiveness</CardTitle>
            </CardHeader>
            <CardContent>
                <div className="space-y-6">
                    {TRAINERS.map((trainer) => (
                        <div key={trainer.rank} className="flex items-center gap-4">
                            <div className="flex-shrink-0 w-6 h-6 flex items-center justify-center bg-blue-100 dark:bg-blue-900/20 text-blue-600 dark:text-blue-400 rounded-full text-xs font-bold">
                                #{trainer.rank}
                            </div>
                            <Avatar className="h-8 w-8">
                                <AvatarImage src={trainer.avatar} alt={trainer.name} />
                                <AvatarFallback>{trainer.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium text-gray-900 dark:text-white truncate">{trainer.name}</p>
                                <p className="text-xs text-gray-500 truncate">{trainer.sessions} sessions • {trainer.retention}% retention</p>
                            </div>
                            <div className="w-24">
                                <Progress value={trainer.retention} className="h-1.5" indicatorClassName="bg-blue-500" />
                            </div>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}
