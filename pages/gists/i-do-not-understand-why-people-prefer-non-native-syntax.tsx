import Annotation from '../../components/Annotation'
import Aside from '../../components/Aside'
import Code from '../../components/Code'
import CodeSnippet from '../../components/CodeSnippet'
import Gist from '../../components/Gist'
import GistMeta, { GistTag } from '../../components/GistMeta'

export const meta: GistMeta = {
  slug: 'i-dont-understand-why-people-prefer-non-native-syntax',
  title: "I don't understand why anyone would prefer non-native syntax in JS",
  // I don't understand preferring non-native syntax in JS
  description:
    'I just don’t understand how anyone could prefer non-native syntax in React over native JavaScript.',
  tags: [GistTag.Javascript, GistTag.React],
}

const GistIDoNotUnderstandWhyPeoplePreferNonNativeSyntax = () => (
  <Gist gist={meta}>
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
      But for some reason many of the competing frameworks are opting to use a
      custom templating language that compiles back to JS. Let's look at the
      first example from the Vue docs (
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

    <p>🤯</p>

    <p>
      This isn't even a <Code>.js</Code> file, it's a <Code>.vue</Code> file. To
      work with it in an IDE, you'll need to install an extension.
    </p>

    <p>
      But to understand it, you need to learn a completely new syntax. This
      example seems easy enough to understand, but writing it is going to be a
      completely different story. The only way you can learn to even just make
      something like a basic loop (and there are a bunch of different ways to
      loop) is to consult the docs. It's a completely custom syntax so you need
      to learn this custom syntax from the ground up, and that knowledge isn't
      applicable to anything else.
    </p>

    <p>
      In contrast,{' '}
      <strong>
        JavaScript is applicable to every web app/site and even Node.js
      </strong>
      . Even the libraries you use are all in native JavaScript (with TypeScript
      types available). That language is going somewhere.
    </p>

    <p>
      For this snippet to work: <Code>{`<button @click="count++">`}</Code>, you
      need to rely on framework-magic. I get that <Code>@click</Code> binds
      something to the click event, but how the hell would{' '}
      <Code>"count++"</Code> ever be executed if not for framework-magic? Not to
      mention that putting code inside a string is just a terrible idea. Now you
      need IDE extensions to do anything with it, as native JavaScript analysis
      and refactoring tools won't be able to recognize it.
    </p>

    <p>
      Oh, and that loop thing?{' '}
      <a href="https://vuejs.org/guide/essentials/list">More strings</a>;{' '}
      <Code>{`<li v-for="item in items">`}</Code>
    </p>

    <Aside variant="sm">
      In React, event handlers are just functions. Just like they would be if
      you added a native JS event handler.{' '}
      <Code>{`<button onClick={() => setCount(count + 1)}>`}</Code>.
    </Aside>

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
      into all the classes and services that you need— even for basic things
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
  </Gist>
)

export default GistIDoNotUnderstandWhyPeoplePreferNonNativeSyntax
