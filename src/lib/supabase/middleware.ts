import { createServerClient } from "@supabase/ssr"
import { NextResponse, type NextRequest } from "next/server"

// Check if Supabase is configured
const isSupabaseConfigured = () => {
    return !!(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"
    )
}

export async function updateSession(request: NextRequest) {
    let supabaseResponse = NextResponse.next({
        request,
    })

    // Determine route types
    const isAuthRoute = request.nextUrl.pathname.startsWith("/auth")
    const isAdminRoute = request.nextUrl.pathname.startsWith("/admin")
    const isFacultyRoute = request.nextUrl.pathname.startsWith("/faculty")
    const isStudentRoute = request.nextUrl.pathname.startsWith("/student")
    const isProtectedRoute = isAdminRoute || isFacultyRoute || isStudentRoute

    // If Supabase is not configured, only allow non-protected routes
    if (!isSupabaseConfigured()) {
        if (isProtectedRoute) {
            const url = request.nextUrl.clone()
            url.pathname = "/auth/login"
            url.searchParams.set("error", "Please configure Supabase in your .env.local file")
            return NextResponse.redirect(url)
        }
        return supabaseResponse
    }

    const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll() {
                    return request.cookies.getAll()
                },
                setAll(cookiesToSet) {
                    cookiesToSet.forEach(({ name, value }) =>
                        request.cookies.set(name, value)
                    )
                    supabaseResponse = NextResponse.next({
                        request,
                    })
                    cookiesToSet.forEach(({ name, value, options }) =>
                        supabaseResponse.cookies.set(name, value, options)
                    )
                },
            },
        }
    )

    // Refresh session if expired
    const {
        data: { user },
    } = await supabase.auth.getUser()

    // Redirect to login if not authenticated and trying to access protected route
    if (!user && isProtectedRoute) {
        const url = request.nextUrl.clone()
        url.pathname = "/auth/login"
        url.searchParams.set("redirect", request.nextUrl.pathname)
        return NextResponse.redirect(url)
    }

    // Redirect to dashboard if authenticated and trying to access auth routes
    if (user && isAuthRoute && !request.nextUrl.pathname.includes("logout")) {
        // Get user role from database
        const { data: profile } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single()

        // DIAGNOSTIC CORE: Force admin role for the specific email to bypass DB issues
        let role = profile?.role || "student"
        const lowerEmail = user.email?.toLowerCase()
        if (lowerEmail === "admin@gmail.com" || lowerEmail === "admin@uu.edu") {
            role = "admin"
        }
        const url = request.nextUrl.clone()

        switch (role) {
            case "admin":
                url.pathname = "/admin/dashboard"
                break
            case "faculty":
                url.pathname = "/faculty/dashboard"
                break
            default:
                url.pathname = "/student/dashboard"
        }

        return NextResponse.redirect(url)
    }

    // Role-based access control
    if (user && isProtectedRoute) {
        const { data: profile } = await supabase
            .from("users")
            .select("role")
            .eq("id", user.id)
            .single()

        let role = profile?.role || "student"
        const lowerEmail = user.email?.toLowerCase()
        if (lowerEmail === "admin@gmail.com" || lowerEmail === "admin@uu.edu") {
            role = "admin"
        }

        // Check if user has access to the route
        if (isAdminRoute && role !== "admin") {
            const url = request.nextUrl.clone()
            url.pathname = role === "faculty" ? "/faculty/dashboard" : "/student/dashboard"
            return NextResponse.redirect(url)
        }

        if (isFacultyRoute && role !== "faculty" && role !== "admin") {
            const url = request.nextUrl.clone()
            url.pathname = "/student/dashboard"
            return NextResponse.redirect(url)
        }

        if (isStudentRoute && role !== "student" && role !== "admin") {
            const url = request.nextUrl.clone()
            url.pathname = role === "faculty" ? "/faculty/dashboard" : "/admin/dashboard"
            return NextResponse.redirect(url)
        }
    }

    return supabaseResponse
}
