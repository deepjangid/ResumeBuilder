import './resume.css'

function Section({ title, children }) {
  return (
    <section className="resumeSection">
      <h2 className="resumeSectionTitle">{title}</h2>
      <div className="resumeSectionBody">{children}</div>
    </section>
  )
}

function ContactLine({ location, phone, email }) {
  const parts = [location, phone, email].filter(Boolean)
  return <p className="resumeContact">{parts.join(' | ')}</p>
}

function InlineList({ items }) {
  if (!items?.length) return null
  return <p className="inlineList">{items.join(' • ')}</p>
}

function SkillGroups({ groups }) {
  if (!groups?.length) return null
  return (
    <div className="skillGroups">
      {groups.map((group) => (
        <p className="skillGroup" key={group.label}>
          <span className="skillGroupLabel">{group.label}:</span>{' '}
          {group.items.join(', ')}
        </p>
      ))}
    </div>
  )
}

function Experience({ experience }) {
  if (!experience?.length) return null
  return (
    <Section title="Professional Experience">
      {experience.map((job, index) => (
        <article className="job" key={`${job.company}-${job.title}-${index}`}>
          <header className="jobHeader">
            <div className="jobLeft">
              <div className="jobTitle">{job.title}</div>
              <div className="jobCompany">
                {job.company}
                {job.location ? `, ${job.location}` : ''}
              </div>
            </div>
            <div className="jobDates">{job.dates}</div>
          </header>
          {job.bullets?.length ? (
            <ul className="jobBullets">
              {job.bullets.map((bullet, bulletIndex) => (
                <li key={`${index}-${bulletIndex}`}>{bullet}</li>
              ))}
            </ul>
          ) : null}
        </article>
      ))}
    </Section>
  )
}

function Education({ education }) {
  if (!education?.length) return null
  return (
    <Section title="Education">
      {education.map((edu, index) => (
        <div className="eduRow" key={`${edu.institution}-${edu.degree}-${index}`}>
          <div className="eduLeft">
            <div className="eduDegree">{edu.degree}</div>
            <div className="eduInstitution">
              {edu.institution}
              {edu.location ? `, ${edu.location}` : ''}
            </div>
          </div>
          <div className="eduRight">{edu.year}</div>
        </div>
      ))}
    </Section>
  )
}

export default function Resume({ data }) {
  return (
    <article className="resume" aria-label={`${data.name} resume`}>
      <header className="resumeHeader">
        <h1 className="resumeName">{data.name}</h1>
        <ContactLine
          location={data.location}
          phone={data.phone}
          email={data.email}
        />
      </header>

      {data.summary ? (
        <Section title="Professional Summary">
          <p className="resumeParagraph">{data.summary}</p>
        </Section>
      ) : null}

      {data.skillGroups?.length ? (
        <Section title="Core Skills">
          <SkillGroups groups={data.skillGroups} />
        </Section>
      ) : (
        <Section title="Skills">
          <InlineList items={data.skills} />
        </Section>
      )}

      <Experience experience={data.experience} />

      <Education education={data.education} />

      {data.certifications?.length ? (
        <Section title="Certifications">
          <InlineList items={data.certifications} />
        </Section>
      ) : null}

      {data.achievements?.length ? (
        <Section title="Achievements">
          <ul className="jobBullets">
            {data.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </Section>
      ) : null}
    </article>
  )
}

