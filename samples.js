import schema from './src/schema.js'
import resolver from './resolver.js'

const submit = data => {window.alert(JSON.stringify(data, undefined, 2))}

export default {
  title: 'Json Schema Bootstrap',
  gh: 'https://github.com/marcodpt/json-schema-bootstrap',
  element: schema,
  samples: {
    item: {
      attributes: {
        schema: {
          type: "object",
          title: "Some item",
          description: "Static item example!\nHope you enjoy it!",
          properties: {
            active: {
              title: "Active",
              type: "boolean",
              default: false
            },
            passing: {
              title: "Passing",
              type: "boolean"
            },
            fixed: {
              title: "Fixed",
              type: "boolean"
            },
            name: {
              title: "Name",
              type: "string"
            },
            company: {
              title: "Company",
              type: "string",
              default: "github",
              href: "https://www.github.com"
            },
            admitted: {
              title: "Admitted",
              type: "string",
              format: "date",
              default: "2020-01-02"
            },
            termination: {
              title: "Termination",
              type: "string",
              format: "date",
              default: ""
            },
            aborted: {
              title: "Aborted",
              type: "string",
              format: "date",
              default: "",
              href: "https://www.google.com/search?q=aborted"
            },
            age: {
              title: "Age",
              type: "integer",
              default: 34,
              href: "https://www.google.com/search?q=age"
            },
            since: {
              title: "Since",
              type: "integer",
              default: 1648771200,
              format: "date",
              href: "https://www.google.com/search?q=date+format"
            },
            score: {
              title: "Score",
              type: "integer"
            },
            pi: {
              title: "Pi",
              type: "number",
              default: 3.1415926535,
              href: "https://www.google.com/search?q=pi+digits"
            },
            color: {
              title: "Color",
              type: "string",
              default: "#aaaaaa",
              format: "color"
            },
            bio: {
              title: "Bio",
              default: "Hello,\nMy name is John!",
              type: "string",
              format: "text"
            }
          },
          default: {
            active: true,
            passing: true,
            name: "John",
            score: 123456789
          }
        }
      }
    },
    input: {
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
            children: {
              title: "Children",
              type: "integer",
              default: 0,
              minimum: 0,
              maximum: 20,
              multipleOf: 1,
              format: "range"
            },
            salary: {
              title: "Salary ($)",
              type: "number",
              default: 3000,
              minimum: 1000,
              maximum: 10000,
              multipleOf: 0.01
            },
            debt: {
              title: "Debt ($)",
              type: "number",
              format: "range",
              default: 0,
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
            bio: {
              type: "string",
              format: "text",
              description: "Talk a little about yourself...",
              minLength: 1,
              default: ""
            },
            born: {
              title: "Born",
              type: "integer",
              format: "date",
              minimum: 1648771200,
              maximum: 1651276800
            },
            since: {
              title: "Since",
              type: "string",
              format: "date",
              minimum: "2022-03-01",
              maximum: "2022-05-01",
              default: "2022-04-01"
            },
            favorite: {
              title: "Favorite Color",
              type: "string",
              format: "color",
              default: "#ffffff",
              pattern: "^#[a-f].{5}$"
            },
            codigo: {
              title: "CNPJ/CPF",
              type: "string",
              format: "cnpjcpf",
              default: "",
              pattern: "^(|[0-9]{11}|[0-9]{14})$"
            },
            endereco: {
              title: "CEP",
              type: ["object", "null"],
              format: "cep"
            },
            accept: {
              title: "Accept conditions",
              type: "boolean",
              default: false,
              const: true,
              error: "You must accept conditions."
            },
            subscribe: {
              title: "Subscribe newsletter",
              type: "boolean",
              default: false,
              format: "toggle"
            },
            image: {
              title: "Image",
              type: "object",
              format: "file"
            },
            friends: {
              title: "Friends",
              type: "array",
              format: "file",
              minItems: 2,
              maxItems: 3
            },
            country: {
              type: "string",
              format: "typeahead",
              title: "Country",
              default: "cn",
              href: "countries"
            },
            city: {
              type: "integer",
              format: "typeahead",
              title: "City",
              href: "cities_{country}",
              default: 1
            },
            company: {
              type: "integer",
              format: "typeahead",
              title: "Company",
              href: "companies",
              default: 3,
              label: "Some company"
            },
            role: {
              type: "string",
              format: "typeahead",
              title: "Role",
              href: "roles",
              description: "List of roles..."
            },
            pet: {
              type: "string",
              format: "typeahead",
              title: "Pet",
              enum: ["cat", "dog", "horse"]
            },
            sport: {
              type: "string",
              format: "typeahead",
              title: "Sport",
              default: "soccer"
            },
            primes: {
              title: "Primes",
              description: "Prime number selection",
              type: "array",
              items: {
                type: "integer",
                format: "typeahead",
                enum: [2, 3, 5, 7, 11, 13, 17, 19]
              },
              minItems: 2,
              maxItems: 5,
              uniqueItems: true
            },
            contacts: {
              title: "Contacts",
              type: "array",
              items: {
                type: "object",
                properties: {
                  name: {
                    title: "Name",
                    type: "string",
                    default: ""
                  },
                  number: {
                    title: "Number",
                    type: "string"
                  }
                }
              }
            }
          }
        },
        submit: submit,
        resolver: resolver
      }
    }
  }
}
