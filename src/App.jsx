import { useEffect } from 'react'
import LandingPage from './landing/LandingPage.jsx'
import Resume from './resume/Resume.jsx'
import { sheetalSinghResume } from './resume/sheetalSinghResume.js'
import './App.css'

function App() {
  useEffect(() => {
    document.title = `${sheetalSinghResume.name} - Portfolio`
  }, [])

  return (
    <>
      <LandingPage data={sheetalSinghResume} onDownload={() => window.print()} />

      <div className="printRoot">
        <div className="resumePaper">
          <Resume data={sheetalSinghResume} />
        </div>
      </div>
    </>
  )
}

export default App
