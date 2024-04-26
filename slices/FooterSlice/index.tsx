import { css } from '@emotion/react'
import styled from '@emotion/styled'
import { Content } from '@prismicio/client'
import { asLink, isFilled } from '@prismicio/helpers'
import ContactButtonClipped from '../../components/ContactButtonClipped'
import Container from '../../components/Container'
import Link from '../../components/Link'
import PrismicRichText from '../../components/PrismicRichText'
import prismicLinkResolver from '../../utils/prismicLinkResolver'

const Section = styled.footer(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.black};
    color: ${theme.colors.yellow};
    padding: ${theme.spacing.x5}px 0;
  `,
)
const Row = styled.div(
  ({ theme }) => css`
    margin: ${theme.spacing.x2}px 0;
    display: flex;
    gap: ${theme.spacing.x2}px ${theme.spacing.x4}px;
  `,
)
const Label = styled.div`
  min-width: 100px;
  text-align: right;
`
const Values = styled.div(
  ({ theme }) => css`
    display: flex;
    flex-wrap: wrap;
    gap: ${theme.spacing.x2}px ${theme.spacing.x4}px;
  `,
)
const ContactRow = styled(Row)``
const SocialRow = styled(Row)``
const BusinessRow = styled(Row)``
const Item = styled.div``

interface Props {
  slice: Content.FooterSliceSlice
}

const FooterSlice = ({ slice }: Props) => {
  const linkedIn = asLink(slice.primary.linkedIn, prismicLinkResolver)
  const gitHub = asLink(slice.primary.gitHub, prismicLinkResolver)
  const twitter = asLink(slice.primary.twitter, prismicLinkResolver)

  return (
    <Section className="inverted" id="footer" role="contentinfo">
      <Container>
        <ContactRow>
          <Label>{slice.primary.contactLabel}</Label>
          <Values>
            {slice.primary.email && (
              <Item>
                <a href={`mailto:${slice.primary.email}`}>
                  {slice.primary.email}
                </a>
              </Item>
            )}
            {slice.primary.whatsApp && (
              <Item>
                <a
                  href={`https://api.whatsapp.com/send?phone=${slice.primary.whatsApp}`}
                >
                  WhatsApp
                </a>
              </Item>
            )}
            {slice.primary.phone && (
              <Item>
                <a href={`tel:${slice.primary.phone}`}>{slice.primary.phone}</a>
              </Item>
            )}
          </Values>
        </ContactRow>
        {isFilled.richText(slice.primary.contactAnnotation) && (
          <Row>
            <Label />
            <Values>
              <PrismicRichText field={slice.primary.contactAnnotation} />
            </Values>
          </Row>
        )}
        {slice.primary.city && (
          <Row>
            <Label>{slice.primary.locationLabel}</Label>
            <Values>
              <Item>{slice.primary.city}</Item>
            </Values>
          </Row>
        )}
        <SocialRow>
          <Label>{slice.primary.socialLabel}</Label>
          <Values>
            {linkedIn && (
              <Item>
                <Link href={linkedIn}>LinkedIn</Link>
              </Item>
            )}
            {gitHub && (
              <Item>
                <Link href={gitHub}>GitHub</Link>
              </Item>
            )}
            {twitter && (
              <Item>
                <Link href={twitter}>Twitter</Link>
              </Item>
            )}
          </Values>
        </SocialRow>
        <BusinessRow>
          <Label>{slice.primary.companyLabel}</Label>
          <Values>
            {slice.primary.kvk && (
              <Item>
                <strong>KVK:</strong> {slice.primary.kvk}
              </Item>
            )}
            {slice.primary.btw && (
              <Item>
                <strong>BTW:</strong> {slice.primary.btw}
              </Item>
            )}
          </Values>
        </BusinessRow>
      </Container>

      <ContactButtonClipped inverted />
    </Section>
  )
}

export default FooterSlice
