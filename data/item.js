export default {
  type: "object",
  title: "Some item",
  description: "Static item example!\nHope you enjoy it!",
  properties: {
    active: {
      title: "Active",
      type: "boolean",
      default: false
    },
    passing: {
      title: "Passing",
      type: "boolean"
    },
    fixed: {
      title: "Fixed",
      type: "boolean"
    },
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
    admitted: {
      title: "Admitted",
      type: "string",
      format: "date",
      default: "2020-01-02"
    },
    termination: {
      title: "Termination",
      type: "string",
      format: "date",
      default: ""
    },
    aborted: {
      title: "Aborted",
      type: "string",
      format: "date",
      default: "",
      href: "https://www.google.com/search?q=aborted"
    },
    age: {
      title: "Age",
      type: "integer",
      default: 34,
      href: "https://www.google.com/search?q=age"
    },
    since: {
      title: "Since",
      type: "integer",
      default: 1648771200,
      format: "date",
      href: "https://www.google.com/search?q=date+format"
    },
    score: {
      title: "Score",
      type: "integer"
    },
    pi: {
      title: "Pi",
      type: "number",
      default: 3.1415926535,
      href: "https://www.google.com/search?q=pi+digits"
    },
    color: {
      title: "Color",
      type: "string",
      default: "#aaaaaa",
      format: "color"
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
