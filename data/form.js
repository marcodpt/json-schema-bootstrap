export default {
  type: "object",
  title: "My form",
  description: "A sample form!\nHope you enjoy it!",
  properties: {
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
    alert: {
      title: 'Alert',
      description: 'Some random info'
    },
    warning: {
      description: 'Be cautious',
      format: 'warning'
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
