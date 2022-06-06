import {html} from '../dependencies.js'

export default ({
  contentEncoding,
  contentMediaType,
  title,
  description,
  href,
  ...schema
}) => html(({a, span, img, video, audio, source}) => {
  const el = (attrs, children) => (typeof href == 'string' ? a : span)({
    ...attrs,
    href: href
  }, children == '' && typeof href == 'string' ? '_' : children)

  if (typeof schema.default == 'boolean') {
    return el({}, schema.default ? '\u2611' : '\u2612')
  } else if (typeof schema.default == 'number') {
    return el({}, schema.default.toLocaleString())
  } else if (typeof schema.default == 'string') {
    const media = (contentMediaType || '').split('/').shift()
    const data = contentMediaType && contentEncoding ?
      'data:'+contentMediaType+";"+contentEncoding+','+
      encodeURIComponent(schema.default) : schema.default 

    if (media == 'image') {
      const wrap = el => href ? a({
        href: href
      }, el) : el

      return wrap(img({
        class: 'w-100',
        src: data,
        alt: description,
        title: title
      }))
    } else if (media == 'video') {
      return video({
        class: 'w-100',
        controls: true,
        title: title
      }, [
        source({
          src: data,
          type: contentMediaType
        }),
        description
      ])
    } else if (media == 'audio') {
      return audio({
        class: 'w-100',
        controls: true,
        title: title
      }, [
        source({
          src: data,
          type: contentMediaType
        }),
        description
      ])
    } else {
      return el({
        style: {
          whiteSpace: schema.default.indexOf('\n') != -1 ? 'pre-wrap' : null
        }
      }, schema.default)
    }
  } else if (typeof schema.default == 'object') {
    return el({
      style: {
        whiteSpace: 'pre-wrap'
      }
    }, JSON.stringify(schema.default, undefined, 2))
  }
})
