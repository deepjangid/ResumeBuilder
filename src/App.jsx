import { useEffect, useState } from 'react'
import Resume from './resume/Resume.jsx'
import LandingPage from './landing/LandingPage.jsx'
import { anubhavVermaResume } from './resume/anubhavVermaResume.js'
import './App.css'

function App() {
  const [viewMode, setViewMode] = useState('interactive')
  const [activeSection, setActiveSection] = useState('overview')
  const [selectedItem, setSelectedItem] = useState(null)

  useEffect(() => {
    document.title = `${anubhavVermaResume.name} - Interactive 3D Portfolio`
  }, [])

  return (
    <main className="appShell" data-view-mode={viewMode}>
      <div className={`screen-view interactive-view ${viewMode === 'interactive' ? 'active' : ''}`}>
        <LandingPage
          data={anubhavVermaResume}
          activeSection={activeSection}
          setActiveSection={setActiveSection}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
          onDownload={() => window.print()}
          onViewPrintable={() => setViewMode('printable')}
        />
      </div>

      <div className={`screen-view printable-view ${viewMode === 'printable' ? 'active' : ''}`}>
        <header className="screenToolbar">
          <div>
            <p className="screenEyebrow">Resume</p>
            <h1 className="screenTitle">{anubhavVermaResume.name}</h1>
            <p className="screenSubtitle">
              Clean printable layout. Use download to save it as PDF.
            </p>
          </div>

          <div className="screenActions">
            <button
              className="primaryButton"
              type="button"
              onClick={() => window.print()}
            >
              Download Resume
            </button>
            <a className="secondaryButton" href={`mailto:${anubhavVermaResume.email}`}>
              Email
            </a>
            <button
              className="secondaryButton"
              type="button"
              onClick={() => setViewMode('interactive')}
            >
              Back to Portfolio
            </button>
          </div>
        </header>

        <div className="resumeStage">
          <div className="resumePaper">
            <Resume data={anubhavVermaResume} />
          </div>
        </div>
      </div>
    </main>
  )
}

export default App
