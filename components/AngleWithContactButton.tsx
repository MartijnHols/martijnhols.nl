import styled from '@emotion/styled'
import AngleTop from './AngleTop'
import ContactButtonGlobalHover from './ContactButtonGlobalHover'

const TopAngleClipper = styled.div`
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
const BottomAngleClipper = styled(TopAngleClipper)`
  clip-path: polygon(100% 0, 100% 100%, 0 100%);

  @media print {
    display: none;
  }
`

interface Props {
  angle: typeof AngleTop
}

const AngleWithContactButton = ({ angle: Angle, ...others }: Props) => (
  <Angle {...others}>
    <TopAngleClipper>
      <ContactButtonGlobalHover
        inverted={Angle === AngleTop}
        aria-hidden
        tabIndex={-1}
      />
    </TopAngleClipper>
    <BottomAngleClipper>
      <ContactButtonGlobalHover
        inverted={Angle === AngleTop}
        aria-hidden
        tabIndex={-1}
      />
    </BottomAngleClipper>
  </Angle>
)

export default AngleWithContactButton
