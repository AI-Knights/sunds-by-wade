"use client";

import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { CalendarIcon, Send } from "lucide-react";
import { format } from "date-fns";
import { cn } from "@/lib/utils";

export function CreateNotificationForm() {
    const [date, setDate] = React.useState<Date>();

    return (
        <Card className="border-none shadow-sm dark:bg-zinc-900 bg-white mb-8">
            <CardHeader>
                <CardTitle className="text-base font-medium text-gray-700 dark:text-gray-300">Create New Notification</CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
                <div className="space-y-2">
                    <Label htmlFor="title" className="text-sm font-medium text-gray-700 dark:text-gray-300">Notification Title</Label>
                    <Input id="title" placeholder="e.g., New Feature Available" className="bg-purple-50/50 dark:bg-zinc-800/50 border-purple-100 dark:border-zinc-700 focus-visible:ring-purple-500" />
                </div>

                <div className="space-y-2">
                    <Label htmlFor="message" className="text-sm font-medium text-gray-700 dark:text-gray-300">Message</Label>
                    <Textarea
                        id="message"
                        placeholder="Enter your notification message..."
                        className="min-h-[100px] bg-purple-50/50 dark:bg-zinc-800/50 border-purple-100 dark:border-zinc-700 focus-visible:ring-purple-500"
                    />
                    <p className="text-xs text-gray-400">0/200 characters</p>
                </div>

                <div className="space-y-2">
                    <Label htmlFor="audience" className="text-sm font-medium text-gray-700 dark:text-gray-300">Target Audience</Label>
                    <Select>
                        <SelectTrigger className="bg-purple-50/50 dark:bg-zinc-800/50 border-purple-100 dark:border-zinc-700 focus-visible:ring-purple-500">
                            <SelectValue placeholder="Select user segment" />
                        </SelectTrigger>
                        <SelectContent>
                            <SelectItem value="all">All Users</SelectItem>
                            <SelectItem value="trainers">Trainers</SelectItem>
                            <SelectItem value="clients">Clients</SelectItem>
                            <SelectItem value="gym-admins">Gym Admins</SelectItem>
                        </SelectContent>
                    </Select>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                        <Label className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule Date (Optional)</Label>
                        <Popover>
                            <PopoverTrigger asChild>
                                <Button
                                    variant={"outline"}
                                    className={cn(
                                        "w-full justify-start text-left font-normal bg-white dark:bg-zinc-900 border-gray-200 dark:border-zinc-700",
                                        !date && "text-muted-foreground"
                                    )}
                                >
                                    <CalendarIcon className="mr-2 h-4 w-4" />
                                    {date ? format(date, "PPP") : <span>Pick a date</span>}
                                </Button>
                            </PopoverTrigger>
                            <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                    mode="single"
                                    selected={date}
                                    onSelect={setDate}
                                    initialFocus
                                />
                            </PopoverContent>
                        </Popover>
                    </div>

                    <div className="space-y-2">
                        <Label htmlFor="time" className="text-sm font-medium text-gray-700 dark:text-gray-300">Schedule Time (Optional)</Label>
                        <Input id="time" type="time" className="bg-gray-100 dark:bg-zinc-800 border-transparent" disabled placeholder="--:--" />
                    </div>
                </div>

                <div className="flex items-center gap-4 pt-2">
                    <Button className="bg-[#a855f7] hover:bg-[#9333ea] text-white">
                        <Send className="w-4 h-4 mr-2" />
                        Send Now
                    </Button>
                    <Button variant="outline" className="text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-200">
                        Clear
                    </Button>
                </div>
            </CardContent>
        </Card>
    );
}
