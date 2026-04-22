import { Phone, MapPin, Mail, Stethoscope } from 'lucide-react'

export default function Footer() {
  return (
    <footer className="bg-gray-900 text-gray-300 mt-auto">
      <div className="max-w-6xl mx-auto px-4 py-12 grid grid-cols-1 md:grid-cols-3 gap-8">
        <div>
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-3">
            <Stethoscope size={22} />
            Guru Kirpa Clinic
          </div>
          <p className="text-sm leading-relaxed">
            Providing quality healthcare and medical education. Book appointments, join classes, and connect with our expert doctors.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Our Doctors</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-blue-400" />
              <span>Dr. Paras — 8559089091</span>
            </div>
            <div className="flex items-center gap-2">
              <Phone size={14} className="text-pink-400" />
              <span>Dr. Isha — 8699579092</span>
            </div>
          </div>
        </div>

        <div>
          <h3 className="text-white font-semibold mb-3">Contact</h3>
          <div className="space-y-2 text-sm">
            <div className="flex items-center gap-2">
              <MapPin size={14} />
              <span>123 Health Street, Medical District</span>
            </div>
            <div className="flex items-center gap-2">
              <Mail size={14} />
              <span>info@medicareclinic.com</span>
            </div>
          </div>
        </div>
      </div>
      <div className="border-t border-gray-800 text-center py-4 text-xs text-gray-500">
        © 2025 Guru Kirpa Clinic. All rights reserved.
      </div>
    </footer>
  )
}
