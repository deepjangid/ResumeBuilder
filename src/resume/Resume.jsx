import './resume.css'

function Section({ title, children }) {
  return (
    <section className="resumeSection">
      <h2 className="resumeSectionTitle">{title}</h2>
      <div className="resumeSectionBody">{children}</div>
    </section>
  )
}

function ContactLine({ location, phone, email, links = [] }) {
  const parts = [
    email ? { label: 'Email', value: email, href: `mailto:${email}` } : null,
    phone ? { label: 'Phone', value: phone } : null,
    location ? { label: 'Location', value: location } : null,
    ...links.map((link) => typeof link === 'string' ? { label: '', value: link } : link)
  ].filter(Boolean)

  if (!parts.length) return null

  return (
    <p className="resumeContact">
      {parts.map((part, index) => {
        return (
          <span className="resumeContactItem" key={`${part.label || part.value}-${index}`}>
            {index > 0 ? (
              <span className="resumeContactDivider" aria-hidden="true">
                {' '}
                |{' '}
              </span>
            ) : null}
            {part.label ? <span className="contactLabel">{part.label}:</span> : null}{' '}
            {part.href ? (
              <a className="resumeContactLink" href={part.href}>
                {part.value}
              </a>
            ) : (
              part.value
            )}
          </span>
        )
      })}
    </p>
  )
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

function escapeRegExp(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

function emphasizeText(text, phrases = []) {
  if (!phrases.length) return text

  const pattern = phrases
    .filter(Boolean)
    .sort((first, second) => second.length - first.length)
    .map(escapeRegExp)
    .join('|')

  if (!pattern) return text

  const parts = text.split(new RegExp(`(${pattern})`, 'g'))

  return parts.map((part, index) =>
    phrases.includes(part) ? <strong key={`${part}-${index}`}>{part}</strong> : part
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
          {job.summary ? <p className="jobSummary">{job.summary}</p> : null}
          {job.bullets?.length ? (
            <ul className="jobBullets">
              {job.bullets.map((bullet, bulletIndex) => (
                <li key={`${index}-${bulletIndex}`}>{bullet}</li>
              ))}
            </ul>
          ) : null}
          {job.projects?.length ? (
            <div className="projectList">
              {job.projects.map((project, projectIndex) => (
                <div className="projectBlock" key={`${project.name}-${projectIndex}`}>
                  <div className="projectTitle">{project.name}</div>
                  {project.summary ? (
                    <p className="jobSummary">
                      {emphasizeText(project.summary, project.highlights)}
                    </p>
                  ) : null}
                  {project.bullets?.length ? (
                    <ul className="jobBullets">
                      {project.bullets.map((bullet, bulletIndex) => (
                        <li key={`${projectIndex}-${bulletIndex}`}>
                          {emphasizeText(bullet, project.highlights)}
                        </li>
                      ))}
                    </ul>
                  ) : null}
                  {project.techStack ? (
                    <p className="projectMeta">
                      <span className="projectMetaLabel">Tech Stack:</span>{' '}
                      {project.techStack}
                    </p>
                  ) : null}
                </div>
              ))}
            </div>
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

function AdditionalSections({ sections }) {
  if (!sections?.length) return null

  return sections.map((section) => (
    <Section title={section.title} key={section.title}>
      {section.paragraphs?.map((paragraph, index) => (
        <p className="resumeParagraph sectionParagraph" key={index}>
          {paragraph}
        </p>
      ))}
      {section.items?.length ? (
        <ul className="jobBullets">
          {section.items.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>
      ) : null}
    </Section>
  ))
}

export default function Resume({ data }) {
  return (
    <article className="resume" aria-label={`${data.name} resume`}>
      <header className="resumeHeader">
        <h1 className="resumeName">{data.name}</h1>
        {data.headline ? <p className="resumeHeadline">{data.headline}</p> : null}
        <ContactLine
          location={data.location}
          phone={data.phone}
          email={data.email}
          links={data.links}
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

      {data.achievements?.length ? (
        <Section title="Key Achievements">
          <ul className="jobBullets">
            {data.achievements.map((achievement, index) => (
              <li key={index}>{achievement}</li>
            ))}
          </ul>
        </Section>
      ) : null}

      <Experience experience={data.experience} />

      <AdditionalSections sections={data.additionalSections} />

      <Education education={data.education} />

      {data.certifications?.length ? (
        <Section title="Certifications">
          <InlineList items={data.certifications} />
        </Section>
      ) : null}
    </article>
  )
}

