const { objectType } = require('nexus')

const Post = objectType({
  name: 'Post',
  definition(t) {
    t.int('id')
    t.boolean('published')
    t.string('title')
    t.string('content')
    t.field('author', {
      type: 'User',
    })
  },
})

module.exports = {
  Post,
}
