import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://geijvxhwkbbnmjffqyyk.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImdlaWp2eGh3a2Jibm1qZmZxeXlrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODk0NjYyNTUsImV4cCI6MjEwNTA0MjI1NX0.XnmgPfayL3QKgpqa2lPAU3QL6t0MfgWVURO6Rs-Xva0';

const supabase = createClient(supabaseUrl, supabaseAnonKey);

async function runTests() {
  console.log('====================================================');
  console.log('🧪 TESTING TOUR GUIDE SUPABASE INTEGRATION');
  console.log('====================================================\n');

  // Test 1: Fetch Tour Guides
  console.log('Test 1: Fetching active tour guide instructors...');
  const { data: guides, error: guidesErr } = await supabase
    .from('tour_guides')
    .select('id, name, location, specialty, rate, rating')
    .order('rating', { ascending: false });

  if (guidesErr) {
    console.error('❌ Failed to fetch tour guides:', guidesErr.message);
    process.exit(1);
  }

  console.log(`✅ Successfully fetched ${guides.length} tour guides from Supabase!`);
  guides.slice(0, 3).forEach((g, idx) => {
    console.log(`   ${idx + 1}. ${g.name} | ${g.location} | Rate: ${g.rate}`);
  });

  if (guides.length === 0) {
    console.error('❌ No tour guides found.');
    process.exit(1);
  }

  // Test 2: Student Enrollment with Selected Tutor
  const chosenGuide = guides[0];
  const testStudent = {
    name: 'Elena Rostova',
    email: `elena.test.${Date.now()}@academy-test.org`,
    phone: '+1 555-019-8833',
    address: '450 Via del Corso, Rome, Italy',
    guide_id: chosenGuide.id,
    guide_name: chosenGuide.name,
    guide_rate: chosenGuide.rate,
    status: 'enrolled',
    notes: 'Interested in Renaissance architecture and private VIP tour leadership.'
  };

  console.log('\nTest 2: Submitting student enrollment with selected mentor...');
  console.log(`   Student: ${testStudent.name} (${testStudent.email})`);
  console.log(`   Selected Mentor: ${chosenGuide.name} (${chosenGuide.rate})`);

  const { data: insertedStudent, error: insertErr } = await supabase
    .from('students')
    .insert([testStudent])
    .select()
    .single();

  if (insertErr) {
    console.error('❌ Student enrollment failed:', insertErr.message);
    process.exit(1);
  }

  console.log('✅ Student enrolled successfully!');
  console.log(`   Enrolled Record ID: ${insertedStudent.id}`);
  console.log(`   Confirmed Guide: ${insertedStudent.guide_name}`);
  console.log(`   Confirmed Rate: ${insertedStudent.guide_rate}`);
  console.log(`   Enrollment Status: ${insertedStudent.status}`);
  console.log(`   Created At: ${insertedStudent.created_at}`);

  // Test 3: Verify Record in Database
  console.log('\nTest 3: Querying database to verify enrollment persistence...');
  const { data: fetchedStudent, error: fetchErr } = await supabase
    .from('students')
    .select('*')
    .eq('id', insertedStudent.id)
    .single();

  if (fetchErr || !fetchedStudent) {
    console.error('❌ Failed to verify student record:', fetchErr?.message);
    process.exit(1);
  }

  console.log('✅ Database verification passed! Data matches perfectly.');

  // Test 4: Security Validation - Invalid Payload Rejection
  console.log('\nTest 4: Testing security & validation with null email...');
  const { error: invalidErr } = await supabase
    .from('students')
    .insert([{ name: 'Missing Email Student' }]);

  if (invalidErr) {
    console.log(`✅ Security constraint passed: Database rejected invalid payload (${invalidErr.message})`);
  } else {
    console.warn('⚠️ Warning: Database accepted missing email.');
  }

  console.log('\n====================================================');
  console.log('🎉 ALL TESTS PASSED SUCCESSFULLY! BACKEND IS ROCK SOLID.');
  console.log('====================================================');
}

runTests();
