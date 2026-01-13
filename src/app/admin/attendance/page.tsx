"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ClipboardCheck, Calendar, CheckCircle2, XCircle, Clock } from "lucide-react"

export default function AdminAttendancePage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div>
                <h1 className="text-2xl font-bold">University Attendance Meta-Data</h1>
                <p className="text-muted-foreground">Global attendance tracking across all departments</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <Card className="bg-emerald-500/10 border-emerald-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-emerald-600 dark:text-emerald-400 text-lg">Today&apos;s Presence</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">92.4%</div>
                        <p className="text-xs text-muted-foreground mt-1">+2.1% from yesterday</p>
                    </CardContent>
                </Card>
                <Card className="bg-amber-500/10 border-amber-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-amber-600 dark:text-amber-400 text-lg">Late Comers</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">4.2%</div>
                        <p className="text-xs text-muted-foreground mt-1">-1.5% from last week</p>
                    </CardContent>
                </Card>
                <Card className="bg-rose-500/10 border-rose-500/20">
                    <CardHeader className="pb-2">
                        <CardTitle className="text-rose-600 dark:text-rose-400 text-lg">Absenteeism Rate</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="text-3xl font-bold">3.4%</div>
                        <p className="text-xs text-muted-foreground mt-1">Steady</p>
                    </CardContent>
                </Card>
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Attendance Logs</CardTitle>
                    <CardDescription>Live feed of attendance marking by faculty</CardDescription>
                </CardHeader>
                <CardContent>
                    <div className="space-y-4">
                        {[
                            { dept: "Computer Science", course: "DBMS", faculty: "Dr. Sharma", status: "Completed", time: "10 mins ago" },
                            { dept: "Mechanical", course: "Thermodynamics", faculty: "Prof. Khan", status: "Ongoing", time: "Just now" },
                            { dept: "Civil", course: "Surveying", faculty: "Prof. Singh", status: "Completed", time: "1 hour ago" },
                        ].map((log, i) => (
                            <div key={i} className="flex items-center justify-between p-4 rounded-xl border bg-card/50">
                                <div className="flex items-center gap-4">
                                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                                        <ClipboardCheck className="w-5 h-5 text-primary" />
                                    </div>
                                    <div>
                                        <div className="font-semibold">{log.course} ({log.dept})</div>
                                        <div className="text-xs text-muted-foreground">Marked by {log.faculty}</div>
                                    </div>
                                </div>
                                <div className="text-right">
                                    <Badge variant={log.status === "Completed" ? "success" : "warning"}>{log.status}</Badge>
                                    <div className="text-[10px] text-muted-foreground mt-1">{log.time}</div>
                                </div>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
