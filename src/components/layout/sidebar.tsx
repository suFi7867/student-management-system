"use client"

import { useState } from "react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import {
    LayoutDashboard,
    Users,
    GraduationCap,
    BookOpen,
    Calendar,
    ClipboardCheck,
    BarChart3,
    Settings,
    Bell,
    MessageSquare,
    ChevronLeft,
    ChevronRight,
    LogOut,
    Menu,
    X,
    FileText,
    Award,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { signOut } from "@/app/auth/actions"

interface NavItem {
    title: string
    href: string
    icon: React.ElementType
    badge?: number
}

interface SidebarProps {
    role: "admin" | "faculty" | "student"
    user?: {
        name: string
        email: string
        avatar?: string
    }
}

const adminNavItems: NavItem[] = [
    { title: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
    { title: "Students", href: "/admin/students", icon: Users, badge: 1234 },
    { title: "Faculty", href: "/admin/faculty", icon: GraduationCap },
    { title: "Courses", href: "/admin/courses", icon: BookOpen },
    { title: "Attendance", href: "/admin/attendance", icon: ClipboardCheck },
    { title: "Grades", href: "/admin/grades", icon: Award },
    { title: "Reports", href: "/admin/reports", icon: BarChart3 },
    { title: "Announcements", href: "/admin/announcements", icon: Bell },
    { title: "Settings", href: "/admin/settings", icon: Settings },
]

const facultyNavItems: NavItem[] = [
    { title: "Dashboard", href: "/faculty/dashboard", icon: LayoutDashboard },
    { title: "My Courses", href: "/faculty/courses", icon: BookOpen },
    { title: "My Students", href: "/faculty/students", icon: Users },
    { title: "Attendance", href: "/faculty/attendance", icon: ClipboardCheck },
    { title: "Grades", href: "/faculty/grades", icon: Award },
    { title: "Schedule", href: "/faculty/schedule", icon: Calendar },
    { title: "Assignments", href: "/faculty/assignments", icon: FileText },
    { title: "Messages", href: "/faculty/messages", icon: MessageSquare },
]

const studentNavItems: NavItem[] = [
    { title: "Dashboard", href: "/student/dashboard", icon: LayoutDashboard },
    { title: "My Courses", href: "/student/courses", icon: BookOpen },
    { title: "Attendance", href: "/student/attendance", icon: ClipboardCheck },
    { title: "Grades", href: "/student/grades", icon: Award },
    { title: "Schedule", href: "/student/schedule", icon: Calendar },
    { title: "Assignments", href: "/student/assignments", icon: FileText },
    { title: "Profile", href: "/student/profile", icon: Users },
    { title: "Messages", href: "/student/messages", icon: MessageSquare },
]

export function Sidebar({ role, user }: SidebarProps) {
    const [isCollapsed, setIsCollapsed] = useState(false)
    const [isMobileOpen, setIsMobileOpen] = useState(false)
    const pathname = usePathname()

    const navItems = role === "admin" ? adminNavItems : role === "faculty" ? facultyNavItems : studentNavItems

    const roleLabel = role === "admin" ? "Administrator" : role === "faculty" ? "Faculty" : "Student"
    const roleColor = role === "admin" ? "bg-purple-500" : role === "faculty" ? "bg-sky-500" : "bg-emerald-500"

    return (
        <>
            {/* Mobile Menu Button */}
            <button
                className="lg:hidden fixed top-4 left-4 z-50 p-2 rounded-lg bg-card shadow-lg border"
                onClick={() => setIsMobileOpen(!isMobileOpen)}
            >
                {isMobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>

            {/* Mobile Overlay */}
            {isMobileOpen && (
                <div
                    className="lg:hidden fixed inset-0 bg-black/50 z-40"
                    onClick={() => setIsMobileOpen(false)}
                />
            )}

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 h-screen bg-card border-r transition-all duration-300 flex flex-col",
                    isCollapsed ? "w-20" : "w-64",
                    isMobileOpen ? "translate-x-0" : "-translate-x-full lg:translate-x-0"
                )}
            >
                {/* Logo */}
                <div className={cn(
                    "flex items-center h-16 px-4 border-b",
                    isCollapsed ? "justify-center" : "gap-3"
                )}>
                    <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shrink-0">
                        <GraduationCap className="w-6 h-6 text-white" />
                    </div>
                    {!isCollapsed && (
                        <div className="flex flex-col">
                            <span className="font-bold text-lg">OSMS</span>
                            <span className="text-xs text-muted-foreground">Uttaranchal University</span>
                        </div>
                    )}
                </div>

                {/* User Info */}
                <div className={cn(
                    "p-4 border-b",
                    isCollapsed && "flex justify-center"
                )}>
                    {isCollapsed ? (
                        <Avatar className="h-10 w-10">
                            <AvatarImage src={user?.avatar} />
                            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                        </Avatar>
                    ) : (
                        <div className="flex items-center gap-3">
                            <Avatar className="h-12 w-12">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
                            </Avatar>
                            <div className="flex-1 min-w-0">
                                <p className="font-medium text-sm truncate">{user?.name || "User"}</p>
                                <div className="flex items-center gap-2">
                                    <span className={cn("w-2 h-2 rounded-full", roleColor)} />
                                    <span className="text-xs text-muted-foreground">{roleLabel}</span>
                                </div>
                            </div>
                        </div>
                    )}
                </div>

                {/* Navigation */}
                <nav className="flex-1 p-3 overflow-y-auto">
                    <ul className="space-y-1">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href || pathname.startsWith(item.href + "/")
                            return (
                                <li key={item.href}>
                                    <Link
                                        href={item.href}
                                        className={cn(
                                            "flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-primary text-primary-foreground shadow-md"
                                                : "text-muted-foreground hover:bg-muted hover:text-foreground",
                                            isCollapsed && "justify-center"
                                        )}
                                        onClick={() => setIsMobileOpen(false)}
                                        title={isCollapsed ? item.title : undefined}
                                    >
                                        <item.icon className="h-5 w-5 shrink-0" />
                                        {!isCollapsed && (
                                            <>
                                                <span className="flex-1">{item.title}</span>
                                                {item.badge && (
                                                    <span className="text-xs bg-primary/10 text-primary px-2 py-0.5 rounded-full">
                                                        {item.badge > 999 ? "999+" : item.badge}
                                                    </span>
                                                )}
                                            </>
                                        )}
                                    </Link>
                                </li>
                            )
                        })}
                    </ul>
                </nav>

                {/* Footer Actions */}
                <div className="p-3 border-t space-y-2">
                    {/* Collapse Button (Desktop Only) */}
                    <button
                        onClick={() => setIsCollapsed(!isCollapsed)}
                        className="hidden lg:flex w-full items-center gap-3 px-3 py-2 rounded-lg text-sm text-muted-foreground hover:bg-muted hover:text-foreground transition-colors"
                        title={isCollapsed ? "Expand" : "Collapse"}
                    >
                        {isCollapsed ? (
                            <ChevronRight className="h-5 w-5 mx-auto" />
                        ) : (
                            <>
                                <ChevronLeft className="h-5 w-5" />
                                <span>Collapse</span>
                            </>
                        )}
                    </button>

                    {/* Logout */}
                    <form action={signOut}>
                        <button
                            type="submit"
                            className={cn(
                                "w-full flex items-center gap-3 px-3 py-2 rounded-lg text-sm text-destructive hover:bg-destructive/10 transition-colors",
                                isCollapsed && "justify-center"
                            )}
                        >
                            <LogOut className="h-5 w-5 shrink-0" />
                            {!isCollapsed && <span>Logout</span>}
                        </button>
                    </form>
                </div>
            </aside>
        </>
    )
}
