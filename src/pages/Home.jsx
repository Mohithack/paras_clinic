import { Link } from 'react-router-dom'
import { Calendar, Video, BookOpen, Phone, Star, Shield, Clock } from 'lucide-react'
import { doctors } from '../data/doctors'

export default function Home() {
  return (
    <div>
      {/* Hero */}
      <section className="bg-gradient-to-br from-blue-600 to-blue-800 text-white py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 leading-tight">
            Your Health, Our Priority
          </h1>
          <p className="text-blue-100 text-lg mb-8 max-w-2xl mx-auto">
            Book appointments with expert doctors, join live medical classes, and connect via video consultation — all in one place.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link to="/book" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
              Book Appointment
            </Link>
            <Link to="/demo" className="bg-blue-500 text-white font-semibold px-6 py-3 rounded-xl border border-blue-400 hover:bg-blue-400 transition-colors">
              Try Demo Call
            </Link>
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <h2 className="text-center text-2xl font-bold text-gray-800 mb-10">What We Offer</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { icon: <Calendar size={28} className="text-blue-600" />, title: 'Easy Appointment Booking', desc: 'Schedule your visit with Dr. Paras or Dr. Isha in minutes. Pick your preferred date and time slot.' },
            { icon: <Video size={28} className="text-purple-600" />, title: 'Video Consultations', desc: 'Connect face-to-face from anywhere using our built-in video call system, just like Zoom.' },
            { icon: <BookOpen size={28} className="text-green-600" />, title: 'Medical Education', desc: 'Join live classes taught by our doctors. Learn, ask questions, and grow your medical knowledge.' },
          ].map((f, i) => (
            <div key={i} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm hover:shadow-md transition-shadow text-center">
              <div className="flex justify-center mb-3">{f.icon}</div>
              <h3 className="font-semibold text-gray-800 mb-2">{f.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Our Doctors */}
      <section className="bg-gray-50 py-16 px-4">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-center text-2xl font-bold text-gray-800 mb-2">Meet Our Doctors</h2>
          <p className="text-center text-gray-500 mb-10">Expert care from experienced professionals</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {doctors.map(doc => (
              <div key={doc.id} className="bg-white rounded-2xl p-6 border border-gray-100 shadow-sm flex gap-4 items-center">
                <div className={`rounded-full w-16 h-16 flex items-center justify-center text-2xl font-bold flex-shrink-0 ${doc.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                  {doc.name.replace('Dr. ', '').charAt(0)}
                </div>
                <div>
                  <h3 className="font-bold text-gray-800">{doc.name}</h3>
                  <p className={`text-sm font-medium mb-1 ${doc.color === 'blue' ? 'text-blue-600' : 'text-pink-600'}`}>{doc.specialty}</p>
                  <div className="flex items-center gap-1 text-gray-500 text-sm">
                    <Phone size={12} />
                    {doc.phone}
                  </div>
                </div>
                <Link to={`/book?doctor=${doc.id}`} className={`ml-auto text-sm font-medium px-4 py-2 rounded-xl text-white ${doc.color === 'blue' ? 'bg-blue-600 hover:bg-blue-700' : 'bg-pink-600 hover:bg-pink-700'} transition-colors`}>
                  Book
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="max-w-6xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-center">
          {[
            { icon: <Star className="text-yellow-500" size={32} />, value: '500+', label: 'Happy Patients' },
            { icon: <Shield className="text-green-500" size={32} />, value: '18+', label: 'Years Experience' },
            { icon: <Clock className="text-blue-500" size={32} />, value: '24/7', label: 'Online Support' },
          ].map((s, i) => (
            <div key={i} className="bg-white rounded-2xl p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-center mb-2">{s.icon}</div>
              <div className="text-3xl font-bold text-gray-800 mb-1">{s.value}</div>
              <div className="text-gray-500 text-sm">{s.label}</div>
            </div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="bg-blue-600 text-white py-14 px-4 text-center">
        <h2 className="text-2xl font-bold mb-3">Ready to Get Started?</h2>
        <p className="text-blue-100 mb-6">Book your first appointment or try a free demo call today.</p>
        <div className="flex flex-wrap justify-center gap-3">
          <Link to="/book" className="bg-white text-blue-700 font-semibold px-6 py-3 rounded-xl hover:bg-blue-50 transition-colors">
            Book Now
          </Link>
          <Link to="/demo" className="bg-blue-500 border border-blue-400 text-white font-semibold px-6 py-3 rounded-xl hover:bg-blue-400 transition-colors">
            Free Demo Call
          </Link>
        </div>
      </section>
    </div>
  )
}
