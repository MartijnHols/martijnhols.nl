import Gist, { GistMeta, GistTag } from '../../components/Gist'
import Link from '../../components/Link'

export const meta: GistMeta = {
  slug: 'intro',
  title: 'The gist of my gists',
  description:
    'The gist of this, why this format, what motivates me, and what to expect.',
  publishedAt: '2024-04-01',
  updatedAt: '2024-04-21',
  tags: [GistTag.Meta],
}

const Intro = () => (
  <Gist {...meta}>
    <p>
      On April 1st of all days, I hereby launch my new gists section. This will
      be brief articles, snippets, opinions and answers to questions. Mostly
      about React and closely related things, occasionally some other
      technologies like Node.js. Maybe I'll throw in some gaming gists as well
      at some point.
    </p>
    <h2>Why gists?</h2>
    <p>
      I have tried writing articles for a very long time, but the scope of them
      is preventing me from ever finishing them. Much like I do all the time in
      software development, I realized I had to break down the work into smaller
      deliverables. Gists are that. I've been writing gists forever, like when I
      respond to discussions on Reddit or issues on GitHub. Writing those never
      took me anywhere nearly as long as articles did.
    </p>
    <p>
      Most worthwhile topics already have lengthy articles dedicated to them. I
      don't think I can do better. Instead, I can try to give you the gist of
      it, maybe my notes on it, and link to these excellent articles.
    </p>
    <p>
      I also had the idea that these gists could end up becoming sort of like my
      knowledge base. A collection of common discussions, questions and answers.
      In a similar vein, I can hop on Stack Overflow, pick out questions to
      answer and use those questions as inspiration to dive further into topics
      (or tangents).
    </p>
    <p>
      The first gist I wrote is about{' '}
      <a href="./react-switch-statement-rendering">
        using switch statements when rendering in React
      </a>{' '}
      which came from the Stack Overflow question{' '}
      <a href="https://stackoverflow.com/a/78251113/684353">
        The components are getting unmounted and mounted again if we use switch
        case, Why?
      </a>{' '}
      (update: that gist is now unlisted since this deviates far from what I now
      envision for this section). I'm sure more people new to React wonder how
      they can conditionally render JSX. This approach will achieve at least two
      of my goals:
    </p>
    <p></p>
    <h2>Why write at all?</h2>
    <p>I have many reasons to want to write;</p>
    <ul>
      <li>
        To generate backlinks to my portfolio site and increase my Google
        ranking
      </li>
      <li>To have reference links to share in discussions with more info</li>
      <li>To get better at in-person discussions</li>
      <li>To think about subjects more deeply</li>
      <li>To collect great links to other sources</li>
      <li>To share my excitement about certain technologies</li>
      <li>
        To share my frustration about web patterns (and hopefully get you to
        avoid them)
      </li>
      <li>
        To become a better writer
        <button
          type="button"
          onClick={() =>
            alert(
              'Often times I will prefer briefness and delivering something today over the perfect flow or sentence structure. "Don\'t let perfect be the enemy of good (enough)".',
            )
          }
        >
          *
        </button>
      </li>
    </ul>
    <p>
      I'm not sure if it was smart to list the backlinks reason as the first
      item, but I want to be honest and transparent with you. I'm a freelancer.
      I find fun jobs more easily if my site ranks higher on Google. This is how
      I justify spending time on this. The other reasons would not be enough.
    </p>
    <p>I'm not looking for internet fame or points.</p>
    <h2>Some other subjects</h2>
    <p>Some other subjects I want to get the gist down about;</p>
    <ul>
      <li>The tech behind the gists site</li>
      <li>Global state management in React</li>
      <li>
        Why I believe Tailwind is not the right fit for most React projects
      </li>
      <li>Component props: primitives vs objects</li>
      <li>Why going to the office two days per week is important to me</li>
      <li>
        <Link href="https://gist.github.com/MartijnHols/709965559cbdb6b241c12e5866941e69">
          iOS edge drag navigation monitor (gestures)
        </Link>
      </li>
      <li>
        <Link href="https://gist.github.com/MartijnHols/e9f4f787efa9190885a708468f63c5bb">
          A hook that gets the viewport height, even when the iOS OSK is open
        </Link>
      </li>
      <li>
        <Link href="https://gist.github.com/MartijnHols/e9f4f787efa9190885a708468f63c5bb?permalink_comment_id=4755106#gistcomment-4755106">
          How to prevent overscrolling in iOS?
        </Link>
      </li>
      <li>Libraries vs custom code</li>
      <li>React folder structure</li>
    </ul>
    <p>Some of these are probably too big ideas to even get finished.</p>
    <h2>The initial setup</h2>
    <p>
      I quickly threw some code together to get started and test whether this
      was a good idea. The current setup on my site is basically the gist of
      what might come.
    </p>
    <p>
      If you read all this, I thank you for your time. I didn't expect anyone to
      be this interested in this particular gist, I just wanted there to be some
      kind of kick-off.
    </p>
    <p>
      <Link href="./">Let's go.</Link>
    </p>
  </Gist>
)

export default Intro
