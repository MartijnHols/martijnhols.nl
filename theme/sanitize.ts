import { css } from '@emotion/react'

// Embed sanitize.css so we don't need to load the file separately.
const sanitizeCss = css`
  *,
  :after,
  :before {
    box-sizing: border-box;
    background-repeat: no-repeat;
  }
  :after,
  :before {
    text-decoration: inherit;
    vertical-align: inherit;
  }
  :where(:root) {
    cursor: default;
    line-height: 1.5;
    overflow-wrap: break-word;
    -moz-tab-size: 4;
    tab-size: 4;
    -webkit-tap-highlight-color: transparent;
    -webkit-text-size-adjust: 100%;
  }
  :where(body) {
    margin: 0;
  }
  :where(h1) {
    font-size: 2em;
    margin: 0.67em 0;
  }
  :where(dl, ol, ul) :where(dl, ol, ul) {
    margin: 0;
  }
  :where(hr) {
    color: inherit;
    height: 0;
  }
  :where(nav) :where(ol, ul) {
    list-style-type: none;
    padding: 0;
  }
  :where(nav li):before {
    content: '\200B';
    float: left;
  }
  :where(pre) {
    font-family: monospace, monospace;
    font-size: 1em;
    overflow: auto;
  }
  :where(abbr[title]) {
    text-decoration: underline;
    -webkit-text-decoration: underline dotted;
    text-decoration: underline dotted;
  }
  :where(b, strong) {
    font-weight: bolder;
  }
  :where(code, kbd, samp) {
    font-family: monospace, monospace;
    font-size: 1em;
  }
  :where(small) {
    font-size: 80%;
  }
  :where(audio, canvas, iframe, img, svg, video) {
    vertical-align: middle;
  }
  :where(iframe) {
    border-style: none;
  }
  :where(svg:not([fill])) {
    fill: currentColor;
  }
  :where(table) {
    border-collapse: collapse;
    border-color: inherit;
    text-indent: 0;
  }
  :where(button, input, select) {
    margin: 0;
  }
  :where(button, [type='button' i], [type='reset' i], [type='submit' i]) {
    -webkit-appearance: button;
  }
  :where(fieldset) {
    border: 1px solid #a0a0a0;
  }
  :where(progress) {
    vertical-align: baseline;
  }
  :where(textarea) {
    margin: 0;
    resize: vertical;
  }
  :where([type='search' i]) {
    -webkit-appearance: textfield;
    outline-offset: -2px;
  }
  ::-webkit-inner-spin-button,
  ::-webkit-outer-spin-button {
    height: auto;
  }
  ::-webkit-input-placeholder {
    color: inherit;
    opacity: 0.54;
  }
  ::-webkit-search-decoration {
    -webkit-appearance: none;
  }
  ::-webkit-file-upload-button {
    -webkit-appearance: button;
    font: inherit;
  }
  :where(dialog) {
    background-color: white;
    border: solid;
    color: black;
    height: -moz-fit-content;
    height: fit-content;
    left: 0;
    margin: auto;
    padding: 1em;
    position: absolute;
    right: 0;
    width: -moz-fit-content;
    width: fit-content;
  }
  :where(dialog:not([open])) {
    display: none;
  }
  :where(details > summary:first-of-type) {
    display: list-item;
  }
  :where([aria-busy='true' i]) {
    cursor: progress;
  }
  :where([aria-controls]) {
    cursor: pointer;
  }
  :where([aria-disabled='true' i], [disabled]) {
    cursor: not-allowed;
  }
  :where([aria-hidden='false' i][hidden]) {
    display: initial;
  }
  :where([aria-hidden='false' i][hidden]:not(:focus)) {
    clip: rect(0, 0, 0, 0);
    position: absolute;
  }
  :where(button, input, select, textarea) {
    background-color: transparent;
    border: 1px solid WindowFrame;
    color: inherit;
    font: inherit;
    letter-spacing: inherit;
    padding: 0.25em 0.375em;
  }
  :where(select) {
    -webkit-appearance: none;
    -moz-appearance: none;
    appearance: none;
    background: url("data:image/svg+xml;charset=utf-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='16' height='4'%3E%3Cpath d='M4 0h6L7 4'/%3E%3C/svg%3E")
      no-repeat 100% /1em;
    border-radius: 0;
    padding-right: 1em;
  }
  :where(select[multiple]) {
    background-image: none;
  }
  :where([type='color' i], [type='range' i]) {
    border-width: 0;
    padding: 0;
  }
  html {
    font-family:
      system-ui,
      -apple-system,
      Segoe UI,
      Roboto,
      Ubuntu,
      Cantarell,
      Noto Sans,
      sans-serif,
      Apple Color Emoji,
      Segoe UI Emoji,
      Segoe UI Symbol,
      Noto Color Emoji;
  }
  code,
  kbd,
  pre,
  samp {
    font-family:
      ui-monospace,
      Menlo,
      Consolas,
      Roboto Mono,
      'Ubuntu Monospace',
      Noto Mono,
      Oxygen Mono,
      Liberation Mono,
      monospace,
      Apple Color Emoji,
      Segoe UI Emoji,
      Segoe UI Symbol,
      Noto Color Emoji;
  }
`

export default sanitizeCss
