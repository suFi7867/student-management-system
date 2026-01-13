import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
})

export const metadata: Metadata = {
  title: "OSMS - Online Student Management System | Uttaranchal University",
  description: "Complete academic administration platform for managing students, faculty, courses, attendance, grades, and more. Built for educational institutions.",
  keywords: ["student management", "academic administration", "attendance tracking", "grade management", "education software", "school management system"],
  authors: [{ name: "Uttaranchal University" }],
  openGraph: {
    title: "OSMS - Online Student Management System",
    description: "Complete academic administration platform for educational institutions",
    type: "website",
    locale: "en_IN",
    siteName: "OSMS",
  },
  twitter: {
    card: "summary_large_image",
    title: "OSMS - Online Student Management System",
    description: "Complete academic administration platform for educational institutions",
  },
  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${inter.variable} font-sans antialiased`}>
        {children}
      </body>
    </html>
  )
}
