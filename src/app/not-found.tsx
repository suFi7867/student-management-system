import Link from "next/link"
import { FileQuestion, Home } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function NotFound() {
    return (
        <div className="h-screen flex flex-col items-center justify-center bg-muted/30 p-4 text-center">
            <div className="w-24 h-24 bg-primary/10 rounded-full flex items-center justify-center mb-6 animate-pulse-ring">
                <FileQuestion className="w-12 h-12 text-primary" />
            </div>
            <h1 className="text-4xl font-bold mb-2">Page Not Found</h1>
            <p className="text-muted-foreground max-w-md mb-8">
                Sorry, we couldn&apos;t find the page you&apos;re looking for. It might have been moved or deleted.
            </p>
            <Link href="/">
                <Button size="lg">
                    <Home className="w-4 h-4 mr-2" />
                    Return Home
                </Button>
            </Link>
        </div>
    )
}
