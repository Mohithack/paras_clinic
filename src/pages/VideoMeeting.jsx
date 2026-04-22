import { useSearchParams, useNavigate } from 'react-router-dom'
import { useEffect, useRef } from 'react'
import { ArrowLeft } from 'lucide-react'

export default function VideoMeeting() {
  const [params] = useSearchParams()
  const navigate = useNavigate()
  const containerRef = useRef(null)
  const apiRef = useRef(null)

  const roomName = params.get('room') || `medicare-room-${Date.now()}`
  const displayName = params.get('name') || 'Guest'
  const type = params.get('type') || 'meeting'

  const labels = {
    class: 'Live Class',
    demo: 'Demo Call',
    meeting: 'Video Meeting',
  }

  useEffect(() => {
    if (!containerRef.current) return

    const loadJitsi = () => {
      if (!window.JitsiMeetExternalAPI) return

      const api = new window.JitsiMeetExternalAPI('meet.jit.si', {
        roomName,
        width: '100%',
        height: '100%',
        parentNode: containerRef.current,
        userInfo: { displayName },
        configOverwrite: {
          startWithAudioMuted: false,
          startWithVideoMuted: false,
          disableDeepLinking: true,
          prejoinPageEnabled: false,
        },
        interfaceConfigOverwrite: {
          TOOLBAR_BUTTONS: [
            'microphone', 'camera', 'desktop', 'fullscreen',
            'fodeviceselection', 'hangup', 'chat', 'raisehand',
            'videoquality', 'tileview', 'stats',
          ],
          SHOW_JITSI_WATERMARK: false,
          SHOW_WATERMARK_FOR_GUESTS: false,
        },
      })

      api.addEventListener('readyToClose', () => navigate(-1))
      apiRef.current = api
    }

    if (window.JitsiMeetExternalAPI) {
      loadJitsi()
    } else {
      const script = document.createElement('script')
      script.src = 'https://meet.jit.si/external_api.js'
      script.async = true
      script.onload = loadJitsi
      document.body.appendChild(script)
    }

    return () => {
      if (apiRef.current) {
        apiRef.current.dispose()
        apiRef.current = null
      }
    }
  }, [roomName, displayName, navigate])

  return (
    <div className="flex flex-col h-screen bg-gray-900">
      <div className="flex items-center gap-3 px-4 py-3 bg-gray-800 text-white">
        <button onClick={() => navigate(-1)} className="flex items-center gap-1 text-gray-400 hover:text-white transition-colors text-sm">
          <ArrowLeft size={16} /> Back
        </button>
        <div className="flex-1 text-center">
          <span className="font-medium">{labels[type] || 'Video Meeting'}</span>
          <span className="text-gray-400 text-sm ml-2">Room: {roomName}</span>
        </div>
      </div>
      <div ref={containerRef} className="flex-1" />
    </div>
  )
}
