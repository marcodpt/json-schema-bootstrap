export default {
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
      default: 10,
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
}
