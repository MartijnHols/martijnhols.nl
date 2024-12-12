import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { ReactNode } from 'react'
import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'

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
      padding-bottom: 150px;
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
export const IntroTitle = styled.h1`
  margin: 0;
`
const SubText = styled.div(
  ({ theme }) => css`
    font-weight: 500;
    ${theme.headings.h4}
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
        {preTitle && <PreTitle>{preTitle}</PreTitle>}
        <IntroTitle>{title}</IntroTitle>
      </Intro>
      {subText && <SubText>{subText}</SubText>}
    </StyledContainer>

    <ContactButtonClipped />
  </Section>
)

export default Hero
