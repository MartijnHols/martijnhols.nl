import Gist from '../../components/Gist'
import Link from '../../components/Link'
import { GistMeta } from './index'

export const meta: GistMeta = {
  slug: 'license',
  title: 'License',
  description:
    'The license to content in my gists, on the rest of my website and the source code of it all.',
  publishedAt: '2024-04-01',
  updatedAt: '2024-04-14',
  tags: ['meta'],
}

const LicenseGist = () => (
  <Gist {...meta}>
    <p>
      I don't think there's a standard license for this, so I'll write a custom
      one. I think this covers everything.
    </p>
    <p>
      The following license is for the entire website and source code of{' '}
      <Link href="/">Martijn Hols, a Freelance Senior React Developer</Link> on{' '}
      <Link href="https://github.com/MartijnHols/martijnhols.nl/">GitHub</Link>;
    </p>

    <p>You can:</p>

    <ul>
      <li>
        ✅ Look through the code, learn and copy parts of it so long as it
        doesn't lead to a similar copy of the site
      </li>
      <li>✅ Fork it to fix or improve parts of my website</li>
      <li>
        ✅ Copy any content from blog articles, under the{' '}
        <Link href="https://creativecommons.org/licenses/by-sa/4.0/">
          CC BY-SA 4.0
        </Link>{' '}
        license (same license as content on{' '}
        <Link href="https://stackoverflow.com/help/licensing">
          Stack Overflow
        </Link>
        )
      </li>
    </ul>
    <p>You can't:</p>
    <ul>
      <li>
        ❌ Fork or otherwise copy (large parts of) the website for (personal)
        use
      </li>
      <li>
        ❌ Copy the layout / design, including but not limited to the color
        scheme, typography, layout (including the angles), animations
      </li>
      <li>❌ Copy content outside of blog articles</li>
    </ul>
    <p>
      Exceptions or explicit approval may be given via email at{' '}
      <Link href="mailto:website@martijnhols.nl">website@martijnhols.nl</Link>.
    </p>
  </Gist>
)

export default LicenseGist
