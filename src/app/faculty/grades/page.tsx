"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Award,
    Save,
    Users,
    BookOpen,
    Search,
    Download,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface Student {
    id: string
    name: string
    enrollmentNo: string
    avatar?: string
    marks: number | null
    grade: string
}

export default function FacultyGradesPage() {
    const [selectedCourse, setSelectedCourse] = useState("")
    const [selectedAssessment, setSelectedAssessment] = useState("")
    const [search, setSearch] = useState("")
    const [isLoading, setIsLoading] = useState(false)

    const [students, setStudents] = useState<Student[]>([
        { id: "1", name: "Priya Sharma", enrollmentNo: "UU2024001", marks: 85, grade: "A" },
        { id: "2", name: "Rahul Kumar", enrollmentNo: "UU2024002", marks: 72, grade: "B+" },
        { id: "3", name: "Anjali Singh", enrollmentNo: "UU2024003", marks: 91, grade: "A+" },
        { id: "4", name: "Vikram Patel", enrollmentNo: "UU2024004", marks: 68, grade: "B" },
        { id: "5", name: "Sneha Gupta", enrollmentNo: "UU2024005", marks: 79, grade: "B+" },
        { id: "6", name: "Amit Verma", enrollmentNo: "UU2024006", marks: 55, grade: "C" },
        { id: "7", name: "Neha Reddy", enrollmentNo: "UU2024007", marks: null, grade: "-" },
        { id: "8", name: "Karan Singh", enrollmentNo: "UU2024008", marks: 88, grade: "A" },
    ])

    const courses = [
        { id: "1", code: "CS301", name: "Data Structures" },
        { id: "2", code: "CS302", name: "Algorithms" },
        { id: "3", code: "CS401", name: "Machine Learning" },
    ]

    const assessments = [
        { id: "1", name: "Assignment 1", maxMarks: 100, type: "assignment" },
        { id: "2", name: "Quiz 1", maxMarks: 20, type: "quiz" },
        { id: "3", name: "Mid-Term Exam", maxMarks: 100, type: "midterm" },
        { id: "4", name: "Assignment 2", maxMarks: 100, type: "assignment" },
        { id: "5", name: "Final Exam", maxMarks: 100, type: "final" },
    ]

    const currentAssessment = assessments.find(a => a.id === selectedAssessment)

    const getGradeFromMarks = (marks: number, maxMarks: number): string => {
        const percentage = (marks / maxMarks) * 100
        if (percentage >= 90) return "A+"
        if (percentage >= 80) return "A"
        if (percentage >= 70) return "B+"
        if (percentage >= 60) return "B"
        if (percentage >= 50) return "C"
        if (percentage >= 40) return "D"
        return "F"
    }

    const updateStudentMarks = (studentId: string, marks: string) => {
        const marksNum = marks === "" ? null : parseFloat(marks)
        const maxMarks = currentAssessment?.maxMarks || 100

        setStudents(students.map(s => {
            if (s.id === studentId) {
                const grade = marksNum !== null ? getGradeFromMarks(marksNum, maxMarks) : "-"
                return { ...s, marks: marksNum, grade }
            }
            return s
        }))
    }

    const saveGrades = async () => {
        setIsLoading(true)
        await new Promise(resolve => setTimeout(resolve, 1000))
        setIsLoading(false)
        alert("Grades saved successfully!")
    }

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case "A+":
            case "A":
                return "success"
            case "B+":
            case "B":
                return "info"
            case "C":
                return "warning"
            case "D":
            case "F":
                return "destructive"
            default:
                return "secondary"
        }
    }

    // Calculate statistics
    const gradedStudents = students.filter(s => s.marks !== null)
    const avgMarks = gradedStudents.length > 0
        ? Math.round(gradedStudents.reduce((sum, s) => sum + (s.marks || 0), 0) / gradedStudents.length)
        : 0
    const highest = gradedStudents.length > 0
        ? Math.max(...gradedStudents.map(s => s.marks || 0))
        : 0
    const lowest = gradedStudents.length > 0
        ? Math.min(...gradedStudents.map(s => s.marks || 0))
        : 0

    const filteredStudents = students.filter(s =>
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        s.enrollmentNo.toLowerCase().includes(search.toLowerCase())
    )

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Grade Management</h1>
                    <p className="text-muted-foreground">Enter and manage student grades</p>
                </div>
                <div className="flex gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
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
                        <div className="flex-1">
                            <Select value={selectedAssessment} onValueChange={setSelectedAssessment}>
                                <SelectTrigger>
                                    <SelectValue placeholder="Select Assessment" />
                                </SelectTrigger>
                                <SelectContent>
                                    {assessments.map((assessment) => (
                                        <SelectItem key={assessment.id} value={assessment.id}>
                                            {assessment.name} (Max: {assessment.maxMarks})
                                        </SelectItem>
                                    ))}
                                </SelectContent>
                            </Select>
                        </div>
                        <div className="w-full md:w-64 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search students..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Statistics */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Total Students</p>
                        <p className="text-2xl font-bold">{students.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Graded</p>
                        <p className="text-2xl font-bold">{gradedStudents.length}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Average Marks</p>
                        <p className="text-2xl font-bold">{avgMarks}</p>
                    </CardContent>
                </Card>
                <Card>
                    <CardContent className="p-4">
                        <p className="text-sm text-muted-foreground">Range</p>
                        <p className="text-2xl font-bold">{lowest} - {highest}</p>
                    </CardContent>
                </Card>
            </div>

            {/* Grade Entry Table */}
            <Card>
                <CardHeader className="flex flex-row items-center justify-between">
                    <div>
                        <CardTitle className="flex items-center gap-2">
                            <Award className="w-5 h-5" />
                            Enter Grades
                        </CardTitle>
                        <CardDescription>
                            {currentAssessment
                                ? `${currentAssessment.name} - Maximum Marks: ${currentAssessment.maxMarks}`
                                : "Select a course and assessment to enter grades"
                            }
                        </CardDescription>
                    </div>
                    <Button onClick={saveGrades} loading={isLoading}>
                        <Save className="w-4 h-4 mr-2" />
                        Save Grades
                    </Button>
                </CardHeader>
                <CardContent>
                    <div className="overflow-x-auto">
                        <table className="data-table w-full">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th className="hidden md:table-cell">Enrollment No.</th>
                                    <th className="w-32">Marks</th>
                                    <th className="w-24">Grade</th>
                                </tr>
                            </thead>
                            <tbody>
                                {filteredStudents.map((student) => (
                                    <tr key={student.id}>
                                        <td>
                                            <div className="flex items-center gap-3">
                                                <Avatar className="h-9 w-9">
                                                    <AvatarImage src={student.avatar} />
                                                    <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                                                </Avatar>
                                                <div>
                                                    <p className="font-medium">{student.name}</p>
                                                    <p className="text-xs text-muted-foreground md:hidden">
                                                        {student.enrollmentNo}
                                                    </p>
                                                </div>
                                            </div>
                                        </td>
                                        <td className="hidden md:table-cell font-mono text-sm">
                                            {student.enrollmentNo}
                                        </td>
                                        <td>
                                            <Input
                                                type="number"
                                                min="0"
                                                max={currentAssessment?.maxMarks || 100}
                                                value={student.marks ?? ""}
                                                onChange={(e) => updateStudentMarks(student.id, e.target.value)}
                                                placeholder="-"
                                                className="w-24 h-9"
                                            />
                                        </td>
                                        <td>
                                            <Badge variant={getGradeColor(student.grade) as "success" | "info" | "warning" | "destructive" | "secondary"}>
                                                {student.grade}
                                            </Badge>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>

            {/* Grade Distribution */}
            <Card>
                <CardHeader>
                    <CardTitle>Grade Distribution</CardTitle>
                    <CardDescription>Overview of grade distribution for this assessment</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="grid grid-cols-2 md:grid-cols-6 gap-4">
                        {["A+", "A", "B+", "B", "C", "F"].map((grade) => {
                            const count = students.filter(s => s.grade === grade).length
                            return (
                                <div key={grade} className="text-center p-4 rounded-xl bg-muted/50">
                                    <Badge variant={getGradeColor(grade) as "success" | "info" | "warning" | "destructive" | "secondary"} className="mb-2">
                                        {grade}
                                    </Badge>
                                    <p className="text-2xl font-bold">{count}</p>
                                    <p className="text-xs text-muted-foreground">students</p>
                                </div>
                            )
                        })}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
