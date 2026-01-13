import Link from "next/link"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TermsPage() {
    return (
        <div className="min-h-screen bg-muted/30">
            {/* Header */}
            <header className="bg-card border-b sticky top-0 z-10">
                <div className="max-w-4xl mx-auto px-4 py-4 flex items-center justify-between">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center">
                            <GraduationCap className="w-6 h-6 text-white" />
                        </div>
                        <span className="font-bold text-lg">OSMS</span>
                    </Link>
                    <Link href="/auth/register">
                        <Button variant="ghost" size="sm">
                            <ArrowLeft className="w-4 h-4 mr-2" />
                            Back to Register
                        </Button>
                    </Link>
                </div>
            </header>

            {/* Content */}
            <main className="max-w-4xl mx-auto px-4 py-12">
                <h1 className="text-3xl font-bold mb-2">Terms of Service</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Acceptance of Terms</h2>
                        <p className="text-muted-foreground">
                            By accessing and using the Online Student Management System (OSMS), you agree to be bound by these
                            Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms,
                            you are prohibited from using this system.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. User Accounts</h2>
                        <p className="text-muted-foreground">
                            You are responsible for maintaining the confidentiality of your account credentials. You agree to
                            notify the administration immediately of any unauthorized use of your account. The institution
                            reserves the right to suspend or terminate accounts that violate these terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. Acceptable Use</h2>
                        <p className="text-muted-foreground">Users of OSMS agree to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                            <li>Use the system only for legitimate educational purposes</li>
                            <li>Not share login credentials with others</li>
                            <li>Not attempt to access unauthorized areas of the system</li>
                            <li>Not upload malicious content or attempt to compromise system security</li>
                            <li>Respect the privacy of other users</li>
                            <li>Provide accurate and truthful information</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Data Accuracy</h2>
                        <p className="text-muted-foreground">
                            While we strive to maintain accurate records, the institution is not liable for errors in attendance,
                            grades, or other academic records displayed in the system. Users should report discrepancies to the
                            relevant administrative office promptly.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Intellectual Property</h2>
                        <p className="text-muted-foreground">
                            All content, features, and functionality of OSMS are owned by the institution and are protected by
                            copyright and other intellectual property laws. Course materials uploaded by faculty remain their
                            intellectual property.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">6. System Availability</h2>
                        <p className="text-muted-foreground">
                            The institution does not guarantee uninterrupted access to OSMS. The system may be unavailable during
                            maintenance periods or due to technical issues. We will make reasonable efforts to notify users of
                            planned downtime.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">7. Modifications</h2>
                        <p className="text-muted-foreground">
                            The institution reserves the right to modify these terms at any time. Continued use of the system
                            after changes constitutes acceptance of the new terms. Users will be notified of significant changes
                            through the system announcements.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">8. Contact</h2>
                        <p className="text-muted-foreground">
                            For questions about these Terms of Service, please contact the IT Department at{" "}
                            <a href="mailto:support@university.edu" className="text-primary hover:underline">
                                support@university.edu
                            </a>
                        </p>
                    </section>
                </div>
            </main>

            {/* Footer */}
            <footer className="border-t py-6 mt-12">
                <div className="max-w-4xl mx-auto px-4 text-center text-sm text-muted-foreground">
                    <p>© 2024 Online Student Management System - Uttaranchal University</p>
                </div>
            </footer>
        </div>
    )
}
