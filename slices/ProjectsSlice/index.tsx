import styled from "@emotion/styled";
import { ImageField, LinkField, Slice, TitleField } from "@prismicio/types";
import Image from "next/image";

import Container from "../../components/Container";
import PrismicTitle from "../../components/PrismicTitle";
import { colors } from "../../theme";
import convertPrismicImage from "../../utils/convertPrismicImage";

const Section = styled.div`
  background: ${colors.dominant};
  padding: 150px 0;
`;

export type PrismicProjectsSlice = Slice<
  "projects_slice",
  {
    title: TitleField;
  },
  {
    image: ImageField;
    url: LinkField;
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
          <span key={index}>
            <Image
              src={image.src}
              alt={image.alt}
              width={200}
              height={200}
              objectFit="contain"
            />
          </span>
        );
      })}
    </Container>
  </Section>
);

export default ProjectsSlice;
