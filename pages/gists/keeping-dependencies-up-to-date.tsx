import Image from 'next/image'
import Aside from '../../components/Aside'
import CodeSnippet from '../../components/CodeSnippet'
import Figure from '../../components/Figure'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'
import Link from '../../components/Link'
import dependabotImage from './assets/dependabot.png'
import dependencyUpdatesScheduledImage from './assets/dependency-updates-scheduled.png'
import dependencyUpdatesIcal from './assets/dependencyupdates.ics'
import libyearsCartoonImage from './assets/libyears-cartoon.png'
import openGraphImage from './assets/ogimage-keeping-dependencies-up-to-date.png'

export const meta: GistMeta = {
  slug: 'keeping-dependencies-up-to-date',
  title: 'Keeping dependencies up-to-date',
  titleReact: (
    <>
      Keeping <span style={{ whiteSpace: 'nowrap' }}>dependencies&nbsp;</span>
      <br style={{ userSelect: 'none' }} />
      up-to-date
    </>
  ),
  description:
    'The gist of keeping dependencies up-to-date. When to update, how to update, and what to update first.',
  image: openGraphImage,
  publishedAt: '2024-04-28',
  tags: [GistTag.Dependencies, GistTag.Security],
  relatedGist: import(
    './the-security-implications-of-packages-in-frontend-apps'
  ),
}

