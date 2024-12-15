import BlogArticle from '../../components/BlogArticle'
import BlogArticleMeta, {
  BlogArticleTag,
} from '../../components/BlogArticleMeta'
import Link from '../../components/Link'

export const meta: BlogArticleMeta = {
  slug: 'intro',
  title: 'Blog intro',
  description:
    'The gist of this, why this format, what motivates me, and what to expect.',
  publishedAt: '2024-04-01',
  updatedAt: '2024-05-04',
  tags: [BlogArticleTag.Meta],
}

const Intro = () => (
  <BlogArticle article={meta}>
    <p>
      On April 1st of all days, I hereby launch my new blog section. This will
      be brief articles, snippets, opinions and answers to questions. Mostly
      about React and closely related things, occasionally some other
      technologies like Node.js. Maybe at some point I'll throw in some blog
      about my hobbies as well.
    </p>

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
      <li>To get feedback on my ideas and believes</li>
    </ul>
    <p>
      I'm not sure if it was smart to list the backlinks reason as the first
      item, but I want to be honest and transparent with you. I'm a freelancer.
      I find fun jobs more easily if my site ranks higher on Google. This is how
      I justify spending time on this. The other reasons would not be enough.
    </p>
    <p>I'm not looking for internet fame or points.</p>
    <h2>Some other subjects</h2>
    <p>Some other subjects I want to get an article about;</p>
    <ul>
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
    <p>
      If you read all this, I thank you for your time. I didn't expect anyone to
      be this interested in this particular gist, I just wanted there to be some
      kind of kick-off.
    </p>
    <p>
      <Link href="./">Let's go.</Link>
    </p>
  </BlogArticle>
)

export default Intro
