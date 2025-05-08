# markdown-it-container-figure

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin that enables the use of `<figure>` and `<figcaption>` blocks in Markdown.

This plugin provides an alternative approach to [`markdown-it-figure`](https://www.npmjs.com/package/markdown-it-figure), which uses a custom syntax like `#[Caption](image.jpg)`. Instead, it works with standard Markdown image syntax inside a container block.

## Installation

```bash
npm install markdown-it-container-figure
```

or

```bash
yarn add markdown-it-container-figure
```

## Usage

```js
import MarkdownIt from "markdown-it";
import markdownItContainerFigure from "markdown-it-container-figure";

const md = new MarkdownIt();
md.use(markdownItContainerFigure);
```

## Markdown Syntax

Use a fenced block with `:::figure` to define a `<figure>` block.

```markdown
:::figure
<a href="image.jpg"><img src="image.jpg"></a>
This is a caption for the image.
:::
```

This will output:

```html
<figure>
  <a href="image.jpg"><img src="image.jpg" /></a>
  <figcaption>This is a caption for the image.</figcaption>
</figure>
```
