"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"

// Dashboard Statistics
export async function getAdminDashboardStats() {
    const supabase = await createClient()

    try {
        // Get counts
        const [studentsResult, facultyResult, coursesResult] = await Promise.all([
            supabase.from("students").select("id", { count: "exact", head: true }),
            supabase.from("faculty").select("id", { count: "exact", head: true }),
            supabase.from("courses").select("id", { count: "exact", head: true }).eq("status", "active"),
        ])

        return {
            total_students: studentsResult.count || 0,
            total_faculty: facultyResult.count || 0,
            active_courses: coursesResult.count || 0,
            pending_approvals: 0,
            students_change: 5.2,
            faculty_change: 2.3,
            courses_change: 8.1,
        }
    } catch (error) {
        console.error("Error fetching dashboard stats:", error)
        return {
            total_students: 0,
            total_faculty: 0,
            active_courses: 0,
            pending_approvals: 0,
            students_change: 0,
            faculty_change: 0,
            courses_change: 0,
        }
    }
}

// Student CRUD Operations
export async function getStudents(params?: {
    search?: string
    department?: string
    status?: string
    page?: number
    per_page?: number
}) {
    const supabase = await createClient()
    const { search, department, status, page = 1, per_page = 20 } = params || {}

    let query = supabase
        .from("students")
        .select(`
      *,
      user:users(*)
    `, { count: "exact" })

    if (search) {
        query = query.or(`enrollment_number.ilike.%${search}%,user.full_name.ilike.%${search}%,user.email.ilike.%${search}%`)
    }

    if (department) {
        query = query.eq("department", department)
    }

    if (status) {
        query = query.eq("status", status)
    }

    const from = (page - 1) * per_page
    const to = from + per_page - 1

    query = query.range(from, to).order("created_at", { ascending: false })

    const { data, count, error } = await query

    if (error) {
        console.error("Error fetching students:", error)
        return { data: [], total: 0, error: error.message }
    }

    return {
        data: data || [],
        total: count || 0,
        page,
        per_page,
        total_pages: Math.ceil((count || 0) / per_page),
    }
}

export async function getStudentById(id: string) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("students")
        .select(`
      *,
      user:users(*),
      enrollments:enrollments(
        *,
        course:courses(*)
      )
    `)
        .eq("id", id)
        .single()

    if (error) {
        console.error("Error fetching student:", error)
        return null
    }

    return data
}

export async function createStudent(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const department = formData.get("department") as string
    const year = parseInt(formData.get("year") as string)
    const semester = parseInt(formData.get("semester") as string)
    const section = formData.get("section") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const address = formData.get("address") as string
    const guardianName = formData.get("guardianName") as string
    const guardianPhone = formData.get("guardianPhone") as string

    // Create auth user
    const { data: authData, error: authError } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true,
        user_metadata: {
            full_name: fullName,
            role: "student",
        },
    })

    if (authError) {
        return { error: authError.message }
    }

    if (!authData.user) {
        return { error: "Failed to create user" }
    }

    // Create user profile
    const { error: userError } = await supabase.from("users").insert({
        id: authData.user.id,
        email,
        full_name: fullName,
        phone,
        role: "student",
        is_active: true,
    })

    if (userError) {
        return { error: userError.message }
    }

    // Generate enrollment number
    const enrollmentNumber = `UU${new Date().getFullYear()}${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}`

    // Create student profile
    const { error: studentError } = await supabase.from("students").insert({
        user_id: authData.user.id,
        enrollment_number: enrollmentNumber,
        department,
        year,
        semester,
        section,
        date_of_birth: dateOfBirth || null,
        address,
        guardian_name: guardianName,
        guardian_phone: guardianPhone,
        status: "active",
        admission_date: new Date().toISOString(),
    })

    if (studentError) {
        return { error: studentError.message }
    }

    revalidatePath("/admin/students")
    return { success: true, enrollmentNumber }
}

export async function updateStudent(id: string, formData: FormData) {
    const supabase = await createClient()

    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const department = formData.get("department") as string
    const year = parseInt(formData.get("year") as string)
    const semester = parseInt(formData.get("semester") as string)
    const section = formData.get("section") as string
    const dateOfBirth = formData.get("dateOfBirth") as string
    const address = formData.get("address") as string
    const guardianName = formData.get("guardianName") as string
    const guardianPhone = formData.get("guardianPhone") as string
    const status = formData.get("status") as string

    // Get student to find user_id
    const { data: student } = await supabase
        .from("students")
        .select("user_id")
        .eq("id", id)
        .single()

    if (!student) {
        return { error: "Student not found" }
    }

    // Update user profile
    const { error: userError } = await supabase
        .from("users")
        .update({
            full_name: fullName,
            phone,
            updated_at: new Date().toISOString(),
        })
        .eq("id", student.user_id)

    if (userError) {
        return { error: userError.message }
    }

    // Update student profile
    const { error: studentError } = await supabase
        .from("students")
        .update({
            department,
            year,
            semester,
            section,
            date_of_birth: dateOfBirth || null,
            address,
            guardian_name: guardianName,
            guardian_phone: guardianPhone,
            status,
        })
        .eq("id", id)

    if (studentError) {
        return { error: studentError.message }
    }

    revalidatePath("/admin/students")
    revalidatePath(`/admin/students/${id}`)
    return { success: true }
}

