import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import reactStringReplace from '../../utils/reactStringReplace'
import ReactLogo from './ReactLogo.svg'
import UspBar from './UspBar'

const Section = styled.header(
  ({ theme }) => css`
    position: relative;
    color: ${theme.colors.black};
    overflow: hidden;
  `,
)
const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 100px;
    padding-bottom: 100px;

    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      padding-top: 110px;
      padding-bottom: 110px;
    }
  `,
)
const Intro = styled.div`
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 0;
`
const PreTitle = styled.span(
  ({ theme }) => css`
    display: block;
    ${theme.headings.h4}
    margin-bottom: 0.25em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      font-size: 1.75em;
    }
  `,
)
const IntroTitle = styled.h1`
  margin: 0;
`
const SubText = styled.div(
  ({ theme }) => css`
    font-weight: 500;
    ${theme.headings.h4}
    margin-top: ${theme.spacing.x2}px;
    margin-bottom: 0;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin-top: ${theme.spacing.x4}px;
    }
  `,
)
const StyledUspBar = styled(UspBar)(
  ({ theme }) => css`
    margin-top: 1em;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin-top: 2em;
    }
    @media (min-width: ${theme.breakpoints.DESKTOP_LARGE}px) {
      margin-top: 2.5em;
    }
  `,
)

const React = styled.span`
  white-space: nowrap;
`
const ReactLogoAnimation = keyframes`
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(360deg);
  }
`
const StyledReactLogo = styled(ReactLogo)`
  height: 1em;

  @media (prefers-reduced-motion: no-preference) {
    animation: ${ReactLogoAnimation} infinite 20s linear;
  }

  ${IntroTitle} & {
    // It hides the element *after* the scale transition is done, so this should
    // do a good job of informing browsers the element and animation are
    // inactive without affecting the user
    visibility: hidden;
    transition: visibility 600ms ease-out;

    path {
      transform: scale(0);
      transition: transform 300ms ease-in-out;
      transform-origin: center center;
    }
  }

  ${IntroTitle}:hover & {
    visibility: visible;

    path {
      transform: scale(1);
    }
  }

  @media (prefers-reduced-motion) {
    display: none;
  }
`

export const reactifyTitle = (title: string) =>
  reactStringReplace(
    title,
    'React',
    <React>
      React <StyledReactLogo aria-label="" aria-hidden />
    </React>,
  )

interface Props {
  preTitle?: ReactNode
  title: ReactNode
  subText?: ReactNode
}

const Hero = ({ preTitle, title, subText }: Props) => (
  <Section>
    <StyledContainer>
      <Intro>
        {preTitle && <PreTitle>{preTitle}</PreTitle>}
        <IntroTitle>{title}</IntroTitle>
      </Intro>
      {subText && <SubText>{subText}</SubText>}

      <StyledUspBar />
    </StyledContainer>

    <ContactButtonClipped />
  </Section>
)

export default Hero
