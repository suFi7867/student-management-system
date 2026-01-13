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
    faculty?: {
        user?: {
            full_name: string
        }
    }
    enrolled?: number
    max_students?: number
    status: "active" | "inactive" | "archived"
}

import { useEffect } from "react"
import { getCourses } from "../actions"

export default function CoursesPage() {
    const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
    const [search, setSearch] = useState("")
    const [department, setDepartment] = useState("all")
    const [semester, setSemester] = useState("all")
    const [courses, setCourses] = useState<Course[]>([])
    const [loading, setLoading] = useState(true)

    useEffect(() => {
        fetchCourses()
    }, [search, department, semester])

    async function fetchCourses() {
        setLoading(true)
        const result = await getCourses({
            search: search || undefined,
            department: department === "all" ? undefined : department || undefined,
            semester: semester === "all" ? undefined : parseInt(semester),
        })
        setCourses(result.data as any[])
        setLoading(false)
    }

    // Dummy data for initial dev preview if DB is empty
    const displayCourses = courses.length > 0 ? courses : [
        { id: "1", code: "CS301", name: "Data Structures", description: "Introduction to data structures and algorithms", department: "Computer Science", credits: 4, semester: 3, faculty: { user: { full_name: "Dr. Rajesh Kumar" } }, enrolled: 45, max_students: 60, status: "active" },
        { id: "2", code: "CS302", name: "Algorithms", description: "Analysis and design of algorithms", department: "Computer Science", credits: 4, semester: 3, faculty: { user: { full_name: "Dr. Priya Singh" } }, enrolled: 38, max_students: 60, status: "active" },
        { id: "3", code: "CS401", name: "Machine Learning", description: "Introduction to ML concepts and applications", department: "Computer Science", credits: 3, semester: 7, faculty: { user: { full_name: "Dr. Amit Patel" } }, enrolled: 30, max_students: 40, status: "active" },
    ] as any[]

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
                                <SelectItem value="all">All Departments</SelectItem>
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
                                <SelectItem value="all">All Semesters</SelectItem>
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
            {loading && courses.length === 0 ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {[1, 2, 3].map(i => <Card key={i} className="h-64 skeleton" />)}
                </div>
            ) : viewMode === "grid" ? (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {displayCourses.map((course) => (
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
                                        {course.faculty?.user?.full_name || "Unassigned"}
                                    </div>
                                    <div className="flex items-center gap-4 text-sm">
                                        <span className="flex items-center gap-1 text-muted-foreground">
                                            <Users className="h-4 w-4" />
                                            {course.enrolled || 0}/{course.max_students || 60}
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
                                    {displayCourses.map((course) => (
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
                                                {course.faculty?.user?.full_name || "Unassigned"}
                                            </td>
                                            <td>{course.credits}</td>
                                            <td>
                                                {course.enrolled || 0}/{course.max_students || 60}
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
