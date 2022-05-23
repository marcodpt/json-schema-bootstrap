import schema from './src/schema.js'
import resolver from './resolver.js'
import data from './data/rows.js'
import table from './data/table.js'
import form from './data/form.js'
import item from './data/item.js'

export default {
  title: 'Json Schema Bootstrap',
  gh: 'https://github.com/marcodpt/json-schema-bootstrap',
  element: schema,
  samples: {
    /*inline: {
      attributes: {
        schema: inline,
        submit: data => new Promise(resolve => {
          setTimeout(() => {
            resolve({
              schema: {
                description: JSON.stringify(data, undefined, 2),
                format: 'success'
              }
            })
          }, 2000)
        }),
        resolver: resolver,
        valid: true
      }
    },*/
    input: {
      attributes: {
        schema: form,
        submit: data => {window.alert(JSON.stringify(data, undefined, 2))},
        resolver: resolver,
        valid: true
      }
    },
    item: {
      attributes: {
        schema: item
      }
    },
    table: {
      attributes: {
        schema: {
          ...table,
          default: data
        }
      }
    },
    loading: {
      attributes: {
        schema: table
      }
    }
  }
}
