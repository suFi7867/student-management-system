"use client"

import { Suspense, useState } from "react"
import { useRouter, useSearchParams } from "next/navigation"
import Link from "next/link"
import { GraduationCap, Lock, Eye, EyeOff, CheckCircle2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { updatePassword } from "@/app/auth/actions"

export const dynamic = "force-dynamic"

function ResetPasswordContent() {
    const router = useRouter()
    const searchParams = useSearchParams()
    const [isLoading, setIsLoading] = useState(false)
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [success, setSuccess] = useState(false)
    const [error, setError] = useState<string | null>(null)

    const passwordRequirements = [
        { label: "At least 8 characters", test: (p: string) => p.length >= 8 },
        { label: "Contains uppercase letter", test: (p: string) => /[A-Z]/.test(p) },
        { label: "Contains lowercase letter", test: (p: string) => /[a-z]/.test(p) },
        { label: "Contains a number", test: (p: string) => /[0-9]/.test(p) },
    ]

    const [password, setPassword] = useState("")

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)

        const password = formData.get("password") as string
        const confirmPassword = formData.get("confirmPassword") as string

        if (password !== confirmPassword) {
            setError("Passwords do not match")
            setIsLoading(false)
            return
        }

        if (password.length < 8) {
            setError("Password must be at least 8 characters")
            setIsLoading(false)
            return
        }

        const result = await updatePassword(formData)

        if (result.error) {
            setError(result.error)
        } else {
            setSuccess(true)
            setTimeout(() => {
                router.push("/auth/login?message=Password updated successfully")
            }, 2000)
        }

        setIsLoading(false)
    }

    if (success) {
        return (
            <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
                <Card className="w-full max-w-md text-center">
                    <CardContent className="p-8">
                        <div className="w-16 h-16 bg-emerald-100 dark:bg-emerald-900/30 rounded-full flex items-center justify-center mx-auto mb-4">
                            <CheckCircle2 className="w-8 h-8 text-emerald-500" />
                        </div>
                        <h2 className="text-2xl font-bold mb-2">Password Updated!</h2>
                        <p className="text-muted-foreground mb-4">
                            Your password has been successfully updated. Redirecting to login...
                        </p>
                    </CardContent>
                </Card>
            </div>
        )
    }

    return (
        <div className="min-h-screen flex items-center justify-center p-4 bg-muted/30">
            <div className="w-full max-w-md space-y-6 animate-fadeIn">
                {/* Logo */}
                <div className="text-center">
                    <Link href="/" className="inline-flex items-center gap-2">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <span className="text-2xl font-bold">OSMS</span>
                    </Link>
                </div>

                {/* Reset Form */}
                <Card>
                    <CardHeader className="text-center">
                        <CardTitle className="text-2xl">Set New Password</CardTitle>
                        <CardDescription>
                            Create a strong password for your account
                        </CardDescription>
                    </CardHeader>
                    <CardContent>
                        {error && (
                            <div className="mb-4 p-3 rounded-lg bg-destructive/10 text-destructive text-sm">
                                {error}
                            </div>
                        )}

                        <form action={handleSubmit} className="space-y-4">
                            <div className="space-y-2">
                                <Label htmlFor="password" required>
                                    New Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="password"
                                        name="password"
                                        type={showPassword ? "text" : "password"}
                                        placeholder="Enter new password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        icon={<Lock className="h-4 w-4" />}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            {/* Password Requirements */}
                            <div className="space-y-2">
                                {passwordRequirements.map((req) => (
                                    <div key={req.label} className="flex items-center gap-2 text-sm">
                                        <CheckCircle2
                                            className={`w-4 h-4 ${req.test(password) ? "text-emerald-500" : "text-muted-foreground"
                                                }`}
                                        />
                                        <span className={req.test(password) ? "text-foreground" : "text-muted-foreground"}>
                                            {req.label}
                                        </span>
                                    </div>
                                ))}
                            </div>

                            <div className="space-y-2">
                                <Label htmlFor="confirmPassword" required>
                                    Confirm Password
                                </Label>
                                <div className="relative">
                                    <Input
                                        id="confirmPassword"
                                        name="confirmPassword"
                                        type={showConfirmPassword ? "text" : "password"}
                                        placeholder="Confirm new password"
                                        icon={<Lock className="h-4 w-4" />}
                                        required
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                                    >
                                        {showConfirmPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                                    </button>
                                </div>
                            </div>

                            <Button type="submit" className="w-full" loading={isLoading}>
                                Update Password
                            </Button>
                        </form>
                    </CardContent>
                </Card>

                <p className="text-center text-sm text-muted-foreground">
                    Remember your password?{" "}
                    <Link href="/auth/login" className="text-primary hover:underline font-medium">
                        Sign in
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default function ResetPasswordPage() {
    return (
        <Suspense fallback={<div className="min-h-screen flex items-center justify-center">Loading...</div>}>
            <ResetPasswordContent />
        </Suspense>
    )
}
