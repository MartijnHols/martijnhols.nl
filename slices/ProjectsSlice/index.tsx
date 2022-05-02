import styled from "@emotion/styled";
import { asLink } from "@prismicio/helpers";
import {
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
  Slice,
  TitleField,
} from "@prismicio/types";
import Image from "next/image";
import { Fragment, useState } from "react";
import { useQuery } from "react-query";

import Container from "../../components/Container";
import Link from "../../components/Link";
import PrismicRichText from "../../components/PrismicRichText";
import PrismicTitle from "../../components/PrismicTitle";
import { PrefetchContext, usePageContext } from "../../pages/[slug]";
import { breakpoints, colors, spacing } from "../../theme";
import convertPrismicImage from "../../utils/convertPrismicImage";
import { createClient, getProjects } from "../../utils/prismic";
import { usePrismicConfig } from "../../utils/prismicConfig";
import prismicLinkResolver from "../../utils/prismicLinkResolver";

const Section = styled.div`
  background: ${colors.dominant};
  color: ${colors.complementary};
  padding: 150px 0;
`;
const Explanation = styled.div`
  margin-bottom: ${spacing.x6}px;
`;
const Project = styled.div`
  display: flex;
  gap: ${spacing.x6}px;
  padding: ${spacing.x4}px 0;
  position: relative;

  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    flex-flow: column;
    gap: ${spacing.x2}px;
  }

  :not(:first-of-type):not(:last-of-type) {
    ::after {
      content: "";
      position: absolute;
      bottom: -1px;
      left: 50%;
      transform: translateX(-50%);
      background: ${colors.complementary};
      height: 2px;
      width: 100px;
      max-width: 100%;
    }
  }
`;
const ProjectImage = styled.div`
  flex: 0 0 auto;
  display: flex;
  justify-content: center;
`;
const ProjectExplanation = styled.div`
  flex: 1 1 auto;
`;
const ProjectAbout = styled.div`
  margin-bottom: ${spacing.x2}px;
`;
const Tech = styled.div`
  margin-bottom: ${spacing.x2}px;
  font-size: 16px;
`;
const TechItem = styled.div`
  display: inline-block;
  background: ${colors.complementary};
  color: ${colors.dominant};
  padding: 4px 6px;
  margin-right: 2px;
  margin-bottom: 2px;

  // I purposefully used both variations for SEO and since iirc it was more commonly called "React.js" long back
  &[data-value="React"],
  &[data-value="React.js"] {
    color: #61dafb;
  }
  &[data-value="Open Source"] {
    color: #fff;
  }
`;
const InvisibleText = styled.span`
  font-size: 0;
`;

export type PrismicProjectsSlice = Slice<
  "projects_slice",
  {
    title: TitleField;
    explanation: RichTextField;
  },
  {
    // TODO: Turn into a repeatable type
    image: ImageField;
    url: LinkField;
    gitHub: LinkField;
    about: RichTextField;
    tech: KeyTextField;
    startedYear: KeyTextField;
    deliveredYear: KeyTextField;
  }
>;

interface Props {
  slice: PrismicProjectsSlice;
}

const ProjectsSlice = ({ slice }: Props) => {
  const { previewData, locale } = usePageContext();
  const [prismicClient] = useState(() => createClient({ previewData }));
  const info = useQuery("projects", () => getProjects(prismicClient, locale));
  const config = usePrismicConfig();

  return (
    <Section>
      <Container>
        <h2>
          <PrismicTitle field={slice.primary.title} />
        </h2>
        <Explanation>
          <PrismicRichText field={slice.primary.explanation} />
        </Explanation>

        Length: {info.data?.length}


        {slice.items.map((project, index) => {
          const image = convertPrismicImage(project.image);
          if (!image) {
            return null;
          }

          const url = asLink(project.url, prismicLinkResolver);
          const gitHub = asLink(project.gitHub, prismicLinkResolver);

          return (
            <Project key={index}>
              <ProjectImage>
                <Image
                  src={image}
                  alt={image.alt}
                  layout="fixed"
                  width={200}
                  height={200}
                  objectFit="contain"
                />
              </ProjectImage>
              <ProjectExplanation>
                <ProjectAbout>
                  {project.deliveredYear && `${project.deliveredYear} - `}
                  <PrismicRichText field={project.about} />
                </ProjectAbout>
                <Tech>
                  {project.tech
                    ?.split(",")
                    .map((item) => item.trim())
                    .map((item) => (
                      <Fragment key={item}>
                        <TechItem data-value={item}>{item}</TechItem>
                        {/* Add hidden text to make copy-pasting more convenient */}
                        <InvisibleText>, </InvisibleText>
                      </Fragment>
                    ))}
                </Tech>
                <div>
                  {url && <Link href={url}>{config?.visit}</Link>}
                  {url && gitHub && " | "}
                  {gitHub && <Link href={gitHub}>{config?.sourceCode}</Link>}
                </div>
              </ProjectExplanation>
            </Project>
          );
        })}
      </Container>
    </Section>
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
