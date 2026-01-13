"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { resetPassword } from "../actions"

export default function ForgotPasswordPage() {
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const result = await resetPassword(formData)

        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccess(result.success)
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-muted via-background to-muted p-6">
            <div className="w-full max-w-md">
                {/* Logo */}
                <div className="flex items-center justify-center gap-3 mb-8">
                    <div className="w-14 h-14 bg-primary rounded-xl flex items-center justify-center">
                        <GraduationCap className="w-8 h-8 text-white" />
                    </div>
                    <div>
                        <h1 className="text-xl font-bold text-foreground">OSMS</h1>
                        <p className="text-xs text-muted-foreground">Uttaranchal University</p>
                    </div>
                </div>

                <Card className="border-0 shadow-xl">
                    <CardHeader className="space-y-1 pb-4">
                        <CardTitle className="text-2xl font-bold">Forgot Password?</CardTitle>
                        <CardDescription>
                            Enter your email and we&apos;ll send you a link to reset your password
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {/* Messages */}
                        {success && (
                            <div className="mb-4 p-3 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400 text-sm">
                                {success}
                            </div>
                        )}
                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="email" required>Email</Label>
                                <Input
                                    id="email"
                                    name="email"
                                    type="email"
                                    placeholder="your.email@university.edu"
                                    icon={<Mail className="h-4 w-4" />}
                                    required
                                />
                            </div>

                            <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                                Send Reset Link
                            </Button>
                        </form>

                        {/* Back to Login */}
                        <Link
                            href="/auth/login"
                            className="flex items-center justify-center gap-2 text-sm text-muted-foreground hover:text-foreground mt-6 transition-colors"
                        >
                            <ArrowLeft className="h-4 w-4" />
                            Back to Login
                        </Link>
                    </CardContent>
                </Card>

                {/* Footer */}
                <p className="text-center text-xs text-muted-foreground mt-6">
                    © 2024 Uttaranchal University. All rights reserved.
                </p>
            </div>
        </div>
    )
}
