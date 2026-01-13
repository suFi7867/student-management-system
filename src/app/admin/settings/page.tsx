"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Settings, Shield, Bell, Lock, Database, Globe } from "lucide-react"

export default function AdminSettingsPage() {
    return (
        <div className="space-y-6 animate-fadeIn text-slate-900 dark:text-slate-100">
            <div>
                <h1 className="text-2xl font-bold">System Settings</h1>
                <p className="text-muted-foreground">Configure university-wide parameters and security</p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md">General</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Globe className="w-4 h-4" />
                                Institution Profile
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Calendar className="w-4 h-4" />
                                Academic Sessions
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2 text-primary">
                                <Settings className="w-4 h-4" />
                                System Preferences
                            </Button>
                        </CardContent>
                    </Card>

                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md">Security</CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-2">
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Lock className="w-4 h-4" />
                                Authentication Rules
                            </Button>
                            <Button variant="ghost" className="w-full justify-start gap-2">
                                <Shield className="w-4 h-4" />
                                Role Permissions
                            </Button>
                        </CardContent>
                    </Card>
                </div>

                <div className="md:col-span-2 space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Core Configuration</CardTitle>
                            <CardDescription>Main system parameters for the academic year</CardDescription>
                        </CardHeader>
                        <CardContent className="space-y-6">
                            <div className="grid grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold">Current Semester</label>
                                    <Badge>Spring 2024</Badge>
                                </div>
                                <div className="space-y-1">
                                    <label className="text-xs font-semibold">System Mode</label>
                                    <Badge variant="success">Production</Badge>
                                </div>
                            </div>

                            <div className="space-y-4 pt-4 border-t">
                                <h4 className="text-sm font-semibold">Automated Features</h4>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm">Attendance Notifications</div>
                                        <div className="text-xs text-muted-foreground">Notify parents on students absence</div>
                                    </div>
                                    <Button size="sm" variant="outline">Disable</Button>
                                </div>
                                <div className="flex items-center justify-between">
                                    <div className="space-y-0.5">
                                        <div className="text-sm">Auto-Grade Calculation</div>
                                        <div className="text-xs text-muted-foreground">Calculate GPA automatically</div>
                                    </div>
                                    <Button size="sm">Enable</Button>
                                </div>
                            </div>
                        </CardContent>
                    </Card>

                    <Card className="border-rose-500/20">
                        <CardHeader>
                            <CardTitle className="text-rose-500 flex items-center gap-2">
                                <Database className="w-4 h-4" />
                                Danger Zone
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="flex gap-4">
                            <Button variant="destructive">Reset Academic Data</Button>
                            <Button variant="outline" className="text-rose-500 hover:bg-rose-500/10">Purge Logs</Button>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}

function Calendar(props: any) {
    return (
        <svg
            {...props}
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
        >
            <path d="M8 2v4" />
            <path d="M16 2v4" />
            <rect width="18" height="18" x="3" y="4" rx="2" />
            <path d="M3 10h18" />
        </svg>
    )
}
