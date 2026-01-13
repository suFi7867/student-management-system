import { Sidebar } from "@/components/layout/sidebar"
import { Header } from "@/components/layout/header"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"

export default async function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const supabase = await createClient()
    const { data: { user } } = await supabase.auth.getUser()

    if (!user) {
        redirect("/auth/login")
    }

    const { data: profile } = await supabase
        .from("users")
        .select("*")
        .eq("id", user.id)
        .single()

    if (profile?.role !== "admin") {
        redirect("/student/dashboard")
    }

    return (
        <div className="min-h-screen bg-muted/30">
            <Sidebar
                role="admin"
                user={{
                    name: profile?.full_name || "Admin",
                    email: user.email || "",
                    avatar: profile?.avatar_url,
                }}
            />
            <div className="lg:ml-64 transition-all duration-300">
                <Header
                    user={{
                        name: profile?.full_name || "Admin",
                        email: user.email || "",
                        avatar: profile?.avatar_url,
                        role: "admin",
                    }}
                />
                <main className="p-6">
                    {children}
                </main>
            </div>
        </div>
    )
}
