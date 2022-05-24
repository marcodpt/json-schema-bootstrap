export default {
  type: "array",
  title: "My Table",
  description: "Some sample table!\nJust as showcase.",
  links: [
    {
      title: 'Back',
      href: '#/back',
      btn: 'secondary',
      fas: 'arrow-left',
      rel: 'self'
    }, {
      title: 'Post',
      href: '#/post',
      btn: 'success',
      fas: 'pencil-alt',
      rel: 'self'
    }, {
      href: '#/first',
      btn: 'secondary',
      fas: 'fast-backward',
      rel: 'first'
    }, {
      href: '#/prev',
      btn: 'secondary',
      fas: 'step-backward',
      rel: 'prev'
    }, {
      href: '#/page/{}',
      title: 'Page {} of 3',
      rel: 'index',
      hrefSchema: {
        type: 'integer',
        format: 'typeahead',
        enum: [1, 2, 3],
        default: 3
      }
    }, {
      href: '#/page/2',
      title: 'Page 2 of 3',
      rel: 'index'
    }, {
      href: '',
      title: 'Page 3 of 3',
      rel: 'index'
    }, {
      href: '#/items/5',
      title: '5 items per page',
      rel: 'alternate',
      hrefSchema: {
        type: 'integer',
        format: 'typeahead',
        label: '{} items per page',
        enum: [5, 10, 20],
        default: 20
      }
    }, {
      href: '#/items/10',
      title: '10 items per page',
      rel: 'alternate'
    }, {
      href: '',
      title: '20 items per page',
      rel: 'alternate'
    }, {
      href: '',
      btn: 'secondary',
      fas: 'step-forward',
      rel: 'next'
    }, {
      href: '',
      btn: 'secondary',
      fas: 'fast-forward',
      rel: 'last'
    }, {
      href: '#?search=',
      fas: 'times',
      btn: 'secondary',
      rel: 'search'
    }, {
      href: '#?search={}',
      title: 'Search',
      rel: 'search',
      hrefSchema: {
        type: "string"
      }
    }, {
      href: '#?filter[]={field}{operator}{value}',
      fas: 'filter',
      btn: 'info',
      title: 'Filter',
      rel: 'search',
      hrefSchema: {
        type: 'object',
        properties: {
          field: {
            type: 'string',
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
            type: 'string',
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
      href: '#?group={fields}',
      fas: 'th',
      btn: 'warning',
      title: 'Group',
      rel: 'search'
    }, {
      href: '#/csv',
      fas: 'file-csv',
      btn: 'secondary',
      title: 'Download',
      rel: 'search'
    }
  ],
  items: {
    type: "object",
    properties: {
      id: {
        title: "Id",
        type: "integer"
      },
      register: {
        title: "Register",
        type: "string",
        format: "date"
      },
      name: {
        title: "Name",
        type: "string"
      },
      gender: {
        title: "Gender",
        type: "string"
      },
      age: {
        title: "Age",
        type: "integer"
      },
      balance: {
        title: "Balance ($)",
        type: "number"
      },
      bio: {
        title: "Bio",
        type: "string",
        format: "text"
      }
    },
    links: [
      {
        title: 'Delete',
        href: '#/delete/{id}',
        batch: '#/delete/{ids}',
        fas: 'trash',
        btn: 'danger'
      }, {
        title: 'Update',
        href: '#/edit/{id}',
        fas: 'edit',
        btn: 'warning'
      }
    ],
    default: {
      id: 16
    }
  }
}
