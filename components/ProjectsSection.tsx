import styled from '@emotion/styled'
import projects from '../data/projects'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'
import ProjectBrief from './ProjectBrief'

const Section = styled.section`
  position: relative;
  color: var(--black);
  padding: 10em 0;
`
const Title = styled.h2`
  margin-bottom: 0;
  margin-top: 0;
`
const SubTitle = styled.div`
  font-weight: 500;
  font-size: 1.25em;
  margin-bottom: var(--spacing6);
  letter-spacing: 0.5px;
  font-weight: 300;
  line-height: 1.4;
`

const ProjectsSection = () => (
  <Section>
    <Container>
      <Title id="projecten">Projecten</Title>
      <SubTitle>
        Grote en kleine projecten met resultaten waar ik één voor één trots op
        ben.
      </SubTitle>

      {projects
        .sort((a, b) => (b.endedYear ?? '').localeCompare(a.endedYear ?? ''))
        .map((project) => {
          // Since ended year is used for sorting, it may be suffixed with a /
          // number to affect sort position
          const endedYear = project.endedYear?.split('/')[0]

          return (
            <ProjectBrief
              key={`${project.company}-${project.functionTitle}-${project.endedYear ?? ''}`}
              functionTitle={project.functionTitle}
              companyName={project.company}
              thumbnail={project.thumbnail}
              url={project.url}
              sourceCode={project.sourceCodeHref}
              started={project.startedYear}
              ended={endedYear}
              about={project.about}
              tech={project.tech}
              highlighted={project.highlighted}
              placeholder={project.placeholder}
            />
          )
        })}
    </Container>

    <ContactButtonClipped />
  </Section>
)

export default ProjectsSection
