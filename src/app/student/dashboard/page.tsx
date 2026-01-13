import Link from "next/link"
import {
    BookOpen,
    ClipboardCheck,
    Award,
    Calendar,
    FileText,
    ArrowUpRight,
    Clock,
    TrendingUp,
    AlertCircle,
    CheckCircle2,
    Bell,
    Target,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

// Progress Component
function ProgressBar({ value, className, color }: { value: number; className?: string; color?: string }) {
    return (
        <div className={`h-2 w-full bg-muted rounded-full overflow-hidden ${className}`}>
            <div
                className={`h-full rounded-full transition-all duration-500 ${color || "bg-primary"}`}
                style={{ width: `${value}%` }}
            />
        </div>
    )
}

// Circular Progress
function CircularProgress({ value, size = 120, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (value / 100) * circumference

    return (
        <div className="relative" style={{ width: size, height: size }}>
            <svg className="transform -rotate-90" width={size} height={size}>
                <circle
                    className="text-muted"
                    strokeWidth={strokeWidth}
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
                <circle
                    className="text-primary transition-all duration-500"
                    strokeWidth={strokeWidth}
                    strokeDasharray={circumference}
                    strokeDashoffset={offset}
                    strokeLinecap="round"
                    stroke="currentColor"
                    fill="transparent"
                    r={radius}
                    cx={size / 2}
                    cy={size / 2}
                />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-2xl font-bold">{value}%</span>
            </div>
        </div>
    )
}

export default async function StudentDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Get student info
    const { data: profile } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", user?.id)
        .single()

    const firstName = profile?.full_name?.split(" ")[0] || "Student"

    // Dummy data for display
    const todaySchedule = [
        { id: 1, code: "CS301", name: "Data Structures", time: "09:00 AM - 10:00 AM", room: "LH-01", type: "Lecture" },
        { id: 2, code: "CS302", name: "Algorithms", time: "11:00 AM - 12:00 PM", room: "LH-03", type: "Lecture" },
        { id: 3, code: "CS301P", name: "Data Structures Lab", time: "02:00 PM - 04:00 PM", room: "Lab-01", type: "Practical" },
    ]

    const upcomingDeadlines = [
        { id: 1, title: "Assignment 3 - Sorting Algorithms", course: "CS302", due: "Jan 15, 2024", daysLeft: 2 },
        { id: 2, title: "Project Proposal Submission", course: "CS401", due: "Jan 18, 2024", daysLeft: 5 },
        { id: 3, title: "Mid-Term Exam", course: "CS301", due: "Jan 20, 2024", daysLeft: 7 },
    ]

    const courses = [
        { id: 1, code: "CS301", name: "Data Structures", attendance: 92, grade: "A", credits: 4 },
        { id: 2, code: "CS302", name: "Algorithms", attendance: 88, grade: "B+", credits: 4 },
        { id: 3, code: "CS401", name: "Machine Learning", attendance: 95, grade: "A", credits: 3 },
        { id: 4, code: "CS303", name: "Database Systems", attendance: 85, grade: "B", credits: 3 },
    ]

    const announcements = [
        { id: 1, title: "Mid-Term Exam Schedule Released", time: "2 hours ago", priority: "high" },
        { id: 2, title: "Library hours extended during exams", time: "Yesterday", priority: "normal" },
        { id: 3, title: "Holiday Notice: Republic Day", time: "2 days ago", priority: "normal" },
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Welcome, {firstName}! 👋</h1>
                    <p className="text-muted-foreground">Here&apos;s your academic overview</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        View Schedule
                    </Button>
                    <Button size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        My Assignments
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card hover>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Enrolled Courses</p>
                                <h3 className="text-3xl font-bold mt-1">4</h3>
                                <p className="text-xs text-muted-foreground mt-1">14 credits total</p>
                            </div>
                            <div className="p-3 rounded-xl bg-sky-500/10">
                                <BookOpen className="w-6 h-6 text-sky-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card hover>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Overall Attendance</p>
                                <h3 className="text-3xl font-bold mt-1">90%</h3>
                                <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    +2% this week
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-500/10">
                                <ClipboardCheck className="w-6 h-6 text-emerald-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card hover>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Current CGPA</p>
                                <h3 className="text-3xl font-bold mt-1">8.5</h3>
                                <p className="text-xs text-muted-foreground mt-1">Out of 10.0</p>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/10">
                                <Award className="w-6 h-6 text-amber-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card hover>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Pending Tasks</p>
                                <h3 className="text-3xl font-bold mt-1">3</h3>
                                <p className="text-xs text-destructive mt-1 flex items-center gap-1">
                                    <AlertCircle className="w-3 h-3" />
                                    1 due today
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-rose-500/10">
                                <Target className="w-6 h-6 text-rose-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Today's Schedule */}
                <Card className="lg:col-span-2">
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Clock className="w-5 h-5" />
                                Today&apos;s Schedule
                            </CardTitle>
                            <CardDescription>Your classes for today</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                            Full Schedule
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {todaySchedule.map((cls, index) => (
                                <div
                                    key={cls.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border hover:border-primary/50 transition-colors"
                                >
                                    <div className={`w-1 h-14 rounded-full ${index === 0 ? "bg-emerald-500" : "bg-muted"
                                        }`} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2 flex-wrap">
                                            <span className="font-mono text-sm text-primary">{cls.code}</span>
                                            <span className="font-medium">{cls.name}</span>
                                            <Badge variant={cls.type === "Practical" ? "secondary" : "outline"}>
                                                {cls.type}
                                            </Badge>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {cls.time}
                                            </span>
                                            <span>Room: {cls.room}</span>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Attendance Overview */}
                <Card>
                    <CardHeader>
                        <CardTitle>Attendance Overview</CardTitle>
                        <CardDescription>Your overall attendance this semester</CardDescription>
                    </CardHeader>
                    <CardContent className="flex flex-col items-center">
                        <CircularProgress value={90} />
                        <p className="mt-4 text-sm text-muted-foreground text-center">
                            Minimum required: <span className="font-medium text-foreground">75%</span>
                        </p>
                        <div className="w-full mt-6 space-y-2">
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <CheckCircle2 className="w-4 h-4 text-emerald-500" />
                                    Present
                                </span>
                                <span className="font-medium">45 classes</span>
                            </div>
                            <div className="flex items-center justify-between text-sm">
                                <span className="flex items-center gap-2">
                                    <AlertCircle className="w-4 h-4 text-destructive" />
                                    Absent
                                </span>
                                <span className="font-medium">5 classes</span>
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                {/* Upcoming Deadlines */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Target className="w-5 h-5" />
                                Upcoming Deadlines
                            </CardTitle>
                            <CardDescription>Assignments and exams due soon</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                            View All
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {upcomingDeadlines.map((deadline) => (
                                <div
                                    key={deadline.id}
                                    className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors"
                                >
                                    <div className={`mt-0.5 ${deadline.daysLeft <= 2 ? "text-destructive" :
                                            deadline.daysLeft <= 5 ? "text-amber-500" : "text-muted-foreground"
                                        }`}>
                                        <Clock className="w-4 h-4" />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{deadline.title}</p>
                                        <p className="text-xs text-muted-foreground">{deadline.course} • {deadline.due}</p>
                                    </div>
                                    <Badge
                                        variant={
                                            deadline.daysLeft <= 2 ? "destructive" :
                                                deadline.daysLeft <= 5 ? "warning" : "secondary"
                                        }
                                    >
                                        {deadline.daysLeft}d left
                                    </Badge>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Announcements */}
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <div>
                            <CardTitle className="flex items-center gap-2">
                                <Bell className="w-5 h-5" />
                                Announcements
                            </CardTitle>
                            <CardDescription>Latest updates from institution</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                            View All
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {announcements.map((announcement) => (
                                <div
                                    key={announcement.id}
                                    className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors cursor-pointer"
                                >
                                    <div className={`w-2 h-2 mt-2 rounded-full ${announcement.priority === "high" ? "bg-destructive" : "bg-primary"
                                        }`} />
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium">{announcement.title}</p>
                                        <p className="text-xs text-muted-foreground">{announcement.time}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Course Progress */}
            <Card>
                <CardHeader>
                    <CardTitle>Course Progress</CardTitle>
                    <CardDescription>Your performance across enrolled courses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                        {courses.map((course) => (
                            <div key={course.id} className="p-4 rounded-xl border hover:border-primary/50 transition-colors">
                                <div className="flex items-center justify-between mb-3">
                                    <span className="font-mono text-sm text-primary">{course.code}</span>
                                    <Badge>{course.grade}</Badge>
                                </div>
                                <p className="font-medium text-sm mb-4">{course.name}</p>
                                <div>
                                    <div className="flex justify-between text-xs mb-1">
                                        <span className="text-muted-foreground">Attendance</span>
                                        <span className={`font-medium ${course.attendance >= 75 ? "text-emerald-500" : "text-destructive"
                                            }`}>{course.attendance}%</span>
                                    </div>
                                    <ProgressBar
                                        value={course.attendance}
                                        color={course.attendance >= 75 ? "bg-emerald-500" : "bg-destructive"}
                                    />
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
