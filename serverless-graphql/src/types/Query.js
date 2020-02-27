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
          posts: [
            {
              id: 1,
              published: true,
              title: "Yuga Sun's Blog",
              content: 'https://yugasun.com/',
              published: true,
              author: {
                id: 1,
                name: 'yugasun',
                email: 'yugasun@yugasun.com',
              },
            },
          ],
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
            title: "Yuga Sun's Blog",
            content: 'https://yugasun.com/',
            published: true,
            author: {
              id: 1,
              name: 'yugasun',
              email: 'yugasun@yugasun.com',
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
            id: 1,
            title: "Yuga Sun's Blog",
            content: 'https://yugasun.com/',
            published: true,
            author: {
              id: 1,
              name: 'yugasun',
              email: 'yugasun@yugasun.com',
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
          title: "Yuga Sun's Blog",
          content: 'https://yugasun.com/',
          published: true,
          author: {
            id: 1,
            name: 'yugasun',
            email: 'yugasun@yugasun.com',
          },
        }
      },
    })
  },
})

module.exports = {
  Query,
}
