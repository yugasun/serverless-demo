const { objectType } = require('nexus')

const User = objectType({
  name: 'User',
  definition(t) {
    t.int('id')
    t.string('name')
    t.string('email')
    t.list.field('posts', {
      type: 'Post',
    })
  },
})

module.exports = {
  User,
}
