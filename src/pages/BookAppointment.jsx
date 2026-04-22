import { useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import { Calendar, Clock, User, CheckCircle } from 'lucide-react'
import { doctors } from '../data/doctors'
import { format, addDays, isSunday } from 'date-fns'

export default function BookAppointment() {
  const [params] = useSearchParams()
  const defaultDoctor = parseInt(params.get('doctor')) || 1

  const [step, setStep] = useState(1)
  const [form, setForm] = useState({
    doctorId: defaultDoctor,
    date: '',
    time: '',
    name: '',
    phone: '',
    email: '',
    reason: '',
  })
  const [submitted, setSubmitted] = useState(false)

  const selectedDoctor = doctors.find(d => d.id === form.doctorId) || doctors[0]

  // Generate next 14 available dates (no Sundays)
  const availableDates = []
  let d = addDays(new Date(), 1)
  while (availableDates.length < 14) {
    if (!isSunday(d)) availableDates.push(new Date(d))
    d = addDays(d, 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    // In production, save to Supabase here:
    // await supabase.from('appointments').insert([{ ...form }])
    setSubmitted(true)
  }

  if (submitted) {
    return (
      <div className="max-w-md mx-auto px-4 py-20 text-center">
        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100">
          <CheckCircle size={56} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Appointment Booked!</h2>
          <p className="text-gray-500 mb-4">
            Your appointment with <strong>{selectedDoctor.name}</strong> on{' '}
            <strong>{form.date}</strong> at <strong>{form.time}</strong> is confirmed.
          </p>
          <p className="text-sm text-gray-400">You will receive a confirmation call on <strong>{form.phone}</strong>.</p>
          <button
            onClick={() => { setSubmitted(false); setStep(1); setForm({ ...form, date: '', time: '', name: '', phone: '', email: '', reason: '' }) }}
            className="mt-6 bg-blue-600 text-white px-6 py-2 rounded-xl hover:bg-blue-700 transition-colors text-sm font-medium"
          >
            Book Another
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Book Appointment</h1>
        <p className="text-gray-500">Schedule your visit in 3 easy steps</p>
      </div>

      {/* Step indicator */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2, 3].map(s => (
          <div key={s} className="flex items-center gap-2">
            <div className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold ${step >= s ? 'bg-blue-600 text-white' : 'bg-gray-200 text-gray-500'}`}>
              {s}
            </div>
            {s < 3 && <div className={`w-12 h-1 rounded ${step > s ? 'bg-blue-600' : 'bg-gray-200'}`} />}
          </div>
        ))}
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6">
        {/* Step 1: Select Doctor & Date */}
        {step === 1 && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><User size={18} /> Choose Doctor</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 mb-6">
              {doctors.map(doc => (
                <div
                  key={doc.id}
                  onClick={() => setForm({ ...form, doctorId: doc.id })}
                  className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${form.doctorId === doc.id ? (doc.color === 'blue' ? 'border-blue-500 bg-blue-50' : 'border-pink-500 bg-pink-50') : 'border-gray-200 hover:border-gray-300'}`}
                >
                  <div className={`font-semibold ${doc.color === 'blue' ? 'text-blue-700' : 'text-pink-700'}`}>{doc.name}</div>
                  <div className="text-sm text-gray-500">{doc.specialty}</div>
                </div>
              ))}
            </div>

            <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Calendar size={18} /> Select Date</h2>
            <div className="grid grid-cols-3 md:grid-cols-4 gap-2 mb-6">
              {availableDates.map(date => {
                const dateStr = format(date, 'yyyy-MM-dd')
                return (
                  <div
                    key={dateStr}
                    onClick={() => setForm({ ...form, date: dateStr, time: '' })}
                    className={`p-2 rounded-xl border text-center cursor-pointer transition-all text-sm ${form.date === dateStr ? 'border-blue-500 bg-blue-50 text-blue-700 font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-600'}`}
                  >
                    <div className="font-medium">{format(date, 'EEE')}</div>
                    <div>{format(date, 'dd MMM')}</div>
                  </div>
                )
              })}
            </div>

            {form.date && (
              <>
                <h2 className="font-semibold text-gray-800 mb-3 flex items-center gap-2"><Clock size={18} /> Select Time</h2>
                <div className="flex flex-wrap gap-2">
                  {selectedDoctor.availableSlots.map(slot => (
                    <button
                      key={slot}
                      onClick={() => setForm({ ...form, time: slot })}
                      className={`px-3 py-1.5 rounded-lg border text-sm transition-all ${form.time === slot ? 'bg-blue-600 text-white border-blue-600' : 'border-gray-200 text-gray-600 hover:border-blue-300'}`}
                    >
                      {slot}
                    </button>
                  ))}
                </div>
              </>
            )}

            <button
              disabled={!form.date || !form.time}
              onClick={() => setStep(2)}
              className="mt-6 w-full bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Next: Your Details
            </button>
          </div>
        )}

        {/* Step 2: Patient info */}
        {step === 2 && (
          <div>
            <h2 className="font-semibold text-gray-800 mb-4">Your Information</h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Full Name *</label>
                <input
                  type="text"
                  value={form.name}
                  onChange={e => setForm({ ...form, name: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="Enter your full name"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Phone Number *</label>
                <input
                  type="tel"
                  value={form.phone}
                  onChange={e => setForm({ ...form, phone: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="10-digit mobile number"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Email (optional)</label>
                <input
                  type="email"
                  value={form.email}
                  onChange={e => setForm({ ...form, email: e.target.value })}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500"
                  placeholder="your@email.com"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Reason for Visit</label>
                <textarea
                  value={form.reason}
                  onChange={e => setForm({ ...form, reason: e.target.value })}
                  rows={3}
                  className="w-full border border-gray-300 rounded-xl px-3 py-2 text-sm focus:outline-none focus:border-blue-500 resize-none"
                  placeholder="Briefly describe your symptoms or reason"
                />
              </div>
            </div>
            <div className="flex gap-3 mt-6">
              <button onClick={() => setStep(1)} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button
                disabled={!form.name || !form.phone}
                onClick={() => setStep(3)}
                className="flex-1 bg-blue-600 text-white py-3 rounded-xl font-medium hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
              >
                Review
              </button>
            </div>
          </div>
        )}

        {/* Step 3: Confirm */}
        {step === 3 && (
          <form onSubmit={handleSubmit}>
            <h2 className="font-semibold text-gray-800 mb-4">Confirm Appointment</h2>
            <div className="bg-gray-50 rounded-xl p-4 space-y-2 mb-6 text-sm">
              <div className="flex justify-between"><span className="text-gray-500">Doctor</span><span className="font-medium">{selectedDoctor.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Date</span><span className="font-medium">{form.date}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Time</span><span className="font-medium">{form.time}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Patient</span><span className="font-medium">{form.name}</span></div>
              <div className="flex justify-between"><span className="text-gray-500">Phone</span><span className="font-medium">{form.phone}</span></div>
              {form.reason && <div className="flex justify-between"><span className="text-gray-500">Reason</span><span className="font-medium text-right max-w-[60%]">{form.reason}</span></div>}
            </div>
            <div className="flex gap-3">
              <button type="button" onClick={() => setStep(2)} className="flex-1 border border-gray-300 text-gray-600 py-3 rounded-xl font-medium hover:bg-gray-50 transition-colors">
                Back
              </button>
              <button type="submit" className="flex-1 bg-green-600 text-white py-3 rounded-xl font-medium hover:bg-green-700 transition-colors">
                Confirm Booking
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  )
}
