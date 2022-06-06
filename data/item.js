export default {
  type: "object",
  title: "Some item",
  description: "Static item example!\nHope you enjoy it!",
  ui: "form",
  properties: {
    id: {
      default: 7,
      href: '#/get/{id}'
    },
    name: {
      title: "Name",
      description: "My name",
      type: "string",
      ui: "string",
      href: '#/{name}?age={age}'
    },
    age: {
      default: 35
    },
    bio: {
      default: "Hello,\nMy name is John!",
      type: "string",
      ui: "text"
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
