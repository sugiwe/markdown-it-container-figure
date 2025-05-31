import MarkdownItContainer from 'markdown-it-container'

const FIGURE_CONTENTS_REGEX = /^(<a [^>]+>\s*<img [^>]+>\s*<\/a>|<p><img [^>]+><\/p>|<img [^>]+>)([\s\S]*)$/

export default (md) => {
  md.use(MarkdownItContainer, 'figure', {
    render: (tokens, idx) => {
      if (tokens[idx].nesting === 1) {
        return `<figure>`
      } else {
        return `</figure>`
      }
    }
  })

  buildFigureContent(md)
}

// Extracts the caption from the content of a figure block, wraps it in a <figcaption> tag, and structures the final figure content.
const buildFigureContent = (md) => {
  md.core.ruler.after('block', 'container-figure', (state) => {
    let isInContainerFigure = false

    state.tokens.forEach((token, i) => {
      if (token.type === 'container_figure_open') {
        isInContainerFigure = true
      }
      if (!isInContainerFigure) return

      if (token.type === 'inline' || token.type === 'html_block') {
        const match = FIGURE_CONTENTS_REGEX.exec(token.content)
        if (!match) return

        const imageContents = match[1]
        const imageCaption = match[2].trim()
        token.content = `${imageContents}<figcaption>${imageCaption}</figcaption>`

        // Prevents markdown-it from rendering <p> tags inside <figure> blocks.
        const pOpen = state.tokens[i - 1]
        const pClose = state.tokens[i + 1]
        pOpen.hidden = true
        pClose.hidden = true
      }
      if (token.type === 'container_figure_close') {
        isInContainerFigure = false
      }
    })

    return true
  })
}
