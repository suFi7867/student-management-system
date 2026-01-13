import { Suspense } from "react"
import Link from "next/link"
import {
    Users,
    GraduationCap,
    BookOpen,
    Clock,
    TrendingUp,
    TrendingDown,
    Plus,
    FileText,
    Bell,
    BarChart3,
    Calendar,
    ArrowUpRight,
    Activity,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { getAdminDashboardStats, getRecentActivity, getAnnouncements } from "../actions"

// Stats Card Component
function StatsCard({
    title,
    value,
    change,
    changeLabel,
    icon: Icon,
    iconColor,
    href,
}: {
    title: string
    value: number | string
    change?: number
    changeLabel?: string
    icon: React.ElementType
    iconColor: string
    href?: string
}) {
    const isPositive = change && change > 0
    const TrendIcon = isPositive ? TrendingUp : TrendingDown

    return (
        <Card hover className="relative overflow-hidden group">
            <div className={`absolute top-0 right-0 w-32 h-32 ${iconColor} opacity-5 rounded-full -translate-y-1/2 translate-x-1/2 group-hover:scale-110 transition-transform duration-300`} />
            <CardContent className="p-6">
                <div className="flex items-start justify-between">
                    <div>
                        <p className="text-sm font-medium text-muted-foreground">{title}</p>
                        <h3 className="text-3xl font-bold mt-2">{value.toLocaleString()}</h3>
                        {change !== undefined && (
                            <div className="flex items-center gap-1 mt-2">
                                <TrendIcon className={`w-4 h-4 ${isPositive ? "text-emerald-500" : "text-destructive"}`} />
                                <span className={`text-sm font-medium ${isPositive ? "text-emerald-500" : "text-destructive"}`}>
                                    {isPositive ? "+" : ""}{change}%
                                </span>
                                {changeLabel && (
                                    <span className="text-xs text-muted-foreground">{changeLabel}</span>
                                )}
                            </div>
                        )}
                    </div>
                    <div className={`p-3 rounded-xl ${iconColor} bg-opacity-10`}>
                        <Icon className={`w-6 h-6 ${iconColor.replace("bg-", "text-")}`} />
                    </div>
                </div>
                {href && (
                    <Link
                        href={href}
                        className="absolute inset-0 z-10"
                        aria-label={`View ${title}`}
                    />
                )}
            </CardContent>
        </Card>
    )
}

// Quick Actions Component
function QuickActions() {
    const actions = [
        { label: "Add Student", icon: Users, href: "/admin/students/add", color: "bg-sky-500" },
        { label: "Add Faculty", icon: GraduationCap, href: "/admin/faculty/add", color: "bg-purple-500" },
        { label: "Create Course", icon: BookOpen, href: "/admin/courses/add", color: "bg-emerald-500" },
        { label: "New Announcement", icon: Bell, href: "/admin/announcements/new", color: "bg-amber-500" },
        { label: "Generate Report", icon: FileText, href: "/admin/reports", color: "bg-rose-500" },
        { label: "View Analytics", icon: BarChart3, href: "/admin/analytics", color: "bg-indigo-500" },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    <Plus className="w-5 h-5" />
                    Quick Actions
                </CardTitle>
                <CardDescription>Common tasks and shortcuts</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {actions.map((action) => (
                        <Link
                            key={action.label}
                            href={action.href}
                            className="flex flex-col items-center gap-2 p-4 rounded-xl border-2 border-dashed border-muted hover:border-primary/50 hover:bg-muted/50 transition-all duration-200 group"
                        >
                            <div className={`p-2 rounded-lg ${action.color} bg-opacity-10 group-hover:bg-opacity-20 transition-colors`}>
                                <action.icon className={`w-5 h-5 ${action.color.replace("bg-", "text-")}`} />
                            </div>
                            <span className="text-sm font-medium text-center">{action.label}</span>
                        </Link>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Recent Activity Component
async function RecentActivity() {
    // Using dummy data since we don't have real activity yet
    const activities = [
        { id: 1, action: "Student registered", description: "John Doe registered as a new student", time: "5 min ago", type: "success" },
        { id: 2, action: "Grade uploaded", description: "Dr. Smith uploaded grades for CS101", time: "25 min ago", type: "info" },
        { id: 3, action: "Course created", description: "New course 'Advanced Algorithms' created", time: "1 hour ago", type: "info" },
        { id: 4, action: "System backup", description: "Automated backup completed successfully", time: "2 hours ago", type: "success" },
        { id: 5, action: "Announcement", description: "Holiday notice published", time: "3 hours ago", type: "warning" },
    ]

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Activity className="w-5 h-5" />
                        Recent Activity
                    </CardTitle>
                    <CardDescription>Latest system updates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                    View All
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-4">
                    {activities.map((activity) => (
                        <div key={activity.id} className="flex items-start gap-3 p-3 rounded-lg hover:bg-muted/50 transition-colors">
                            <div className={`w-2 h-2 mt-2 rounded-full ${activity.type === "success" ? "bg-emerald-500" :
                                activity.type === "warning" ? "bg-amber-500" : "bg-sky-500"
                                }`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium">{activity.action}</p>
                                <p className="text-xs text-muted-foreground truncate">{activity.description}</p>
                            </div>
                            <span className="text-xs text-muted-foreground whitespace-nowrap">{activity.time}</span>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Upcoming Events Component
function UpcomingEvents() {
    const events = [
        { id: 1, title: "Mid-Term Examinations", date: "Jan 15-20", type: "exam" },
        { id: 2, title: "Republic Day Holiday", date: "Jan 26", type: "holiday" },
        { id: 3, title: "Assignment Deadline - CS201", date: "Jan 18", type: "deadline" },
        { id: 4, title: "Faculty Meeting", date: "Jan 14", type: "event" },
        { id: 5, title: "Sports Day", date: "Feb 5", type: "event" },
    ]

    const getEventColor = (type: string) => {
        switch (type) {
            case "exam": return "bg-rose-500"
            case "holiday": return "bg-emerald-500"
            case "deadline": return "bg-amber-500"
            default: return "bg-sky-500"
        }
    }

    return (
        <Card>
            <CardHeader className="flex flex-row items-center justify-between">
                <div>
                    <CardTitle className="flex items-center gap-2">
                        <Calendar className="w-5 h-5" />
                        Upcoming Events
                    </CardTitle>
                    <CardDescription>Important dates</CardDescription>
                </div>
                <Button variant="ghost" size="sm" className="text-primary">
                    Calendar
                    <ArrowUpRight className="w-4 h-4 ml-1" />
                </Button>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {events.map((event) => (
                        <div key={event.id} className="flex items-center gap-3 p-3 rounded-lg border hover:border-primary/50 transition-colors">
                            <div className={`w-1 h-10 rounded-full ${getEventColor(event.type)}`} />
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{event.title}</p>
                                <p className="text-xs text-muted-foreground">{event.date}</p>
                            </div>
                            <Badge variant="outline" className="capitalize">
                                {event.type}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Top Performers Component
function TopPerformers() {
    const students = [
        { id: 1, name: "Priya Sharma", dept: "Computer Science", gpa: 9.8, avatar: null },
        { id: 2, name: "Rahul Kumar", dept: "Electronics", gpa: 9.7, avatar: null },
        { id: 3, name: "Anjali Singh", dept: "Mechanical", gpa: 9.6, avatar: null },
        { id: 4, name: "Vikram Patel", dept: "Computer Science", gpa: 9.5, avatar: null },
        { id: 5, name: "Sneha Gupta", dept: "Civil", gpa: 9.4, avatar: null },
    ]

    return (
        <Card>
            <CardHeader>
                <CardTitle className="flex items-center gap-2">
                    🏆 Top Performers
                </CardTitle>
                <CardDescription>Students with highest GPA</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="space-y-3">
                    {students.map((student, index) => (
                        <div key={student.id} className="flex items-center gap-3 p-2">
                            <span className="w-6 h-6 rounded-full bg-primary/10 text-primary text-xs font-bold flex items-center justify-center">
                                {index + 1}
                            </span>
                            <Avatar className="h-9 w-9">
                                <AvatarImage src={student.avatar || undefined} />
                                <AvatarFallback>{student.name.charAt(0)}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="text-sm font-medium truncate">{student.name}</p>
                                <p className="text-xs text-muted-foreground">{student.dept}</p>
                            </div>
                            <Badge variant="secondary" className="font-mono">
                                {student.gpa.toFixed(1)}
                            </Badge>
                        </div>
                    ))}
                </div>
            </CardContent>
        </Card>
    )
}

// Main Dashboard Page
export default async function AdminDashboard() {
    const stats = await getAdminDashboardStats()

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">Admin Dashboard</h1>
                    <p className="text-muted-foreground">Welcome back! Here&apos;s an overview of your institution.</p>
                </div>
                <div className="flex items-center gap-2">
                    <Button variant="outline" size="sm">
                        <FileText className="w-4 h-4 mr-2" />
                        Export Report
                    </Button>
                    <Button size="sm">
                        <Plus className="w-4 h-4 mr-2" />
                        Quick Add
                    </Button>
                </div>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 stagger-children">
                <StatsCard
                    title="Total Students"
                    value={stats.total_students || 1234}
                    change={stats.students_change}
                    changeLabel="this month"
                    icon={Users}
                    iconColor="bg-sky-500"
                    href="/admin/students"
                />
                <StatsCard
                    title="Total Faculty"
                    value={stats.total_faculty || 45}
                    change={stats.faculty_change}
                    changeLabel="this month"
                    icon={GraduationCap}
                    iconColor="bg-purple-500"
                    href="/admin/faculty"
                />
                <StatsCard
                    title="Active Courses"
                    value={stats.active_courses || 67}
                    change={stats.courses_change}
                    changeLabel="this semester"
                    icon={BookOpen}
                    iconColor="bg-emerald-500"
                    href="/admin/courses"
                />
                <StatsCard
                    title="Pending Approvals"
                    value={stats.pending_approvals || 12}
                    icon={Clock}
                    iconColor="bg-amber-500"
                    href="/admin/approvals"
                />
            </div>

            {/* Content Grid */}
            <div className="grid lg:grid-cols-3 gap-6">
                {/* Left Column */}
                <div className="lg:col-span-2 space-y-6">
                    <QuickActions />
                    <RecentActivity />
                </div>

                {/* Right Column */}
                <div className="space-y-6">
                    <UpcomingEvents />
                    <TopPerformers />
                </div>
            </div>
        </div>
    )
}
