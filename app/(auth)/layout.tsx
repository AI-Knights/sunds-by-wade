import { ReactNode } from "react";
import Image from "next/image";

export default function AuthLayout({ children }: { children: ReactNode }) {

    return (
        <div className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black selection:bg-purple-500/30">

            {/* Animated Background Mesh */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-0 -left-4 w-72 h-72 bg-purple-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob" />
                <div className="absolute top-0 -right-4 w-72 h-72 bg-indigo-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-2000" />
                <div className="absolute -bottom-8 left-20 w-72 h-72 bg-pink-500 rounded-full mix-blend-multiply filter blur-xl opacity-20 animate-blob animation-delay-4000" />
                <div className="absolute inset-0 bg-[url('/grid.svg')] opacity-[0.05] z-10" />
            </div>

            <div className="relative z-10 w-full px-4">
                {children}
            </div>
        </div>
    );
}
