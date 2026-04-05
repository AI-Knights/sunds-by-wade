import { Calendar, Users, MessageSquare, TrendingUp, Dumbbell, Activity, Star, Settings } from "lucide-react";

export const TRAINER_STATS = [
    {
        label: "Active Clients",
        value: "4",
        subtext: "5 total clients",
        icon: Users,
        trend: "+1",
        color: "text-blue-400"
    },
    {
        label: "Today's Sessions",
        value: "2",
        subtext: "2 personal, 1 open slot",
        icon: Calendar,
        trend: "0",
        color: "text-purple-400"
    },
    {
        label: "Unread Messages",
        value: "3",
        subtext: "From 3 conversations",
        icon: MessageSquare,
        trend: "+3",
        color: "text-pink-400"
    },
    {
        label: "Completion Rate",
        value: "92%",
        subtext: "+6% from last week",
        icon: TrendingUp,
        trend: "+6%",
        color: "text-emerald-400"
    }
];

export const UPCOMING_SESSIONS = [
    {
        id: 1,
        date: "11",
        month: "Jan",
        time: "09:00 - 10:00",
        client: "Sarah Mitchell",
        type: "Personal",
        status: "confirmed"
    },
    {
        id: 2,
        date: "12",
        month: "Jan",
        time: "10:30 - 11:30",
        client: "Emily Chen",
        type: "Personal",
        status: "confirmed"
    },
    {
        id: 3,
        date: "13",
        month: "Jan",
        time: "18:00 - 19:00",
        client: "Group Session",
        type: "Group",
        status: "confirmed"
    }
];

export const CLIENTS = [
    {
        id: "1",
        name: "Sarah Mitchell",
        location: "Downtown Fitness Hub",
        status: "Active",
        membership: "Premium",
        trainingType: "Personal",
        completionRate: 95,
        nextSession: "Jan 11, 9:00 AM",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        memberSince: "September 15, 2025",
        phone: "+1 (555) 123-4567",
        email: "sarah.mitchell@email.com",
    },
    {
        id: "2",
        name: "Marcus Johnson",
        location: "Elite Training Center",
        status: "Active",
        membership: "Elite",
        trainingType: "Hybrid",
        completionRate: 88,
        nextSession: "Jan 10, 2:00 PM",
        avatar: "https://i.pravatar.cc/150?u=marcus",
        memberSince: "August 2, 2025",
        phone: "+1 (555) 987-6543",
        email: "marcus.j@email.com",
    },
    {
        id: "3",
        name: "Emily Chen",
        location: "Downtown Fitness Hub",
        status: "Active",
        membership: "Basic",
        trainingType: "Group",
        completionRate: 92,
        nextSession: "Jan 12, 10:30 AM",
        avatar: "https://i.pravatar.cc/150?u=emily",
        memberSince: "November 20, 2025",
        phone: "+1 (555) 456-7890",
        email: "emily.chen@email.com",
    },
    {
        id: "4",
        name: "David Rodriguez",
        location: "Elite Training Center",
        status: "Active",
        membership: "Premium",
        trainingType: "Personal",
        completionRate: 97,
        nextSession: "Jan 13, 8:00 AM",
        avatar: "https://i.pravatar.cc/150?u=david",
        memberSince: "January 5, 2026",
        phone: "+1 (555) 222-3333",
        email: "david.r@email.com",
    },
    {
        id: "5",
        name: "Jessica Taylor",
        location: "Downtown Fitness Hub",
        status: "Inactive",
        membership: "Premium",
        trainingType: "Personal",
        completionRate: 85,
        nextSession: "No session scheduled",
        avatar: "https://i.pravatar.cc/150?u=jessica",
        memberSince: "March 10, 2025",
        phone: "+1 (555) 444-5555",
        email: "jess.taylor@email.com",
    }
];

