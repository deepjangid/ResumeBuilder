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

function Stat({ value, label }) {
  return (
    <div className="stat">
      <div className="statValue">{value}</div>
      <div className="statLabel">{label}</div>
    </div>
  )
}

function Section({ id, title, children }) {
  return (
    <section className="section" id={id}>
      <h2 className="sectionTitle">{title}</h2>
      {children}
    </section>
  )
}

function ExperienceCard({ job }) {
  return (
    <article className="card experienceCard">
      <header className="experienceHeader">
        <div className="experienceLeft">
          <div className="experienceTitle">{job.title}</div>
          <div className="experienceMeta">
            {job.company}
            {job.location ? ` • ${job.location}` : ''}
          </div>
        </div>
        <div className="experienceDates">{job.dates}</div>
      </header>
      {job.bullets?.length ? (
        <ul className="bullets">
          {job.bullets.map((bullet, index) => (
            <li key={index}>{bullet}</li>
          ))}
        </ul>
      ) : null}
    </article>
  )
}

export default function LandingPage({ data, onDownload }) {
  const prefersDark = useMemo(
    () =>
      window.matchMedia?.('(prefers-color-scheme: dark)')?.matches === true,
    [],
  )

  const [theme, setTheme] = useStoredState(
    'landing_theme',
    prefersDark ? 'dark' : 'light',
  )
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

  const coreTagline =
    'Investor Relations • AML/KYC • Compliance Operations • Risk & Screening'

  return (
    <div className="landingRoot" data-theme={theme} data-accent={accent}>
      <Suspense fallback={null}>
        <Background3D accent={accent} />
      </Suspense>
      <div className="landingOverlay" aria-hidden="true" />

      <div className="landingContainer">
        <header className="topbar">
          <div className="brand">
            <div className="brandMark" aria-hidden="true">
              {initials || 'SS'}
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
                {theme === 'dark' ? 'Light' : 'Dark'} mode
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

            <button className="ctaButton" type="button" onClick={onDownload}>
              Download ATS resume
            </button>
          </div>
        </header>

        <main>
          <section className="hero">
            <div className="heroLeft">
              <h1 className="heroTitle">
                Back-office compliance, built for investor trust
              </h1>
              <p className="heroSubtitle">
                High-volume KYC operations, sanctions screening, and audit-ready
                documentation—delivered with speed and precision.
              </p>

              <div className="statsRow" role="list" aria-label="Highlights">
                <Stat value="4+ yrs" label="AML/KYC & IR experience" />
                <Stat value="250–400" label="KYC reviews / month" />
                <Stat value="98–99%" label="accuracy maintained" />
              </div>

              <div className="heroButtons">
                <button className="ctaButton" type="button" onClick={onDownload}>
                  Download ATS resume (PDF)
                </button>
                <a className="ghostButton" href={`mailto:${data.email}`}>
                  Email
                </a>
              </div>
            </div>

            <aside className="heroRight">
              <div className="card contactCard">
                <div className="cardTitle">Contact</div>
                <div className="kv">
                  <div className="kvKey">Location</div>
                  <div className="kvValue">{data.location}</div>
                </div>
                <div className="kv">
                  <div className="kvKey">Phone</div>
                  <div className="kvValue">{data.phone}</div>
                </div>
                <div className="kv">
                  <div className="kvKey">Email</div>
                  <div className="kvValue">{data.email}</div>
                </div>
                <div className="contactActions">
                  <button
                    className="ghostButton"
                    type="button"
                    onClick={onDownload}
                  >
                    Print / Save as PDF
                  </button>
                </div>
              </div>
            </aside>
          </section>

          <Section id="summary" title="Professional Summary">
            <div className="card">
              <p className="paragraph">{data.summary}</p>
            </div>
          </Section>

          <Section id="skills" title="Core Skills">
            <div className="skillsGrid">
              {(data.skillGroups ?? []).map((group) => (
                <div className="card" key={group.label}>
                  <div className="cardTitle">{group.label}</div>
                  <div className="tagRow">
                    {group.items.map((item) => (
                      <span className="tag" key={item}>
                        {item}
                      </span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </Section>

          <Section id="experience" title="Professional Experience">
            <div className="experienceList">
              {(data.experience ?? []).map((job) => (
                <ExperienceCard key={`${job.company}-${job.title}`} job={job} />
              ))}
            </div>
          </Section>

          <div className="splitRow">
            <Section id="education" title="Education">
              <div className="card">
                <div className="eduList">
                  {(data.education ?? []).map((edu) => (
                    <div className="eduItem" key={`${edu.degree}-${edu.year}`}>
                      <div className="eduTop">
                        <div className="eduDegree">{edu.degree}</div>
                        <div className="eduYear">{edu.year}</div>
                      </div>
                      <div className="eduMeta">
                        {edu.institution}
                        {edu.location ? ` • ${edu.location}` : ''}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </Section>

            <Section id="certifications" title="Certifications">
              <div className="card">
                <ul className="bullets">
                  {(data.certifications ?? []).map((cert) => (
                    <li key={cert}>{cert}</li>
                  ))}
                </ul>
              </div>
            </Section>
          </div>

          <Section id="achievements" title="Achievements">
            <div className="card">
              <ul className="bullets">
                {(data.achievements ?? []).map((achievement) => (
                  <li key={achievement}>{achievement}</li>
                ))}
              </ul>
            </div>
          </Section>
        </main>

        <footer className="footer">
          <div className="footerHint">
            Download uses your browser print dialog → select “Save as PDF”.
          </div>
        </footer>
      </div>
    </div>
  )
}
