import styled from "@emotion/styled";
import { asLink } from "@prismicio/helpers";
import { usePrismicClient } from "@prismicio/react";
import {
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
  TitleField,
} from "@prismicio/types";
import { useRouter } from "next/router";
import { useQuery } from "react-query";

import ContactButton from "../../components/ContactButton";
import Container from "../../components/Container";
import PrismicRichText from "../../components/PrismicRichText";
import PrismicTitle from "../../components/PrismicTitle";
import ProjectBrief from "../../components/ProjectBrief";
import { colors, spacing } from "../../theme";
import convertPrismicImage from "../../utils/convertPrismicImage";
import { toPrismicLocale } from "../../utils/locales";
import { PrefetchContext } from "../../utils/prefetchSliceSubQueries";
import { getProjects } from "../../utils/prismic";
import prismicLinkResolver from "../../utils/prismicLinkResolver";

const ContactButtonClipper = styled.div`
  clip-path: inset(0 0 0 0);
`;
const Section = styled.div`
  background: ${colors.dominant};
  color: ${colors.complementary};
  padding: 150px 0;
`;
const Explanation = styled.div`
  margin-bottom: ${spacing.x6}px;
`;

export type PrismicProjectsSlice = SharedSlice<
  "projects_slice",
  SharedSliceVariation<
    "default",
    {
      title: TitleField;
      explanation: RichTextField;
    }
  >
>;

const useProjects = () => {
  const { locale } = useRouter();
  const prismicLocale = toPrismicLocale(locale!);
  const prismicClient = usePrismicClient();
  const { data } = useQuery(["projects", prismicLocale], () =>
    getProjects(prismicClient, prismicLocale)
  );
  return data?.map((item) => item.data);
};

interface Props {
  slice: PrismicProjectsSlice;
}

const ProjectsSlice = ({ slice }: Props) => {
  const projects = useProjects();

  return (
    <ContactButtonClipper>
      <Section>
        <Container>
          <h2>
            <PrismicTitle field={slice.primary.title} />
          </h2>
          <Explanation>
            <PrismicRichText field={slice.primary.explanation} />
          </Explanation>

          {projects
            ?.sort((a, b) =>
              (b.endedYear || "").localeCompare(a.endedYear || "")
            )
            .map((project) => {
              const thumbnail = convertPrismicImage(project.thumbnail);
              if (!thumbnail || !project.name) {
                return null;
              }

              const url = asLink(project.url, prismicLinkResolver);
              const sourceCode = asLink(
                project.sourceCode,
                prismicLinkResolver
              );
              // Since ended year is used for sorting, it may be suffixed with a /
              // number to affect sort position
              const endedYear = project.endedYear?.split("/")[0];

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
                    project.tech?.split(",").map((item) => item.trim()) || []
                  }
                />
              );
            })}
        </Container>
      </Section>

      <ContactButton />
    </ContactButtonClipper>
  );
};
ProjectsSlice.prefetch = async ({
  prismicClient,
  queryClient,
  prismicLocale,
}: PrefetchContext) => {
  await queryClient.prefetchQuery(["projects", prismicLocale], () =>
    getProjects(prismicClient, prismicLocale)
  );
};

export default ProjectsSlice;
