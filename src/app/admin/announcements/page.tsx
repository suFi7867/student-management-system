"use client"

import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Bell, Plus, Pin, Megaphone } from "lucide-react"

export default function AdminAnnouncementsPage() {
    return (
        <div className="space-y-6 animate-fadeIn">
            <div className="flex justify-between items-center">
                <div>
                    <h1 className="text-2xl font-bold">Announcements</h1>
                    <p className="text-muted-foreground">Broadcast messages to students and faculty</p>
                </div>
                <Button className="gap-2">
                    <Plus className="w-4 h-4" />
                    New Broadcast
                </Button>
            </div>

            <div className="grid lg:grid-cols-3 gap-6">
                <div className="lg:col-span-2 space-y-4">
                    {[
                        { title: "Upcoming Semester Exams", content: "Final exams for the current semester will commence from June 15th. Please download the schedule...", date: "May 10, 2024", priority: "high", pinned: true },
                        { title: "University Convocation 2024", content: "Batch of 2023-24 is invited for the annual convocation ceremony. Registration details sent to email.", date: "May 08, 2024", priority: "normal", pinned: false },
                        { title: "Summer Internship Portal", content: "The internship portal is now live for all 3rd year students. Application deadline: May 30th.", date: "May 05, 2024", priority: "normal", pinned: false },
                    ].map((item, i) => (
                        <Card key={i} className={item.pinned ? "border-primary/50 shadow-sm" : ""}>
                            <CardHeader className="pb-2">
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-2">
                                        <CardTitle className="text-lg">{item.title}</CardTitle>
                                        {item.pinned && <Pin className="w-4 h-4 text-primary" />}
                                    </div>
                                    <Badge variant={item.priority === "high" ? "destructive" : "secondary"}>
                                        {item.priority}
                                    </Badge>
                                </div>
                                <CardDescription>{item.date}</CardDescription>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground line-clamp-2">{item.content}</p>
                                <div className="mt-4 flex gap-2">
                                    <Button variant="outline" size="sm">Edit</Button>
                                    <Button variant="ghost" size="sm" className="text-destructive">Delete</Button>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>

                <div className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle className="text-md flex items-center gap-2">
                                <Megaphone className="w-4 h-4 text-primary" />
                                Broadcast Stats
                            </CardTitle>
                        </CardHeader>
                        <CardContent className="space-y-4">
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Total Active</span>
                                <span className="font-bold">12</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Reach Rate</span>
                                <span className="font-bold">98.5%</span>
                            </div>
                            <div className="flex justify-between items-center">
                                <span className="text-sm text-muted-foreground">Pinned Notices</span>
                                <span className="font-bold">3</span>
                            </div>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </div>
    )
}