const SecurityImplicationsOfPackagesOnTheFrontendGist = () => (
  <Gist gist={meta}>
    <p>
      When you're using many dependencies, keeping them up-to-date can be a real
      challenge. Installing dependency updates can take a lot of time, time that
      isn't spent furthering business goals. Because of this, projects often
      fall behind on dependency updates.
    </p>
    <p>
      Never updating dependencies is not an option.{' '}
      <strong>
        Sooner or later you <em>have</em> to update.
      </strong>{' '}
      It may be due to a security update, bug fix or new feature you need,
      performance improvements, or because you want to update another
      dependency, and there is an interconnection and the only way to update one
      is to update them all.
    </p>
    <p>
      Putting off on updates for too long only makes it harder and harder to
      update, until eventually you'll be behind so much, actually doing it would
      take so much effort, that it becomes inconceivable.
    </p>
    <p>
      Many legacy projects have been replaced by rewrites in big part because of
      this.
    </p>
    <p>So then what's the compromise?</p>
    <h2 id="automatic-updates">Automatic updates</h2>
    <p>
      There are solutions like{' '}
      <a href="https://docs.github.com/en/code-security/dependabot/dependabot-version-updates/about-dependabot-version-updates">
        Dependabot
      </a>{' '}
      that automatically create a PR every time there is a new version of a
      dependency.
    </p>

    <Figure
      caption="Dependabot's profile on GitHub"
      href="https://github.com/dependabot"
    >
      <Image
        src={dependabotImage}
        alt="The GitHub profile card of the Dependabot account; Automated dependency updates built into GitHub."
        width={500}
        sizes="(min-width: 768px) 500px, 100vw"
      />
    </Figure>

    <p>
      But unless you have a perfect E2E test suite and you dare merge these
      updates without extensively testing everything they touch, this doesn't
      really solve anything. The time-consuming part of dependency updates isn't
      bumping the number in the package.json. Verifying the update doesn't break
      anything, still takes a lot of time and effort.
    </p>

    <p>
      And since Dependabot will nag about <i>every, single, update</i> that is
      published, you may actually spend more time updating than if you did it
      manually.
    </p>

    <p>
      There's also the question of whether you <i>should</i> update to the
      latest version of packages as soon as possible. If a package has only just
      been released, it may have brand new bugs, performance issues, or worse,{' '}
      <Link href="./the-security-implications-of-packages-in-frontend-apps">
        deliberately introduced malicious code
      </Link>
      . It's safer to let new versions mature a bit before installing them.
    </p>

    <Aside variant="sm">
      The versioning scheme <a href="https://semver.org/">semver</a> is often
      used to indicate the impact of an update. Just know that it's completely
      optional for a library to use the versioning scheme. You can't blindly
      trust version numbers.
    </Aside>

    <h2 id="manually-updating">Manually updating</h2>

    <p>
      A better way to keep dependencies up-to-date is to{' '}
      <strong>schedule some time periodically to do dependency updates</strong>.
      An hour a week is usually enough to catch up on dependency updates and
      then keep them up-to-date.
    </p>

    <Figure
      caption="Put it in your calendar"
      href={dependencyUpdatesIcal}
      download="Dependency updates appointment.ics"
    >
      <Image
        src={dependencyUpdatesScheduledImage}
        alt='Shows the calendar view of the 26th of April 2024, a Friday. At 9:45 "Standup" is scheduled, followed immediately by "Dependency updates" at 10:00.'
        width={500}
        sizes="(min-width: 768px) 500px, 100vw"
      />
    </Figure>

    <p>
      An important benefit of this process is that it minimizes the amount of
      disruption. The limited time only allows you to update a few dependencies
      each week, making it much easier to identify dependencies causing new
      problems.
    </p>

    <p>
      Manually updating also gives you much more control over <i>when</i> you
      update a dependency. This allows you to let new versions mature a bit
      before you adopt them. As mentioned before, this reduces the chance you
      introduce new issues or{' '}
      <Link href="./the-security-implications-of-packages-in-frontend-apps">
        security vulnerabilities
      </Link>
      .
    </p>

    <Aside label="Tip">
      Before updating a dependency, make sure the dependency is still in use.
      The best kind of dependency update is one where you can remove the
      dependency entirely.
    </Aside>

    <h2 id="prioritizing">Prioritizing</h2>
    <p>
      When you limit the time spent on updating dependencies, and when there are
      many dependencies to update, it helps to be able to prioritize them.
    </p>

    <p>
      <strong>Dependencies listed in critical security advisories</strong> (that
      are actually applicable to your app),{' '}
      <strong>should be updated as soon as possible</strong>. Do not delay those
      until your periodic update moment, not only does this put you and your
      users at risk, but it may also be considered negligence if things go
      wrong. Use automatic vulnerability scanning tools to identify security
      advisories applicable to your project.
    </p>

    <p>
      Anything else (i.e. any non-critical dependency update) is basically a
      "nice to have". This means the order in which you update dependencies is
      not particularly important.
    </p>

    <p>
      I usually start by processing the list of non-critical security
      advisories. Even though the vulnerabilities are non-critical, I think it's
      a good practice to try to keep the list empty. A nice bonus is that this
      list is usually much shorter than the list of outdated dependencies, which
      gives me an intermediate point to achieve.
    </p>

    <h3 id="libyear">Libyear</h3>

    <p>
      Once you have run out of other reasons to prioritize dependencies, I
      recommend using the <a href="https://libyear.com/">libyear</a> tool.
      Libyear is a simple measure of dependency freshness. It calculates how old
      each outdated package is compared to the release date of the most recent
      version. This gives you a nice list to work with, allowing you to
      prioritize the most outdated dependencies.
    </p>

    <p>
      Another nice thing about libyear is that it makes dependency
      up-to-dateness quantifiable. By summing up the libyears for all
      dependencies, we get a number representing the project's up-to-dateness.
      The libyear website has a nice cartoon to illustrate this:
    </p>

    <Figure
      caption={
        <>
          Source: <Link href="https://libyear.com/">libyear.com</Link>
        </>
      }
      captionLink={false}
      href="https://libyear.com/"
    >
      <Image
        src={libyearsCartoonImage}
        alt="Terminal output showing install scripts found in a front-end project. There are some strange entries (ljharb-monorepo-symlink-test), and esbuild is shown."
        width={650}
        height={412}
        sizes="(min-width: 768px) 650px, 100vw"
      />
    </Figure>

    <p>
      While it's a very simplified view, this also makes it very easy to work
      with. I think setting a max libyear-age can serve as a good directive.
      Keeping every dependency under 2 libyears-old (in addition to prioritizing
      vulnerabilities), would be a good place to start for projects in active
      development. An entire year to install a new version should be plenty of
      time without wasting time on updating too often.
    </p>

    <p>
      Interested in running libyear on a npm/yarn project? Run it (safely in a
      Docker container) with:
    </p>

    <CodeSnippet variant="sm">
      docker run -v "$PWD":/usr/src/app -w /usr/src/app node:20 npx libyear
    </CodeSnippet>

    <Aside>
      The output of the npm/yarn version of libyear looks a lot more complicated
      than it is. Just focus on "drift"; the amount of years (i.e. libyears)
      between when the current version you use was released, and when the latest
      version was published.{' '}
      <a href="https://github.com/jdanil/libyear?tab=readme-ov-file#metrics">
        The other metrics
      </a>{' '}
      are much less significant.
    </Aside>

    <h2 id="conclusion">Conclusion</h2>

    <p>
      While it can take up some of your available time, keeping dependencies
      up-to-date is crucial for the security and longevity of software projects.
    </p>

    <p>
      Start the dependency updating process right now;{' '}
      <Link
        href={dependencyUpdatesIcal}
        download="Dependency updates appointment.ics"
      >
        create a dependency updates event in your calendar
      </Link>
      . In the first iteration, set up the tools you need to keep your
      dependencies up-to-date (especially dependency vulnerability scanning) and
      start by updating the most important dependency.
    </p>

    <p>
      Once caught up, dependency management won't take nearly as much work. It's
      a relief how easy it is to update packages when it's only a small jump
      from the previous version and you don't also have to update numerous
      interdependencies.
    </p>

    <p>Just keep at it.</p>
  </Gist>
)

export default SecurityImplicationsOfPackagesOnTheFrontendGist
