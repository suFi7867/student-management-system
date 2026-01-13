"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Award, TrendingUp, UserCheck, AlertTriangle } from "lucide-react"

export default function AdminGradesPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">University Grade Analytics</h1>
                    <p className="text-muted-foreground">Monitor performance metrics and GPA distribution</p>
                </div>
                <Button>Generate Report Card</Button>
            </div>

            <div className="grid md:grid-cols-4 gap-4">
                {[
                    { label: "Avg. University GPA", value: "8.4", icon: Award, color: "text-amber-500" },
                    { label: "Pass Percentage", value: "94.2%", icon: UserCheck, color: "text-emerald-500" },
                    { label: "Performance Trend", value: "+0.3", icon: TrendingUp, color: "text-sky-500" },
                    { label: "At Risk Students", value: "24", icon: AlertTriangle, color: "text-rose-500" },
                ].map((stat, i) => (
                    <Card key={i}>
                        <CardContent className="p-4 flex items-center gap-4">
                            <div className={`p-2 rounded-lg bg-muted`}>
                                <stat.icon className={`w-5 h-5 ${stat.color}`} />
                            </div>
                            <div>
                                <p className="text-xs text-muted-foreground">{stat.label}</p>
                                <p className="text-xl font-bold">{stat.value}</p>
                            </div>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
                <Card>
                    <CardHeader>
                        <CardTitle>Top Performing Departments</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { name: "Computer Science", avg: "8.9", progress: 89 },
                                { name: "Information Technology", avg: "8.7", progress: 87 },
                                { name: "Electronics", avg: "8.2", progress: 82 },
                            ].map((dept, i) => (
                                <div key={i} className="space-y-2">
                                    <div className="flex justify-between text-sm">
                                        <span>{dept.name}</span>
                                        <span className="font-bold">{dept.avg} GPA</span>
                                    </div>
                                    <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
                                        <div className="h-full bg-primary" style={{ width: `${dept.progress}%` }} />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardHeader>
                        <CardTitle>Recent Grade Submissions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <div className="space-y-4">
                            {[
                                { prof: "Dr. Sharma", course: "Database Systems", count: "45 Students", date: "Today" },
                                { prof: "Prof. Gupta", course: "Web Tech", count: "52 Students", date: "Yesterday" },
                                { prof: "Dr. Verma", course: "Networks", count: "38 Students", date: "2 days ago" },
                            ].map((row, i) => (
                                <div key={i} className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/30 transition-colors">
                                    <div>
                                        <div className="text-sm font-semibold">{row.course}</div>
                                        <div className="text-xs text-muted-foreground">Submitted by {row.prof}</div>
                                    </div>
                                    <div className="text-right">
                                        <Badge variant="outline">{row.count}</Badge>
                                        <div className="text-[10px] text-muted-foreground mt-1">{row.date}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    )
}
