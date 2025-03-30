import styled from '@emotion/styled'
import ContactButtonClipped from './ContactButtonClipped'
import Container from './Container'
import Link from './Link'

const Section = styled.footer`
  position: relative;
  background: var(--black);
  color: var(--white);
  padding: var(--spacing5) 0;
`
const Row = styled.div`
  margin: var(--spacing2) 0;
  display: flex;
  gap: var(--spacing2) var(--spacing4);
`
const Label = styled.div`
  min-width: 100px;
  text-align: right;
`
const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: var(--spacing2) var(--spacing4);
`
const ContactRow = styled(Row)``
const SocialRow = styled(Row)``
const BusinessRow = styled(Row)``
const Item = styled.div``

const email = 'martijnhols.nl@martijnhols.nl'
const phone = '0657946114'
const linkedIn = 'https://www.linkedin.com/in/martijnhols/'
const gitHub = 'https://github.com/MartijnHols'
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
            <Link href="/blog">Blog</Link>
          </Item>
          <Item>
            <Link rel="me" href={linkedIn}>
              LinkedIn
            </Link>
          </Item>
          <Item>
            <Link rel="me" href={gitHub}>
              GitHub
            </Link>
          </Item>
          <Item>
            <Link rel="me" href="https://mastodon.social/@MartijnHols">
              Mastodon
            </Link>
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