// Enhanced User Data for Gym Admin
export const USERS = [

    {
        id: "2",
        name: "Sarah Johnson",
        email: "sarah@example.com",
        role: "Trainer",
        status: "Active",
        membership: "—",
        joinDate: "6/10/2023",
        avatar: "https://i.pravatar.cc/150?u=sarahj",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        dob: "January 15, 1990",
        employmentStatus: "Full Time",
        clientCount: 12,
        specialties: ["HIIT", "Strength"]
    },
    {
        id: "3",
        name: "Mike Chen",
        email: "mike@example.com",
        role: "Trainer",
        status: "Active",
        membership: "—",
        joinDate: "8/20/2023",
        avatar: "https://i.pravatar.cc/150?u=mike",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        employmentStatus: "Part Time",
        clientCount: 8,
        specialties: ["Yoga", "Mobility"]
    },
    {
        id: "4",
        name: "Emma Davis",
        email: "emma@example.com",
        role: "Associate",
        status: "Active",
        membership: "—",
        joinDate: "2/1/2024",
        avatar: "https://i.pravatar.cc/150?u=emma",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        employmentStatus: "Full Time",
        department: "Front Desk"
    },
    {
        id: "5",
        name: "Lisa Brown",
        email: "lisa@example.com",
        role: "Moderator",
        status: "Active",
        membership: "—",
        joinDate: "11/15/2023",
        avatar: "https://i.pravatar.cc/150?u=lisa",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        roleDescription: "Community Moderator"
    },
    {
        id: "6",
        name: "James Wilson",
        email: "james@example.com",
        role: "Trainer",
        status: "Active",
        membership: "—",
        joinDate: "9/5/2023",
        avatar: "https://i.pravatar.cc/150?u=james",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        employmentStatus: "Contract",
        clientCount: 15,
        specialties: ["Powerlifting"]
    },
    {
        id: "7",
        name: "Emily Taylor",
        email: "emily@example.com",
        role: "Client",
        status: "Active",
        membership: "Basic",
        joinDate: "3/10/2024",
        avatar: "https://i.pravatar.cc/150?u=emilyt",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        credits: 5,
        assignedTrainer: null
    },
    {
        id: "8",
        name: "David Martinez",
        email: "david@example.com",
        role: "Client",
        status: "Paused",
        membership: "Premium",
        joinDate: "12/1/2023",
        avatar: "https://i.pravatar.cc/150?u=davidm",
        phone: "(555) 123-4567",
        location: "123 Main St, City, ST 12345",
        credits: 0,
        assignedTrainer: { id: "tr-3", name: "Mike Chen", email: "mike@example.com" }
    }
];

export const CLIENT_METRICS = {
    "1": {
        bodyweight: { value: "145 lbs", trend: "-8 lbs" },
        totalWorkouts: "42",
        completionRate: "95%",
        plan: "Premium",
        bench: { current: 135, max: 155, progress: 87 },
        squat: { current: 185, max: 225, progress: 82 },
        deadlift: { current: 205, max: 255, progress: 80 },
    }
}

export const CLIENT_HISTORY = [
    {
        id: 1,
        title: "Full Body Strength A",
        date: "Jan 9, 2026",
        status: "Complete",
        duration: "52 min"
    },
    {
        id: 2,
        title: "Upper Body Hypertrophy",
        date: "Jan 7, 2026",
        status: "Complete",
        duration: "48 min"
    },
    {
        id: 3,
        title: "Leg Day Focus",
        date: "Jan 5, 2026",
        status: "Complete",
        duration: "58 min"
    },
    {
        id: 4,
        title: "Full Body Strength A",
        date: "Jan 3, 2026",
        status: "Partial",
        duration: "35 min"
    }
];

export const RECENT_ASSIGNMENTS = [
    {
        id: 1,
        title: "Full Body Strength A",
        subtitle: "Assigned to Sarah Mitchell • Jan 9",
        icon: Dumbbell,
        color: "bg-emerald-500/20 text-emerald-400"
    },
    {
        id: 2,
        title: "Upper Body Hypertrophy",
        subtitle: "Assigned to Marcus Johnson • Jan 8",
        icon: Activity,
        color: "bg-blue-500/20 text-blue-400"
    },
    {
        id: 3,
        title: "Leg Day Focus",
        subtitle: "Assigned to David Rodriguez • Jan 7",
        icon: Star,
        color: "bg-purple-500/20 text-purple-400"
    }
];

