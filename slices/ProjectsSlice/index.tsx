import styled from "@emotion/styled";
import { asLink } from "@prismicio/helpers";
import { RichTextField, Slice, TitleField } from "@prismicio/types";
import { useRouter } from "next/router";
import { useState } from "react";
import { useQuery } from "react-query";

import ContactButton from "../../components/ContactButton";
import Container from "../../components/Container";
import PrismicRichText from "../../components/PrismicRichText";
import PrismicTitle from "../../components/PrismicTitle";
import ProjectBrief from "../../components/ProjectBrief";
import { usePreviewData } from "../../pages/[slug]";
import { colors, spacing } from "../../theme";
import convertPrismicImage from "../../utils/convertPrismicImage";
import { toPrismicLocale } from "../../utils/locales";
import { PrefetchContext } from "../../utils/prefetchSliceSubQueries";
import { createClient, getProjects } from "../../utils/prismic";
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

export type PrismicProjectsSlice = Slice<
  "projects_slice",
  {
    title: TitleField;
    explanation: RichTextField;
  }
>;

interface Props {
  slice: PrismicProjectsSlice;
}

const ProjectsSlice = ({ slice }: Props) => {
  const { locale } = useRouter();
  const previewData = usePreviewData();
  const [prismicClient] = useState(() => createClient({ previewData }));
  const { data } = useQuery("projects", () =>
    getProjects(prismicClient, toPrismicLocale(locale!))
  );

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

          {data
            ?.map((item) => item.data)
            .sort((a, b) =>
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
  locale,
}: PrefetchContext) => {
  await queryClient.prefetchQuery("projects", () =>
    getProjects(prismicClient, locale)
  );
};

export default ProjectsSlice;
