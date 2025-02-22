'use client'

import { Global } from '@emotion/react'
import 'sanitize.css'
import 'sanitize.css/forms.css'
import 'sanitize.css/typography.css'
import globalStyles from '../theme/globalStyles'

const GlobalStyles = () => <Global styles={globalStyles} />

export default GlobalStyles
