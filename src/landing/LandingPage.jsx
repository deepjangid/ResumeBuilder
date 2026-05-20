import { Suspense, lazy, useEffect, useMemo, useState } from 'react'
import './landing.css'

const Background3D = lazy(() => import('./Background3D.jsx'))

const ACCENTS = [
  { id: 'gold', label: 'Gold' },
  { id: 'teal', label: 'Teal' },
  { id: 'violet', label: 'Violet' },
]

function useStoredState(key, fallback) {
  const [value, setValue] = useState(() => {
    try {
      const stored = window.localStorage.getItem(key)
      return stored ?? fallback
    } catch {
      return fallback
    }
  })

  useEffect(() => {
    try {
      window.localStorage.setItem(key, value)
    } catch {
      // ignore
    }
  }, [key, value])

  return [value, setValue]
}

export default function LandingPage({
  data,
  activeSection,
  setActiveSection,
  selectedItem,
  setSelectedItem,
  onDownload,
  onViewPrintable,
}) {
  const prefersDark = useMemo(
    () => window.matchMedia?.('(prefers-color-scheme: dark)')?.matches === true,
    [],
  )

  const [theme, setTheme] = useStoredState('landing_theme', prefersDark ? 'dark' : 'light')
  const [accent, setAccent] = useStoredState('landing_accent', 'gold')

  const initials = useMemo(() => {
    const parts = String(data.name ?? '')
      .trim()
      .split(/\s+/)
      .filter(Boolean)
    return parts
      .slice(0, 2)
      .map((p) => p[0]?.toUpperCase())
      .join('')
  }, [data.name])

  const coreTagline = 'Process Analysis • Workflow Optimization • Stakeholder Management • Agile Delivery'

  // Handle section transition
  const handleSectionChange = (section) => {
    setActiveSection(section)
    setSelectedItem(null) // Clear selection when camera moves
  }

  return (
    <div className="landingRoot" data-theme={theme} data-accent={accent}>
      {/* 3D WebGL Canvas in background */}
      <Suspense fallback={<div className="canvasLoader">Loading 3D Engine...</div>}>
        <Background3D
          accent={accent}
          activeSection={activeSection}
          selectedItem={selectedItem}
          setSelectedItem={setSelectedItem}
        />
      </Suspense>
      <div className="landingOverlay" aria-hidden="true" />

      {/* Floating HUD Interface */}
      <div className="landingContainer">
        
        {/* TOPBAR */}
        <header className="topbar">
          <div className="brand" onClick={() => handleSectionChange('overview')}>
            <div className="brandMark" aria-hidden="true">
              {initials || 'AV'}
            </div>
            <div className="brandText">
              <div className="brandName">{data.name}</div>
              <div className="brandRole">{coreTagline}</div>
            </div>
          </div>

          <div className="topbarActions">
            <div className="themeRow" role="group" aria-label="Theme controls">
              <button
                className="chipButton"
                type="button"
                onClick={() => setTheme((t) => (t === 'dark' ? 'light' : 'dark'))}
              >
                {theme === 'dark' ? 'Light' : 'Dark'} Mode
              </button>

              <div className="accentPicker" role="group" aria-label="Accent">
                {ACCENTS.map((item) => (
                  <button
                    key={item.id}
                    type="button"
                    className="accentDot"
                    data-accent={item.id}
                    aria-label={item.label}
                    aria-pressed={accent === item.id}
                    onClick={() => setAccent(item.id)}
                  />
                ))}
              </div>
            </div>

            <button className="secondaryCta" type="button" onClick={onViewPrintable}>
              Printable CV
            </button>
            <button className="ctaButton" type="button" onClick={onDownload}>
              Print / Save PDF
            </button>
          </div>
        </header>

        {/* MAIN HUD CONTENT */}
        <main className="hudMain">
          
          {/* CAMERA SECTION NAVIGATION (Bottom HUD Bar) */}
          <nav className="hudNavigation" aria-label="3D Preset Navigator">
            <button
              className={`hudNavButton ${activeSection === 'overview' ? 'active' : ''}`}
              type="button"
              onClick={() => handleSectionChange('overview')}
            >
              <span className="hudNavIcon">🌐</span>
              <span className="hudNavLabel">Overview Hub</span>
            </button>
            
            <button
              className={`hudNavButton ${activeSection === 'process' ? 'active' : ''}`}
              type="button"
              onClick={() => handleSectionChange('process')}
            >
              <span className="hudNavIcon">⚙️</span>
              <span className="hudNavLabel">Process Map</span>
            </button>
            
            <button
              className={`hudNavButton ${activeSection === 'metrics' ? 'active' : ''}`}
              type="button"
              onClick={() => handleSectionChange('metrics')}
            >
              <span className="hudNavIcon">📈</span>
              <span className="hudNavLabel">Business Metrics</span>
            </button>
            
            <button
              className={`hudNavButton ${activeSection === 'projects' ? 'active' : ''}`}
              type="button"
              onClick={() => handleSectionChange('projects')}
            >
              <span className="hudNavIcon">📋</span>
              <span className="hudNavLabel">Projects Kanban</span>
            </button>
          </nav>

          {/* DYNAMIC DETAILS GLASS PANEL (Right Sidebar) */}
          <aside className="hudDetailsPanel">
            {!selectedItem ? (
              <div className="detailsCard welcomeCard">
                <div className="cardBadge">INTERACTIVE SYSTEM</div>
                <h2 className="panelTitle">Operational Workflow Dashboard</h2>
                <p className="panelSummary">
                  Click on any interactive element in the 3D scene (Workflow Spheres, Metric Columns, or Kanban Cards) to inspect details.
                </p>
                <div className="quickGuide">
                  <div className="guideRow">
                    <span className="guideIcon">🖱️</span>
                    <span><strong>Left Click & Drag:</strong> Rotate camera perspective</span>
                  </div>
                  <div className="guideRow">
                    <span className="guideIcon">↕️</span>
                    <span><strong>Mouse Scroll / Pinch:</strong> Zoom in & out</span>
                  </div>
                  <div className="guideRow">
                    <span className="guideIcon">🤚</span>
                    <span><strong>Right Click & Drag:</strong> Pan camera translation</span>
                  </div>
                </div>
              </div>
            ) : (
              <div className="detailsCard inspectCard active">
                <div className="cardHeader">
                  <span className="cardBadge">
                    {selectedItem.type === 'process'
                      ? 'WORKFLOW PROCESS STAGE'
                      : selectedItem.type === 'metric'
                      ? 'KEY PERFORMANCE METRIC'
                      : 'KANBAN PROJECT RECORD'}
                  </span>
                  <button
                    className="closeButton"
                    type="button"
                    onClick={() => setSelectedItem(null)}
                    aria-label="Close panel"
                  >
                    ×
                  </button>
                </div>

                <h2 className="panelTitle">{selectedItem.title}</h2>
                {selectedItem.value && (
                  <div className="panelValueBadge">{selectedItem.value}</div>
                )}
                
                <p className="panelDescription">{selectedItem.description}</p>

                <div className="cardActions">
                  <button className="glassButton" type="button" onClick={() => setSelectedItem(null)}>
                    Dismiss Inspect
                  </button>
                  <button className="primaryGlassButton" type="button" onClick={onViewPrintable}>
                    Check Full CV
                  </button>
                </div>
              </div>
            )}
          </aside>
        </main>

        {/* FOOTER */}
        <footer className="footer">
          <div className="footerHint">
            Anubhav Verma • Certified Business Analyst Portfolio • Drag in 3D Space to Interact
          </div>
        </footer>
      </div>
    </div>
  )
}
