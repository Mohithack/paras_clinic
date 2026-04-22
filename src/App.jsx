import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Home from './pages/Home'
import Doctors from './pages/Doctors'
import BookAppointment from './pages/BookAppointment'
import StudentPortal from './pages/StudentPortal'
import VideoMeeting from './pages/VideoMeeting'
import DemoCall from './pages/DemoCall'

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/meeting" element={<VideoMeeting />} />
        <Route path="*" element={
          <div className="flex flex-col min-h-screen">
            <Navbar />
            <main className="flex-1">
              <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/doctors" element={<Doctors />} />
                <Route path="/book" element={<BookAppointment />} />
                <Route path="/students" element={<StudentPortal />} />
                <Route path="/demo" element={<DemoCall />} />
              </Routes>
            </main>
            <Footer />
          </div>
        } />
      </Routes>
    </BrowserRouter>
  )
}
