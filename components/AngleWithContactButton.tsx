import styled from '@emotion/styled'
import Angle from './Angle'
import ContactButtonGlobalHover from './ContactButtonGlobalHover'

const TopAngle = styled.div`
  position: absolute;
  inset: 0;
  z-index: 1;
  width: 100%;
  height: calc(10px + 100vw / 2000 * 30);
  clip-path: polygon(0 0, 100% 0, 0 100%);

  @media print {
    display: none;
  }
`
const BottomAngle = styled(TopAngle)`
  clip-path: polygon(100% 0, 100% 100%, 0 100%);

  @media print {
    display: none;
  }
`

interface Props {
  inverted?: boolean
}

const AngleWithContactButton = ({ inverted, ...others }: Props) => (
  <Angle inverted={inverted} {...others}>
    <TopAngle>
      <ContactButtonGlobalHover
        inverted={!inverted}
        aria-hidden
        tabIndex={-1}
      />
    </TopAngle>
    <BottomAngle>
      <ContactButtonGlobalHover inverted={inverted} aria-hidden tabIndex={-1} />
    </BottomAngle>
  </Angle>
)

export default AngleWithContactButton
