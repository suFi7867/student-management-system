import Link from "next/link"
import Image from "next/image"
import { GraduationCap, Github, Linkedin, ExternalLink, Instagram, Mail, Code, Sparkles, Heart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function AboutPage() {
    const socials = [
        {
            name: "GitHub",
            icon: Github,
            url: "https://github.com/suFi7867",
            color: "hover:bg-slate-900"
        },
        {
            name: "LinkedIn",
            icon: Linkedin,
            url: "https://www.linkedin.com/in/sufiyan-shaikh-developer",
            color: "hover:bg-blue-600"
        },
        {
            name: "Portfolio",
            icon: ExternalLink,
            url: "https://sufi-portfolio.vercel.app/",
            color: "hover:bg-emerald-600"
        },
        {
            name: "Instagram",
            icon: Instagram,
            url: "https://www.instagram.com/ss_sufi__/",
            color: "hover:bg-pink-600"
        }
    ]

    return (
        <div className="min-h-screen bg-background">
            {/* Navigation */}
            <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex items-center justify-between h-16">
                        <Link href="/" className="flex items-center gap-3 group">
                            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center group-hover:rotate-12 transition-transform">
                                <GraduationCap className="w-6 h-6 text-white" />
                            </div>
                            <span className="font-bold text-lg">OSMS</span>
                        </Link>
                        <div className="flex items-center gap-4">
                            <Link href="/auth/login">
                                <Button variant="ghost">Sign In</Button>
                            </Link>
                            <Link href="/">
                                <Button>Back to Home</Button>
                            </Link>
                        </div>
                    </div>
                </div>
            </nav>

            <main className="pt-32 pb-20">
                <div className="max-w-5xl mx-auto px-4 sm:px-6">
                    {/* Hero Section */}
                    <div className="grid md:grid-cols-2 gap-12 items-center mb-24">
                        <div className="relative">
                            <div className="absolute -inset-4 bg-gradient-to-tr from-primary to-sky-500 rounded-[2rem] blur-2xl opacity-20 animate-pulse" />
                            <div className="relative aspect-square rounded-[2rem] overflow-hidden border-4 border-background shadow-2xl">
                                <Image
                                    src="https://lgjpefmquouuhrmaputp.supabase.co/storage/v1/object/public/public-img/sufiyan.jpeg"
                                    alt="Sufiyan Shaikh"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>
                            <div className="absolute -bottom-6 -right-6 bg-background p-4 rounded-2xl shadow-xl border flex items-center gap-3 animate-bounce">
                                <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center text-primary">
                                    <Code className="w-5 h-5" />
                                </div>
                                <div>
                                    <p className="text-xs text-muted-foreground">Lead Developer</p>
                                    <p className="text-sm font-bold">Sufiyan Shaikh</p>
                                </div>
                            </div>
                        </div>

                        <div className="space-y-6">
                            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-xs font-bold uppercase tracking-wider">
                                <Sparkles className="w-3 h-3" />
                                Architect & Visionary
                            </div>
                            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight">
                                The Human Behind <br />
                                <span className="gradient-text">OSMS System</span>
                            </h1>
                            <p className="text-lg text-muted-foreground leading-relaxed">
                                Hi, I&apos;m <span className="text-foreground font-semibold">Sufiyan Shaikh</span>.
                                I built the Online Student Management System to revolutionize how academic institutions
                                handle their daily operations. My goal was to create a seamless, high-performance platform
                                that empowers both students and faculty.
                            </p>

                            <div className="flex flex-wrap gap-3">
                                {socials.map((social) => (
                                    <Link key={social.name} href={social.url} target="_blank" rel="noopener noreferrer">
                                        <Button
                                            variant="outline"
                                            size="lg"
                                            className={`h-12 px-5 gap-2 rounded-xl transition-all ${social.color} hover:text-white border-muted-foreground/20`}
                                        >
                                            <social.icon className="w-5 h-5" />
                                            {social.name}
                                        </Button>
                                    </Link>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Vision Section */}
                    <div className="grid sm:grid-cols-3 gap-6 mb-24">
                        <Card className="bg-muted/30 border-none">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">The Mission</h3>
                                <p className="text-sm text-muted-foreground">
                                    To provide a unified digital ecosystem for Uttaranchal University where administration meets efficiency.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30 border-none">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">The Tech</h3>
                                <p className="text-sm text-muted-foreground">
                                    Built with Next.js, TypeScript, Tailwind CSS, and Supabase for a world-class, real-time experience.
                                </p>
                            </CardContent>
                        </Card>
                        <Card className="bg-muted/30 border-none">
                            <CardContent className="p-6">
                                <h3 className="font-bold text-lg mb-2">The Design</h3>
                                <p className="text-sm text-muted-foreground">
                                    Focused on modern aesthetics and intuitive UX to make complex administrative tasks feel effortless.
                                </p>
                            </CardContent>
                        </Card>
                    </div>

                    {/* Footer Quote */}
                    <div className="text-center py-12 border-t border-dashed">
                        <div className="inline-flex items-center gap-2 text-muted-foreground mb-4">
                            Made with <Heart className="w-4 h-4 text-rose-500 fill-rose-500" /> by
                            <span className="text-foreground font-bold hover:text-primary transition-colors cursor-pointer">Sufiyan Shaikh</span>
                        </div>
                        <p className="text-sm text-muted-foreground max-w-lg mx-auto italic">
                            "Technology is at its best when it brings people together and makes lives easier.
                            OSMS is my contribution to that vision."
                        </p>
                    </div>
                </div>
            </main>
        </div>
    )
}
