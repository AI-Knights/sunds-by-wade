import { SignInForm } from "@/components/auth/sign-in-form";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "Sign In | Sounds by Wade",
    description: "Login to your dashboard",
};

export default function SignInPage({ params }: { params: { role?: string } }) {
    return (
        <SignInForm />
    );
}
