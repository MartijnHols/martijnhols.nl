import styled from "@emotion/styled";
import { ImageField, RichTextField, Slice } from "@prismicio/types";
import Image from "next/image";

import Container from "../../components/Container";
import convertPrismicImage from "../../utils/convertPrismicImage";
import { breakpoints, colors, spacing } from "../../theme";
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

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    gap: ${spacing.x6}px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    flex-flow: column;
    gap: ${spacing.x2}px;
  }
`;
const ImageContainer = styled.div`
  flex: 0 0 auto;
  width: 100%;
  max-width: 500px;

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    max-width: 400px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    max-width: none;
  }
`;
const Content = styled.div`
  flex: 1 1 0;
  // Cancels out p-margins
  margin: -${spacing.x2}px 0;
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
                src={image}
                alt={image.alt}
                layout="responsive"
                sizes={`(max-width: ${breakpoints.MOBILE_MAX}px) 100vw, (max-width: ${breakpoints.DESKTOP_MAX}px) 400px, 500px`}
              />
            </ImageContainer>
          )}

          <Content className="inverted">
            <PrismicRichText field={slice.primary.content} multiline />
          </Content>
        </StyledContainer>
      </Section>
      <AngleAfter />
    </>
  );
};

export default ContentSlice;
