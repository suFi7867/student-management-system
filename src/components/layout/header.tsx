"use client"

import { useState } from "react"
import { Bell, Search, Moon, Sun, Settings } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
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

interface HeaderProps {
    title?: string
    user?: {
        name: string
        email: string
        avatar?: string
        role?: string
    }
}

export function Header({ title, user }: HeaderProps) {
    const [isDark, setIsDark] = useState(false)
    const [notifications] = useState([
        { id: 1, title: "New student registered", time: "5 min ago" },
        { id: 2, title: "Assignment submission deadline", time: "1 hour ago" },
        { id: 3, title: "System update completed", time: "2 hours ago" },
    ])

    const toggleTheme = () => {
        setIsDark(!isDark)
        document.documentElement.classList.toggle("dark")
    }

    return (
        <header className="h-16 bg-card border-b px-6 flex items-center justify-between sticky top-0 z-30">
            {/* Left: Title & Search */}
            <div className="flex items-center gap-6">
                {title && (
                    <h1 className="text-xl font-semibold text-foreground hidden sm:block">
                        {title}
                    </h1>
                )}
                <div className="relative w-64 hidden md:block">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    <Input
                        type="search"
                        placeholder="Search..."
                        className="pl-10 h-9 bg-muted/50 border-0 focus-visible:ring-1"
                    />
                </div>
            </div>

            {/* Right: Actions */}
            <div className="flex items-center gap-3">
                {/* Theme Toggle */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={toggleTheme}
                    className="h-9 w-9"
                >
                    {isDark ? (
                        <Sun className="h-4 w-4" />
                    ) : (
                        <Moon className="h-4 w-4" />
                    )}
                </Button>

                {/* Notifications */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" size="icon" className="h-9 w-9 relative">
                            <Bell className="h-4 w-4" />
                            <span className="absolute -top-1 -right-1 w-4 h-4 bg-destructive text-destructive-foreground text-xs rounded-full flex items-center justify-center">
                                3
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-80">
                        <DropdownMenuLabel className="flex items-center justify-between">
                            <span>Notifications</span>
                            <Button variant="ghost" size="sm" className="h-auto p-0 text-primary">
                                Mark all read
                            </Button>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        {notifications.map((notification) => (
                            <DropdownMenuItem key={notification.id} className="flex flex-col items-start py-3">
                                <span className="font-medium text-sm">{notification.title}</span>
                                <span className="text-xs text-muted-foreground">{notification.time}</span>
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="justify-center text-primary">
                            View all notifications
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>

                {/* User Menu */}
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-9 gap-2 px-2">
                            <Avatar className="h-7 w-7">
                                <AvatarImage src={user?.avatar} />
                                <AvatarFallback className="text-xs">
                                    {user?.name?.charAt(0) || "U"}
                                </AvatarFallback>
                            </Avatar>
                            <span className="hidden sm:inline-block text-sm font-medium">
                                {user?.name || "User"}
                            </span>
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end" className="w-56">
                        <DropdownMenuLabel>
                            <div className="flex flex-col">
                                <span>{user?.name || "User"}</span>
                                <span className="text-xs font-normal text-muted-foreground">
                                    {user?.email || "user@email.com"}
                                </span>
                            </div>
                        </DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                            <Settings className="mr-2 h-4 w-4" />
                            Settings
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <form action={signOut}>
                            <DropdownMenuItem asChild>
                                <button type="submit" className="w-full text-destructive cursor-pointer">
                                    Logout
                                </button>
                            </DropdownMenuItem>
                        </form>
                    </DropdownMenuContent>
                </DropdownMenu>
            </div>
        </header>
    )
}
