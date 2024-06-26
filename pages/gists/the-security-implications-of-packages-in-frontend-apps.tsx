import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'
import Abbreviation from '../../components/Abbreviation'
import Annotation from '../../components/Annotation'
import Aside from '../../components/Aside'
import Code from '../../components/Code'
import Figure from '../../components/Figure'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'
import Link from '../../components/Link'
import BundledPackageCode from './assets/bundled-package-code.png'
import CanIIgnore from './assets/can-i-ignore.png'
import GithubSecurityAdvisories from './assets/github-security-advisories.png'
import OgImage from './assets/ogimage-security-implications-of-packages.png'

const ObfuscatedPackageFigure = styled(Figure)(
  ({ theme }) => css`
    text-align: center;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      float: right;
    }
  `,
)

export const meta: GistMeta = {
  slug: 'the-security-implications-of-packages-in-frontend-apps',
  title: 'The security implications of packages in front-end apps',
  description:
    'The gist of the security implications of using third-party packages in front-end projects.',
  image: OgImage,
  publishedAt: '2024-04-15',
  updatedAt: '2024-04-21',
  tags: [GistTag.Security, GistTag.Dependencies],
  relatedGist: import('./keeping-dependencies-up-to-date'),
}

const SecurityImplicationsOfPackagesOnTheFrontendGist = () => (
  <Gist gist={meta}>
    <p>
      Third-party packages are great. They provide a lot of functionality and
      save us a lot of time. But what exactly are the security implications of
      using third-party packages in a front-end app (such as a React app)?
    </p>
    <p>
      Many aspects play a role in the security of using a third-party package on
      the front-end;
    </p>
    <ul>
      <li>unintentional security vulnerabilities</li>
      <li>deliberately introduced malicious code</li>
      <li>install scripts</li>
      <li>bundling and transpilation</li>
      <li>package (maintainer) trustworthiness</li>
      <li>sub-dependencies</li>
    </ul>
    <p>All of these also apply to front-end apps— to an extent.</p>
    <p>Let's explore these aspects and their implications.</p>
    <h2 id="unintentional-security-vulnerabilities">
      Unintentional security vulnerabilities
    </h2>
    <p>
      Unintentional security vulnerabilities reported in security advisories are
      the most obvious vulnerabilities. GitHub, Gitlab, npm, yarn, and many
      other tools provide automated scanning of security advisories. Most of
      those can be resolved fairly easily by updating to the suggested version.
    </p>

    <p>
      Monitoring and resolving these is the least you can do, but don't fall
      into the trap of thinking this is enough.
    </p>

    <Figure
      caption="Average security advisories for a front-end project"
      href={GithubSecurityAdvisories.src}
    >
      <Image
        src={GithubSecurityAdvisories}
        alt="A list of security advisories for a front-end project of various levels ranging from High to Low"
        width={650}
        height={391}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </Figure>

    <Aside>
      In my opinion the vast majority of front-end JavaScript security
      advisories are boring (i.e. unimpactful). A large majority are in
      development tooling, and unless they can be{' '}
      <a href="https://github.com/advisories/GHSA-wr3j-pwj9-hqq6">
        exploited via the network
      </a>
      , they have zero impact. The rest are usually either ReDoS or only an
      issue if the package is used in a server context. There are very few
      vulnerabilities that actually matter for the front end.
    </Aside>

    <h2 id="deliberately-introduced-malicious-code">
      Deliberately introduced malicious code
    </h2>
    <p>
      Deliberately introduced malicious code by a lone hacker, hacking group, or
      state hackers is the scariest kind of vulnerability. This is where someone
      adds malicious code to an otherwise useful package, turning it into a{' '}
      <a href="https://owasp.org/www-community/attacks/Trojan_Horse">
        Trojan Horse
      </a>
      . The right Trojan Horse could do almost anything; from hijacking your
      codebase and the data on your dev machine to installing ransomware or even
      hijacking all the user data on your servers.
    </p>
    <p>
      <strong>
        Pure front-end apps are (
        <Annotation annotation="It's not infeasible for someone to also find an exploit in a dev-server or linter that allows them to execute code on the host machine or during a build.">
          almost
        </Annotation>
        ) immune to the worst of this
      </strong>
      , as they don't execute any privileged code on the host (your dev machine
      or server). There's still plenty to be careful of though, as a Trojan
      could still inject code into your bundle to hijack user cookies or keylog
      login and credit card credentials. Your cookies should be safe if you use{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies">
        HTTP-only cookies
      </Link>
      . Data theft through AJAX calls can be mitigated with a{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">
        Content Security Policy (CSP)
      </Link>
      , but it doesn't prevent JavaScript injection entirely (not even if you
      use nonces).
    </p>
    <p>
      <strong>
        It's a different story when you're using the package within your{' '}
        <Abbreviation annotation="Server-Side Rendering">SSR</Abbreviation> or{' '}
        <Abbreviation annotation="Static Site Generation">SSG</Abbreviation>{' '}
        code
      </strong>
      , as then the package gets the same access as your server. Assuming your
      SSR/SSG backend has a database connection, that would probably mean access
      to all your data.
    </p>
    <p>
      You wouldn't detect a really well-made Trojan Horse without thoroughly
      inspecting the package code. Someone smart will hide and obfuscate the
      malicious code, only run it in production mode, only for every 100th
      request, and only after two weeks from now (or something like that).
    </p>
    <p>
      With the impact a Trojan Horse could have, by the time a security advisory
      has been published, it may have been too late.
    </p>

    <Aside>
      Recently{' '}
      <a href="https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/">
        xz came in the news with a backdoor in an extremely popular Linux
        package
      </a>
      . From what it seems, it was sheer luck that the right person found it at
      all. Hackers will learn from this, and next time we'll probably not be so
      lucky. (
      <a href="https://eslint.org/blog/2018/07/postmortem-for-malicious-package-publishes/">
        There's
      </a>{' '}
      <a href="https://www.zdnet.com/article/hacker-backdoors-popular-javascript-library-to-steal-bitcoin-funds/">
        also
      </a>{' '}
      <a href="https://therecord.media/malware-found-in-npm-package-with-millions-of-weekly-downloads">
        some
      </a>{' '}
      <a href="https://jfrog.com/blog/malicious-npm-packages-are-after-your-discord-tokens-17-new-packages-disclosed/">
        older
      </a>{' '}
      <a href="https://duo.com/decipher/dozens-of-malicious-data-harvesting-npm-packages-found">
        history
      </a>{' '}
      <a href="https://www.bleepingcomputer.com/news/security/ssh-keys-stolen-by-stream-of-malicious-pypi-and-npm-packages/">
        in
      </a>{' '}
      <a href="https://www.bleepingcomputer.com/tag/npm/">the npm ecosystem</a>)
    </Aside>
    <h2 id="install-scripts">Install scripts</h2>
    <p>
      Install scripts are an often overlooked danger of installing a new
      package. Any package can execute scripts after installation which can do
      pretty much anything you can do on your machine. Maybe it builds a
      C-executable for faster compilation, or maybe the script just installed
      malware.
    </p>

    <p>
      This makes installing a package pretty much as risky as installing a
      random executable from the internet. What do you think would happen to
      your computer if you just installed every single application you ran into
      on the internet?
    </p>

    <p>There's no reason not to be as wary of package install scripts.</p>

    <Figure
      caption={
        <>
          <Link href={CanIIgnore.src}>
            Some of the install scripts of a front-end project as reported by
          </Link>{' '}
          <Link href="https://github.com/naugtur/can-i-ignore-scripts">
            Can I Ignore
          </Link>
        </>
      }
      captionLink={false}
      href={CanIIgnore.src}
    >
      <Image
        src={CanIIgnore}
        alt="Terminal output showing install scripts found in a front-end project. There are some strange entries (ljharb-monorepo-symlink-test), and esbuild is shown."
        width={650}
        height={412}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </Figure>

    <Aside label="Tip">
      You can disable script execution by adding{' '}
      <Code>ignore-scripts true</Code> to your <Code>.yarnrc</Code> or{' '}
      <Code>ignore-scripts=true</Code> to your <Code>.npmrc</Code>, but this
      will probably be a bit more involved with certain packages.
    </Aside>

    <h2 id="bundling-and-transpilation">Bundling and transpilation</h2>

    <ObfuscatedPackageFigure
      caption="An obfuscated bundled package"
      href={BundledPackageCode.src}
    >
      <Image
        src={BundledPackageCode}
        alt="Obfuscated JavaScript code of prettier-plugin-tailwindcss"
        width={350}
        height={218}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </ObfuscatedPackageFigure>

    <p>
      Most packages undergo bundling and transpilation (e.g. TypeScript to
      JavaScript) processes before publication. As a result, the code you get
      when you install a package does not match the code that is visible on
      GitHub. It would be very easy for a bad actor to sneak something extra in.
      These changes would be almost completely hidden, as they won't appear in a
      commit message, a diff, a GitHub release, the changelog, dependabot
      changes, or anywhere really.
    </p>
    <p>
      The only way to see the real changes is by looking into the (often
      hard-to-read) code of the package as it was published.
    </p>

    <h2 id="package-maintainer-trustworthiness">Package (maintainer) trust</h2>

    <p>
      For most developers, package (maintainer) trustworthiness plays a big role
      in selecting what packages to use. If the package looks trustworthy and a
      lot of people use it, it's probably safe, right? Some go further and look
      into issues, how the maintainers respond to them, and other projects the
      developer has worked on.
    </p>
    <p>
      A common rule of thumb I hear used is to only use packages with a certain
      amount of stars on GitHub. Unfortunately,{' '}
      <Link href="https://news.ycombinator.com/item?id=36151140">
        star count isn't all that reliable
      </Link>
      .
    </p>
    <p>We need better ways to determine trustworthiness.</p>

    <Aside>
      Even if you were to check the trustworthiness of package managers when you
      first select a package, the maintainers of a package rarely stay the same
      forever. You would have to check again before every update. After all,{' '}
      <Link href="https://opensource.guide/best-practices/#share-the-workload">
        it's encouraged to share maintainer access
      </Link>{' '}
      in Open Source projects.
    </Aside>

    <h2 id="sub-dependencies">Sub-dependencies</h2>
    <p>
      The majority of packages come with dozens of sub-dependencies, and the
      security implications applies to every single one of them. Even if you're
      going to review package code or (like the rest of the world) do a quick
      scan of the package and its maintainers, you'll need to do it for every
      single dependency in the chain, and{' '}
      <strong>especially the sub-dependencies</strong>. There's no better place
      to hide malicious code.
    </p>

    <h2 id="in-conclusion">In conclusion</h2>

    <p>
      Every single front-end package, like any other kind of package, brings
      security risks. Some risks can be mitigated, such as through a{' '}
      <i>Content Security Policy</i> and disabling install scripts, other
      mitigations, such as analyzing maintainers and package code, would require
      such a tremendous amount of effort that they are usually too unreasonable.
    </p>

    <p>
      The real solutions will need to happen at the platform level such as a{' '}
      <a href="https://nodejs.org/api/permissions.html#module-based-permissions">
        module-level permissions system (experimental)
      </a>{' '}
      and{' '}
      <a href="https://github.com/npm/rfcs/discussions/80">
        deny by default install scripts (RFC)
      </a>
      .
    </p>

    <p>For now, I will be doing the following for my projects:</p>
    <ul>
      <li>Automatic security advisory monitoring</li>
      <li>Disabling install scripts</li>
      <li>Setup a Content Security Policy</li>
      <li>Use as few packages as possible</li>
      <ul>
        <li>Copy over adding a dependency</li>
        <li>Removing small, abandoned, and/or untrustworthy dependencies</li>
      </ul>
      <li>Avoid obfuscated packages</li>
      <li>Increasing the barrier to adding new packages</li>
      <li>Reducing dependency update frequency</li>
    </ul>

    <p>
      I reckon the only reason package security hasn't been a more common issue
      is because we're lucky most people online are still nice.
    </p>

    <Aside label="ps">
      Don't forget about your CI tooling. GitHub Actions, for example,
      automatically uses the latest version of actions by default. These can
      inject nasty stuff into your builds as well, and their code is even less
      visible.
    </Aside>
  </Gist>
)

// Some ideas to help with this:
// - a script to whitelist packages in the package.json for which to run install scripts that can be ran after an install with ignore-scripts (preferably in the yarnrc)
// - a script to list all dependencies and subdependencies and maintainers and stars and a trustworthiness score for the entire project (not for the deps as that would be too easily gamed)
// - a github action to disallow non-whitelisted people from changing the package.json and yarn.lock
// - a script to get a diff of an update to a package

export default SecurityImplicationsOfPackagesOnTheFrontendGist
