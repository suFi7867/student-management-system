-- OSMS Database Schema for Supabase
-- Run this in Supabase SQL Editor

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- ============================================
-- USERS TABLE (Base user information)
-- ============================================
CREATE TABLE IF NOT EXISTS users (
  id UUID PRIMARY KEY REFERENCES auth.users(id) ON DELETE CASCADE,
  email TEXT UNIQUE NOT NULL,
  full_name TEXT NOT NULL,
  phone TEXT,
  avatar_url TEXT,
  role TEXT NOT NULL CHECK (role IN ('admin', 'faculty', 'student')) DEFAULT 'student',
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- STUDENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS students (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  enrollment_number TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  year INTEGER NOT NULL CHECK (year BETWEEN 1 AND 6),
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 12),
  section TEXT,
  date_of_birth DATE,
  address TEXT,
  blood_group TEXT,
  guardian_name TEXT,
  guardian_phone TEXT,
  guardian_relation TEXT,
  admission_date DATE DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'graduated', 'suspended')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- FACULTY TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS faculty (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID UNIQUE NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  employee_id TEXT UNIQUE NOT NULL,
  department TEXT NOT NULL,
  designation TEXT NOT NULL,
  qualification TEXT[] DEFAULT '{}',
  specialization TEXT,
  experience_years INTEGER DEFAULT 0,
  joining_date DATE DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'on_leave')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- COURSES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS courses (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  code TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  credits INTEGER NOT NULL CHECK (credits BETWEEN 1 AND 10),
  department TEXT NOT NULL,
  semester INTEGER NOT NULL CHECK (semester BETWEEN 1 AND 12),
  year INTEGER NOT NULL CHECK (year BETWEEN 2020 AND 2100),
  faculty_id UUID REFERENCES faculty(id) ON DELETE SET NULL,
  max_students INTEGER DEFAULT 60,
  schedule JSONB DEFAULT '[]',
  syllabus TEXT,
  status TEXT NOT NULL CHECK (status IN ('active', 'inactive', 'archived')) DEFAULT 'active',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ENROLLMENTS TABLE (Student-Course Relationship)
-- ============================================
CREATE TABLE IF NOT EXISTS enrollments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  enrollment_date DATE DEFAULT CURRENT_DATE,
  status TEXT NOT NULL CHECK (status IN ('enrolled', 'dropped', 'completed')) DEFAULT 'enrolled',
  final_grade TEXT,
  final_grade_points DECIMAL(3,2),
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id)
);

-- ============================================
-- ATTENDANCE TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS attendance (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  status TEXT NOT NULL CHECK (status IN ('present', 'absent', 'late', 'excused')) DEFAULT 'present',
  remarks TEXT,
  marked_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(student_id, course_id, date)
);

