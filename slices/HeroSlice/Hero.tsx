import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'

import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'

const Section = styled.header(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.yellow};
    color: ${theme.colors.black};
    overflow: hidden;
  `,
)
const StyledContainer = styled(Container)(
  ({ theme }) => css`
    padding-top: 100px;
    padding-bottom: 100px;
    transform: rotate(-2deg);

    @media (min-width: ${theme.breakpoints.DESKTOP}px) {
      transform: rotate(-1.3deg);
      padding-top: 110px;
      padding-bottom: 150px;
    }
  `,
)
const Intro = styled.div`
  line-height: 1.1;
  font-weight: 800;
  margin-bottom: 0;
`
const IntroSubText = styled.span(
  ({ theme }) => css`
    display: block;
    ${theme.headings.h4}
    margin-bottom: ${theme.spacing.x1}px;
  `,
)
export const IntroTitle = styled.h1`
  margin: 0;
`
const SubText = styled.div(
  ({ theme }) => css`
    font-weight: 500;
    ${theme.headings.h5}
    margin-top: ${theme.spacing.x2}px;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      margin-top: ${theme.spacing.x4}px;
    }
  `,
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
        {preTitle && <IntroSubText>{preTitle}</IntroSubText>}
        <IntroTitle>{title}</IntroTitle>
      </Intro>
      {subText && <SubText>{subText}</SubText>}
    </StyledContainer>

    <ContactButtonClipped />
  </Section>
)

export default Hero
