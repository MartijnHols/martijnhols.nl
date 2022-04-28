import styled from "@emotion/styled";
import { asLink } from "@prismicio/helpers";
import { KeyTextField, LinkField, Slice } from "@prismicio/types";

import Container from "../../components/Container";
import Link from "../../components/Link";
import PrismicTitle from "../../components/PrismicTitle";
import { colors, spacing } from "../../theme";

const Section = styled.div`
  background: ${colors.complementary};
  color: ${colors.dominant};
  padding: 150px 0;
`;
const Angle = styled.div`
  width: 100%;
  height: 40px;
  // This fixes a rendering bug in Chrome where an invisible line appears when the content is scaled
  margin-top: -0.5px;
  margin-bottom: -0.5px;
  backface-visibility: hidden;
`;
const AngleBefore = styled(Angle)`
  background: ${colors.dominant};
  clip-path: polygon(0 0, 100% 0, 0 100%);
`;
const Row = styled.div`
  margin: ${spacing.x5}px 0;
  display: flex;
  flex-wrap: wrap;
  gap: ${spacing.x4}px;
`;
const ContactRow = styled(Row)``;
const SocialRow = styled(Row)``;
const BusinessRow = styled(Row)``;
const Item = styled.div`
  flex: 1 1 auto;
  text-align: center;
`;

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
            {slice.primary.email && (
              <Item>
                <a href={`mailto:${slice.primary.email}`}>
                  {slice.primary.email}
                </a>
              </Item>
            )}
            {slice.primary.phone && (
              <Item>
                <a href={`tel:${slice.primary.phone}`}>{slice.primary.phone}</a>
              </Item>
            )}
          </ContactRow>
          <SocialRow>
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
          </SocialRow>
          <BusinessRow>
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
            {slice.primary.iban && (
              <Item>
                <strong>IBAN:</strong> {slice.primary.iban}
              </Item>
            )}
          </BusinessRow>
        </Container>
      </Section>
    </>
  );
};

export default FooterSlice;
