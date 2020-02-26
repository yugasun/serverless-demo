const { idArg, queryType, stringArg } = require('nexus')
const { getUserId } = require('../utils')

const Query = queryType({
  definition(t) {
    t.field('me', {
      type: 'User',
      nullable: true,
      resolve: (parent, args, ctx) => {
        const userId = getUserId(ctx)
        // TODO: handle your data with database, below is a mock data
        return {
          id: userId,
          name: 'yugasun',
          email: 'yuga_sun@163.com',
        }
      },
    })

    t.list.field('feed', {
      type: 'Post',
      resolve: (parent, args, ctx) => {
        // TODO: handle your data with database, below is a mock data
        return [
          {
            id: 1,
            title: 'Subscribe to GraphQL Weekly for community news ',
            content: 'https://graphqlweekly.com/',
            published: true,
            author: {
              id: 1,
              name: 'Bob',
              email: 'bob@prisma.io',
            },
          },
        ]
      },
    })

    t.list.field('filterPosts', {
      type: 'Post',
      args: {
        searchString: stringArg({ nullable: true }),
      },
      resolve: (parent, { searchString }, ctx) => {
        // TODO: handle your data with database, below is a mock data
        return [
          {
            id: 2,
            title: 'Subscribe to GraphQL Weekly for community news ',
            content: 'https://graphqlweekly.com/',
            published: true,
            author: {
              id: 1,
              name: 'Bob',
              email: 'bob@prisma.io',
            },
          },
        ]
      },
    })

    t.field('post', {
      type: 'Post',
      nullable: true,
      args: { id: idArg() },
      resolve: (parent, { id }, ctx) => {
        // TODO: handle your data with database, below is a mock data
        return {
          id: Number(id),
          title: 'Subscribe to GraphQL Weekly for community news ',
          content: 'https://graphqlweekly.com/',
          published: true,
          author: {
            id: 1,
            name: 'Bob',
            email: 'bob@prisma.io',
          },
        }
      },
    })
  },
})

module.exports = {
  Query,
}
