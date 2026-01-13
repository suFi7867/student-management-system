import {
    Award,
    Download,
    BookOpen,
    TrendingUp,
    TrendingDown,
} from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

// Progress Bar Component
function ProgressBar({ value, className, color }: { value: number; className?: string; color?: string }) {
    return (
        <div className={`h-2 w-full bg-muted rounded-full overflow-hidden ${className}`}>
            <div
                className={`h-full rounded-full transition-all duration-500 ${color || "bg-primary"}`}
                style={{ width: `${value}%` }}
            />
        </div>
    )
}

export default function StudentGradesPage() {
    // Dummy data
    const currentSemester = {
        semester: 5,
        year: "2024-25",
        sgpa: 8.7,
        cgpa: 8.5,
        credits: 22,
        totalCredits: 110,
    }

    const semesterGrades = [
        { semester: 1, sgpa: 8.2, credits: 22, year: "2022-23" },
        { semester: 2, sgpa: 8.4, credits: 22, year: "2022-23" },
        { semester: 3, sgpa: 8.6, credits: 22, year: "2023-24" },
        { semester: 4, sgpa: 8.5, credits: 22, year: "2023-24" },
        { semester: 5, sgpa: 8.7, credits: 22, year: "2024-25" },
    ]

    const currentCourses = [
        { code: "CS301", name: "Data Structures", credits: 4, midterm: 35, midtermMax: 40, assignments: 18, assignmentsMax: 20, quizzes: 8, quizzesMax: 10, total: 85, grade: "A" },
        { code: "CS302", name: "Algorithms", credits: 4, midterm: 32, midtermMax: 40, assignments: 16, assignmentsMax: 20, quizzes: 7, quizzesMax: 10, total: 78, grade: "B+" },
        { code: "CS303", name: "Database Systems", credits: 3, midterm: 38, midtermMax: 40, assignments: 19, assignmentsMax: 20, quizzes: 9, quizzesMax: 10, total: 92, grade: "A+" },
        { code: "CS304", name: "Computer Networks", credits: 3, midterm: 30, midtermMax: 40, assignments: 15, assignmentsMax: 20, quizzes: 6, quizzesMax: 10, total: 72, grade: "B+" },
        { code: "CS305", name: "Operating Systems", credits: 4, midterm: 33, midtermMax: 40, assignments: 17, assignmentsMax: 20, quizzes: 8, quizzesMax: 10, total: 81, grade: "A" },
        { code: "MA301", name: "Probability & Statistics", credits: 4, midterm: 28, midtermMax: 40, assignments: 14, assignmentsMax: 20, quizzes: 7, quizzesMax: 10, total: 68, grade: "B" },
    ]

    const getGradeColor = (grade: string) => {
        switch (grade) {
            case "A+":
            case "A":
                return "success"
            case "B+":
            case "B":
                return "info"
            case "C":
                return "warning"
            default:
                return "secondary"
        }
    }

    const getGradePoints = (grade: string) => {
        const points: Record<string, number> = {
            "A+": 10,
            "A": 9,
            "B+": 8,
            "B": 7,
            "C": 6,
            "D": 5,
            "F": 0,
        }
        return points[grade] || 0
    }

    return (
        <div className="space-y-6 animate-fadeIn">
            {/* Page Header */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
                <div>
                    <h1 className="text-2xl font-bold">My Grades</h1>
                    <p className="text-muted-foreground">View your academic performance and grades</p>
                </div>
                <Button variant="outline">
                    <Download className="w-4 h-4 mr-2" />
                    Download Transcript
                </Button>
            </div>

            {/* CGPA Overview */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card>
                    <CardContent className="p-6">
                        <div className="flex items-center justify-between">
                            <div>
                                <p className="text-sm text-muted-foreground">Current CGPA</p>
                                <h3 className="text-3xl font-bold mt-1">{currentSemester.cgpa}</h3>
                                <p className="text-xs text-emerald-500 mt-1 flex items-center gap-1">
                                    <TrendingUp className="w-3 h-3" />
                                    +0.2 from last semester
                                </p>
                            </div>
                            <div className="p-3 rounded-xl bg-amber-500/10">
                                <Award className="w-6 h-6 text-amber-500" />
                            </div>
                        </div>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">Current SGPA</p>
                        <h3 className="text-3xl font-bold mt-1">{currentSemester.sgpa}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            Semester {currentSemester.semester}
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">Credits Earned</p>
                        <h3 className="text-3xl font-bold mt-1">{currentSemester.totalCredits}</h3>
                        <ProgressBar value={(currentSemester.totalCredits / 160) * 100} className="mt-2" />
                        <p className="text-xs text-muted-foreground mt-1">
                            {currentSemester.totalCredits}/160 total
                        </p>
                    </CardContent>
                </Card>

                <Card>
                    <CardContent className="p-6">
                        <p className="text-sm text-muted-foreground">Current Semester</p>
                        <h3 className="text-3xl font-bold mt-1">{currentSemester.semester}</h3>
                        <p className="text-xs text-muted-foreground mt-1">
                            {currentSemester.year}
                        </p>
                    </CardContent>
                </Card>
            </div>

            {/* Tabs */}
            <Tabs defaultValue="current" className="space-y-6">
                <TabsList>
                    <TabsTrigger value="current">Current Semester</TabsTrigger>
                    <TabsTrigger value="history">Grade History</TabsTrigger>
                </TabsList>

                {/* Current Semester */}
                <TabsContent value="current" className="space-y-6">
                    <Card>
                        <CardHeader>
                            <CardTitle>Semester {currentSemester.semester} Grades</CardTitle>
                            <CardDescription>Your performance in current semester courses</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="overflow-x-auto">
                                <table className="data-table w-full">
                                    <thead>
                                        <tr>
                                            <th>Course</th>
                                            <th className="text-center">Credits</th>
                                            <th className="text-center hidden sm:table-cell">Mid-Term</th>
                                            <th className="text-center hidden md:table-cell">Assignments</th>
                                            <th className="text-center hidden lg:table-cell">Quizzes</th>
                                            <th className="text-center">Total</th>
                                            <th className="text-center">Grade</th>
                                            <th className="text-center hidden sm:table-cell">Points</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {currentCourses.map((course) => (
                                            <tr key={course.code}>
                                                <td>
                                                    <div>
                                                        <span className="font-mono text-primary text-sm">{course.code}</span>
                                                        <p className="font-medium">{course.name}</p>
                                                    </div>
                                                </td>
                                                <td className="text-center">{course.credits}</td>
                                                <td className="text-center hidden sm:table-cell">
                                                    <span className={course.midterm / course.midtermMax >= 0.6 ? "text-emerald-500" : "text-destructive"}>
                                                        {course.midterm}/{course.midtermMax}
                                                    </span>
                                                </td>
                                                <td className="text-center hidden md:table-cell">
                                                    {course.assignments}/{course.assignmentsMax}
                                                </td>
                                                <td className="text-center hidden lg:table-cell">
                                                    {course.quizzes}/{course.quizzesMax}
                                                </td>
                                                <td className="text-center font-medium">{course.total}%</td>
                                                <td className="text-center">
                                                    <Badge variant={getGradeColor(course.grade) as "success" | "info" | "warning" | "secondary"}>
                                                        {course.grade}
                                                    </Badge>
                                                </td>
                                                <td className="text-center hidden sm:table-cell font-mono">
                                                    {getGradePoints(course.grade)}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>

                {/* Grade History */}
                <TabsContent value="history" className="space-y-6">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
                        {semesterGrades.map((sem) => (
                            <Card key={sem.semester} hover className={sem.semester === currentSemester.semester ? "border-primary" : ""}>
                                <CardContent className="p-4">
                                    <div className="flex items-center justify-between mb-2">
                                        <Badge variant="outline">Semester {sem.semester}</Badge>
                                        <span className="text-xs text-muted-foreground">{sem.year}</span>
                                    </div>
                                    <div className="text-center py-4">
                                        <p className="text-4xl font-bold">{sem.sgpa}</p>
                                        <p className="text-sm text-muted-foreground">SGPA</p>
                                    </div>
                                    <div className="text-center text-sm text-muted-foreground">
                                        {sem.credits} Credits
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>

                    {/* CGPA Trend */}
                    <Card>
                        <CardHeader>
                            <CardTitle>CGPA Progression</CardTitle>
                            <CardDescription>Your cumulative performance over semesters</CardDescription>
                        </CardHeader>
                        <CardContent>
                            <div className="flex items-end gap-4 h-48">
                                {semesterGrades.map((sem, index) => {
                                    const prevSgpa = index > 0 ? semesterGrades[index - 1].sgpa : sem.sgpa
                                    const isUp = sem.sgpa >= prevSgpa
                                    return (
                                        <div key={sem.semester} className="flex-1 flex flex-col items-center gap-2">
                                            <div className="flex items-center gap-1">
                                                {index > 0 && (
                                                    isUp ? (
                                                        <TrendingUp className="w-4 h-4 text-emerald-500" />
                                                    ) : (
                                                        <TrendingDown className="w-4 h-4 text-destructive" />
                                                    )
                                                )}
                                                <span className="text-sm font-medium">{sem.sgpa}</span>
                                            </div>
                                            <div
                                                className="w-full bg-primary rounded-t-lg transition-all duration-500"
                                                style={{ height: `${(sem.sgpa / 10) * 100}%` }}
                                            />
                                            <span className="text-xs text-muted-foreground">S{sem.semester}</span>
                                        </div>
                                    )
                                })}
                            </div>
                        </CardContent>
                    </Card>
                </TabsContent>
            </Tabs>
        </div>
    )
}
