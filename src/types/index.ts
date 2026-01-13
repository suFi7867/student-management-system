// User & Authentication Types
export type UserRole = "admin" | "faculty" | "student"

export interface User {
    id: string
    email: string
    role: UserRole
    full_name: string
    phone?: string
    avatar_url?: string
    is_active: boolean
    created_at: string
    updated_at: string
}

export interface Student {
    id: string
    user_id: string
    enrollment_number: string
    department: string
    year: number
    semester: number
    section?: string
    date_of_birth?: string
    address?: string
    guardian_name?: string
    guardian_phone?: string
    blood_group?: string
    admission_date: string
    status: "active" | "inactive" | "graduated" | "suspended"
    user?: User
}

export interface Faculty {
    id: string
    user_id: string
    employee_id: string
    department: string
    designation: string
    qualification: string[]
    specialization?: string
    experience_years: number
    joining_date: string
    status: "active" | "inactive" | "on_leave"
    user?: User
}

// Course & Academic Types
export interface Course {
    id: string
    code: string
    name: string
    description?: string
    credits: number
    department: string
    semester: number
    year: number
    faculty_id?: string
    max_students: number
    schedule?: CourseSchedule[]
    syllabus?: string
    status: "active" | "inactive" | "archived"
    created_at: string
    faculty?: Faculty
}

export interface CourseSchedule {
    day: string
    start_time: string
    end_time: string
    room: string
}

export interface Enrollment {
    id: string
    student_id: string
    course_id: string
    enrollment_date: string
    status: "enrolled" | "dropped" | "completed"
    final_grade?: string
    student?: Student
    course?: Course
}

// Attendance Types
export type AttendanceStatus = "present" | "absent" | "late" | "excused"

export interface Attendance {
    id: string
    student_id: string
    course_id: string
    date: string
    status: AttendanceStatus
    remarks?: string
    marked_by: string
    created_at: string
    student?: Student
    course?: Course
}

export interface AttendanceSummary {
    course_id: string
    course_name: string
    total_classes: number
    present: number
    absent: number
    late: number
    excused: number
    percentage: number
}

// Grade Types
export type AssessmentType = "quiz" | "assignment" | "midterm" | "final" | "project" | "practical"

export interface Grade {
    id: string
    student_id: string
    course_id: string
    assessment_type: AssessmentType
    assessment_name: string
    marks_obtained: number
    max_marks: number
    weightage: number
    graded_by: string
    graded_at: string
    remarks?: string
    student?: Student
    course?: Course
}

export interface GradeSummary {
    course_id: string
    course_code: string
    course_name: string
    credits: number
    total_marks: number
    obtained_marks: number
    percentage: number
    grade: string
    grade_points: number
}

// Assignment Types
export interface Assignment {
    id: string
    course_id: string
    title: string
    description: string
    due_date: string
    max_marks: number
    attachment_url?: string
    status: "draft" | "published" | "closed"
    created_by: string
    created_at: string
    course?: Course
}

export interface AssignmentSubmission {
    id: string
    assignment_id: string
    student_id: string
    submission_url: string
    submitted_at: string
    marks_obtained?: number
    feedback?: string
    status: "submitted" | "graded" | "late"
    assignment?: Assignment
    student?: Student
}

// Communication Types
export interface Announcement {
    id: string
    title: string
    content: string
    priority: "low" | "normal" | "high" | "urgent"
    audience: "all" | "students" | "faculty" | "department"
    department?: string
    created_by: string
    created_at: string
    expires_at?: string
    is_pinned: boolean
    views: number
}

export interface Message {
    id: string
    sender_id: string
    receiver_id: string
    content: string
    is_read: boolean
    created_at: string
    sender?: User
    receiver?: User
}

// Dashboard Stats Types
export interface AdminStats {
    total_students: number
    total_faculty: number
    active_courses: number
    pending_approvals: number
    students_change: number
    faculty_change: number
    courses_change: number
}

export interface FacultyStats {
    total_courses: number
    total_students: number
    pending_grades: number
    upcoming_classes: number
}

export interface StudentStats {
    enrolled_courses: number
    overall_attendance: number
    cgpa: number
    pending_assignments: number
}

// Activity Types
export interface ActivityLog {
    id: string
    user_id: string
    action: string
    description: string
    metadata?: Record<string, unknown>
    created_at: string
    user?: User
}

// Form Types
export interface LoginFormData {
    email: string
    password: string
    remember_me: boolean
}

export interface RegisterFormData {
    email: string
    password: string
    confirm_password: string
    full_name: string
    phone?: string
    role: UserRole
}

export interface StudentFormData {
    email: string
    password: string
    full_name: string
    phone: string
    department: string
    year: number
    semester: number
    section?: string
    date_of_birth?: string
    address?: string
    guardian_name?: string
    guardian_phone?: string
}

export interface FacultyFormData {
    email: string
    password: string
    full_name: string
    phone: string
    department: string
    designation: string
    qualification: string[]
    specialization?: string
    experience_years: number
}

export interface CourseFormData {
    code: string
    name: string
    description?: string
    credits: number
    department: string
    semester: number
    year: number
    faculty_id?: string
    max_students: number
    syllabus?: string
}

// API Response Types
export interface ApiResponse<T> {
    success: boolean
    data?: T
    error?: string
    message?: string
}

export interface PaginatedResponse<T> {
    data: T[]
    total: number
    page: number
    per_page: number
    total_pages: number
}

// Table Types
export interface TableColumn<T> {
    key: keyof T | string
    label: string
    sortable?: boolean
    render?: (value: unknown, item: T) => React.ReactNode
}

export interface SortConfig {
    key: string
    direction: "asc" | "desc"
}

export interface FilterConfig {
    key: string
    value: string | number | boolean
}
