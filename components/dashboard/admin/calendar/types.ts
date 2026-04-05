export type EventType = "Personal" | "Group" | "Open" | "Blocked";

export interface CalendarEvent {
    id: string;
    title: string;
    type: EventType;
    date: Date;
    durationMinutes: number;
    room?: string;
    trainer?: string;
    client?: string; // For personal sessions
    attendees?: number; // For group classes
    maxAttendees?: number;
}
