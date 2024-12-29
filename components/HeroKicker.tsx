import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import moneyMonkImage from '../data/assets/moneymonk.png'
import politieImage from '../data/assets/politie.jpg'
import jetjeImage from './assets/jetje-with-bg.png'
import pmeLegendImage from './assets/pme-legend-logo-bg.png'
import wowAnalyzerImage from './assets/wowanalyzer-with-bg.png'
import Tooltip from './Tooltip'

const ImageContainer = styled.div(
  ({ theme }) => css`
    display: inline-block;

    > img {
      border-radius: 50%;
      width: 1.2em;
      height: 1.2em;
      border: 1px solid ${theme.colors.black};
    }
    > img:not(:first-of-type) {
      margin-left: -0.5em;
    }
  `,
)

const HeroKicker = () => (
  <>
    <ImageContainer>
      <Tooltip content="WoWAnalyzer">
        <Image src={wowAnalyzerImage} alt="WoWAnalyzer" width={34} priority />
      </Tooltip>
      <Tooltip content="Jetje">
        <Image src={jetjeImage} alt="Jetje" width={34} priority />
      </Tooltip>
      <Tooltip content="PME-Legend">
        <Image src={pmeLegendImage} alt="PME-Legend" width={34} priority />
      </Tooltip>
      <Tooltip content="MoneyMonk">
        <Image src={moneyMonkImage} alt="MoneyMonk" width={34} priority />
      </Tooltip>
      <Tooltip content="Politie">
        <Image src={politieImage} alt="Politie" width={34} priority />
      </Tooltip>
    </ImageContainer>{' '}
    15+ succesvolle React projecten
  </>
)

export default HeroKicker