export async function deleteStudent(id: string) {
    const supabase = await createClient()

    // Get student to find user_id
    const { data: student } = await supabase
        .from("students")
        .select("user_id")
        .eq("id", id)
        .single()

    if (!student) {
        return { error: "Student not found" }
    }

    // Delete student record (cascade should handle enrollments, attendance, grades)
    const { error: deleteError } = await supabase
        .from("students")
        .delete()
        .eq("id", id)

    if (deleteError) {
        return { error: deleteError.message }
    }

    // Delete user profile
    await supabase.from("users").delete().eq("id", student.user_id)

    // Delete auth user
    await supabase.auth.admin.deleteUser(student.user_id)

    revalidatePath("/admin/students")
    return { success: true }
}

// Faculty CRUD Operations
export async function getFaculty(params?: {
    search?: string
    department?: string
    status?: string
    page?: number
    per_page?: number
}) {
    const supabase = await createClient()
    const { search, department, status, page = 1, per_page = 20 } = params || {}

    let query = supabase
        .from("faculty")
        .select(`
      *,
      user:users(*)
    `, { count: "exact" })

    if (search) {
        query = query.or(`employee_id.ilike.%${search}%,user.full_name.ilike.%${search}%,user.email.ilike.%${search}%`)
    }

    if (department) {
        query = query.eq("department", department)
    }

    if (status) {
        query = query.eq("status", status)
    }

    const from = (page - 1) * per_page
    const to = from + per_page - 1

    query = query.range(from, to).order("created_at", { ascending: false })

    const { data, count, error } = await query

    if (error) {
        console.error("Error fetching faculty:", error)
        return { data: [], total: 0, error: error.message }
    }

    return {
        data: data || [],
        total: count || 0,
        page,
        per_page,
        total_pages: Math.ceil((count || 0) / per_page),
    }
}

// Course CRUD Operations
export async function getCourses(params?: {
    search?: string
    department?: string
    semester?: number
    status?: string
    page?: number
    per_page?: number
}) {
    const supabase = await createClient()
    const { search, department, semester, status, page = 1, per_page = 20 } = params || {}

    let query = supabase
        .from("courses")
        .select(`
      *,
      faculty:faculty(
        *,
        user:users(*)
      )
    `, { count: "exact" })

    if (search) {
        query = query.or(`code.ilike.%${search}%,name.ilike.%${search}%`)
    }

    if (department) {
        query = query.eq("department", department)
    }

    if (semester) {
        query = query.eq("semester", semester)
    }

    if (status) {
        query = query.eq("status", status)
    }

    const from = (page - 1) * per_page
    const to = from + per_page - 1

    query = query.range(from, to).order("created_at", { ascending: false })

    const { data, count, error } = await query

    if (error) {
        console.error("Error fetching courses:", error)
        return { data: [], total: 0, error: error.message }
    }

    return {
        data: data || [],
        total: count || 0,
        page,
        per_page,
        total_pages: Math.ceil((count || 0) / per_page),
    }
}

export async function createCourse(formData: FormData) {
    const supabase = await createClient()

    const code = formData.get("code") as string
    const name = formData.get("name") as string
    const description = formData.get("description") as string
    const credits = parseInt(formData.get("credits") as string)
    const department = formData.get("department") as string
    const semester = parseInt(formData.get("semester") as string)
    const year = parseInt(formData.get("year") as string)
    const facultyId = formData.get("facultyId") as string
    const maxStudents = parseInt(formData.get("maxStudents") as string) || 60
    const syllabus = formData.get("syllabus") as string

    const { error } = await supabase.from("courses").insert({
        code,
        name,
        description,
        credits,
        department,
        semester,
        year,
        faculty_id: facultyId || null,
        max_students: maxStudents,
        syllabus,
        status: "active",
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/courses")
    return { success: true }
}

// Announcement Operations
export async function createAnnouncement(formData: FormData) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        return { error: "Unauthorized" }
    }

    const title = formData.get("title") as string
    const content = formData.get("content") as string
    const priority = formData.get("priority") as string || "normal"
    const audience = formData.get("audience") as string || "all"
    const isPinned = formData.get("isPinned") === "true"

    const { error } = await supabase.from("announcements").insert({
        title,
        content,
        priority,
        audience,
        is_pinned: isPinned,
        created_by: user.id,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/admin/announcements")
    return { success: true }
}

export async function getAnnouncements(params?: {
    audience?: string
    priority?: string
    page?: number
    per_page?: number
}) {
    const supabase = await createClient()
    const { audience, priority, page = 1, per_page = 10 } = params || {}

    let query = supabase
        .from("announcements")
        .select("*", { count: "exact" })

    if (audience) {
        query = query.eq("audience", audience)
    }

    if (priority) {
        query = query.eq("priority", priority)
    }

    const from = (page - 1) * per_page
    const to = from + per_page - 1

    query = query
        .range(from, to)
        .order("is_pinned", { ascending: false })
        .order("created_at", { ascending: false })

    const { data, count, error } = await query

    if (error) {
        console.error("Error fetching announcements:", error)
        return { data: [], total: 0 }
    }

    return {
        data: data || [],
        total: count || 0,
        page,
        per_page,
        total_pages: Math.ceil((count || 0) / per_page),
    }
}

// Activity Log
export async function getRecentActivity(limit = 10) {
    const supabase = await createClient()

    const { data, error } = await supabase
        .from("activity_logs")
        .select(`
      *,
      user:users(full_name, avatar_url)
    `)
        .order("created_at", { ascending: false })
        .limit(limit)

    if (error) {
        console.error("Error fetching activity:", error)
        return []
    }

    return data || []
}

export async function logActivity(action: string, description: string, metadata?: Record<string, unknown>) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) return

    await supabase.from("activity_logs").insert({
        user_id: user.id,
        action,
        description,
        metadata,
    })
}