export const SIDEBAR_ITEMS = [
    { label: "Dashboard", href: "/trainer", icon: Activity },
    { label: "Clients", href: "/trainer/clients", icon: Users },
    { label: "Workout Builder", href: "/trainer/builder", icon: Dumbbell },
    { label: "Templates", href: "/trainer/templates", icon: Dumbbell },
    { label: "Calendar", href: "/trainer/schedule", icon: Calendar },
    { label: "Inbox", href: "/trainer/messages", icon: MessageSquare },
    { label: "Account", href: "/trainer/account", icon: Settings }
];

export const ADMIN_SIDEBAR_ITEMS = [
    { label: "Dashboard", href: "/gym-admin/dashboard", icon: Activity },
    { label: "Users", href: "/gym-admin/users", icon: Users },
    { label: "Classes & Schedule", href: "/gym-admin/classes", icon: Calendar },
    { label: "Workout Builder", href: "/gym-admin/builder", icon: Dumbbell },
    { label: "Templates", href: "/gym-admin/templates", icon: Dumbbell },
    { label: "Calendar", href: "/gym-admin/calendar", icon: Calendar },
    { label: "Inbox", href: "/gym-admin/messages", icon: MessageSquare },
    { label: "Marketplace", href: "/gym-admin/marketplace", icon: Star },
    { label: "Leads", href: "/gym-admin/request", icon: Users },
    { label: "Front Desk", href: "/gym-admin/front-desk", icon: Settings }, // Using Settings as placeholder or find better
    { label: "Check-In", href: "/gym-admin/check-in", icon: Activity },
    { label: "Reports & Analytics", href: "/gym-admin/reports", icon: TrendingUp },
    { label: "Settings", href: "/gym-admin/settings", icon: Settings }
];

export const EXERCISE_TAGS = ["Chest", "Back", "Legs", "Shoulders", "Biceps", "Triceps", "Core", "Glutes", "Cardio"];

export const EXERCISES = [
    {
        id: "ex-1",
        name: "Barbell Squat",
        tags: ["Legs", "Glutes"],
        type: "Strength",
        equipment: "Barbell"
    },
    {
        id: "ex-2",
        name: "Bench Press",
        tags: ["Chest", "Triceps", "Shoulders"],
        type: "Strength",
        equipment: "Barbell"
    },
    {
        id: "ex-3",
        name: "Deadlift",
        tags: ["Back", "Legs", "Core"],
        type: "Strength",
        equipment: "Barbell"
    },
    {
        id: "ex-4",
        name: "Pull-ups",
        tags: ["Back", "Biceps"],
        type: "Bodyweight",
        equipment: "Bar"
    },
    {
        id: "ex-5",
        name: "Overhead Press",
        tags: ["Shoulders", "Triceps"],
        type: "Strength",
        equipment: "Barbell"
    },
    {
        id: "ex-6",
        name: "Barbell Row",
        tags: ["Back", "Biceps"],
        type: "Strength",
        equipment: "Barbell"
    },
    {
        id: "ex-7",
        name: "Leg Press",
        tags: ["Legs", "Glutes"],
        type: "Machine",
        equipment: "Machine"
    },
    {
        id: "ex-8",
        name: "Dumbbell Curl",
        tags: ["Biceps"],
        type: "Hypertrophy",
        equipment: "Dumbbell"
    },
    {
        id: "ex-9",
        name: "Tricep Dips",
        tags: ["Triceps", "Chest"],
        type: "Bodyweight",
        equipment: "Bars"
    },
    {
        id: "ex-10",
        name: "Plank",
        tags: ["Core", "Shoulders"],
        type: "Isometric",
        equipment: "Bodyweight"
    },
    {
        id: "ex-11",
        name: "Lunges",
        tags: ["Legs", "Glutes"],
        type: "Strength",
        equipment: "Dumbbell"
    }
];

