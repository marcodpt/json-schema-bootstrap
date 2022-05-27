export default {
  type: "object",
  title: "My form",
  description: "A sample form!\nHope you enjoy it!",
  properties: {
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
