import { createClient } from "@/lib/supabase/server"
import { NextResponse } from "next/server"

export async function GET(request: Request) {
    const { searchParams, origin } = new URL(request.url)
    const code = searchParams.get("code")
    const next = searchParams.get("next") ?? "/student/dashboard"

    if (code) {
        const supabase = await createClient()
        const { error } = await supabase.auth.exchangeCodeForSession(code)

        if (!error) {
            // Get user role and redirect accordingly
            const { data: { user } } = await supabase.auth.getUser()

            if (user) {
                const { data: profile } = await supabase
                    .from("users")
                    .select("role")
                    .eq("id", user.id)
                    .single()

                const role = profile?.role || "student"

                let redirectPath = next
                switch (role) {
                    case "admin":
                        redirectPath = "/admin/dashboard"
                        break
                    case "faculty":
                        redirectPath = "/faculty/dashboard"
                        break
                    default:
                        redirectPath = "/student/dashboard"
                }

                return NextResponse.redirect(`${origin}${redirectPath}`)
            }
        }
    }

    // Return the user to an error page with instructions
    return NextResponse.redirect(`${origin}/auth/login?error=Could not authenticate`)
}