export const TEMPLATES = [
    {
        id: "temp-1",
        name: "Full Body Strength A",
        type: "Gym",
        exercises: [
            { name: "Barbell Squat", sets: "4 x 8-10" },
            { name: "Bench Press", sets: "4 x 8-10" },
            { name: "Pull-ups", sets: "3 x 8-12" },
            { name: "+1 more exercise", sets: "" }
        ],
        totalExercises: 4,
        totalSets: 14
    },
    {
        id: "temp-2",
        name: "Upper Body Hypertrophy",
        type: "Gym",
        exercises: [
            { name: "Bench Press", sets: "4 x 10-12" },
            { name: "Overhead Press", sets: "4 x 10-12" },
            { name: "Barbell Row", sets: "3 x 10-12" },
            { name: "+2 more exercises", sets: "" }
        ],
        totalExercises: 5,
        totalSets: 17
    },
    {
        id: "temp-3",
        name: "Leg Day Focus",
        type: "Gym",
        exercises: [
            { name: "Barbell Squat", sets: "5 x 6-8" },
            { name: "Leg Press", sets: "4 x 10-12" },
            { name: "Lunges", sets: "3 x 10-12 each" }
        ],
        totalExercises: 3,
        totalSets: 12
    },
    {
        id: "temp-4",
        name: "Core Circuit",
        type: "Gym",
        exercises: [
            { name: "Plank", sets: "4 x Max hold" }
        ],
        totalExercises: 1,
        totalSets: 4
    }
];

export const SESSIONS = [
    {
        id: "sess-1",
        date: new Date(2026, 0, 11, 9, 0), // Jan 11, 2026 9:00 AM
        duration: 60,
        client: "Sarah Mitchell",
        clientId: "1",
        type: "Personal",
        status: "Scheduled"
    },
    {
        id: "sess-2",
        date: new Date(2026, 0, 12, 10, 30), // Jan 12, 2026 10:30 AM
        duration: 60,
        client: "Emily Chen",
        clientId: "3",
        type: "Personal",
        status: "Scheduled"
    },
    {
        id: "sess-3",
        date: new Date(2026, 0, 13, 18, 0), // Jan 13, 2026 6:00 PM
        duration: 60,
        client: "Group Session",
        clientId: null,
        type: "Group",
        participants: 5,
        maxParticipants: 8,
        status: "Scheduled"
    },
    {
        id: "sess-4",
        date: new Date(2026, 0, 10, 14, 0), // Jan 10, 2026 2:00 PM
        duration: 60,
        client: "Marcus Johnson",
        clientId: "2",
        type: "Personal",
        status: "Completed"
    },
    {
        id: "sess-5",
        date: new Date(2026, 0, 10, 16, 0), // Jan 10, 2026 4:00 PM
        duration: 60,
        type: "Open",
        status: "Open"
    }
];

export const CONVERSATIONS = [
    {
        id: "conv-1",
        clientId: "1",
        clientName: "Sarah Mitchell",
        avatar: "https://i.pravatar.cc/150?u=sarah",
        lastMessage: "Thanks for the new workout plan!",
        timestamp: "10:32 AM",
        unreadCount: 2,
        isOnline: true
    },
    {
        id: "conv-2",
        clientId: "2",
        clientName: "Marcus Johnson",
        avatar: "https://i.pravatar.cc/150?u=marcus",
        lastMessage: "Can we reschedule tomorrow's session?",
        timestamp: "Jan 9",
        unreadCount: 0,
        isOnline: false
    },
    {
        id: "conv-3",
        clientId: "3",
        clientName: "Emily Chen",
        avatar: "https://i.pravatar.cc/150?u=emily",
        lastMessage: "I'm feeling much stronger this week.",
        timestamp: "Jan 8",
        unreadCount: 1,
        isOnline: true
    }
];

export const MESSAGES = {
    "conv-1": [
        {
            id: "m-1",
            sender: "client",
            text: "Hi! I wanted to check in about the new workout plan.",
            timestamp: "10:30 AM",
            type: "text"
        },
        {
            id: "m-2",
            sender: "trainer",
            text: "Hey! Great timing. I just finished creating your new program. I'll assign it to you today.",
            timestamp: "10:32 AM",
            type: "text"
        },
        {
            id: "m-3",
            sender: "client",
            text: "Thanks for the new workout plan!",
            timestamp: "Jan 9",
            type: "text"
        }
    ],
    "conv-2": [
        {
            id: "m-1",
            sender: "client",
            text: "Hey, something came up. Can we reschedule tomorrow's session?",
            timestamp: "Jan 9",
            type: "text"
        }
    ],
    "conv-3": [
        {
            id: "m-1",
            sender: "client",
            text: "I'm feeling much stronger this week. The deadlifts are getting easier.",
            timestamp: "Jan 8",
            type: "text"
        }
    ]
};

