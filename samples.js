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
    object: {
      attributes: {
        schema: {
          type: "object",
          title: "My form",
          description: "A sample form!\nHope you enjoy it!",
          properties: {
            age: {
              title: "Age",
              type: "integer",
              default: 30,
              minimum: 18,
              maximum: 99,
              multipleOf: 1
            },
            salary: {
              title: "Salary ($)",
              type: "number",
              default: 3000,
              minimum: 1000,
              maximum: 10000,
              multipleOf: 0.01
            },
            name: {
              title: "Name",
              type: "string",
              minLength: 3,
              maxLength: 10,
              pattern: "a",
              default: ""
            },
            accept: {
              title: "Accept conditions",
              type: "boolean",
              default: false,
              const: true
            }
          }
        },
        submit: submit
      }
    }
  }
}
