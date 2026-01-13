"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import {
    Search,
    Plus,
    Filter,
    Download,
    MoreHorizontal,
    Eye,
    Edit,
    Trash2,
    Mail,
    ChevronLeft,
    ChevronRight,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
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
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { getStudents, deleteStudent } from "../actions"

const DEPARTMENTS = [
    "Computer Science",
    "Electronics & Communication",
    "Mechanical Engineering",
    "Civil Engineering",
    "Electrical Engineering",
    "Information Technology",
]

const STATUS_COLORS = {
    active: "success",
    inactive: "secondary",
    graduated: "info",
    suspended: "destructive",
} as const

interface Student {
    id: string
    enrollment_number: string
    department: string
    year: number
    semester: number
    status: keyof typeof STATUS_COLORS
    user?: {
        full_name: string
        email: string
        phone?: string
        avatar_url?: string
    }
}

export default function StudentsPage() {
    const [students, setStudents] = useState<Student[]>([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [perPage] = useState(20)
    const [search, setSearch] = useState("")
    const [department, setDepartment] = useState("all")
    const [status, setStatus] = useState("all")
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false)
    const [studentToDelete, setStudentToDelete] = useState<Student | null>(null)
    const [isDeleting, setIsDeleting] = useState(false)

    useEffect(() => {
        fetchStudents()
    }, [page, search, department, status])

    async function fetchStudents() {
        setLoading(true)
        const result = await getStudents({
            search: search || undefined,
            department: department === "all" ? undefined : department || undefined,
            status: status === "all" ? undefined : status || undefined,
            page,
            per_page: perPage,
        })
        setStudents(result.data as Student[])
        setTotal(result.total)
        setLoading(false)
    }

    async function handleDelete() {
        if (!studentToDelete) return
        setIsDeleting(true)
        const result = await deleteStudent(studentToDelete.id)
        if (result.success) {
            fetchStudents()
        }
        setIsDeleting(false)
        setDeleteDialogOpen(false)
        setStudentToDelete(null)
    }

    const totalPages = Math.ceil(total / perPage)

    // Dummy data for display when no real data exists
    const displayStudents = students.length > 0 ? students : [
        { id: "1", enrollment_number: "UU2024001", department: "Computer Science", year: 2, semester: 3, status: "active" as const, user: { full_name: "Priya Sharma", email: "priya.sharma@uu.edu", phone: "+91 98765 43210", avatar_url: undefined } },
        { id: "2", enrollment_number: "UU2024002", department: "Electronics & Communication", year: 3, semester: 5, status: "active" as const, user: { full_name: "Rahul Kumar", email: "rahul.kumar@uu.edu", phone: "+91 87654 32109", avatar_url: undefined } },
        { id: "3", enrollment_number: "UU2023003", department: "Mechanical Engineering", year: 4, semester: 7, status: "active" as const, user: { full_name: "Anjali Singh", email: "anjali.singh@uu.edu", phone: "+91 76543 21098", avatar_url: undefined } },
        { id: "4", enrollment_number: "UU2024004", department: "Civil Engineering", year: 1, semester: 1, status: "active" as const, user: { full_name: "Vikram Patel", email: "vikram.patel@uu.edu", phone: "+91 65432 10987", avatar_url: undefined } },
        { id: "5", enrollment_number: "UU2022005", department: "Computer Science", year: 4, semester: 8, status: "graduated" as const, user: { full_name: "Sneha Gupta", email: "sneha.gupta@uu.edu", phone: "+91 54321 09876", avatar_url: undefined } },
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Students</h1>
                    <p className="text-muted-foreground">Manage all student records and information</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Link href="/admin/students/add">
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Student
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Filters */}
            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or enrollment number..."
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
                                {DEPARTMENTS.map((dept) => (
                                    <SelectItem key={dept} value={dept}>
                                        {dept}
                                    </SelectItem>
                                ))}
                            </SelectContent>
                        </Select>
                        <Select value={status} onValueChange={setStatus}>
                            <SelectTrigger className="w-full md:w-36">
                                <SelectValue placeholder="All Status" />
                            </SelectTrigger>
                            <SelectContent>
                                <SelectItem value="all">All Status</SelectItem>
                                <SelectItem value="active">Active</SelectItem>
                                <SelectItem value="inactive">Inactive</SelectItem>
                                <SelectItem value="graduated">Graduated</SelectItem>
                                <SelectItem value="suspended">Suspended</SelectItem>
                            </SelectContent>
                        </Select>
                    </div>
                </CardContent>
            </Card>

            {/* Students Table */}
            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="data-table w-full">
                            <thead>
                                <tr>
                                    <th>Student</th>
                                    <th className="hidden md:table-cell">Enrollment No.</th>
                                    <th className="hidden lg:table-cell">Department</th>
                                    <th className="hidden sm:table-cell">Year/Sem</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading ? (
                                    [...Array(5)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={6}>
                                                <div className="h-12 skeleton rounded" />
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    displayStudents.map((student) => (
                                        <tr key={student.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={student.user?.avatar_url || undefined} />
                                                        <AvatarFallback>
                                                            {student.user?.full_name?.charAt(0) || "S"}
                                                        </AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{student.user?.full_name || "Student"}</p>
                                                        <p className="text-xs text-muted-foreground">{student.user?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell font-mono text-sm">
                                                {student.enrollment_number}
                                            </td>
                                            <td className="hidden lg:table-cell text-sm">
                                                {student.department}
                                            </td>
                                            <td className="hidden sm:table-cell text-sm">
                                                {student.year}Y / {student.semester}S
                                            </td>
                                            <td>
                                                <Badge variant={STATUS_COLORS[student.status]} className="capitalize">
                                                    {student.status}
                                                </Badge>
                                            </td>
                                            <td>
                                                <div className="flex items-center justify-end gap-1">
                                                    <Link href={`/admin/students/${student.id}`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Eye className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <Link href={`/admin/students/${student.id}/edit`}>
                                                        <Button variant="ghost" size="icon" className="h-8 w-8">
                                                            <Edit className="h-4 w-4" />
                                                        </Button>
                                                    </Link>
                                                    <DropdownMenu>
                                                        <DropdownMenuTrigger asChild>
                                                            <Button variant="ghost" size="icon" className="h-8 w-8">
                                                                <MoreHorizontal className="h-4 w-4" />
                                                            </Button>
                                                        </DropdownMenuTrigger>
                                                        <DropdownMenuContent align="end">
                                                            <DropdownMenuLabel>Actions</DropdownMenuLabel>
                                                            <DropdownMenuSeparator />
                                                            <DropdownMenuItem>
                                                                <Mail className="mr-2 h-4 w-4" />
                                                                Send Email
                                                            </DropdownMenuItem>
                                                            <DropdownMenuItem
                                                                className="text-destructive"
                                                                onClick={() => {
                                                                    setStudentToDelete(student)
                                                                    setDeleteDialogOpen(true)
                                                                }}
                                                            >
                                                                <Trash2 className="mr-2 h-4 w-4" />
                                                                Delete
                                                            </DropdownMenuItem>
                                                        </DropdownMenuContent>
                                                    </DropdownMenu>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>

                    {/* Pagination */}
                    <div className="flex items-center justify-between p-4 border-t">
                        <p className="text-sm text-muted-foreground">
                            Showing {Math.min((page - 1) * perPage + 1, total || displayStudents.length)} to{" "}
                            {Math.min(page * perPage, total || displayStudents.length)} of {total || displayStudents.length} students
                        </p>
                        <div className="flex items-center gap-2">
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page === 1}
                                onClick={() => setPage(page - 1)}
                            >
                                <ChevronLeft className="h-4 w-4" />
                            </Button>
                            <span className="text-sm">
                                Page {page} of {totalPages || 1}
                            </span>
                            <Button
                                variant="outline"
                                size="sm"
                                disabled={page >= (totalPages || 1)}
                                onClick={() => setPage(page + 1)}
                            >
                                <ChevronRight className="h-4 w-4" />
                            </Button>
                        </div>
                    </div>
                </CardContent>
            </Card>

            {/* Delete Confirmation Dialog */}
            <Dialog open={deleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Delete Student</DialogTitle>
                        <DialogDescription>
                            Are you sure you want to delete {studentToDelete?.user?.full_name}? This action cannot be undone and will remove all associated records.
                        </DialogDescription>
                    </DialogHeader>
                    <DialogFooter>
                        <Button variant="outline" onClick={() => setDeleteDialogOpen(false)}>
                            Cancel
                        </Button>
                        <Button variant="destructive" onClick={handleDelete} loading={isDeleting}>
                            Delete
                        </Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}
