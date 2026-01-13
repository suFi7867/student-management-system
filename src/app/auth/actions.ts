"use server"

import { createClient } from "@/lib/supabase/server"
import { revalidatePath } from "next/cache"
import { redirect } from "next/navigation"

export async function signIn(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string

    if (!email || !password) {
        return { error: "Email and password are required" }
    }

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    })

    if (error) {
        if (error.message.includes("Invalid login credentials")) {
            return { error: "Invalid email or password" }
        }
        return { error: error.message }
    }

    if (!data.user) {
        return { error: "Something went wrong. Please try again." }
    }

    // Get user role
    const { data: profile } = await supabase
        .from("users")
        .select("role")
        .eq("id", data.user.id)
        .single()

    let role = profile?.role || "student"
    const lowerEmail = data.user.email?.toLowerCase()
    if (lowerEmail === "admin@gmail.com" || lowerEmail === "admin@uu.edu") {
        role = "admin"
    }

    revalidatePath("/", "layout")

    // Redirect based on role
    switch (role) {
        case "admin":
            return redirect("/admin/dashboard")
        case "faculty":
            return redirect("/faculty/dashboard")
        default:
            return redirect("/student/dashboard")
    }
}

export async function signUp(formData: FormData) {
    const supabase = await createClient()

    const email = formData.get("email") as string
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string
    const fullName = formData.get("fullName") as string
    const phone = formData.get("phone") as string
    const role = (formData.get("role") as string) || "student"

    // Validation
    if (!email || !password || !fullName) {
        return { error: "Required fields are missing" }
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" }
    }

    if (password.length < 8) {
        return { error: "Password must be at least 8 characters" }
    }

    // Check if email already exists
    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single()

    if (existingUser) {
        return { error: "An account with this email already exists" }
    }

    // Sign up with Supabase Auth
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
            data: {
                full_name: fullName,
                phone,
                role,
            },
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (!data.user) {
        return { error: "Failed to create account" }
    }

    // Create user profile in database
    const { error: profileError } = await supabase.from("users").insert({
        id: data.user.id,
        email,
        full_name: fullName,
        phone,
        role,
        is_active: true,
    })

    if (profileError) {
        console.error("Profile creation error:", profileError)
        // Don't return error as the auth user was created
    }

    // Create role-specific profile
    if (role === "student") {
        const department = formData.get("department") as string
        const year = parseInt(formData.get("year") as string) || 1
        const semester = parseInt(formData.get("semester") as string) || 1

        await supabase.from("students").insert({
            user_id: data.user.id,
            enrollment_number: `UU${new Date().getFullYear()}${Math.floor(Math.random() * 100000).toString().padStart(5, "0")}`,
            department: department || "Computer Science",
            year,
            semester,
            status: "active",
            admission_date: new Date().toISOString(),
        })
    } else if (role === "faculty") {
        const department = formData.get("department") as string
        const designation = formData.get("designation") as string

        await supabase.from("faculty").insert({
            user_id: data.user.id,
            employee_id: `FAC${new Date().getFullYear()}${Math.floor(Math.random() * 10000).toString().padStart(4, "0")}`,
            department: department || "Computer Science",
            designation: designation || "Assistant Professor",
            qualification: [],
            experience_years: 0,
            status: "active",
            joining_date: new Date().toISOString(),
        })
    }

    return { success: "Account created! Please check your email to verify your account." }
}

export async function signOut() {
    const supabase = await createClient()
    await supabase.auth.signOut()
    revalidatePath("/", "layout")
    redirect("/auth/login")
}

export async function resetPassword(formData: FormData) {
    const supabase = await createClient()
    const email = formData.get("email") as string

    if (!email) {
        return { error: "Email is required" }
    }

    const { error } = await supabase.auth.resetPasswordForEmail(email, {
        redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/reset-password`,
    })

    if (error) {
        return { error: error.message }
    }

    return { success: "Password reset link sent to your email" }
}

export async function updatePassword(formData: FormData) {
    const supabase = await createClient()
    const password = formData.get("password") as string
    const confirmPassword = formData.get("confirmPassword") as string

    if (!password || !confirmPassword) {
        return { error: "Password is required" }
    }

    if (password !== confirmPassword) {
        return { error: "Passwords do not match" }
    }

    if (password.length < 8) {
        return { error: "Password must be at least 8 characters" }
    }

    const { error } = await supabase.auth.updateUser({
        password,
    })

    if (error) {
        return { error: error.message }
    }

    revalidatePath("/", "layout")
    redirect("/auth/login?message=Password updated successfully")
}

export async function signInWithGoogle(formData?: FormData) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "google",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url)
    }
}

export async function signInWithGitHub(formData?: FormData) {
    const supabase = await createClient()

    const { data, error } = await supabase.auth.signInWithOAuth({
        provider: "github",
        options: {
            redirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback`,
        },
    })

    if (error) {
        return { error: error.message }
    }

    if (data.url) {
        redirect(data.url)
    }
}
