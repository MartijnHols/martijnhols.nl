import styled from "@emotion/styled";
import {
  ImageField,
  RichTextField,
  SharedSlice,
  SharedSliceVariation,
  Slice,
} from "@prismicio/types";
import Image from "next/image";

import Container from "../../components/Container";
import convertPrismicImage from "../../utils/convertPrismicImage";
import { breakpoints, colors, spacing } from "../../theme";
import PrismicRichText from "../../components/PrismicRichText";
import ContactButton from "../../components/ContactButton";

const ContactButtonClipper = styled.div`
  clip-path: inset(0 0 0 0);
`;
const Section = styled.section``;
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

export type PrismicContentSlice = SharedSlice<
  "content_slice",
  | SharedSliceVariation<
      "default",
      {
        image: ImageField;
        content: RichTextField;
      }
    >
  | SharedSliceVariation<
      "inverted",
      {
        image: ImageField;
        content: RichTextField;
      }
    >
>;

interface Props {
  slice: PrismicContentSlice;
}

const ContentSlice = ({ slice }: Props) => {
  const image = convertPrismicImage(slice.primary.image);

  const inverted = slice.variation === "inverted";

  return (
    <ContactButtonClipper>
      <Section
        style={{
          background: inverted ? colors.complementary : colors.dominant,
          color: inverted ? colors.dominant : colors.complementary,
        }}
      >
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

          <Content className={inverted ? "inverted" : undefined}>
            <PrismicRichText field={slice.primary.content} multiline />
          </Content>
        </StyledContainer>
      </Section>

      <ContactButton inverted={inverted} />
    </ContactButtonClipper>
  );
};

export default ContentSlice;
