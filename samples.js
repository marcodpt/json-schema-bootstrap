import data from './data/rows.js'
import table from './data/table.js'
import form from './data/form.js'
import item from './data/item.js'
import element from './index.js'
import countries from './data/countries.js'
import cities_us from './data/cities_us.js'
import cities_cn from './data/cities_cn.js'
import cities_br from './data/cities_br.js'
import roles from './data/roles.js'

const DB = {
  countries,
  cities_cn,
  cities_us,
  cities_br,
  roles
}

const resolve = data => console.log(JSON.stringify(data, undefined, 2))
const update = (data, time) => callback => {
  callback(null)
  setTimeout(() => callback(data), time)
}

export default {
  title: 'Json Schema Bootstrap',
  gh: 'https://github.com/marcodpt/json-schema-bootstrap',
  element: element,
  samples: {
    form: {
      attributes: {
        schema: form,
        options: {
          resolve: data => new Promise(resolve => {
            setTimeout(() => {
              window.alert(JSON.stringify(data, undefined, 2))
              resolve()
            }, 2000)
          }),
          loader: url => new Promise((resolve, reject) => {
            setTimeout(() => {
              if (DB[url] == null) {
                reject('url not found: '+url)
              } else {
                resolve(DB[url])
              }
            }, 2000)
          })
        }
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
    },
    nothing: {
      attributes: {}
    },
    emptyCard: {
      attributes: {
        schema: {
          ui: 'card'
        }
      }
    },
    simple: {
      attributes: {
        schema: {
          description: 'Very simple schema.',
          ui: 'card'
        }
      }
    },
    basic: {
      attributes: {
        schema: {
          title: 'Basic schema',
          description: 'Very simple schema.\nWith title!',
          ui: 'card'
        }
      }
    },
    primary: {
      attributes: {
        schema: {
          title: 'primary',
          ui: 'primary'
        }
      }
    },
    secondary: {
      attributes: {
        schema: {
          description: 'secondary',
          ui: 'secondary'
        }
      }
    },
    success: {
      attributes: {
        schema: {
          title: 'success',
          description: 'Some alert sample!\nHope you enjoy it!',
          ui: 'success'
        }
      }
    },
    danger: {
      attributes: {
        schema: {
          title: 'danger',
          ui: 'danger'
        }
      }
    },
    warning: {
      attributes: {
        schema: {
          description: 'warning',
          ui: 'warning'
        }
      }
    },
    info: {
      attributes: {
        schema: {
          title: 'info',
          description: 'Some alert sample!\nHope you enjoy it!',
          ui: 'info'
        }
      }
    },
    light: {
      attributes: {
        schema: {
          title: 'light',
          ui: 'light'
        }
      }
    },
    dark: {
      attributes: {
        schema: {
          description: 'dark',
          ui: 'dark'
        }
      }
    },
    dataNone: {
      attributes: {
        schema: {
          ui: 'data'
        }
      }
    },
    dataNull: {
      attributes: {
        schema: {
          default: null,
          ui: 'data'
        }
      }
    },
    dataFalse: {
      attributes: {
        schema: {
          default: false,
          ui: 'data'
        }
      }
    },
    dataTrue: {
      attributes: {
        schema: {
          default: true,
          ui: 'data'
        }
      }
    },
    data7: {
      attributes: {
        schema: {
          default: 7,
          ui: 'data'
        }
      }
    },
    dataPi: {
      attributes: {
        schema: {
          default: 3.14,
          ui: 'data'
        }
      }
    },
    dataDog: {
      attributes: {
        schema: {
          default: 'dog',
          ui: 'data'
        }
      }
    },
    dataText: {
      attributes: {
        schema: {
          default: [
            'This is a multi-line text!',
            'Hope everything works right :)!'
          ].join('\n'),
          ui: 'data'
        }
      }
    },
    dataObject: {
      attributes: {
        schema: {
          default: {
            id: 3,
            name: 'John'
          },
          ui: 'data'
        }
      }
    },
    dataArray: {
      attributes: {
        schema: {
          default: ['cat', 'dog', 'horse'],
          ui: 'data'
        }
      }
    },
    string0: {
      attributes: {
        schema: {
          default: 'test string',
          ui: 'string'
        }
      }
    },
    string1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          default: 'test',
          ui: 'string',
          minLength: 5
        }
      }
    },
    string2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'string',
          minLength: 5,
          title: 'pt',
          description: 'This time showValid: true, pt: true, name: pt'
        }
      }
    },
    string3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'string',
          default: 'mama mia',
          minLength: 5
        }
      }
    },
    text0: {
      attributes: {
        schema: {
          default: 'test string.\nFor text ui!',
          ui: 'text'
        }
      }
    },
    text1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          default: 'test',
          ui: 'text',
          minLength: 5
        }
      }
    },
    text2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'text',
          minLength: 5,
          title: 'pt',
          description: 'This time showValid: true, pt: true, name: pt'
        }
      }
    },
    text3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'text',
          default: 'mama mia',
          minLength: 5
        }
      }
    },
    color0: {
      attributes: {
        schema: {
          default: "#aaaaaa",
          ui: 'color'
        }
      }
    },
    color1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'color',
          default: '#888888',
          pattern: '^#[a-f].{5}$'
        }
      }
    },
    color2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'color',
          type: 'string',
          pattern: '^#[a-f].{5}$',
          title: 'Favorite Color',
          description: 'Choose your favorite color'
        }
      }
    },
    color3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'color',
          default: '#ffffff',
          pattern: '^#[a-f].{5}$'
        }
      }
    },
    range0: {
      attributes: {
        schema: {
          default: 3.1415,
          ui: 'range'
        }
      }
    },
    range1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          title: "debt",
          type: "number",
          ui: "range",
          default: 10,
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    range2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          title: "debt",
          description: 'Something to pay for',
          type: "number",
          ui: "range",
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    range3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'range',
          title: "Children",
          type: "integer",
          default: 0,
          minimum: 0,
          maximum: 20,
          multipleOf: 1
        }
      }
    },
    integer0: {
      attributes: {
        schema: {
          default: 7,
          ui: 'integer'
        }
      }
    },
    integer1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "integer",
          title: "Age",
          type: "integer",
          default: 9,
          minimum: 18,
          maximum: 99,
          multipleOf: 1
        }
      }
    },
    integer2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "integer",
          title: "Age",
          type: "integer",
          minimum: 18,
          maximum: 99,
          multipleOf: 1
        }
      }
    },
    integer3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'integer',
          title: "Age",
          default: 30,
          minimum: 18,
          maximum: 99,
          multipleOf: 1
        }
      }
    },
    number0: {
      attributes: {
        schema: {
          default: 3.1415,
          ui: 'number'
        }
      }
    },
    number1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "number",
          default: 500,
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    number2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "number",
          title: "salary",
          description: 'Enter your salary...',
          type: "number",
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    number3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'number',
          default: 3000,
          minimum: 1000,
          maximum: 10000,
          multipleOf: 0.01
        }
      }
    },
    bool00: {
      attributes: {
        schema: {
          default: false,
          ui: 'boolean'
        }
      }
    },
    bool01: {
      attributes: {
        schema: {
          default: true,
          ui: 'switch'
        }
      }
    },
    bool02: {
      attributes: {
        schema: {
          default: true,
          ui: 'checkbox'
        }
      }
    },
    bool03: {
      attributes: {
        schema: {
          default: null,
          ui: 'boolean'
        }
      }
    },
    bool04: {
      attributes: {
        schema: {
          ui: 'checkbox'
        }
      }
    },
    bool1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "boolean",
          title: "Accept conditions",
          default: false,
          const: true,
          error: "You must accept conditions."
        }
      }
    },
    bool2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "checkbox",
          title: "Accept conditions",
          const: true,
          error: "You must accept conditions."
        }
      }
    },
    bool3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'switch',
          title: 'Subscribe newsletter',
          type: 'boolean',
          default: false
        }
      }
    },
    cnpjcpf0: {
      attributes: {
        schema: {
          default: '171.395.530-09',
          ui: 'cnpjcpf'
        }
      }
    },
    cnpjcpf1: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'cnpjcpf',
          default: '79418083000194',
          pattern: '^(|[0-9]{11}|[0-9]{14})$'
        }
      }
    },
    cnpjcpf2: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "cnpjcpf",
          title: "cnpjcpf",
          description: 'Enter your CPF...',
          pattern: '^(|[0-9]{11}|[0-9]{14})$'
        }
      }
    },
    cnpjcpf3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'cnpjcpf',
          default: '79418083000193',
          pattern: '^(|[0-9]{11}|[0-9]{14})$'
        }
      }
    },
    cep0: {
      attributes: {
        schema: {
          default: '01001-001',
          ui: 'cep'
        }
      }
    },
    cep1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "cep",
          title: "cep",
          description: 'Enter your CEP...',
          type: ['object', 'null'],
          default: null
        }
      }
    },
    cep2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'cep',
          type: ['object', 'null'],
          default: null
        }
      }
    },
    file0: {
      attributes: {
        schema: {
          default: {
            data: 'Hello world!',
            name: 'sample.txt',
            mime: 'text/plain'
          },
          ui: 'file'
        }
      }
    },
    file1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "file",
          title: "image",
          description: 'some image...',
          type: ['object', 'null'],
          default: null
        }
      }
    },
    file2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'file',
          type: 'array',
          default: [],
          minItems: 1,
          maxItems: 3
        }
      }
    },
    file3: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'file',
          type: ['array', 'object', 'null'],
          minItems: 1,
          maxItems: 3
        }
      }
    },
    dateA: {
      attributes: {
        schema: {
          ui: 'date',
          default: "2020-01-02"
        }
      }
    },
    dateB: {
      attributes: {
        schema: {
          ui: 'date',
          default: ""
        }
      }
    },
    dateC: {
      attributes: {
        schema: {
          ui: 'date',
          default: 0
        }
      }
    },
    dateD: {
      attributes: {
        schema: {
          ui: 'date',
          default: 1648771200
        }
      }
    },
    dateE: {
      attributes: {
        options: {
          language: 'en'
        },
        schema: {
          ui: 'date',
          default: "2020-01-02"
        }
      }
    },
    dateF: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          ui: 'date',
          default: ""
        }
      }
    },
    dateG: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          ui: 'date',
          default: 0
        }
      }
    },
    dateH: {
      attributes: {
        options: {
          language: 'pt'
        },
        schema: {
          ui: 'date',
          default: 1648771200
        }
      }
    },
    date1: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'integer',
          minimum: 1648771200,
          maximum: 1651276800,
          default: 1638771200
        }
      }
    },
    date2: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'integer',
          minimum: 1648771200,
          maximum: 1651276800
        }
      }
    },
    date3: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'date',
          maximum: 1651276800,
          default: 1649771200
        }
      }
    },
    date4: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'date',
          type: 'string',
          minimum: "2022-03-01",
          maximum: "2022-05-01",
          default: "2022-02-01"
        }
      }
    },
    date5: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'string',
          minimum: "2022-03-01",
          maximum: "2022-05-01"
        }
      }
    },
    date6: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: 'date',
          title: 'date',
          description: 'some date',
          type: 'string',
          minimum: "2022-03-01",
          maximum: "2022-05-01",
          default: "2022-04-01"
        }
      }
    },
    typeaheadStatic: {
      attributes: {
        schema: {
          default: "Test",
          ui: 'typeahead'
        }
      }
    },
    typeaheadEmpty: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: []
        }
      }
    },
    typeaheadEmptyDefault: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [],
          default: 7
        }
      }
    },
    typeaheadSport: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "Sport",
          default: "soccer"
        }
      }
    },
    typeaheadConstLabel: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          label: 'x = 7',
          default: 7
        }
      }
    },
    typeaheadPrimesEmpty: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19]
        }
      }
    },
    typeaheadPrimesWrong: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          default: 4
        }
      }
    },
    typeaheadPrimesWrongLabel: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          label: 'x: {}',
          default: 4
        }
      }
    },
    typeaheadPrimes: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          default: 7
        }
      }
    },
    typeaheadPrimesLabel: {
      attributes: {
        options: {
          resolve: resolve,
          showValid: true,
          language: 'pt'
        },
        schema: {
          ui: "typeahead",
          title: "primes",
          enum: [2, 3, 5, 7, 11, 13, 17, 19],
          default: 7,
          label: 'x: {}'
        }
      }
    },
    typeaheadPets: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["dog", "cat", "horse"]
        }
      }
    },
    typeaheadPetsWrong: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["dog", "cat", "horse"],
          default: "bird"
        }
      }
    },
    typeaheadPetsDefault: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["dog", "cat", "horse"],
          default: "cat"
        }
      }
    },
    typeaheadPetsWrongLabels: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["dog", "cat", "horse"],
          labels: ["Dog", "Cat"],
          default: "bird"
        }
      }
    },
    typeaheadPetsDefaultLabels: {
      attributes: {
        options: {
          resolve: resolve
        },
        schema: {
          ui: "typeahead",
          title: "pets",
          description: "Choose your favorite pet...",
          enum: ["dog", "cat", "horse"],
          labels: ["Dog", "Cat"],
          default: "cat"
        }
      }
    },
    typeaheadRole: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(roles, 0)
        },
        schema: {
          ui: "typeahead",
          title: "Role",
          description: "List of roles..."
        }
      }
    },
    typeaheadRoleWrong: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(roles, 0)
        },
        schema: {
          ui: "typeahead",
          title: "Role",
          description: "List of roles...",
          default: "teacher"
        }
      }
    },
    typeaheadRoleDefault: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(roles, 0)
        },
        schema: {
          ui: "typeahead",
          title: "Role",
          description: "List of roles...",
          default: "sysadmin"
        }
      }
    },
    typeaheadCountry: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(countries, 2000)
        },
        schema: {
          ui: "typeahead",
          title: "Country",
          description: "Choose a country..."
        }
      }
    },
    typeaheadCountryWrong: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(countries, 2000)
        },
        schema: {
          ui: "typeahead",
          title: "Country",
          default: "fr",
          enum: ['cn', 'br', 'us'],
          description: "Choose a country..."
        }
      }
    },
    typeaheadCountryDefault: {
      attributes: {
        options: {
          resolve: resolve,
          update: update(countries, 2000)
        },
        schema: {
          ui: "typeahead",
          title: "Country",
          default: "cn",
          description: "Choose a country..."
        }
      }
    },
    typeaheadCity: {
      attributes: {
        options: {
          resolve: resolve,
          update: callback => {
            callback(null)
            setTimeout(() => callback(cities_cn), 2000)
            setTimeout(() => callback(cities_br), 7000)
            setTimeout(() => callback(cities_us), 12000)
          }
        },
        schema: {
          ui: "typeahead",
          title: "City"
        }
      }
    },
    typeaheadCityWrong: {
      attributes: {
        options: {
          resolve: resolve,
          update: callback => {
            callback(null)
            setTimeout(() => callback(cities_br), 2000)
            setTimeout(() => callback(cities_us), 7000)
            setTimeout(() => callback(cities_cn), 12000)
          }
        },
        schema: {
          ui: "typeahead",
          title: "City",
          default: 8
        }
      }
    },
    typeaheadCityDefault: {
      attributes: {
        options: {
          resolve: resolve,
          update: callback => {
            callback(null)
            setTimeout(() => callback(cities_us), 2000)
            setTimeout(() => callback(cities_cn), 7000)
            setTimeout(() => callback(cities_br), 12000)
          }
        },
        schema: {
          ui: "typeahead",
          title: "City",
          default: 1
        }
      }
    }
  }
}
