import styled from '@emotion/styled'
import Image from 'next/image'
import Annotation from '../../components/Annotation'
import BlogArticle from '../../components/BlogArticle'
import { BlogArticleTag } from '../../components/BlogArticleMeta'
import Code from '../../components/Code'
import Figure from '../../components/Figure'
import Link from '../../components/Link'
import articleMeta, { ArticleStaticProps } from '../../utils/articleMeta'
import doNotUseLodashImage from './assets/do-not-use-lodash.png'
import lodashImage from './assets/lodash.png'
import openGraphImage from './assets/ogimage-you-dont-need-lodash.png'

const { meta, getStaticProps } = articleMeta({
  slug: 'you-dont-need-lodash',
  title: "You don't need Lodash",
  description:
    "And I reckon you shouldn't use it, or any libraries that you can solve natively just as well. Here's why.",
  openGraphImage: openGraphImage,
  image: doNotUseLodashImage,
  publishedAt: '2024-11-28',
  updatedAt: '2024-12-03',
  tags: [
    BlogArticleTag.Javascript,
    BlogArticleTag.Dependencies,
    BlogArticleTag.Maintainability,
  ],
  socials: ['https://twitter.com/MartijnHols/status/1862257672797495660'],
})
export { meta, getStaticProps }

const LodashFigure = styled(Figure)`
  text-align: center;
`

const GistYouDontNeedLodash = (props: ArticleStaticProps) => (
  <BlogArticle {...props}>
    <p>And I reckon you shouldn't use it.</p>
    <LodashFigure
      caption={
        <Link href="https://lodash.com/">Lodash as it describes itself</Link>
      }
    >
      <Image
        src={lodashImage}
        alt="Lodash - A modern JavaScript utility library delivering modularity, performances & extras."
        width={500}
        sizes="(min-width: 768px) 500px, 100vw"
      />
    </LodashFigure>
    <p>
      Everything you can do in Lodash, you can do just as well in ES6 either
      entirely (isArray, map) or with a basic repeatable pattern (groupBy,
      sortBy, distinct).
    </p>
    <p>
      You're better off learning and using the patterns of the language you're
      using, rather than learning the characteristics of a library and dealing
      with the bundle size, license,{' '}
      <Link href="/blog/the-security-risks-of-front-end-dependencies">
        security
      </Link>
      , and{' '}
      <Link href="/blog/keeping-dependencies-up-to-date">
        maintenance implications
      </Link>
      . On the other hand, the language syntax is{' '}
      <a href="https://timkadlec.com/remembers/2019-10-21-using-the-platform/">
        here to stay
      </a>
      , and language familiarity applies to every project that uses it
      (especially in a landscape like React).
    </p>
    <p>
      Not only does it make <i>you</i> a more versatile JS/TS developer, but{' '}
      <strong>
        using the language makes it easier for other developers with experience
        with the language to get up to speed
      </strong>
      . You're never going to find someone who is familiar with all of the
      libraries you use, but it's relatively easy to find someone with
      experience in the language.
    </p>
    <p>
      Not using Lodash also saves you <em>a lot</em> in bundle size. If you're{' '}
      <Annotation annotation="The projects that I worked on that were using Lodash all (usually accidentally) did this because there was at least one import of the main library somewhere.">
        importing the entire library
      </Annotation>
      , it's{' '}
      <Link href="https://bundlephobia.com/package/lodash@4.17.21">70KB</Link>.
      That's half of the entire React library. And even if you're going through
      the trouble of importing per function (how much time did you spend on
      doing this btw?), you're still getting a lot more than you bargained for (
      <Link href="https://thescottyjam.github.io/snap.js/#!/nolodash">
        [1 (see FAQ)]
      </Link>
      , <Link href="https://news.ycombinator.com/item?id=35056669">[2]</Link>).
      And importing per function is yet another thing you'll have to teach your
      developers and enforce in PRs, especially since hardly any other libraries
      require this nowadays.
    </p>
    <p>
      Some of the{' '}
      <a href="https://you-dont-need.github.io/You-Dont-Need-Lodash-Underscore/">
        patterns to replace Lodash
      </a>{' '}
      might initially seem more complex, but with daily use, you'll quickly
      start recognizing them at a glance. Think{' '}
      <Code>{'sumBy(items, item => item.value)'}</Code> vs{' '}
      <Code>{'items.reduce((total, item) => total + item, 0)'}</Code>. And by
      leveraging the language itself, you can easily chain{' '}
      <Code>filter(x)</Code>, <Code>map(y)</Code>, and <Code>sort(z)</Code> in a
      more readable and maintainable manner.
    </p>
    <p>
      This article isn't even just about Lodash. This applies to most libraries
      that have usable native alternatives. Another such example is Axios, and a
      less obvious example is{' '}
      <Link href="https://redux-observable.js.org/">redux-observables</Link>,{' '}
      which just happens to be abandoned as well (another risk).
    </p>
    <p>
      <strong>Reconsider every single package you use.</strong> Do you really
      need the overhead?
    </p>
    <p>
      That's the gist of my thoughts on using libraries like Lodash.{' '}
      <Link href="https://twitter.com/MartijnHols">
        Let me know what you think.
      </Link>
    </p>
  </BlogArticle>
)

export default GistYouDontNeedLodash
