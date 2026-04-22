import { Phone, Award, BookOpen } from 'lucide-react'
import { Link } from 'react-router-dom'

export default function DoctorCard({ doctor }) {
  const colorMap = {
    blue: { bg: 'bg-blue-100', text: 'text-blue-700', btn: 'bg-blue-600 hover:bg-blue-700', avatar: 'bg-blue-200' },
    pink: { bg: 'bg-pink-100', text: 'text-pink-700', btn: 'bg-pink-600 hover:bg-pink-700', avatar: 'bg-pink-200' },
  }
  const c = colorMap[doctor.color] || colorMap.blue

  const initials = doctor.name.replace('Dr. ', '').charAt(0)

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden hover:shadow-md transition-shadow">
      <div className={`${c.bg} p-8 flex justify-center`}>
        <div className={`${c.avatar} rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold ${c.text}`}>
          {initials}
        </div>
      </div>
      <div className="p-5">
        <h3 className="text-xl font-bold text-gray-800">{doctor.name}</h3>
        <p className={`text-sm font-medium ${c.text} mb-2`}>{doctor.specialty}</p>
        <p className="text-gray-500 text-sm mb-4 leading-relaxed">{doctor.bio}</p>

        <div className="flex flex-wrap gap-2 mb-4">
          <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
            <Award size={12} /> {doctor.experience}
          </span>
          <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
            <BookOpen size={12} /> {doctor.education}
          </span>
          <span className="flex items-center gap-1 text-xs bg-gray-100 px-2 py-1 rounded-full text-gray-600">
            <Phone size={12} /> {doctor.phone}
          </span>
        </div>

        <Link
          to={`/book?doctor=${doctor.id}`}
          className={`block text-center ${c.btn} text-white py-2 px-4 rounded-xl text-sm font-medium transition-colors`}
        >
          Book Appointment
        </Link>
      </div>
    </div>
  )
}
