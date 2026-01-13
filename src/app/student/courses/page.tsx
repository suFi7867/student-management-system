"use client"

import { useState } from "react"
import Link from "next/link"
import {
    BookOpen,
    Users,
    Calendar,
    Clock,
    FileText,
    PlayCircle,
    ChevronRight,
    Download,
    User,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Course {
    id: string
    code: string
    name: string
    description: string
    faculty: string
    credits: number
    semester: number
    schedule: string
    room: string
    progress: number
    status: "ongoing" | "upcoming" | "completed"
}

export default function StudentCoursesPage() {
    const [activeTab, setActiveTab] = useState("current")

    const courses: Course[] = [
        { id: "1", code: "CS301", name: "Data Structures", description: "Introduction to data structures and algorithms including arrays, linked lists, trees, and graphs.", faculty: "Dr. Rajesh Kumar", credits: 4, semester: 5, schedule: "Mon, Wed 9:00 AM", room: "LH-01", progress: 65, status: "ongoing" },
        { id: "2", code: "CS302", name: "Algorithms", description: "Analysis and design of algorithms, complexity theory, and problem-solving techniques.", faculty: "Dr. Priya Singh", credits: 4, semester: 5, schedule: "Tue, Thu 11:00 AM", room: "LH-03", progress: 58, status: "ongoing" },
        { id: "3", code: "CS303", name: "Database Systems", description: "Relational database design, SQL, normalization, and transaction management.", faculty: "Dr. Amit Patel", credits: 3, semester: 5, schedule: "Mon, Fri 2:00 PM", room: "Lab-02", progress: 72, status: "ongoing" },
        { id: "4", code: "CS304", name: "Computer Networks", description: "Network architectures, protocols, and security fundamentals.", faculty: "Dr. Sunita Sharma", credits: 3, semester: 5, schedule: "Wed, Fri 10:00 AM", room: "LH-05", progress: 45, status: "ongoing" },
    ]

    const completedCourses: Course[] = [
        { id: "5", code: "CS201", name: "Object-Oriented Programming", description: "OOP principles using Java", faculty: "Dr. Rahul Verma", credits: 4, semester: 3, schedule: "", room: "", progress: 100, status: "completed" },
        { id: "6", code: "CS202", name: "Discrete Mathematics", description: "Mathematical foundations of CS", faculty: "Dr. Neha Gupta", credits: 3, semester: 3, schedule: "", room: "", progress: 100, status: "completed" },
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Courses</h1>
                    <p className="text-muted-foreground">View enrolled courses and access learning materials</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Schedule
                    </Button>
                </div>
            </div>

            {/* Summary Cards */}
            <div className="grid sm:grid-cols-3 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-sky-500/10">
                            <BookOpen className="w-5 h-5 text-sky-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{courses.length}</p>
                            <p className="text-sm text-muted-foreground">Active Courses</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <FileText className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{courses.reduce((sum, c) => sum + c.credits, 0)}</p>
                            <p className="text-sm text-muted-foreground">Total Credits</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-purple-500/10">
                            <Users className="w-5 h-5 text-purple-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{courses.length}</p>
                            <p className="text-sm text-muted-foreground">Faculty</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="current" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="current">Current Semester</TabsTrigger>
                    <TabsTrigger value="completed">Completed</TabsTrigger>
                </TabsList>

                {/* Current Courses */}
                <TabsContent value="current" className="space-y-4">
                    {courses.map((course) => (
                        <Card key={course.id} hover className="overflow-hidden">
                            <div className="flex flex-col lg:flex-row">
                                <div className="flex-1 p-6">
                                    <div className="flex items-start justify-between mb-4">
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                <Badge variant="outline" className="font-mono">{course.code}</Badge>
                                                <Badge variant="info">{course.credits} Credits</Badge>
                                            </div>
                                            <h3 className="text-xl font-semibold">{course.name}</h3>
                                            <p className="text-muted-foreground mt-1">{course.description}</p>
                                        </div>
                                    </div>

                                    <div className="grid sm:grid-cols-3 gap-4 mt-4">
                                        <div className="flex items-center gap-2 text-sm">
                                            <User className="w-4 h-4 text-muted-foreground" />
                                            <span>{course.faculty}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Clock className="w-4 h-4 text-muted-foreground" />
                                            <span>{course.schedule}</span>
                                        </div>
                                        <div className="flex items-center gap-2 text-sm">
                                            <Calendar className="w-4 h-4 text-muted-foreground" />
                                            <span>Room: {course.room}</span>
                                        </div>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="mt-4">
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Course Progress</span>
                                            <span className="font-medium">{course.progress}%</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className="h-full bg-primary rounded-full transition-all duration-500"
                                                style={{ width: `${course.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Action Panel */}
                                <div className="lg:w-48 p-6 bg-muted/30 border-t lg:border-t-0 lg:border-l flex flex-row lg:flex-col gap-2 justify-center">
                                    <Button variant="default" size="sm" className="flex-1 lg:w-full">
                                        <PlayCircle className="w-4 h-4 mr-2" />
                                        Continue
                                    </Button>
                                    <Button variant="outline" size="sm" className="flex-1 lg:w-full">
                                        <Download className="w-4 h-4 mr-2" />
                                        Materials
                                    </Button>
                                </div>
                            </div>
                        </Card>
                    ))}
                </TabsContent>

                {/* Completed Courses */}
                <TabsContent value="completed" className="space-y-4">
                    <div className="grid sm:grid-cols-2 gap-4">
                        {completedCourses.map((course) => (
                            <Card key={course.id} hover>
                                <CardContent className="p-6">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline" className="font-mono">{course.code}</Badge>
                                        <Badge variant="success">Completed</Badge>
                                    </div>
                                    <h3 className="font-semibold mb-1">{course.name}</h3>
                                    <p className="text-sm text-muted-foreground mb-3">{course.description}</p>
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <User className="w-4 h-4" />
                                        <span>{course.faculty}</span>
                                    </div>
                                    <div className="flex items-center justify-between mt-4 pt-4 border-t">
                                        <span className="text-sm text-muted-foreground">Semester {course.semester}</span>
                                        <span className="text-sm font-medium">{course.credits} Credits</span>
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </TabsContent>
            </Tabs>
        </div>
    )
}
