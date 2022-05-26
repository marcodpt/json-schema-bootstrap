export default {
  type: "object",
  title: "Some item",
  description: "Static item example!\nHope you enjoy it!",
  properties: {
    name: {
      title: "Name",
      type: "string"
    },
    company: {
      title: "Company",
      type: "string",
      default: "github",
      href: "https://www.github.com"
    },
    age: {
      title: "Age",
      type: "integer",
      default: 34,
      href: "https://www.google.com/search?q=age"
    },
    score: {
      title: "Score",
      type: "integer"
    },
    bio: {
      title: "Bio",
      default: "Hello,\nMy name is John!",
      type: "string",
      format: "text"
    }
  },
  default: {
    active: true,
    passing: true,
    name: "John",
    score: 123456789
  }
}
