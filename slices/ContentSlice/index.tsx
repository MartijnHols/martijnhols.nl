import styled from "@emotion/styled";
import { ImageField, RichTextField, Slice } from "@prismicio/types";
import Image from "next/image";

import Container from "../../components/Container";
import convertPrismicImage from "../../utils/convertPrismicImage";
import { colors, spacing } from "../../theme";
import PrismicRichText from "../../components/PrismicRichText";

const Section = styled.section`
  background: ${colors.complementary};
  color: ${colors.dominant};
`;
const Angle = styled.div`
  width: 100%;
  height: 40px;
  // This fixes a rendering bug in Chrome where an invisible line appears when the content is scaled
  margin-top: -0.5px;
  margin-bottom: -0.5px;
  backface-visibility: hidden;
`;
const AngleBefore = styled(Angle)`
  background: ${colors.dominant};
  clip-path: polygon(0 0, 100% 0, 0 100%);
`;
const AngleAfter = styled(Angle)`
  background: ${colors.dominant};
  clip-path: polygon(100% 0, 100% 100%, 0 100%);
`;
const StyledContainer = styled(Container)`
  padding-top: 100px;
  padding-bottom: 100px;
  display: flex;
  gap: ${spacing.x10}px;
  flex-wrap: wrap;
`;
const ImageContainer = styled.div`
  flex: 0 0 auto;
  padding: 14px 0;
`;
const Content = styled.div`
  flex: 1 1 0;
  min-width: 400px;
`;

export type PrismicContentSlice = Slice<
  "content_slice",
  {
    image: ImageField;
    content: RichTextField;
  }
>;

interface Props {
  slice: PrismicContentSlice;
}

const ContentSlice = ({ slice }: Props) => {
  const image = convertPrismicImage(slice.primary.image);

  return (
    <>
      <AngleBefore />
      <Section>
        <StyledContainer>
          {image && (
            <ImageContainer>
              <Image
                src={image.src}
                alt={image.alt}
                width={500}
                height={(500 / image.width) * image.height}
              />
            </ImageContainer>
          )}

          <Content>
            <PrismicRichText field={slice.primary.content} multiline />
          </Content>
        </StyledContainer>
      </Section>
      <AngleAfter />
    </>
  );
};

export default ContentSlice;
