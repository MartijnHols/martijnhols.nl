import styled from "@emotion/styled";
import { asLink } from "@prismicio/helpers";
import {
  GeoPointField,
  KeyTextField,
  LinkField,
  NumberField,
  SharedSlice,
  SharedSliceVariation,
} from "@prismicio/types";

import ContactButton from "../../components/ContactButton";
import Container from "../../components/Container";
import Link from "../../components/Link";
import { colors, spacing } from "../../theme";
import prismicLinkResolver from "../../utils/prismicLinkResolver";

const ContactButtonClipper = styled.div`
  clip-path: inset(0 0 0 0);
`;
const Section = styled.div`
  background: ${colors.complementary};
  color: ${colors.dominant};
  padding: ${spacing.x5}px 0;
`;
const Row = styled.div`
  margin: ${spacing.x2}px 0;
  display: flex;
  gap: ${spacing.x2}px ${spacing.x4}px;
`;
const Label = styled.div`
  min-width: 100px;
  text-align: right;
`;
const Values = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.x2}px ${spacing.x4}px;
`;
const ContactRow = styled(Row)``;
const SocialRow = styled(Row)``;
const BusinessRow = styled(Row)``;
const Item = styled.div``;

export type PrismicFooterSlice = SharedSlice<
  "footer_slice",
  SharedSliceVariation<
    "default",
    {
      contactLabel: KeyTextField;
      email: KeyTextField;
      phone: KeyTextField;
      whatsApp: NumberField;
      socialLabel: KeyTextField;
      linkedIn: LinkField;
      gitHub: LinkField;
      twitter: LinkField;
      companyLabel: KeyTextField;
      kvk: KeyTextField;
      btw: KeyTextField;
      iban: KeyTextField;
      locationLabel: KeyTextField;
      city: KeyTextField;
      location: GeoPointField;
    }
  >
>;

interface Props {
  slice: PrismicFooterSlice;
}

const FooterSlice = ({ slice }: Props) => {
  const linkedIn = asLink(slice.primary.linkedIn, prismicLinkResolver);
  const gitHub = asLink(slice.primary.gitHub, prismicLinkResolver);
  const twitter = asLink(slice.primary.twitter, prismicLinkResolver);

  return (
    <ContactButtonClipper>
      <Section className="inverted" id="footer">
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
                  <a href={`tel:${slice.primary.phone}`}>
                    {slice.primary.phone}
                  </a>
                </Item>
              )}
            </Values>
          </ContactRow>
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
      </Section>

      <ContactButton inverted />
    </ContactButtonClipper>
  );
};

export default FooterSlice;
