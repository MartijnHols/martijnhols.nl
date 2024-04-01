/* eslint-disable react/jsx-curly-brace-presence */
import Link from 'next/link'

import { GistMeta } from '.'
import Gist from '../../components/Gist'

export const meta: GistMeta = {
  slug: 'license',
  title: 'License',
  description:
    'The license to content in my gists, on the rest of my website and the source code of it all.',
  publishedAt: '2024-04-01',
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
      <Link href="/">Martijn Hols, a Freelance Senior React Developer</Link>;
    </p>

    <p>You can:</p>

    <ul>
      <li>
        ✅ Look through the code, learn and copy parts of it so long as it
        doesn't lead to a similar copy of the site
      </li>
      <li>✅ Fork it to fix or improve parts</li>
      <li>
        ✅ Copy any textual content from blog articles, under the CC BY-SA 4.0
        license (same license as content on StackOverflow)
      </li>
    </ul>
    <p>You can't:</p>
    <ul>
      <li>❌ Fork or otherwise copy it for (personal) use</li>
      <li>
        ❌ Copy the layout / styling, including but not limited to the color
        scheme, typography, layout (including the angles), animations
      </li>
      <li>❌ Copy content outside of blog articles</li>
      <li>❌ Copy original images</li>
    </ul>
    <p>
      Exceptions or explicit approval may be given via email at{' '}
      <a href="mailto:website@martijnhols.nl">website@martijnhols.nl</a>.
    </p>
  </Gist>
)

export default LicenseGist
