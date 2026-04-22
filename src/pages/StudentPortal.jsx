import { useState } from 'react'
import { Video, Calendar, BookOpen, Users, Clock, ArrowRight } from 'lucide-react'
import { Link } from 'react-router-dom'
import { doctors } from '../data/doctors'

const upcomingClasses = [
  {
    id: 1,
    title: 'Introduction to Diagnosis',
    doctor: 'Dr. Paras',
    date: '2025-04-25',
    time: '10:00 AM',
    duration: '60 min',
    topic: 'General Medicine',
    enrolled: 24,
    roomId: 'medicare-class-diagnosis-101',
  },
  {
    id: 2,
    title: 'Pediatric Care Basics',
    doctor: 'Dr. Isha',
    date: '2025-04-26',
    time: '11:00 AM',
    duration: '45 min',
    topic: 'Pediatrics',
    enrolled: 18,
    roomId: 'medicare-class-pediatric-basics',
  },
  {
    id: 3,
    title: 'Patient Communication Skills',
    doctor: 'Dr. Paras',
    date: '2025-04-28',
    time: '03:00 PM',
    duration: '90 min',
    topic: 'Clinical Skills',
    enrolled: 30,
    roomId: 'medicare-class-communication',
  },
  {
    id: 4,
    title: 'Child Nutrition & Growth',
    doctor: 'Dr. Isha',
    date: '2025-04-30',
    time: '02:00 PM',
    duration: '60 min',
    topic: 'Pediatrics',
    enrolled: 22,
    roomId: 'medicare-class-nutrition',
  },
]

export default function StudentPortal() {
  const [registerForm, setRegisterForm] = useState({ name: '', email: '', phone: '' })
  const [registered, setRegistered] = useState(false)
  const [joinName, setJoinName] = useState('')

  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Student Portal</h1>
        <p className="text-gray-500">Learn from expert doctors through live video classes</p>
      </div>

      {/* Register Banner */}
      {!registered && (
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 text-white rounded-2xl p-6 mb-8 flex flex-col md:flex-row items-center gap-4">
          <BookOpen size={40} className="flex-shrink-0" />
          <div className="flex-1">
            <h2 className="text-xl font-bold mb-1">Register as a Student</h2>
            <p className="text-blue-100 text-sm">Get access to all live classes and recordings</p>
          </div>
          <div className="flex flex-col md:flex-row gap-2 w-full md:w-auto">
            <input
              type="text"
              placeholder="Your Name"
              value={registerForm.name}
              onChange={e => setRegisterForm({ ...registerForm, name: e.target.value })}
              className="px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none w-full md:w-36"
            />
            <input
              type="email"
              placeholder="Email"
              value={registerForm.email}
              onChange={e => setRegisterForm({ ...registerForm, email: e.target.value })}
              className="px-3 py-2 rounded-lg text-gray-800 text-sm focus:outline-none w-full md:w-44"
            />
            <button
              onClick={() => registerForm.name && registerForm.email && setRegistered(true)}
              className="bg-white text-blue-700 font-semibold px-4 py-2 rounded-lg text-sm hover:bg-blue-50 transition-colors whitespace-nowrap"
            >
              Register Free
            </button>
          </div>
        </div>
      )}

      {registered && (
        <div className="bg-green-50 border border-green-200 text-green-800 rounded-2xl p-4 mb-8 flex items-center gap-3">
          <span className="text-2xl">✓</span>
          <div>
            <p className="font-semibold">Welcome, {registerForm.name}!</p>
            <p className="text-sm text-green-600">You're now enrolled. Click "Join Class" on any session below.</p>
          </div>
        </div>
      )}

      {/* Join with name */}
      {registered && (
        <div className="bg-white rounded-2xl border border-gray-100 shadow-sm p-4 mb-6 flex items-center gap-3">
          <label className="text-sm font-medium text-gray-700 whitespace-nowrap">Display Name in Video:</label>
          <input
            type="text"
            value={joinName || registerForm.name}
            onChange={e => setJoinName(e.target.value)}
            className="border border-gray-300 rounded-lg px-3 py-1.5 text-sm focus:outline-none focus:border-blue-500 flex-1"
          />
        </div>
      )}

      {/* Upcoming Classes */}
      <h2 className="text-xl font-bold text-gray-800 mb-4 flex items-center gap-2"><Calendar size={20} /> Upcoming Classes</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-10">
        {upcomingClasses.map(cls => {
          const doc = doctors.find(d => d.name === cls.doctor)
          return (
            <div key={cls.id} className="bg-white rounded-2xl border border-gray-100 shadow-sm p-5">
              <div className="flex items-start justify-between mb-3">
                <div>
                  <h3 className="font-bold text-gray-800">{cls.title}</h3>
                  <p className={`text-sm font-medium ${doc?.color === 'blue' ? 'text-blue-600' : 'text-pink-600'}`}>{cls.doctor}</p>
                </div>
                <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded-full font-medium">{cls.topic}</span>
              </div>
              <div className="flex flex-wrap gap-3 text-sm text-gray-500 mb-4">
                <span className="flex items-center gap-1"><Calendar size={13} /> {cls.date}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {cls.time}</span>
                <span className="flex items-center gap-1"><Clock size={13} /> {cls.duration}</span>
                <span className="flex items-center gap-1"><Users size={13} /> {cls.enrolled} enrolled</span>
              </div>
              <Link
                to={`/meeting?room=${cls.roomId}&name=${encodeURIComponent(joinName || registerForm.name || 'Student')}&type=class`}
                className={`flex items-center justify-center gap-2 w-full py-2 rounded-xl text-sm font-medium text-white transition-colors ${registered ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed pointer-events-none'}`}
              >
                <Video size={15} />
                {registered ? 'Join Live Class' : 'Register to Join'}
                <ArrowRight size={15} />
              </Link>
            </div>
          )
        })}
      </div>

      {/* How it works */}
      <div className="bg-gray-50 rounded-2xl p-6">
        <h2 className="text-lg font-bold text-gray-800 mb-4">How Classes Work</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm text-gray-600">
          {[
            { step: '1', title: 'Register Free', desc: 'Create your student account with just name and email' },
            { step: '2', title: 'Join Live Class', desc: 'Click "Join Live Class" a few minutes before the scheduled time' },
            { step: '3', title: 'Learn & Ask', desc: 'Interact with the doctor, ask questions, and learn in real time via video' },
          ].map(item => (
            <div key={item.step} className="flex gap-3">
              <div className="w-8 h-8 bg-blue-600 text-white rounded-full flex items-center justify-center font-bold text-sm flex-shrink-0">{item.step}</div>
              <div>
                <p className="font-semibold text-gray-800">{item.title}</p>
                <p>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
