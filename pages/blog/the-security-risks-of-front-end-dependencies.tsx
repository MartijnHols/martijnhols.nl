import styled from '@emotion/styled'
import Image from 'next/image'
import Abbreviation from '../../components/Abbreviation'
import Annotation from '../../components/Annotation'
import AsideWithParagraph from '../../components/AsideWithParagraph'
import BlogArticle from '../../components/BlogArticle'
import { BlogArticleTag } from '../../components/BlogArticleMeta'
import Code from '../../components/Code'
import Figure from '../../components/Figure'
import Link from '../../components/Link'
import { breakpoints } from '../../theme'
import articleMeta, { ArticleStaticProps } from '../../utils/articleMeta'
import BundledPackageCode from './assets/bundled-package-code.png'
import CanIIgnore from './assets/can-i-ignore.png'
import dependencySecurityRisksImage from './assets/dependency-security-risks.png'
import GithubSecurityAdvisories from './assets/github-security-advisories.png'
import openGraphImage from './assets/ogimage-security-implications-of-packages.png'

const { meta, getStaticProps } = articleMeta({
  slug: 'the-security-risks-of-front-end-dependencies',
  title: 'The security risks of front-end dependencies',
  description:
    'A dive into the security risks of using third-party dependencies in front-end projects.',
  openGraphImage: openGraphImage,
  image: dependencySecurityRisksImage,
  publishedAt: '2024-04-15',
  republishedAt: '2024-12-14',
  updatedAt: '2025-02-02',
  republishedReason:
    'I rewrote the article to significantly improve the flow, add details and reduce repetition. The spirit of the article remains the same, but it should read a lot better.',
  tags: [
    BlogArticleTag.Security,
    BlogArticleTag.Dependencies,
    BlogArticleTag.Maintainability,
  ],
  socials: ['https://twitter.com/MartijnHols/status/1867947661908975749'],
})
export { meta, getStaticProps }

const ObfuscatedPackageFigure = styled(Figure)`
  text-align: center;

  @media (min-width: ${breakpoints.TABLET}px) {
    float: right;
    margin-left: 1.5em;
    margin-bottom: 1em;
  }
`

