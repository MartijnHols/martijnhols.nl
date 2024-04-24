import { GistMeta, GistTag } from '.'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist from '../../components/Gist'
import Link from '../../components/Link'

export const meta: GistMeta = {
  slug: 'how-to-handle-array-values-in-react-hook-form',
  title: 'How to handle array values in react-hook-form',
  description:
    'A simple way to handle fields with basic array values in react-hook-form.',
  // publishedAt: '2024-04-22',
  tags: [GistTag.HowTo, GistTag.ReactHookForm, GistTag.React],
}

const GistHowToHandleArrayValuesInReactHookForm = () => (
  <Gist {...meta}>
    <p>
      <Link href="https://react-hook-form.com/">react-hook-form</Link> is by far
      the most popular form library in React. Having used most of the big ones,
      I reckon react-hook-form may be the best possible set of compromises
      needed to implement forms in React.
    </p>
    <p>
      Using react-hook-form, one of the things you'll run into sooner or later,
      is how to handle array values. Maybe it's a <Code>string[]</Code> for
      email addresses or a <Code>number[]</Code> for ids of some model. This is
      still a very simple to do, but if you're going to query Google with
      something like "react-hook-form array value", you will be pointed straight
      to <Code>useFieldArray</Code> which would put you completely on the wrong
      track.
    </p>
    <p>
      There's a much simpler solution, which is to use react-hook-form's{' '}
      <a href="https://react-hook-form.com/docs/usecontroller/controller">
        <Code>Controller</Code>
      </a>{' '}
      component. With the Controller component, simple array field values are a
      breeze. A nice added bonus is that you also end up with an input component
      that is pure React and not entangled with react-hook-form at all.
    </p>
    <h2>The example</h2>
    <p>
      Imagine you have a list of articles that you want the user to select from.
      For each article you want to show details like the publication date and
      applicable tags to better inform the user. You decide you want to present
      this in a table with a checkbox for each article (and a checkbox in the
      table header to select all articles). This sounds like handling it in a
      form may get complicated, but with react-hook-form it's actually quite
      simple.
    </p>
    <p>Let's start by fabricating some data;</p>
    <CodeSnippet>{`
const articles = [
  {
    id: 1,
    title: 'Intro',
    publishedAt: '2024-04-01',
    tags: ['meta'],
  },
  {
    id: 2,
    title: 'License',
    publishedAt: '2024-04-01',
    tags: ['meta'],
  },
  {
    id: 3,
    title: 'The security implications of packages in front-end apps',
    publishedAt: '2024-04-15',
    tags: ['security', 'packages', 'npm', 'frontend'],
  },
]
`}</CodeSnippet>
    <p>
      Now we can create a custom input component that allows a user to select
      articles. Since we don't need any special form logic, this can be a
      regular old React component;
    </p>
    <CodeSnippet>{`
import articles from './articles'

interface Props {
  value: number[]
  name: string
  onChange: (value: number[]) => void
  onBlur?: () => void
  disabled?: boolean
}

// It looks like a lot, but that's mostly just table markup. The relevant logic
// is just the articles.map and input element.
const ArticleSelect = ({ value, name, onChange, onBlur, disabled }: Props) => (
  <table>
    <thead>
      <tr>
        <th>
          <input
            type="checkbox"
            checked={value.length === articles.length}
            onClick={() =>
              onChange(
                value.length === articles.length
                  // Uncheck all
                  ? []
                  // Check all
                  : articles.map((article) => article.id),
              )
            }
          />
        </th>
        <th>Title</th>
        <th>Published</th>
        <th>Tags</th>
      </tr>
    </thead>
    <tbody>
      {articles.map((article) => {
        const checked = value.includes(article.id)
        const toggle = () =>
          onChange(
            checked
              // Already in value: Remove from value
              ? value.filter((id) => id !== article.id)
              // Not yet in value: Add to value
              : [...value, article.id],
          )

        return (
          <tr
            key={article.id}
            // Allow clicking anywhere in the row to toggle the checkbox
            onClick={toggle}
          >
            <td>
              <input
                type="checkbox"
                name={\`\${name}-\${article.id}\`}
                checked={checked}
                onChange={(e) => {
                  e.stopPropagation()
                  toggle()
                }}
                onBlur={onBlur}
                disabled={disabled}
              />
            </td>
            <td>{article.title}</td>
            <td>{article.publishedAt}</td>
            <td>{article.tags.join(', ')}</td>
          </tr>
        )
      })}
    </tbody>
  </table>
)

export default ArticleSelect
`}</CodeSnippet>
    <p>
      With this <Code>ArticleSelect</Code> component ready to go, we can now use
      it in a react-hook-form form.
    </p>
    <p>
      Using the <Code>Controller</Code> component, we can use our custom input
      in our form. The <Code>Controller</Code> component will handle all the
      plumbing needed to keep the form state in sync with the input. Since our{' '}
      <Code>ArticleSelect</Code> input handles all the standard field props such
      as <Code>value</Code>, <Code>onChange</Code> and <Code>onBlur</Code>, we
      can simply pass the entire <Code>field</Code> prop to{' '}
      <Code>ArticleSelect</Code>.
    </p>
    <CodeSnippet>{`
<Controller
  control={control}
  name="articles"
  render={({ field }) => <ArticleSelect {...field} />}
/>
`}</CodeSnippet>
    <p>
      And that's it! Not only is the code in our form very simple, we also have
      a very clean and simple input component that can be reused anywhere in our
      application. The <Code>ArticleSelect</Code> component is completely
      decoupled from react-hook-form and could easily be used in any other form
      library or even without a form library at all.
    </p>
    <p>
      This is a great example of how react-hook-form allows us to write standard
      React components that are completely decoupled from the form library.
    </p>

    <h2>More complex types</h2>

    <p>
      You can even use this for more complicated types such as an object of
      objects indexed by id such as:
    </p>
    <CodeSnippet>{`type ArticlesById = {
  [articleId: number]: {
    publishedAt: Date
    updatedAt: Date
  }
}`}</CodeSnippet>
    <p>
      Simply map over the articles as in our previous example, use a{' '}
      <Code>Controller</Code> for each value, and set the{' '}
      <Code>Controller</Code>
      's names to <Code>{`\`articles.\${articleId}.publishedAt\``}</Code> and{' '}
      <Code>{`\`articles.\${articleId}.updatedAt\``}</Code> respectively.
    </p>
    <p>
      Anything to avoid needing to use <Code>useFieldArray</Code>.
    </p>
  </Gist>
)

export default GistHowToHandleArrayValuesInReactHookForm
