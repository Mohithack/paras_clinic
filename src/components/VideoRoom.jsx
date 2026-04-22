import { useEffect, useRef } from 'react'

export default function VideoRoom({ roomName, displayName, onLeave }) {
  const containerRef = useRef(null)

  useEffect(() => {
    if (!containerRef.current) return

    const domain = 'meet.jit.si'
    const options = {
      roomName: roomName,
      width: '100%',
      height: '100%',
      parentNode: containerRef.current,
      userInfo: {
        displayName: displayName || 'Guest',
      },
      configOverwrite: {
        startWithAudioMuted: false,
        startWithVideoMuted: false,
        disableDeepLinking: true,
        prejoinPageEnabled: false,
      },
      interfaceConfigOverwrite: {
        TOOLBAR_BUTTONS: [
          'microphone', 'camera', 'closedcaptions', 'desktop', 'fullscreen',
          'fodeviceselection', 'hangup', 'chat', 'raisehand', 'videoquality',
          'filmstrip', 'feedback', 'stats', 'shortcuts', 'tileview', 'download', 'help',
        ],
        SHOW_JITSI_WATERMARK: false,
        SHOW_WATERMARK_FOR_GUESTS: false,
        DEFAULT_BACKGROUND: '#1e293b',
      },
    }

    const script = document.createElement('script')
    script.src = 'https://meet.jit.si/external_api.js'
    script.async = true
    script.onload = () => {
      const api = new window.JitsiMeetExternalAPI(domain, options)
      api.addEventListener('readyToClose', () => {
        if (onLeave) onLeave()
      })
    }
    document.body.appendChild(script)

    return () => {
      document.body.removeChild(script)
    }
  }, [roomName, displayName, onLeave])

  return (
    <div ref={containerRef} className="w-full h-full min-h-[600px] rounded-xl overflow-hidden" />
  )
}
