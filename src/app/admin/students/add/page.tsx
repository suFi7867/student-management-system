"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import {
    ArrowLeft,
    User,
    Mail,
    Phone,
    Building2,
    Calendar,
    MapPin,
    Users,
    Save,
    Loader2,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { createStudent } from "../../actions"

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

export default function AddStudentPage() {
    const router = useRouter()
    const [isLoading, setIsLoading] = useState(false)
    const [error, setError] = useState<string | null>(null)
    const [success, setSuccess] = useState<string | null>(null)

    async function handleSubmit(formData: FormData) {
        setIsLoading(true)
        setError(null)
        setSuccess(null)

        const result = await createStudent(formData)

        if (result.error) {
            setError(result.error)
        } else if (result.success) {
            setSuccess(`Student created successfully! Enrollment Number: ${result.enrollmentNumber}`)
            setTimeout(() => {
                router.push("/admin/students")
            }, 2000)
        }

        setIsLoading(false)
    }

    return (
        <div className="space-y-6 animate-fadeIn max-w-4xl">
            {/* Page Header */}
            <div className="flex items-center gap-4">
                <Link href="/admin/students">
                    <Button variant="ghost" size="icon">
                        <ArrowLeft className="h-5 w-5" />
                    </Button>
                </Link>
                <div>
                    <h1 className="text-2xl font-bold">Add New Student</h1>
                    <p className="text-muted-foreground">Create a new student record in the system</p>
                </div>
            </div>

            {/* Messages */}
            {success && (
                <div className="p-4 rounded-lg bg-emerald-100 dark:bg-emerald-900/30 text-emerald-800 dark:text-emerald-400">
                    {success}
                </div>
            )}
            {error && (
                <div className="p-4 rounded-lg bg-destructive/10 text-destructive">
                    {error}
                </div>
            )}

            <form action={handleSubmit} className="space-y-6">
                {/* Account Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <User className="h-5 w-5" />
                            Account Information
                        </CardTitle>
                        <CardDescription>Login credentials for the student</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="email" required>Email Address</Label>
                            <Input
                                id="email"
                                name="email"
                                type="email"
                                placeholder="student@university.edu"
                                icon={<Mail className="h-4 w-4" />}
                                required
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="password" required>Password</Label>
                            <Input
                                id="password"
                                name="password"
                                type="password"
                                placeholder="Minimum 8 characters"
                                required
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Personal Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Personal Information
                        </CardTitle>
                        <CardDescription>Basic details of the student</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
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
                        <div className="space-y-2">
                            <Label htmlFor="dateOfBirth">Date of Birth</Label>
                            <Input
                                id="dateOfBirth"
                                name="dateOfBirth"
                                type="date"
                            />
                        </div>
                        <div className="space-y-2 md:col-span-2">
                            <Label htmlFor="address">Address</Label>
                            <Input
                                id="address"
                                name="address"
                                type="text"
                                placeholder="123 Main St, City, State - 123456"
                                icon={<MapPin className="h-4 w-4" />}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Academic Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Building2 className="h-5 w-5" />
                            Academic Information
                        </CardTitle>
                        <CardDescription>Course and enrollment details</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
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
                        <div className="space-y-2">
                            <Label required>Year</Label>
                            <Select name="year" defaultValue="1">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select year" />
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
                                    <SelectValue placeholder="Select semester" />
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
                        <div className="space-y-2">
                            <Label htmlFor="section">Section</Label>
                            <Select name="section">
                                <SelectTrigger>
                                    <SelectValue placeholder="Select section" />
                                </SelectTrigger>
                                <SelectContent>
                                    <SelectItem value="A">Section A</SelectItem>
                                    <SelectItem value="B">Section B</SelectItem>
                                    <SelectItem value="C">Section C</SelectItem>
                                    <SelectItem value="D">Section D</SelectItem>
                                </SelectContent>
                            </Select>
                        </div>
                    </CardContent>
                </Card>

                {/* Guardian Information */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Users className="h-5 w-5" />
                            Guardian Information
                        </CardTitle>
                        <CardDescription>Parent or guardian contact details</CardDescription>
                    </CardHeader>
                    <CardContent className="grid gap-4 md:grid-cols-2">
                        <div className="space-y-2">
                            <Label htmlFor="guardianName">Guardian Name</Label>
                            <Input
                                id="guardianName"
                                name="guardianName"
                                type="text"
                                placeholder="Parent/Guardian Name"
                                icon={<User className="h-4 w-4" />}
                            />
                        </div>
                        <div className="space-y-2">
                            <Label htmlFor="guardianPhone">Guardian Phone</Label>
                            <Input
                                id="guardianPhone"
                                name="guardianPhone"
                                type="tel"
                                placeholder="+91 98765 43210"
                                icon={<Phone className="h-4 w-4" />}
                            />
                        </div>
                    </CardContent>
                </Card>

                {/* Actions */}
                <div className="flex items-center gap-4">
                    <Button type="submit" loading={isLoading}>
                        <Save className="h-4 w-4 mr-2" />
                        Create Student
                    </Button>
                    <Link href="/admin/students">
                        <Button type="button" variant="outline">
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </div>
    )
}
