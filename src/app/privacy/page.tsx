import Link from "next/link"
import { GraduationCap, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function PrivacyPage() {
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
                <h1 className="text-3xl font-bold mb-2">Privacy Policy</h1>
                <p className="text-muted-foreground mb-8">Last updated: January 2024</p>

                <div className="prose prose-slate dark:prose-invert max-w-none space-y-6">
                    <section>
                        <h2 className="text-xl font-semibold mb-3">1. Introduction</h2>
                        <p className="text-muted-foreground">
                            The Online Student Management System (OSMS) is committed to protecting the privacy of students,
                            faculty, and staff. This Privacy Policy explains how we collect, use, disclose, and safeguard
                            your information when you use our system.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">2. Information We Collect</h2>
                        <p className="text-muted-foreground">We collect the following types of information:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                            <li><strong>Personal Information:</strong> Name, email address, phone number, date of birth, address</li>
                            <li><strong>Academic Information:</strong> Enrollment number, department, courses, grades, attendance</li>
                            <li><strong>Authentication Data:</strong> Login credentials, session information</li>
                            <li><strong>Usage Data:</strong> Pages visited, features used, timestamps</li>
                            <li><strong>Guardian Information:</strong> Parent/guardian name and contact details (for students)</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">3. How We Use Your Information</h2>
                        <p className="text-muted-foreground">Your information is used for:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                            <li>Managing academic records and operations</li>
                            <li>Tracking attendance and academic performance</li>
                            <li>Communicating important announcements and updates</li>
                            <li>Providing access to course materials and assignments</li>
                            <li>Generating academic reports and transcripts</li>
                            <li>Improving system functionality and user experience</li>
                            <li>Ensuring system security and preventing unauthorized access</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">4. Information Sharing</h2>
                        <p className="text-muted-foreground">
                            We do not sell or rent your personal information. Information may be shared with:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                            <li>Faculty members for academic purposes</li>
                            <li>Administrative staff for institutional operations</li>
                            <li>Guardians/parents as per institutional policy</li>
                            <li>Accreditation bodies as required</li>
                            <li>Legal authorities when required by law</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">5. Data Security</h2>
                        <p className="text-muted-foreground">
                            We implement appropriate security measures to protect your information, including:
                        </p>
                        <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                            <li>Encryption of data in transit and at rest</li>
                            <li>Regular security audits and updates</li>
                            <li>Role-based access controls</li>
                            <li>Secure authentication mechanisms</li>
                            <li>Regular data backups</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">6. Data Retention</h2>
                        <p className="text-muted-foreground">
                            Academic records are retained as per institutional policies and regulatory requirements.
                            Account information is retained while you are enrolled/employed and for a period thereafter
                            as required by law. You may request deletion of non-essential data by contacting the administration.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">7. Your Rights</h2>
                        <p className="text-muted-foreground">You have the right to:</p>
                        <ul className="list-disc pl-6 mt-2 space-y-2 text-muted-foreground">
                            <li>Access your personal information</li>
                            <li>Request correction of inaccurate data</li>
                            <li>Request deletion of non-essential data</li>
                            <li>Object to certain data processing</li>
                            <li>Receive a copy of your data in a portable format</li>
                        </ul>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">8. Cookies and Tracking</h2>
                        <p className="text-muted-foreground">
                            OSMS uses essential cookies to maintain your login session and preferences. We do not use
                            third-party tracking cookies for advertising purposes.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">9. Changes to This Policy</h2>
                        <p className="text-muted-foreground">
                            We may update this Privacy Policy from time to time. Changes will be posted on this page
                            with an updated revision date. Continued use of OSMS after changes constitutes acceptance
                            of the revised policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold mb-3">10. Contact Us</h2>
                        <p className="text-muted-foreground">
                            For questions or concerns about this Privacy Policy or your personal data, please contact
                            our Data Protection Officer at{" "}
                            <a href="mailto:privacy@university.edu" className="text-primary hover:underline">
                                privacy@university.edu
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
