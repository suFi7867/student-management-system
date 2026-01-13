import {
    ClipboardCheck,
    Download,
    Calendar,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

// Progress Ring Component
function CircularProgress({ value, size = 100, strokeWidth = 8 }: { value: number; size?: number; strokeWidth?: number }) {
    const radius = (size - strokeWidth) / 2
    const circumference = radius * 2 * Math.PI
    const offset = circumference - (value / 100) * circumference
    const color = value >= 75 ? "text-emerald-500" : value >= 60 ? "text-amber-500" : "text-destructive"

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
                    className={`${color} transition-all duration-500`}
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
                <span className="text-xl font-bold">{value}%</span>
            </div>
        </div>
    )
}

export default function StudentAttendancePage() {
    // Dummy data
    const overallAttendance = 88

    const courseAttendance = [
        { code: "CS301", name: "Data Structures", present: 28, absent: 2, late: 1, total: 31, percentage: 90 },
        { code: "CS302", name: "Algorithms", present: 25, absent: 3, late: 2, total: 30, percentage: 83 },
        { code: "CS303", name: "Database Systems", present: 27, absent: 1, late: 0, total: 28, percentage: 96 },
        { code: "CS304", name: "Computer Networks", present: 24, absent: 4, late: 1, total: 29, percentage: 83 },
        { code: "CS305", name: "Operating Systems", present: 26, absent: 2, late: 2, total: 30, percentage: 87 },
        { code: "MA301", name: "Probability & Statistics", present: 22, absent: 5, late: 1, total: 28, percentage: 79 },
    ]

    const currentMonth = "January 2024"
    const calendarDays = [
        { day: 1, status: null }, // Sunday
        { day: 2, status: "present" },
        { day: 3, status: "present" },
        { day: 4, status: "present" },
        { day: 5, status: "absent" },
        { day: 6, status: "present" },
        { day: 7, status: null }, // Sunday
        { day: 8, status: "present" },
        { day: 9, status: "present" },
        { day: 10, status: "late" },
        { day: 11, status: "present" },
        { day: 12, status: "present" },
        { day: 13, status: "present" },
        { day: 14, status: null }, // Sunday
        { day: 15, status: "present" },
        { day: 16, status: "present" },
        { day: 17, status: "present" },
        { day: 18, status: "absent" },
        { day: 19, status: "present" },
        { day: 20, status: "present" },
        { day: 21, status: null }, // Sunday
        { day: 22, status: "present" },
        { day: 23, status: "present" },
        { day: 24, status: "present" },
        { day: 25, status: "present" },
        { day: 26, status: "holiday" },
        { day: 27, status: "present" },
        { day: 28, status: null }, // Sunday
        { day: 29, status: null }, // Future
        { day: 30, status: null }, // Future
        { day: 31, status: null }, // Future
    ]

    const getStatusColor = (status: string | null) => {
        switch (status) {
            case "present": return "bg-emerald-500"
            case "absent": return "bg-destructive"
            case "late": return "bg-amber-500"
            case "holiday": return "bg-sky-500"
            default: return "bg-muted"
        }
    }

    const totalPresent = courseAttendance.reduce((sum, c) => sum + c.present, 0)
    const totalAbsent = courseAttendance.reduce((sum, c) => sum + c.absent, 0)
    const totalLate = courseAttendance.reduce((sum, c) => sum + c.late, 0)
    const totalClasses = courseAttendance.reduce((sum, c) => sum + c.total, 0)

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Attendance</h1>
                    <p className="text-muted-foreground">Track your attendance across all courses</p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Report
                </Button>
            </div>

            {/* Overall Stats */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-5 gap-4">
                <Card className="sm:col-span-2 lg:col-span-1">
                    <CardContent className="p-6 flex flex-col items-center justify-center">
                        <CircularProgress value={overallAttendance} />
                        <p className="mt-2 text-sm font-medium text-center">Overall Attendance</p>
                        <p className="text-xs text-muted-foreground">Min required: 75%</p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{totalPresent}</p>
                            <p className="text-sm text-muted-foreground">Present</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-destructive/10">
                            <XCircle className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{totalAbsent}</p>
                            <p className="text-sm text-muted-foreground">Absent</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{totalLate}</p>
                            <p className="text-sm text-muted-foreground">Late</p>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-sky-500/10">
                            <Calendar className="w-5 h-5 text-sky-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{totalClasses}</p>
                            <p className="text-sm text-muted-foreground">Total Classes</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                {/* Course-wise Attendance */}
                <Card className="lg:col-span-2">
                    <CardHeader>
                        <CardTitle>Course-wise Attendance</CardTitle>
                        <CardDescription>Your attendance percentage in each course</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {courseAttendance.map((course) => (
                                <div key={course.code} className="flex items-center gap-4 p-4 rounded-xl border">
                                    <div className="flex-1 min-w-0">
                                        <div className="flex items-center gap-2 mb-1">
                                            <span className="font-mono text-primary text-sm">{course.code}</span>
                                            <span className="font-medium truncate">{course.name}</span>
                                        </div>
                                        <div className="h-2 bg-muted rounded-full overflow-hidden">
                                            <div
                                                className={`h-full rounded-full transition-all duration-500 ${course.percentage >= 75 ? "bg-emerald-500" :
                                                        course.percentage >= 60 ? "bg-amber-500" : "bg-destructive"
                                                    }`}
                                                style={{ width: `${course.percentage}%` }}
                                            />
                                        </div>
                                        <div className="flex items-center gap-4 mt-1 text-xs text-muted-foreground">
                                            <span className="flex items-center gap-1">
                                                <CheckCircle2 className="w-3 h-3 text-emerald-500" />
                                                {course.present} Present
                                            </span>
                                            <span className="flex items-center gap-1">
                                                <XCircle className="w-3 h-3 text-destructive" />
                                                {course.absent} Absent
                                            </span>
                                            {course.late > 0 && (
                                                <span className="flex items-center gap-1">
                                                    <Clock className="w-3 h-3 text-amber-500" />
                                                    {course.late} Late
                                                </span>
                                            )}
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <Badge
                                            variant={
                                                course.percentage >= 75 ? "success" :
                                                    course.percentage >= 60 ? "warning" : "destructive"
                                            }
                                            className="text-lg font-bold"
                                        >
                                            {course.percentage}%
                                        </Badge>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                {/* Calendar View */}
                <Card>
                    <CardHeader>
                        <div className="flex items-center justify-between">
                            <CardTitle>Attendance Calendar</CardTitle>
                            <div className="flex items-center gap-2">
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ChevronLeft className="h-4 w-4" />
                                </Button>
                                <span className="text-sm font-medium">{currentMonth}</span>
                                <Button variant="ghost" size="icon" className="h-8 w-8">
                                    <ChevronRight className="h-4 w-4" />
                                </Button>
                            </div>
                        </div>
                    </CardHeader>
                    <CardContent>
                        <div className="grid grid-cols-7 gap-1 text-center mb-2">
                            {["S", "M", "T", "W", "T", "F", "S"].map((day, i) => (
                                <span key={i} className="text-xs text-muted-foreground font-medium py-1">
                                    {day}
                                </span>
                            ))}
                        </div>
                        <div className="grid grid-cols-7 gap-1">
                            {/* Empty cells for days before month starts (assume starts on Monday) */}
                            <div />
                            {calendarDays.map((day) => (
                                <div
                                    key={day.day}
                                    className={`aspect-square rounded-lg flex items-center justify-center text-sm font-medium ${getStatusColor(day.status)} ${day.status ? "text-white" : "text-muted-foreground"
                                        }`}
                                >
                                    {day.day}
                                </div>
                            ))}
                        </div>

                        {/* Legend */}
                        <div className="flex flex-wrap gap-4 mt-4 pt-4 border-t text-xs">
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-emerald-500" />
                                Present
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-destructive" />
                                Absent
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-amber-500" />
                                Late
                            </div>
                            <div className="flex items-center gap-1">
                                <div className="w-3 h-3 rounded bg-sky-500" />
                                Holiday
                            </div>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Warning Alert */}
            {courseAttendance.some(c => c.percentage < 75) && (
                <Card className="border-amber-500/50 bg-amber-500/5">
                    <CardContent className="p-4 flex items-start gap-4">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <AlertCircle className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <h4 className="font-semibold text-amber-600 dark:text-amber-400">Attendance Warning</h4>
                            <p className="text-sm text-muted-foreground">
                                Your attendance in some courses is below the required 75%. Please ensure regular attendance to avoid
                                academic penalties.
                            </p>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
