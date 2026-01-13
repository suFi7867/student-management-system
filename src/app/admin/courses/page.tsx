"use client"

import { useState } from "react"
import Link from "next/link"
import {
    Search,
    Plus,
    Grid,
    List,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Users,
    Clock,
    BookOpen,
    GraduationCap,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"

interface Course {
    id: string
    code: string
    name: string
    description: string
    department: string
    credits: number
    semester: number
    faculty: string
    enrolled: number
    maxStudents: number
    status: "active" | "inactive" | "archived"
}

export default function CoursesPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [search, setSearch] = useState("")
    const [department, setDepartment] = useState("")
    const [semester, setSemester] = useState("")

    const courses: Course[] = [
        { id: "1", code: "CS301", name: "Data Structures", description: "Introduction to data structures and algorithms", department: "Computer Science", credits: 4, semester: 3, faculty: "Dr. Rajesh Kumar", enrolled: 45, maxStudents: 60, status: "active" },
        { id: "2", code: "CS302", name: "Algorithms", description: "Analysis and design of algorithms", department: "Computer Science", credits: 4, semester: 3, faculty: "Dr. Priya Singh", enrolled: 38, maxStudents: 60, status: "active" },
        { id: "3", code: "CS401", name: "Machine Learning", description: "Introduction to ML concepts and applications", department: "Computer Science", credits: 3, semester: 7, faculty: "Dr. Amit Patel", enrolled: 30, maxStudents: 40, status: "active" },
        { id: "4", code: "EC201", name: "Digital Electronics", description: "Fundamentals of digital circuits", department: "Electronics & Communication", credits: 4, semester: 3, faculty: "Dr. Sunita Sharma", enrolled: 52, maxStudents: 60, status: "active" },
        { id: "5", code: "ME301", name: "Thermodynamics", description: "Principles of thermodynamics", department: "Mechanical Engineering", credits: 3, semester: 5, faculty: "Dr. Vikram Reddy", enrolled: 48, maxStudents: 60, status: "active" },
        { id: "6", code: "CS501", name: "Deep Learning", description: "Neural networks and deep learning", department: "Computer Science", credits: 3, semester: 8, faculty: "Dr. Amit Patel", enrolled: 25, maxStudents: 30, status: "active" },
    ]

    const filteredCourses = courses.filter(course => {
        const matchSearch = course.name.toLowerCase().includes(search.toLowerCase()) ||
            course.code.toLowerCase().includes(search.toLowerCase())
        const matchDept = !department || course.department === department
        const matchSem = !semester || course.semester === parseInt(semester)
        return matchSearch && matchDept && matchSem
    })

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Courses</h1>
                    <p className="text-muted-foreground">Manage course catalog and assignments</p>
                </div>
                <Link href="/admin/courses/add">
                    <Button>
                        <Plus className="w-4 h-4 mr-2" />
                        Create Course
                    </Button>
                </Link>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search courses..."
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                className="pl-10"
                            />
                        </div>
                        <Select value={department} onValueChange={setDepartment}>
                            <SelectTrigger className="w-full md:w-48">
                                <SelectValue placeholder="All Departments" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Departments</SelectItem>
                                <SelectItem value="Computer Science">Computer Science</SelectItem>
                                <SelectItem value="Electronics & Communication">Electronics & Communication</SelectItem>
                                <SelectItem value="Mechanical Engineering">Mechanical Engineering</SelectItem>
                            </SelectContent>
                        </Select>
                        <Select value={semester} onValueChange={setSemester}>
                            <SelectTrigger className="w-full md:w-36">
                                <SelectValue placeholder="All Semesters" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="">All Semesters</SelectItem>
                                {[1, 2, 3, 4, 5, 6, 7, 8].map((sem) => (
                                    <SelectItem key={sem} value={sem.toString()}>Semester {sem}</SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <div className="flex border rounded-lg overflow-hidden">
                            <Button
                                variant={viewMode === "grid" ? "default" : "ghost"}
                                size="icon"
                                className="rounded-none"
                                onClick={() => setViewMode("grid")}
                            >
                                <Grid className="h-4 w-4" />
                            </Button>
                            <Button
                                variant={viewMode === "list" ? "default" : "ghost"}
                                size="icon"
                                className="rounded-none"
                                onClick={() => setViewMode("list")}
                            >
                                <List className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Course Grid/List */}
            {viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredCourses.map((course) => (
                        <Card key={course.id} hover className="relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-full -translate-y-1/2 translate-x-1/2" />
                            <CardHeader>
                                <div className="flex items-start justify-between">
                                    <div>
                                        <Badge variant="outline" className="mb-2 font-mono">{course.code}</Badge>
                                        <CardTitle className="text-lg">{course.name}</CardTitle>
                                        <CardDescription className="line-clamp-2">{course.description}</CardDescription>
                                    </div>
                                    <DropdownMenu>
                                        <DropdownMenuTrigger asChild>
                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                <MoreHorizontal className="h-4 w-4" />
                                            </Button>
                                        </DropdownMenuTrigger>
                                        <DropdownMenuContent align="end">
                                            <DropdownMenuItem>
                                                <Eye className="mr-2 h-4 w-4" />
                                                View Details
                                            </DropdownMenuItem>
                                            <DropdownMenuItem>
                                                <Edit className="mr-2 h-4 w-4" />
                                                Edit
                                            </DropdownMenuItem>
                                            <DropdownMenuSeparator />
                                            <DropdownMenuItem className="text-destructive">
                                                <Trash2 className="mr-2 h-4 w-4" />
                                                Delete
                                            </DropdownMenuItem>
                                        </DropdownMenuContent>
                                    </DropdownMenu>
                                </div>
                            </CardHeader>
                            <CardContent className="pt-0">
                                <div className="space-y-3">
                                    <div className="flex items-center gap-2 text-sm text-muted-foreground">
                                        <GraduationCap className="h-4 w-4" />
                                        {course.faculty}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            {course.enrolled}/{course.maxStudents}
                                        </span>
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <BookOpen className="h-4 w-4" />
                                            {course.credits} Credits
                                        </span>
                                    </div>
                                    <div className="flex items-center justify-between pt-2">
                                        <Badge variant="secondary">Semester {course.semester}</Badge>
                                        <Badge variant="success">{course.status}</Badge>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            ) : (
                <Card>
                    <CardContent className="p-0">
                        <div className="overflow-x-auto">
                            <table className="data-table w-full">
                                <thead>
                                    <tr>
                                        <th>Course</th>
                                        <th className="hidden md:table-cell">Department</th>
                                        <th className="hidden lg:table-cell">Faculty</th>
                                        <th>Credits</th>
                                        <th>Enrolled</th>
                                        <th>Status</th>
                                        <th className="text-right">Actions</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {filteredCourses.map((course) => (
                                        <tr key={course.id}>
                                            <td>
                                                <div>
                                                    <span className="font-mono text-primary text-sm">{course.code}</span>
                                                    <p className="font-medium">{course.name}</p>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell text-sm">
                                                {course.department}
                                            </td>
                                            <td className="hidden lg:table-cell text-sm">
                                                {course.faculty}
                                            </td>
                                            <td>{course.credits}</td>
                                            <td>
                                                {course.enrolled}/{course.maxStudents}
                                            </td>
                                            <td>
                                                <Badge variant="success" className="capitalize">
                                                    {course.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-end gap-1">
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Eye className="h-4 w-4" />
                                                    </Button>
                                                    <Button variant="ghost" size="icon" className="h-8 w-8">
                                                        <Edit className="h-4 w-4" />
                                                    </Button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </CardContent>
                </Card>
            )}
        </div>
    )
}
