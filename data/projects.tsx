import { StaticImageData } from 'next/image'
import { ReactNode } from 'react'
import Link from '../components/Link'

interface Project {
  company: string
  functionTitle: string
  startedYear: number
  endedYear?: string
  thumbnail: StaticImageData
  url?: string
  sourceCodeHref?: string
  about: ReactNode
  tech: string[]
  highlighted: boolean
  placeholder: boolean
}

// Array is sorted by started date,
const projects: Project[] = [
  {
    company: 'Politie',
    functionTitle: 'Freelance Senior Front-end Ontwikkelaar',
    about: (
      <p>
        Voor de Nederlandse Politie werk ik aan de React app van het cluster
        Basis Voorziening Identiteitsvaststelling (BVID). Deze app wordt o.a.
        door de Politie gebruikt op honderden identificatie-zuilen door het
        land. Meer informatie over de BVID{' '}
        <Link
          href="https://magazines.defensie.nl/kmarmagazine/2015/07/11_hoe_werkt_dat_eigenlijk_7-2015"
          target="_self"
          rel="noopener noreferrer"
        >
          hier
        </Link>
        .
      </p>
    ),
    startedYear: 2024,
    endedYear: 'heden/12',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Redux',
      'Redux Toolkit',
      'RTK Query',
      'Cypress',
      'rxjs',
      'Enterprise',
    ],
    thumbnail: (await import('./assets/politie.jpg')).default,
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'MoneyMonk',
    functionTitle: 'Freelance React Developer / Architect',
    about: (
      <p>
        Als Freelance React Developer heb ik belangrijke en veelgebruikte
        features ontwikkeld zoals de btw-aangifte,{' '}
        <Link href="https://martijnhols.cdn.prismic.io/martijnhols/ZfdLdMmUzjad_T1L_moneymonkuren.mp4">
          uren
        </Link>
        , ritten en projecten modules, een{' '}
        <Link href="https://images.prismic.io/martijnhols/ZfciRsmUzjad_Twz_moneymonkabonneren.gif?auto=format,compress?auto=compress,format">
          abonneren modal
        </Link>{' '}
        en het{' '}
        <Link href="https://martijnhols.cdn.prismic.io/martijnhols/ZfcuYcmUzjad_Tye_moneymonk2fa.mp4">
          inloggen scherm, met de 2FA
        </Link>{' '}
        en{' '}
        <Link href="https://images.prismic.io/martijnhols/ZfciScmUzjad_Tw0_moneymonkwachtwoordvergeten.gif?auto=format,compress?auto=compress,format">
          wachtwoord vergeten
        </Link>{' '}
        flows. Naast de SPA, heb ik ook gewerkt aan DX/architecturale
        verbeteringen, zoals betere error logging en afhandeling (met Sentry),
        CI, dependency updates etc.
      </p>
    ),
    startedYear: 2023,
    endedYear: '2024/03',
    tech: [
      'React',
      'TypeScript',
      'Vite',
      'Next.js',
      'Redux',
      'DatoCMS',
      'Cypress',
      'Sentry',
      'SSG',
      'SSR',
    ],
    thumbnail: (await import('./assets/moneymonk.png')).default,
    url: 'https://www.moneymonk.nl/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Damen Yachting via Iquality',
    functionTitle: 'Freelance Senior Front-end Engineer',
    about: (
      <p>
        In opdracht van Iquality heb ik gewerkt aan een{' '}
        <Link href="https://martijnhols.cdn.prismic.io/martijnhols/ZfcpzMmUzjad_Tx-_damenyachtinghomepage.mp4">
          nieuwe site voor Damen Yachting
        </Link>
        . Dit project is een voortzetting van het Amels Yachting project waar ik
        in 2022 aan heb gewerkt, met een nieuw theme en andere benodigde
        wijzigingen om multi-site support toe te voegen aan het bestaande
        project. Er zijn ook veel nieuwe componenten toegevoegd, die specifiek
        voor de nieuwe Damen Yachting site zijn ontworpen.
      </p>
    ),
    startedYear: 2023,
    endedYear: '2023/07',
    tech: [
      'React',
      'TypeScript',
      'Next.js',
      'UX Design',
      'Storybook',
      'DatoCMS',
      'GraphQL',
      'Azure DevOps',
    ],
    thumbnail: (await import('./assets/damenyachting.png')).default,
    url: 'https://www.damenyachting.com/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Leviy',
    functionTitle: 'Freelance React Developer / Architect',
    about: (
      <p>
        Leviy heeft mij ingehuurd om mijn React ervaring te delen om de
        kwaliteit en kennis binnen de organisatie te verbeteren, andere
        ontwikkelaars te ondersteunen en begeleiden, en om mee te helpen met de
        ontwikkeling van een nieuwe module voor tijdregistratie in hun mobiele
        app op basis van React.
      </p>
    ),
    startedYear: 2023,
    endedYear: '2023/05',
    tech: ['React', 'Create React App', 'Cordova'],
    thumbnail: (await import('./assets/leviy.jpg')).default,
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Quantore via Iquality',
    functionTitle: 'Freelance Senior Front-end Engineer',
    about: (
      <p>
        In opdracht van Iquality heb ik voor de Quantore Extranet website een
        aantal verbeteringen doorgevoerd om Extranet in hun bestaande CMS op te
        kunnen nemen. Ik heb onder andere gebouwd: een integratie met Auth0 voor
        de authenticatie, site search met Algolia, en nieuwe CMS secties voor de
        afgesloten pagina's.
      </p>
    ),
    startedYear: 2022,
    endedYear: '2023/01',
    tech: [
      'React',
      'Gatsby',
      'Auth0',
      'Algolia',
      'GraphQL',
      'styled-components',
    ],
    thumbnail: (await import('./assets/quantore.png')).default,
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'CED Group via Iquality',
    functionTitle: 'Freelance Senior Front-end Engineer',
    about: (
      <p>
        In opdracht van Iquality heb ik een nieuw platform opgezet op basis van
        Next.js en DatoCMS voor de ontwikkeling van drie nieuwe websites voor de
        CED Group. Als lead developer van het project heb ik de architectuur van
        dit project opgezet, de integraties geïmplementeerd en een groot deel
        van de pagina's en componenten gemaakt.
      </p>
    ),
    startedYear: 2022,
    endedYear: '2022/12',
    tech: [
      'React',
      'TypeScript',
      'Storybook',
      'Azure DevOps',
      'Node.js',
      'Next.js',
      'DatoCMS',
      'GraphQL',
      'Emotion.js',
      'Styled components',
    ],
    thumbnail: (await import('./assets/ced.png')).default,
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'DutchChannels',
    functionTitle: 'Freelance Front-end Ontwikkelaar',
    about: (
      <p>
        Voor DutchChannels, dat achter de videoplatformen WithLove en New Faith
        Network zit, heb ik in twee korte maanden de landing- en
        onboardingpagina's opnieuw opgezet met React, Next.js, Prismic,
        TypeScript en Cypress. Met de wijzigingen kan het ontwikkelteam sneller,
        stabieler en toekomstbestendig verder ontwikkelen aan de sites, is de
        tracking verbeterd met nieuwe events en de performance de best
        mogelijke.
      </p>
    ),
    startedYear: 2022,
    endedYear: '2022',
    tech: [
      'React',
      'TypeScript',
      'Next.js',
      'Gatsby',
      'GraphQL',
      'Prismic',
      'Cypress',
      'Netlify',
      'GitHub Actions',
      'SSG',
      'Yarn workspaces',
    ],
    thumbnail: (await import('./assets/newfaithnetwork.png')).default,
    url: 'https://newfaithnetwork.com/lp/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Amels Yachting via Iquality',
    functionTitle: 'Freelance Senior Front-end Engineer',
    about: (
      <>
        <p>
          De nieuwe Amels Yachting website zit bomvol{' '}
          <strong>animaties en videos</strong>. Dat is te zien;{' '}
          <Link
            href="https://www.amelsyachting.com/portfolio/amels-80"
            target="_blank"
            rel="noopener noreferrer"
          >
            de portfolio pagina's
          </Link>{' '}
          behoren tot de meest visueel aantrekkelijke pagina's op het web.
          Bezoekers krijgen hiermee een geweldige ervaring tijdens het ontdekken
          van de Amels superjachten.
        </p>
        <p>
          Iquality heeft mij als Senior Front-end Engineer ingehuurd voor
          ondersteuning bij de opzet van een nieuw framework op basis van
          Next.js en React, en het bouwen van deze uitdagende website. De
          portfolio pagina's bevatten (na alle optimalisaties){' '}
          <strong>meer dan 35MB</strong> aan grafische elementen, waarvan een
          groot gedeelte <strong>above the fold</strong> nodig is. Om te zorgen
          dat gebruikers ongeacht hun internetsnelheid een goede ervaring
          krijgen, heb ik verschillende laad-mechanismes gebouwd. Bijvoorbeeld
          bij de image sequence, die bestaat uit ruim 200 afbeeldingen. Eerst
          wordt elk 40e frame ingeladen, vervolgens elke 20e, dan elke 10e,
          enzovoorts. Hierdoor heeft de gebruiker steeds meer{' '}
          <em>frames per second </em>beschikbaar en krijgt de gebruiker
          geleidelijk de voor hem best mogelijk ervaring.
        </p>
      </>
    ),
    startedYear: 2022,
    endedYear: '2022/06',
    tech: [
      'React',
      'TypeScript',
      'Next.js',
      'Storyblok',
      'Azure DevOps',
      'Cypress',
      'Emotion.js',
      'Algolia Search',
      'Cloudinary',
      'GraphQL',
      'Scrum',
      'CSS animaties',
      'static rendering/prerendering',
    ],
    thumbnail: (await import('./assets/amelsyachting.png')).default,
    url: 'https://www.amelsyachting.com/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Jetje',
    functionTitle: 'Oprichter',
    about: (
      <p>
        Jetje is een start-up dat ik ben gestart met een compagnon. We
        ontwikkelen een app ter ondersteuning van dienstverlening, met onder
        andere chat en (video)bellen geïntegreerd. Onze eerste
        oplossingsrichting is coaching, maar we denken veel groter. De app is
        primair een React webapp met Node.js backend, in TypeScript met GraphQL
        voor volledige type-safety van begin tot eind. Het is voorzien van een
        uitgebreide integration test suite, inclusief Cypress voor end-to-end
        tests. Er is ook een React Native app voor (chat) notificaties. Bekijk
        de{' '}
        <Link href="https://jetje.nl" rel="noopener noreferrer">
          Jetje
        </Link>{' '}
        en{' '}
        <Link href="https://geefmvan.nl/" rel="noopener noreferrer">
          Geef 'm van
        </Link>{' '}
        websites voor meer informatie over het platform, of neem contact met mij
        op.
      </p>
    ),
    startedYear: 2021,
    endedYear: '2022/03',
    tech: [
      'React',
      'React Native',
      'TypeScript',
      'Next.js',
      'Create React App',
      'GraphQL',
      'Apollo Client',
      'Node.js',
      'Apollo Server',
      'service worker',
      'GitHub Actions',
      'Docker',
      'GraphQL code generation',
      'Jitsi',
      'Yarn workspaces',
      'Cypress (E2E testing)',
      'Prismic',
      'SSR',
      'Static Site Generation',
      'LighthouseCI',
    ],
    thumbnail: (await import('./assets/jetje.png')).default,
    highlighted: true,
    placeholder: false,
  },
  {
    company: 'PlatteTV via Emico',
    functionTitle: 'Freelance Lead Front-end Developer',
    about: (
      <p>
        PlatteTV is een van de grootste TV-winkels van Nederland. Als Front End
        Lead Developer heb ik een belangrijke rol vervuld bij de bouw van hun
        splinternieuwe webshop. Ik heb het project van de grond af aan opgezet
        en samen met de project lead de projectaanpak (o.a. SCRUM methodiek)
        vormgegeven en het team geleid. Dit ambitieuze project is gemaakt in
        onder andere React met TypeScript, GraphQL, Apollo Server, en vele
        microservices met onder andere Magento 2 en Pimcore als backend.
      </p>
    ),
    startedYear: 2020,
    endedYear: '2021/04',
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'GraphQL',
      'Apollo Client',
      'Apollo Server',
      'Apollo Federation',
      'microservices',
      'Docker',
      'GitHub Actions',
      'GitLab CI',
      'Service Worker/PWA',
      'Lerna',
      'Yarn workspaces',
      'Cypress',
      'Magento',
      'Scrum',
      'JIRA',
      'SEO (e-commerce)',
      'static rendering/prerendering',
    ],
    thumbnail: (await import('./assets/plattetv.png')).default,
    url: 'https://plattetv.nl',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Swiss Sense via Emico',
    functionTitle: 'Freelance Lead Front-end Ontwikkelaar',
    about: (
      <p>
        Swiss Sense is een grote boxsprings en matrassen beddenwinkel. Voor
        Swiss Sense heb ik onder andere de boxspring configurator gemaakt, een
        opzet gemaakt om de app incrementeel te migreren naar React,
        microservices gemaakt en groot onderhoud aan het microservices
        framework, de CI versneld en Magento 2 in Docker aan de praat gekregen.
      </p>
    ),
    startedYear: 2019,
    endedYear: '2021/01',
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'GraphQL',
      'Apollo Client',
      'Apollo Server',
      'Apollo Federation',
      'microservices',
      'Docker',
      'GitHub Actions',
      'GitLab CI',
      'Lerna',
      'Yarn workspaces',
      'Cypress',
      'Scrum',
      'JIRA',
      'SEO (e-commerce)',
      'static rendering/prerendering',
    ],
    thumbnail: (await import('./assets/swisssense.jpg')).default,
    url: 'https://www.swisssense.nl/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'PME Legend via Emico',
    functionTitle: 'Freelance Senior Front-end Ontwikkelaar',
    about: (
      <p>
        De officiële webshops van het bekende heren kledingmerk{' '}
        <Link href="https://www.pme-legend.com/" rel="noopener noreferrer">
          PME Legend
        </Link>
        , en bijbehorende merken{' '}
        <Link
          href="https://www.vanguard-clothing.com/"
          rel="noopener noreferrer"
        >
          Vanguard
        </Link>
        ,{' '}
        <Link
          href="https://www.castiron-clothing.com/"
          rel="noopener noreferrer"
        >
          Cast Iron
        </Link>{' '}
        en{' '}
        <Link href="https://www.justbrands.nl/" rel="noopener noreferrer">
          Just Brands
        </Link>
        . Dit waren de eerste grote React projecten bij Emico. Samen met een
        klein team hebben we deze webshops van de grond af aan gebouwd. Binnen
        korte tijd heb ik mijn vaardigheden bewezen en werd ik verantwoordelijk
        voor een groot deel van de architectuur. De opdrachtgever was zeer
        tevreden met de nieuwe webshop, wat een flinke conversie stijging met
        zich meebracht en duizenden gelijktijdige bezoekers aankon (o.a. van
        commercials rond het EK 2020).
      </p>
    ),
    startedYear: 2019,
    endedYear: '2020',
    tech: [
      'React',
      'TypeScript',
      'Node.js',
      'GraphQL',
      'Apollo Client',
      'Apollo Server',
      'Apollo Federation',
      'microservices',
      'Redux',
      'Docker',
      'GitHub Actions',
      'GitLab CI',
      'Service Worker/PWA',
      'Lerna',
      'Yarn workspaces',
      'Cypress',
      'Scrum',
      'JIRA',
      'SEO (e-commerce)',
      'static rendering/prerendering',
    ],
    thumbnail: (await import('./assets/pme-legend.png')).default,
    url: 'https://www.pme-legend.com',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'MartijnHols',
    functionTitle: 'Freelance React Developer / Architect',
    about: (
      <p>
        Om beter vindbaar te worden als Freelance React Developer/React
        Architect heb ik deze website opgezet. Uiteraard gemaakt in React, met
        Next.js als framework en Prismic als CMS. Ondanks dat ik een techneut
        ben en niet een designer, is het een eigen design.
      </p>
    ),
    startedYear: 2018,
    endedYear: 'heden/00',
    sourceCodeHref: 'https://github.com/MartijnHols/martijnhols.nl',
    tech: [
      'Open Source',
      'React',
      'Next.js',
      'Prismic',
      'TypeScript',
      'React Query',
      'SSG',
    ],
    thumbnail: (await import('./assets/martijnhols.png')).default,
    url: '/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'esd.next',
    functionTitle: 'Lead Developer',
    about: (
      <p>
        esd.next is een uniek systeem om het totale inhuurproces van personeel
        te stroomlijnen. Het systeem is compleet en bevat functionaliteiten van
        het vinden van kandidaten en CV parsing tot en met facturatie en
        automatische boekingen. Ik heb dit systeem samen met een compagnon{' '}
        <strong>van de grond af aan ontworpen en gebouwd</strong> in PHP met een
        React SPA. Een belangrijk uitgangspunt was de gebruiker volledige
        controle geven over het systeem. Dit hebben we onder andere gedaan door
        vrijwel alle velden optioneel te maken en middels monitoring regels
        zorgen dat alles compliant is en blijft. Het systeem wordt vaak
        vergeleken met grote systemen als Nétive en Salesforce en als een hele
        verademing ervaren. Bezoek de{' '}
        <Link
          href="https://onestopsourcing.nl/opdrachtgevers/esd-next-software/"
          target="_blank"
          rel="noopener noreferrer"
        >
          esd.next marketing pagina
        </Link>{' '}
        voor meer informatie.
      </p>
    ),
    startedYear: 2016,
    endedYear: '2019',
    tech: ['React.js', 'Redux', 'PHP', 'Docker', 'MariaDB', 'TravisCI'],
    thumbnail: (await import('./assets/externalstaffingdesk.png')).default,
    url: 'https://esdnext.com',
    highlighted: true,
    placeholder: false,
  },
  {
    company: 'WoWAnalyzer',
    functionTitle: 'Oprichter',
    about: (
      <p>
        WoWAnalyzer ben ik in 2017 gestart vanuit de behoefte analyse van het
        spel World of Warcraft te automatiseren. WoWAnalyzer geeft spelers
        automatisch op basis van hun speelstijl inzichten en suggesties ter
        verbetering. Het is primair een React app. Binnen de app heb ik een
        framework ontwikkeld zodat andere ontwikkelaars eenvoudig de analyse
        konden uitbreiden. Het is een immens populaire project geworden met in
        één maand meer dan <strong>550,000 unieke bezoekers</strong> (januari
        2021) en meer dan <strong>200 ontwikkelaars</strong> die iets hebben
        bijgedragen, allemaal onder mijn leiderschap. Het project is{' '}
        <Link
          href="https://github.com/WoWAnalyzer/WoWAnalyzer/"
          target="_blank"
          rel="noopener noreferrer"
        >
          volledig Open Source
        </Link>
        . WoWAnalyzer is als voorbeeld van feedback geven opgenomen in het boek{' '}
        <Link
          href="https://books.google.nl/books?id=_C_0DwAAQBAJ&amp;lpg=PT22&amp;ots=4GQbzGf_zZ&amp;hl=nl&amp;pg=PT22"
          target="_blank"
          rel="noopener noreferrer"
        >
          The Engagement Game
        </Link>
        , en een{' '}
        <Link
          href="https://youtu.be/VY2M1D8U7Tk?t=1711"
          target="_blank"
          rel="noopener noreferrer"
        >
          lecture
        </Link>{' '}
        en{' '}
        <Link
          href="https://www.psychologyofgames.com/2019/01/how-video-games-do-feedback-well-and-poorly/"
          target="_blank"
          rel="noopener noreferrer"
        >
          artikel
        </Link>
        . Sinds eind 2021 is WoWAnalyzer overgenomen door RPGLogs.
      </p>
    ),
    startedYear: 2017,
    endedYear: '2021/11',
    sourceCodeHref: 'https://github.com/WoWAnalyzer/WoWAnalyzer/',
    tech: [
      'Open Source',
      'React',
      'TypeScript',
      'Redux',
      'Node.js',
      'Express',
      'Docker',
      'GitHub Actions',
      'Yarn workspaces',
    ],
    thumbnail: (await import('./assets/wowanalyzer.png')).default,
    url: 'https://wowanalyzer.com',
    highlighted: true,
    placeholder: false,
  },
  {
    company: 'modelovereenkomstmaken.nl',
    functionTitle: 'Lead Developer',
    about: (
      <p>
        Met een paar eenvoudige stappen kan je hier geheel gratis binnen 15
        minuten een overeenkomst maken op basis van een modelovereenkomst van de
        Belastingdienst. Deze tool, dat ik binnen 4 weken heb gebouwd, bestaat
        uit een React applicatie met minimale PHP backend. Gebruikers kunnen
        eenvoudig en snel het juiste contract selecteren en deze middels een
        interactief contractformulier invullen en opslaan.
      </p>
    ),
    startedYear: 2016,
    endedYear: '2016',
    tech: ['React.js', 'Redux', 'PHP', 'Docker', 'MariaDB', 'TravisCI'],
    thumbnail: (await import('./assets/modelovereenkomstmaken.png')).default,
    url: 'http://www.modelovereenkomstmaken.nl/',
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'When at Work',
    functionTitle: 'Software Ontwikkelaar',
    about: (
      <p>
        When at Work is een iOS app dat op basis van geofencing automatisch
        bijhoudt wanneer je op locatie bent om zo je tijdregistratie grotendeels
        te automatiseren, met mogelijkheden om het handmatig aan te passen,
        automatisch rekening te houden met zaken als lunchtijd en projecten te
        scheiden. Ik heb deze app volledig zelfstandig gebouwd als onderdeel van
        mijn afstuderen bij de HAN.
      </p>
    ),
    startedYear: 2015,
    endedYear: '2015',
    tech: ['Swift', 'iOS', 'XCode', 'App Store'],
    thumbnail: (await import('./assets/whenatwork.png')).default,
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'RedMSViewer',
    functionTitle: 'Software Ontwikkelaar',
    about: (
      <p>
        Voor Wageningen Food Safety Research (toen RIKILT), heb ik de
        RedMSViewer gemaakt. Dit was een Silverlight applicatie dat RedMS
        (reduced mass spectrometer) bestanden kan weergeven voor
        wetenschappelijk onderzoek. Deze bestanden worden getoond in
        chromatogrammen, spectra en heatmaps, en zijn volledig navigeerbaar. Er
        kunnen tot 100 bestanden gelijktijdig worden ingeladen door vele
        performance optimalisaties en gebruik van multithreading. Voor meer
        informatie over de applicatie, zie{' '}
        <Link
          href="https://books.google.nl/books?id=kC7cBQAAQBAJ&amp;lpg=PA123&amp;ots=eHJuPY50qQ&amp;pg=PA125"
          target="_blank"
          rel="noopener noreferrer"
        >
          dit boek
        </Link>
        .
      </p>
    ),
    startedYear: 2010,
    endedYear: '2011/12',
    tech: ['C#', 'Silverlight', 'IIS'],
    thumbnail: (await import('./assets/redmsviewer.png')).default,
    highlighted: false,
    placeholder: false,
  },
  {
    company: 'Elite Avengers',
    functionTitle: 'Oprichter',
    about: (
      <>
        <p>
          Dit was het eerste grote project dat ik heb opgericht. Het was een{' '}
          <Link
            href="https://nl.wikipedia.org/wiki/Tekstgebaseerd_computerspel#:~:text=Een%20tekstgebaseerd%20computerspel%20(Engels%3A%20text,minder%20rekenkracht%20dan%20visuele%20computerspellen."
            target="_self"
            rel="noopener noreferrer"
          >
            tekstgebaseerd computerspel
          </Link>{' '}
          waar duizenden spelers op af zijn gekomen.
        </p>
        <p>
          Het bestond voornamelijk uit PHP4 met een vleugje JS. Het toevoegen
          van JS was een grote uitdaging, aangezien dit vóór de release van
          libraries zoals jQuery was, waardoor zelfs basiszaken zoals AJAX-calls
          moeilijk waren, om nog maar te zwijgen van de problemen van Internet
          Explorer. Aangezien dit mijn eerste echte ontwikkelingservaring was en
          ik niemand had om hulp te vragen, ging dit project boven mijn pet.
        </p>
        <p>
          Dit project heeft een belangrijke impact op mij gehad en mij al vroeg
          getraind om alle problemen die ik tegenkom zelfstandig op te lossen,
          langdurige onderhoudbaarheid in acht te nemen, mijn Engels te
          verfijnen, zakelijke beslissingen te nemen, om te gaan met
          spelers/klanten en vrijwilligers, en het opzetten en groeien van de
          daarbijbehorende community.
        </p>
      </>
    ),
    startedYear: 2004,
    endedYear: '2011',
    tech: ['PHP', 'MySQL', 'Linux', 'JS', 'Photoshop'],
    thumbnail: (await import('./assets/eliteavengers.png')).default,
    url: 'http://www.eliteavengers.org',
    highlighted: false,
    placeholder: false,
  },
]

export default projects
