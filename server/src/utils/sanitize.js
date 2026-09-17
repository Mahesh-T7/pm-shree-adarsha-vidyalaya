import sanitizeHtml from 'sanitize-html';

export function sanitizeRichText(dirtyHtml) {
  if (!dirtyHtml || typeof dirtyHtml !== 'string') return '';

  return sanitizeHtml(dirtyHtml, {
    allowedTags: [
      'h1', 'h2', 'h3', 'h4', 'h5', 'h6', 'p', 'br', 'hr',
      'ul', 'ol', 'li', 'b', 'i', 'strong', 'em', 'strike', 'code', 'pre',
      'blockquote', 'a', 'img', 'table', 'thead', 'tbody', 'tr', 'th', 'td',
      'span', 'div'
    ],
    allowedAttributes: {
      a: ['href', 'name', 'target', 'rel', 'class'],
      img: ['src', 'alt', 'title', 'width', 'height', 'loading', 'class'],
      '*': ['class', 'style']
    },
    allowedSchemes: ['http', 'https', 'mailto', 'tel'],
    transformTags: {
      a: (tagName, attribs) => {
        // Force safe outbound link attributes
        return {
          tagName: 'a',
          attribs: {
            ...attribs,
            rel: 'noopener noreferrer',
          },
        };
      },
    },
  });
}

export function sanitizeText(text) {
  if (!text || typeof text !== 'string') return '';
  return text.trim().replace(/[<>]/g, '');
}
