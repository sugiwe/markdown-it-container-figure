# markdown-it-container-figure

A [markdown-it](https://github.com/markdown-it/markdown-it) plugin that enables the use of `<figure>` and `<figcaption>` blocks in Markdown.

This plugin provides an alternative approach to [`markdown-it-figure`](https://www.npmjs.com/package/markdown-it-figure), which uses a custom syntax like `#[Caption](image.jpg)`. Instead, it works with standard HTML or Markdown image tags inside a container block.

Supports the following formats inside `:::figure` blocks:

- `<a><img></a>` wrapped image (with link)
- `<p><img></p>` wrapped image
- `<img>` tag alone

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

### 1. Linked image

```markdown
:::figure
<a href="image.jpg"><img src="image.jpg"></a>
This is a caption for the image.
:::
```

Output:

```html
<figure>
  <a href="image.jpg"><img src="image.jpg" /></a>
  <figcaption>This is a caption for the image.</figcaption>
</figure>
```

### 2. Paragraph-wrapped image

```markdown
:::figure
<p><img src="image.jpg"></p>
This is a caption for the image.
:::
```

Output:

```html
<figure>
  <p><img src="image.jpg" /></p>
  <figcaption>This is a caption for the image.</figcaption>
</figure>
```

### 3. Standalone image

```markdown
:::figure
<img src="image.jpg">
This is a caption for the image.
:::
```

Output:

```html
<figure>
  <img src="image.jpg" />
  <figcaption>This is a caption for the image.</figcaption>
</figure>
```
