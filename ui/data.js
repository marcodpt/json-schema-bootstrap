import {html} from '../dependencies.js'

export default ({
  contentEncoding,
  contentMediaType,
  title,
  description,
  href,
  format,
  ...schema
}, _, {language}) => html(({a, span, img, video, audio, source}) => {
  const el = children => (typeof href == 'string' ? a : span)({
    href: href,
    style: {
      whiteSpace: typeof children == 'string' && children.indexOf('\n') != -1 ?
        'pre-wrap' : null
    }
  }, children == '' && typeof href == 'string' ? '_' : children)
  const dflt = schema.default

  console.log('HERE')
  console.log('dflt: '+dflt)
  console.log('format: '+format)
  console.log('language: '+language)

  if (format == 'cnpjcpf' && (
    typeof dflt == 'number' || typeof dflt == 'string'
  )) {
    var x = String(dflt)
    if (/^\d{1,14}$/.test(x)) {
      if (x.length <= 11) {
        x = x.padStart(11, '0')
        x =
          x.substr(0, 3)+'.'+
          x.substr(3, 3)+'.'+
          x.substr(6, 3)+'-'+
          x.substr(9, 2)
      } else {
        x = x.padStart(14, '0')
        x =
          x.substr(0, 2)+'.'+
          x.substr(2, 3)+'.'+
          x.substr(5, 3)+'/'+
          x.substr(8, 4)+'-'+
          x.substr(12, 2)
      }
    }
    return el(x)
  } else if (format == 'cep' && (
    typeof dflt == 'number' || typeof dflt == 'string'
  )) {
    var x = String(dflt)
    if (/^\d{1,8}$/.test(x)) {
      x = x.padStart(8, '0')
      x = x.substr(0, 5)+'-'+x.substr(5, 3)
    }
    return el(x)
  } else if (format == 'rg' && (
    typeof dflt == 'number' || typeof dflt == 'string'
  )) {
    var x = String(dflt)
    if (/^\d{1,9}$/.test(x)) {
      x = x.padStart(9, '0')
      x =
        x.substr(0, 2)+'.'+
        x.substr(2, 3)+'.'+
        x.substr(5, 3)+'-'+
        x.substr(8, 1)
    }
    return el(x)
  } else if (format == 'tel' && language == 'pt' && (
    typeof dflt == 'number' || typeof dflt == 'string'
  )) {
    var x = String(dflt)
    const s = x.replace(/[^\d]+/g,'')
    if (/^\d{10,11}$/.test(s)) {
      const n = s.length
      x = `(${s.substr(0, 2)}) ${s.substr(2, n - 6)}-${s.substr(n - 4)}`
    }
    return el(x)
  } else if (typeof dflt == 'boolean') {
    return el(dflt ? '\u2611' : '\u2612')
  } else if (typeof dflt == 'number') {
    return el(dflt.toLocaleString())
  } else if (typeof dflt == 'string') {
    const media = (contentMediaType || '').split('/').shift()
    const data = contentMediaType && contentEncoding ?
      'data:'+contentMediaType+";"+contentEncoding+','+
      encodeURIComponent(dflt) : dflt 

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
      return el(dflt)
    }
  } else if (typeof dflt == 'object') {
    return el(JSON.stringify(dflt, undefined, 2))
  }
})