-- ============================================
-- GRADES TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS grades (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  assessment_type TEXT NOT NULL CHECK (assessment_type IN ('quiz', 'assignment', 'midterm', 'final', 'project', 'practical')),
  assessment_name TEXT NOT NULL,
  marks_obtained DECIMAL(5,2) NOT NULL CHECK (marks_obtained >= 0),
  max_marks DECIMAL(5,2) NOT NULL CHECK (max_marks > 0),
  weightage DECIMAL(5,2) DEFAULT 100,
  graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ DEFAULT NOW(),
  remarks TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ASSIGNMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS assignments (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  course_id UUID NOT NULL REFERENCES courses(id) ON DELETE CASCADE,
  title TEXT NOT NULL,
  description TEXT,
  due_date TIMESTAMPTZ NOT NULL,
  max_marks DECIMAL(5,2) NOT NULL DEFAULT 100,
  attachment_url TEXT,
  status TEXT NOT NULL CHECK (status IN ('draft', 'published', 'closed')) DEFAULT 'draft',
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ASSIGNMENT SUBMISSIONS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS assignment_submissions (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  assignment_id UUID NOT NULL REFERENCES assignments(id) ON DELETE CASCADE,
  student_id UUID NOT NULL REFERENCES students(id) ON DELETE CASCADE,
  submission_url TEXT NOT NULL,
  submitted_at TIMESTAMPTZ DEFAULT NOW(),
  marks_obtained DECIMAL(5,2),
  feedback TEXT,
  status TEXT NOT NULL CHECK (status IN ('submitted', 'graded', 'late', 'resubmit')) DEFAULT 'submitted',
  graded_by UUID REFERENCES users(id) ON DELETE SET NULL,
  graded_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW(),
  UNIQUE(assignment_id, student_id)
);

-- ============================================
-- ANNOUNCEMENTS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS announcements (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  content TEXT NOT NULL,
  priority TEXT NOT NULL CHECK (priority IN ('low', 'normal', 'high', 'urgent')) DEFAULT 'normal',
  audience TEXT NOT NULL CHECK (audience IN ('all', 'students', 'faculty', 'department')) DEFAULT 'all',
  department TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  is_pinned BOOLEAN DEFAULT false,
  views INTEGER DEFAULT 0,
  expires_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- MESSAGES TABLE (Direct Messaging)
-- ============================================
CREATE TABLE IF NOT EXISTS messages (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  sender_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  receiver_id UUID NOT NULL REFERENCES users(id) ON DELETE CASCADE,
  content TEXT NOT NULL,
  is_read BOOLEAN DEFAULT false,
  read_at TIMESTAMPTZ,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACTIVITY LOGS TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS activity_logs (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  user_id UUID REFERENCES users(id) ON DELETE SET NULL,
  action TEXT NOT NULL,
  description TEXT NOT NULL,
  metadata JSONB DEFAULT '{}',
  ip_address INET,
  user_agent TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- ACADEMIC CALENDAR TABLE
-- ============================================
CREATE TABLE IF NOT EXISTS academic_calendar (
  id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
  title TEXT NOT NULL,
  description TEXT,
  event_type TEXT NOT NULL CHECK (event_type IN ('exam', 'holiday', 'deadline', 'event', 'semester_start', 'semester_end')),
  start_date DATE NOT NULL,
  end_date DATE,
  department TEXT,
  created_by UUID REFERENCES users(id) ON DELETE SET NULL,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- ============================================
-- INDEXES FOR PERFORMANCE
-- ============================================
CREATE INDEX IF NOT EXISTS idx_students_department ON students(department);
CREATE INDEX IF NOT EXISTS idx_students_status ON students(status);
CREATE INDEX IF NOT EXISTS idx_students_enrollment ON students(enrollment_number);

CREATE INDEX IF NOT EXISTS idx_faculty_department ON faculty(department);
CREATE INDEX IF NOT EXISTS idx_faculty_status ON faculty(status);

CREATE INDEX IF NOT EXISTS idx_courses_department ON courses(department);
CREATE INDEX IF NOT EXISTS idx_courses_semester ON courses(semester);
CREATE INDEX IF NOT EXISTS idx_courses_faculty ON courses(faculty_id);

CREATE INDEX IF NOT EXISTS idx_enrollments_student ON enrollments(student_id);
CREATE INDEX IF NOT EXISTS idx_enrollments_course ON enrollments(course_id);

CREATE INDEX IF NOT EXISTS idx_attendance_student ON attendance(student_id);
CREATE INDEX IF NOT EXISTS idx_attendance_course ON attendance(course_id);
CREATE INDEX IF NOT EXISTS idx_attendance_date ON attendance(date);

CREATE INDEX IF NOT EXISTS idx_grades_student ON grades(student_id);
CREATE INDEX IF NOT EXISTS idx_grades_course ON grades(course_id);

CREATE INDEX IF NOT EXISTS idx_messages_sender ON messages(sender_id);
CREATE INDEX IF NOT EXISTS idx_messages_receiver ON messages(receiver_id);

CREATE INDEX IF NOT EXISTS idx_activity_logs_user ON activity_logs(user_id);
CREATE INDEX IF NOT EXISTS idx_activity_logs_created ON activity_logs(created_at);

-- ============================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================

-- Enable RLS on all tables
ALTER TABLE users ENABLE ROW LEVEL SECURITY;
ALTER TABLE students ENABLE ROW LEVEL SECURITY;
ALTER TABLE faculty ENABLE ROW LEVEL SECURITY;
ALTER TABLE courses ENABLE ROW LEVEL SECURITY;
ALTER TABLE enrollments ENABLE ROW LEVEL SECURITY;
ALTER TABLE attendance ENABLE ROW LEVEL SECURITY;
ALTER TABLE grades ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignments ENABLE ROW LEVEL SECURITY;
ALTER TABLE assignment_submissions ENABLE ROW LEVEL SECURITY;
ALTER TABLE announcements ENABLE ROW LEVEL SECURITY;
ALTER TABLE messages ENABLE ROW LEVEL SECURITY;
ALTER TABLE activity_logs ENABLE ROW LEVEL SECURITY;
ALTER TABLE academic_calendar ENABLE ROW LEVEL SECURITY;

-- Users policies
CREATE POLICY "Users can view their own profile" ON users
  FOR SELECT USING (auth.uid() = id);

CREATE POLICY "Users can update their own profile" ON users
  FOR UPDATE USING (auth.uid() = id);

CREATE POLICY "Admins can view all users" ON users
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

CREATE POLICY "Admins can manage users" ON users
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Students policies
CREATE POLICY "Students can view their own data" ON students
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Faculty and admins can view students" ON students
  FOR SELECT USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'faculty'))
  );

CREATE POLICY "Admins can manage students" ON students
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Faculty policies
CREATE POLICY "Faculty can view their own data" ON faculty
  FOR SELECT USING (user_id = auth.uid());

CREATE POLICY "Admins can manage faculty" ON faculty
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Courses policies
CREATE POLICY "Anyone can view active courses" ON courses
  FOR SELECT USING (status = 'active');

CREATE POLICY "Faculty can manage their courses" ON courses
  FOR UPDATE USING (
    faculty_id IN (SELECT id FROM faculty WHERE user_id = auth.uid())
  );

CREATE POLICY "Admins can manage all courses" ON courses
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Attendance policies
CREATE POLICY "Students can view their own attendance" ON attendance
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
  );

CREATE POLICY "Faculty can manage attendance for their courses" ON attendance
  FOR ALL USING (
    course_id IN (SELECT id FROM courses WHERE faculty_id IN (SELECT id FROM faculty WHERE user_id = auth.uid()))
  );

CREATE POLICY "Admins can manage all attendance" ON attendance
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Grades policies
CREATE POLICY "Students can view their own grades" ON grades
  FOR SELECT USING (
    student_id IN (SELECT id FROM students WHERE user_id = auth.uid())
  );

CREATE POLICY "Faculty can manage grades for their courses" ON grades
  FOR ALL USING (
    course_id IN (SELECT id FROM courses WHERE faculty_id IN (SELECT id FROM faculty WHERE user_id = auth.uid()))
  );

CREATE POLICY "Admins can manage all grades" ON grades
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- Announcements policies (everyone can view)
CREATE POLICY "Everyone can view announcements" ON announcements
  FOR SELECT USING (true);

CREATE POLICY "Admins and faculty can create announcements" ON announcements
  FOR INSERT WITH CHECK (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role IN ('admin', 'faculty'))
  );

-- Messages policies
CREATE POLICY "Users can view their own messages" ON messages
  FOR SELECT USING (sender_id = auth.uid() OR receiver_id = auth.uid());

CREATE POLICY "Users can send messages" ON messages
  FOR INSERT WITH CHECK (sender_id = auth.uid());

-- Academic calendar policies
CREATE POLICY "Everyone can view academic calendar" ON academic_calendar
  FOR SELECT USING (true);

CREATE POLICY "Admins can manage academic calendar" ON academic_calendar
  FOR ALL USING (
    EXISTS (SELECT 1 FROM users WHERE id = auth.uid() AND role = 'admin')
  );

-- ============================================
-- FUNCTIONS AND TRIGGERS
-- ============================================

-- Function to update updated_at timestamp
CREATE OR REPLACE FUNCTION update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

-- Apply trigger to all tables with updated_at column
CREATE TRIGGER update_users_updated_at
  BEFORE UPDATE ON users
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_students_updated_at
  BEFORE UPDATE ON students
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_faculty_updated_at
  BEFORE UPDATE ON faculty
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_courses_updated_at
  BEFORE UPDATE ON courses
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_enrollments_updated_at
  BEFORE UPDATE ON enrollments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_attendance_updated_at
  BEFORE UPDATE ON attendance
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_grades_updated_at
  BEFORE UPDATE ON grades
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_assignments_updated_at
  BEFORE UPDATE ON assignments
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

CREATE TRIGGER update_announcements_updated_at
  BEFORE UPDATE ON announcements
  FOR EACH ROW EXECUTE FUNCTION update_updated_at_column();

-- Function to automatically create user profile on auth signup
CREATE OR REPLACE FUNCTION public.handle_new_user()
RETURNS TRIGGER AS $$
BEGIN
  INSERT INTO public.users (id, email, full_name, phone, role)
  VALUES (
    NEW.id,
    NEW.email,
    COALESCE(NEW.raw_user_meta_data->>'full_name', 'User'),
    NEW.raw_user_meta_data->>'phone',
    COALESCE(NEW.raw_user_meta_data->>'role', 'student')
  );
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Trigger for new user signup
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();

-- ============================================
-- SAMPLE DATA (Optional - for testing)
-- ============================================

-- Insert sample admin user (you'll need to create this through auth first)
-- INSERT INTO users (id, email, full_name, role) 
-- VALUES ('your-admin-uuid', 'admin@university.edu', 'System Admin', 'admin');

COMMENT ON TABLE users IS 'Base user table linked to Supabase Auth';
COMMENT ON TABLE students IS 'Student-specific information';
COMMENT ON TABLE faculty IS 'Faculty-specific information';
COMMENT ON TABLE courses IS 'Course catalog with scheduling';
COMMENT ON TABLE enrollments IS 'Student-Course relationships';
COMMENT ON TABLE attendance IS 'Daily attendance records';
COMMENT ON TABLE grades IS 'Assessment scores and grades';
COMMENT ON TABLE assignments IS 'Course assignments';
COMMENT ON TABLE announcements IS 'System-wide announcements';
COMMENT ON TABLE messages IS 'Direct messaging between users';
COMMENT ON TABLE activity_logs IS 'User activity audit trail';
