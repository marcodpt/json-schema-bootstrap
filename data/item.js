export default {
  title: "Some item",
  description: "Static item example!\nHope you enjoy it!",
  properties: {
    id: {
      default: 7,
      href: '#/get/{id}'
    },
    name: {
      title: "Name",
      description: "My name",
      href: '#/{name}?age={age}'
    },
    age: {
      default: 35
    },
    bio: {
      default: "Hello,\nMy name is John!"
    }
  },
  default: {
    name: "John",
    age: 34
  },
  links: [
    {
      ui: "btn btn-danger",
      icon: "fas fa-trash",
      href: "#/delete/{id}",
      title: "Delete"
    }, {
      ui: "btn btn-warning",
      icon: "fas fa-edit",
      href: "#/edit/{id}",
      title: "Edit"
    }
  ]
}
