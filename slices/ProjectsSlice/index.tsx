import styled from '@emotion/styled'
import { asLink } from '@prismicio/helpers'
import { usePrismicClient } from '@prismicio/react'
import {
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
  TitleField,
} from '@prismicio/types'
import { useRouter } from 'next/router'
import { useQuery } from 'react-query'

import ContactButton from '../../components/ContactButton'
import Container from '../../components/Container'
import PrismicRichText from '../../components/PrismicRichText'
import PrismicTitle from '../../components/PrismicTitle'
import ProjectBrief from '../../components/ProjectBrief'
import { breakpoints, colors, spacing } from '../../theme'
import convertPrismicImage from '../../utils/convertPrismicImage'
import { toPrismicLocale } from '../../utils/locales'
import { PrefetchContext } from '../../utils/prefetchSliceSubQueries'
import { getProjects } from '../../utils/prismic'
import prismicLinkResolver from '../../utils/prismicLinkResolver'

const ContactButtonClipper = styled.div`
  clip-path: inset(0 0 0 0);
`
const Section = styled.div`
  background: ${colors.dominant};
  color: ${colors.complementary};
  padding: 150px 0;
  overflow: hidden;
`
const Title = styled.h2`
  text-transform: uppercase;
  font-weight: 800;
  transform: rotate(-2deg);
  border-top: ${spacing.x2}px solid currentColor;
  display: inline-block;
  margin-bottom: 0;
`
const SubTitle = styled.h3`
  text-transform: uppercase;
  font-weight: 600;
  font-size: 24px;
  transform: rotate(-2deg);
  margin-bottom: ${spacing.x6}px;
  letter-spacing: 3px;
  margin-left: 5px;

  @media (min-width: ${breakpoints.TABLET}px) {
    // The translation puts it at the same position as a border-bottom should be,
    // which should be nice for visual consistency.
    transform: rotate(-2deg) translateY(-50%);
  }
`

export type PrismicProjectsSlice = SharedSlice<
  'projects_slice',
  SharedSliceVariation<
    'default',
    {
      title: TitleField
      explanation: RichTextField
    }
  >
>

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
  slice: PrismicProjectsSlice
}

const ProjectsSlice = ({ slice }: Props) => {
  const projects = useProjects()

  return (
    <ContactButtonClipper>
      <Section>
        <Container>
          <Title>
            <PrismicTitle field={slice.primary.title} />
          </Title>
          <SubTitle>
            <PrismicRichText field={slice.primary.explanation} />
          </SubTitle>

          {projects
            ?.sort((a, b) =>
              (b.endedYear || '').localeCompare(a.endedYear || ''),
            )
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
                  tech={
                    project.tech?.split(',').map((item) => item.trim()) || []
                  }
                  highlighted={project.highlighted}
                />
              )
            })}
        </Container>
      </Section>

      <ContactButton />
    </ContactButtonClipper>
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
