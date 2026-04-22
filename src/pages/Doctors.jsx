import DoctorCard from '../components/DoctorCard'
import { doctors } from '../data/doctors'

export default function Doctors() {
  return (
    <div className="max-w-5xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Our Doctors</h1>
        <p className="text-gray-500">Experienced professionals dedicated to your health</p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {doctors.map(doc => (
          <DoctorCard key={doc.id} doctor={doc} />
        ))}
      </div>
    </div>
  )
}
