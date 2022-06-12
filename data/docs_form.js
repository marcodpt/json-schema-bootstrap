export default {
  schema: {
    title: 'Docs Form',
    properties: {
      name: {
        minLength: 1
      },
      bio: {
        title: '',
        description: 'Say something about yourself...',
        format: 'text'
      }
    },
    default: {
      name: 'John'
    }
  },
  options: {
    resolve: data => console.log(JSON.stringify(data, undefined, 2))
  }
}
