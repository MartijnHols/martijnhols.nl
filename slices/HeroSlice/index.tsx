import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { asText } from "@prismicio/helpers";
import { RichTextField, Slice } from "@prismicio/types";
import { ReactElement } from "react";

import Container from "../../components/Container";
import PrismicRichText from "../../components/PrismicRichText";
import { breakpoints, colors, spacing } from "../../theme";
import { h3, h5 } from "../../theme/headings";
import ReactLogo from "./ReactLogo.svg";

const Wrapper = styled.div`
  background: ${colors.dominant};
  color: ${colors.complementary};
`;
const Angle = styled.div`
  width: 100%;
  background: ${colors.complementary};
  height: 40px;

  @media (max-width: ${breakpoints.DESKTOP_MAX}px) {
    height: 50px;
  }
  @media (max-width: ${breakpoints.TABLET_MAX}px) {
    height: 40px;
  }
  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    height: 30px;
  }
`;
const AngleAfter = styled(Angle)`
  clip-path: polygon(0 0, 100% 0, 0 100%);
  // This fixes a rendering bug in Chrome where an invisible line appears when the content is scaled
  margin-top: -0.5px;
  margin-bottom: -0.5px;
  backface-visibility: hidden;
`;
const Section = styled.section`
  position: relative;
  overflow: hidden; // fixes rotation overflow increasing body width
  background: ${colors.dominant};
`;
const StyledContainer = styled(Container)`
  padding-top: 150px;
  padding-bottom: 150px;
  // TODO: Math it out (we want to show we're precise and smart, so REALLY SHOW IT)
  transform: rotate(-1.2deg);

  @media (max-width: ${breakpoints.TABLET_MAX}px) {
    padding-top: 100px;
    padding-bottom: 100px;
  }
`;
const ReactLogoAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`;
const React = styled.span`
  white-space: nowrap;
`;
const StyledReactLogo = styled(ReactLogo)`
  height: 1em;
  /* color: #61DAFB; */

  @media (prefers-reduced-motion: no-preference) {
    animation: ${ReactLogoAnimation} infinite 20s linear;
  }
`;
const Intro = styled.h1`
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: ${spacing.x4}px;

  @media (max-width: ${breakpoints.MOBILE_MAX}px) {
    margin-bottom: ${spacing.x2}px;
  }
`;
const IntroSubText = styled.span`
  display: block;
  ${h3}
  margin-bottom: ${spacing.x1}px;
`;
const IntroTitle = styled.span`
  ${StyledReactLogo} path {
    transform: scale(0);
    transition: transform 300ms ease-in-out;
    transform-origin: center center;
  }
  :hover {
    ${StyledReactLogo} path {
      transform: scale(1);
    }
  }
`;
const SubText = styled.div`
  font-weight: 500;
  ${h5}
`;

export type PrismicHeroSlice = Slice<
  "hero_slice",
  {
    intro: RichTextField;
    title: RichTextField;
    subText: RichTextField;
  }
>;

const reactStringReplace = (
  string: string,
  searchValue: string,
  replaceValue: ReactElement
) => {
  const reactIndex = string.indexOf(searchValue);
  if (reactIndex === -1) {
    return string;
  }

  const before = string.substring(0, reactIndex);
  const after = string.substring(reactIndex + searchValue.length);

  return (
    <>
      {before}
      {replaceValue}
      {after}
    </>
  );
};

const reactifyTitle = (title: string) =>
  reactStringReplace(
    title,
    "React",
    <React>
      React <StyledReactLogo aria-label="" />
    </React>
  );

interface Props {
  slice: PrismicHeroSlice;
}

const HeroSlice = ({ slice }: Props) => (
  <Wrapper>
    <AngleAfter />
    <Section>
      <StyledContainer>
        <Intro>
          <PrismicRichText
            field={slice.primary.intro}
            components={{
              paragraph: ({ children, key }) => (
                <IntroSubText key={key}>{children}</IntroSubText>
              ),
            }}
            multiline
          />
          <IntroTitle>{reactifyTitle(asText(slice.primary.title))}</IntroTitle>
        </Intro>
        <SubText>
          <PrismicRichText field={slice.primary.subText} />
        </SubText>
      </StyledContainer>
    </Section>
  </Wrapper>
);

export default HeroSlice;
