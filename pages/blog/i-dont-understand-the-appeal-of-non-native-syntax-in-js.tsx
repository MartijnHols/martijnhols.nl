import Annotation from '../../components/Annotation'
import BlogArticle from '../../components/BlogArticle'
import { BlogArticleTag } from '../../components/BlogArticleMeta'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import articleMeta, { ArticleStaticProps } from '../../utils/articleMeta'

const { meta, getStaticProps } = articleMeta({
  slug: 'i-dont-understand-the-appeal-of-non-native-syntax-in-js',
  title: "I don't understand the appeal of non-native syntax in JS",
  description:
    "I don't understand why many JavaScript frameworks prefer string-based templating over native JavaScript.",
  tags: [
    BlogArticleTag.Javascript,
    BlogArticleTag.React,
    BlogArticleTag.Maintainability,
  ],
})
export { meta, getStaticProps }

const GistIDoNotUnderstandWhyPeoplePreferNonNativeSyntax = (
  props: ArticleStaticProps,
) => (
  <BlogArticle {...props}>
    <p>
      In JSX code of a React app, most things can be done with just JavaScript;
    </p>

    <CodeSnippet>
      {`// A component is just an arrow function short-hand
// Inside is just an array.map expression
// The item.value is just a JavaScript expression
// Even the JSX is just a JavaScript expression!
const List = ({ items }) => (
  <div>
    {arr.map(item => <div>{item.name}</div>)}
  </div>
)`}
    </CodeSnippet>

    <p>
      But for some reason many of the "competing" frameworks are opting to use a
      custom string templating language that compiles back to JS. An example of
      that is Vue.js. Let's look at the{' '}
      <Annotation
        annotation={`There are better examples, but I wanted to be fair by not cherry-picking. The docs recommend these "Single-File Components", as they're called, for real-world applications.`}
      >
        first example
      </Annotation>{' '}
      from the Vue docs (
      <a href="https://vuejs.org/guide/introduction.html">source</a>
      );
    </p>

    <CodeSnippet>{`
<script setup>
import { ref } from 'vue'
const count = ref(0)
</script>

<template>
  <button @click="count++">Count is: {{ count }}</button>
</template>

<style scoped>
button {
  font-weight: bold;
}
</style>
`}</CodeSnippet>

    <p>
      Unlike our React example, the majority of this snippet is a custom
      templating language. This is reflected by its file extension; it isn't a{' '}
      <Code>.js</Code> file, it's a <Code>.vue</Code> file. In order to make
      your IDE understand it, you will need to install{' '}
      <a href="https://marketplace.visualstudio.com/items?itemName=Vue.volar">
        an extension
      </a>
      .
    </p>

    <p></p>

    <p>
      But{' '}
      <strong>
        to work with it, you will need to learn a completely new syntax
      </strong>
      . The example above seems easy enough to understand, but expanding it is
      going to be a completely different story. To figure out how to even just
      make something like a basic loop (and there are a bunch of different kinds
      of loops), you will need to consult the docs for that specific keyword.
      It's an entirely custom syntax, so you need to learn this custom syntax
      from the ground up, and that knowledge isn't applicable to anything else.
    </p>

    <p>
      In contrast,{' '}
      <strong>JavaScript is applicable to every web app/site</strong>.
      Everything in the browser compiles down to JavaScript. You can build
      servers and scripts with Node.js. The libraries you use are all in native
      JavaScript (with TypeScript types available). Even Vue uses JavaScript for
      every bit of code apart from the templating. So why not use native
      JavaScript for the templating as well?
    </p>

    <p>
      Using strings to refer to variables and functions comes with many
      challenges. Not only do you need to learn a new syntax with custom
      keywords, but you also lose the ability to use native JavaScript analysis
      and refactoring tools on it.
    </p>

    <p>
      This example snippet above is still very basic. It was the first thing in
      their docs, and I didn't want to go around cherry-picking. It gets messier
      when components need to do more. Loops, for example, are more strings;{' '}
      <Code>{`<li v-for="item in items">`}</Code>. And when you need a value to
      be more than just a value, you can place an expression inside your string
      ! <Code>{`<div :id="\`list-\${id}\`"></div>`}</Code> When you need to
      conditionally render something, a plain old expression or ternary would be
      crazy, so Vue instead opted for{' '}
      <Code>{`<p v-if="seen">Now you see me</p>`}</Code>.
    </p>

    <p>
      I just don't understand how anyone could prefer this non-native templating
      mess over React's native JS. What is so wrong with native JS, that these
      frameworks felt the need to reinvent the wheel? This obviously just leads
      to many problems that they had to solve with even more custom syntax.
      Sure, there are IDE extensions to make it easier to work with, but that
      just seems like a workaround for bad design decisions. Meanwhile I don't
      need a single IDE extension for normal React code, and the files I work
      with are all regular old JavaScript files. Just like the rest of my
      codebase.
    </p>

    <p>
      Angular has all the same issues and more. The insanity starts with a
      syntax like <Code>{`<button [disabled]="hasPendingChanges">`}</Code>{' '}
      ("hasPendingChanges" is meant to be a variable) and{' '}
      <Code>{`<section class="admin-controls" *ngIf="hasAdminPrivileges">The content you are looking for is here.</section>`}</Code>{' '}
      for conditional rendering. But it goes completely bonkers when you dive
      into all the classes and services that you need, even for basic things
      like adding up values. I really don't think OOP is a good fit for
      JavaScript. I wonder if the reason they don't show a basic complete
      component in their{' '}
      <a href="https://angular.io/guide/what-is-angular">docs</a>, is because it
      would get so long and weird that anyone still sane would be scared away.
    </p>

    <p>
      Thankfully, React is{' '}
      <a href="https://npmtrends.com/@angular/core-vs-angular-vs-react-vs-vue">
        by far the most popular
      </a>{' '}
      front-end{' '}
      <Annotation annotation="I know React is a library and not a framework, but once you combine it with React-libraries for global state management, networking and forms, you're effectively working with a framework.">
        framework
      </Annotation>
      . Because of that, if I had to choose a framework to learn today, I
      wouldn't even consider the alternatives. Nearly always the biggest library
      (that is still growing in popularity) is the best choice, and in this case
      I concur.
    </p>
    <p>After all, I chose to focus entirely on React for a reason.</p>
  </BlogArticle>
)

export default GistIDoNotUnderstandWhyPeoplePreferNonNativeSyntax
