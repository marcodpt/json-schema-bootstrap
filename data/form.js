export default {
  type: "object",
  title: "My form",
  description: "A sample form!\nHope you enjoy it!",
  ui: "form",
  properties: {
    name: {
      title: "Name",
      description: "My name",
      type: "string",
      ui: "string",
      minLength: 1
    },
    country: {
      ui: "typeahead",
      title: "Country",
      default: "fr",
      href: "countries",
      description: "Choose a country..."
    },
    city: {
      type: "integer",
      ui: "typeahead",
      title: "City",
      href: "cities_{country}",
      default: 1
    },
    cpf: {
      type: "string",
      ui: "cnpjcpf",
      title: "CPF",
      minLength: 11,
      maxLength: 11
    },
    bio: {
      type: "string",
      description: "Say something about yourself...",
      ui: "text",
      minLength: 1,
      default: ""
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
        type: 'string',
        ui: 'string',
        description: 'Type something'
      }
    }, {
      title: 'Filter',
      icon: 'fas fa-filter',
      ui: 'btn btn-info',
      href: '#filter[]={field} {operator} {value}',
      hrefSchema: {
        type: 'object',
        ui: 'form',
        title: 'Filter',
        properties: {
          field: {
            title: 'Campo',
            type: 'string',
            ui: 'typeahead',
            enum: ['Id', 'Name', 'Age'],
            default: ''
          },
          operator: {
            title: 'Operador',
            type: 'string',
            ui: 'typeahead',
            enum: ['Igual', 'Diferente', 'Contêm']
          },
          value: {
            title: 'Valor',
            type: 'string',
            ui: 'string',
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
