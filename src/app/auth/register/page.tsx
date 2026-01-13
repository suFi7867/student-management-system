"use client"

import { useState } from "react"
import Link from "next/link"
import { Mail, Lock, Eye, EyeOff, User, Phone, GraduationCap, Building2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { signUp } from "../actions"

const DEPARTMENTS = [
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Information Technology",
    "Business Administration",
    "Commerce",
    "Law",
    "Pharmacy",
    "Agriculture",
]

export default function RegisterPage() {
    const [showPassword, setShowPassword] = useState(false)
    const [showConfirmPassword, setShowConfirmPassword] = useState(false)
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)
    const [role, setRole] = useState<string>("student")
    const [agreed, setAgreed] = useState(false)

    async function handleSubmit(formData: FormData) {
        if (!agreed) {
            setError("You must agree to the terms and conditions")
            return
        }

        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const result = await signUp(formData)

        if (result?.error) {
            setError(result.error)
        } else if (result?.success) {
            setSuccess(result.success)
        }

        setIsLoading(false)
    }

    return (
        <div className="min-h-screen flex">
            {/* Left Panel - Branding (reversed from login for variety) */}
            <div className="flex-1 flex items-center justify-center p-6 bg-background order-2 lg:order-1">
                <div className="w-full max-w-lg">
                    {/* Mobile Logo */}
                    <div className="flex items-center gap-3 mb-8 lg:hidden">
                        <div className="w-12 h-12 bg-primary rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-7 h-7 text-white" />
                        </div>
                        <div>
                            <h1 className="text-xl font-bold text-foreground">OSMS</h1>
                            <p className="text-xs text-muted-foreground">Uttaranchal University</p>
                        </div>
                    </div>

                    <Card className="border-0 shadow-xl">
                        <CardHeader className="space-y-1 pb-4">
                            <CardTitle className="text-2xl font-bold">Create Account</CardTitle>
                            <CardDescription>
                                Fill in your details to register for the system
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
                                {/* Role Selection */}
                                <div className="space-y-2">
                                    <Label required>I am a</Label>
                                    <Select name="role" defaultValue="student" onValueChange={setRole}>
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select your role" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="admin">Administrator (Dev)</SelectItem>
                                            <SelectItem value="student">Student</SelectItem>
                                            <SelectItem value="faculty">Faculty</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Full Name */}
                                <div className="space-y-2">
                                    <Label htmlFor="fullName" required>Full Name</Label>
                                    <Input
                                        id="fullName"
                                        name="fullName"
                                        type="text"
                                        placeholder="John Doe"
                                        icon={<User className="h-4 w-4" />}
                                        required
                                    />
                                </div>

                                {/* Email */}
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

                                {/* Phone */}
                                <div className="space-y-2">
                                    <Label htmlFor="phone">Phone Number</Label>
                                    <Input
                                        id="phone"
                                        name="phone"
                                        type="tel"
                                        placeholder="+91 98765 43210"
                                        icon={<Phone className="h-4 w-4" />}
                                    />
                                </div>

                                {/* Department */}
                                <div className="space-y-2">
                                    <Label required>Department</Label>
                                    <Select name="department" defaultValue="Computer Science">
                                        <SelectTrigger>
                                            <SelectValue placeholder="Select department" />
                                        </SelectTrigger>
                                        <SelectContent>
                                            {DEPARTMENTS.map((dept) => (
                                                <SelectItem key={dept} value={dept}>
                                                    {dept}
                                                </SelectItem>
                                            ))}
                                        </SelectContent>
                                    </Select>
                                </div>

                                {/* Student-specific fields */}
                                {role === "student" && (
                                    <div className="grid grid-cols-2 gap-4">
                                        <div className="space-y-2">
                                            <Label required>Year</Label>
                                            <Select name="year" defaultValue="1">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Year" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    <SelectItem value="1">1st Year</SelectItem>
                                                    <SelectItem value="2">2nd Year</SelectItem>
                                                    <SelectItem value="3">3rd Year</SelectItem>
                                                    <SelectItem value="4">4th Year</SelectItem>
                                                </SelectContent>
                                            </Select>
                                        </div>
                                        <div className="space-y-2">
                                            <Label required>Semester</Label>
                                            <Select name="semester" defaultValue="1">
                                                <SelectTrigger>
                                                    <SelectValue placeholder="Semester" />
                                                </SelectTrigger>
                                                <SelectContent>
                                                    {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                                        <SelectItem key={sem} value={sem.toString()}>
                                                            Semester {sem}
                                                        </SelectItem>
                                                    ))}
                                                </SelectContent>
                                            </Select>
                                        </div>
                                    </div>
                                )}

                                {/* Faculty-specific fields */}
                                {role === "faculty" && (
                                    <div className="space-y-2">
                                        <Label>Designation</Label>
                                        <Select name="designation" defaultValue="Assistant Professor">
                                            <SelectTrigger>
                                                <SelectValue placeholder="Select designation" />
                                            </SelectTrigger>
                                            <SelectContent>
                                                <SelectItem value="Assistant Professor">Assistant Professor</SelectItem>
                                                <SelectItem value="Associate Professor">Associate Professor</SelectItem>
                                                <SelectItem value="Professor">Professor</SelectItem>
                                                <SelectItem value="Lecturer">Lecturer</SelectItem>
                                                <SelectItem value="Head of Department">Head of Department</SelectItem>
                                            </SelectContent>
                                        </Select>
                                    </div>
                                )}

                                {/* Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="password" required>Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="password"
                                            name="password"
                                            type={showPassword ? "text" : "password"}
                                            placeholder="Min. 8 characters"
                                            icon={<Lock className="h-4 w-4" />}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowPassword(!showPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Confirm Password */}
                                <div className="space-y-2">
                                    <Label htmlFor="confirmPassword" required>Confirm Password</Label>
                                    <div className="relative">
                                        <Input
                                            id="confirmPassword"
                                            name="confirmPassword"
                                            type={showConfirmPassword ? "text" : "password"}
                                            placeholder="Confirm your password"
                                            icon={<Lock className="h-4 w-4" />}
                                            required
                                        />
                                        <button
                                            type="button"
                                            onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                                        >
                                            {showConfirmPassword ? (
                                                <EyeOff className="h-4 w-4" />
                                            ) : (
                                                <Eye className="h-4 w-4" />
                                            )}
                                        </button>
                                    </div>
                                </div>

                                {/* Terms */}
                                <div className="flex items-start space-x-2">
                                    <Checkbox
                                        id="terms"
                                        checked={agreed}
                                        onCheckedChange={(checked) => setAgreed(checked as boolean)}
                                    />
                                    <label
                                        htmlFor="terms"
                                        className="text-sm leading-relaxed text-muted-foreground"
                                    >
                                        I agree to the{" "}
                                        <Link href="/terms" className="text-primary hover:underline">
                                            Terms of Service
                                        </Link>{" "}
                                        and{" "}
                                        <Link href="/privacy" className="text-primary hover:underline">
                                            Privacy Policy
                                        </Link>
                                    </label>
                                </div>

                                <Button type="submit" className="w-full" size="lg" loading={isLoading}>
                                    Create Account
                                </Button>
                            </form>

                            {/* Login Link */}
                            <p className="text-center text-sm text-muted-foreground mt-6">
                                Already have an account?{" "}
                                <Link href="/auth/login" className="text-primary font-medium hover:underline">
                                    Sign in
                                </Link>
                            </p>
                        </CardContent>
                    </Card>

                    {/* Footer */}
                    <p className="text-center text-xs text-muted-foreground mt-6">
                        © 2024 Uttaranchal University. All rights reserved.
                    </p>
                </div>
            </div>

            {/* Right Panel - Branding */}
            <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-sky-600 via-primary/90 to-primary relative overflow-hidden order-1 lg:order-2">
                {/* Background Pattern */}
                <div className="absolute inset-0 opacity-10">
                    <div className="absolute top-20 right-20 w-72 h-72 bg-white rounded-full blur-3xl" />
                    <div className="absolute bottom-20 left-20 w-96 h-96 bg-white rounded-full blur-3xl" />
                </div>

                {/* Content */}
                <div className="relative z-10 flex flex-col justify-center items-center text-white p-12 w-full">
                    <div className="flex items-center gap-3 mb-8">
                        <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center">
                            <GraduationCap className="w-10 h-10" />
                        </div>
                        <div>
                            <h1 className="text-2xl font-bold">OSMS</h1>
                            <p className="text-sm text-white/80">Uttaranchal University</p>
                        </div>
                    </div>

                    <h2 className="text-4xl font-bold text-center mb-4">
                        Join Our Academic Community
                    </h2>
                    <p className="text-lg text-white/80 text-center max-w-md mb-12">
                        Register to access your personalized dashboard, track attendance, view grades, and stay connected.
                    </p>

                    {/* Benefits */}
                    <div className="space-y-4 w-full max-w-md">
                        {[
                            "Access course materials anytime, anywhere",
                            "Track your attendance and academic progress",
                            "Communicate directly with faculty",
                            "Receive real-time notifications",
                            "Submit assignments digitally",
                        ].map((benefit, i) => (
                            <div key={i} className="flex items-center gap-3">
                                <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-sm font-bold">
                                    ✓
                                </div>
                                <p className="text-white/90">{benefit}</p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    )
}
