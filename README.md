# Online Student Management System (OSMS)

A comprehensive academic administration platform built with Next.js 14, Tailwind CSS, and Supabase.

## 🎓 Overview

OSMS is a complete student management system designed for educational institutions. It provides role-based access for Administrators, Faculty, and Students to manage academic operations efficiently.

## ✨ Features

### Authentication
- Email/Password authentication via Supabase
- Social login (Google, GitHub)
- Role-based routing and access control
- Password reset functionality
- Session management

### Admin Dashboard
- Institution-wide statistics
- Quick action shortcuts
- Recent activity feed
- Upcoming events calendar
- Student and faculty management
- Course management
- Report generation

### Faculty Portal
- Teaching schedule overview
- Attendance marking interface
- Grade entry system
- Course materials management
- Student roster access
- Pending tasks tracker

### Student Portal
- Personal dashboard
- Course enrollment
- Attendance tracking
- Grade viewing
- Assignment submissions
- Schedule viewing
- Announcements feed

## 🛠 Tech Stack

- **Framework:** Next.js 14 (App Router)
- **Styling:** Tailwind CSS
- **Database:** Supabase (PostgreSQL)
- **Authentication:** Supabase Auth
- **UI Components:** Radix UI primitives
- **Icons:** Lucide React
- **Charts:** Recharts
- **Type Safety:** TypeScript

## 📁 Project Structure

```
osms/
├── src/
│   ├── app/
│   │   ├── auth/           # Authentication pages
│   │   ├── admin/          # Admin dashboard & management
│   │   ├── faculty/        # Faculty portal
│   │   ├── student/        # Student portal
│   │   ├── layout.tsx      # Root layout
│   │   ├── page.tsx        # Landing page
│   │   └── globals.css     # Global styles
│   ├── components/
│   │   ├── ui/             # Reusable UI components
│   │   └── layout/         # Layout components (Sidebar, Header)
│   ├── lib/
│   │   ├── supabase/       # Supabase client configuration
│   │   └── utils.ts        # Utility functions
│   ├── types/              # TypeScript type definitions
│   └── middleware.ts       # Route protection middleware
├── supabase/
│   └── schema.sql          # Database schema
└── package.json
```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ installed
- A Supabase account and project
- Git

### Installation

1. **Clone the repository**
   ```bash
   cd osms
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   
   Create a `.env.local` file in the root directory:
   ```env
   NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
   NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
   NEXT_PUBLIC_SITE_URL=http://localhost:3000
   ```

4. **Set up the database**
   
   Go to your Supabase project's SQL Editor and run the contents of `supabase/schema.sql` to create all necessary tables.

5. **Run the development server**
   ```bash
   npm run dev
   ```

6. **Open your browser**
   
   Navigate to [http://localhost:3000](http://localhost:3000)

### Creating an Admin User

1. Register a new account through the UI
2. Go to Supabase Dashboard → Authentication → Users
3. Find your user and copy the user ID
4. Go to SQL Editor and run:
   ```sql
   UPDATE users SET role = 'admin' WHERE id = 'your-user-id';
   ```

## 📊 Database Schema

The system uses the following main tables:

- **users** - Base user information
- **students** - Student-specific data
- **faculty** - Faculty-specific data
- **courses** - Course catalog
- **enrollments** - Student-course relationships
- **attendance** - Daily attendance records
- **grades** - Assessment scores
- **assignments** - Course assignments
- **announcements** - System announcements
- **messages** - Direct messaging
- **activity_logs** - User activity audit

## 🔐 Role-Based Access

| Feature | Admin | Faculty | Student |
|---------|-------|---------|---------|
| Dashboard | ✅ | ✅ | ✅ |
| Manage Students | ✅ | View | Self only |
| Manage Faculty | ✅ | Self only | ❌ |
| Manage Courses | ✅ | Assigned | View |
| Mark Attendance | ✅ | ✅ | ❌ |
| Enter Grades | ✅ | ✅ | ❌ |
| View Reports | ✅ | ✅ | Limited |
| Settings | ✅ | Limited | Limited |

## 🎨 UI Components

The project uses custom-built UI components based on shadcn/ui patterns:

- Button (with variants and loading state)
- Input (with icon and error support)
- Select
- Checkbox
- Card
- Badge
- Avatar
- Dialog
- Dropdown Menu
- Tabs
- And more...

## 📱 Responsive Design

The application is fully responsive with:
- Desktop-first design approach
- Collapsible sidebar for tablet/mobile
- Mobile-optimized data tables
- Touch-friendly UI elements

## 🔧 Environment Variables

| Variable | Description |
|----------|-------------|
| `NEXT_PUBLIC_SUPABASE_URL` | Your Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anonymous key |
| `NEXT_PUBLIC_SITE_URL` | Your site URL (for OAuth callbacks) |

## 📝 Available Scripts

```bash
# Development
npm run dev

# Build for production
npm run build

# Start production server
npm start

# Lint code
npm run lint
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Open a Pull Request

## 📄 License

This project is created for educational purposes as a college project.

## 👥 Authors

- Uttaranchal University Students

---

**Note:** This is a college project and may require additional security hardening for production use.
