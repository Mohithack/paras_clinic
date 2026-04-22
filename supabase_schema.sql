-- Run this in your Supabase SQL Editor

-- Appointments table
create table appointments (
  id uuid default gen_random_uuid() primary key,
  doctor_id integer not null,
  doctor_name text not null,
  patient_name text not null,
  patient_phone text not null,
  patient_email text,
  appointment_date date not null,
  appointment_time text not null,
  reason text,
  status text default 'pending',  -- pending, confirmed, cancelled
  created_at timestamptz default now()
);

-- Student registrations
create table student_registrations (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  email text not null unique,
  phone text,
  registered_at timestamptz default now()
);

-- Class enrollments
create table class_enrollments (
  id uuid default gen_random_uuid() primary key,
  student_email text not null,
  class_id integer not null,
  class_title text not null,
  enrolled_at timestamptz default now(),
  unique(student_email, class_id)
);

-- Demo call logs
create table demo_calls (
  id uuid default gen_random_uuid() primary key,
  visitor_name text not null,
  doctor_id integer not null,
  room_id text not null,
  started_at timestamptz default now()
);

-- Row Level Security (basic - allow all for now, restrict in production)
alter table appointments enable row level security;
alter table student_registrations enable row level security;
alter table class_enrollments enable row level security;
alter table demo_calls enable row level security;

create policy "Allow all" on appointments for all using (true) with check (true);
create policy "Allow all" on student_registrations for all using (true) with check (true);
create policy "Allow all" on class_enrollments for all using (true) with check (true);
create policy "Allow all" on demo_calls for all using (true) with check (true);
