"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { FileText, Download, BarChart2, PieChart, Users, DollarSign } from "lucide-react"

export default function AdminReportsPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Institutional Reports</h1>
                    <p className="text-muted-foreground">Generate and export comprehensive university data</p>
                </div>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[
                    { title: "Academic Performance", desc: "Detailed GPA analysis by department and semester", icon: BarChart2, color: "bg-blue-500" },
                    { title: "Enrollment Statistics", desc: "Student registration trends and target auditing", icon: Users, color: "bg-emerald-500" },
                    { title: "Attendance Insights", desc: "Daily, monthly and semester-wise attendance logs", icon: PieChart, color: "bg-purple-500" },
                    { title: "Faculty Workload", desc: "Course assignment and credit hours per teacher", icon: FileText, color: "bg-amber-500" },
                    { title: "Financial Overview", desc: "Fee collection, scholarship disbursements and dues", icon: DollarSign, color: "bg-rose-500" },
                ].map((report, i) => (
                    <Card key={i} hover className="group">
                        <CardHeader>
                            <div className={`${report.color} w-10 h-10 rounded-lg flex items-center justify-center text-white mb-2`}>
                                <report.icon className="w-5 h-5" />
                            </div>
                            <CardTitle>{report.title}</CardTitle>
                            <CardDescription>{report.desc}</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <Button className="w-full gap-2">
                                <Download className="w-4 h-4" />
                                Generate CSV/PDF
                            </Button>
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Card>
                <CardHeader>
                    <CardTitle>Recent Generated Reports</CardTitle>
                </CardHeader>
                <CardContent>
                    <div className="space-y-2">
                        {[
                            { name: "Sem_4_Result_Summary.pdf", date: "2 hours ago", size: "2.4 MB" },
                            { name: "Faculty_Workload_2024.csv", date: "Yesterday", size: "45 KB" },
                            { name: "Student_Attendance_May.pdf", date: "3 days ago", size: "12.1 MB" },
                        ].map((file, i) => (
                            <div key={i} className="flex items-center justify-between p-3 border rounded-lg hover:bg-muted/50 transition-colors">
                                <div className="flex items-center gap-3">
                                    <FileText className="w-5 h-5 text-muted-foreground" />
                                    <div>
                                        <div className="text-sm font-medium">{file.name}</div>
                                        <div className="text-[10px] text-muted-foreground">{file.size} • {file.date}</div>
                                    </div>
                                </div>
                                <Button variant="ghost" size="sm">Download</Button>
                            </div>
                        ))}
                    </div>
                </CardContent>
            </Card>
        </div>
    )
}
