export default {
  type: "array",
  title: "My Table",
  description: "Some sample table!\nJust as showcase.",
  links: [
    {
      title: 'Back',
      href: '#/back',
      ui: 'btn btn-secondary',
      icon: 'fas fa-arrow-left',
      rel: 'self'
    }, {
      title: 'Post',
      href: '#/post',
      ui: 'btn btn-success',
      icon: 'fas fa-pencil-alt',
      rel: 'self'
    }, {
      href: '#/first',
      ui: 'btn btn-secondary',
      icon: 'fas fa-fast-backward',
      rel: 'alternate'
    }, {
      href: '#/prev',
      ui: 'btn btn-secondary',
      icon: 'fas fa-step-backward',
      rel: 'alternate'
    }, {
      href: '#/page/{}',
      rel: 'alternate',
      hrefSchema: {
        label: 'Page {} of 3',
        enum: [1, 2, 3],
        default: 1
      }
    }, {
      href: '#?per_page={}',
      rel: 'alternate',
      hrefSchema: {
        label: '{} items per page',
        enum: [5, 10, 20],
        default: 20
      }
    }, {
      href: '',
      ui: 'btn btn-secondary',
      icon: 'fas fa-step-forward',
      rel: 'alternate'
    }, {
      href: '',
      ui: 'btn btn-secondary',
      icon: 'fas fa-fast-forward',
      rel: 'alternate'
    }, {
      href: '#?search=',
      icon: 'fas fa-times',
      ui: 'btn btn-secondary',
      rel: 'search'
    }, {
      href: '#?search={}',
      title: 'Search',
      rel: 'search',
      hrefSchema: {
        type: "string",
        description: 'Type something to search...'
      }
    }, {
      href: '#?filter[]={field}{operator}{value}',
      icon: 'fas fa-filter',
      ui: 'btn btn-info',
      title: 'Filter',
      rel: 'search',
      hrefSchema: {
        type: 'object',
        properties: {
          field: {
            enum: [
              'id',
              'register',
              'name',
              'gender',
              'age',
              'balance',
              'bio'
            ],
            labels: [
              'Id',
              'Register',
              'Name',
              'Gender',
              'Age',
              'Balance',
              'Bio'
            ]
          },
          operator: {
            enum: [
              '~eq~',
              '~ct~'
            ],
            labels: [
              'Equals',
              'Contains'
            ]
          },
          value: {
            type: 'string'
          }
        },
        required: ['field', 'operator', 'value']
      }
    }, {
      icon: 'fas fa-th',
      ui: 'btn btn-warning',
      title: 'Group',
      rel: 'search',
      links: [
        {
          rel: 'self',
          href: '#group=id',
          icon: 'fas fa-times',
          title: 'Id'
        }, {
          rel: 'self',
          href: '#group=register',
          icon: 'fas fa-check',
          title: 'Register'
        }
      ]
    }, {
      href: '#/csv',
      icon: 'fas fa-file-csv',
      ui: 'btn btn-secondary',
      title: 'Download',
      rel: 'search'
    }
  ],
  items: {
    type: "object",
    properties: {
      id: {
        title: "Id",
        type: "integer",
        links: [
          {
            rel: 'alternate',
            icon: 'fas fa-times',
            ui: 'me-1',
            href: '#?id='
          }
        ]
      },
      register: {
        title: "Register",
        type: "string",
        format: "date",
        links: [
          {
            rel: 'self',
            icon: 'fas fa-sort',
            ui: 'ms-1',
            href: '#?sort=register'
          }
        ]
      },
      name: {
        title: "Name",
        type: "string",
        links: [
          {
            rel: 'self',
            icon: 'fas fa-sort-up',
            ui: 'ms-1',
            href: '#?sort=name'
          }
        ]
      },
      gender: {
        title: "Gender",
        type: "string",
        links: [
          {
            rel: 'self',
            icon: 'fas fa-sort-down',
            ui: 'ms-1',
            href: '#?sort=gender'
          }
        ]
      },
      age: {
        title: "Age",
        type: "integer",
        links: [
          {
            rel: 'self',
            icon: 'fas fa-sort',
            ui: 'ms-1',
            href: '#?sort=age'
          }
        ]
      },
      balance: {
        title: "Balance ($)",
        type: "number",
        links: [
          {
            rel: 'self',
            icon: 'fas fa-sort',
            ui: 'ms-1',
            href: '#?sort=balance'
          }
        ]
      },
      bio: {
        title: "Bio",
        type: "string",
        format: "text",
        links: [
          {
            rel: 'self',
            icon: 'fas fa-sort',
            ui: 'ms-1',
            href: '#?sort=bio'
          }
        ]
      }
    },
    links: [
      {
        href: '#/delete/{id}',
        rel: 'self',
        icon: 'fas fa-trash',
        ui: 'btn btn-danger btn-sm',
        links: [
          {
            href: '#/delete/{id}',
            rel: 'self'
          }
        ]
      }, {
        href: '#/edit/{id}',
        rel: 'self',
        icon: 'fas fa-edit',
        ui: 'btn btn-warning btn-sm'
      }
    ],
    default: {
      id: 16
    }
  }
}
