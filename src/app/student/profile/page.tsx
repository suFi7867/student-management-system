"use client"

import { useState } from "react"
import {
    User,
    Mail,
    Phone,
    MapPin,
    Calendar,
    Building2,
    GraduationCap,
    Edit,
    Camera,
    Save,
    BookOpen,
    Award,
    ClipboardCheck,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

export default function StudentProfilePage() {
    const [isEditing, setIsEditing] = useState(false)
    const [isLoading, setIsLoading] = useState(false)

    // Dummy student data
    const student = {
        name: "Priya Sharma",
        email: "priya.sharma@university.edu",
        phone: "+91 98765 43210",
        enrollmentNo: "UU2024001",
        department: "Computer Science & Engineering",
        year: 3,
        semester: 5,
        section: "A",
        dateOfBirth: "2002-05-15",
        bloodGroup: "O+",
        address: "123 Main Street, Dehradun, Uttarakhand - 248001",
        guardianName: "Rajesh Sharma",
        guardianPhone: "+91 98765 12345",
        admissionDate: "2022-08-01",
        status: "active",
        avatar: null,
        cgpa: 8.5,
        attendance: 90,
        completedCredits: 110,
        totalCredits: 160,
    }

    const handleSave = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        setIsEditing(false)
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Profile</h1>
                    <p className="text-muted-foreground">View and manage your personal information</p>
                </div>
                {!isEditing ? (
                    <Button onClick={() => setIsEditing(true)}>
                        <Edit className="w-4 h-4 mr-2" />
                        Edit Profile
                    </Button>
                ) : (
                    <div className="flex gap-2">
                        <Button variant="outline" onClick={() => setIsEditing(false)}>
                            Cancel
                        </Button>
                        <Button onClick={handleSave} loading={isLoading}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Changes
                        </Button>
                    </div>
                )}
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Profile Card */}
                <Card className="lg:row-span-2">
                    <CardContent className="p-6 flex flex-col items-center text-center">
                        <div className="relative mb-4">
                            <Avatar className="h-32 w-32">
                                <AvatarImage src={student.avatar || undefined} />
                                <AvatarFallback className="text-3xl">{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            {isEditing && (
                                <button className="absolute bottom-0 right-0 p-2 bg-primary text-white rounded-full shadow-lg hover:bg-primary/90 transition-colors">
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                        </div>
                        <h2 className="text-xl font-bold">{student.name}</h2>
                        <p className="text-muted-foreground font-mono">{student.enrollmentNo}</p>
                        <Badge variant="success" className="mt-2 capitalize">{student.status}</Badge>

                        <div className="w-full mt-6 space-y-3 text-left">
                            <div className="flex items-center gap-3 text-sm">
                                <Mail className="w-4 h-4 text-muted-foreground" />
                                <span className="truncate">{student.email}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Phone className="w-4 h-4 text-muted-foreground" />
                                <span>{student.phone}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <Building2 className="w-4 h-4 text-muted-foreground" />
                                <span>{student.department}</span>
                            </div>
                            <div className="flex items-center gap-3 text-sm">
                                <GraduationCap className="w-4 h-4 text-muted-foreground" />
                                <span>Year {student.year}, Semester {student.semester}</span>
                            </div>
                        </div>

                        {/* Quick Stats */}
                        <div className="w-full grid grid-cols-3 gap-2 mt-6 pt-6 border-t">
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                                <Award className="w-5 h-5 mx-auto mb-1 text-amber-500" />
                                <p className="text-lg font-bold">{student.cgpa}</p>
                                <p className="text-xs text-muted-foreground">CGPA</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                                <ClipboardCheck className="w-5 h-5 mx-auto mb-1 text-emerald-500" />
                                <p className="text-lg font-bold">{student.attendance}%</p>
                                <p className="text-xs text-muted-foreground">Attendance</p>
                            </div>
                            <div className="text-center p-2 rounded-lg bg-muted/50">
                                <BookOpen className="w-5 h-5 mx-auto mb-1 text-sky-500" />
                                <p className="text-lg font-bold">{student.completedCredits}</p>
                                <p className="text-xs text-muted-foreground">Credits</p>
                            </div>
                        </div>
                    </CardContent>
                </Card>

                {/* Details Section */}
                <div className="lg:col-span-2 space-y-6">
                    <Tabs defaultValue="personal" className="space-y-6">
                        <TabsList>
                            <TabsTrigger value="personal">Personal Info</TabsTrigger>
                            <TabsTrigger value="academic">Academic Info</TabsTrigger>
                            <TabsTrigger value="guardian">Guardian Info</TabsTrigger>
                        </TabsList>

                        {/* Personal Information */}
                        <TabsContent value="personal">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Personal Information</CardTitle>
                                    <CardDescription>Your personal details and contact information</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Full Name</Label>
                                        <Input
                                            value={student.name}
                                            disabled={!isEditing}
                                            icon={<User className="h-4 w-4" />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Email Address</Label>
                                        <Input
                                            value={student.email}
                                            disabled
                                            icon={<Mail className="h-4 w-4" />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Phone Number</Label>
                                        <Input
                                            value={student.phone}
                                            disabled={!isEditing}
                                            icon={<Phone className="h-4 w-4" />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Date of Birth</Label>
                                        <Input
                                            type="date"
                                            value={student.dateOfBirth}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Blood Group</Label>
                                        <Input
                                            value={student.bloodGroup}
                                            disabled={!isEditing}
                                        />
                                    </div>
                                    <div className="space-y-2 sm:col-span-2">
                                        <Label>Address</Label>
                                        <Input
                                            value={student.address}
                                            disabled={!isEditing}
                                            icon={<MapPin className="h-4 w-4" />}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Academic Information */}
                        <TabsContent value="academic">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Academic Information</CardTitle>
                                    <CardDescription>Your enrollment and academic details</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Enrollment Number</Label>
                                        <Input
                                            value={student.enrollmentNo}
                                            disabled
                                            icon={<GraduationCap className="h-4 w-4" />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Department</Label>
                                        <Input
                                            value={student.department}
                                            disabled
                                            icon={<Building2 className="h-4 w-4" />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Current Year</Label>
                                        <Input value={`Year ${student.year}`} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Current Semester</Label>
                                        <Input value={`Semester ${student.semester}`} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Section</Label>
                                        <Input value={`Section ${student.section}`} disabled />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Admission Date</Label>
                                        <Input
                                            type="date"
                                            value={student.admissionDate}
                                            disabled
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>

                        {/* Guardian Information */}
                        <TabsContent value="guardian">
                            <Card>
                                <CardHeader>
                                    <CardTitle>Guardian Information</CardTitle>
                                    <CardDescription>Parent or guardian contact details</CardDescription>
                                </CardHeader>
                                <CardContent className="grid gap-4 sm:grid-cols-2">
                                    <div className="space-y-2">
                                        <Label>Guardian Name</Label>
                                        <Input
                                            value={student.guardianName}
                                            disabled={!isEditing}
                                            icon={<User className="h-4 w-4" />}
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label>Guardian Phone</Label>
                                        <Input
                                            value={student.guardianPhone}
                                            disabled={!isEditing}
                                            icon={<Phone className="h-4 w-4" />}
                                        />
                                    </div>
                                </CardContent>
                            </Card>
                        </TabsContent>
                    </Tabs>
                </div>
            </div>
        </div>
    )
}
