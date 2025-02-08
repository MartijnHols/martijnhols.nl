import { css } from '@emotion/react'
import styled from '@emotion/styled'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'
import Link from './Link'

const Section = styled.footer(
  ({ theme }) => css`
    position: relative;
    background: ${theme.colors.black};
    color: ${theme.colors.white};
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

const email = 'martijnhols.nl@martijnhols.nl'
const phone = '0657946114'
const linkedIn = 'https://www.linkedin.com/in/martijnhols/'
const gitHub = 'https://github.com/MartijnHols'
const twitter = 'https://twitter.com/MartijnHols'
const kvk = '72214473'
const btw = 'NL002216536B75'

const FooterSlice = () => (
  <Section className="inverted" id="footer" role="contentinfo">
    <Container>
      <ContactRow>
        <Label>Contact</Label>
        <div>
          <Values>
            <Item>
              <a href={`mailto:${email}`}>{email}</a>
            </Item>
            <Item>
              <a href={`tel:${phone}`}>{phone}</a>
            </Item>
          </Values>
          <small>
            Ik ben het best bereikbaar op dinsdag, donderdag, vrijdag, en in het
            weekend.
          </small>
        </div>
      </ContactRow>
      <Row>
        <Label>Locatie</Label>
        <Values>
          <Item>
            <strong>Barneveld, Gelderland</strong>. Beschikbaar voor opdrachten
            binnen 45 minuten, zoals Amersfoort, Veenendaal, Ede, Wageningen,
            Apeldoorn, Utrecht, Zeist, Hilversum, Rhenen, Nijkerk, Leusden, en
            omstreken
          </Item>
        </Values>
      </Row>
      <SocialRow>
        <Label>Social</Label>
        <Values>
          <Item>
            <Link href={linkedIn}>LinkedIn</Link>
          </Item>
          <Item>
            <Link href={gitHub}>GitHub</Link>
          </Item>
          <Item>
            <Link href={twitter}>Twitter</Link>
          </Item>
        </Values>
      </SocialRow>
      <BusinessRow>
        <Label>Bedrijf</Label>
        <Values>
          <Item>
            <strong>KVK:</strong> {kvk}
          </Item>
          <Item>
            <strong>BTW:</strong> {btw}
          </Item>
        </Values>
      </BusinessRow>
    </Container>

    <ContactButtonClipped inverted />
  </Section>
)

export default FooterSlice
