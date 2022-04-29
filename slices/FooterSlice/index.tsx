import styled from "@emotion/styled";
import { asLink } from "@prismicio/helpers";
import { KeyTextField, LinkField, Slice } from "@prismicio/types";

import Angle from "../../components/Angle";
import Container from "../../components/Container";
import Link from "../../components/Link";
import { colors, spacing } from "../../theme";

const Section = styled.div`
  background: ${colors.complementary};
  color: ${colors.dominant};
  padding: ${spacing.x5}px 0;
`;
const AngleBefore = styled(Angle)`
  background: ${colors.dominant};
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
  gap: ${spacing.x4}px;
`;
const ContactRow = styled(Row)``;
const SocialRow = styled(Row)``;
const BusinessRow = styled(Row)``;
const Item = styled.div``;

export type PrismicFooterSlice = Slice<
  "footer_slice",
  {
    email: KeyTextField;
    phone: KeyTextField;
    linkedIn: LinkField;
    gitHub: LinkField;
    twitter: LinkField;
    kvk: KeyTextField;
    btw: KeyTextField;
    iban: KeyTextField;
  }
>;

interface Props {
  slice: PrismicFooterSlice;
}

const FooterSlice = ({ slice }: Props) => {
  const linkedIn = asLink(slice.primary.linkedIn);
  const gitHub = asLink(slice.primary.gitHub);

  return (
    <>
      <AngleBefore />
      <Section className="inverted">
        <Container>
          <ContactRow>
            <Label>Contact</Label>
            <Values>
              {slice.primary.email && (
                <Item>
                  <a href={`mailto:${slice.primary.email}`}>
                    {slice.primary.email}
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
          <SocialRow>
            <Label>Social</Label>
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
            </Values>
          </SocialRow>
          <BusinessRow>
            <Label>Company</Label>
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
    </>
  );
};

export default FooterSlice;
