import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  })
}

export function formatDateTime(date: Date | string): string {
  return new Date(date).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  })
}

export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((n) => n[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function generateEnrollmentNumber(): string {
  const year = new Date().getFullYear()
  const random = Math.floor(Math.random() * 100000).toString().padStart(5, "0")
  return `UU${year}${random}`
}

export function calculatePercentage(obtained: number, total: number): number {
  if (total === 0) return 0
  return Math.round((obtained / total) * 100 * 100) / 100
}

export function getGradeFromPercentage(percentage: number): string {
  if (percentage >= 90) return "A+"
  if (percentage >= 80) return "A"
  if (percentage >= 70) return "B+"
  if (percentage >= 60) return "B"
  if (percentage >= 50) return "C"
  if (percentage >= 40) return "D"
  return "F"
}

export function getGradePoints(grade: string): number {
  const gradePoints: Record<string, number> = {
    "A+": 10,
    "A": 9,
    "B+": 8,
    "B": 7,
    "C": 6,
    "D": 5,
    "F": 0,
  }
  return gradePoints[grade] || 0
}