const SecurityImplicationsOfDependenciesOnTheFrontendGist = (
  props: ArticleStaticProps,
) => (
  <BlogArticle {...props}>
    <p>
      Front-end apps are built with hundreds of dependencies, each one a
      potential risk. This year alone, thousands of JavaScript vulnerabilities
      were reported, yet many developers still underestimate the security risks
      of dependencies in front-end apps. These dependencies introduce unique
      risks distinct from those faced in server-side applications. It's crucial
      for professional developers to understand and address their potential
      impact.
    </p>
    <Figure
      caption={
        <div style={{ maxWidth: 400, margin: '0 auto' }}>
          With thousands of dependencies, there's bound to be some shady
          maintainers.
          <br />
          <small>
            Based on the{' '}
            <Link href="https://xkcd.com/2347/">xkcd 'Dependency' comic</Link>
          </small>
        </div>
      }
    >
      <Image
        src={dependencySecurityRisksImage}
        width={400}
        alt={`A modified version of the xkcd "Dependency" comic; a tower of blocks representing dependencies. The top is labeled with "Your frontend components", and a tiny block at the bottom has an arrow pointing with the text "A dependency maintained by someone with a shady background that you don't know".`}
      />
    </Figure>
    <p>
      In this article, we'll dive into these risks and explore their specific
      impact on front-end projects. The key concerns are:
    </p>
    <ul>
      <li>Unintentional security vulnerabilities</li>
      <li>Deliberately introduced malicious code</li>
      <li>Install scripts</li>
      <li>Bundling and transpilation</li>
      <li>Package (maintainer) trustworthiness</li>
      <li>Sub-dependencies</li>
    </ul>
    <p>
      Finally, we'll wrap up with a set of{' '}
      <Link href="#recommendations">recommendations</Link> to help you mitigate
      these risks in your own projects.
    </p>
    <h2 id="unintentional-security-vulnerabilities">
      Unintentional security vulnerabilities
    </h2>
    <p>
      The most common security risks come from unintentional bugs that create
      vulnerabilities. Most of these issues will (eventually) get reported in a
      security advisory, which you can monitor via automated tools like GitHub,
      GitLab, npm, or yarn. Most of those can be resolved simply by updating to
      the latest version.
    </p>
    <p>
      Monitoring and resolving these is the least you can do, but don't assume
      it's enough to keep your app secure.
    </p>
    <Figure caption="Average security advisories for a front-end project">
      <Image
        src={GithubSecurityAdvisories}
        alt="A list of security advisories for a front-end project of various levels ranging from High to Low"
        width={650}
        height={391}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </Figure>
    <AsideWithParagraph>
      Most front-end security advisories are boring (i.e. unimpactful). A large
      portion affects development tooling, and unless they can be{' '}
      <a href="https://github.com/advisories/GHSA-wr3j-pwj9-hqq6">
        exploited via the network
      </a>
      , these have zero impact. The rest are usually either ReDoS or only an
      issue if the package is used in a server context. There are few
      vulnerabilities that actually matter for the front end. But since
      assessing the real impact of vulnerabilities is tricky, your safest bet is
      to resolve them all.
    </AsideWithParagraph>

    <h2 id="deliberately-introduced-malicious-code">
      Deliberately introduced malicious code
    </h2>

    <p>
      The scariest kind of vulnerability is when malicious code is deliberately
      added to a package – whether by a lone hacker, a group, or even
      state-sponsored attackers. This turns an otherwise useful dependency into
      a{' '}
      <Link href="https://owasp.org/www-community/attacks/Trojan_Horse">
        Trojan Horse
      </Link>{' '}
      capable of almost anything: hijacking your codebase, stealing data,
      installing ransomware, or worse.
    </p>
    <p>
      <strong>For purely front-end apps, the risks are less severe</strong>{' '}
      since the code runs sandboxed in the user's browser without privileged
      access to your dev machine or servers. But malicious packages can still:
    </p>
    <ul>
      <li>Steal cookies or sensitive user data</li>
      <li>Log user credentials or credit card information</li>
      <li>Install cryptominers in the background</li>
      <li>Inject ads or unwanted (political) messages into your app</li>
    </ul>
    <p>
      These attacks are harder to mitigate.{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies">
        HTTP-only cookies
      </Link>{' '}
      can prevent theft of cookie data, and a well-configured{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">
        Content Security Policy (CSP)
      </Link>{' '}
      helps block data exfiltration and unauthorized external scripts. However,
      a CSP cannot stop harmful code bundled directly into your app-- even if
      you use nonces.
    </p>
    <p>
      <strong>
        The risks are higher for apps using{' '}
        <Abbreviation annotation="Server-Side Rendering">SSR</Abbreviation> and{' '}
        <Abbreviation annotation="Static Site Generation">SSG</Abbreviation>
      </strong>
      , where dependencies execute on the server. Here, malicious code may get
      access to everything on your server, giving attackers access to critical
      data such as your entire database.
    </p>

    <h3 id="detecting-trojan-horses">Detecting Trojan Horses</h3>

    <p>
      You wouldn't detect a really well-made Trojan Horse easily. A skilled
      attacker might:
    </p>
    <ul>
      <li>Obfuscate the malicious code</li>
      <li>
        Trigger it only under specific conditions (e.g., every 100th request or
        two weeks after installation)
      </li>
      <li>Only run it in CI</li>
      <li>Limit its behavior to production builds</li>
    </ul>
    <p>
      By the time a security advisory is published, the damage may already be
      done.
    </p>

    <AsideWithParagraph>
      Earlier this year, the Linux package <Code>xz</Code> was{' '}
      <a href="https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/">
        almost compromised by a backdoor
      </a>
      . It was sheer luck that the right person found it at all. Hackers are
      only getting smarter, and next time we'll probably not be so lucky. (
      <a href="https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes/">
        There's
      </a>{' '}
      <a href="https://www.zdnet.com/article/hacker-backdoors-popular-javascript-library-to-steal-bitcoin-funds/">
        a
      </a>{' '}
      <a href="https://therecord.media/malware-found-in-npm-package-with-millions-of-weekly-downloads">
        lot
      </a>{' '}
      <a href="https://jfrog.com/blog/malicious-npm-packages-are-after-your-discord-tokens-17-new-packages-disclosed/">
        of
      </a>{' '}
      <a href="https://duo.com/decipher/dozens-of-malicious-data-harvesting-npm-packages-found">
        history
      </a>{' '}
      <a href="https://www.bleepingcomputer.com/news/security/ssh-keys-stolen-by-stream-of-malicious-pypi-and-npm-packages/">
        in
      </a>{' '}
      <a href="https://www.bleepingcomputer.com/tag/npm/">the npm ecosystem</a>)
    </AsideWithParagraph>
    <h2 id="install-scripts">Install scripts</h2>
    <p>
      Install scripts are another often overlooked attack vector. These scripts
      run automatically when you install a dependency (or a sub-dependency) and{' '}
      <strong>can do anything on your machine</strong>-- just like if you were
      to run unverified software from the internet. Maybe it just builds a
      C-executable to speed up CSS compilation, or maybe it executes or installs
      malware.
    </p>
    <p>
      It's easy to imagine what could happen if you installed random unverified
      software from the internet. Yet many developers install npm packages
      without a second thought.
    </p>
    <Figure
      caption={
        <>
          Some of the install scripts of a front-end project as reported by{' '}
          <Link href="https://github.com/naugtur/can-i-ignore-scripts">
            Can I Ignore
          </Link>
          . Notice strange entries like 'ljharb-monorepo-symlink-test'--
          potential red flags.
        </>
      }
    >
      <Image
        src={CanIIgnore}
        alt="Terminal output showing install scripts found in a front-end project. There are some strange entries (ljharb-monorepo-symlink-test), and esbuild is shown."
        width={650}
        height={412}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </Figure>

    <h3>Mitigation</h3>

    <p>
      Disabling install scripts is fairly straightforward, all you need to do is
      add <Code>ignore-scripts true</Code> to your <Code>.yarnrc</Code> or{' '}
      <Code>ignore-scripts=true</Code> to your <Code>.npmrc</Code>. But this
      will unfortunately probably be a bit more involved with dependencies that
      rely on install scripts. You can find out which these may be by running a
      tool like{' '}
      <Link href="https://github.com/naugtur/can-i-ignore-scripts">
        Can I Ignore
      </Link>
      . Essential build scripts can sometimes be run manually, or you can add
      them to your "start" script and in CI.
    </p>

    <AsideWithParagraph>
      Running a <Code>npx</Code> script is equally as risky since they have full
      access to your machine. I like to run these scripts in a Docker container
      to minimize the security risk
      <Annotation annotation="Even running the script in Docker doesn't fully eliminate all risks. If the package injects malicious code into a different package for you to execute later, your computer/project may still get compromised.">
        *
      </Annotation>
      .
      <br />
      <Code>
        docker run -v "$PWD":/usr/src/app -w /usr/src/app node:20 npx
        can-i-ignore-scripts
      </Code>
    </AsideWithParagraph>

    <h2 id="bundling-and-transpilation">Bundling and transpilation</h2>

    <ObfuscatedPackageFigure caption="An obfuscated bundled package (TailwindCSS)">
      <Image
        src={BundledPackageCode}
        alt="Obfuscated JavaScript code of prettier-plugin-tailwindcss"
        width={350}
        height={218}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </ObfuscatedPackageFigure>

    <p>
      Another challenge lies in how packages are bundled and{' '}
      <Annotation annotation="Translating a programming language into a different high-level programming language such as TypeScript to JavaScript.">
        transpiled
      </Annotation>
      . Most packages are written in a modern language like TypeScript or
      ESNext, but in order to be widely usable, they get transpiled to an older
      version of JavaScript. Sometimes they're even minified/obfuscated. As a
      result, the code you get when you install a package usually does not match
      the code that you can inspect on GitHub.
    </p>
    <p>
      It's almost impossible to detect subtle malicious changes hidden in a
      bundled package. They won't show up in commit messages, GitHub diffs,
      changelogs, or dependabot updates. The only way to verify a dependency is
      by inspecting the (often hard-to-read) code in the published package,
      which is rarely feasible.
    </p>

    <h2 id="package-maintainer-trustworthiness">
      Package (maintainer) trustworthiness
    </h2>

    <p>
      A common way to mitigate the risk of malicious code is to look into the
      trustworthiness of the package maintainers. If the package looks
      trustworthy and a lot of people use it, it's probably safe to use. Some go
      further and look into issues, how the maintainers respond to them, and
      other projects the developer has worked on.
    </p>
    <p>
      A common rule of thumb I hear is to only use packages with a certain
      amount of stars on GitHub. Unfortunately,{' '}
      <Link href="https://news.ycombinator.com/item?id=36151140">
        stars on GitHub are easy to game
      </Link>{' '}
      and don't reflect real-world usage or trustworthiness. As anything can be
      gamed, it's hard to determine trustworthiness based on anything other than
      the package code itself.
    </p>
    <p>We need better ways to determine trustworthiness.</p>

    <AsideWithParagraph>
      Even if you were to check the trustworthiness of package managers when you
      first select a package, the maintainers of a package rarely stay the same
      forever. You would have to check again before every update.
    </AsideWithParagraph>

    <h2 id="sub-dependencies">Sub-dependencies</h2>

    <p>
      The risks don't stop with your direct dependencies. Most front-end
      projects rely on dozens of direct dependencies, but each of those often
      comes with a long chain of sub-dependencies. Every sub-dependency carries
      the same security risks.
    </p>

    <p>
      Attackers know that direct dependencies are more visible and likely to be
      scrutinized. That's why they target sub-dependencies. While you might
      review the code or maintainer history of a direct dependency, doing the
      same for every sub-dependency is rarely feasible.
    </p>

    <p>
      This creates a compounding problem: trusting a single dependency means
      implicitly trusting its entire chain. One dependency hidden deep in your
      dependency tree, can compromise your app.
    </p>

    <h2 id="recommendations">Recommendations</h2>

    <p>
      Every dependency in a front-end app brings security risks with it. Some
      risks can be mitigated, such as through a{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">
        Content Security Policy (CSP)
      </Link>{' '}
      and disabling install scripts, other mitigations, such as analyzing
      maintainers and package code, would require such a tremendous amount of
      effort that they are usually not feasible.
    </p>
    <p>
      The real solutions will need to happen at the platform level such as a{' '}
      <a href="https://nodejs.org/api/permissions.html#module-based-permissions">
        module-level permissions system (experimental)
      </a>{' '}
      and{' '}
      <a href="https://github.com/npm/rfcs/discussions/80">
        denying install scripts by default (RFC)
      </a>
      .
    </p>
    <p>Until then, my recommendations to mitigate these risks are:</p>
    <ul>
      <li>Set up automatic security advisory alerts</li>
      <li>Disable install scripts</li>
      <li>Set up a Content Security Policy</li>
      <li>Use as few packages as possible</li>
      <ul>
        <li>
          Copy the code for small utility functions instead of adding a new
          dependency
        </li>
        <li>Remove small, abandoned, and/or untrustworthy dependencies</li>
      </ul>
      <li>Avoid obfuscated packages</li>
      <li>Increase the barrier of adding new dependencies to your project</li>
      <li>
        <Link href="/blog/keeping-dependencies-up-to-date">
          Keep dependencies (reasonably) up-to-date
        </Link>{' '}
        so that it's easy to update when a security advisory is published
      </li>
      <li>Delay dependency updates until they're widely used</li>
    </ul>
    <p>
      So far, most developers and projects have been lucky. But luck isn't a
      security strategy.{' '}
      <strong>
        It's only a matter of time before a major dependency-related incident
        happens.
      </strong>{' '}
      With these recommendations, you're much less likely to be affected.
    </p>

    <AsideWithParagraph label="ps">
      Don't forget your CI tooling. For example, GitHub Actions automatically
      updates to the latest version of actions by default. These can inject
      nasty stuff into your builds as well, and their code is even less visible.
    </AsideWithParagraph>
  </BlogArticle>
)

// Some ideas to help with this:
// - a script to whitelist packages in the package.json for which to run install scripts that can be ran after an install with ignore-scripts (preferably in the yarnrc)
// - a script to list all dependencies and subdependencies and maintainers and stars and a trustworthiness score for the entire project (not for the deps as that would be too easily gamed)
// - a github action to disallow non-whitelisted people from changing the package.json and yarn.lock
// - a script to get a diff of an update to a package

export default SecurityImplicationsOfDependenciesOnTheFrontendGist
