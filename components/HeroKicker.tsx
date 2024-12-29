import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import moneyMonkImage from '../data/assets/moneymonk.png'
import politieImage from '../data/assets/politie.jpg'
import pmeLegendImage from './assets/pme-legend-logo-bg.png'

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
      margin-left: -0.25em;
    }
  `,
)

const HeroKicker = () => (
  <>
    <ImageContainer>
      <Image src={pmeLegendImage} alt="PME-Legend" width={34} priority />
      <Image src={moneyMonkImage} alt="MoneyMonk" width={34} priority />
      <Image src={politieImage} alt="Politie" width={34} priority />
    </ImageContainer>{' '}
    15+ succesvolle React projecten
  </>
)

export default HeroKicker
