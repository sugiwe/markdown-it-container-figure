import MarkdownIt from 'markdown-it';
import markdownItContainerFigure from './index.js';

describe('markdown-it-container-figure', () => {
  const md = new MarkdownIt().use(markdownItContainerFigure);

  it('wraps linked image and caption in <figure> and <figcaption>', () => {
    const input = `
:::figure
<a href="https://example.com/image.jpg"><img src="https://example.com/image.jpg"></a>
Caption text
:::
`.trim();

    const raw = `<a href="https://example.com/image.jpg"><img src="https://example.com/image.jpg"></a><figcaption>Caption text</figcaption>`;
    const expectedOutput = `<figure>${escapeHTML(raw)}</figure>`;

    const actualOutput = md.render(input).trim();

    expect(actualOutput).toBe(expectedOutput);
  });

  it('wraps <p> enclosed <img> and caption in <figure> and <figcaption>', () => {
    const input = `
:::figure
<p><img src="image.jpg"></p>
Caption text
:::
`.trim();

    const raw = `<p><img src="image.jpg"></p><figcaption>Caption text</figcaption>`;
    const expectedOutput = `<figure>${escapeHTML(raw)}</figure>`;

    const actualOutput = md.render(input).trim();

    expect(actualOutput).toBe(expectedOutput);
  });

  it('wraps standalone <img> and caption in <figure> and <figcaption>', () => {
    const input = `
:::figure
<img src="image.jpg">
Caption text
:::
`.trim();

    const raw = `<img src="image.jpg"><figcaption>Caption text</figcaption>`;
    const expectedOutput = `<figure>${escapeHTML(raw)}</figure>`;

    const actualOutput = md.render(input).trim();

    expect(actualOutput).toBe(expectedOutput);
  });
});

function escapeHTML(string) {
  return string
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}
