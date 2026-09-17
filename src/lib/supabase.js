import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://geijvxhwkbbnmjffqyyk.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaWp2eGh3a2Jibm1qZmZxeXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjYyNTUsImV4cCI6MjEwNTA0MjI1NX0.XnmgPfayL3QKgpqa2lPAU3QL6t0MfgWVURO6Rs-Xva0';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

/**
 * Fetch active tour guides/mentors strictly from the backend database.
 * Filters by status = 'active' so only approved tutors are visible to students.
 */
export async function fetchTourGuides() {
  try {
    const { data, error } = await supabase
      .from('tour_guides')
      .select('id, name, location, specialty, rate, rating, picture, bio, status')
      .eq('status', 'active')
      .order('rating', { ascending: false });

    if (error) {
      console.error('Error fetching tour guides from Supabase:', error.message);
      return [];
    }

    return data || [];
  } catch (err) {
    console.error('Network exception while fetching tour guides:', err);
    return [];
  }
}

/**
 * Register a new student into the Supabase database
 */
export async function studentSignUp(studentData) {
  const { name, email, phone, address, password, guide_id, guide_name, guide_rate, notes } = studentData;

  if (!name || !email || !password) {
    throw new Error('Name, email, and password are required for registration.');
  }

  const cleanEmail = email.trim().toLowerCase();

  // Check if student with this email already exists
  const { data: existing } = await supabase
    .from('students')
    .select('id, email')
    .eq('email', cleanEmail)
    .maybeSingle();

  if (existing) {
    throw new Error('An account with this email address already exists. Please log in.');
  }

  const payload = {
    name: name.trim(),
    email: cleanEmail,
    phone: phone ? phone.trim() : null,
    address: address ? address.trim() : null,
    password: password.trim(),
    guide_id: guide_id || null,
    guide_name: guide_name || null,
    guide_rate: guide_rate || null,
    status: 'enrolled',
    completed_tutorials: [],
    notes: notes ? notes.trim() : 'Enrolled via TourGuide Academy Online Portal'
  };

  const { data, error } = await supabase
    .from('students')
    .insert([payload])
    .select()
    .single();

  if (error) {
    console.error('Supabase enrollment error:', error);
    throw new Error(error.message || 'Failed to submit registration. Please try again.');
  }

  return data;
}

/**
 * Student Login using email and password
 */
export async function studentLogin(email, password) {
  if (!email || !password) {
    throw new Error('Please enter both email and password.');
  }

  const cleanEmail = email.trim().toLowerCase();

  const { data: student, error } = await supabase
    .from('students')
    .select('*')
    .eq('email', cleanEmail)
    .maybeSingle();

  if (error) {
    console.error('Login query error:', error);
    throw new Error('Login failed. Please check your credentials.');
  }

  if (!student) {
    throw new Error('No student account found with this email. Please register first.');
  }

  // Verify password
  if (student.password && student.password !== password.trim()) {
    throw new Error('Incorrect password. Please try again.');
  }

  return student;
}

/**
 * Update a student's assigned mentor in Supabase
 */
export async function updateStudentMentor(studentId, { guide_id, guide_name, guide_rate }) {
  const { data, error } = await supabase
    .from('students')
    .update({
      guide_id,
      guide_name,
      guide_rate
    })
    .eq('id', studentId)
    .select()
    .single();

  if (error) {
    console.error('Failed to update student mentor:', error);
    throw new Error(error.message || 'Could not update your mentor.');
  }

  return data;
}

/**
 * Update completed tutorial progress in Supabase
 */
export async function updateCompletedTutorials(studentId, completedTutorials) {
  const { data, error } = await supabase
    .from('students')
    .update({
      completed_tutorials: completedTutorials
    })
    .eq('id', studentId)
    .select()
    .single();

  if (error) {
    console.error('Failed to update progress:', error);
    throw new Error(error.message || 'Could not save tutorial progress.');
  }

  return data;
}

// Backward-compatible alias for existing registration calls
export const enrollStudent = studentSignUp;
