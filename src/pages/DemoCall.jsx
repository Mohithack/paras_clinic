import { useState } from 'react'
import { Video, User, Stethoscope, CheckCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { doctors } from '../data/doctors'

export default function DemoCall() {
  const [name, setName] = useState('')
  const [selectedDoctor, setSelectedDoctor] = useState(null)
  const [started, setStarted] = useState(false)

  const roomId = selectedDoctor
    ? `medicare-demo-${doctors.find(d => d.id === selectedDoctor)?.name.replace('Dr. ', '').toLowerCase()}-${Date.now()}`
    : ''

  if (started && selectedDoctor) {
    const doc = doctors.find(d => d.id === selectedDoctor)
    return (
      <div className="max-w-lg mx-auto px-4 py-16 text-center">
        <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-8">
          <CheckCircle size={52} className="text-green-500 mx-auto mb-4" />
          <h2 className="text-2xl font-bold text-gray-800 mb-2">Demo Call Ready!</h2>
          <p className="text-gray-500 mb-6">
            Your demo call with <strong>{doc.name}</strong> is set up. Click below to join.
          </p>
          <div className="bg-blue-50 rounded-xl p-4 mb-6 text-sm text-blue-700">
            <p><strong>Room:</strong> {roomId}</p>
            <p><strong>Your name:</strong> {name}</p>
          </div>
          <Link
            to={`/meeting?room=${encodeURIComponent(roomId)}&name=${encodeURIComponent(name)}&type=demo`}
            className="block w-full bg-blue-600 text-white py-3 rounded-xl font-semibold hover:bg-blue-700 transition-colors"
          >
            <span className="flex items-center justify-center gap-2"><Video size={18} /> Join Demo Call</span>
          </Link>
          <button
            onClick={() => setStarted(false)}
            className="mt-3 text-gray-400 text-sm hover:text-gray-600"
          >
            Cancel
          </button>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-12">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-100 rounded-full mb-4">
          <Video size={32} className="text-blue-600" />
        </div>
        <h1 className="text-3xl font-bold text-gray-800 mb-2">Free Demo Call</h1>
        <p className="text-gray-500">Try a video consultation with our doctors — absolutely free, no registration required</p>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><User size={18} /> Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={e => setName(e.target.value)}
          className="w-full border border-gray-300 rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:border-blue-500"
          placeholder="Enter your name"
        />
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-gray-100 p-6 mb-6">
        <h2 className="font-semibold text-gray-800 mb-4 flex items-center gap-2"><Stethoscope size={18} /> Choose Doctor for Demo</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          {doctors.map(doc => (
            <div
              key={doc.id}
              onClick={() => setSelectedDoctor(doc.id)}
              className={`p-4 rounded-xl border-2 cursor-pointer transition-all ${selectedDoctor === doc.id ? (doc.color === 'blue' ? 'border-blue-500 bg-blue-50' : 'border-pink-500 bg-pink-50') : 'border-gray-200 hover:border-gray-300'}`}
            >
              <div className="flex items-center gap-3">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold ${doc.color === 'blue' ? 'bg-blue-100 text-blue-700' : 'bg-pink-100 text-pink-700'}`}>
                  {doc.name.replace('Dr. ', '').charAt(0)}
                </div>
                <div>
                  <p className="font-semibold text-gray-800 text-sm">{doc.name}</p>
                  <p className="text-xs text-gray-500">{doc.specialty}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <button
        disabled={!name.trim() || !selectedDoctor}
        onClick={() => setStarted(true)}
        className="w-full bg-blue-600 text-white py-3.5 rounded-xl font-semibold hover:bg-blue-700 transition-colors disabled:opacity-40 disabled:cursor-not-allowed flex items-center justify-center gap-2"
      >
        <Video size={20} />
        Start Free Demo Call
      </button>

      <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4 text-center text-sm text-gray-500">
        {[
          { icon: '🔒', text: 'Secure & Private' },
          { icon: '⚡', text: 'No Download Needed' },
          { icon: '🆓', text: '100% Free Demo' },
        ].map((item, i) => (
          <div key={i} className="bg-gray-50 rounded-xl p-3">
            <span className="text-2xl block mb-1">{item.icon}</span>
            {item.text}
          </div>
        ))}
      </div>
    </div>
  )
}
