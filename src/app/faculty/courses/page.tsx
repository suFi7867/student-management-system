"use client"

import { useState } from "react"
import Link from "next/link"
import {
    BookOpen,
    Users,
    ClipboardCheck,
    Award,
    FileText,
    Plus,
    ChevronRight,
    Clock,
    Calendar,
    BarChart3,
    Eye,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface FacultyCourse {
    id: string
    code: string
    name: string
    department: string
    semester: number
    credits: number
    enrolled: number
    maxStudents: number
    schedule: string
    room: string
    avgAttendance: number
    avgGrade: number
    pendingAssignments: number
    status: "active" | "completed"
}

export default function FacultyCoursesPage() {
    const courses: FacultyCourse[] = [
        {
            id: "1",
            code: "CS301",
            name: "Data Structures",
            department: "Computer Science",
            semester: 5,
            credits: 4,
            enrolled: 45,
            maxStudents: 60,
            schedule: "Mon, Wed 9:00 AM - 10:00 AM",
            room: "LH-01",
            avgAttendance: 92,
            avgGrade: 78,
            pendingAssignments: 5,
            status: "active",
        },
        {
            id: "2",
            code: "CS302",
            name: "Algorithms",
            department: "Computer Science",
            semester: 5,
            credits: 4,
            enrolled: 38,
            maxStudents: 60,
            schedule: "Tue, Thu 11:00 AM - 12:00 PM",
            room: "LH-03",
            avgAttendance: 88,
            avgGrade: 72,
            pendingAssignments: 12,
            status: "active",
        },
        {
            id: "3",
            code: "CS401",
            name: "Machine Learning",
            department: "Computer Science",
            semester: 7,
            credits: 3,
            enrolled: 30,
            maxStudents: 40,
            schedule: "Mon, Fri 2:00 PM - 3:30 PM",
            room: "Lab-02",
            avgAttendance: 95,
            avgGrade: 81,
            pendingAssignments: 3,
            status: "active",
        },
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Courses</h1>
                    <p className="text-muted-foreground">Manage your assigned courses and students</p>
                </div>
                <Button>
                    <Plus className="w-4 h-4 mr-2" />
                    Create Assignment
                </Button>
            </div>

            {/* Summary Stats */}
            <div className="grid sm:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-sky-500/10">
                            <BookOpen className="w-5 h-5 text-sky-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{courses.length}</p>
                            <p className="text-sm text-muted-foreground">Courses</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.enrolled, 0)}</p>
                            <p className="text-sm text-muted-foreground">Students</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <FileText className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.pendingAssignments, 0)}</p>
                            <p className="text-sm text-muted-foreground">Pending Reviews</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <BarChart3 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">
                                {Math.round(courses.reduce((sum, c) => sum + c.avgAttendance, 0) / courses.length)}%
                            </p>
                            <p className="text-sm text-muted-foreground">Avg Attendance</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Course Cards */}
            <div className="grid lg:grid-cols-2 gap-6">
                {courses.map((course) => (
                    <Card key={course.id} hover className="overflow-hidden">
                        <CardHeader className="pb-2">
                            <div className="flex items-start justify-between">
                                <div>
                                    <div className="flex items-center gap-2 mb-1">
                                        <Badge variant="outline" className="font-mono">{course.code}</Badge>
                                        <Badge variant="success">{course.status}</Badge>
                                    </div>
                                    <CardTitle>{course.name}</CardTitle>
                                    <CardDescription className="flex items-center gap-4 mt-1">
                                        <span className="flex items-center gap-1">
                                            <Users className="w-3.5 h-3.5" />
                                            {course.enrolled}/{course.maxStudents}
                                        </span>
                                        <span className="flex items-center gap-1">
                                            <BookOpen className="w-3.5 h-3.5" />
                                            {course.credits} Credits
                                        </span>
                                    </CardDescription>
                                </div>
                            </div>
                        </CardHeader>

                        <CardContent className="space-y-4">
                            {/* Schedule Info */}
                            <div className="flex flex-wrap gap-4 text-sm">
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Clock className="w-4 h-4" />
                                    {course.schedule}
                                </div>
                                <div className="flex items-center gap-2 text-muted-foreground">
                                    <Calendar className="w-4 h-4" />
                                    Room: {course.room}
                                </div>
                            </div>

                            {/* Stats */}
                            <div className="grid grid-cols-3 gap-2 p-3 rounded-lg bg-muted/50">
                                <div className="text-center">
                                    <p className={`text-lg font-bold ${course.avgAttendance >= 75 ? "text-emerald-500" : "text-amber-500"}`}>
                                        {course.avgAttendance}%
                                    </p>
                                    <p className="text-xs text-muted-foreground">Attendance</p>
                                </div>
                                <div className="text-center border-x">
                                    <p className="text-lg font-bold">{course.avgGrade}%</p>
                                    <p className="text-xs text-muted-foreground">Avg Grade</p>
                                </div>
                                <div className="text-center">
                                    <p className={`text-lg font-bold ${course.pendingAssignments > 10 ? "text-destructive" : ""}`}>
                                        {course.pendingAssignments}
                                    </p>
                                    <p className="text-xs text-muted-foreground">To Review</p>
                                </div>
                            </div>

                            {/* Quick Actions */}
                            <div className="grid grid-cols-4 gap-2">
                                <Link href={`/faculty/attendance?course=${course.id}`}>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <ClipboardCheck className="w-4 h-4" />
                                        <span className="sr-only sm:not-sr-only sm:ml-2">Attendance</span>
                                    </Button>
                                </Link>
                                <Link href={`/faculty/grades?course=${course.id}`}>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Award className="w-4 h-4" />
                                        <span className="sr-only sm:not-sr-only sm:ml-2">Grades</span>
                                    </Button>
                                </Link>
                                <Link href={`/faculty/students?course=${course.id}`}>
                                    <Button variant="outline" size="sm" className="w-full">
                                        <Users className="w-4 h-4" />
                                        <span className="sr-only sm:not-sr-only sm:ml-2">Students</span>
                                    </Button>
                                </Link>
                                <Button variant="outline" size="sm" className="w-full">
                                    <Eye className="w-4 h-4" />
                                    <span className="sr-only sm:not-sr-only sm:ml-2">View</span>
                                </Button>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>
        </div>
    )
}
