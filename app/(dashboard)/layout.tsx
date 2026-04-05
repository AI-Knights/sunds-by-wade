import { Sidebar } from "@/components/layout/sidebar";

export default function DashboardLayout({
    children,
}: {
    children: React.ReactNode;
}) {
    return (
        <div className="min-h-screen bg-white dark:bg-background flex font-sans selection:bg-blue-500/30 transition-colors duration-300">
            {/* Sidebar - Desktop */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-1 md:ml-64 relative min-h-screen flex flex-col bg-gray-50 dark:bg-zinc-950/50 transition-colors duration-300">
                {/* Background Mesh (Optional separate layer for dashboard) */}

                <div className="flex-1 p-6 md:p-8 overflow-y-auto">
                    {children}
                </div>
            </main>
        </div>
    );
}
