import { createBrowserClient } from "@supabase/ssr"

// Check if Supabase is configured
export const isSupabaseConfigured = () => {
    return !!(
        process.env.NEXT_PUBLIC_SUPABASE_URL &&
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
        process.env.NEXT_PUBLIC_SUPABASE_URL !== "https://your-project.supabase.co"
    )
}

export function createClient() {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

    if (!supabaseUrl || !supabaseAnonKey) {
        throw new Error("Missing Supabase environment variables. Please check your .env.local file.")
    }

    return createBrowserClient(supabaseUrl, supabaseAnonKey)
}

