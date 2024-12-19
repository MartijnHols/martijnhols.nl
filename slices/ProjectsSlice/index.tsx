import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import ProjectBrief from '../../components/ProjectBrief'
import projects from '../../data/projects'

const Section = styled.section(
  ({ theme }) => css`
    position: relative;
    color: ${theme.colors.black};
    padding: 150px 0;
    overflow: hidden;
  `,
)
const Title = styled.h2`
  margin-bottom: 0;
  margin-top: 0;
`
const SubTitle = styled.div(
  ({ theme }) => css`
    font-weight: 500;
    font-size: 1.25em;
    margin-bottom: ${theme.spacing.x6}px;
    letter-spacing: 1px;
  `,
)

const ProjectsSlice = () => (
  <Section>
    <Container>
      <Title>Projecten</Title>
      <SubTitle>
        Grote en kleine projecten met resultaten waar ik één voor één trots op
        ben.
      </SubTitle>

      {projects
        ?.sort((a, b) => (b.endedYear || '').localeCompare(a.endedYear || ''))
        .map((project) => {
          // Since ended year is used for sorting, it may be suffixed with a /
          // number to affect sort position
          const endedYear = project.endedYear?.split('/')[0]

          return (
            <ProjectBrief
              key={`${project.company}-${project.functionTitle}-${project.endedYear}`}
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

export default ProjectsSlice
