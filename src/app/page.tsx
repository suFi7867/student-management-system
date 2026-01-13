import Link from "next/link"
import {
  GraduationCap,
  Users,
  BookOpen,
  ClipboardCheck,
  Award,
  Bell,
  BarChart3,
  Shield,
  Smartphone,
  Zap,
  ArrowRight,
  CheckCircle2,
  Star,
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export default function HomePage() {
  const features = [
    {
      icon: Users,
      title: "Student Management",
      description: "Complete student lifecycle management from admission to graduation with comprehensive profiles.",
      color: "text-sky-500",
      bgColor: "bg-sky-500/10",
    },
    {
      icon: GraduationCap,
      title: "Faculty Management",
      description: "Manage faculty records, course assignments, workload distribution, and performance tracking.",
      color: "text-purple-500",
      bgColor: "bg-purple-500/10",
    },
    {
      icon: BookOpen,
      title: "Course Management",
      description: "Create and manage courses, syllabi, schedules, and academic resources effortlessly.",
      color: "text-emerald-500",
      bgColor: "bg-emerald-500/10",
    },
    {
      icon: ClipboardCheck,
      title: "Attendance System",
      description: "Digital attendance marking with real-time tracking, reports, and automated notifications.",
      color: "text-amber-500",
      bgColor: "bg-amber-500/10",
    },
    {
      icon: Award,
      title: "Grade Management",
      description: "Comprehensive grading system with GPA calculation, report cards, and performance analytics.",
      color: "text-rose-500",
      bgColor: "bg-rose-500/10",
    },
    {
      icon: BarChart3,
      title: "Reports & Analytics",
      description: "Detailed reports and insights with exportable data in multiple formats.",
      color: "text-indigo-500",
      bgColor: "bg-indigo-500/10",
    },
  ]

  const benefits = [
    "Role-based access control for Admin, Faculty, and Students",
    "Real-time updates and notifications",
    "Mobile-responsive design for all devices",
    "Secure authentication with multiple options",
    "Automated report generation",
    "24/7 system availability",
  ]

  const stats = [
    { value: "10,000+", label: "Students" },
    { value: "500+", label: "Faculty" },
    { value: "200+", label: "Courses" },
    { value: "99.9%", label: "Uptime" },
  ]

  return (
    <div className="min-h-screen">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-md border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold text-lg">OSMS</span>
                <span className="hidden sm:inline text-muted-foreground text-sm ml-2">
                  Uttaranchal University
                </span>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <Link href="/auth/login">
                <Button variant="ghost">Sign In</Button>
              </Link>
              <Link href="/auth/register">
                <Button>Get Started</Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
        {/* Background Elements */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-20 left-10 w-72 h-72 bg-primary/10 rounded-full blur-3xl" />
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-sky-500/10 rounded-full blur-3xl" />
        </div>

        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 text-primary text-sm font-medium mb-6">
            <Star className="w-4 h-4" />
            Trusted by 50+ Educational Institutions
          </div>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight mb-6">
            Complete{" "}
            <span className="gradient-text">Student Management</span>
            <br />
            System for Modern Education
          </h1>

          <p className="text-lg sm:text-xl text-muted-foreground max-w-3xl mx-auto mb-10">
            Streamline your institution&apos;s academic operations with our comprehensive platform.
            Manage students, faculty, courses, attendance, and grades all in one place.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" className="h-12 px-8 text-base">
                Start Free Trial
                <ArrowRight className="w-5 h-5 ml-2" />
              </Button>
            </Link>
            <Link href="/auth/login">
              <Button variant="outline" size="lg" className="h-12 px-8 text-base">
                Sign In to Dashboard
              </Button>
            </Link>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-20 pt-10 border-t max-w-4xl mx-auto">
            {stats.map((stat) => (
              <div key={stat.label}>
                <p className="text-3xl font-bold gradient-text">{stat.value}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-muted/30">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4">
              Everything You Need to Manage Your Institution
            </h2>
            <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
              Our comprehensive suite of tools helps you streamline every aspect of academic administration.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {features.map((feature) => (
              <Card key={feature.title} hover className="relative overflow-hidden group">
                <CardContent className="p-6">
                  <div className={`w-12 h-12 rounded-xl ${feature.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                    <feature.icon className={`w-6 h-6 ${feature.color}`} />
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                  <p className="text-muted-foreground">{feature.description}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6">
                Why Choose Our Platform?
              </h2>
              <p className="text-lg text-muted-foreground mb-8">
                Built with modern technology and best practices, our system ensures reliability,
                security, and ease of use for all stakeholders.
              </p>
              <div className="space-y-4">
                {benefits.map((benefit, index) => (
                  <div key={index} className="flex items-start gap-3">
                    <CheckCircle2 className="w-5 h-5 text-emerald-500 mt-0.5 shrink-0" />
                    <p>{benefit}</p>
                  </div>
                ))}
              </div>
              <Link href="/auth/register" className="inline-block mt-8">
                <Button size="lg">
                  Get Started Now
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <Card className="p-6 bg-gradient-to-br from-sky-500/10 to-sky-500/5">
                <Shield className="w-10 h-10 text-sky-500 mb-4" />
                <h3 className="font-semibold mb-2">Enterprise Security</h3>
                <p className="text-sm text-muted-foreground">Bank-grade encryption and data protection</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-purple-500/10 to-purple-500/5 mt-8">
                <Zap className="w-10 h-10 text-purple-500 mb-4" />
                <h3 className="font-semibold mb-2">Lightning Fast</h3>
                <p className="text-sm text-muted-foreground">Optimized for speed and performance</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-emerald-500/10 to-emerald-500/5">
                <Smartphone className="w-10 h-10 text-emerald-500 mb-4" />
                <h3 className="font-semibold mb-2">Mobile Ready</h3>
                <p className="text-sm text-muted-foreground">Access from any device, anywhere</p>
              </Card>
              <Card className="p-6 bg-gradient-to-br from-amber-500/10 to-amber-500/5 mt-8">
                <Bell className="w-10 h-10 text-amber-500 mb-4" />
                <h3 className="font-semibold mb-2">Smart Alerts</h3>
                <p className="text-sm text-muted-foreground">Real-time notifications and reminders</p>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 bg-primary text-primary-foreground">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6">
            Ready to Transform Your Institution?
          </h2>
          <p className="text-lg opacity-90 mb-10 max-w-2xl mx-auto">
            Join thousands of educational institutions already using OSMS to streamline their operations.
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link href="/auth/register">
              <Button size="lg" variant="secondary" className="h-12 px-8">
                Start Free 30-Day Trial
              </Button>
            </Link>
            <Link href="/contact">
              <Button size="lg" variant="outline" className="h-12 px-8 border-white/30 text-white hover:bg-white/10">
                Contact Sales
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 sm:px-6 lg:px-8 border-t">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
              </div>
              <div>
                <span className="font-bold">OSMS</span>
                <span className="text-muted-foreground text-sm ml-2">© 2024</span>
              </div>
            </div>
            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <Link href="/about" className="hover:text-foreground transition-colors">About</Link>
              <Link href="/features" className="hover:text-foreground transition-colors">Features</Link>
              <Link href="/pricing" className="hover:text-foreground transition-colors">Pricing</Link>
              <Link href="/contact" className="hover:text-foreground transition-colors">Contact</Link>
              <Link href="/privacy" className="hover:text-foreground transition-colors">Privacy</Link>
            </div>
          </div>
          <p className="text-center text-sm text-muted-foreground mt-8">
            Online Student Management System - Uttaranchal University
          </p>
        </div>
      </footer>
    </div>
  )
}
