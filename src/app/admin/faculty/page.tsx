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
    GraduationCap,
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
import { getFaculty } from "../actions"

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
    on_leave: "warning",
} as const

interface Faculty {
    id: string
    employee_id: string
    department: string
    designation: string
    status: keyof typeof STATUS_COLORS
    user?: {
        full_name: string
        email: string
        phone?: string
        avatar_url?: string
    }
}

export default function FacultyPage() {
    const [faculty, setFaculty] = useState<Faculty[]>([])
    const [loading, setLoading] = useState(true)
    const [total, setTotal] = useState(0)
    const [page, setPage] = useState(1)
    const [perPage] = useState(20)
    const [search, setSearch] = useState("")
    const [department, setDepartment] = useState("all")
    const [status, setStatus] = useState("all")

    useEffect(() => {
        fetchFaculty()
    }, [page, search, department, status])

    async function fetchFaculty() {
        setLoading(true)
        const result = await getFaculty({
            search: search || undefined,
            department: department === "all" ? undefined : department || undefined,
            status: status === "all" ? undefined : status || undefined,
            page,
            per_page: perPage,
        })
        setFaculty(result.data as Faculty[])
        setTotal(result.total)
        setLoading(false)
    }

    const totalPages = Math.ceil(total / perPage)

    // Dummy data for display when no real data exists
    const displayFaculty = faculty.length > 0 ? faculty : [
        { id: "1", employee_id: "FAC2024001", department: "Computer Science", designation: "Professor", status: "active" as const, user: { full_name: "Dr. Rajesh Sharma", email: "dr.sharma@uu.edu", phone: "+91 99999 00001", avatar_url: undefined } },
        { id: "2", employee_id: "FAC2024002", department: "Information Technology", designation: "Assistant Professor", status: "active" as const, user: { full_name: "Prof. Sneha Gupta", email: "prof.gupta@uu.edu", phone: "+91 99999 00002", avatar_url: undefined } },
        { id: "3", employee_id: "FAC2024003", department: "Electronics & Communication", designation: "Associate Professor", status: "on_leave" as const, user: { full_name: "Dr. Amit Verma", email: "dr.verma@uu.edu", phone: "+91 99999 00003", avatar_url: undefined } },
    ]

    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Faculty Members</h1>
                    <p className="text-muted-foreground">Manage faculty records and workload distribution</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <Download className="w-4 h-4 mr-2" />
                        Export
                    </Button>
                    <Link href="/admin/faculty/add">
                        <Button size="sm">
                            <Plus className="w-4 h-4 mr-2" />
                            Add Faculty
                        </Button>
                    </Link>
                </div>
            </div>

            <Card>
                <CardContent className="p-4">
                    <div className="flex flex-col md:flex-row gap-4">
                        <div className="flex-1 relative">
                            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                            <Input
                                placeholder="Search by name, email, or employee ID..."
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
                    </div>
                </CardContent>
            </Card>

            <Card>
                <CardContent className="p-0">
                    <div className="overflow-x-auto">
                        <table className="data-table w-full">
                            <thead>
                                <tr>
                                    <th>Faculty Member</th>
                                    <th className="hidden md:table-cell">Employee ID</th>
                                    <th className="hidden lg:table-cell">Department</th>
                                    <th className="hidden sm:table-cell">Designation</th>
                                    <th>Status</th>
                                    <th className="text-right">Actions</th>
                                </tr>
                            </thead>
                            <tbody>
                                {loading && faculty.length === 0 ? (
                                    [...Array(3)].map((_, i) => (
                                        <tr key={i}>
                                            <td colSpan={6}><div className="h-12 skeleton rounded" /></td>
                                        </tr>
                                    ))
                                ) : (
                                    displayFaculty.map((member) => (
                                        <tr key={member.id}>
                                            <td>
                                                <div className="flex items-center gap-3">
                                                    <Avatar className="h-10 w-10">
                                                        <AvatarImage src={member.user?.avatar_url || undefined} />
                                                        <AvatarFallback>{member.user?.full_name?.charAt(0) || "F"}</AvatarFallback>
                                                    </Avatar>
                                                    <div>
                                                        <p className="font-medium">{member.user?.full_name || "Faculty"}</p>
                                                        <p className="text-xs text-muted-foreground">{member.user?.email}</p>
                                                    </div>
                                                </div>
                                            </td>
                                            <td className="hidden md:table-cell font-mono text-sm">{member.employee_id}</td>
                                            <td className="hidden lg:table-cell text-sm">{member.department}</td>
                                            <td className="hidden sm:table-cell text-sm">{member.designation}</td>
                                            <td>
                                                <Badge variant={STATUS_COLORS[member.status]} className="capitalize">
                                                    {member.status.replace("_", " ")}
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
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
