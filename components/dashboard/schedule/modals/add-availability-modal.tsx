"use client";

import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X, Calendar as CalendarIcon, Plus, Clock } from "lucide-react";
import { TEMPLATES } from "@/constants/data";
import { cn } from "@/lib/utils";
import { Label } from "@/components/ui/label";

interface AddAvailabilityModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: any) => void;
}

export function AddAvailabilityModal({ isOpen, onClose, onSave }: AddAvailabilityModalProps) {
    const [date, setDate] = useState("");
    const [allMondays, setAllMondays] = useState(false);
    const [duration, setDuration] = useState("60");
    const [selectedTemplate, setSelectedTemplate] = useState("");
    const [repeatWeekly, setRepeatWeekly] = useState(false);
    const [repeatMonthly, setRepeatMonthly] = useState(false);

    // Time Ranges
    const [timeRanges, setTimeRanges] = useState([{ start: "09:00", end: "10:00" }]);

    // Session Config
    const [configMode, setConfigMode] = useState<"pre-divide" | "intervals" | "open">("pre-divide"); // pre-divide, signup-intervals, open-signup

    // Client Rules
    const [allowMultiple, setAllowMultiple] = useState(false);
    const [maxClients, setMaxClients] = useState("1");

    const [savePreset, setSavePreset] = useState(false);

    const addTimeRange = () => {
        setTimeRanges([...timeRanges, { start: "10:00", end: "11:00" }]);
    };

    const removeTimeRange = (index: number) => {
        setTimeRanges(timeRanges.filter((_, i) => i !== index));
    };

    const updateTimeRange = (index: number, field: "start" | "end", value: string) => {
        const newRanges = [...timeRanges];
        newRanges[index][field] = value;
        setTimeRanges(newRanges);
    };

    const handleSave = () => {
        onSave({
            date,
            allMondays,
            duration,
            template: selectedTemplate,
            repeat: { weekly: repeatWeekly, monthly: repeatMonthly },
            timeRanges,
            configMode,
            clientRules: { allowMultiple, maxClients },
            savePreset
        });
        onClose();
    };

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white dark:bg-zinc-900 border-none text-gray-900 dark:text-white max-w-2xl shadow-2xl p-0 gap-0 overflow-hidden outline-none">
                <div className="flex justify-between items-center p-6 border-b border-gray-100 dark:border-white/5">
                    <DialogTitle className="text-lg font-bold">Add Availability</DialogTitle>

                </div>

                <div className="p-6 space-y-8 max-h-[70vh] overflow-y-auto">
                    {/* Date Section */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Set Date</Label>
                        <Input
                            type="date" // In real app use a proper DatePicker component, using native for now
                            value={date}
                            onChange={(e) => setDate(e.target.value)}
                            className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 h-10"
                        />
                        <div className="flex items-center gap-2">
                            <Checkbox
                                id="allMondays"
                                checked={allMondays}
                                onCheckedChange={(c) => setAllMondays(!!c)}
                                className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label htmlFor="allMondays" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">All Mondays this month</label>
                        </div>
                    </div>

                    {/* Session Length */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Session Length (minutes)</Label>
                        <Input
                            type="number"
                            value={duration}
                            onChange={(e) => setDuration(e.target.value)}
                            className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 h-10 w-full"
                        />
                    </div>

                    {/* Workout Template */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Select Workout</Label>
                        <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                            <SelectTrigger className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 h-10">
                                <SelectValue placeholder="Select a workout (Optional)" />
                            </SelectTrigger>
                            <SelectContent>
                                {TEMPLATES.map(t => (
                                    <SelectItem key={t.id} value={t.id}>{t.name}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                    </div>

                    {/* Repeat Options */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Repeat Options</Label>
                        <div className="flex gap-6">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="weekly"
                                    checked={repeatWeekly}
                                    onCheckedChange={(c) => setRepeatWeekly(!!c)}
                                    className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <label htmlFor="weekly" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Repeat weekly</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="monthly"
                                    checked={repeatMonthly}
                                    onCheckedChange={(c) => setRepeatMonthly(!!c)}
                                    className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <label htmlFor="monthly" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Repeat monthly</label>
                            </div>
                        </div>
                    </div>

                    {/* Time Ranges */}
                    <div className="space-y-3">
                        <div className="flex items-center justify-between">
                            <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Time Ranges</Label>
                            <Button
                                variant="outline"
                                size="sm"
                                onClick={addTimeRange}
                                className="h-7 text-xs border-gray-200 dark:border-white/10 hover:bg-gray-50 dark:hover:bg-white/5"
                            >
                                <Plus className="w-3 h-3 mr-1" /> Add Range
                            </Button>
                        </div>
                        <div className="space-y-3">
                            {timeRanges.map((range, i) => (
                                <div key={i} className="flex gap-3 items-center group">
                                    <div className="relative flex-1">
                                        <Input
                                            type="time"
                                            value={range.start}
                                            onChange={(e) => updateTimeRange(i, "start", e.target.value)}
                                            className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 h-10 pl-3 dark:[color-scheme:dark]"
                                        />
                                    </div>
                                    <span className="text-sm text-gray-400 shrink-0">to</span>
                                    <div className="relative flex-1">
                                        <Input
                                            type="time"
                                            value={range.end}
                                            onChange={(e) => updateTimeRange(i, "end", e.target.value)}
                                            className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 h-10 pl-3 dark:[color-scheme:dark]"
                                        />
                                    </div>
                                    <Button
                                        variant="ghost"
                                        size="icon"
                                        onClick={() => removeTimeRange(i)}
                                        className="h-9 w-9 text-gray-400 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/10 opacity-0 group-hover:opacity-100 transition-opacity"
                                    >
                                        <X className="w-4 h-4" />
                                    </Button>
                                </div>
                            ))}
                        </div>
                        <p className="text-xs text-gray-400 mt-2">16 x 60-minute group sessions from 09:00-17:00</p>
                    </div>

                    {/* Session Config Mode */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Session Configuration Mode</Label>
                        <div className="space-y-2">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="pre-divide"
                                    checked={configMode === "pre-divide"}
                                    onCheckedChange={() => setConfigMode("pre-divide")}
                                    className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <label htmlFor="pre-divide" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Pre-divide sessions (Fixed slots)</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="intervals"
                                    checked={configMode === "intervals"}
                                    onCheckedChange={() => setConfigMode("intervals")}
                                    className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <label htmlFor="intervals" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Signup intervals</label>
                            </div>
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="open"
                                    checked={configMode === "open"}
                                    onCheckedChange={() => setConfigMode("open")}
                                    className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <label htmlFor="open" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Open signup</label>
                            </div>
                        </div>
                    </div>

                    {/* Client Rules */}
                    <div className="space-y-3">
                        <Label className="text-xs font-semibold uppercase text-gray-500 dark:text-gray-400 tracking-wide">Client Rules</Label>
                        <div className="space-y-4">
                            <div className="flex items-center gap-2">
                                <Checkbox
                                    id="allowMultiple"
                                    checked={allowMultiple}
                                    onCheckedChange={(c) => setAllowMultiple(!!c)}
                                    className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                                />
                                <label htmlFor="allowMultiple" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Allow multiple clients</label>
                            </div>

                            {allowMultiple && (
                                <div className="ml-6">
                                    <Label className="text-xs text-gray-500 mb-1.5 block">Max clients</Label>
                                    <Input
                                        type="number"
                                        value={maxClients}
                                        onChange={(e) => setMaxClients(e.target.value)}
                                        className="bg-gray-50 dark:bg-zinc-950/50 border-gray-200 dark:border-white/10 h-9 w-24"
                                    />
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Save Preset */}
                    <div className="pt-2 border-t border-gray-100 dark:border-white/5">
                        <div className="flex items-center gap-2 mt-4">
                            <Checkbox
                                id="savePreset"
                                checked={savePreset}
                                onCheckedChange={(c) => setSavePreset(!!c)}
                                className="border-gray-300 dark:border-white/20 data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                            />
                            <label htmlFor="savePreset" className="text-sm text-gray-600 dark:text-gray-400 cursor-pointer">Save this configuration as a preset for future use</label>
                        </div>
                    </div>
                </div>

                <div className="p-6 bg-gray-50/50 dark:bg-zinc-950/30 border-t border-gray-100 dark:border-white/5 flex justify-end gap-3">
                    <Button variant="destructive" onClick={onClose} className="bg-red-600 hover:bg-red-700 text-white border-0">
                        Cancel
                    </Button>
                    <Button className="bg-purple-600 hover:bg-purple-700 text-white shadow-lg shadow-purple-500/20 px-8" onClick={handleSave}>
                        Save Availability
                    </Button>
                </div>
            </DialogContent>
        </Dialog>
    );
}
