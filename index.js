import MarkdownItContainer from 'markdown-it-container'

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
  md.core.ruler.after('block', 'extracting_caption_from_figure', (state) => {
    let isInContainerFigure = false

    state.tokens.forEach((token, i) => {
      if (token.type === 'container_figure_open') {
        isInContainerFigure = true
      }
      if (isInContainerFigure && (token.type === 'inline' || token.type === 'html_block')) {
        const match = token.content.match(
          /^(<a [^>]+>\s*<img [^>]+>\s*<\/a>|<p><img [^>]+><\/p>|<img [^>]+>)([\s\S]*)$/
        )
        if (!match) return

        const imageTag = match[1]
        const caption = match[2].trim()
        token.content = `${imageTag}<figcaption>${caption}</figcaption>`

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
