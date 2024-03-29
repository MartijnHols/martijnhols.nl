import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import { asLink } from '@prismicio/helpers'
import { usePrismicClient } from '@prismicio/react'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import PrismicRichText from '../../components/PrismicRichText'
import PrismicTitle from '../../components/PrismicTitle'
import ProjectBrief from '../../components/ProjectBrief'
import convertPrismicImage from '../../utils/convertPrismicImage'
import { toPrismicLocale } from '../../utils/locales'
import { PrefetchContext } from '../../utils/prefetchSliceSubQueries'
import { getProjects } from '../../utils/prismic'
import prismicLinkResolver from '../../utils/prismicLinkResolver'

const Section = styled.section(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.yellow};
    color: ${theme.colors.black};
    padding: 150px 0;
    overflow: hidden;
  `,
)
const Title = styled.h2(
  ({ theme }) => css`
    text-transform: uppercase;
    font-weight: 800;
    transform: rotate(-1deg);
    border-top: ${theme.spacing.x2}px solid currentColor;
    display: inline-block;
    margin-bottom: 0;
    margin-top: 0;
  `,
)
const SubTitle = styled.div(
  ({ theme }) => css`
    text-transform: uppercase;
    font-weight: 600;
    font-size: 24px;
    transform: rotate(-1deg);
    margin-bottom: ${theme.spacing.x6}px;
    letter-spacing: 3px;
    margin-left: 5px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      // The translation puts it at the same position as a border-bottom should be,
      // which should be nice for visual consistency.
      transform: rotate(-1deg) translateY(-40%);
    }
  `,
)

const useProjects = () => {
  const { locale } = useRouter()
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const prismicLocale = toPrismicLocale(locale!)
  const prismicClient = usePrismicClient()
  const { data } = useQuery(['projects', prismicLocale], () =>
    getProjects(prismicClient, prismicLocale),
  )
  return data?.map((item) => item.data)
}

interface Props {
  slice: Content.ProjectsSliceSlice
}

const ProjectsSlice = ({ slice }: Props) => {
  const projects = useProjects()

  return (
    <Section>
      <Container>
        <Title>
          <PrismicTitle field={slice.primary.title} />
        </Title>
        <SubTitle>
          <PrismicRichText field={slice.primary.explanation} />
        </SubTitle>

        {projects
          ?.sort((a, b) => (b.endedYear || '').localeCompare(a.endedYear || ''))
          .map((project) => {
            const thumbnail = convertPrismicImage(project.thumbnail)
            if (!project.name) {
              return null
            }

            const url = asLink(project.url, prismicLinkResolver)
            const sourceCode = asLink(project.sourceCode, prismicLinkResolver)
            // Since ended year is used for sorting, it may be suffixed with a /
            // number to affect sort position
            const endedYear = project.endedYear?.split('/')[0]

            return (
              <ProjectBrief
                key={project.name}
                name={project.name}
                thumbnail={thumbnail}
                url={url || undefined}
                sourceCode={sourceCode || undefined}
                started={project.startedYear || undefined}
                ended={endedYear}
                about={<PrismicRichText field={project.brief} multiline />}
                tech={project.tech?.split(',').map((item) => item.trim()) || []}
                highlighted={project.highlighted}
                placeholder={project.placeholder}
              />
            )
          })}
      </Container>

      <ContactButtonClipped />
    </Section>
  )
}
ProjectsSlice.prefetch = async ({
  prismicClient,
  queryClient,
  prismicLocale,
}: PrefetchContext) => {
  await queryClient.prefetchQuery(['projects', prismicLocale], () =>
    getProjects(prismicClient, prismicLocale),
  )
}

export default ProjectsSlice
