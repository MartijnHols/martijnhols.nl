import { keyframes } from "@emotion/react";
import styled from "@emotion/styled";
import { asText } from "@prismicio/helpers";
import { RichTextField, Slice } from "@prismicio/types";
import { useRouter } from "next/router";
import { ReactElement } from "react";

import Angle from "../../components/Angle";
import Container from "../../components/Container";
import Link from "../../components/Link";
import PrismicRichText from "../../components/PrismicRichText";
import { breakpoints, colors, fontSizes, spacing } from "../../theme";
import { h3, h5 } from "../../theme/headings";
import { usePrismicConfig } from "../../utils/prismicConfig";
import ReactLogo from "./ReactLogo.svg";

const Wrapper = styled.div`
  background: ${colors.dominant};
  color: ${colors.complementary};
`;
const Header = styled.div`
  background: ${colors.complementary};
  height: 1em;
`;
const HeaderContent = styled.div`
  position: relative;
  z-index: 1;
  color: ${colors.dominant};
  // Fallbacks
  padding: 6px 7px 0 8px;
  font-size: 14px;
  // Resize at the same rate as Angle so it fits perfectly
  padding: calc(5px + 100vw / 2000 * 6) 7px 0 calc(7px + 100vw / 2000 * 7);
  font-size: calc(10px + 100vw / 2000 * 12);
  font-weight: 500;
  transform: rotate(-1deg);
  transform-origin: left;
`;
const AngleBefore = styled(Angle)`
  background: ${colors.complementary};
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
  transform: rotate(-2deg);

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

const HeroSlice = ({ slice }: Props) => {
  const { locale } = useRouter();
  const config = usePrismicConfig();

  return (
    <Wrapper>
      <Header>
        <HeaderContent className="inverted">
          <Link href="/" locale={locale === "nl" ? "en" : "nl"}>
            {config?.languageToggle}
          </Link>
        </HeaderContent>
      </Header>
      <AngleBefore />
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
            <IntroTitle>
              {reactifyTitle(asText(slice.primary.title))}
            </IntroTitle>
          </Intro>
          <SubText>
            <PrismicRichText field={slice.primary.subText} />
          </SubText>
        </StyledContainer>
      </Section>
    </Wrapper>
  );
};

export default HeroSlice;
