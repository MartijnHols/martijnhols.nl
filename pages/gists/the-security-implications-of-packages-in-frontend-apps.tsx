import { css } from '@emotion/react'
import styled from '@emotion/styled'
import Image from 'next/image'

import Aside from '../../components/Aside'
import Code from '../../components/Code'
import Gist from '../../components/Gist'
import Link from '../../components/Link'
import BundledPackageCode from './assets/bundled-package-code.png'
import CanIIgnore from './assets/can-i-ignore.png'
import GithubSecurityAdvisories from './assets/github-security-advisories.png'
import { GistMeta } from './index'

const ObfuscatedPackageFigure = styled.figure(
  ({ theme }) => css`
    text-align: center;

    @media (min-width: ${theme.breakpoints.TABLET}px) {
      float: right;
      margin-top: 7px;
    }
  `,
)

export const meta: GistMeta = {
  slug: 'the-security-implications-of-packages-in-frontend-apps',
  title: 'The security implications of packages in frontend apps',
  description:
    'The gist of the security implications of using third-party packages in frontend projects.',
  publishedAt: '2024-04-15',
  tags: ['security', 'packages', 'npm', 'frontend'],
}

const SecurityImplicationsOfPackagesOnTheFrontendGist = () => (
  <Gist {...meta}>
    <p>
      Third-party packages are great. They provide a lot of functionality and
      save us a lot of time. But what exactly are the security implications of
      using third-party packages in a frontend app (such as a React app)?
    </p>
    <p>
      There are many aspects that play a role in the security of using a
      third-party package on the frontend;
    </p>
    <ul>
      <li>unintentional security vulnerabilities</li>
      <li>intentional exploits (e.g. backdoors)</li>
      <li>install scripts</li>
      <li>bundling and transpilation</li>
      <li>package (maintainer) trustworthiness</li>
      <li>sub-dependencies</li>
    </ul>
    <p>All of these also apply to frontend apps— to an extend.</p>
    <p>Let's explore these aspects and their implications.</p>
    <h2 id="unintentional-security-vulnerabilities">
      Unintentional security vulnerabilities
    </h2>
    <p>
      Unintentional security vulnerabilities reported in security advisories are
      the most obvious vulnerabilities. GitHub, Gitlab, npm, yarn and many other
      tools provide automated scanning of security advisories. Most of those can
      be resolved fairly easily by updating to the suggested version.
    </p>

    <p>
      Monitoring and resolving these is the least you can do, but don't fall in
      the trap of thinking this is enough.
    </p>

    <figure style={{ textAlign: 'center' }}>
      <Link href={GithubSecurityAdvisories.src} className="plain">
        <Image
          src={GithubSecurityAdvisories}
          alt="A list of security advisories for a frontend project of various levels ranging from Critical to High"
          width={500}
          height={410}
          // TODO: sizes="(min-width: 768px) 500px, 100vw"
        />
      </Link>
      <figcaption style={{ fontSize: 14 }}>
        <Link href={GithubSecurityAdvisories.src}>
          Security advisories for a frontend project
        </Link>
      </figcaption>
    </figure>

    <Aside>
      In my opinion the vast majority of frontend JavaScript security advisories
      are boring (i.e. unimpactful). A large majority are in development
      tooling, and unless they can be{' '}
      <a href="https://github.com/advisories/GHSA-wr3j-pwj9-hqq6">
        exploited via the network
      </a>
      , they have zero impact. The rest are usually either ReDoS, or only an
      issue if the package is used in a server-context. There are very few
      vulnerabilities that actually matter for the frontend.
    </Aside>

    <h2 id="intentional-exploits">Intentional exploits</h2>
    <p>
      Intentional exploits are the scariest vulnerabilities. This is where
      people implant a{' '}
      <a href="https://owasp.org/www-community/attacks/Trojan_Horse">
        Trojan Horse
      </a>{' '}
      into their package. A Trojan Horse could do almost anything; from
      hijacking your codebase and the data on your dev machine, to using the
      server for DDOS or even hijacking all the data on it.
    </p>
    <p>
      <strong>
        Pure frontend apps are (
        <dfn title="It's not infeasible for someone to also find an exploit in a dev-server or linter that allows them to execute code on the host machine or during a build.">
          almost
        </dfn>
        ) immune to the worst of this
      </strong>
      , as they don't execute any priviliged code on the host (your dev machine
      or server). There's still plenty to be careful of though, as a Trojan
      could still inject code in your bundle to hijack user cookies, or keylog
      login or creditcard credentials. Your cookies should be safe if you use{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/Cookies#restrict_access_to_cookies">
        HTTP-only cookies
      </Link>
      . Data theft through AJAX calls can be mitigated with a{' '}
      <Link href="https://developer.mozilla.org/en-US/docs/Web/HTTP/CSP">
        Content Security Policy (CSP)
      </Link>
      , but it doesn't prevent other injected JavaScript (not even if you use
      nonces).
    </p>
    <p>
      <strong>
        It's a different story if you're using the package within your{' '}
        <dfn title="Server-Side Rendering">SSR</dfn> or{' '}
        <dfn title="Static Site Generation">SSG</dfn> code
      </strong>
      , as then the package gets the same access as your server. Assuming your
      SSR/SSG backend has a database connection, that would probably mean access
      to all your data.
    </p>
    <p>
      You wouldn't detect a really good exploit without thoroughly inspecting
      the code. Someone smart will obfuscate it, only run it in production mode,
      only for every 100th request, and only after two weeks from now (or
      something like that) so it's extremely hard to detect. Without inspecting
      all of the code of the package, it will be impossible to detect until it's
      been too late. For many companies, a security advisory would be too late.
    </p>

    <Aside>
      Recently{' '}
      <a href="https://arstechnica.com/security/2024/04/what-we-know-about-the-xz-utils-backdoor-that-almost-infected-the-world/">
        xz came in the news with a backdoor in an extremely popular Linux
        package
      </a>
      . From what it seems, it was sheer luck that the right person found it at
      all. Hackers will learn from this, and next time we'll probably not be so
      lucky.
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

    <p>
      There's no reason to not be as wary, if not more wary, of package install
      scripts.
    </p>

    <figure style={{ textAlign: 'center' }}>
      <Link href={CanIIgnore.src} className="plain">
        <Image
          src={CanIIgnore}
          alt="Terminal output showing install scripts found in a frontend project. There are some strange entries (ljharb-monorepo-symlink-test), and esbuild is shown."
          width={500}
          height={317}
        />
      </Link>
      <figcaption style={{ fontSize: 14 }}>
        <Link href={CanIIgnore.src}>
          Some of the install scripts of a frontend project as reported by
        </Link>{' '}
        <Link href="https://github.com/naugtur/can-i-ignore-scripts">
          Can I Ignore
        </Link>
      </figcaption>
    </figure>

    <Aside label="Tip">
      You can disable script execution by adding{' '}
      <Code>ignore-scripts true</Code> to your <Code>.yarnrc</Code> or{' '}
      <Code>ignore-scripts=true</Code> to your <Code>.npmrc</Code>, but this
      will probably be a bit more involved with certain packages.
    </Aside>

    <h2 id="bundling-and-transpilation">Bundling and transpilation</h2>

    <ObfuscatedPackageFigure>
      <Link href={BundledPackageCode.src} className="plain">
        <Image
          src={BundledPackageCode}
          alt="Obfuscated JavaScript code of prettier-plugin-tailwindcss"
          width={300}
          height={187}
        />
      </Link>
      <figcaption style={{ fontSize: 14 }}>
        <Link href={BundledPackageCode.src}>An obfuscated bundled package</Link>
      </figcaption>
    </ObfuscatedPackageFigure>

    <p>
      Nearly all packages go through a bundling and transpilation (e.g.
      TypeScript to JavaScript) process before publication. This means that the
      code you get when you install a package does not match the code that is
      published on GitHub. It would be very easy for a bad actor to sneak
      something extra in. These changes would be almost completely hidden, as
      they won't appear in a commit message, a diff, a GitHub release, the
      changelog, dependabot changes, or anywhere really.
    </p>
    <p>
      The only way to see the real changes is by looking into the (often hard to
      read) code of the package as it was published.
    </p>

    <h2 id="package-maintainer-trustworthiness">Package (maintainer) trust</h2>

    <p>
      For most developers, package (maintainer) trustworthiness plays a big role
      in selecting what packages to use. If the package looks thrustworthy and a
      lot of people use it, it's probably safe, right? Some go further and look
      into issues, how the maintainers respond to them and other projects the
      developer has worked on.
    </p>
    <p>
      A common rule of thumb I hear used is to only use packages with a certain
      amount of stars on GitHub. Unfortunately,{' '}
      <Link href="https://news.ycombinator.com/item?id=36151140">
        starcount isn't all that reliable
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
    <p>Sub-dependencies, sub-dependencies and more sub-dependencies.</p>
    <p>
      Most packages come with dozens of sub-dependencies. All of the above
      applies to every single one of them. Even if you're going to review
      package code or (like the rest of the world) do a quick scan of the
      package and its maintainers, you'll need to do it for every single
      dependency, and <strong>especially the sub-dependencies</strong>. There's
      no better place to hide an exploit.
    </p>

    <h2 id="in-conclusion">In conclusion</h2>

    <p>
      Every single frontend package, like any other kind of package, brings
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

    <p>For now I will be doing the following for my projects:</p>
    <ul>
      <li>Automatic security advisory monitoring</li>
      <li>Disabling install scripts</li>
      <li>Setup a Content Security Policy</li>
      <li>Use as few packages as possible</li>
      <ul>
        <li>Copy over adding a dependency</li>
        <li>Removing small, abandoned and/or untrustworthy dependencies</li>
      </ul>
      <li>Avoid obfuscated packages</li>
      <li>Increasing the barrier of adding new packages</li>
      <li>Reducing dependency update frequency</li>
    </ul>

    <p>
      I reckon the only reason package security hasn't been a more common issue
      is because we're lucky most people online are still nice.
    </p>

    <Aside label="ps">
      Give the same thought to the tools you use in CI. GitHub Actions, for
      example, automatically uses new versions of actions by default. CI actions
      can inject stuff into your project as well.
    </Aside>
  </Gist>
)

// Some ideas to help with this:
// - a script to whitelist packages in the package.json for which to run install scripts that can be ran after an install with ignore-scripts (preferably in the yarnrc)
// - a script to list all dependencies and subdependencies and maintainers and stars and a trustworthiness score for the entire project (not for the deps as that would be too easily gamed)
// - a github action to disallow non-whitelisted people from changing the package.json and yarn.lock
// - a script to get a diff of an update to a package

export default SecurityImplicationsOfPackagesOnTheFrontendGist
