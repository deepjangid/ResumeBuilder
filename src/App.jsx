import { useEffect } from 'react'
import Resume from './resume/Resume.jsx'
import { deepakKumarResume } from './resume/deepakKumarResume.js'
import './App.css'

function App() {
  useEffect(() => {
    document.title = `${deepakKumarResume.name} - Resume`
  }, [])

  return (
    <main className="appShell">
      <header className="screenToolbar">
        <div>
          <p className="screenEyebrow">Resume</p>
          <h1 className="screenTitle">{deepakKumarResume.name}</h1>
          <p className="screenSubtitle">{deepakKumarResume.headline}</p>
        </div>

        <div className="screenActions">
          <button className="primaryButton" type="button" onClick={() => window.print()}>
            Download Resume
          </button>
          <a className="secondaryButton" href={`mailto:${deepakKumarResume.email}`}>
            Email
          </a>
        </div>
      </header>

      <div className="resumeStage">
        <div className="resumePaper">
          <Resume data={deepakKumarResume} />
        </div>
      </div>
    </main>
  )
}

export default App
