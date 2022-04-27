import styled from "@emotion/styled";
import {
  ImageField,
  KeyTextField,
  LinkField,
  RichTextField,
  Slice,
  TitleField,
} from "@prismicio/types";
import Image from "next/image";

import Container from "../../components/Container";
import PrismicRichText from "../../components/PrismicRichText";
import PrismicTitle from "../../components/PrismicTitle";
import { colors, spacing } from "../../theme";
import convertPrismicImage from "../../utils/convertPrismicImage";

const Section = styled.div`
  background: ${colors.dominant};
  color: ${colors.complementary};
  padding: 150px 0;
`;
const Project = styled.div`
  display: flex;
  gap: ${spacing.x6}px;
  padding: ${spacing.x2}px 0;

  :not(:first-of-type) {
    border-top: 3px solid ${colors.complementary};
  }
`;
const ProjectImage = styled.div`
  flex: 0 0 auto;
`;
const Explanation = styled.div`
  flex: 1 1 auto;
`;
const ProjectAbout = styled.div`
  margin-bottom: ${spacing.x2}px;
`;
const TechItem = styled.div`
  display: inline-block;
  background: ${colors.complementary};
  color: ${colors.dominant};
  padding: 4px 6px;
  margin-right: 2px;
  margin-bottom: 2px;
`;

export type PrismicProjectsSlice = Slice<
  "projects_slice",
  {
    title: TitleField;
  },
  {
    image: ImageField;
    url: LinkField;
    about: RichTextField;
    tech: KeyTextField;
  }
>;

interface Props {
  slice: PrismicProjectsSlice;
}

const ProjectsSlice = ({ slice }: Props) => (
  <Section>
    <Container>
      <h2>
        <PrismicTitle field={slice.primary.title} />
      </h2>

      {slice.items.map((project, index) => {
        const image = convertPrismicImage(project.image);
        if (!image) {
          return null;
        }

        return (
          <Project key={index}>
            <ProjectImage>
              <Image
                src={image.src}
                alt={image.alt}
                width={200}
                height={200}
                objectFit="contain"
              />
            </ProjectImage>
            <Explanation>
              <ProjectAbout>
                <PrismicRichText field={project.about} />
              </ProjectAbout>
              {project.tech
                ?.split(",")
                .map((item) => item.trim())
                .map((item) => (
                  <TechItem key={item}>{item}</TechItem>
                ))}
            </Explanation>
          </Project>
        );
      })}
    </Container>
  </Section>
);

export default ProjectsSlice;