export const SUPER_ADMIN_SIDEBAR_ITEMS = [
    { label: "Dashboard", href: "/super-admin", icon: Activity },
    { label: "Gyms", href: "/super-admin/gyms", icon: Dumbbell },
    { label: "Users", href: "/super-admin/users", icon: Users },
    { label: "Billing & Revenue", href: "/super-admin/billing", icon: TrendingUp },
    { label: "Analytics", href: "/super-admin/analytics", icon: Activity },
    { label: "Marketplace Oversight", href: "/super-admin/marketplace", icon: Star },
    { label: "Push Notifications", href: "/super-admin/notifications", icon: MessageSquare },
    { label: "Support & Ops", href: "/super-admin/support", icon: Settings },
    { label: "Settings", href: "/super-admin/settings", icon: Settings }
];

// Classes Schedule Data
export const CLASSES = [
    {
        id: "c-1",
        title: "Morning Yoga",
        instructor: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?u=sarahj" },
        date: "2026-01-14", // Wednesday
        startTime: "08:00",
        endTime: "09:00",
        enrolled: 12,
        capacity: 15,
        status: "Open", // Open, Full, Canceled, Completed
        credits: 1,
        description: "Start your day with a peaceful yoga session focusing on flexibility and mindfulness.",
        isVirtual: false,
        attendees: [
            { id: "1", name: "John Smith", avatar: "https://i.pravatar.cc/150?u=john" },
            { id: "7", name: "Emily Taylor", avatar: "https://i.pravatar.cc/150?u=emilyt" }
        ]
    },
    {
        id: "c-2",
        title: "HIIT Training",
        instructor: { name: "Mike Chen", avatar: "https://i.pravatar.cc/150?u=mike" },
        date: "2026-01-14", // Wednesday
        startTime: "09:00",
        endTime: "10:00",
        enrolled: 20,
        capacity: 20,
        status: "Full",
        credits: 1,
        description: "High Intensity Interval Training to boost your metabolism and burn calories fast.",
        isVirtual: false,
        attendees: []
    },
    {
        id: "c-3",
        title: "Spin Class",
        instructor: { name: "Emma Davis", avatar: "https://i.pravatar.cc/150?u=emma" },
        date: "2026-01-14", // Wednesday
        startTime: "12:00",
        endTime: "13:00",
        enrolled: 18,
        capacity: 25,
        status: "Open",
        credits: 1,
        description: "Indoor cycling workout that focuses on endurance, strength, intervals, high intensity (race days) and recovery.",
        isVirtual: false,
        attendees: []
    },
    {
        id: "c-4",
        title: "Evening Pilates",
        instructor: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?u=sarahj" },
        date: "2026-01-14", // Wednesday
        startTime: "18:00",
        endTime: "19:00",
        enrolled: 14,
        capacity: 15,
        status: "Open",
        credits: 1,
        description: "Mat-based Pilates class to improve core strength, flexibility, and posture.",
        isVirtual: false,
        attendees: []
    },
    {
        id: "c-5",
        title: "CrossFit",
        instructor: { name: "James Wilson", avatar: "https://i.pravatar.cc/150?u=james" },
        date: "2026-01-15", // Thursday
        startTime: "07:00",
        endTime: "08:00",
        enrolled: 16,
        capacity: 20,
        status: "Open",
        credits: 1,
        description: "Functional fitness program converting a wide variety of high-intensity functional movements.",
        isVirtual: false,
        attendees: []
    },
    {
        id: "c-6",
        title: "Virtual Power Yoga",
        instructor: { name: "Sarah Johnson", avatar: "https://i.pravatar.cc/150?u=sarahj" },
        date: "2026-01-16", // Friday
        startTime: "10:00",
        endTime: "11:00",
        enrolled: 45,
        capacity: 100,
        status: "Open",
        credits: 1,
        description: "Join us from home for a powerful vinyasa flow.",
        isVirtual: true,
        zoomUrl: "https://zoom.us/j/123456789",
        attendees: []
    }
];
