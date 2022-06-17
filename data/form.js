export default {
  title: "My form",
  description: "A sample form!\nHope you enjoy it!",
  properties: {
    name: {
      title: "Name",
      description: "My name",
      minLength: 1
    },
    country: {
      title: "Country",
      default: "fr",
      href: "countries",
      description: "Choose a country..."
    },
    city: {
      title: "City",
      href: "cities_{country}",
      default: 1,
      minimum: 0
    },
    city2: {
      title: "Again",
      href: "cities_{country}",
      default: 7,
      label: "Fantasy"
    },
    cpf: {
      format: "cnpjcpf",
      title: "CPF",
      minLength: 11,
      maxLength: 11
    },
    bio: {
      description: "Say something about yourself...",
      format: "text",
      minLength: 1,
      default: ""
    },
    primes: {
      minItems: 2,
      maxItems: 5,
      items: {
        enum: [2, 3, 5, 7, 11, 13, 17, 19],
        default: 1
      }
    },
    cities: {
      maxItems: 3,
      items: {
        properties: {
          country: {
            title: "Country",
            default: "cn",
            href: "countries",
            description: "Choose a country..."
          },
          city: {
            title: "City",
            href: "cities_{country}",
            default: 1
          }
        }
      }
    }
  },
  default: {
    name: "John",
    bio: "bio"
  },
  links: [
    {
      href: '#hello',
      icon: 'fas fa-smile',
      title: 'Say hello!',
      ui: 'btn btn-warning'
    }, {
      href: '#search={}',
      hrefSchema: {
        description: 'Type something'
      }
    }, {
      title: 'Filter',
      icon: 'fas fa-filter',
      ui: 'btn btn-info',
      href: '#filter[]={field} {operator} {value}',
      hrefSchema: {
        title: 'Filter',
        properties: {
          field: {
            title: 'Campo',
            enum: ['Id', 'Name', 'Age'],
            default: ''
          },
          operator: {
            title: 'Operador',
            enum: ['Igual', 'Diferente', 'Contêm']
          },
          value: {
            title: 'Valor',
            default: '',
            minLength: 1
          }
        },
        default: {
          operator: 'Diferente'
        }
      },
      links: [
        {
          href: '#',
          icon: 'fas fa-times',
          title: 'Clear filter'
        }
      ]
    }, {
      title: 'Picker',
      icon: 'fas fa-user',
      ui: 'btn btn-success',
      links: [
        {
          icon: 'fas fa-check',
          title: 'John',
          href: '#/user/john'
        }, {
          icon: 'fas fa-check',
          title: 'Arnold',
          href: '#/user/arnold'
        }
      ]
    }
  ]
}
