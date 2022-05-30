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
    }/*,
    city: {
      type: "integer",
      ui: "typeahead",
      title: "City",
      href: "cities_{country}",
      default: 1
    }*/,
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
  }
}
