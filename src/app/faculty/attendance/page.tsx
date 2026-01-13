"use client"

import { useState } from "react"
import {
    Calendar,
    ClipboardCheck,
    Save,
    Users,
    CheckCircle2,
    XCircle,
    Clock,
    AlertCircle,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { Input } from "@/components/ui/input"

type AttendanceStatus = "present" | "absent" | "late" | "excused"

interface Student {
    id: string
    name: string
    enrollmentNo: string
    avatar?: string
    status: AttendanceStatus
    remarks: string
}

export default function FacultyAttendancePage() {
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split("T")[0])
    const [students, setStudents] = useState<Student[]>([
        { id: "1", name: "Priya Sharma", enrollmentNo: "UU2024001", status: "present", remarks: "" },
        { id: "2", name: "Rahul Kumar", enrollmentNo: "UU2024002", status: "present", remarks: "" },
        { id: "3", name: "Anjali Singh", enrollmentNo: "UU2024003", status: "present", remarks: "" },
        { id: "4", name: "Vikram Patel", enrollmentNo: "UU2024004", status: "absent", remarks: "" },
        { id: "5", name: "Sneha Gupta", enrollmentNo: "UU2024005", status: "present", remarks: "" },
        { id: "6", name: "Amit Verma", enrollmentNo: "UU2024006", status: "late", remarks: "Arrived 10 minutes late" },
        { id: "7", name: "Neha Reddy", enrollmentNo: "UU2024007", status: "present", remarks: "" },
        { id: "8", name: "Karan Singh", enrollmentNo: "UU2024008", status: "excused", remarks: "Medical leave" },
    ])
    const [isLoading, setIsLoading] = useState(false)

    const courses = [
        { id: "1", code: "CS301", name: "Data Structures" },
        { id: "2", code: "CS302", name: "Algorithms" },
        { id: "3", code: "CS401", name: "Machine Learning" },
    ]

    const updateStudentStatus = (studentId: string, status: AttendanceStatus) => {
        setStudents(students.map(s =>
            s.id === studentId ? { ...s, status } : s
        ))
    }

    const updateStudentRemarks = (studentId: string, remarks: string) => {
        setStudents(students.map(s =>
            s.id === studentId ? { ...s, remarks } : s
        ))
    }

    const markAllPresent = () => {
        setStudents(students.map(s => ({ ...s, status: "present" as const })))
    }

    const getStatusColor = (status: AttendanceStatus) => {
        switch (status) {
            case "present": return "bg-emerald-500"
            case "absent": return "bg-destructive"
            case "late": return "bg-amber-500"
            case "excused": return "bg-sky-500"
        }
    }

    const getStatusIcon = (status: AttendanceStatus) => {
        switch (status) {
            case "present": return <CheckCircle2 className="w-4 h-4" />
            case "absent": return <XCircle className="w-4 h-4" />
            case "late": return <Clock className="w-4 h-4" />
            case "excused": return <AlertCircle className="w-4 h-4" />
        }
    }

    const stats = {
        present: students.filter(s => s.status === "present").length,
        absent: students.filter(s => s.status === "absent").length,
        late: students.filter(s => s.status === "late").length,
        excused: students.filter(s => s.status === "excused").length,
    }

    const saveAttendance = async () => {
        setIsLoading(true)
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        alert("Attendance saved successfully!")
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Mark Attendance</h1>
                    <p className="text-muted-foreground">Record student attendance for your classes</p>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1">
                            <Select value={selectedCourse} onValueChange={setSelectedCourse}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Course" />
                                </SelectTrigger>
                                <SelectContent>
                                    {courses.map((course) => (
                                        <SelectItem key={course.id} value={course.id}>
                                            {course.code} - {course.name}
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full md:w-48">
                            <Input
                                type="date"
                                value={selectedDate}
                                onChange={(e) => setSelectedDate(e.target.value)}
                            />
                        </div>
                        <Button variant="outline" onClick={markAllPresent}>
                            <CheckCircle2 className="w-4 h-4 mr-2" />
                            Mark All Present
                        </Button>
                        <Button onClick={saveAttendance} loading={isLoading}>
                            <Save className="w-4 h-4 mr-2" />
                            Save Attendance
                        </Button>
                    </div>
                </CardContent>
            </Card>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-emerald-500/10">
                            <CheckCircle2 className="w-5 h-5 text-emerald-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.present}</p>
                            <p className="text-sm text-muted-foreground">Present</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-destructive/10">
                            <XCircle className="w-5 h-5 text-destructive" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.absent}</p>
                            <p className="text-sm text-muted-foreground">Absent</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-amber-500/10">
                            <Clock className="w-5 h-5 text-amber-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.late}</p>
                            <p className="text-sm text-muted-foreground">Late</p>
                        </div>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4 flex items-center gap-4">
                        <div className="p-2 rounded-lg bg-sky-500/10">
                            <AlertCircle className="w-5 h-5 text-sky-500" />
                        </div>
                        <div>
                            <p className="text-2xl font-bold">{stats.excused}</p>
                            <p className="text-sm text-muted-foreground">Excused</p>
                        </div>
                    </CardContent>
                </Card>
            </div>

            {/* Attendance Table */}
            <Card>
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="w-5 h-5" />
                        Student List
                    </CardTitle>
                    <CardDescription>
                        {selectedCourse ? `Showing students for ${courses.find(c => c.id === selectedCourse)?.name}` : "Select a course to mark attendance"}
                    </CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-3">
                        {students.map((student) => (
                            <div
                                key={student.id}
                                className="flex flex-col md:flex-row md:items-center gap-4 p-4 rounded-xl border hover:border-primary/50 transition-colors"
                            >
                                <div className="flex items-center gap-3 flex-1">
                                    <div className={`w-1.5 h-12 rounded-full ${getStatusColor(student.status)}`} />
                                    <Avatar className="h-10 w-10">
                                        <AvatarImage src={student.avatar} />
                                        <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                    </Avatar>
                                    <div>
                                        <p className="font-medium">{student.name}</p>
                                        <p className="text-sm text-muted-foreground font-mono">{student.enrollmentNo}</p>
                                    </div>
                                </div>

                                <div className="flex flex-wrap items-center gap-2">
                                    {(["present", "absent", "late", "excused"] as AttendanceStatus[]).map((status) => (
                                        <Button
                                            key={status}
                                            variant={student.status === status ? "default" : "outline"}
                                            size="sm"
                                            onClick={() => updateStudentStatus(student.id, status)}
                                            className={`capitalize ${student.status === status ? getStatusColor(status).replace("bg-", "bg-") : ""}`}
                                        >
                                            {getStatusIcon(status)}
                                            <span className="ml-1.5 hidden sm:inline">{status}</span>
                                        </Button>
                                    ))}
                                </div>

                                <div className="w-full md:w-48">
                                    <Input
                                        placeholder="Add remarks..."
                                        value={student.remarks}
                                        onChange={(e) => updateStudentRemarks(student.id, e.target.value)}
                                        className="h-9"
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
