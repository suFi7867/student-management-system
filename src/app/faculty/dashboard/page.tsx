import Link from "next/link"
import {
    BookOpen,
    Users,
    ClipboardCheck,
    Award,
    Calendar,
    FileText,
    ArrowUpRight,
    Clock,
    AlertCircle,
    CheckCircle2,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { createClient } from "@/lib/supabase/server"

// Progress Component (inline since not yet created)
function ProgressBar({ value, className }: { value: number; className?: string }) {
    return (
        <div className={`h-2 w-full bg-muted rounded-full overflow-hidden ${className}`}>
            <div
                className="h-full bg-primary rounded-full transition-all duration-500"
                style={{ width: `${value}%` }}
            />
        </div>
    )
}

export default async function FacultyDashboard() {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    // Get faculty info
    const { data: profile } = await supabase
        .from("users")
        .select("full_name")
        .eq("id", user?.id)
        .single()

    const firstName = profile?.full_name?.split(" ")[0] || "Professor"

    // Dummy data for display
    const todayClasses = [
        { id: 1, code: "CS301", name: "Data Structures", time: "09:00 AM", room: "LH-01", students: 45 },
        { id: 2, code: "CS302", name: "Algorithms", time: "11:00 AM", room: "LH-03", students: 38 },
        { id: 3, code: "CS401", name: "Machine Learning", time: "02:00 PM", room: "Lab-02", students: 30 },
    ]

    const pendingTasks = [
        { id: 1, task: "Grade Assignment 3 - CS301", due: "Today", priority: "high" },
        { id: 2, task: "Upload Lecture Notes - CS302", due: "Tomorrow", priority: "medium" },
        { id: 3, task: "Submit Attendance Report", due: "Jan 15", priority: "low" },
    ]

    const courseStats = [
        { code: "CS301", name: "Data Structures", students: 45, attendance: 92, avgGrade: 78 },
        { code: "CS302", name: "Algorithms", students: 38, attendance: 88, avgGrade: 72 },
        { code: "CS401", name: "Machine Learning", students: 30, attendance: 95, avgGrade: 81 },
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Welcome Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Welcome back, {firstName}! 👋</h1>
                    <p className="text-muted-foreground">Here&apos;s your teaching overview for today</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Calendar className="w-4 h-4 mr-2" />
                        My Schedule
                    </Button>
                    <Button size="sm">
                        <ClipboardCheck className="w-4 h-4 mr-2" />
                        Mark Attendance
                    </Button>
                </div>
            </div>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card hover>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">My Courses</p>
                                <h3 className="text-3xl font-bold mt-1">3</h3>
                                <p className="text-xs text-muted-foreground mt-1">This semester</p>
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
                                <p className="text-sm text-muted-foreground">Total Students</p>
                                <h3 className="text-3xl font-bold mt-1">113</h3>
                                <p className="text-xs text-muted-foreground mt-1">Across all courses</p>
                            </div>
                            <div className="p-3 rounded-xl bg-purple-500/10">
                                <Users className="w-6 h-6 text-purple-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card hover>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Pending Grades</p>
                                <h3 className="text-3xl font-bold mt-1">12</h3>
                                <p className="text-xs text-muted-foreground mt-1">Need attention</p>
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
                                <p className="text-sm text-muted-foreground">Today&apos;s Classes</p>
                                <h3 className="text-3xl font-bold mt-1">3</h3>
                                <p className="text-xs text-emerald-500 mt-1">All on schedule</p>
                            </div>
                            <div className="p-3 rounded-xl bg-emerald-500/10">
                                <Calendar className="w-6 h-6 text-emerald-500" />
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
                                Today&apos;s Classes
                            </CardTitle>
                            <CardDescription>Your teaching schedule for today</CardDescription>
                        </div>
                        <Button variant="ghost" size="sm" className="text-primary">
                            Full Schedule
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {todayClasses.map((cls, index) => (
                                <div
                                    key={cls.id}
                                    className="flex items-center gap-4 p-4 rounded-xl border hover:border-primary/50 transition-colors"
                                >
                                    <div className={`w-1 h-14 rounded-full ${index === 0 ? "bg-emerald-500" : "bg-muted"
                                        }`} />
                                    <div className="flex-1">
                                        <div className="flex items-center gap-2">
                                            <span className="font-mono text-sm text-primary">{cls.code}</span>
                                            <span className="font-medium">{cls.name}</span>
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-sm text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <Clock className="w-3.5 h-3.5" />
                                                {cls.time}
                                            </span>
                                            <span>Room: {cls.room}</span>
                                            <span>{cls.students} students</span>
                                        </div>
                                    </div>
                                    <div className="flex gap-2">
                                        <Button variant="outline" size="sm">
                                            <ClipboardCheck className="w-4 h-4 mr-2" />
                                            Attendance
                                        </Button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Pending Tasks */}
                <Card>
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <FileText className="w-5 h-5" />
                            Pending Tasks
                        </CardTitle>
                        <CardDescription>Tasks that need your attention</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-3">
                            {pendingTasks.map((task) => (
                                <div key={task.id} className="flex items-start gap-3 p-3 rounded-lg border hover:bg-muted/50 transition-colors">
                                    <div className={`mt-0.5 ${task.priority === "high" ? "text-destructive" :
                                        task.priority === "medium" ? "text-amber-500" : "text-muted-foreground"
                                        }`}>
                                        {task.priority === "high" ? (
                                            <AlertCircle className="w-4 h-4" />
                                        ) : (
                                            <Clock className="w-4 h-4" />
                                        )}
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <p className="text-sm font-medium truncate">{task.task}</p>
                                        <p className="text-xs text-muted-foreground">Due: {task.due}</p>
                                    </div>
                                    <Badge
                                        variant={
                                            task.priority === "high" ? "destructive" :
                                                task.priority === "medium" ? "warning" : "secondary"
                                        }
                                        className="capitalize"
                                    >
                                        {task.priority}
                                    </Badge>
                                </div>
                            ))}
                        </div>
                        <Button variant="ghost" className="w-full mt-4 text-primary">
                            View All Tasks
                            <ArrowUpRight className="w-4 h-4 ml-1" />
                        </Button>
                    </CardContent>
                </Card>
            </div>

            {/* Course Performance */}
            <Card>
                <CardHeader>
                    <CardTitle>Course Performance Overview</CardTitle>
                    <CardDescription>Attendance and grade statistics for your courses</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid md:grid-cols-3 gap-6">
                        {courseStats.map((course) => (
                            <div key={course.code} className="p-4 rounded-xl border">
                                <div className="flex items-center justify-between mb-4">
                                    <div>
                                        <p className="font-mono text-sm text-primary">{course.code}</p>
                                        <p className="font-medium">{course.name}</p>
                                    </div>
                                    <Badge variant="secondary">{course.students} students</Badge>
                                </div>
                                <div className="space-y-4">
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Attendance</span>
                                            <span className="font-medium">{course.attendance}%</span>
                                        </div>
                                        <ProgressBar value={course.attendance} />
                                    </div>
                                    <div>
                                        <div className="flex justify-between text-sm mb-1">
                                            <span className="text-muted-foreground">Avg. Grade</span>
                                            <span className="font-medium">{course.avgGrade}%</span>
                                        </div>
                                        <ProgressBar value={course.avgGrade} />
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
