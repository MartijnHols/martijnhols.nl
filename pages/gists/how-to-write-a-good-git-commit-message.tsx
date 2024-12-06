import Image from 'next/image'
import Abbreviation from '../../components/Abbreviation'
import Aside from '../../components/Aside'
import CodeSnippet from '../../components/CodeSnippet'
import Figure from '../../components/Figure'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'
import Link from '../../components/Link'
import gitForkImage from './assets/git-commit-git-fork.png'
import githubLongTitleImage from './assets/git-commit-github-long-title.png'

export const meta: GistMeta = {
  slug: 'how-to-write-a-good-git-commit-message',
  title: 'How to write a good git commit message',
  description:
    'Without any structure, your Git history can become a mess. This is the gist of writing good commit messages.',
  publishedAt: '2024-08-29',
  updatedAt: '2024-08-29',
  tags: [GistTag.HowTo, GistTag.Git, GistTag.Maintainability],
}

const GistHowToWriteAGoodGitCommitMessage = () => (
  <Gist gist={meta}>
    <p>
      There’s a lot of freedom to writing commit messages in Git, but without
      any structure your Git history will become an unusable mess. This can make
      it harder to make sense of your changes during active development (to
      rebase, cherry pick or revert as necessary). It can also affect the
      maintainability of older code, as the lack of context will make it harder
      to understand why code was added in the first place.
    </p>
    <p>
      To write good commit messages, I recommend the following set of
      guidelines:
    </p>
    <h2 id="1-seperate-commit-title-and-body">
      1. Separate commit title and body
    </h2>
    <p>
      A Git commit message is usually made of two parts, a title (also called a
      “subject”) and a body (also called a “description”). The title is used
      throughout Git as a short way to represent your commit. The body is
      optional, but can be much longer. The body is usually only visible when
      you look into the details of a single commit.
    </p>
    <p>
      On the Git CLI, the title is the first line of a commit, and if there are
      no other lines, the entire commit message. The body starts after the first
      newline and is the remainder of the commit message. In a Git UI, these
      fields are usually separate and you won’t have to manually add a newline.
    </p>
    <Figure
      caption="Git interfaces usually show separate fields for the title and body (Git Fork pictured)"
      href={gitForkImage.src}
    >
      <Image
        src={gitForkImage}
        alt={`A Git UI (Git Fork) showing "Fix typo in commit message gist" in the title field, and an empty body field`}
        width={700}
        sizes="(min-width: 768px) 700px, 100vw"
      />
    </Figure>
    <p>
      <strong>
        The title must very briefly describe what the commit changes.
      </strong>{' '}
      Be specific, but not too specific. There are often two parts to this; the
      component and the specific part within that. “Fix Button” and “Fix hover
      state” would never be enough, but “Fix hover state of Button” could
      sufficiently summarize your change.
    </p>
    <Aside>
      “Fix PR feedback” or any variations are never a good Git commit message.
      It doesn’t describe what changes, and it isn’t even a good motivation to
      make a change.
    </Aside>
    <p>
      Sometimes the title is enough to describe a commit and the body can be
      omitted. This can be for commits that are so simple, that no additional
      information is necessary. For example a commit like “Fix typo in commit
      message gist” will suffice. The details of the change could be easily
      looked up in the changed files.
    </p>
    <h2 id="2-write-the-title-as-an-imperative-statement">
      2. Write the title as an imperative statement
    </h2>
    <p>
      Always start the title with an imperative verb, turning it into an{' '}
      <a href="https://www.grammarly.com/blog/imperative-sentences/">
        imperative statement
      </a>
      . You commit does something to your codebase; it’s a patch on everything
      that was before. Your commit message represents that patch.
    </p>
    <p>
      A trick to write a good title is to think of a sentence that could be used
      to complete “<strong>Apply this patch to...</strong>”. Some examples of
      sentences that work: “Add login form”, “Replace react-lib1 with
      react-lib2”, “Fix issue where no one could upvote my posts”.
    </p>
    <p>
      What imperative verb you use isn’t very important. Most of my commits
      start with “Fix”, “Add”, “Update” or “Refactor”. I also sometimes use
      “Improve”, “Replace”, “Make x do y”, “Clean up”, “Rename” etc., but that
      does make me feel a little bit dirty.
    </p>
    <h2 id="3-keep-the-title-concise">3. Keep the title concise</h2>
    <p>
      An old convention is to keep the title shorter than 50 characters, but
      while most of my commit messages fall under this amount, I find this is
      often not enough. Tools such as GitHub sometimes [cut off](They move them
      into the commit body) commit messages longer than 72 characters, so that
      is a more reasonable limit. Still, if you really need more characters,
      there’s no good reason not to use them.
    </p>
    <Figure
      caption="A very long commit message gets cut off in the GitHub commit view"
      href="https://github.com/MartijnHols/martijnhols.nl/commit/807290a7b31d10424d05948f25ab650b26f93b7b"
    >
      <Image
        src={githubLongTitleImage}
        alt={`Showing a GitHub commit: "Update package security gist: add links to articles about deliberal..." "...y introduced malicious code in npm packages" in the main branch by MartijnHols committed 3 weeks ago`}
        width={700}
        sizes="(min-width: 768px) 700px, 100vw"
      />
    </Figure>
    <p>
      The commit message should state as briefly as possible what was changed.
      But it’s important not to skip over any details. If possible and within
      reason, be specific. A commit message that is just “Update Tooltip” or
      “Fix logout issue” only points us in a direction and misses any useful
      information about <i>what</i> you did. Much better would be “Fix Tooltip
      background is indistinguishable from code blocks” (c4794e3) and “Fix users
      get logged out after 5 minutes”. It is much more useful to be able to at a
      glance see what you did.
    </p>
    <h2 id="4-provide-context-in-the-body">4. Provide context in the body</h2>
    <p>
      Provide additional context and reasoning for your change in the commit
      body. This can help others understand the context and purpose behind the
      change.
    </p>
    <p>
      When you’ve finished work on something, you’ve become the expert of that
      piece of your app. You might have spent hours figuring out how everything
      fits together and how to make the required change without the entire house
      of cards falling down. That context is hard to come by, so share it in the
      commit body. This is useful for your reviewer to understand your change,
      the next person who gets a bug report in that piece of code, and future
      you when you’re refactoring it.
    </p>
    <p>
      Focus on <strong>why you made the change</strong>. The commit title and
      changed files represent what you changed. The commit body is for
      describing the why. Some questions you can ask yourself:
    </p>
    <ul>
      <li>Why was this necessary?</li>
      <li>Why did I choose this specific solution?</li>
      <li>Why did I not do more? Or less?</li>
    </ul>
    <p>
      <strong>In most commits, you can omit the commit body</strong> as the
      title sufficiently describes the commit. Still, it’s better to write a
      body too often than hardly ever.
    </p>
    <Aside>
      Any context that you would write in your PR should be part of your commit
      messages in Git. If you forgot to add sufficient context in your initial
      commit, you can always amend or rebase it in later. The only thing you
      unfortunately can’t put in a commit are screenshots (unless you upload
      them first).
    </Aside>
    <h2 id="5-reference-everything">5. Reference everything</h2>
    <p>
      Include issue numbers or link to anything related at the bottom of the
      commit message body. The most important reference is one with a{' '}
      <Link href="https://docs.github.com/en/get-started/writing-on-github/working-with-advanced-formatting/using-keywords-in-issues-and-pull-requests">
        “fixes” keyword
      </Link>
      . This is usually a ticket ID (such as from JIRA), but it can be anything
      such as a link to a Sentry error or even a link to a Slack discussion if
      it holds relevant information.
    </p>
    <p>
      If the referenced item does a good job of describing the requirements that
      necessitated your changes, that’s a great way to avoid needing to write
      that again.
    </p>

    <h2 id="6-be-consistent">6. Be consistent</h2>
    <p>
      Maintain a consistent style and format across all commit messages in your
      project. This makes it easier to read and understand the history. Aspects
      of this are the language you use, capitalization, punctuation, and the
      naming of your components. These things should be consistent with your
      codebase at the time of the commit.
    </p>

    <h2 id="7-make-it-as-simple-as-possible">
      7. Make it as simple as possible
    </h2>
    <p>
      As always{' '}
      <Abbreviation annotation="Keep it simple, stupid!">KISS</Abbreviation>.
      This also applies to your got commit message. Keep the Git commit message
      simple, so anyone can understand it at a glance.
    </p>
    <p>
      During development, you went through a process of decivering the
      requirements, business logic and existing code and then added something
      new on top of that. The majority of the time spent goes into this process
      of analysis and planning, while the time spent actually typing code is
      minimal. Write your git commit message for someone who hasn’t gone through
      these processes yet, so they can understand your change without needing to
      go through the entire process.
    </p>
    <hr />
    <p>
      That’s the gist of writing a good Git commit message. When it all comes
      together, you get something like:
    </p>
    <CodeSnippet language="markdown">
      {`Replace all font-sizes with browser defaults

This makes all text base font-size scale based on the font-size visitors
configured in their browser. Standard in Chrome is 16pixels.

Based on https://adrianroselli.com/2024/03/the-ultimate-ideal-bestest-base-font-size-that-everyone-is-keeping-a-secret-especially-chet.html
I am a big fan of using browser defaults (using the platform), and it hadn’t occurred to me 
before that font-size also applied to that.

Fixes #46`}
    </CodeSnippet>
    <p>
      <strong>
        If you follow these guidelines, your colleagues, future you, and your
        replacements will be thankful.
      </strong>
    </p>

    <h2 id="tips">Tips</h2>
    <h3 id="what-if-there-are-multiple-changes-in-a-commit">
      What if there are multiple changes in a commit?
    </h3>
    <p>
      Split up your changes into multiple commits. That not only makes your
      commit messages specific, it also isolates each change. This makes your
      changes easier to follow, review, git rebase, git revert, git cherry-pick
      and more. It also makes it easier for you to write good Git commit
      messages.
    </p>

    <h3 id="conventional-commits">Conventional commits</h3>
    <p>
      <a href="https://www.conventionalcommits.org/">Conventional commits</a> is
      a convention for writing structured commit messages. While its primary
      goal is to make it easier to write automated tools on top of your Git
      history, it can also serve as a way to get developers to write better
      commit messages.
    </p>
    <p>
      When not writing for automated tools, it can be hard to figure out when to
      use “feat” in place of something else. The way I like to resolve this, is
      to think of whether my change should bump the minor or patch version of my
      project. Usually only the first commit that introduces a new feature is a
      “feat” and anything else is a tweak that can be done with “fix” or
      similar.
    </p>
    <h3 id="requirements">Requirements</h3>
    <p>
      <strong>
        I like to think of most commits as <em>requirements</em> for my code.
      </strong>{' '}
      Each commit is done for a reason, and when they are properly split up,
      this often represents a requirement.
    </p>
    <p>
      A pattern I noticed when I work on a new feature is that I often commit
      the main chunk in one go in an “Add x” commit. When finishing up, I add
      smaller commits for things I either forgot, or feedback I get (which are
      typically also for things I forgot). For instance, someone might point out
      an edge case that I missed. When I add support for this edge case, I will
      make sure to create a separate commit for it. Then when someone inspects
      my code 6 months later, Git Blame will clearly reveal the edge case and
      they can use the commit as if it’s a requirement.
    </p>

    <h3 id="dont-put-the-issue-id-in-the-commit-title">
      Don’t put the issue ID in the commit title
    </h3>
    <p>
      Don’t put the issue ID in the commit title. It is useless to anyone
      glancing the history or blame. No one has issue IDs memorized. It
      distracts and takes precious characters away from the most important
      information of a commit. Any decent Git tool will be able to search inside
      commit bodies when searching your history, so your commit messages are
      just as findable.
    </p>

    <h3 id="git-fork">Git Fork</h3>
    <p>
      (Not sponsored) As user interface for Git, I use{' '}
      <a href="https://git-fork.com/">Git Fork</a>. It’s fast, user friendly,
      works on Mac and Windows, does not require a subscription, and makes
      anything you want to do in a Git a breeze. The visual overview and
      feedback of the commit history also adds a lot, and interactive rebasing
      has never been easier. Most people I asked don’t know how to stage only a
      subset (a few lines) of a changed file on the CLI, yet with Git Fork this
      is trivial and gives clear visual feedback which makes splitting up
      commits much easier. I cannot recommend{' '}
      <a href="https://git-fork.com/">Git Fork</a> enough.
    </p>
  </Gist>
)

export default GistHowToWriteAGoodGitCommitMessage
