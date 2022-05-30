export default {
  type: "object",
  title: "Some item",
  description: "Static item example!\nHope you enjoy it!",
  ui: "form",
  properties: {
    name: {
      title: "Name",
      description: "My name",
      type: "string",
      ui: "string"
    },
    bio: {
      default: "Hello,\nMy name is John!",
      type: "string",
      ui: "text"
    }
  },
  default: {
    name: "John"
  }
}
