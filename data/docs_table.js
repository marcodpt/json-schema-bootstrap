export default {
  schema: {
    title: 'Docs Table',
    links: [
      {
        title: 'Post',
        href: '#/post',
        ui: 'btn btn-success',
        icon: 'fas fa-pencil-alt',
        rel: 'self'
      }
    ],
    items: {
      properties: {
        id: {},
        register: {
          format: 'date'
        },
        name: {
          href: '#?name={name}'
        }
      },
      links: [
        {
          href: '#/delete/{id}',
          rel: 'self',
          icon: 'fas fa-trash',
          ui: 'btn btn-danger btn-sm'
        }, {
          href: '#/edit/{id}',
          rel: 'self',
          icon: 'fas fa-edit',
          ui: 'btn btn-warning btn-sm'
        }
      ]
    },
    default: [
      {
        id: 1,
        register: '2021-03-02',
        name: 'Liam' 
      }, {
        id: 2,
        register: '2021-01-05',
        name: 'Olivia'
      }
    ]
  }
}
