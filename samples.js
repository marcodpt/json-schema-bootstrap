import schema from './src/schema.js'
import {
  element
} from 'https://cdn.jsdelivr.net/gh/marcodpt/element@1.0.2/index.js'

const submit = data => {window.alert(JSON.stringify(data, undefined, 2))}

export default {
  title: 'Json Schema Bootstrap',
  gh: 'https://github.com/marcodpt/json-schema-bootstrap',
  element: element(schema),
  samples: {
    integer: {
      attributes: {
        schema: {
          title: "An integer",
          type: "integer",
          default: 5,
          minimum: 0,
          maximum: 10,
          multipleOf: 1
        },
        submit: submit
      }
    },
    number: {
      attributes: {
        schema: {
          title: "A number",
          type: "number",
          default: 5,
          minimum: 0,
          maximum: 10,
          multipleOf: 1
        },
        submit: submit
      }
    },
    string: {
      attributes: {
        schema: {
          title: "A string",
          type: "string",
          minLength: 3,
          maxLength: 10,
          pattern: "a",
          default: ""
        },
        submit: submit
      }
    },
    object: {
      attributes: {
        schema: {
          type: "object",
          title: "My form",
          description: "A sample form!\nHope you enjoy it!",
          properties: {
            integer: {
              title: "An integer",
              type: "integer",
              default: 5,
              minimum: 0,
              maximum: 10,
              multipleOf: 1
            },
            number: {
              title: "A number",
              type: "number",
              default: 5,
              minimum: 0,
              maximum: 10,
              multipleOf: 1
            },
            string: {
              title: "A string",
              type: "string",
              minLength: 3,
              maxLength: 10,
              pattern: "a",
              default: ""
            }
          }
        },
        submit: submit
      }
    }
  }
}
